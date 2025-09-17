import { AfterViewInit, Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular/standalone';
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

@Component({
  selector: 'hoof-map',
  imports: [],
  templateUrl: './map.component.html',
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true })
  private mapContainer!: ElementRef<HTMLDivElement>;
  private popoverCtrl = inject(PopoverController);
  private map!: Map;
  private vectorSource = new VectorSource();
  private store = inject(ListingStore);
  private filtersStore = inject(FiltersStore);

  ngAfterViewInit(): void {
    this.initMap();
    this.loadInViewport();
    this.loadEvents();
  }

  initMap() {
    const center = fromLonLat([19.05, 50.2649]);
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

  loadEvents() {
    this.map.on('moveend', () => this.loadInViewport());

    this.map.on('pointermove', evt => {
      const hit = this.map.hasFeatureAtPixel(evt.pixel);
      const mapEl = this.map.getTargetElement();
      mapEl.classList.toggle('cursor-pointer', hit);
      mapEl.classList.toggle('cursor-auto', !hit);
    });

    this.map.on('singleclick', async evt => {
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
    });
  }

  handleDataChange() {
    effect(() => {
      this.store.category();
      this.store.subCategory();
      this.store.searchTerm();
      this.store.city();
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

    const listings = await this.store.loadInViewport({
      latMin: sw[1],
      lngMin: sw[0],
      latMax: ne[1],
      lngMax: ne[0],
    });

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
