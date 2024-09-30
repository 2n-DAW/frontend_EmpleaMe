import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category, Contract, WorkingDay, Province, Filters } from '../../../core/models';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { MultiRangeSliderComponent } from '../multi-range-slider/multi-range-slider.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchComponent, MultiRangeSliderComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit {

  @Input() listCategories: Category[] = [];
  @Input() listContracts: Contract[] = [];
  @Input() listWorkingDays: WorkingDay[] = [];
  @Input() listProvinces: Province[] = [];
  @Output() eventofiltros: EventEmitter<Filters> = new EventEmitter();
  
  routeFilters: string | null = null;
  filters!: Filters 
  id_cat: string = "";
  id_contract: string = "";
  id_workingDay: string = "";
  id_province: string = "";
  salary_min: number = 900;
  salary_max: number = 50000;
 
  name: string = "";
  
  
  constructor( private ActivatedRoute: ActivatedRoute, private Router: Router, private Location: Location ) 
  {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
  }

    ngOnInit() : void {
      this.ActivatedRoute.snapshot.paramMap.get('filters') != undefined ? this.Highlights() : "";
      this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
      this.name = localStorage.getItem('search') || this.name;
      localStorage.removeItem('search');
    }

    public filter_jobs() {
      
      this.name = localStorage.getItem('search') || this.name;
      localStorage.removeItem('search');

      this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
      console.log(this.routeFilters);
      
      if (this.routeFilters != null) {
        this.filters = new Filters();
        this.filters = JSON.parse(atob(this.routeFilters));
      } else {
        this.filters = new Filters();
      }

      if (this.id_cat) { // se recoge del html [(ngModel)]="id_cat"
        this.filters.category = this.id_cat;
      }
      if (this.id_contract) { // se recoge del html [(ngModel)]="id_contract"
        this.filters.contract = this.id_contract;
      }
      if (this.id_workingDay) { // se recoge del html [(ngModel)]="id_workingDay"
        this.filters.workingDay = this.id_workingDay;
      }
      if (this.id_province) { // se recoge del html [(ngModel)]="id_province"
        this.filters.province = this.id_province;
        // console.log(this.id_province);
      }
      const search = localStorage.getItem('search');
      
      this.filters.name = this.name;
      this.filters.salary_min = this.salary_min ? this.salary_min : undefined;
      this.filters.salary_max = this.salary_max == 0 || this.salary_max == null ? undefined : this.salary_max;

      // reinicia la paginación al ejecutar cualquier filtro
      this.filters.page = 1;
      this.filters.limit = 2;
      this.filters.offset = 0;
      
      setTimeout(() => {
          this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
          this.eventofiltros.emit(this.filters);
      }, 200);

    }


    public remove_filters(){
      window.location.assign("http://localhost:4200/shop")
      this.filters.category && this.id_cat === "";
      this.filters.contract && this.id_contract === "";
      this.filters.workingDay && this.id_workingDay === "";
      this.filters.province && this.id_province === "";
      this.filters.salary_min = undefined;
      this.filters.salary_max = undefined;
      this.filters.name = "";
    }

    Highlights() {
      let routeFilters = JSON.parse(atob(this.ActivatedRoute.snapshot.paramMap.get('filters') || ''));
      
      if (routeFilters.search == undefined) {
        this.id_cat = routeFilters.category || '';
        this.id_contract = routeFilters.contract || '';
        this.id_workingDay = routeFilters.workingDay || '';
        this.id_province = routeFilters.province || '';
        this.salary_min = routeFilters.salary_min;
        this.salary_max = routeFilters.salary_max;
      }
    }
    
    nameFilter(search: string) {
      console.log("filtros",this.filters);
      this.filters.name = search;
     
    }
    
    updateMinPrice(minprice: number) {
      this.salary_min = minprice;
    }
    
    updateMaxPrice(maxprice: number) {
      this.salary_max = maxprice;
    }
    
}