import { TUser } from '../../utils/types';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { EMAIL_REGEX, MAX_NAME_LENGTH, MAX_PASS_LENGTH, MIN_NAME_LENGTH, MIN_PASS_LENGTH } from '../../utils/const';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
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
export class RegisterComponent implements OnInit {
  length = { passMin: MIN_PASS_LENGTH, passMax: MAX_PASS_LENGTH, nameMin: MIN_NAME_LENGTH, nameMax: MAX_NAME_LENGTH }

  registerForm!: FormGroup
  registerData: Pick<TUser, 'firstName' | 'lastName' | 'email' | 'password'> = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(this.registerData.email, [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ]),
      password: new FormControl(this.registerData.password, [
        Validators.required,
        Validators.minLength(MIN_PASS_LENGTH),
        Validators.maxLength(MAX_PASS_LENGTH)
      ]),
      firstName: new FormControl(this.registerData.firstName, [
        Validators.required,
        Validators.minLength(MIN_NAME_LENGTH),
        Validators.maxLength(MAX_NAME_LENGTH)
      ]),
      lastName: new FormControl(this.registerData.lastName, [
        Validators.required,
        Validators.minLength(MIN_NAME_LENGTH),
        Validators.maxLength(MAX_NAME_LENGTH)
      ])
    });
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get firstName() {
    return this.registerForm.get('firstName')!;
  }

  get lastName() {
    return this.registerForm.get('lastName')!;
  }

  onSubmit(): void {
    const { firstName, lastName, email, password } = this.registerForm.value

    this.authService.register(firstName, lastName, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
