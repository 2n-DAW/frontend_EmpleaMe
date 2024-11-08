import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Job } from '../../../../core/models';
import { InscriptionService } from '../../../../core/services';

@Component({
    selector: 'app-inscription-validation-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './inscription-validation-button.component.html',
    styleUrl: './inscription-validation-button.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InscriptionValidationButtonComponent implements OnInit {
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
    status: number = 0;

    ngOnInit(): void {
        if (this.currentUserType === 'recruiter') {
            this.status = 2;
        }

        if (this.currentUserType === 'company') {
            this.status = 3;
        }
    }

    updateInscription(status: number) {
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
        
        this.inscriptionService.updateInscription({ job: this.job.slug, user_email: this.user_email, status: status }).subscribe(
            data => {
                console.log('Update inscription:', data);
                this.isSubmitting = false;
                this.isInscripted.emit(status);
            },
            err => {
                console.error(err);
                this.isSubmitting = false;
            }
        );
    }

    getInscriptedStatus(): string {
        switch (this.job.isInscripted) {
            case -1:
                return 'Rechazado';
            case 1:
                return 'Seleccionar candidato';
            case 2:
                return 'Aceptado';
            case 3:
                return 'Aceptado';
            default:
                return 'Seleccionar candidato';
        }
    }
}
