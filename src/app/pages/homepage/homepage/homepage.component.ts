import { Component } from '@angular/core';
import { UserStockItem } from '../../../models/user-stock-item.model';
import { AccountStockHistory } from '../../../models/account-stock-history.model';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { StockItem } from '../../../models/stock-item.model';
import { WatchlistComponent } from '../../../components/watchlist/watchlist.component';
import { Transaction } from '../../../models/transaction.model';
import { TransactionType } from '../../../models/enums/TransactionType.enum';
import { RouterModule } from '@angular/router';
import * as shape from 'd3-shape';

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

  stockItems: StockItem[] = [];
  userStockItems: UserStockItem[] = [];
  accountStockHistory: AccountStockHistory[] = [];
  transactions: Transaction[] = [];

  totalInvested = 0;
  totalBalance = 0;
  percentageChange = 0;
  portfolioHistory: any[] = [];

  width = 500;
  height = 280;
  curve = shape.curveLinear;

  ngOnInit(): void {
    this.loadMockData();
    this.calculateInvestments();
  }

  loadMockData(): void {
    this.userStockItems = [
      {
        id: 1,
        stockName: 'NOS.LS',
        quantity: 50,
        quote: {
          price: 3.60,
          changePercent: '-0.89%'
        }
      },
      {
        id: 2,
        stockName: 'BCP.LS',
        quantity: 100,
        quote: {
          price: 0.21,
          changePercent: '+1.45%'
        }
      },
      {
        id: 3,
        stockName: 'BCP.LS',
        quantity: 100,
        quote: {
          price: 0.21,
          changePercent: '+1.45%'
        }
      },
      {
        id: 4,
        stockName: 'BCP.LS',
        quantity: 100,
        quote: {
          price: 0.21,
          changePercent: '+1.45%'
        }
      }
    ];

    this.stockItems = [
      {
        id: 2,
        stockName: 'BCP.LS',
        quote: {
          price: 0.21,
          changePercent: '+1.45%'
        }
      },
      {
        id: 1,
        stockName: 'NOS.LS',
        quote: {
          price: 3.60,
          changePercent: '-0.89%'
        }
      },
      {
        id: 3,
        stockName: 'EDP.LS',
        quote: {
          price: 6.20,
          changePercent: '-0.50%'
        }
      },
      {
        id: 4,
        stockName: 'AAA.LS',
        quote: {
          price: 4.30,
          changePercent: '+1.51%'
        }
      },
      {
        id: 5,
        stockName: 'BBB.LS',
        quote: {
          price: 15.30,
          changePercent: '-3.32%'
        }
      },
      {
        id: 6,
        stockName: 'CCC.LS',
        quote: {
          price: 7.30,
          changePercent: '-0.27%'
        }
      }
    ];

    this.transactions = [
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

    this.accountStockHistory = [
      { date: '2025-07-06', totalValue: 250.20 },
      { date: '2025-07-07', totalValue: 270.00 },
      { date: '2025-07-08', totalValue: 268.00 },
      { date: '2025-07-09', totalValue: 274.55 },
      { date: '2025-07-10', totalValue: 277.10 }
    ];

    this.portfolioHistory = [
      {
        name: 'Portfolio',
        series: this.accountStockHistory.map(p => ({
          name: p.date,
          value: p.totalValue
        }))
      }
    ];
  }

  getTotalValue(stock: UserStockItem): number {
    return stock.quantity * stock.quote.price;
  }

  colorScheme = {
    name: 'customPurple',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#7e5bef']
  };

  calculateInvestments(): void {
    this.totalInvested = this.transactions
      .filter(t => t.transaction_type === TransactionType.Buy)
      .reduce((sum, t) => sum + t.negotiation_price * t.quantity, 0);

    this.totalBalance = this.userStockItems
      .reduce((sum, s) => sum + s.quantity * s.quote.price, 0);

    this.percentageChange = this.totalInvested === 0
      ? 0
      : ((this.totalBalance - this.totalInvested) / this.totalInvested) * 100;
  }
}
