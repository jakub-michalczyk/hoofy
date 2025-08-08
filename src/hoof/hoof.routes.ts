import { Routes } from '@angular/router';
import { HomepageComponent } from '../features/homepage/components/homepage/homepage.component';
import { LoginComponent } from '../features/login/components/login/login.component';
import { RegisterComponent } from '../features/login/components/register/register.component';

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
    path: '**',
    redirectTo: '',
  },
];
