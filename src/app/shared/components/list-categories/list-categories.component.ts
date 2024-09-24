import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services';
import { Category } from '../../../core/models';
import { CardCategoryComponent } from '../card-category/card-category.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [CardCategoryComponent, InfiniteScrollDirective],
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  offset = 0;
  limit = 4;
  categories: Category[] = [];

  constructor(private CategoryService: CategoryService) { }

  // Inicia 
  ngOnInit(): void {
    this.getCategories();
  }

  // Cargamos las categorias
  getCategories() {
    // Creamos objeto con offset y limit
    const params = this.getRequestParams(this.offset, this.limit);

    this.CategoryService.all_categories(params).subscribe(
      (data: any) => {
        this.categories = data.categories;
        this.limit = this.limit + 4;
        // console.log(this.categories, this.limit); 
      }
    );
  }

  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  scroll() {
    this.getCategories();
  }
}
