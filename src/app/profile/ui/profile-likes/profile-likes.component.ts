import { Component } from '@angular/core';
import { ListJobsComponent } from '../../../shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-likes',
  standalone: true,
  imports: [ListJobsComponent, CommonModule],
  templateUrl: './profile-likes.component.html',
  styleUrl: './profile-likes.component.css'
})
export class ProfileLikesComponent {

}
