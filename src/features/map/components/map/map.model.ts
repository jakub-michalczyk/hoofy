export interface IMapData {
  cords: [number, number];
  listingId?: string;
}

export interface INominatimResult {
  lat: string;
  lon: string;
  display_name?: string;
}
