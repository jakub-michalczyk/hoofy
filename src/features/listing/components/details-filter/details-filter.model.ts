import { Type } from '@angular/core';
import {
  ICareFilter,
  IEquipmentFilter,
  IHorseDetails,
  ISpecialistFilter,
  IStableFilter,
  ITrainingFilter,
} from '../listing-item/listing-item.model';

export interface FilterModels {
  horses: IHorseDetails;
  equipment: IEquipmentFilter;
  care: ICareFilter;
  stable: IStableFilter;
  specialist: ISpecialistFilter;
  training: ITrainingFilter;
}

export type Category = keyof FilterModels;

export interface FilterComponent<T> {
  filters: T;
}

export type FilterComponentTypes = {
  [K in Category]: Type<FilterComponent<FilterModels[K]>>;
};

export enum EHorseBreed {
  ANY = 'Każda',
  OTHER = 'Inna',
  ABACO_BARB = 'Abaco Barb',
  ABAGA = 'Abaga horse',
  ADAEV = 'Adaev',
  AEGIDIENBERGER = 'Aegidienberger',
  AKHALTEKE = 'Akhalteke',
  KON_ALBANSKI = 'Koń albański',
  ALT_OLDENBURGER = 'Alt-Oldenburger',
  AMERICAN_CREAM_DRAFT = 'American Cream Draft',
  AMERICAN_MINIATURE_HORSE = 'American Miniature Horse',
  AMERICAN_PAINT_HORSE = 'American Paint Horse',
  AMERICAN_QUARTER_HORSE = 'American Quarter Horse',
  AMERICAN_SADDLEBRED = 'American Saddlebred',
  AMERICAN_STANDARDBRED = 'American Standardbred',
  AMERICAN_WALKING_PONY = 'American Walking Pony',
  ANDALUZYJSKI = 'Andaluzyjski',
  ANGLO_ARAB = 'Anglo-Arab',
  APPALOOSA = 'Appaloosa',
  ARAPAWA = 'Arapawa',
  KON_ARDENSKI = 'Koń ardeński',
  ASSATEAGUE_PONY = 'Assateague Pony',
  ASTURCON = 'Asturcón',
  AUSTRALIAN_PONY = 'Australian Pony',
  AUSTRALIAN_RIDING_PONY = 'Australian Riding Pony',
  AUSTRALIAN_STOCK_HORSE = 'Australian Stock Horse',
  AUSTRALIAN_BRUMBY = 'Australian Brumby',
  KARABACH = 'Karabach',
  BAISE = 'Baise horse',
  BAIXADEIRO = 'Baixadeiro',
  BALEARSKI_KON = 'Balearski koń',
  BALIKUN = 'Balikun horse',
  BALUCHI = 'Baluchi horse',
  BANKER = 'Banker horse',
  BARB = 'Barb',
  BARDIGIANO = 'Bardigiano',
  BAROQUE_PINTO = 'Baroque Pinto',
  BASHKIR_CURLY = 'Bashkir Curly',
  KUC_BASUTO = 'Kuc Basuto',
  BATAK_PONY = 'Batak pony',
  BAVARIAN_WARMBLOOD = 'Bavarian Warmblood',
  BELARUSIAN_HARNESS_HORSE = 'Belarusian Harness Horse',
  BELGIAN_DRAUGHT = 'Belgian Draught',
  BELGIAN_SPORT_HORSE = 'Belgian Sport Horse',
  BELGIAN_TROTTER = 'Belgian Trotter',
  BERBER = 'Berber',
  BERGAMASCO = 'Bergamasco',
  BIRMA_KUC = 'Birma pony',
  BLACK_FOREST_HORSE = 'Black Forest Horse',
  BUDYONNY = 'Budyonny',
  CAMARGUE = 'Camargue',
  CASPIAN = 'Caspian horse',
  CAVALLO_DEL_VENTASSO = 'Cavallo del Ventasso',
  CAVALLO_ROMANO_DELLA_MAREMMA = 'Cavallo Romano della Maremma Laziale',
  CLEVELAND_BAY = 'Cleveland Bay',
  CLYDESDALE = 'Clydesdale',
  CONNEMARA_PONY = 'Connemara Pony',
  CRIOLLO = 'Criollo',
  DALES_PONY = 'Dales Pony',
  DANISH_WARMBLOOD = 'Danish Warmblood',
  DANISH_SPORT_PONY = 'Danish Sport Pony',
  DARTMOOR_PONY = 'Dartmoor Pony',
  DATONG = 'Datong horse',
  DOLEHEST = 'Dølehest',
  DUTCH_DRAFT = 'Dutch Draft',
  DUTCH_HARNESS_HORSE = 'Dutch Harness Horse',
  DUTCH_WARMBLOOD = 'Dutch Warmblood',
  DZUNGARIAN = 'Dzungarian horse',
  EAST_BULGARIAN = 'East Bulgarian',
  ESTONIAN_DRAFT = 'Estonian Draft',
  ESTONIAN_NATIVE = 'Estonian Native',
  ETHIOPIAN_LOCAL = 'Ethiopian horses',
  EXMOOR_PONY = 'Exmoor Pony',
  FALABELLA = 'Falabella',
  FAROE_PONY = 'Faroe Pony',
  FINNHORSE = 'Finnhorse',
  FJORD = 'Fjord horse',
  FLORIDA_CRACKER = 'Florida Cracker Horse',
  FOUTANKE = 'Foutanké',
  FREDERIKSBORGER = 'Frederiksborger',
  FREIBERGER = 'Freiberger',
  FRENCH_TROTTER = 'French Trotter',
  FRIESIAN = 'Friesian',
  FURIOSO_NORTH_STAR = 'Furioso-North Star',
  GALICENO = 'Galiceno',
  GALICIAN_PONY = 'Galician Pony',
  GELDERLAND = 'Gelderland Horse',
  GIARA = 'Giara Horse',
  GIDRAN = 'Gidran',
  GRONINGEN = 'Groningen Horse',
  HAFLINGER = 'Haflinger',
  HACKNEY = 'Hackney Horse',
  HANOVERIAN = 'Hanoverian',
  HECK = 'Heck Horse',
  HEIHE = 'Heihe horse',
  HENSON = 'Henson',
  HISPANO_BRETON = 'Hispano-Bretón',
  HISPANO_ARAB = 'Hispano-Árabe',
  HOLSTEINER = 'Holsteiner',
  HUCUL = 'Hucul',
  ICELANDIC = 'Icelandic Horse',
  INDIAN_COUNTRY_BRED = 'Indian Country-bred',
  IOMUD = 'Iomud',
  IRISH_DRAUGHT = 'Irish Draught',
  IRISH_SPORT_HORSE = 'Irish Sport Horse',
  ITALIAN_HEAVY_DRAFT = 'Italian Heavy Draft',
  ITALIAN_TROTTER = 'Italian Trotter',
  JACA_NAVARRA = 'Jaca Navarra',
  JEJU = 'Jeju horse',
  JUTLAND = 'Jutland horse',
  KABARDA = 'Kabarda',
  KAFA = 'Kafa',
  KAIMANAWA = 'Kaimanawa',
  KALMYK = 'Kalmyk horse',
  KARABAIR = 'Karabair',
  KARABAKH = 'Karabakh horse',
  KARACHAI = 'Karachai horse',
  KATHIAWARI = 'Kathiawari',
  KAZAKH = 'Kazakh Horse',
  KENTUCKY_MOUNTAIN_SADDLE = 'Kentucky Mountain Saddle Horse',
  KIGER_MUSTANG = 'Kiger Mustang',
  KINSKY = 'Kinsky horse',
  KLADRUBER = 'Kladruber',
  KNABSTRUPPER = 'Knabstrupper',
  KONIK = 'Konik',
  KOREAN_JEJU = 'Korean Jeju',
  KURDISH = 'Kurdish horse',
  KUSTANAIR = 'Kustanair',
  LAC_LA_CROIX_INDIAN_PONY = 'Lac La Croix Indian Pony',
  LANDAIS = 'Landais',
  LIJIANG_PONY = 'Lijiang pony',
  LIPIZZANER = 'Lipizzaner',
  LUSITANO = 'Lusitano',
  MANGALARGA_MARCHADOR = 'Mangalarga Marchador',
  MARWARI = 'Marwari',
  MERENS = 'Merens',
  MISSOURI_FOX_TROTTER = 'Missouri Fox Trotter',
  MINIATURE_HORSE = 'Miniature horse',
  MISAKI = 'Misaki',
  MONGOLIAN = 'Mongolian horse',
  MORGAN = 'Morgan',
  MORAB = 'Morab',
  MUSTANG = 'Mustang',
  NARYM_PONY = 'Narym Pony',
  NAMAQUA_PONY = 'Namaqua Pony',
  NATIVE_IRISH = 'Native Irish types',
  NEW_FOREST_PONY = 'New Forest Pony',
  NOKOTA = 'Nokota',
  NORIKER = 'Noriker',
  NORWEGIAN_COLDBLOOD_TROTTER = 'Norwegian Coldblood Trotter',
  OLDENBURG = 'Oldenburg',
  ORLOV_TROTTER = 'Orlov Trotter',
  OSTFRIESEN_ALT_OLDENBURGER = 'Ostfriesen and Alt-Oldenburger',
  PAMPA_PANTANEIRO = 'Pampa / Pantaneiro',
  PASO_FINO = 'Paso Fino',
  PERCHERON = 'Percheron',
  PERSIAN_TYPES = 'Persian types',
  PINDOS_PONY = 'Pindos Pony',
  PONEY_DU_LOGONE = 'Poney du Logone',
  PONY_OF_THE_AMERICAS = 'Pony of the Americas',
  PRZEWALSKI = 'Przewalski’s horse',
  PURA_RAZA_ESPAÑOLA = 'Pura Raza Española',
  QUARTER_PONY = 'Quarter Pony',
  QUARTER_HORSE = 'Quarter Horse',
  RACKING_HORSE = 'Racking Horse',
  ROMNEY_MARSH = 'Romney Marsh',
  ROCKY_MOUNTAIN_HORSE = 'Rocky Mountain Horse',
  ROMANIAN_DRAFT = 'Romanian Draft',
  RUSSIAN_DON = 'Russian Don',
  SHAGYA_ARABIAN = 'Shagya Arabian',
  SALERNITANO = 'Salernitano',
  SHETLAND_PONY = 'Shetland Pony',
  SICILIANO_INDIGENO = 'Siciliano Indigeno',
  SILESIAN_HORSE = 'Silesian Horse',
  SORRAIA = 'Sorraia',
  SOUTH_GERMAN_COLDBLOOD = 'South German Coldblood',
  SPANISH_BARB = 'Spanish Barb',
  SPANISH_JENNET = 'Spanish Jennet Horse',
  SPANISH_MUSTANG = 'Spanish Mustang',
  SPANISH_TROTTER = 'Spanish Trotter',
  SPITI_HORSE = 'Spiti Horse',
  SPOTTED_SADDLE_HORSE = 'Spotted Saddle Horse',
  STANDARDBRED = 'Standardbred',
  SUDANESE_COUNTRY_BRED = 'Sudanese Country-Bred',
  SUFFOLK_PUNCH = 'Suffolk Punch',
  SVENSK_KALLBLODSTRAVARE = 'Svensk Kallblodstravare',
  SWEDISH_ARDENNES = 'Swedish Ardennes',
  SWEDISH_WARMBLOOD = 'Swedish Warmblood',
  SWISS_WARMBLOOD = 'Swiss Warmblood',
  TAISHU = 'Taishū horse',
  TAKHI = 'Takhi',
  TENNESSEE_WALKING_HORSE = 'Tennessee Walking Horse',
  TERSK = 'Tersk horse',
  THOROUGHBRED = 'Thoroughbred',
  TIGER_HORSE = 'Tiger Horse',
  TOKARA = 'Tokara horse',
  TOLFETANO = 'Tolfetano',
  TORI = 'Tori horse',
  TRAIT_DU_NORD = 'Trait du Nord',
  TRAKEHNER = 'Trakehner',
  TUIGPAARD = 'Tuigpaard',
  TUSHETIAN = 'Tushetian horse',
  TUVA = 'Tuva horse',
  UKRAINIAN_RIDING_HORSE = 'Ukrainian Riding Horse',
  UNMOL = 'Unmol Horse',
  UZUNYAYLA = 'Uzunyayla',
  VLAAMPERD = 'Vlaamperd',
  VIRGINIA_HIGHLANDER = 'Virginia Highlander',
  VLADIMIR_HEAVY_DRAFT = 'Vladimir Heavy Draft',
  VENTASSO = 'Ventasso horse',
  WALER = 'Waler',
  WALKALOOSA = 'Walkaloosa',
  WARLANDER = 'Warlander',
  WELSH_PONY_COB = 'Welsh Pony and Cob',
  WESTPHALIAN = 'Westphalian',
  WIELKOPOLSKI = 'Wielkopolski',
  WURTTEMBERGER = 'Württemberger',
  XILINGOL = 'Xilingol horse',
  YAKUTIAN = 'Yakutian horse',
  YILI = 'Yili horse',
  YONAGUNI = 'Yonaguni horse',
  ZANGERSHEIDE = 'Zangersheide',
  ZANISKARI = 'Zaniskari',
  ZAKYNTHOS = 'Zakynthos horse',
  ZEMAITUKAS = 'Žemaitukas',
  ZWEIGBRUCKER = 'Zweigbrücker',
}

