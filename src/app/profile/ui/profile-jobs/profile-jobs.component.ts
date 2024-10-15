import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ListJobsComponent, SharedModule } from '../../../shared';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile-jobs',
  standalone: true,
  imports: [ListJobsComponent, CommonModule],
  templateUrl: './profile-jobs.component.html',
  styleUrl: './profile-jobs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileJobsComponent {


}