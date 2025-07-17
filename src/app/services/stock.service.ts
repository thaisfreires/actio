import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Stock {
  idStock: number;
  stockName: string;
  price: number;
}

export interface MarketStock {
  idStock: number;
  stockName: string;
  price: number;
  delta: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private stocks: Stock[] = [
    { idStock: 1, stockName: 'AAPL', price: 175 },
    { idStock: 2, stockName: 'TSLA', price: 240 },
    { idStock: 3, stockName: 'GOOGL', price: 125 },
    { idStock: 4, stockName: 'IRM', price: 150 }
  ];

  constructor() {}

  getStockByTicker(ticker: string): Observable<Stock | null> {
    const found = this.stocks.find(s =>
      s.stockName.toUpperCase() === ticker.toUpperCase()
    );
    return of(found ?? null);
  }

  getAllStocks(): Observable<Stock[]> {
    return of(this.stocks);
  }

  getMarketStocks(): Observable<MarketStock[]> {
    const market: MarketStock[] = [
      { idStock: 1, stockName: 'AAPL', price: 175, delta: +2.3 },
      { idStock: 2, stockName: 'TSLA', price: 240, delta: -1.1 },
      { idStock: 3, stockName: 'GOOGL', price: 125, delta: +0.5 },
      { idStock: 4, stockName: 'AMZN', price: 145, delta: -0.3 },
      { idStock: 5, stockName: 'IRM', price: 150, delta: -0.5 },
      { idStock: 6, stockName: 'DRM', price: 200, delta: +0.7 }
    ];
    return of(market);
  }
}


