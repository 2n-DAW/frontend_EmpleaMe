import { Component, Input } from '@angular/core';
import { Job } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-job',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-job.component.html',
  styleUrl: './card-job.component.css'
})
export class CardJobComponent {
  @Input() jobs: Job = {} as Job;

  constructor() { }

  ngOnInit(): void {

  }


}
