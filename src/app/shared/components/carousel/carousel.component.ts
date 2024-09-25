import { Component, OnInit, Input } from '@angular/core';
import { CarouselDetails, CarouselHome } from '../../../core/models';
import { CarouselService, JobService } from '../../../core/services';
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

  items_carousel!: CarouselHome[];
  items_details!: CarouselDetails[];
  slug_details!: string | null;
  page!: String;

  constructor(private CarouselService: CarouselService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.slug_details = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.carousel_categories();
    this.carousel_shop_details();
    console.log(this.items_carousel);
  }

  carousel_categories(): void {
    this.page = "categories";
    this.CarouselService.getCarouselHome().subscribe((data: any) => {
      this.items_carousel = data.categories;
      // Asegúrate de que los datos ya están cargados antes de loguearlos
      console.log('items_carousel:', this.items_carousel);
      console.log('page:', this.page);
    });
  }

  carousel_shop_details(): void {
    if (this.slug_details) {
      this.page = "details";
      this.CarouselService.getCarouselDetails(this.slug_details).subscribe((data: any) => {
        this.items_details = data.products.images;
        // Asegúrate de que los datos ya están cargados antes de loguearlos
        console.log('items_details:', this.items_details);
        console.log('page:', this.page);
      });
    }
  }

  currentSlide = 0;
  totalSlides = 0;

  next() {
    this.totalSlides =  Math.ceil(this.items_carousel.length / 7); // Número de "grupos" de 7 ítems
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
  }

  prev() {
    this.totalSlides = Math.ceil(this.items_carousel.length / 7); // Número de "grupos" de 7 ítems
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
  }

  updateCarousel() {
    const carousel = document.getElementById('carousel-items');
    if (carousel) {
      carousel.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
  }
}
