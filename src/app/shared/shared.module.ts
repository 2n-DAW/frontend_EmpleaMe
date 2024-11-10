import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { CardCategoryComponent } from './components/card-category/card-category.component';
import { ListJobsComponent } from './components/list-jobs/list-jobs.component';
import { CardJobComponent } from './components/card-job/card-job.component';
import { CarouselItemsComponent } from './components/carousel-items/carousel-items.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FiltersComponent } from './components/filters/filters.component';
import { PaginationComponent } from './components/pagination/pagination.component';
// import { MultiRangeSliderComponent } from './components/multi-range-slider/multi-range-slider.component';
import { SearchComponent } from './components/search/search.component';
import { FollowButtonComponent } from './components/buttons/follow-button/follow-button.component';
import { FavoriteButtonComponent } from './components/buttons/favorite-button/favorite-button.component';
import { InscriptionButtonComponent } from './components/buttons/inscription-button/inscription-button.component';
import { InscriptionValidationButtonComponent } from './components/buttons/inscription-validation-button/inscription-validation-button.component';
import { ListCommentsComponent } from './components/list-comments/list-comments.component';
import { CardCommentComponent } from './components/card-comment/card-comment.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
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
    FollowButtonComponent,
    FavoriteButtonComponent,
    InscriptionButtonComponent,
    InscriptionValidationButtonComponent,
    ListCommentsComponent,
    CardCommentComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
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
    FollowButtonComponent,
    FavoriteButtonComponent,
    InscriptionButtonComponent,
    InscriptionValidationButtonComponent,
    ListCommentsComponent,
    CardCommentComponent,
  ],
})
export class SharedModule { }