import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Job } from '../../../../core/models';
import { InscriptionService } from '../../../../core/services/';

@Component({
    selector: 'app-inscription-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './inscription-button.component.html',
    styleUrl: './inscription-button.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InscriptionButtonComponent {
    constructor(
        private inscriptionService: InscriptionService,
        private router: Router,
    ) {}

    @Input() job!: Job;
    @Input() user_email!: string;
    @Input() currentUserType!: String;
    @Input() isAuthenticated!: boolean;
    @Output() isInscripted = new EventEmitter<number>();
    isSubmitting = false;

    inscriptionMode() {
        // Prevent multiple submissions
        if (this.isSubmitting || this.job.isInscripted !== 0) {
            return;
        }

        this.isSubmitting = true;

        if (!this.isAuthenticated) {
            this.router.navigateByUrl('/login');
            this.isSubmitting = false;
            return;
        }

        const inscriptionData = { job: this.job.slug, user_email: this.user_email };

        const inscriptionObservable = this.currentUserType === 'client' 
            ? this.inscriptionService.createInscription(inscriptionData)
            : this.inscriptionService.updateInscription(inscriptionData);
        
        inscriptionObservable.subscribe(
            data => {
                console.log('Inscription done:', data);
                this.isSubmitting = false;
                this.isInscripted.emit(1);
            },
            err => {
                console.error(err);
                this.isSubmitting = false;
            }
        );

        // if (this.currentUserType === 'client') {
        //     return this.inscriptionService.createInsciption({job: this.slug, user_email: this.user_email, status: 1})
        //         .subscribe(
        //             data => {
        //                 console.log(data);
        //                 this.isSubmitting = false;
        //                 this.inscription.emit(true);
        //             },
        //             err => {
        //                 console.log(err);
        //                 this.isSubmitting = false;
        //             }
        //     );
        // }

        // if (this.currentUserType === 'company') this.status = 2;
        // if (this.currentUserType === 'recruiter') this.status = 3;

        // if (this.currentUserType === 'company' || this.currentUserType === 'recruiter') {
        //     return this.inscriptionService.updateInsciption({job: this.slug, user_email: this.user_email, status: this.status})
        //         .subscribe(
        //             data => {
        //                 console.log(data);
        //                 this.isSubmitting = false;
        //                 this.inscription.emit(true);
        //             },
        //             err => {
        //                 console.log(err);
        //                 this.isSubmitting = false;
        //             }
        //     );
        // }
    }
}
