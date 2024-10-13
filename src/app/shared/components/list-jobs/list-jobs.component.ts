import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Job, Category, Contract, WorkingDay, Province, Filters, User, UserJobs } from '../../../core/models';
import { JobService, CategoryService, ContractService, WorkingDayService, ProvinceService } from '../../../core/services';
import { ActivatedRoute } from '@angular/router'
import { SharedModule } from '../../shared.module';
import { CardJobComponent } from '../card-job/card-job.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { FiltersComponent } from '../filters/filters.component';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-list-jobs',
  standalone: true,
  imports: [CommonModule, CardJobComponent, PaginationComponent, FiltersComponent],
  templateUrl: './list-jobs.component.html',
  styleUrl: './list-jobs.component.css'
})
export class ListJobsComponent implements OnInit {
  routeFilters!: string | null;
  jobs: Job[] = [];
  jobCount: number = 0;
  slug_Category!: string | null;
  listCategories: Category[] = [];
  listContracts: Contract[] = [];
  listWorkingDays: WorkingDay[] = [];
  listProvinces: Province[] = [];
  filters = new Filters();
  currentPage: number = 1;
  username: string = '';

  @Input() mode: number = 0;

  constructor(private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private provinceService: ProvinceService,
    private contractService: ContractService,
    private workingDayService: WorkingDayService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.mode === 0) {
      this.mode0();
    } else if (this.mode === 1) {
      this.mode1();
    } else if (this.mode === 2) {
      this.mode2();
    }
  }

  mode0(): void {
    // Modo 0: Obtén slug y filters de la URL (codificados)
    this.slug_Category = this.activatedRoute.snapshot.paramMap.get('slug');
    this.routeFilters = this.activatedRoute.snapshot.paramMap.get('filters');

    if (typeof (this.routeFilters) === "string") {
      this.filters = JSON.parse(atob(this.routeFilters));
      this.currentPage = this.filters.page || 1;
    } else {
      this.filters = new Filters();
    }

    // Cargar listas de filtros
    this.getListForCategory();
    this.getListForContract();
    this.getListForWorkingDay();
    this.getListForProvince();

    // Obtener trabajos según el slug o filtros
    if (this.slug_Category !== null) {
      this.getJobsByCat();
    } else if (this.routeFilters !== null) {
      this.filters.name = localStorage.getItem('search') ?? undefined;
      this.get_list_filtered(this.filters);
    } else {
      this.filters.name = localStorage.getItem('search') ?? undefined;
      this.updateFilters(this.filters);

    }
  }

  mode1(): void {
    // Modo 1: Obtén username de la URL (no codificada)
    this.activatedRoute.parent?.paramMap.subscribe(params => {
      this.username = params.get('username') ?? '';

      if (this.username) {
        this.loadUserJobs(this.username);
      }
    });
  }

  mode2(): void {
    this.activatedRoute.parent?.paramMap.subscribe(params => {
      this.username = params.get('username') ?? '';

      if (this.username) {
        this.loadUserLikes(this.username);
      }
    });
  }

  loadUserJobs(username: string): void {
    this.jobService.getUserJobs(username).subscribe(
      (data: any) => {

        this.jobs = data.jobs;

        console.log(this.jobs);
        this.jobCount = data.job_count;
        this.cdr.detectChanges();
      }
    );
  }

  loadUserLikes(username: string): void {
    this.jobService.getUserLikes(username).subscribe(
      (data: any) => {
        this.jobs = data.jobs;
        this.jobCount = data.job_count;

        console.log(this.jobs);
        console.log(this.jobCount);
        this.cdr.detectChanges();
      });
  }


  get_list_filtered(filters: Filters) {
    this.filters = filters;
    this.jobService.getJobsFilter(filters).subscribe(
      (data: any) => {
        this.jobs = data.jobs;
        // console.log(this.jobs);
        this.jobCount = data.job_count;
      });
  }





  // Carga datos en filtro Categorías
  getListForCategory() {
    this.categoryService.all_categories_select().subscribe(
      (data: any) => {
        this.listCategories = data.categories;
      }
    );
  }

  // Carga datos en filtro Contratos
  getListForContract() {
    this.contractService.getAllContracts().subscribe(
      (data: any) => {
        this.listContracts = data.contracts;
      }
    );
  }

  // Carga datos en filtro Jornadas
  getListForWorkingDay() {
    this.workingDayService.getAllWorkingDays().subscribe(
      (data: any) => {
        this.listWorkingDays = data.workingDays;
      }
    );
  }

  // Carga datos en filtro Provincias
  getListForProvince() {
    this.provinceService.getAllProvinces().subscribe(
      (data: any) => {
        this.listProvinces = data.provinces;
      }
    );
  }

  getJobsByCat() {
    if (this.slug_Category !== null) {
      this.jobService.getJobsByCategory(this.slug_Category).subscribe(
        (data: any) => {
          this.jobs = data.jobs;
          this.jobCount = this.jobs.length;
        });
    }
  }



  updateFilters(newFilters: Filters) {
    this.currentPage = newFilters.page || 1;

    for (const key in newFilters) {
      if (newFilters[key] !== undefined && newFilters[key] !== null) {
        this.filters[key] = newFilters[key];
      }
    }

    this.location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
    this.get_list_filtered(this.filters);
  }
}