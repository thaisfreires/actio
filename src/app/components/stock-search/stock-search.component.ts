import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { StockService, MarketStock } from '../../services/stock.service';
import { StockPurchasePopupComponent } from '../stock-purchase-popup/stock-purchase-popup.component';

@Component({
  selector: 'app-stock-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StockPurchasePopupComponent
  ],
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent {
  searchTerm = '';
  selectedStock: MarketStock | null = null;
  clientBalance = 1000;
  showPurchasePopup = false;
  errorMessage = '';
  successMessage = '';

  constructor(private stockService: StockService) {}

  onSearch(): void {
  const term = this.searchTerm.trim().toLowerCase();
  this.errorMessage = '';
  this.successMessage = '';
  this.selectedStock = null;

  if (!term) {
    return;
  }

  this.stockService.getStockByTicker(term).subscribe({
    next: stock => {
      if (stock) {
        console.log(stock)
        this.selectedStock = stock;
      } else {
        this.errorMessage = `No stock found for ticker "${term}".`;
      }
    },
    error: err => {
      console.error(err);
      this.errorMessage = `An error occurred while searching for "${term}".`;
    }
  });
}

  selectStock(stock: MarketStock): void {
    this.showPurchasePopup = true;
  }

  handleConfirmPurchase(quantity: number): void {
    if (!this.selectedStock) return;

    const totalCost = this.selectedStock.price * quantity;
    if (totalCost <= this.clientBalance) {
      this.clientBalance -= totalCost;
      this.successMessage = `Successfully purchased ${quantity} share(s) of ${this.selectedStock.stockName}.`;
      setTimeout(() => this.successMessage = '', 5000);
    }
    this.showPurchasePopup = false;
  }

  handlePurchaseError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
    this.showPurchasePopup = false;
  }

}
