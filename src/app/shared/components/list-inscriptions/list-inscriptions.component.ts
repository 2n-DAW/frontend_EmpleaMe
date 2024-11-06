import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionList } from '../../../core/models';
import { InscriptionService } from '../../../core/services';
import { ChangeDetectorRef } from '@angular/core';
import { CardInscriptionComponent } from '../card-inscription/card-inscription.component';


@Component({
  selector: 'app-list-inscriptions',
  standalone: true,
  imports: [CommonModule, CardInscriptionComponent],
  templateUrl: './list-inscriptions.component.html',
  styleUrl: './list-inscriptions.component.css'
})
export class ListInscriptionsComponent implements OnInit {
  inscriptions: InscriptionList[] = [];

  constructor(
    private inscriptionService: InscriptionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.inscriptionService.getInscriptions().subscribe(
      (data: any) => {
        this.inscriptions = data.inscription;
        console.log(data);
        this.cdr.detectChanges();
      });
  }
}
