import { Component, OnInit } from '@angular/core';
import { Job } from '../../../core/models';
import { JobService, CategoryService } from '../../../core/services';
import { ActivatedRoute } from '@angular/router'
import { Category } from '../../../core/models';
import { CommonModule, Location } from '@angular/common';
import { CardJobComponent } from '../card-job/card-job.component';


@Component({
  selector: 'app-list-jobs',
  standalone: true,
  imports: [CommonModule, CardJobComponent],
  templateUrl: './list-jobs.component.html',
  styleUrl: './list-jobs.component.css'
})
export class ListJobsComponent implements OnInit {

  routeFilters!: string | null;
  jobs: Job[] = [];
  slug_Category!: string | null;
  listCategories: Category[] = [];
  //filters = new Filters();
  // offset: number = 0;
  // limit: number = 3;
  // totalPages: Array<number> = [];
  // currentPage: number = 1;


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
    else {
      this.getJobs();
    }
  }

  getJobs(): void {
    this.jobService.get_jobs().subscribe(
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

}

