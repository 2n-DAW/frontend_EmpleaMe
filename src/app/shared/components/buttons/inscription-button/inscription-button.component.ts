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

    createInscription() {
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
        
        this.inscriptionService.createInscription({ job: this.job.slug, user_email: this.user_email }).subscribe(
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
    }
}
