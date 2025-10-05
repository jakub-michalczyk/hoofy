import { ECategoryName, ESubCategoryName } from '../../model/category.model';
import {
  INavigationLoggedInMenuElement,
  INavigationMenuElement,
} from '../../model/navigation.model';

export const TOPBAR_LOGGED: INavigationLoggedInMenuElement[] = [
  {
    text: 'Dodaj ogłoszenie',
    slug: 'add-listing',
    url: 'add-listing',
    icon: 'add-circle-outline',
  },
];

export const LOGGED_IN_MENU: INavigationLoggedInMenuElement[] = [
  {
    text: 'Moje konto',
    slug: 'account',
    url: 'account',
    icon: 'person-outline',
  },
  TOPBAR_LOGGED[0],
  {
    text: 'Wiadomości',
    slug: 'chat',
    url: 'chat',
    icon: 'chatbubbles-outline',
  },
  {
    text: 'Wyloguj się',
    slug: 'log-out',
    icon: 'log-out-outline',
  },
];

export const MENU: INavigationMenuElement[] = [
  {
    text: 'Ogłoszenia',
    slug: 'listing',
    url: '/listing',
    submenu: [
      {
        title: 'Konie',
        slug: ECategoryName.HORSES,
        url: `/listing/${ECategoryName.HORSES}`,
        active: false,
        items: [
          {
            text: 'Konie sportowe',
            slug: ESubCategoryName.SPORT,
            url: `/listing/${ECategoryName.HORSES}/${ESubCategoryName.SPORT}`,
          },
          {
            text: 'Źrebaki',
            slug: ESubCategoryName.FOALS,
            url: `/listing/${ECategoryName.HORSES}/${ESubCategoryName.FOALS}`,
          },
          {
            text: 'Konie do adopcji',
            slug: ESubCategoryName.ADOPT,
            url: `/listing/${ECategoryName.HORSES}/${ESubCategoryName.ADOPT}`,
          },
        ],
      },
      {
        title: 'Sprzęt i akcesoria',
        slug: 'equipment',
        url: '/listing/equipment',
        active: false,
        items: [
          { text: 'Sprzęt dla koni', slug: 'horse-gear', url: '/listing/equipment/horse-gear' },
          { text: 'Sprzęt dla jeźdźca', slug: 'rider-gear', url: '/listing/equipment/rider-gear' },
          { text: 'Stajnia i wyposażenie', slug: 'stable', url: '/listing/equipment/stable' },
        ],
      },
      {
        title: 'Żywienie i pielęgnacja',
        slug: 'care',
        url: '/listing/care',
        active: false,
        items: [
          { text: 'Pasze i sieczki', slug: 'feeds', url: '/listing/care/feeds' },
          { text: 'Suplementy', slug: 'supplements', url: '/listing/care/supplements' },
          { text: 'Kosmetyki dla koni', slug: 'cosmetics', url: '/listing/care/cosmetics' },
        ],
      },
    ],
  },
  {
    text: 'Usługi',
    slug: 'listing',
    url: '/listing',
    submenu: [
      {
        title: 'Pensjonaty',
        slug: 'stables',
        url: '/listing/stables',
        active: false,
        items: [
          { text: 'Stajna z boksami', slug: 'box', url: '/listing/stables/box' },
          {
            text: 'Stajnia wolnowybiegowa',
            slug: 'paddock',
            url: '/listing/stables/paddock',
          },
        ],
      },
      {
        title: 'Specjaliści',
        slug: 'specialists',
        url: '/listing/specialists',
        active: false,
        items: [
          { text: 'Kowale', slug: 'farrier', url: '/listing/specialists/farrier' },
          { text: 'Weterynarze', slug: 'vet', url: '/listing/specialists/vet' },
        ],
      },
      {
        title: 'Trening i jazda',
        slug: 'training',
        url: '/listing/training',
        active: false,
        items: [
          { text: 'Instruktorzy', slug: 'trainers', url: '/listing/training/trainers' },
          { text: 'Zajęcia dla dzieci', slug: 'kids', url: '/listing/training/kids' },
          { text: 'Trening koni', slug: 'horse-training', url: '/listing/training/horse-training' },
        ],
      },
    ],
  },
  {
    text: 'Mapa',
    slug: 'map',
    url: '/map/horses',
  },
];
