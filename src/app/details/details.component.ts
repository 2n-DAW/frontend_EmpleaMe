import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Job } from '../core/models';
import { JobService } from '../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { NgControlStatusGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  job!: Job;
  slug!: string | null;
  //@Input() page!: CarouselDetails[];
  comments!: Comment[];
  user_image!: string;
  canModify!: boolean;
  cd: any;
  isSubmitting!: boolean;

  logged!: boolean;
  NoComments!: boolean;
  isDeleting!: boolean;


  constructor(
    private route: ActivatedRoute,
    private JobService: JobService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    // private ToastrService: ToastrService,
  ) { }

  ngOnInit(): void {


    this.route.data.subscribe(
      (data: any) => {
        console.log(data);
        this.slug = data.job.job.slug;
        this.job = data.job.job;


      }
    );
  }




  deleteJob() {
    this.isDeleting = true;

    this.JobService.delete_job(this.slug)
      .subscribe(
        (data: any) => {
          // console.log(data);
          this.router.navigateByUrl('/shop');
          console.log("Comment deleted successfully");
          // console.log(this.comments);                
        });
  }



}
