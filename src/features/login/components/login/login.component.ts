import { AfterViewInit, Component, DestroyRef, inject, signal, ViewChild } from '@angular/core';
import { EmailPasswordComponent } from '../email-password/email-password.component';
import { IonButton } from '@ionic/angular/standalone';
import { AuthViewComponent } from '../auth-view/auth-view.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ELoginMethoded } from '../../models/auth.model';
import { NgTemplateOutlet } from '@angular/common';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'hoof-login',
  imports: [
    EmailPasswordComponent,
    IonButton,
    AuthViewComponent,
    NgTemplateOutlet,
    FormErrorComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit {
  private destroyerRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private router = inject(Router);
  loginMethods = Object.values(ELoginMethoded);
  isPasswordResetMode = signal(false);
  loginErrors = signal('');

  @ViewChild(EmailPasswordComponent) emailPasswordComp!: EmailPasswordComponent;

  isFormInvalid = signal(true);

  ngAfterViewInit(): void {
    this.emailPasswordComp.form.statusChanges
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe(status => this.isFormInvalid.set(status !== 'VALID'));
  }

  onResetPassword() {
    const { email } = this.emailPasswordComp.form.value;
    this.authService.resetPassword(email);
  }

  resetPasswordModeToggle() {
    this.isPasswordResetMode.update(s => !s);
  }

  async onLogin() {
    const { email, password } = this.emailPasswordComp.form.value;
    try {
      await firstValueFrom(this.authService.register(email, password));
      this.router.navigate(['/']);
    } catch (err: unknown) {
      this.loginErrors.set(this.getErrorMessage((err as Error).message));
    }
  }

  onCustomLogin(loginMethodes: ELoginMethoded) {
    switch (loginMethodes) {
      case ELoginMethoded.google:
        this.onGoogleLogin();
        break;
    }
  }

  getErrorMessage(errorMessage: string) {
    let message = 'Wystąpił nieznany błąd.';

    if (errorMessage.includes('email-already-in-use')) {
      message = 'E-mail jest już użyty w innej metodzie logowania.';
    }

    return message;
  }

  async onGoogleLogin() {
    try {
      await firstValueFrom(this.authService.loginWithGoogle());
      this.router.navigate(['/']);
    } catch (err) {
      console.error('Google login error:', err);
    }
  }
}
