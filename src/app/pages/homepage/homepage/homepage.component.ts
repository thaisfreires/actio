import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserStockItem } from '../../../models/user-stock-item.model';
import { AccountStockHistory } from '../../../models/account-stock-history.model';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { StockItem } from '../../../models/stock-item.model';




@Component({
  selector: 'app-homepage',
  imports: [SidebarComponent, NavbarComponent,CommonModule, NgxChartsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  stockItems: StockItem[] = [];

  userStockItems: UserStockItem[] = [];
  
  accountStockHistory: AccountStockHistory[] = [];

  // dados transformados para o gráfico
  portfolioHistory: any[] = [];

  ngOnInit(): void {
    this.loadMockData();
  }


  loadMockData(): void {
    // MOCK STOCKS
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
          changePercent: '1.45%'
        }
      },
      {
        id: 2,
        stockName: 'BCP.LS',
        quantity: 100,
        quote: {
          price: 0.21,
          changePercent: '1.45%'
        }
      },
      {
        id: 2,
        stockName: 'BCP.LS',
        quantity: 100,
        quote: {
          price: 0.21,
          changePercent: '1.45%'
        }
      },
      
     
    ];

    this.stockItems = [
      {
        id: 2,
        stockName: 'BCP.LS',
        quote: {
          price: 0.21,
          changePercent: '1.45%'
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
        stockName: 'XXX.LS',
        quote: {
          price: 5.30,
          changePercent: '2.39%'
        }
      },

    ]

    // MOCK HISTÓRICO DA CARTEIRA
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
  

}
