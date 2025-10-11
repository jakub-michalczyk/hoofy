import { Component, inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'hoof-email-password',
  imports: [IonIcon, FormsModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './email-password.component.html',
})
export class EmailPasswordComponent implements OnInit {
  @Input() repeatPassword = false;
  @Input() hasPassword = true;
  public form!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    const controls = {
      email: ['', [Validators.required, Validators.email]],
    };

    if (this.hasPassword) {
      Object.assign(controls, {
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }

    if (this.hasPassword && this.repeatPassword) {
      Object.assign(controls, {
        repeatPassword: ['', [Validators.required]],
      });
    }

    const options: AbstractControlOptions = this.repeatPassword
      ? {
          validators: [this.passwordsMatchValidator],
        }
      : {};

    this.form = this.fb.group(controls, options);
  }

  private passwordsMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const repeat = control.get('repeatPassword')?.value;
    return password === repeat ? null : { passwordsMismatch: true };
  };

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get repeat() {
    return this.form.get('repeatPassword');
  }
}
