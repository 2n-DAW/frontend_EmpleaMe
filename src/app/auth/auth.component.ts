import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { CommonModule } from '@angular/common';
import { ShowAuthedDirective } from '../shared/show-authed.directive';
// import { Errors } from '../core';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ CommonModule, RouterLink, ReactiveFormsModule, ShowAuthedDirective],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  // errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
      this.cd.markForCheck();
    });
    // this.submitForm();
  }

  submitForm() {
    this.isSubmitting = true;
    // this.errors = {errors: {}};
    console.log(this.authForm.value)

    const credentials = this.authForm.value;
    this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(
        data => {
          console.log(data),
          this.router.navigateByUrl('/')
        }, 
        err => {
          console.log(err);
          // this.errors = err;
          this.isSubmitting = false;
          this.cd.markForCheck();
        }
    );
  }
}
