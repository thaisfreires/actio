import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule,MdbFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;
  message = '';
  isError = false;

  constructor(private authService: AuthService, private fb:FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]],
    });
  }

  onLogin(valid: boolean) {
    if(!valid) return;

    const userLogin = this.form.value;

    this.authService.login(userLogin).subscribe({
      next: (response) => {
        this.message = 'Login successful!';
        this.isError = false;
        this.form.reset();
        console.log(response);
        this.redirect(); 
      },
      error: (err) => {
        this.message = 'Fail to login ' + (err.error || 'Unkown error');
        this.form.reset();
        this.isError = true;
        console.error(err);
      },
    });
  }
  redirect() {
    this.router.navigate(['/dashboard']);
  }
  get f() {
    return this.form.controls;
  }
  
}
