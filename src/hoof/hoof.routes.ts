import { Routes } from '@angular/router';
import { HomepageComponent } from '../features/homepage/components/homepage/homepage.component';
import { LoginComponent } from '../features/login/components/login/login.component';
import { RegisterComponent } from '../features/login/components/register/register.component';
import { ListingComponent } from '../features/listing/components/listing/listing.component';
import { authGuard } from '../features/core/guard/auth.guard';
import { AccountViewComponent } from '../features/login/components/account-view/account-view.component';
import { ChatContainerComponent } from '../features/login/components/chat-container/chat-container.component';
import { ListingDetailsComponent } from '../features/listing/components/listing-details/listing-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'listing',
    children: [
      { path: '', component: ListingComponent },
      { path: ':mainCat', component: ListingComponent },
      { path: ':mainCat/:subCat', component: ListingComponent },
      { path: ':mainCat/:subCat/:id', component: ListingDetailsComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard],
  },
  {
    path: 'account',
    component: AccountViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'chat',
    component: ChatContainerComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
