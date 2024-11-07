import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [CommonModule, RouterLink, ReactiveFormsModule],
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
	authType: string = '';
	title: string = '';
	isSubmitting = false;
	authForm: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private fb: FormBuilder,
		private cd: ChangeDetectorRef
	) {
		// Crear grupo de formulario base con email y password
		this.authForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]]
		});
	}

	ngOnInit() {
		this.route.url.subscribe((data) => {
			this.authType = data[data.length - 1].path;
			this.title = this.authType === 'login' ? 'Login' : 'Register';

			if (this.authType === 'register') {
				this.authForm.addControl('username', new FormControl('', Validators.required));
				this.authForm.addControl('userType', new FormControl('', Validators.required));
				this.authForm.addControl('confirmPassword', new FormControl('', Validators.required));
				this.authForm.setValidators(this.passwordMatchValidator as any);
			}

			this.cd.markForCheck();
		});
	}

	passwordMatchValidator(formGroup: FormGroup) {
		const password = formGroup.get('password')?.value;
		const confirmPassword = formGroup.get('confirmPassword')?.value;
		return password === confirmPassword ? null : { mismatch: true };
	}

	submitForm() {
		this.isSubmitting = true;
		this.authForm.markAllAsTouched(); //! No funciona

		if (this.authForm.valid) {
			const credentials = this.authForm.value;

			if (this.authType === 'register') {
				delete credentials.confirmPassword; 
			}

			this.userService.attemptAuth(this.authType, credentials).subscribe(
				(dataUser) => {
					console.log(this.authType === 'login' ? 'Login' : 'Register', dataUser);
					this.router.navigateByUrl(this.authType === 'login' ? '/home' : '/login');
				},
				(err) => {
					console.error(this.authType === 'login' ? 'Login Error' : 'Register Error', err);
					this.isSubmitting = false;
					this.cd.markForCheck();
				}
			);
		} else {
			console.log('Formulario inválido. Corrige los errores.');
			this.isSubmitting = false;
		}
	}

	isFieldInvalid(fieldName: string): boolean | null {
		const field = this.authForm.get(fieldName);
		return field && field.invalid && (field.dirty || field.touched);
	}

	getErrorMessage(fieldName: string): string {
		const field = this.authForm.get(fieldName);
		if (field?.hasError('required')) {
			return 'Este campo es obligatorio';
		}
		if (field?.hasError('email')) {
			return 'Formato de email inválido';
		}
		if (field?.hasError('minlength')) {
			return 'La contraseña debe tener al menos 8 caracteres';
		}
		if (field?.hasError('pattern')) {
			return 'La contraseña debe contener letras y números';
		}
		if (this.authForm.hasError('mismatch') && fieldName === 'confirmPassword') {
			return 'Las contraseñas no coinciden';
		}
		return '';
	}
}
