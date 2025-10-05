import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular/standalone';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { fromLonLat, toLonLat } from 'ol/proj';
import { ListingStore } from '../../../listing/store/listing.store';
import { IListingItem } from '../../../listing/components/listing-item/listing-item.model';
import { ListingMapInfoComponent } from '../../../homepage/components/listing-map-info/listing-map-info.component';
import { FiltersStore } from '../../../listing/store/filters.store';
import { IMapData } from './map.model';

interface INominatimResult {
  lat: string;
  lon: string;
  display_name?: string;
}

@Component({
  selector: 'hoof-map',
  imports: [],
  templateUrl: './map.component.html',
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true })
  private mapContainer!: ElementRef<HTMLDivElement>;

  @Input() data: IMapData = { cords: [19.05, 50.2649] };
  @Input() coords?: [number, number];
  @Input() loadFeatures = true;
  @Input() addNew = false;
  @Input()
  set city(value: string | undefined) {
    const normalized = (value || '').trim();
    if (normalized === this._city) return;
    this._city = normalized;
    this.onCityChanged(normalized);
  }
  private _city?: string;

  private popoverCtrl = inject(PopoverController);
  private map!: Map;
  private vectorSource = new VectorSource();
  private store = inject(ListingStore);
  private filtersStore = inject(FiltersStore);
  private alertCtrl = inject(AlertController);
  private newFeature?: Feature;

  private cityCache: Record<string, [number, number]> = {};

  ngAfterViewInit(): void {
    this.setupMap().catch(err => {
      console.error('Nie udało się zainicjować mapy', err);
      this.initMapWithCoords(this.getInitialCoords());
      this.loadInViewport();
      this.loadEvents();
    });
  }

  private async setupMap() {
    const resolved = await this.resolveCityCoords();
    const initial = resolved ?? this.getInitialCoords();
    this.initMapWithCoords(initial);
    this.loadInViewport();
    this.loadEvents();
  }

  private async onCityChanged(city?: string) {
    if (!city) return;
    const coords = await this.resolveCityCoordsFor(city);
    if (!coords) return;
    if (this.map) {
      this.panTo(coords);
      this.loadInViewport();
    } else {
      this.coords = coords;
    }
  }

  private getInitialCoords(): [number, number] {
    const defaultCoords: [number, number] = [19.05, 50.2649];
    if (this.data?.cords && Array.isArray(this.data.cords) && this.data.cords.length === 2) {
      return [this.data.cords[0], this.data.cords[1]];
    }
    if (this.coords && this.coords.length === 2) {
      return this.coords;
    }
    return defaultCoords;
  }

  private initMapWithCoords([lng, lat]: [number, number]) {
    const center = fromLonLat([lng, lat]);
    this.map = new Map({
      target: this.mapContainer.nativeElement,
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({ source: this.vectorSource }),
      ],
      view: new View({ center, zoom: 12 }),
    });
    this.map.getViewport().classList.add('rounded');
  }

  private async resolveCityCoordsFor(city?: string): Promise<[number, number] | undefined> {
    const normalized = (city || '').trim();
    if (!normalized) return undefined;

    const key = normalized.toLowerCase();
    if (key in this.cityCache) return this.cityCache[key];

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(normalized)}&limit=1`;

    const controller = new AbortController();
    const timeoutMs = 7000;
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Accept-Language': 'pl' },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) {
        console.warn('Geocoding failed', res.status);
        return undefined;
      }

      const json = (await res.json()) as unknown;
      if (!Array.isArray(json) || json.length === 0) return undefined;

      const first = json[0] as Partial<INominatimResult>;
      const lat = parseFloat(String(first.lat));
      const lon = parseFloat(String(first.lon));
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return undefined;

      const coords: [number, number] = [lon, lat];
      this.cityCache[key] = coords;
      return coords;
    } catch (err) {
      clearTimeout(timeout);
      if ((err as Error)?.name === 'AbortError') {
        console.warn('Geocoding timed out for', normalized);
      } else {
        console.warn('Geocoding error for', normalized, err);
      }
      return undefined;
    }
  }

  private async resolveCityCoords(): Promise<[number, number] | undefined> {
    const city = (this.city || '').trim();
    if (!city) return undefined;

    if (city in this.cityCache) {
      return this.cityCache[city];
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Accept-Language': 'pl' },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        console.warn('Geocoding failed', res.status);
        return undefined;
      }

      const json = (await res.json()) as unknown;
      if (!Array.isArray(json) || json.length === 0) return undefined;

      const first = json[0] as Partial<INominatimResult>;
      const lat = parseFloat(String(first.lat));
      const lon = parseFloat(String(first.lon));
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        const coords: [number, number] = [lon, lat];
        this.cityCache[city] = coords;
        return coords;
      }
      return undefined;
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') {
        console.warn('Geocoding request timed out for city', city);
      } else {
        console.warn('Geocoding request error', err);
      }
      return undefined;
    }
  }

  private panTo([lng, lat]: [number, number]) {
    const view = this.map.getView();
    const dest = fromLonLat([lng, lat]);
    view.animate({ center: dest, duration: 600 });
  }

  loadEvents() {
    this.map.on('moveend', () => this.loadInViewport());

    this.map.on('pointermove', evt => {
      const mapEl = this.map.getTargetElement();

      if (!this.data.listingId) {
        const hit = this.map.hasFeatureAtPixel(evt.pixel);
        mapEl.classList.toggle('cursor-pointer', hit);
        mapEl.classList.toggle('cursor-auto', !hit);
      }

      if (this.addNew) {
        mapEl.classList.add('cursor-pointer');
      }
    });

    this.map.on('singleclick', async evt => {
      if (this.addNew) {
        const coord = toLonLat(evt.coordinate);
        const lng = coord[0];
        const lat = coord[1];

        const alert = await this.alertCtrl.create({
          header: 'Dodaj lokalizację',
          message: 'Czy chcesz dodać lokalizację w tym miejscu?',
          cssClass: '_hoof-alert',
          buttons: [
            { text: 'Anuluj', role: 'cancel' },
            {
              text: 'Dodaj',
              handler: () => {
                this.addNewMarker(lat, lng);
                this.loadInViewport();
              },
            },
          ],
        });
        await alert.present();
        return;
      }

      if (!this.data.listingId) {
        const features = this.map.getFeaturesAtPixel(evt.pixel);
        if (!features?.length) return;
        const feature = features[0];
        const listing = feature.get('listing') as IListingItem;
        if (!listing) return;
        const pop = await this.popoverCtrl.create({
          component: ListingMapInfoComponent,
          componentProps: { listing },
          event: evt.originalEvent,
          translucent: true,
          reference: 'event',
          alignment: 'center',
          size: 'auto',
        });
        await pop.present();
      }
    });
  }

  private addNewMarker(lat: number, lng: number, listing?: IListingItem) {
    if (this.newFeature) {
      this.vectorSource.removeFeature(this.newFeature);
      this.newFeature = undefined;
    } else {
      const featuresToRemove = this.vectorSource.getFeatures().filter(f => f.get('isNew'));
      featuresToRemove.forEach(f => this.vectorSource.removeFeature(f));
    }

    const feat = new Feature({
      geometry: new Point(fromLonLat([lng, lat])),
    });

    if (listing) {
      feat.set('listing', listing);
    } else {
      feat.set('isNew', true);
    }

    feat.setStyle(
      new Style({
        image: new Icon({
          src: 'assets/images/marker.png',
          anchor: [0.5, 1],
          scale: 0.3,
        }),
      })
    );

    this.store.addListingCords(lat, lng);
    this.vectorSource.addFeature(feat);
    this.newFeature = feat;
  }

  handleDataChange() {
    effect(() => {
      this.store.category();
      this.store.subCategory();
      this.store.searchTerm();
      this.store.location();
      this.store.priceFrom();
      this.store.priceTo();
      this.filtersStore.horseFilters();

      this.loadInViewport();
    });
  }

  private async loadInViewport(): Promise<void> {
    const extent = this.map.getView().calculateExtent(this.map.getSize());
    const [minX, minY, maxX, maxY] = extent;
    const sw = toLonLat([minX, minY]);
    const ne = toLonLat([maxX, maxY]);

    const listings = await this.store.loadInViewport(
      {
        latMin: sw[1],
        lngMin: sw[0],
        latMax: ne[1],
        lngMax: ne[0],
      },
      this.data.listingId
    );

    if (this.loadFeatures) {
      const features = listings.map(item => {
        const feat = new Feature({
          geometry: new Point(fromLonLat([item.lng, item.lat])),
        });

        feat.set('listing', item);
        feat.setStyle(
          new Style({
            image: new Icon({
              src: 'assets/images/marker.png',
              anchor: [0.5, 1],
              scale: 0.3,
            }),
          })
        );
        return feat;
      });

      this.vectorSource.clear();
      this.vectorSource.addFeatures(features);
    }
  }
}
