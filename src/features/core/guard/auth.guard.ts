import { computed, inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../login/services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  private userState$ = toObservable(
    computed(() => ({
      user: this.authService.user(),
      initialized: this.authService.initialized(),
    }))
  );

  canActivate(): Observable<boolean | UrlTree> {
    return this.userState$.pipe(
      filter(state => state.initialized),
      take(1),
      map(({ user }) => (user ? true : this.router.createUrlTree(['/account'])))
    );
  }
}
