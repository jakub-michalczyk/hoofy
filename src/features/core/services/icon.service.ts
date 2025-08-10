import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  chevronDown,
  chevronUp,
  locationOutline,
  searchOutline,
  arrowBackOutline,
  arrowForwardOutline,
  heartOutline,
  heart,
  cashOutline,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoTiktok,
  logoYoutube,
  mailOutline,
  lockClosedOutline,
  alertCircleOutline,
  personCircleOutline,
  pinOutline,
} from 'ionicons/icons';

@Injectable({ providedIn: 'root' })
export class IconService {
  registerIcons() {
    addIcons({
      'chevron-down-outline': chevronDown,
      'chevron-up-outline': chevronUp,
      'location-outline': locationOutline,
      'search-outline': searchOutline,
      'arrow-back-outline': arrowBackOutline,
      'arrow-forward-outline': arrowForwardOutline,
      'heart-outline': heartOutline,
      heart: heart,
      'cash-outline': cashOutline,
      'logo-facebook': logoFacebook,
      'logo-instagram': logoInstagram,
      'logo-linkedin': logoLinkedin,
      'logo-tiktok': logoTiktok,
      'logo-youtube': logoYoutube,
      'mail-outline': mailOutline,
      'lock-closed-outline': lockClosedOutline,
      'alert-circle-outline': alertCircleOutline,
      'person-circle-outline': personCircleOutline,
      'pin-outline': pinOutline,
    });
  }
}
