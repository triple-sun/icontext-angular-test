import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { BillingComponent } from './pages/billing/billing.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home page'},
  { path: 'inventory', component: InventoryComponent, title: 'Inventory' },
  { path: 'reports', component: ReportsComponent, title: 'Reports' },
  { path: 'billing', component: BillingComponent, title: 'Billing' },
  { path: 'profile', component: ProfileComponent, title: 'Profile' },
];
