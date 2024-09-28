import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filters } from '../../../core/models';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() jobCount: number = 0;  // Total de jobs
  @Output() pageChange = new EventEmitter <Filters>();

  filters = new Filters();
  limit: number = 2;
  offset: number = 0;
  totalPages: number[] = [];  // Array de páginas totales
  currentPage: number = 1;  // Página actual
  maxPagesToShow: number = 5;  // Máximo de páginas a mostrar
  startPage: number = 1;  // Página inicial a mostrar en el bloque de paginación
  
  ngOnInit(): void {
    this.calculateTotalPages();
  }

  ngOnChanges(): void {
    this.calculateTotalPages();
  }

  calculateTotalPages() {
    this.totalPages = Array.from(new Array(Math.ceil(this.jobCount/this.limit)), (val, index) => index + 1);
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;

    if (this.currentPage == this.startPage + this.maxPagesToShow) {
      this.startPage = this.currentPage;
    }

    if (this.currentPage < this.startPage) {
      this.startPage -= this.maxPagesToShow;
    }

    if (this.limit) {
      this.filters.limit = this.limit;
      this.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.pageChange.emit(this.filters);  
  }

}
