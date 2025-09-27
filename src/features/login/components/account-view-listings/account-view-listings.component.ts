import { Component, computed, inject, signal } from '@angular/core';
import { AccountViewCardComponent } from '../account-view-card/account-view-card.component';
import { ListingStore } from '../../../listing/store/listing.store';
import { AuthService } from '../../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, map, of, switchMap } from 'rxjs';
import {
  EListingItemView,
  IListingItem,
} from '../../../listing/components/listing-item/listing-item.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ListingItemComponent } from '../../../listing/components/listing-item/listing-item.component';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-account-view-listings',
  imports: [AccountViewCardComponent, AsyncPipe, CommonModule, ListingItemComponent, IonButton],
  templateUrl: './account-view-listings.component.html',
})
export class AccountViewListingsComponent {
  protected auth = inject(AuthService);
  private listingStore = inject(ListingStore);
  listingsLength = signal(0);
  EListingView = EListingItemView;

  listings$ = toObservable(computed(() => this.auth.user())).pipe(
    map(user => {
      if (!user || !user.listings) return [] as string[];
      const raw = user.listings;
      this.listingsLength.set(raw.length);

      if (Array.isArray(raw)) return raw as string[];
      return Object.values(raw) as string[];
    }),
    switchMap((ids: string[]) => {
      if (!ids || ids.length === 0) return of([] as IListingItem[]);
      const obs = ids.map(id => this.listingStore.getListingById(id).pipe(map(v => v)));
      return combineLatest(obs).pipe(
        map(items => items.filter((i): i is IListingItem => i !== null))
      );
    })
  );
}
