import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest, UserRegistrationRequest } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(request: LoginRequest): Observable<HttpResponse<any>> {
    return this.http.post(this.authUrl, request, {
      observe: 'response'
    }).pipe(
      tap(response => {
        const token = response.body?.token || response.headers.get('Authorization');
        if (token) {
          localStorage.setItem('token', token.replace('Bearer ', ''));
        }
      })
    );
  }
  register(request: UserRegistrationRequest): Observable<any> {
    return this.http.post('http://localhost:8080/users/save', request);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles || [];
    } catch (e) {
      console.error('Erro ao decodificar o token:', e);
      return [];
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }

}
