import { Component, Input } from '@angular/core';
import { StockItemToMock } from '../../models/stockitemtomock.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent {

  @Input() stockItems: StockItemToMock[] = [];

  watchlist: StockItemToMock[] = [];

  dropdownOpen = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  get availableStocks(): StockItemToMock[] {
    return this.stockItems.filter(s => !this.watchlist.some(w => w.stockName === s.stockName));
  }

  addToWatchlist(stock: StockItemToMock): void {
    if (!this.watchlist.find(s => s.stockName === stock.stockName)) {
      this.watchlist.push(stock);
      this.dropdownOpen = false;
    }
  }

  removeFromWatchlist(stock: StockItemToMock): void {
    this.watchlist = this.watchlist.filter(s => s.stockName !== stock.stockName);
  }

}
