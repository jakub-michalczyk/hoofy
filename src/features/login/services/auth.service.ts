import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { signInWithPopup } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { from, switchMap } from 'rxjs';
import { IUserData } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private db = inject(Database);
  user = signal<IUserData | null>(null);
  initialized = signal(false);

  constructor() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.createUser(user?.uid);
        this.initialized.set(true);
      }
    });
  }

  async refreshUser(uid: string) {
    const snap = await get(ref(this.db, `users/${uid}`));
    this.user.set(snap.exists() ? ({ uid, ...snap.val() } as IUserData) : null);
  }

  async createUser(uid: string) {
    const userRef = ref(this.db, `users/${uid}`);

    const snap = await get(userRef);
    if (snap.exists()) {
      const existing = snap.val() as IUserData;

      const appUser: IUserData = {
        uid: existing.uid,
        displayName: existing.displayName,
        email: existing.email,
        profileImg: existing.profileImg,
        phoneNumber: existing.phoneNumber,
        listings: existing.listings,
      };

      this.user.set(appUser);
    }
  }

  register(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(cred => {
        const uid = cred.user.uid;
        return from(
          set(ref(this.db, `users/${uid}`), {
            uid,
            name,
            profileImg: '',
          })
        );
      })
    );
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  resetPassword(email: string) {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  logout() {
    return from(this.auth.signOut());
  }
}
