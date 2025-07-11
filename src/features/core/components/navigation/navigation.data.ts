import { INavigationMenuElement } from '../../model/navigation.model';

export const MENU: INavigationMenuElement[] = [
  {
    text: 'Ogłoszenia',
    url: '/ads',
    submenu: [
      {
        title: 'Konie',
        items: [
          { text: 'Konie sportowe', url: '/ads/horses/sport' },
          { text: 'Źrebaki', url: '/ads/horses/foals' },
          { text: 'Konie do adopcji', url: '/ads/horses/adopt' },
        ],
      },
      {
        title: 'Sprzęt i akcesoria',
        items: [
          { text: 'Sprzęt dla koni', url: '/ads/equipment/saddles' },
          { text: 'Sprzęt dla jeźdźca', url: '/ads/equipment/clothing' },
          { text: 'Stajnia i wyposażenie', url: '/ads/stable' },
        ],
      },
      {
        title: 'Żywienie i pielęgnacja',
        items: [
          { text: 'Pasze i sieczki', url: '/ads/feeds' },
          { text: 'Suplementy', url: '/ads/supplements' },
          { text: 'Kosmetyki dla koni', url: '/ads/care' },
        ],
      },
    ],
  },
  {
    text: 'Usługi',
    url: '/services',
    submenu: [
      {
        title: 'Specjaliści',
        items: [
          { text: 'Kowale', url: '/services/farrier' },
          { text: 'Weterynarze', url: '/services/vet' },
          { text: 'Inni', url: '/services/other' },
        ],
      },
      {
        title: 'Trening i jazda',
        items: [
          { text: 'Instruktorzy', url: '/services/trainers' },
          { text: 'Zajęcia dla dzieci', url: '/services/kids' },
          { text: 'Trening koni', url: '/services/training' },
        ],
      },
      {
        title: 'Pensjonaty',
        items: [
          { text: 'Stajna z boksami', url: '/services/stables/box' },
          { text: 'Stajnia wolnowybiegowa', url: '/services/stables/paddock' },
        ],
      },
    ],
  },
  {
    text: 'Społeczność',
    url: '/community',
    submenu: [
      {
        title: 'Forum',
        items: [
          { text: 'Dyskusje ogólne', url: '/community/forum/general' },
          { text: 'Pytania i porady', url: '/community/forum/questions' },
          { text: 'Ogłoszenia klubowe', url: '/community/forum/clubs' },
        ],
      },
      {
        title: 'Blog',
        items: [
          { text: 'Porady jeździeckie', url: '/community/blog/tips' },
          { text: 'Relacje z zawodów', url: '/community/blog/events' },
        ],
      },
    ],
  },
];
