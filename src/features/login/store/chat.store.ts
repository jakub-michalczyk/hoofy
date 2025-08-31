import { Injectable, signal, computed, inject, effect } from '@angular/core';
import {
  Database,
  ref,
  onValue,
  onChildAdded,
  push,
  query,
  orderByChild,
  limitToLast,
} from '@angular/fire/database';
import { AuthService } from '../services/auth.service';
import { set } from 'firebase/database';
import { IMessage, IUserProfile } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class ChatStore {
  readonly contacts = signal<IUserProfile[]>([]);
  readonly searchQuery = signal<string>('');
  readonly filteredContacts = computed<IUserProfile[]>(() =>
    this.contacts().filter(u => u.name.toLowerCase().includes(this.searchQuery().toLowerCase()))
  );

  readonly lastMessages = signal<Record<string, IMessage>>({});
  readonly activeUser = signal<IUserProfile | null>(null);
  readonly messages = signal<IMessage[]>([]);
  readonly newMessage = signal<string>('');

  private unsubscribeMessages: (() => void) | null = null;
  private contactsLoaded = false;

  private db = inject(Database);
  private auth = inject(AuthService);

  constructor() {
    effect(() => {
      const init = this.auth.initialized();
      const me = this.auth.currentUser();
      if (init && me && !this.contactsLoaded) {
        this.contactsLoaded = true;
        this.loadContactsFromConversations();
      }
    });
  }

  private loadContactsFromConversations(): void {
    const meUid = this.auth.currentUser()!.uid;
    const ucRef = ref(this.db, `user-conversations/${meUid}`);

    onValue(ucRef, snap => {
      const convs = snap.val() as Record<string, boolean> | null;
      const partnerUids = convs ? Object.keys(convs) : [];

      this.contacts.set([]);

      partnerUids.forEach(uid => {
        const userRef = ref(this.db, `users/${uid}`);
        onValue(
          userRef,
          userSnap => {
            const prof = userSnap.val() as Omit<IUserProfile, 'uid'>;
            const updated = [...this.contacts().filter(c => c.uid !== uid), { uid, ...prof }];
            this.contacts.set(updated);
            this.fetchLastMessage(uid);
          },
          { onlyOnce: true }
        );
      });
    });
  }

  private fetchLastMessage(otherUid: string): void {
    const meUid = this.auth.currentUser()?.uid;
    if (!meUid) return;

    const convId = [meUid, otherUid].sort().join('_');
    const msgsQuery = query(
      ref(this.db, `conversations/${convId}/messages`),
      orderByChild('timestamp'),
      limitToLast(1)
    );

    onValue(msgsQuery, snap => {
      const raw = snap.val() as Record<string, IMessage> | null;
      if (!raw) return;
      const [last] = Object.values(raw);
      this.lastMessages.update(curr => ({ ...curr, [otherUid]: last }));
    });
  }

  selectUser(user: IUserProfile): void {
    if (this.unsubscribeMessages) {
      this.unsubscribeMessages();
      this.unsubscribeMessages = null;
    }
    this.activeUser.set(user);
    this.messages.set([]);
    this.subscribeMessages(user.uid);
  }

  private subscribeMessages(otherUid: string): void {
    const meUid = this.auth.currentUser()?.uid;
    if (!meUid) return;

    const convId = [meUid, otherUid].sort().join('_');
    const msgsRef = ref(this.db, `conversations/${convId}/messages`);

    this.unsubscribeMessages = onChildAdded(msgsRef, snap => {
      const msg = snap.val() as IMessage;
      this.messages.update(list => [...list, msg].sort((a, b) => a.timestamp - b.timestamp));
      this.lastMessages.update(curr => ({ ...curr, [otherUid]: msg }));
    });
  }

  async sendMessage(): Promise<void> {
    const meUid = this.auth.currentUser()?.uid;
    const otherUid = this.activeUser()?.uid;
    const text = this.newMessage().trim();
    if (!meUid || !otherUid || !text) return;

    const convId = [meUid, otherUid].sort().join('_');
    const msgsRef = ref(this.db, `conversations/${convId}/messages`);

    await push(msgsRef, {
      senderId: meUid,
      receiverId: otherUid,
      text,
      timestamp: Date.now(),
    });

    await Promise.all([
      set(ref(this.db, `user-conversations/${meUid}/${otherUid}`), true),
      set(ref(this.db, `user-conversations/${otherUid}/${meUid}`), true),
    ]);

    this.newMessage.set('');
  }
}
