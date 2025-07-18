import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
    console.log("Form valid:" , valid);
    if(!valid) return;
    

    const userLogin = this.form.value;

    this.authService.login(userLogin).subscribe({
      next: (response) => {
        this.isError = false;
        console.log(response);
        this.redirect(); 
      },
      error: (err) => {
        this.form.reset();
        this.message = 'Email or password is incorrect.';
        this.isError = true;
        console.error(err);
      },
    });
  }
  
  redirect() {
    this.router.navigate(['/wallet']);
  }
  get f() {
    return this.form.controls;
  }
  
}
