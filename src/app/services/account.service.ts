import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Account, AccountInfo } from '../models/account.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movement } from '../models/movement.model';

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private http: HttpClient){}
  accUrl = 'http://localhost:8080/accounts'

  validateAccountClosure(): Observable<{ allowed: boolean, reasons: string[] }> {
    const hasPendingTransactions = false;
    const hasPositiveBalance = false;

    const reasons: string[] = [];
    if (hasPendingTransactions) reasons.push('There are pending transactions.');
    if (hasPositiveBalance) reasons.push('The account still has a positive balance.');

    return of({
      allowed: reasons.length === 0,
      reasons
    });
  }

  getAccountBalance(): Observable<number> {
    const url = `${this.accUrl}/info`;
    return this.http.get<AccountInfo>(url).pipe(
      map(account => account.currentBalance)
    );
  }
  getMovementHistory(): Observable<Movement[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.accUrl}/movements/history`;
    return this.http.get<Movement[]>(url, { headers });
  }



}
