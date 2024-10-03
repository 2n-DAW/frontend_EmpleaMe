import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { CardCategoryComponent } from './components/card-category/card-category.component';
import { ListJobsComponent } from './components/list-jobs/list-jobs.component';
import { CardJobComponent } from './components/card-job/card-job.component';
import { CarouselItemsComponent } from './components/carousel-items/carousel-items.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FiltersComponent } from './components/filters/filters.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MultiRangeSliderComponent } from './components/multi-range-slider/multi-range-slider.component';
import { SearchComponent } from './components/search/search.component';
import { ListErrorsComponent } from './components/list-errors/list-errors.component';


@NgModule({
  imports: [
    
    RouterModule,
    InfiniteScrollDirective,
    ListCategoriesComponent,
    CardCategoryComponent,
    CarouselItemsComponent,
    CarouselComponent,
    ListJobsComponent,
    CardJobComponent,
    FiltersComponent,
    PaginationComponent,
    SearchComponent,
    ListErrorsComponent
    //  MultiRangeSliderComponent
  ],
  exports: [
    
    RouterModule,
    InfiniteScrollDirective,
    ListCategoriesComponent,
    CardCategoryComponent,
    CarouselItemsComponent,
    CarouselComponent,
    ListJobsComponent,
    CardJobComponent,
    FiltersComponent,
    PaginationComponent,
    SearchComponent,
    ListErrorsComponent
    // MultiRangeSliderComponent
  ],
})
export class SharedModule { }