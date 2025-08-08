import { TransactionRequest, TransactionResponse } from './../models/transaction.model';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private bseUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) { }

  buy(request: TransactionRequest): Observable<TransactionResponse> {
    return this.doTransaction(request, "buy");
  }

  sell(request: TransactionRequest): Observable<TransactionResponse> {
    return this.doTransaction(request, "sell");
  }

  private doTransaction(transaction: TransactionRequest, endpoint: string): Observable<TransactionResponse> {
    const url = `${this.bseUrl}/${endpoint}`;
    return this.http.post<TransactionResponse>(url, transaction).pipe(
      catchError(error => {
        if (error.status === 400 && typeof error.error === 'string') {
          console.warn('Bad Request:', error.error);
          return throwError(() => new Error(error.error));
        }

        console.error('Transaction failed:', error);
        return throwError(() => new Error('Transaction failed. Please try again.'));
      })
    );
  }

   getAll(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(`${this.bseUrl}/getAll`);
  }
}
