import { Component } from '@angular/core';
import { AccountViewDataComponent } from '../account-view-data/account-view-data.component';
import { AccountViewListingsComponent } from '../account-view-listings/account-view-listings.component';
import { AccountViewChatComponent } from '../account-view-chat/account-view-chat.component';

@Component({
  selector: 'hoof-account-view',
  imports: [AccountViewDataComponent, AccountViewListingsComponent, AccountViewChatComponent],
  templateUrl: './account-view.component.html',
})
export class AccountViewComponent {}
