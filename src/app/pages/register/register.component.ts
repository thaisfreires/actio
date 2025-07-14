import { Component } from '@angular/core';
import { UserRegistrationRequest } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
      password: ['', [Validators.required, Validators.minLength(9)]]
    });
  }

  onRegister(valid: boolean) {
    if (!valid) return;

    const userRequest = this.form.value;

    this.authService.register(userRequest).subscribe({
      next: (res) => {
        this.message = 'User registered successfully!';
        this.form.reset(); 
        this.isError = false;
        console.log(res); 
      },
      error: (err) => {
        this.message = 'Fail to register: ' + (err.error?.message || 'Unknown error');
        this.form.reset();
        this.isError = true;
        console.error(err);
      }
    });
  }

  get f() {
    return this.form.controls;
  }
}
