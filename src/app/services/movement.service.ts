import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovementRequest, Movement } from '../models/movement.model';
import { catchError, map, Observable, of } from 'rxjs';
import { DateTime } from 'luxon';

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

  getMovements(): Observable<Movement[]> {
    return this.http.get<Movement[]>(
      `${this.baseUrl}/history`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(movements =>
        movements.map((m, index) => {
          const isoString = String(m.dateTime).trim();
          const dt = DateTime.fromISO(isoString);

          return {
            ...m,
            dateTime: dt.isValid ? dt.toFormat("dd/MM/yyyy HH:mm") : "Invalid date"
          };
        })
      ),
      catchError(error => {
        console.error("Error loading movements:", error);
        return of([]);
      })
    );
  }


  deposit(request: MovementRequest): Observable<Movement> {
    return this.http.post<Movement>(
      `${this.baseUrl}/deposit`,
      request,
      { headers: this.getAuthHeaders() }
    );
  }

  rescue(request: MovementRequest): Observable<Movement> {
    return this.http.post<Movement>(
      `${this.baseUrl}/rescue`,
      request,
      { headers: this.getAuthHeaders() }
    );
  }
}
