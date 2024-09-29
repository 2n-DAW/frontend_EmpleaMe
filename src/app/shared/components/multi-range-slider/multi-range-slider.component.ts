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
  @Input() downValue: number = 900;
  @Input() upValue: number = 5000;
  
  @Output() minpriceChange = new EventEmitter<number>();
  @Output() maxpriceChange = new EventEmitter<number>();

  
  onMinPriceChange(event: any): void {
    const value = parseInt(event.target.value, 10);
    this.downValue = value;
    this.minpriceChange.emit(this.downValue);
  }

  onMaxPriceChange(event: any): void {
    const value = parseInt(event.target.value, 10);
    this.upValue = value;
    this.maxpriceChange.emit(this.upValue);
  }
  
  
  formatLabel(value: number): string {
    if (value >= 1000) {
      return (value / 1000) + 'k';
    }
    return `${value}`;
  }
  
  
}