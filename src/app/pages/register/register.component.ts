import { Component } from '@angular/core';
import { UserRegistrationRequest } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,MdbFormsModule,ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;
  message = '';
  isError = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nif: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      date_of_birth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      confirm_password: ['', Validators.required]
    },
    { validators: this.passwordMatchValidator.bind(this) }
  )};


  onRegister(valid: boolean) {
    if (!valid) return;

    const userRequest = this.form.value;

    this.authService.register(userRequest).subscribe({
      next: (res) => {
        this.message = 'User registered successfully!';
        this.form.reset();
        this.isError = false;
      },
      error: (err) => {
        this.message = 'Fail to register: ' + (err.error?.message || 'Please, contact the support.');
        this.form.reset();
        this.isError = true;
        console.error(err);
      }
    });
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirm_password')?.setErrors({
        ...(formGroup.get('confirm_password')?.errors || {}),
        passwordMismatch: true
      });
      return { passwordMismatch: true };
    } else {
      const errors = formGroup.get('confirm_password')?.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          formGroup.get('confirm_password')?.setErrors(null);
        } else {
          formGroup.get('confirm_password')?.setErrors(errors);
        }
      }
      return null;
    }
  }

  isFormReadyToSubmit(): boolean {
    const controlsValid = this.form.get('name')?.valid &&
                          this.form.get('nif')?.valid &&
                          this.form.get('date_of_birth')?.valid &&
                          this.form.get('email')?.valid &&
                          this.form.get('password')?.valid &&
                          this.form.get('confirm_password')?.value; // só verifica preenchimento

    return !!controlsValid;
  }

  get f() {
    return this.form.controls;
  }
}
