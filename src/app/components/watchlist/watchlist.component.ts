import { Component, Input } from '@angular/core';
import { StockItem } from '../../models/stock-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent {

  @Input() stockItems: StockItem[] = [];

  watchlist: StockItem[] = [];

  dropdownOpen = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  get availableStocks(): StockItem[] {
    return this.stockItems.filter(s => !this.watchlist.some(w => w.stockName === s.stockName));
  }

  addToWatchlist(stock: StockItem): void {
    if (!this.watchlist.find(s => s.stockName === stock.stockName)) {
      this.watchlist.push(stock);
      this.dropdownOpen = false;
    }
  }

  removeFromWatchlist(stock: StockItem): void {
    this.watchlist = this.watchlist.filter(s => s.stockName !== stock.stockName);
  }
  
}
