import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

}
