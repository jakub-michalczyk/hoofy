import { Component, effect, inject } from '@angular/core';
import { AccountViewCardComponent } from '../account-view-card/account-view-card.component';
import { ChatStore } from '../../store/chat.store';
import { IonButton } from '@ionic/angular/standalone';
import { UserChatButtonComponent } from '../user-chat-button/user-chat-button.component';
import { IUserProfile } from '../../models/chat.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hoof-account-view-chat',
  imports: [AccountViewCardComponent, IonButton, UserChatButtonComponent, RouterLink],
  templateUrl: './account-view-chat.component.html',
})
export class AccountViewChatComponent {
  protected chat = inject(ChatStore);
  protected lastUserMessaged = {} as IUserProfile;

  constructor() {
    effect(() => {
      const uid = this.chat.contacts();
      if (uid.length > 0 && this.chat.filteredContacts().length > 0) {
        this.lastUserMessaged = this.chat.filteredContacts()[0];
      }
    });
  }
}
