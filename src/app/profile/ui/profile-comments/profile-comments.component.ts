import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCommentsComponent } from '../../../shared';

@Component({
  selector: 'app-profile-comments',
  standalone: true,
  imports: [CommonModule, ListCommentsComponent],
  templateUrl: './profile-comments.component.html',
  styleUrl: './profile-comments.component.css'
})
export class ProfileCommentsComponent {

}
