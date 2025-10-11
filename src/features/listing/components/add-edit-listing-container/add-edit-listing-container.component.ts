import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  QueryList,
  signal,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { IonButton, IonCheckbox, IonIcon } from '@ionic/angular/standalone';
import { CategorySelectorComponent } from '../category-selector/category-selector.component';
import { DetailsFilterComponent } from '../details-filter/details-filter.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ListingStore } from '../../store/listing.store';
import {
  CATEGORIES_GROUPED_BY_TYPE,
  ECategoryName,
  EListingType,
} from '../../../core/model/category.model';
import { IListingItem } from '../listing-item/listing-item.model';
import { Auth } from '@angular/fire/auth';
import { MapComponent } from '../../../map/components/map/map.component';
import { SearchLocationComponent } from '../../../core/components/search-location/search-location.component';
import { FiltersStore } from '../../store/filters.store';
import { ImageUploadService } from '../../services/image-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListingFiltersFacadeService } from '../../../core/services/listing-filters-facade.service';

type IFileSlot = { id: number; content: string } | null;

@Component({
  selector: 'hoof-add-edit-listing-container',
  imports: [
    IonIcon,

    CategorySelectorComponent,
    DetailsFilterComponent,
    IonCheckbox,
    IonButton,
    NgTemplateOutlet,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MapComponent,
    SearchLocationComponent,
  ],
  templateUrl: './add-edit-listing-container.component.html',
})
export class AddEditListingContainerComponent {
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef<HTMLInputElement>>;

  form: FormGroup;
  submitted = false;
  uploading = false;
  CATEGORIES_GROUPED_BY_TYPE = CATEGORIES_GROUPED_BY_TYPE;

  imageSlots = [1, 2, 3, 4];

  files: WritableSignal<IFileSlot[]> = signal(Array(5).fill(null));
  activeIndex: number | null = null;

  editMode = signal(false);

  private destroyerRef = inject(DestroyRef);
  private currentListingData: IListingItem | null = null;

  fb = inject(FormBuilder);
  store = inject(ListingStore);
  filtersStore = inject(FiltersStore);
  listingStore = inject(ListingStore);
  facade = inject(ListingFiltersFacadeService);
  router = inject(Router);
  auth = inject(Auth);
  route = inject(ActivatedRoute);
  data$: Observable<IListingItem | null> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      if (!id) return of(null);

