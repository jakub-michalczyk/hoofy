import { Component, inject } from '@angular/core';
import { ListingStore } from '../../../listing/store/listing.store';
import { IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'hoof-pagination',
  imports: [IonIcon, CommonModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  store = inject(ListingStore);
  router = inject(Router);
  pageRange = 5;

  get currentPage() {
    return this.store.currentPage();
  }

  get totalPages() {
    return Math.ceil(this.store.totalCount() / this.store.pageSize());
  }

  get pages(): (number | '...')[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const half = Math.floor(this.pageRange / 2);

    let start = current - half;
    let end = current + half;

    if (start < 1) {
      start = 1;
      end = Math.min(total, this.pageRange);
    } else if (end > total) {
      end = total;
      start = Math.max(1, total - this.pageRange + 1);
    }

    const pages: (number | '...')[] = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total) {
      if (end < total - 1) pages.push('...');
      pages.push(total);
    }

    return pages;
  }

  prev() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
      this.store.setPage(this.currentPage - 1);
    }
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
      this.store.setPage(this.currentPage + 1);
    }
  }

  goTo(page: number | '...') {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.store.setPage(page);
      this.changePage(page);
    }
  }

  changePage(newPage: number) {
    this.router.navigate([], {
      queryParams: { page: newPage },
      queryParamsHandling: 'merge',
    });
  }
}
