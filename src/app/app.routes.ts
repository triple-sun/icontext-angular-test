import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { BillingComponent } from './pages/billing/billing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home page', canActivate: [authGuard]},
  { path: 'inventory', component: InventoryComponent, title: 'Inventory', canActivate: [authGuard] },
  { path: 'reports', component: ReportsComponent, title: 'Reports', canActivate: [authGuard] },
  { path: 'billing', component: BillingComponent, title: 'Billing', canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, title: 'Profile', canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, title: 'Login'},
  { path: 'register', component: RegisterComponent, title: 'Register'},
  { path: '**', component: HomeComponent, canActivate: [authGuard] }
];
