import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInscriptionsComponent } from '../../../shared/components/list-inscriptions/list-inscriptions.component';

@Component({
  selector: 'app-profile-inscriptions',
  standalone: true,
  imports: [CommonModule, ListInscriptionsComponent],
  templateUrl: './profile-inscriptions.component.html',
  styleUrl: './profile-inscriptions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileInscriptionsComponent {

}
