import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

export interface UserProfile {
  fullName: string;
  nif: string;
  birthDate: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private baseUrl = 'http://localhost:8080/profile';

  constructor(private http: HttpClient) {}


  getProfile(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/${userId}`, { headers });
  }
  
  updateProfile(userId: number, profile: UserProfile): Observable<void> {
    console.log('Sending profile:', profile); // <-- Verifica os dados enviados
    return this.http.put<void>(`${this.baseUrl}/${userId}`, profile, { headers });
  }
}

