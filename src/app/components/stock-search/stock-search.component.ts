import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService, MarketStock } from '../../services/stock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {
  marketStocks: MarketStock[] = [];
  filteredStocks: MarketStock[] = [];
  searchTerm = '';
  errorMessage = '';
  stock: MarketStock | null = null;
  showConfirmationModal = false;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  sortBy: 'price' | 'delta' = 'delta';
  sortDirection: 'asc' | 'desc' = 'desc';
  clientBalance = 1000; 
  insufficientFunds = false;
  quantities: { [idStock: number]: number } = {};


  constructor(private stockService: StockService, private router: Router) {}

  ngOnInit(): void {
    this.stockService.getMarketStocks().subscribe(stocks => {
      this.marketStocks = stocks;
      this.onSearch(); // inicia com filtro vazio e página 1
    });
  }

  onSearch(): void {
    const filtered = this.marketStocksFiltered();
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePage(filtered);
    this.errorMessage = filtered.length === 0 ? 'No stocks found for the given search.' : '';
  }
  
  
  

  selectStock(selected: MarketStock): void {
    const quantity = this.quantities[selected.idStock] || 1;
    const totalCost = selected.price * quantity;
  
    if (totalCost > this.clientBalance) {
      this.insufficientFunds = true;
      this.showConfirmationModal = false;
      return;
    }
  
    this.insufficientFunds = false;
    this.stock = selected;
    this.showConfirmationModal = true;
  }
  
  

  confirmPurchase(): void {
    if (!this.stock) return;
  
    const quantity = this.quantities[this.stock.idStock] || 1;
    const totalCost = this.stock.price * quantity;
    this.clientBalance -= totalCost;
    this.showConfirmationModal = false;
    // Simula compra - futura chamada ao backend
    this.router.navigate(['/my-stocks']); // substitui pela rota real
  }

  cancelPurchase(): void {
    this.showConfirmationModal = false;
  }

  updatePage(source: MarketStock[]): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredStocks = source.slice(start, end);
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      const filtered = this.marketStocksFiltered();
      this.updatePage(filtered);
    }
  }
  
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      const filtered = this.marketStocksFiltered();
      this.updatePage(filtered);
    }
  }
  
  
  marketStocksFiltered(): MarketStock[] {
    const filtered = this.marketStocks
      .filter(s => s.stockName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  
    const sorted = filtered.sort((a, b) => {
      const fieldA = this.sortBy === 'price' ? a.price : a.delta;
      const fieldB = this.sortBy === 'price' ? b.price : b.delta;
  
      return this.sortDirection === 'asc'
        ? fieldA - fieldB
        : fieldB - fieldA;
    });
  
    return sorted;
  }
  
  
  
  
}
