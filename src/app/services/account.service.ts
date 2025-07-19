import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Account, AccountInfo } from '../models/account.model';
import { HttpClient } from '@angular/common/http';

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
  getMovements(): Observable<any[]> {
    // Mock data for movements
    const movements = [
      { date: '2023-01-01', type: 'Credit', amount: 100, description: 'Salary' },
      { date: '2023-01-02', type: 'Debit', amount: 50, description: 'Groceries' }
    ];
    return of(movements);
  }



}
