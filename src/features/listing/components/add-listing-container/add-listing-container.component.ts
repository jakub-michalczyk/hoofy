import {
  Component,
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
import { Router } from '@angular/router';

type IFileSlot = { id: number; content: string } | null;

@Component({
  selector: 'hoof-add-listing-container',
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
  templateUrl: './add-listing-container.component.html',
})
export class AddListingContainerComponent {
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef<HTMLInputElement>>;

  protected form: FormGroup;
  protected submitted = false;
  private uploading = false;
  protected CATEGORIES_GROUPED_BY_TYPE = CATEGORIES_GROUPED_BY_TYPE;

  protected imageSlots = [1, 2, 3, 4];

  protected files: WritableSignal<IFileSlot[]> = signal(Array(5).fill(null));
  private activeIndex: number | null = null;

  private fb = inject(FormBuilder);
  protected store = inject(ListingStore);
  private filtersStore = inject(FiltersStore);
  private router = inject(Router);
  private auth = inject(Auth);

  private imageUpload = inject(ImageUploadService);

  constructor() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0)]],
      phone: ['', [Validators.pattern(/^[0-9+\s()-]{6,20}$/)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      reservation: [null],
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

  removeImage(idx: number) {
    const copy = [...this.files()];
    copy[idx] = null;
    this.files.set(copy);
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
      return;
    }

    this.uploading = true;

    try {
      const payload: Partial<IListingItem> = {
        ...this.form.value,
        location: this.store.location(),
        category: this.store.category(),
        subCategory: this.store.subCategory(),
        promoted: false,
        date: new Date().getDate(),
        type: this.isCategoryService ? EListingType.SERVICES : EListingType.ADS,
        userId: this.auth.currentUser?.uid,
        details: this.filtersStore.horseFilters(),
        lat: this.store.listingCords().lat,
        lng: this.store.listingCords().lng,
        images: [],
      };

      const created = await this.store.addListing(payload as IListingItem);
      const listingId = created.id as string;

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

      if (files.length === 0) {
        this.uploading = false;
        this.form.reset();
        return;
      }

      const folder = `listings/${listingId}`;
      let urls: string[] = [];
      try {
        urls = await this.imageUpload.uploadFiles(files, folder, 3);
      } catch (uploadErr) {
        console.error('Image upload failed', uploadErr);
        await this.store.patchListingImages(listingId, []);
        this.uploading = false;
        this.form.reset();
        return;
      }

      await this.store.patchListingImages(listingId, urls);

      this.uploading = false;
      this.form.reset();
      this.router.navigate(['listing', this.store.category(), this.store.subCategory(), listingId]);
    } catch (err) {
      console.error('Failed to create listing', err);
      this.uploading = false;
    }
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
