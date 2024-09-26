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
  slug_Category!: string | null;
  listCategories: Category[] = [];
  filters = new Filters();
  offset: number = 0;
  limit: number = 77;
  totalPages: Array<number> = [];
  currentPage: number = 1;


  constructor(private jobService: JobService,
    private ActivatedRoute: ActivatedRoute,
    private CategoryService: CategoryService,
    private Location: Location
  ) {
    // this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('filters');
  }

  //Lo que inicia
  ngOnInit(): void {
    console.log()
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    // console.log(this.ActivatedRoute.snapshot.paramMap.get('filters'));



    //this.getListForCategory();
    if (this.slug_Category !== null) {
      this.getJobsByCat();
    }
    else if(this.routeFilters !== null){
      this.refreshRouteFilter();
      this.get_list_filtered(this.filters);
    }
    else {
      this.getJobs();
    }
  }

  getJobs(): void {
    this.jobService.getJobs().subscribe(
      (data: any) => {
        this.jobs = data.jobs;
        console.log(data.jobs);
      });
  }

  getJobsByCat(): void {
    if (this.slug_Category !== null) {
      this.jobService.getJobsByCategory(this.slug_Category).subscribe(
        (data: any) => {
          console.log(data);
          this.jobs = data.jobs;

        });
    }
  }

  getListForCategory() {
    this.CategoryService.all_categories_select().subscribe(
      (data: any) => {
        this.listCategories = data.categories;
      }
    );
  }
  
  refreshRouteFilter() {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    if(typeof(this.routeFilters) == "string" ){
      this.filters = JSON.parse(atob(this.routeFilters));
    }else{
      this.filters = new Filters();
    }
  }
  
  get_list_filtered(filters: Filters) {
    this.filters = filters;
      this.jobService.getJobsFilter(filters).subscribe(
        (data: any) => {
          this.jobs = data.jobs;
          this.totalPages = Array.from(new Array(Math.ceil(data.job_count/this.limit)), (val, index) => index + 1);
          console.log(this.jobs);
          console.log(data.job_count);
      });
  }

}

