import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, User } from '../models/user.model';
import { Stock } from '../models/stock.model';
import { Wallet } from '../models/wallet.model';
import { Movement } from '../models/movement.model';
import { Transaction } from '../models/transaction.model';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<HttpResponse<void>> {
    return this.http.post<void>(this.authUrl, request, {
      observe: 'response'
    });
  }
}
