import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { Pages, Role } from './utils/const';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { TUser } from './utils/types';
import { httpInterceptorProviders } from './helpers/http-interceptor';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    InMemoryWebApiModule,
    ProfileComponent,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    LoginComponent
  ],
  providers: [httpInterceptorProviders]
})
export class AppComponent {
  title = 'angular-test';
  pages = Pages

  user?: TUser
  isLoggedIn = false;
  showAdminBoard = false;
  showCustomerBoard = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.user = this.storageService.getUser() as TUser;

      this.showAdminBoard = this.user.role === Role.Admin
      this.showCustomerBoard = this.user.role === Role.Customer
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
