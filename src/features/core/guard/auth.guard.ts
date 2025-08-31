import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../login/services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user$ = toObservable(
    computed(() => ({
      user: authService.currentUser(),
      initialized: authService.initialized(),
    }))
  );

  return user$.pipe(
    filter(({ initialized }) => initialized),
    take(1),
    map(({ user }) => {
      if (user) {
        router.navigate(['/account']);
        return false;
      }
      return true;
    })
  );
};
