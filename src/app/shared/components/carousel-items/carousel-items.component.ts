import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CarouselDetails, CarouselHome } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel-items',
  standalone: true,
  imports: [CommonModule, NgbModule, NgbCarouselModule],
  templateUrl: './carousel-items.component.html',
  styleUrl: './carousel-items.component.css'
})
export class CarouselItemsComponent implements OnChanges {

  @Input() categories!: CarouselHome[];
  @Input() products_details!: CarouselDetails[];
  @Input() page!: String;

  slides: CarouselHome[][] = []; // Array de arrays para agrupar los ítems en bloques de 7.

  selectIndex = 0;
  selectIndex_product_img = 0;

  constructor() { }

  ngOnChanges(): void {
    if (this.categories?.length) {
      this.createSlides();
    }
  }

  createSlides(): void {
    const itemsPerSlide = 10;
    this.slides = [];

    for (let i = 0; i < this.categories.length; i += itemsPerSlide) {
      // Dividimos las categorías en bloques de 7.
      this.slides.push(this.categories.slice(i, i + itemsPerSlide));
    }
  }

}
