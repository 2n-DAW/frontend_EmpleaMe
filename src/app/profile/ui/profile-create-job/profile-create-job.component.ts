import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobFormComponent } from '../../../shared/components/job-form/job-form.component';

@Component({
  selector: 'app-profile-create-job',
  standalone: true,
  imports: [CommonModule, JobFormComponent],
  templateUrl: './profile-create-job.component.html',
  styleUrl: './profile-create-job.component.css',
})
export class ProfileCreateJobComponent {
}