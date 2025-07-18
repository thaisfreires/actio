import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

export interface Stock {
  idStock: number;
  stockName: string;
  price: number;
}

export interface MarketStock {
  idStock: number;
  stockName: string;
  price: number;
  delta: string;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private searchStocksUrl = 'http://localhost:8080/stocks';

  constructor(private http: HttpClient) {}

  getStockByTicker(ticker: string): Observable<MarketStock | null> {
    const url = `${this.searchStocksUrl}/${ticker}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (
          response &&
          typeof response.stockId === 'number' &&
          typeof response.symbol === 'string' &&
          typeof response.price === 'number' &&
          typeof response.changePercent === 'string'
        ) {
          const marketStock: MarketStock = {
            idStock: response.stockId,
            stockName: response.symbol,
            price: response.price,
            delta: response.changePercent
          };
          return marketStock;
        } else {
          console.error('Invalid stock format received from API:', response);
          return null;
        }
      }),
      catchError(error => {
        console.error(`Failed to fetch stock for ticker "${ticker}".`, error);
        return of(null);
      })
    );
  }



}


