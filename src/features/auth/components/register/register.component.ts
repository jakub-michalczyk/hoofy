import { AfterViewInit, Component, DestroyRef, inject, signal, ViewChild } from '@angular/core';
import { IonButton, IonCheckbox } from '@ionic/angular/standalone';
import { EmailPasswordComponent } from '../email-password/email-password.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthViewComponent } from '../auth-view/auth-view.component';

@Component({
  selector: 'hoof-register',
  imports: [AuthViewComponent, IonButton, EmailPasswordComponent, IonCheckbox, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements AfterViewInit {
  private destroyerRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private router = inject(Router);

  @ViewChild(EmailPasswordComponent) emailPasswordComp!: EmailPasswordComponent;

  protected termsAccepted = new FormControl(false);
  protected isFormInvalid = signal(true);

  ngAfterViewInit(): void {
    this.emailPasswordComp.form.statusChanges
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe(() => this.updateFormValidity());

    this.termsAccepted.valueChanges
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe(() => this.updateFormValidity());

    this.updateFormValidity();
  }

  updateFormValidity(): void {
    const formValid = this.emailPasswordComp.form.valid;
    const termsChecked = this.termsAccepted.value === true;
    this.isFormInvalid.set(!(formValid && termsChecked));
  }

  async onRegister() {
    const { email, password } = this.emailPasswordComp.form.value;
    try {
      await firstValueFrom(this.authService.register(email, password, 'User')); // TODO
      this.router.navigate(['/']);
    } catch (err) {
      console.error('Registration error:', err);
    }
  }
}
