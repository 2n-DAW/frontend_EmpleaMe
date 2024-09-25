import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { CardCategoryComponent } from './components/card-category/card-category.component';
import { ListJobsComponent } from './components/list-jobs/list-jobs.component';
import { CardJobComponent } from './components/card-job/card-job.component';
import { CarouselItemsComponent } from './components/carousel-items/carousel-items.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InfiniteScrollDirective,
    ListCategoriesComponent,
    CardCategoryComponent,
    CarouselItemsComponent,
    CarouselComponent,
    ListJobsComponent,
    CardJobComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InfiniteScrollDirective,
    ListCategoriesComponent,
    CardCategoryComponent,
    CarouselItemsComponent,
    CarouselComponent,
    ListJobsComponent,
    CardJobComponent
  ],
})
export class SharedModule { }