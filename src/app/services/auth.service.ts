import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) { }

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
}
