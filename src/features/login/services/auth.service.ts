import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { signInWithPopup } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { from, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private db = inject(Database);
  currentUser = signal<User | null>(null);
  initialized = signal(false);

  constructor() {
    this.auth.onAuthStateChanged(user => {
      this.currentUser.set(user);
      this.initialized.set(true);
    });
  }

  register(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(cred => {
        const uid = cred.user.uid;
        return from(
          set(ref(this.db, `users/${uid}`), {
            uid,
            name,
            profileImg: '',
          })
        );
      })
    );
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  resetPassword(email: string) {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  logout() {
    return from(this.auth.signOut());
  }
}
