import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { StockItem, StockQuantityResponse } from '../models/stock-item';

export interface WalletResponse {
  stockId: number;
  stockName: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private walletUrl = 'http://localhost:8080/wallet';

  constructor(private http: HttpClient) { }


  getWallet(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(this.walletUrl);
  }


  getStockQuantity(stockId: number): Observable<StockQuantityResponse> {
    const url = `${this.walletUrl}/${stockId}/quantity`;
    return this.http.get<StockQuantityResponse>(url);
  }

  getWalletInfo(): Observable<WalletResponse[]> {
    return this.http.get<WalletResponse[]>(this.walletUrl).pipe(
      catchError(error => {
        console.error('Error fetching wallet', error);
        return of([]);
      })
    );
  }


}
