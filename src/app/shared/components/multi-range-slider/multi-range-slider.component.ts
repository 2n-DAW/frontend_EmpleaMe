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
  @Input() min: number = 0;
  @Input() max: number = 10000;
  @Input() minprice: number = 0;
  @Input() maxprice: number = 10000;
  
  @Output() minpriceChange = new EventEmitter<number>();
  @Output() maxpriceChange = new EventEmitter<number>();

  minthumb: number = 0;
  maxthumb: number = 0;

}