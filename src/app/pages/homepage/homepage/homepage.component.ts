import { Component } from '@angular/core';
import { UserStockItem } from '../../../models/user-stock-item.model';
import { AccountStockHistory } from '../../../models/account-stock-history.model';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { StockItemToMock } from '../../../models/stockitemtomock.model';
import { WatchlistComponent } from '../../../components/watchlist/watchlist.component';
import { Transaction } from '../../../models/transaction.model';
import { TransactionType } from '../../../models/enums/TransactionType.enum';
import { RouterModule } from '@angular/router';
import * as shape from 'd3-shape';
import { WalletService } from '../../../services/wallet.service';
import { StockItem } from '../../../models/stock-item';

@Component({
  selector: 'app-homepage',
  imports: [
    CommonModule,
    NgxChartsModule,
    WatchlistComponent,
    RouterModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent {

  userStockPortfolio: StockItem[] = [];
  mockUserStockPortfolio: StockItem[] = [];
  loadMockStockForPortfolio: boolean = false;

  mockStockItemsForFavorites: StockItemToMock[] = [];
  accountStockHistory: AccountStockHistory[] = [];
  transactions: Transaction[] = [];

  totalInvested = 0;
  totalBalance = 0;
  percentageChange = 0;
  portfolioHistory: any[] = [];

  yMin = 0;
  yMax = 0;

  width = 500;
  height = 280;
  curve = shape.curveLinear;


  constructor(private walletService: WalletService){}


  ngOnInit(): void {
    this.walletService.getWallet().subscribe({
      next: (response: StockItem[]) => {
        if (response.length === 0) {
          this.userStockPortfolio = [];
          this.totalInvested = 0;
          this.totalBalance = 0;
          this.percentageChange = 0;
        } else {
          this.userStockPortfolio = response.map(row => ({
            ...row,
            position: row.quantity * row.currentValue
          }));

          this.loadMockStockForPortfolio = false;
          this.calculateInvestments();
        }
      },

      error: (err) => {
        this.loadMockStockForPortfolio = true;
        this.loadMockData();

        if (this.mockUserStockPortfolio.length === 0) {
          this.totalInvested = 0;
          this.totalBalance = 0;
          this.percentageChange = 0;
        } else {
          this.calculateInvestments();
        }

        console.error('Unable to retrieve wallet information from the server', err);
      }
    });
  }


  get stockItems(): StockItem[] {
    return this.loadMockStockForPortfolio ? this.mockUserStockPortfolio : this.userStockPortfolio;
  }

  get visibleStockItems(): StockItem[] {
    const list = this.stockItems;
    return list.length > 6 ? list.slice(0, 6) : list;
  }

  getTotalValue(stock: UserStockItem): number {
    return stock.quantity * stock.quote.price;
  }

  getTotalCurrentValue(stock: StockItem): number {
    return stock.quantity * stock.currentValue;
  }


  colorScheme = {
    name: 'customPurple',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#7e5bef']
  };


  private generateAccountHistory(): AccountStockHistory[] {
    const stockList = this.stockItems;
    if (stockList.length === 0) return [];

    const currentTotal = stockList.reduce(
      (sum, stock) => sum + stock.quantity * stock.currentValue,
      0
    );

    const historyLength = 7;
    const dates: string[] = [];
    for (let i = historyLength - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().slice(0, 10));
    }

    const values: number[] = [];

    for (let i = 0; i < historyLength - 1; i++) {
      const min = currentTotal * 0.91;
      const max = currentTotal * 1.15;
      const value = Math.random() * (max - min) + min;
      values.push(Number(value.toFixed(2)));
    }

    values.push(Number(currentTotal.toFixed(2)));

    return dates.map((date, i) => ({
      date,
      totalValue: values[i]
    }));
  }


  calculateInvestments(): void {
    const stockList = this.stockItems;

    if (stockList.length === 0) {
      this.totalInvested = 0;
      this.totalBalance = 0;
      this.percentageChange = 0;
      this.portfolioHistory = [];
      return;
    }

    this.totalBalance = stockList.reduce(
      (sum, stock) => sum + stock.quantity * stock.currentValue,
      0
    );

    this.totalInvested = this.totalBalance / 1.13;
    this.percentageChange = 13;

    this.yMin = Math.floor(this.totalBalance * 0.85);
    this.yMax = Math.ceil(this.totalBalance * 1.25);

    this.accountStockHistory = this.generateAccountHistory();
    this.portfolioHistory = this.buildPortfolioChart(this.accountStockHistory);
  }

  loadMockData(): void {
    this.mockUserStockPortfolio = this.getMockPortfolio();
    this.mockStockItemsForFavorites = this.getMockFavorites();
    this.transactions = this.getMockTransactions();
    this.accountStockHistory = this.getMockAccountHistory();
    this.portfolioHistory = this.buildPortfolioChart(this.accountStockHistory);

    this.calculateInvestments();
  }

  private getMockPortfolio(): StockItem[] {
    return [
      { stockId: 1, stockName: 'NOS.LS', quantity: 50, currentValue: 3.83, dailyVariation: '+0.13%' },
      { stockId: 2, stockName: 'EDPR.LS', quantity: 40, currentValue: 15.42, dailyVariation: '+0.67%' },
      { stockId: 3, stockName: 'OR.PA', quantity: 3, currentValue: 437.90, dailyVariation: '+0.45%' },
      { stockId: 4, stockName: 'AI.PA', quantity: 30, currentValue: 170.10, dailyVariation: '+0.28%' },
    ];
  }

  private getMockFavorites(): StockItemToMock[] {
    return [
      { id: 2, stockName: 'BCP.LS', quote: { price: 0.21, changePercent: '+1.45%' } },
      { id: 1, stockName: 'NOS.LS', quote: { price: 3.60, changePercent: '-0.89%' } },
      { id: 3, stockName: 'EDP.LS', quote: { price: 6.20, changePercent: '-0.50%' } },
      { id: 4, stockName: 'AAA.LS', quote: { price: 4.30, changePercent: '+1.51%' } },
      { id: 5, stockName: 'BBB.LS', quote: { price: 15.30, changePercent: '-3.32%' } },
      { id: 6, stockName: 'CCC.LS', quote: { price: 7.30, changePercent: '-0.27%' } },
    ];
  }

  private getMockTransactions(): Transaction[] {
    return [
      {
        id_transaction: '1',
        id_account: 'acc1',
        id_stock: 'NOS.LS',
        negotiation_price: 3.2,
        quantity: 50,
        transaction_type: TransactionType.Buy,
        date_time: new Date()
      },
      {
        id_transaction: '2',
        id_account: 'acc1',
        id_stock: 'BCP.LS',
        negotiation_price: 0.18,
        quantity: 100,
        transaction_type: TransactionType.Buy,
        date_time: new Date()
      }
    ];
  }

  private getMockAccountHistory(): AccountStockHistory[] {
    const stockList = this.stockItems;
    if (stockList.length === 0) return [];

    const currentTotal = stockList.reduce(
      (sum, stock) => sum + stock.quantity * stock.currentValue,
      0
    );

    const historyLength = 7;
    const dates: string[] = [];
    for (let i = historyLength - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().slice(0, 10));
    }

    const accountHistory: AccountStockHistory[] = [];
    let values: number[] = [];

    for (let i = 0; i < historyLength - 1; i++) {
      const min = currentTotal * 0.91;
      const max = currentTotal * 1.15;
      const value = Math.random() * (max - min) + min;
      values.push(Number(value.toFixed(2)));
    }

    values.push(Number(currentTotal.toFixed(2)));

    dates.forEach((date, index) => {
      accountHistory.push({
        date,
        totalValue: values[index]
      });
    });

    return accountHistory;
  }



  private buildPortfolioChart(history: AccountStockHistory[]): any[] {
    return [
      {
        name: 'Portfolio',
        series: history.map(p => ({
          name: p.date,
          value: p.totalValue
        }))
      }
    ];
  }


}
