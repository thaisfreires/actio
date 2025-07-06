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

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.register(this.form).subscribe({
      next: (res) => {
        this.message = 'Usuário registrado com sucesso!';
        console.log(res);
      },
      error: (err) => {
        this.message = 'Erro ao registrar: ' + (err.error || 'Erro desconhecido');
        console.error(err);
      }
    });
  }
}
