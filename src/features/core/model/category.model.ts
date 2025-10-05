export enum ECategoryName {
  HORSES = 'horses',
  EQUIPMENT = 'equipment',
  CARE = 'care',
  SPECIALISTS = 'specialists',
  TRAINING = 'training',
  STABLES = 'stables',
}

export enum EListingType {
  ADS = 'ads',
  SERVICES = 'services',
}

export enum ESubCategoryName {
  SPORT = 'sport',
  FOALS = 'foals',
  ADOPT = 'adopt',
  HORSE_GEAR = 'horse-gear',
  RIDER_GEAR = 'rider-gear',
  STABLE = 'stable',
  FEEDS = 'feeds',
  SUPPLEMENTS = 'supplements',
  COSMETICS = 'cosmetics',
  FARRIER = 'farrier',
  VET = 'vet',
  TRAINERS = 'trainers',
  KIDS = 'kids',
  HORSE_TRAINING = 'horse-training',
  BOX = 'box',
  PADDOCK = 'paddock',
}

export const CATEGORIES_GROUPED_BY_TYPE = {
  [EListingType.ADS]: [ECategoryName.HORSES, ECategoryName.EQUIPMENT, ECategoryName.CARE],
  [EListingType.SERVICES]: [
    ECategoryName.SPECIALISTS,
    ECategoryName.TRAINING,
    ECategoryName.STABLES,
  ],
};
