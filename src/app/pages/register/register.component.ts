import { Component } from '@angular/core';
import { UserRegistrationRequest } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: UserRegistrationRequest = {
    name: '',
    nif: '',
    date_of_birth: '',
    email: '',
    password: ''
  };

  message = '';
  isError: boolean = false;

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.register(this.form).subscribe({
      next: (res) => {
        this.message = 'User registered successfully.';
        this.isError = false;
        console.log(res);
      },
      error: (err) => {
        this.message = 'Failed to register: ' + (err.error || 'Unknown');
        this.isError = true;
        console.error(err);
      }
    });
  }
}