export enum EHorseCoat {
  ANY = 'Wszystkie',
  OTHER = 'Inne',

  BAY = 'Gniady',
  CHESTNUT = 'Kasztanowaty',
  BLACK = 'Kary',
  GRAY = 'Siwy',
  DUN = 'Izabelowaty',
  PALOMINO = 'Palomino',
  BUCKSKIN = 'Bułany',
  CREMELLO = 'Cremello',
  PERLINO = 'Perlino',
  CHAMPAGNE = 'Szampański',
  SILVER = 'Srebrny',
  PEARL = 'Perłowy',
  MUSHROOM = 'Pieczarkowy',
  ROAN = 'Dereszowaty',
  PINTO = 'Pinto',
  APPALOOSA = 'Appaloosa',
  TOBIANO = 'Tobiano',
  OVERO = 'Overo',
  SABINO = 'Sabino',
  SPLASH_WHITE = 'Splash White',
  DOMINANT_WHITE = 'Dominująca biel',
  LEOPARD_SPOTTING = 'Leopardowy wzór',
  RABICANO = 'Rabicano',
}

export const breedToCoatsMap: Partial<Record<EHorseBreed, EHorseCoat[]>> = {
  [EHorseBreed.ABACO_BARB]: [EHorseCoat.BAY, EHorseCoat.CHESTNUT, EHorseCoat.ANY, EHorseCoat.OTHER],
  [EHorseBreed.ABAGA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.ADAEV]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AEGIDIENBERGER]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.DUN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AKHALTEKE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.KON_ALBANSKI]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.ALT_OLDENBURGER]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AMERICAN_CREAM_DRAFT]: [
    EHorseCoat.CREMELLO,
    EHorseCoat.PERLINO,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AMERICAN_MINIATURE_HORSE]: [
    EHorseCoat.PINTO,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PALOMINO,
    EHorseCoat.CREMELLO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AMERICAN_PAINT_HORSE]: [
    EHorseCoat.PINTO,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AMERICAN_QUARTER_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.PALOMINO,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AMERICAN_SADDLEBRED]: [
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AMERICAN_STANDARDBRED]: [
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AMERICAN_WALKING_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.ANDALUZYJSKI]: [
    EHorseCoat.GRAY,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.ANGLO_ARAB]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.APPALOOSA]: [
    EHorseCoat.APPALOOSA,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.ARAPAWA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.KON_ARDENSKI]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.ASSATEAGUE_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.ASTURCON]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AUSTRALIAN_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AUSTRALIAN_RIDING_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PALOMINO,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AUSTRALIAN_STOCK_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.AUSTRALIAN_BRUMBY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.DUN,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.KARABACH]: [EHorseCoat.BAY, EHorseCoat.CHESTNUT, EHorseCoat.ANY, EHorseCoat.OTHER],
  [EHorseBreed.BAISE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BAIXADEIRO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.DUN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BALEARSKI_KON]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BALIKUN]: [EHorseCoat.BAY, EHorseCoat.CHESTNUT, EHorseCoat.ANY, EHorseCoat.OTHER],
  [EHorseBreed.BALUCHI]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BANKER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BARB]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BARDIGIANO]: [
    EHorseCoat.BAY,
    EHorseCoat.DUN,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BAROQUE_PINTO]: [
    EHorseCoat.PINTO,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BASHKIR_CURLY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.KUC_BASUTO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BATAK_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BAVARIAN_WARMBLOOD]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BELARUSIAN_HARNESS_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BELGIAN_DRAUGHT]: [EHorseCoat.CHESTNUT, EHorseCoat.ANY, EHorseCoat.OTHER],
  [EHorseBreed.BELGIAN_SPORT_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BELGIAN_TROTTER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BERBER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BERGAMASCO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BIRMA_KUC]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BLACK_FOREST_HORSE]: [
    EHorseCoat.BLACK,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.BUDYONNY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.CAMARGUE]: [EHorseCoat.GRAY, EHorseCoat.ANY, EHorseCoat.OTHER],

  [EHorseBreed.CASPIAN]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.CAVALLO_DEL_VENTASSO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.CAVALLO_ROMANO_DELLA_MAREMMA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.CLEVELAND_BAY]: [EHorseCoat.BAY, EHorseCoat.ANY, EHorseCoat.OTHER],

  [EHorseBreed.CLYDESDALE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.CONNEMARA_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.CRIOLLO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.DALES_PONY]: [
    EHorseCoat.BLACK,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.DANISH_WARMBLOOD]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.DANISH_SPORT_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.DARTMOOR_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.DATONG]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.DOLEHEST]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.DUTCH_DRAFT]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.DUTCH_HARNESS_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.DUTCH_WARMBLOOD]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.DZUNGARIAN]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.EAST_BULGARIAN]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ESTONIAN_DRAFT]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ESTONIAN_NATIVE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.DUN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ETHIOPIAN_LOCAL]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.EXMOOR_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.DUN,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.FALABELLA]: [
    EHorseCoat.PALOMINO,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PINTO,
    EHorseCoat.CREMELLO,
    EHorseCoat.PERLINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.FAROE_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.FINNHORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.FJORD]: [
    EHorseCoat.DUN,
    EHorseCoat.BUCKSKIN,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.FLORIDA_CRACKER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.PALOMINO,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.FOUTANKE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.FREDERIKSBORGER]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.FREIBERGER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.FRENCH_TROTTER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.FRIESIAN]: [EHorseCoat.BLACK, EHorseCoat.ANY, EHorseCoat.OTHER],

  [EHorseBreed.FURIOSO_NORTH_STAR]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.GALICENO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.GALICIAN_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.GELDERLAND]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.GIARA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.GIDRAN]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.GRONINGEN]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.HAFLINGER]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.HACKNEY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.HANOVERIAN]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.HECK]: [
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.DUN,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.HEIHE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.HENSON]: [
    EHorseCoat.BAY,
    EHorseCoat.DUN,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.HISPANO_BRETON]: [
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.HISPANO_ARAB]: [
    EHorseCoat.GRAY,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.HOLSTEINER]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.HUCUL]: [
    EHorseCoat.BAY,
    EHorseCoat.DUN,
    EHorseCoat.BLACK,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ICELANDIC]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.DUN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.INDIAN_COUNTRY_BRED]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.IOMUD]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.IRISH_DRAUGHT]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.IRISH_SPORT_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ITALIAN_HEAVY_DRAFT]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ITALIAN_TROTTER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.JACA_NAVARRA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.JEJU]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.JUTLAND]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KABARDA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KAFA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KAIMANAWA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KALMYK]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KARABAIR]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KARABAKH]: [EHorseCoat.CHESTNUT, EHorseCoat.BAY, EHorseCoat.ANY, EHorseCoat.OTHER],

  [EHorseBreed.KARACHAI]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KATHIAWARI]: [
    EHorseCoat.GRAY,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KAZAKH]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KENTUCKY_MOUNTAIN_SADDLE]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KIGER_MUSTANG]: [
    EHorseCoat.BAY,
    EHorseCoat.DUN,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KINSKY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KLADRUBER]: [
    EHorseCoat.GRAY,
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KNABSTRUPPER]: [
    EHorseCoat.LEOPARD_SPOTTING,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KONIK]: [
    EHorseCoat.DUN,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KOREAN_JEJU]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KURDISH]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.KUSTANAIR]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.LAC_LA_CROIX_INDIAN_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.LANDAIS]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.LIJIANG_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.LIPIZZANER]: [
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.LUSITANO]: [
    EHorseCoat.GRAY,
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.MANGALARGA_MARCHADOR]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.MARWARI]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.MERENS]: [
    EHorseCoat.BLACK,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.MISSOURI_FOX_TROTTER]: [
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.MINIATURE_HORSE]: [
    EHorseCoat.PINTO,
    EHorseCoat.PALOMINO,
    EHorseCoat.CREMELLO,
    EHorseCoat.PERLINO,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.MISAKI]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.MONGOLIAN]: [
    EHorseCoat.BAY,
    EHorseCoat.BUCKSKIN,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
  [EHorseBreed.MORGAN]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.MORAB]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.MUSTANG]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.DUN,
    EHorseCoat.PALOMINO,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.NARYM_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.DUN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.NAMAQUA_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.NATIVE_IRISH]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.NEW_FOREST_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.NOKOTA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.NORIKER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.DUN,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.NORWEGIAN_COLDBLOOD_TROTTER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.OLDENBURG]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ORLOV_TROTTER]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.OSTFRIESEN_ALT_OLDENBURGER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.PAMPA_PANTANEIRO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.PASO_FINO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.PERCHERON]: [
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.PERSIAN_TYPES]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.PINDOS_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.PONEY_DU_LOGONE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.PONY_OF_THE_AMERICAS]: [
    EHorseCoat.PINTO,
    EHorseCoat.APPALOOSA,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.PRZEWALSKI]: [EHorseCoat.DUN, EHorseCoat.ANY, EHorseCoat.OTHER],

  [EHorseBreed.PURA_RAZA_ESPAÑOLA]: [
    EHorseCoat.GRAY,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.QUARTER_PONY]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PINTO,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.QUARTER_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.PALOMINO,
    EHorseCoat.ROAN,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.RACKING_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.BLACK,
    EHorseCoat.CHESTNUT,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ROMNEY_MARSH]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ROCKY_MOUNTAIN_HORSE]: [
    EHorseCoat.SILVER,
    EHorseCoat.PALOMINO,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ROMANIAN_DRAFT]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.RUSSIAN_DON]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SHAGYA_ARABIAN]: [
    EHorseCoat.GRAY,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SALERNITANO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SHETLAND_PONY]: [
    EHorseCoat.PINTO,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SICILIANO_INDIGENO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SILESIAN_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SORRAIA]: [
    EHorseCoat.BAY,
    EHorseCoat.SILVER,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SOUTH_GERMAN_COLDBLOOD]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SPANISH_BARB]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SPANISH_JENNET]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SPANISH_MUSTANG]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.PINTO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SPANISH_TROTTER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SPITI_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SPOTTED_SADDLE_HORSE]: [
    EHorseCoat.PINTO,
    EHorseCoat.APPALOOSA,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.STANDARDBRED]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SUDANESE_COUNTRY_BRED]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SUFFOLK_PUNCH]: [EHorseCoat.CHESTNUT, EHorseCoat.ANY, EHorseCoat.OTHER],

  [EHorseBreed.SVENSK_KALLBLODSTRAVARE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SWEDISH_ARDENNES]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SWEDISH_WARMBLOOD]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.SWISS_WARMBLOOD]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TAISHU]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TAKHI]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TENNESSEE_WALKING_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.PALOMINO,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TERSK]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.THOROUGHBRED]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TIGER_HORSE]: [
    EHorseCoat.PALOMINO,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ROAN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TOKARA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TOLFETANO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TORI]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TRAIT_DU_NORD]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TRAKEHNER]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TUIGPAARD]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TUSHETIAN]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.TUVA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.UKRAINIAN_RIDING_HORSE]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.UNMOL]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.UZUNYAYLA]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.VLAAMPERD]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.VIRGINIA_HIGHLANDER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.VLADIMIR_HEAVY_DRAFT]: [
    EHorseCoat.CHESTNUT,
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.VENTASSO]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.WALER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.WALKALOOSA]: [
    EHorseCoat.PINTO,
    EHorseCoat.APPALOOSA,
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.WARLANDER]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.WELSH_PONY_COB]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.PALOMINO,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.WESTPHALIAN]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.WIELKOPOLSKI]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.WURTTEMBERGER]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.XILINGOL]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.YAKUTIAN]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.YILI]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.BLACK,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.YONAGUNI]: [EHorseCoat.BAY, EHorseCoat.CHESTNUT, EHorseCoat.ANY, EHorseCoat.OTHER],

  [EHorseBreed.ZANGERSHEIDE]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ZANISKARI]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.DUN,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ZAKYNTHOS]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ZEMAITUKAS]: [
    EHorseCoat.BAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.GRAY,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],

  [EHorseBreed.ZWEIGBRUCKER]: [
    EHorseCoat.BAY,
    EHorseCoat.GRAY,
    EHorseCoat.CHESTNUT,
    EHorseCoat.ANY,
    EHorseCoat.OTHER,
  ],
};
