import { signalStore, withMethods, withState } from '@ngrx/signals';
import { getDatabase, ref, get } from 'firebase/database';
import { IUserData } from '../models/auth.model';

export interface IUserState {
  profile: IUserData | null;
}

export const USER_STATE: IUserState = {
  profile: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<IUserState>(USER_STATE),
  withMethods(() => ({
    async fetchUserProfile(userId: string): Promise<IUserData | null> {
      const db = getDatabase();
      const userRef = ref(db, `/users/${userId}`);
      const snap = await get(userRef);

      if (snap.exists()) {
        return snap.val() as IUserData;
      }
      return null;
    },
  }))
);
