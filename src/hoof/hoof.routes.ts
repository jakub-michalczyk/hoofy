import { Routes } from '@angular/router';
import { HomepageComponent } from '../features/homepage/components/homepage/homepage.component';
import { LoginComponent } from '../features/login/components/login/login.component';
import { RegisterComponent } from '../features/login/components/register/register.component';
import { ListingComponent } from '../features/listing/components/listing/listing.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'listing',
    children: [
      { path: '', component: ListingComponent },
      { path: ':mainCat', component: ListingComponent },
      { path: ':mainCat/:subCat', component: ListingComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
