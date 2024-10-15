import { Component, Input } from '@angular/core';
import { User } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {

  @Input() user: User = {} as User;

  constructor() { }

  ngOnInit(): void {
  }
}
