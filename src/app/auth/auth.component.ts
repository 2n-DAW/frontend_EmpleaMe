import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { CommonModule } from '@angular/common';
import { UserType } from '../core/models/user.model';
// import { Errors } from '../core';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  userType: UserType = {} as UserType;
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
      this.title = (this.authType === 'login') ? 'Login' : 'Register';
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

    const credentials = this.authForm.value;

    if (this.authType === 'login') {
      // Obtener el tipo de usuario primero
      this.userService
      .getUserType(credentials)
      .subscribe(
        data => {
          this.userType = data;
          console.log('User Type:', data);

          // Después de obtener el tipo de usuario, proceder con login
          this.userService
          .attemptAuth(this.authType, this.userType, credentials)
          .subscribe(
            dataUser => {
              console.log('User', dataUser);
              this.router.navigateByUrl('/home');
            }, 
            err => {
              // this.errors = err;
              console.error('Login Error:', err);
              this.isSubmitting = false;
              this.cd.markForCheck();
            }
          );
        }, 
        err => {
          console.error('User Type Error:', err);
          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      );
    } else {
      // Proceder con register
      this.userService
      .attemptAuth(this.authType, this.userType, credentials)
      .subscribe(
        msg => {
          console.log('Register', msg);
          this.router.navigateByUrl('/login');
        }, 
        err => {
          // this.errors = err;
          console.error('Register Error:', err);
          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      );
    }
  }
}
