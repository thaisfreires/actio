import { WalletService } from './../../services/wallet.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DefaultTableComponent, TableColumn } from "../../components/default-table/default-table.component";
import { StockItem } from '../../models/stock-item';
import { StockSearchComponent } from "../../components/stock-search/stock-search.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-client-wallet',
  imports: [DefaultTableComponent, StockSearchComponent, NavbarComponent, FooterComponent],
  templateUrl: './client-wallet.component.html',
  styleUrl: './client-wallet.component.scss'
})
export class ClientWalletComponent implements OnInit {

  stockItems: StockItem[] = []

  constructor(private walletService: WalletService){}
  ngOnInit(): void {
    this.walletService.getWallet()
      .subscribe({
        next: (response: StockItem[]) => {
          this.stockItems = response.map(row => ({
            ...row,
            position: row.quantity * row.currentValue
          }));
        },
        error: err => console.error('Could not load wallet', err)
      });
  }

  onBuy(item: StockItem): void {
    console.log('Buying', item.stockName);
    // To implement
  }

  onSell(item: StockItem): void {
    console.log('Selling', item.stockName);
    // To implement
  }

  title: string = "My Wallet";
  subtitle: string = "An Overview of Your Latest Market Positions"

  @ViewChild('buyButton', { static: true }) buyButtonTemplate!: TemplateRef<any>;
  @ViewChild('sellButton', { static: true }) sellButtonTemplate!: TemplateRef<any>;

  tableColumns: TableColumn[] = [
    {
      label: 'Stock',
      key: 'stockName',
      align: 'start'
    },
    {
      label: 'Daily Change',
      key: 'dailyVariation',
      align: 'end',
      format: (value: string) =>
        value.startsWith('-')
          ? `<span class="text-danger"><i class="fas fa-caret-down me-1"></i>${value}</span>`
          : `<span class="text-success"><i class="fas fa-caret-up me-1"></i>${value}</span>`
    },
    {
      label: 'Shares',
      key: 'quantity',
      align: 'end'
    },
    {
      label: 'Market Price',
      key: 'currentValue',
      align: 'end',
      format: (value: number) => `€ ${value.toFixed(2)}`
    },
    {
      label: 'Position',
      key: 'position',
      align: 'end',
      format: (value: number) => `€ ${value.toFixed(2)}`
    },
    {
      label: '',
      align: 'center',
      customRender: (row: StockItem) => this.buyButtonTemplate
    },
    {
      label: '',
      align: 'center',
      customRender: (row: StockItem) => this.sellButtonTemplate
    }
  ];
}
