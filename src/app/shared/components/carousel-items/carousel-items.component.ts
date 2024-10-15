import { Component, Input, OnChanges } from '@angular/core';
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
    @Input() jobDetails!: CarouselDetails[];
    @Input() page!: String;

    // Array de arrays para agrupar los ítems en slides
    slidesCategories: CarouselHome[][] = [];
    slidesDetails: CarouselDetails[][] = [];

    constructor() { }

    ngOnChanges(): void {
        if (this.categories?.length) {
            // Slide de categorías de 10 items
            this.createSlides(10);
        }

        if (this.jobDetails?.length) {
            // Slide de details de 3 items
            this.createSlides(3);
        }
        
    }

    createSlides(itemsPerSlide: number): void {
        if (this.page === "home") {
            this.slidesCategories = [];
            for (let i = 0; i < this.categories.length; i += itemsPerSlide) {
                this.slidesCategories.push(this.categories.slice(i, i + itemsPerSlide));
            }
        }

        if (this.page === "details") {
            this.slidesDetails = [];
            for (let i = 0; i < this.jobDetails.length; i += itemsPerSlide) {
                this.slidesDetails.push(this.jobDetails.slice(i, i + itemsPerSlide));
            }
        }
    }

}
