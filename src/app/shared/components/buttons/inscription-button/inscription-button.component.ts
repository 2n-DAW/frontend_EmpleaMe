import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

    @Input() slug!: string;
    @Input() user_email!: string;
    @Input() currentUserType!: String;
    @Input() isAuthenticated!: boolean;
    // @Output() inscription = new EventEmitter<boolean>();
    //! isInscripted debe de ser un input de details, que con el clic actualizaremos
    isIncripted = false;
    isSubmitting = false;

    inscriptionMode() {
        // Prevent multiple submissions
        if (this.isSubmitting || this.isIncripted) {
            return;
        }

        this.isSubmitting = true;

        if (!this.isAuthenticated) {
            this.router.navigateByUrl('/login');
            this.isSubmitting = false;
            return;
        }

        const inscriptionData = { job: this.slug, user_email: this.user_email };
        console.log(inscriptionData);
        // return;

        const inscriptionObservable = this.currentUserType === 'client' 
            ? this.inscriptionService.createInsciption(inscriptionData)
            : this.inscriptionService.updateInsciption(inscriptionData);
        
        inscriptionObservable.subscribe(
            data => {
                console.log(data);
                this.isSubmitting = false;
                this.isIncripted = true;
                // this.inscription.emit(true);
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
