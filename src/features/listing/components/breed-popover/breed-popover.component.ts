import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonToolbar,
  PopoverController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-breed-popover',
  imports: [
    IonItem,
    IonToolbar,
    IonList,
    IonContent,
    FormsModule,
    IonHeader,
    CommonModule,
    ReactiveFormsModule,
    IonIcon,
  ],
  templateUrl: './breed-popover.component.html',
})
export class BreedPopoverComponent implements OnInit {
  @Input() allBreeds: string[] = [];
  @Input() selected?: string;

  private popoverCtrl = inject(PopoverController);

  protected search = '';
  protected filteredBreeds: string[] = [];

  ngOnInit() {
    this.filteredBreeds = [...this.allBreeds];
  }

  filter() {
    const term = this.search.toLowerCase();
    this.filteredBreeds = this.allBreeds.filter(b => b.toLowerCase().includes(term));
  }

  select(breed: string) {
    this.popoverCtrl.dismiss(breed);
  }
}