      return this.listingStore.getListingById(id).pipe(tap(() => this.editMode.set(true)));
    })
  );

  private imageUpload = inject(ImageUploadService);

  constructor() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0)]],
      phone: ['', [Validators.pattern(/^[0-9+\s()-]{6,20}$/)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      reservation: [null],
    });

    this.checkForEditData();
    this.data$
      .pipe(
        filter((d): d is IListingItem => d !== null),
        takeUntilDestroyed(this.destroyerRef)
      )
      .subscribe(d => {
        this.currentListingData = d ?? null;
      });
  }

  checkForEditData() {
    this.data$.pipe(takeUntilDestroyed(this.destroyerRef)).subscribe(data => {
      if (data !== null) {
        this.store.setCategory(data.category);
        this.store.setSubCategory(data.subCategory!);
        this.store.setCity(data.location);
        this.store.addListingCords(data.lat, data.lng);
        this.facade.cityTerm.set(data.location);

        const imageSlots: IFileSlot[] = data.images.map((img, index) => ({
          id: index,
          content: img,
        }));

        this.files.set(imageSlots);

        this.form.setValue({
          title: data.title,
          price: data.price,
          description: data.description,
          reservation: [],
          phone: data.phone,
        });
      }
    });
  }

  triggerFileSelect(e: Event, index: number) {
    e.preventDefault();
    this.activeIndex = index;
    const inputRef = this.fileInputs.find(
      el => Number(el.nativeElement.dataset['index']) === index
    );
    if (!inputRef) {
      this.fileInputs.first?.nativeElement?.click();
      return;
    }
    inputRef.nativeElement.value = '';
    inputRef.nativeElement.click();
  }

  onFilesSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0 || index === null) {
      this.activeIndex = null;
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      const copy = [...this.files()];
      copy[index] = { id: index, content };
      this.files.set(copy);
      this.activeIndex = null;
    };
    reader.readAsDataURL(file);
  }

  removeImage(event: Event, idx: number) {
    event.preventDefault();
    const copy = [...this.files()];
    copy[idx] = null;
    this.files.set(copy);
  }

  async onSubmit(e: Event): Promise<void> {
    e.preventDefault();
    this.submitted = true;

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
      return;
    }

    this.uploading = true;

    if (this.editMode()) {
      this.edit();
    } else {
      this.add();
    }
  }

  async edit() {
    try {
      if (!this.currentListingData?.id) {
        throw new Error('No listing id for edit');
      }

      const payload = this.preparePayload({ id: this.currentListingData?.id } as IListingItem);
      await this.store.updateListing(this.currentListingData?.id, payload as IListingItem);

      const files = await this.filesFromSlots();

      try {
        await this.uploadAndPatchImages(this.currentListingData?.id, files);
      } catch (uploadErr) {
        console.error('Image upload failed', uploadErr);
        await this.store.patchListingImages(this.currentListingData?.id, []);
        this.uploading = false;
        this.form.reset();
        return;
      }

      this.uploading = false;
      this.form.reset();
      this.router.navigate([
        'listing',
        this.store.category(),
        this.store.subCategory(),
        this.currentListingData?.id,
      ]);
    } catch (err) {
      console.error('Failed to edit listing', err);
      this.uploading = false;
    }
  }

  async add() {
    try {
      const payload = this.preparePayload();
      const created = await this.store.addListing(payload as IListingItem);
      const listingId = created.id as string;

      const files = await this.filesFromSlots();

      if (files.length === 0) {
        this.uploading = false;
        this.form.reset();
        this.router.navigate([
          'listing',
          this.store.category(),
          this.store.subCategory(),
          listingId,
        ]);
        return;
      }

      try {
        await this.uploadAndPatchImages(listingId, files);
      } catch (uploadErr) {
        console.error('Image upload failed', uploadErr);
        await this.store.patchListingImages(listingId, []);
        this.uploading = false;
        this.form.reset();
        return;
      }

      this.uploading = false;
      this.form.reset();
      this.router.navigate(['listing', this.store.category(), this.store.subCategory(), listingId]);
    } catch (err) {
      console.error('Failed to create listing', err);
      this.uploading = false;
    }
  }

  private preparePayload(overrides: Partial<IListingItem> = {}): Partial<IListingItem> {
    return {
      ...this.form.value,
      location: this.store.location(),
      category: this.store.category(),
      subCategory: this.store.subCategory(),
      promoted: false,
      type: this.isCategoryService ? EListingType.SERVICES : EListingType.ADS,
      userId: this.auth.currentUser?.uid,
      details: this.filtersStore.horseFilters(),
      lat: this.store.listingCords().lat,
      lng: this.store.listingCords().lng,
      createdAt: this.currentListingData?.createdAt || undefined,
      images: [],
      ...overrides,
    } as Partial<IListingItem>;
  }

  private async filesFromSlots(): Promise<File[]> {
    const rawSlots = this.files() as ({ id: number; content: string } | null)[];
    const dataUrls = rawSlots
      .filter((s): s is { id: number; content: string } => s !== null)
      .map(s => s.content);

    const files: File[] = await Promise.all(
      dataUrls.map(async (dataUrl, idx) => {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const ext = (blob.type.split('/')[1] || 'jpg').replace(/[^a-z0-9]+/gi, '');
        return new File([blob], `image_${Date.now()}_${idx}.${ext}`, { type: blob.type });
      })
    );

    return files;
  }

  private async uploadAndPatchImages(listingId: string, files: File[]): Promise<string[]> {
    if (files.length === 0) {
      await this.store.patchListingImages(listingId, []);
      return [];
    }

    const folder = `listings/${listingId}`;
    const urls = await this.imageUpload.uploadFiles(files, folder, 3);
    await this.store.patchListingImages(listingId, urls);
    return urls;
  }

  private finalizeAndNavigate(): void {
    this.uploading = false;
    this.form.reset();
    this.router.navigate([
      'listing',
      this.store.category(),
      this.store.subCategory(),
      this.currentListingData?.id,
    ]);
  }

  resetForm() {
    this.form.reset({
      title: '',
      price: null,
      location: '',
      phone: '',
      description: '',
      reservation: false,
    });
    this.files.set(Array(5).fill(null));
    this.submitted = false;
  }

  get isInvalid() {
    return (
      this.uploading ||
      this.form.invalid ||
      !this.anyImageUploaded ||
      !this.store.location() ||
      !this.store.category() ||
      !this.store.subCategory()
    );
  }

  get isCategoryService() {
    return CATEGORIES_GROUPED_BY_TYPE.services.includes(this.store.category() as ECategoryName);
  }

  get filesValue() {
    return this.files();
  }

  get anyImageUploaded() {
    return !this.files().every(img => img === null);
  }

  get isFirstImageUploaded() {
    return this.files()[0] === null;
  }
}
