import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../core/services';
import { Job } from '../../../core/models';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  suggestions: string[] = [];
  locations = ['Toda España', 'Madrid', 'Barcelona', 'Valencia'];
  selectedLocation: string = '';
  jobs: Job[] =[]; // Array de trabajos
  query: string = '';
  selectedSuggestion: string ="";

  
  constructor(private jobServices: JobService) {
  }

  ngOnInit() : void {
    this.onInputChange();
  }

  onInputChange() {
    this.query = this.searchQuery;
    if (this.query) {
      this.jobServices.findJobsName(this.query).subscribe((res: { jobs: Job[] }) => {
        this.jobs = res.jobs;
        console.log(this.jobs);
       
      this.suggestions = this.jobs.map(j => j.name);
       console.log(this.suggestions);
       
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: string) { // Selecciona la sugerencia
    this.searchQuery = suggestion; // Asigna la sugerencia al campo de búsqueda
    this.suggestions = []; // Limpia las sugerencias
    this.selectedSuggestion = suggestion;
   
  }

  onBlur() {
    setTimeout(() => {
      this.suggestions = [];
    }, 200);
  }
  onSearch() {
    console.log(this.selectedSuggestion);
    localStorage.setItem('search', this.selectedSuggestion);
  }
}
