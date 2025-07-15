import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { StockItem } from '../models/stock-item';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private walletUrl = 'http://localhost:8080/wallet';

  constructor(private http: HttpClient) { }


  getWallet(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(this.walletUrl);
  }



}
