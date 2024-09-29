import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';


@Component({
  selector: 'app-multi-range-slider',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSliderModule],
  templateUrl: './multi-range-slider.component.html',
  styleUrls: ['./multi-range-slider.component.css']
})
export class MultiRangeSliderComponent {
  @Input() min: number = 900;
  @Input() max: number = 5000;
  @Input() minprice: number = 900;
  @Input() maxprice: number = 5000;
  
  @Output() minpriceChange = new EventEmitter<number>();
  @Output() maxpriceChange = new EventEmitter<number>();

  minthumb: number = 0;
  maxthumb: number = 0;
  
  
  formatLabel(value: number): string {
    if (value >= 1000) {
      return (value / 1000) + 'k';
    }

    return `${value}`;
  }
  
  
}