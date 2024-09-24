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

  selectIndex = 0;
  selectIndex_product_img = 0;

  constructor() { }

  ngOnChanges(): void {

  }

}
