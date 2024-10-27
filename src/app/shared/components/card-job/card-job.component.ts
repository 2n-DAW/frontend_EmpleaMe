import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job, Contract, WorkingDay, Province } from '../../../core/models';
import { Router, RouterLink } from '@angular/router';
import { FavoriteButtonComponent } from '../buttons/favorite-button/favorite-button.component';

@Component({
    selector: 'app-card-job',
    standalone: true,
    imports: [CommonModule, RouterLink, FavoriteButtonComponent],
    templateUrl: './card-job.component.html',
    styleUrl: './card-job.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardJobComponent implements OnInit{
    @Input() job: Job = {} as Job;
    @Input() listProvinces: Province[] = [];

    // contract!: Contract;
    // workingDay!: WorkingDay;
    // province!: Province;

    constructor(
        private router: Router
    ) {}

    ngOnInit(): void {
        // if (this.jobs) {
        //   this.contract = this.jobs.id_contract;
        //   console.log(this.jobs.id_contract.contract_name);
        //   this.workingDay = this.jobs.id_workingDay;
        //   this.province = this.jobs.id_province;
        // }
    }

    goToDetails(slug: string) {
        this.router.navigate(['/details', slug]);
    }

    onToggleFavorite(favorited: boolean) {
        this.job.favorited = favorited;
    
        if (favorited) {
            this.job.favoritesCount++;
        } else {
            this.job.favoritesCount--;
        }
    }

}
