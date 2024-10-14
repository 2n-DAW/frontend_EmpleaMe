import { Component, OnInit } from '@angular/core';
import { CarouselDetails, CarouselHome } from '../../../core/models';
import { CarouselService } from '../../../core/services';
import { ActivatedRoute } from '@angular/router';
import { CarouselItemsComponent } from '../carousel-items/carousel-items.component';


@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [CarouselItemsComponent],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css'
})

export class CarouselComponent implements OnInit {

    items_categories!: CarouselHome[];
    items_details!: CarouselDetails[];
    slug_details!: string | null;
    page!: string;

    currentSlide = 0;
    totalSlides = 0;

    constructor(
        private CarouselService: CarouselService,
        private ActivatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.slug_details = this.ActivatedRoute.snapshot.paramMap.get('slug');

        if (this.slug_details) {
            this.carousel_details();
        } else {
            this.carousel_categories();
        }
    }

    carousel_categories(): void {
        this.page = "home";
        this.CarouselService.getCarouselHome().subscribe((data: any) => {
            this.items_categories = data.categories;
            this.totalSlides =  Math.ceil(this.items_categories.length / 10); // 10 items por slide
        });
    }

    carousel_details(): void {
        this.page = "details";
        this.CarouselService.getCarouselDetails(this.slug_details).subscribe((data: any) => {
            this.items_details = data.job.images;
            this.totalSlides =  Math.ceil(this.items_details.length / 3); // 3 items por slide
        });
    }

    next() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    prev() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    updateCarousel() {
        const carousel = document.getElementById('carousel-items');
        if (carousel) {
            carousel.style.transform = `translateX(-${this.currentSlide * 100}%)`;
            // carousel.style.transform = `translateX(-${this.currentSlide * (100 / 3)}%)`;
        }
    }
}
