import { Component, inject, Input } from '@angular/core';
import { ChatStore } from '../../store/chat.store';
import { IUserProfile } from '../../models/chat.model';

@Component({
  selector: 'hoof-user-chat-button',
  imports: [],
  templateUrl: './user-chat-button.component.html',
})
export class UserChatButtonComponent {
  protected store = inject(ChatStore);
  @Input() user: IUserProfile = {} as IUserProfile;
}
