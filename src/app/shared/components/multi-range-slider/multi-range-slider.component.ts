import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Slide } from '../../../core/models';
import { SharedModule } from '../../shared.module';



@Component({
  selector: 'app-multi-range-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  maxthumb: number = 1;

  onMinPriceChange(event: any): void {
    const value = parseInt(event.target.value, 10);
    this.minprice = value;
    this.mintrigger();
    this.minpriceChange.emit(this.minprice);
  }

  onMaxPriceChange(event: any): void {
    const value = parseInt(event.target.value, 10);
    this.maxprice = value;
    this.maxtrigger();
    this.maxpriceChange.emit(this.maxprice);
  }

  mintrigger(): void {
    this.validation();
    this.minprice = Math.min(this.minprice, this.maxprice - 500);
    this.minthumb = ((this.minprice - this.min) / (this.max - this.min)) * 100;
  }

  maxtrigger(): void {
    this.validation();
    this.maxprice = Math.max(this.maxprice, this.minprice + 200);
    this.maxthumb = 100 - (((this.maxprice - this.min) / (this.max - this.min)) * 100);
  }

  validation(): void {
    if (/^\d*$/.test(this.minprice.toString())) {
      if (this.minprice > this.max) {
        this.minprice = 9500;
      }
      if (this.minprice < this.min) {
        this.minprice = this.min;
      }
    } else {
      this.minprice = 0;
    }
    if (/^\d*$/.test(this.maxprice.toString())) {
      if (this.maxprice > this.max) {
        this.maxprice = this.max;
      }
      if (this.maxprice < this.min) {
        this.maxprice = 200;
      }
    } else {
      this.maxprice = 10000;
    }
  }

}