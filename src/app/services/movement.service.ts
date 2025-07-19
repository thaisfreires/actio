import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovementRequest, MovementResponse } from '../models/movement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  private baseUrl = 'http://localhost:8080/movements';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getMovements(): Observable<MovementResponse[]> {
    return this.http.get<MovementResponse[]>(
      `${this.baseUrl}/history`,
      { headers: this.getAuthHeaders() }
    );
  }

  deposit(request: MovementRequest): Observable<MovementResponse> {
    return this.http.post<MovementResponse>(
      `${this.baseUrl}/deposit`,
      request,
      { headers: this.getAuthHeaders() }
    );
  }

  rescue(request: MovementRequest): Observable<MovementResponse> {
    return this.http.post<MovementResponse>(
      `${this.baseUrl}/rescue`,
      request,
      { headers: this.getAuthHeaders() }
    );
  }
}
