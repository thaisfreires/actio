import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockService, MarketStock } from '../../services/stock.service';
import { StockPurchasePopupComponent } from '../stock-purchase-popup/stock-purchase-popup.component';

@Component({
  selector: 'app-stock-search',
  standalone: true,
  imports: [FormsModule, CommonModule, StockPurchasePopupComponent],
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {
  marketStocks: MarketStock[] = [];
  filteredStocks: MarketStock[] = [];
  searchTerm = '';
  sortBy: 'price' | 'delta' = 'delta';
  sortDirection: 'asc' | 'desc' = 'desc';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  clientBalance = 1000;
  selectedStock: MarketStock | null = null;
  showPurchasePopup = false;
  errorMessage = '';
  successMessage = '';


  constructor(private stockService: StockService, private router: Router) {}

  ngOnInit(): void {
    this.stockService.getMarketStocks().subscribe(stocks => {
      this.marketStocks = stocks;
      this.onSearch();
    });
  }

  onSearch(): void {
    const filtered = this.marketStocksFiltered();
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePage(filtered);
    this.errorMessage = filtered.length === 0 ? 'No stocks found for the given search.' : '';
  }

  marketStocksFiltered(): MarketStock[] {
    const filtered = this.marketStocks
      .filter(s => s.stockName.toLowerCase().includes(this.searchTerm.toLowerCase()));

    const sorted = filtered.sort((a, b) => {
      const fieldA = this.sortBy === 'price' ? a.price : a.delta;
      const fieldB = this.sortBy === 'price' ? b.price : b.delta;
      return this.sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    });

    return sorted;
  }

  updatePage(source: MarketStock[]): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredStocks = source.slice(start, end);
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage(this.marketStocksFiltered());
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage(this.marketStocksFiltered());
    }
  }

  selectStock(stock: MarketStock): void {
    this.selectedStock = stock;
    this.showPurchasePopup = true;
  }

  handleConfirmPurchase(quantity: number): void {
    if (!this.selectedStock) return;
  
    const totalCost = this.selectedStock.price * quantity;
  
    if (totalCost <= this.clientBalance) {
      this.clientBalance -= totalCost;
      this.successMessage = `Successfully purchased ${quantity} share(s) of ${this.selectedStock.stockName}.`;
      this.selectedStock = null;
  
      setTimeout(() => {
        this.successMessage = '';
      }, 5000); // desaparece após 5 segundos
    }
  
    this.showPurchasePopup = false;
  }
  
}
