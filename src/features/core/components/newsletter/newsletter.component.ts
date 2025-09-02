import { Component, inject, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { IonButton, IonIcon, ToastController } from '@ionic/angular/standalone';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

@Component({
  selector: 'hoof-newsletter',
  imports: [IonButton, IonIcon],
  templateUrl: './newsletter.component.html',
})
export class NewsletterComponent {
  firestore = inject(Firestore);
  toastController = inject(ToastController);
  email = signal('');

  async subscribe(event: Event) {
    event.preventDefault();
    const emailValue = this.email().trim();

    if (!this.validateEmail(emailValue)) {
      this.showToast('Nieprawidłowy adres e-mail', 'danger');
      return;
    }

    const exists = await this.checkIfEmailExists(emailValue);
    if (exists) {
      this.showToast('Ten adres już jest zapisany.', 'warning');
      return;
    }

    try {
      await addDoc(collection(this.firestore, 'newsletter'), {
        email: emailValue,
        timestamp: new Date(),
      });
      this.email.set('');
      this.showToast('Dziękujemy za zapis!', 'success');
    } catch (err) {
      console.error('Błąd zapisu:', err);
      this.showToast('Wystąpił błąd. Spróbuj ponownie.', 'danger');
    }
  }

  setNewsletterValue(event: EventTarget | null) {
    if (event !== null) {
      this.email.set((event as HTMLInputElement).value);
    }
  }

  validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    const q = query(collection(this.firestore, 'newsletter'), where('email', '==', email));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
      cssClass: 'text-center body-2',
    });
    await toast.present();
  }
}
