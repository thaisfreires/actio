import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    const request: LoginRequest = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(request).subscribe({
      next: (response) => {
        const token = response.headers.get('Authorization');
        if (token) {
          localStorage.setItem('token', token);
          this.message = 'Login bem-sucedido!';
        } else {
          this.message = 'Token não encontrado no cabeçalho.';
        }
      },
      error: (err) => {
        this.message = 'Falha no login: ' + (err.error || 'Erro desconhecido');
      },
    });
  }
}
