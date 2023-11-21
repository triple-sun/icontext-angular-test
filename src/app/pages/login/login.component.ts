import { TUser } from '../../utils/types';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { EMAIL_REGEX, MAX_PASS_LENGTH, MIN_PASS_LENGTH, Role } from '../../utils/const';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgFor,
    NgIf,
  ]
})
export class LoginComponent implements OnInit {
  length = { passMin: MIN_PASS_LENGTH, passMax: MAX_PASS_LENGTH }

  loginForm!: FormGroup
  loginData: Pick<TUser, 'email' | 'password'> = { email: '', password: ''};

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role?: Role

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm()
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = (this.storageService.getUser() as TUser).role;
    }
  }

   createForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(this.loginData.email, [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ]),
      password: new FormControl(this.loginData.password, [
        Validators.required,
        Validators.minLength(MIN_PASS_LENGTH),
        Validators.maxLength(MAX_PASS_LENGTH)
      ])
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.role = (this.storageService.getUser() as TUser).role;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
