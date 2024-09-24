import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../../core/models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-category.component.html',
  styleUrl: './card-category.component.css'
})
export class CardCategoryComponent {
  @Input() categories: Category = {} as Category;

  constructor() { }

  ngOnInit(): void {
  }
}