import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
  validateAccountClosure(): Observable<{ allowed: boolean, reasons: string[] }> {
    // ⚠️ Mock de critérios de encerramento – simula lógica do backend
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
}