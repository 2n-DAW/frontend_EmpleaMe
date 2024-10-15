import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { concatMap ,  tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Job } from '../../../../core/models';
import { JobService, UserService } from '../../../../core/services';


@Component({
    selector: 'app-favorite-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './favorite-button.component.html',
    styleUrl: './favorite-button.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteButtonComponent {
    constructor(
        private jobService: JobService,
        private router: Router,
        private userService: UserService,
        private cd: ChangeDetectorRef
    ) {}

    @Input() job!: Job;
    @Output() toggle = new EventEmitter<boolean>();
    isSubmitting = false;

    toggleFavorite() {
        this.isSubmitting = true;

        this.userService.isAuthenticated.pipe(concatMap((authenticated) => {
            // Not authenticated? Push to login screen
            if (!authenticated) {
                this.router.navigateByUrl('/login');
                return of(null);
            }

            // Favorite the article if it isn't favorited yet
            if (!this.job.favorited) {
                return this.jobService.favorite(this.job.slug)
                    .pipe(tap(
                        data => {
                            this.isSubmitting = false;
                            this.toggle.emit(true);
                        },
                        err => {
                            this.isSubmitting = false;
                        }
                ));

            // Otherwise, unfavorite the article
            } else {
                return this.jobService.unfavorite(this.job.slug)
                    .pipe(tap(
                        data => {
                            this.isSubmitting = false;
                            this.toggle.emit(false);
                        },
                        err => {
                            this.isSubmitting = false;
                        }
                ));
            }

        }
        )).subscribe(() => {
            this.cd.markForCheck();
        });
    }
}
