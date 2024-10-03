import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Errors } from '../core/models';
import { UserService } from '../core/services';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, SharedModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {

    this.authForm = this.fb.group({// se utiliza el form builder para crear el formulario
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {

      this.authType = data[data.length - 1].path;

      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';

      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
      this.cd.markForCheck();
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };
    console.log(this.authForm.value);

    const credentials = this.authForm.value;
    this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(

        data => this.router.navigateByUrl('/'), // Redirect to home page
        err => {
          console.log(err);
          this.errors = err;
          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      );
  }
}
