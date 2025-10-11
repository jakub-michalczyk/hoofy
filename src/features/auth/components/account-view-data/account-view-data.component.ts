import { Component, inject, signal, effect } from '@angular/core';
import { AlertController, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AccountViewCardComponent } from '../account-view-card/account-view-card.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ProfilePictureComponent } from '../../../shared/components/profile-picture/profile-picture.component';
import { getDatabase, ref, set } from 'firebase/database';

type ProfileKey = 'displayName' | 'email' | 'phoneNumber';

@Component({
  selector: 'hoof-account-view-data',
  imports: [IonButton, AccountViewCardComponent, CommonModule, IonIcon, ProfilePictureComponent],
  templateUrl: './account-view-data.component.html',
})
export class AccountViewDataComponent {
  protected editMode = signal(false);
  protected alertCtrl = inject(AlertController);
  protected auth = inject(AuthService);

  protected originalData = signal<Partial<Record<ProfileKey, string>>>({});
  protected formData = signal<Partial<Record<ProfileKey, string>>>({});

  protected data: { title: string; key: ProfileKey; icon: string }[] = [
    { title: 'Imię', key: 'displayName', icon: 'person-circle-outline' },
    { title: 'E-mail', key: 'email', icon: 'mail-outline' },
    { title: 'Telefon', key: 'phoneNumber', icon: 'call-outline' },
  ];

  constructor() {
    effect(
      () => {
        const user = this.auth.user();
        const snapshot: Partial<Record<ProfileKey, string>> = {
          displayName: user?.displayName ?? '',
          email: user?.email ?? '',
          phoneNumber: user?.phoneNumber ?? '',
        };
        this.originalData.set(snapshot);
        this.formData.set({ ...snapshot });
      },
      { allowSignalWrites: true }
    );
  }

  toggleMode() {
    if (this.editMode()) {
      this.confirmSaveIfChanged();
    } else {
      this.editMode.set(true);
    }
  }

  onInputChange(event: Event, key: ProfileKey) {
    const value = (event.target as HTMLInputElement).value;

    this.formData.update(fd => ({
      ...fd,
      [key]: value,
    }));
  }

  async confirmSaveIfChanged() {
    const original = this.originalData();
    const current = this.formData();

    const hasChanges = this.data.some(({ key }) => original[key] !== current[key]);
    if (!hasChanges) {
      this.editMode.set(false);
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Zapisz zmiany',
      message: 'Czy chcesz zapisać zmienione dane?',
      cssClass: '_hoof-alert',
      buttons: [
        { text: 'Anuluj', role: 'cancel' },
        {
          text: 'Zapisz',
          handler: async () => {
            const userId = this.auth.user()?.uid;
            if (!userId) return;

            const db = getDatabase();
            const userRef = ref(db, `/users/${userId}`);
            await set(userRef, { ...current, uid: userId });
            await this.auth.refreshUser(userId);

            this.originalData.set({ ...current });
            this.editMode.set(false);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentResetAlert() {
    const email = this.auth.user()?.email;
    if (!email) return;

    const alert = await this.alertCtrl.create({
      header: 'Reset hasła',
      message: `Czy chcesz na Twój adres e-mail otrzymać link do zresetowania hasła?`,
      cssClass: '_hoof-alert',
      buttons: [
        { text: 'Anuluj', role: 'cancel' },
        {
          text: 'Wyślij link',
          handler: async () => {
            await firstValueFrom(this.auth.resetPassword(email));
          },
        },
      ],
    });
    await alert.present();
  }
}
