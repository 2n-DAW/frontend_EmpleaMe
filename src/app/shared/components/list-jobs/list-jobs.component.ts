import { Component, OnInit } from '@angular/core';
import { Job } from '../../../core/models';
import { JobService, CategoryService } from '../../../core/services';
import { ActivatedRoute } from '@angular/router'
import { Category } from '../../../core/models';
import { CommonModule, Location } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { Filters } from '../../../core/models/filters.model';


@Component({
  selector: 'app-list-jobs',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './list-jobs.component.html',
  styleUrl: './list-jobs.component.css'
})
export class ListJobsComponent implements OnInit {

  routeFilters!: string | null;
  jobs: Job[] = [];
  jobCount: number = 0;
  slug_Category!: string | null;
  listCategories: Category[] = [];
  filters = new Filters();
  currentPage: number = 1;  // Página actual


  constructor(private jobService: JobService,
    private ActivatedRoute: ActivatedRoute,
    private CategoryService: CategoryService,
    private Location: Location
  ) {
    // this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('filters');
  }

  //Lo que inicia
  ngOnInit(): void {
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');

    if (typeof(this.routeFilters) == "string") {
      this.filters = JSON.parse(atob(this.routeFilters));
      this.currentPage = this.filters.page || 1;
      
    } else {
      this.filters = new Filters();
    }
    

    this.getListForCategory();

    if (this.slug_Category !== null) {
      this.getJobsByCat();
    }

    else if(this.routeFilters !== null){
      this.filters.name = localStorage.getItem('search') ?? undefined; //Si no hay nada en el localStorage, se asigna undefined
      this.get_list_filtered(this.filters);
      
      //this.refreshRouteFilter();
      this.get_list_filtered(this.filters);
    }
    else {
      this.filters.name = localStorage.getItem('search') ?? undefined; //Si no hay nada en el localStorage, se asigna undefined
      this.updateFilters(this.filters);
     // localStorage.removeItem('search');
    }
  }
  nameFilter(search: string) {
    this.filters.name = search;
    console.log(this.filters);
  }

  
  getListForCategory() {
    this.CategoryService.all_categories_select().subscribe(
      (data: any) => {
        this.listCategories = data.categories;
      }
    );
  }

  getJobsByCat() {
    if (this.slug_Category !== null) {
      console.log(this.slug_Category);
      this.jobService.getJobsByCategory(this.slug_Category).subscribe(
        (data: any) => {
          this.jobs = data.jobs;
          this.jobCount = this.jobs.length;
          // this.totalPages = Array.from(new Array(Math.ceil(this.jobCount/this.limit)), (val, index) => index + 1);
          
        });
    }
  }
  
  // refreshRouteFilter() {
  //   this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
  //   if(typeof(this.routeFilters) == "string") {
  //     this.filters = JSON.parse(atob(this.routeFilters));
  //   } else {
  //     this.filters = new Filters();
  //   }
  // }
  
  get_list_filtered(filters: Filters) {
    this.filters = filters;
      this.jobService.getJobsFilter(filters).subscribe(
        (data: any) => {
          this.jobs = data.jobs;
          this.jobCount = data.job_count;
          // this.totalPages = Array.from(new Array(Math.ceil(this.jobCount/this.limit)), (val, index) => index + 1);
      });
  }

  updateFilters(newFilters: Filters) {
    // if (typeof this.routeFilters === 'string') {
    //   this.refreshRouteFilter();
    // }

    this.currentPage = newFilters.page || 1;
    
    for (const key in newFilters) {
        if (newFilters[key] !== undefined && newFilters[key] !== null)
        this.filters[key] = newFilters[key];
    }
    // console.log("updateFilters:\n", this.filters);

    this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
    this.get_list_filtered(this.filters);
  }

}
