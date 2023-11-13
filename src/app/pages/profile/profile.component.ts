import {Component, ElementRef, Inject, Input, OnDestroy, OnInit, Optional, Self, ViewChild, forwardRef} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { COUNTRY_CODE, MAX_NAME_LENGTH, MIN_NAME_LENGTH, TEL_LENGTH, URL_REGEX} from '../../utils/const';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { formatProfileForm, formatTelNumber } from '../../utils/utils';
import { TelInput } from '../../components/tel-input/tel-input';
import { StorageService } from '../../services/storage/storage.service';
import { TUser } from '../../utils/types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    TelInput,
    NgFor,
    NgIf,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less'
})
export class ProfileComponent implements OnInit {
  currentUser!: TUser | {}

  profile = { email: 'aa@aa.com', firstName: '', lastName: '', tel: '', website: ''}
  length = { nameMin: MIN_NAME_LENGTH, nameMax: MAX_NAME_LENGTH, tel: TEL_LENGTH}

  profileForm!: FormGroup;
  post: any = ''

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.createForm();
    this.currentUser = this.storageService.getUser();
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      firstName: new FormControl(this.profile.firstName, [
        Validators.required,
        Validators.minLength(this.length.nameMin),
        Validators.maxLength(this.length.nameMax)
      ]),
      lastName: new FormControl(this.profile.lastName, [
        Validators.required,
        Validators.minLength(this.length.nameMin),
        Validators.maxLength(this.length.nameMax)
      ]),
      tel: new FormControl(new MyTel('','',''),[
        Validators.required,
      ]),
      website: new FormControl(this.profile.website, [
        Validators.pattern(URL_REGEX)
      ]),
      },
    );
  }

  get firstName() {
    return this.profileForm.get('firstName')!;
  }

  get lastName() {
    return this.profileForm.get('lastName')!;
  }

  get tel() {
    return this.profileForm.get('tel')!;
  }

  get website() {
    return this.profileForm.get('website')!;
  }

  formatTel() {
    const telNumber = formatTelNumber(this.tel.value);
    this.tel.setValue(telNumber);
  }

  onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);
  console.warn(formatProfileForm(this.profileForm.value))
  }

  parseInt(value: string | number) {
    return parseInt(value.toString())
  }
}

export class MyTel {
  constructor(public area: string, public exchange: string, public subscriber: string) {}
}
