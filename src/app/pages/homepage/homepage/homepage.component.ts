import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { StockItem } from '../../../models/stock-item.model';
import { AccountStockHistory } from '../../../models/account-stock-history.model';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';




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
  
  accountStockHistory: AccountStockHistory[] = [];

  // dados transformados para o gráfico
  portfolioHistory: any[] = [];

  ngOnInit(): void {
    this.loadMockData();
  }


  loadMockData(): void {
    // MOCK STOCKS
    this.stockItems = [
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
      }
    ];

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

  getTotalValue(stock: StockItem): number {
    return stock.quantity * stock.quote.price;
  }

  colorScheme = {
    name: 'customPurple',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#7e5bef']
  };
  

}
