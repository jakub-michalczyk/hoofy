import { Routes } from '@angular/router';
import { HomepageComponent } from '../features/homepage/components/homepage/homepage.component';
import { ListingComponent } from '../features/listing/components/listing/listing.component';
import { ListingDetailsComponent } from '../features/listing/components/listing-details/listing-details.component';
import { MapContainerComponent } from '../features/map/components/map-container/map-container.component';
import { AddListingContainerComponent } from '../features/listing/components/add-listing-container/add-listing-container.component';
import { LoginComponent } from '../features/auth/components/login/login.component';
import { RegisterComponent } from '../features/auth/components/register/register.component';
import { AccountViewComponent } from '../features/auth/components/account-view/account-view.component';
import { ChatContainerComponent } from '../features/auth/components/chat-container/chat-container.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'add-listing',
    component: AddListingContainerComponent,
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
    path: 'map',
    children: [
      { path: '', component: MapContainerComponent },
      { path: ':mainCat', component: MapContainerComponent },
      { path: ':mainCat/:subCat', component: MapContainerComponent },
      { path: ':mainCat/:subCat/:id', component: MapContainerComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [],
  },
  {
    path: 'account',
    component: AccountViewComponent,
    canActivate: [],
  },
  {
    path: 'chat',
    component: ChatContainerComponent,
    canActivate: [],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
