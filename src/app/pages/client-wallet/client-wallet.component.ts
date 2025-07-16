import { WalletService } from './../../services/wallet.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DefaultTableComponent, TableColumn } from "../../components/default-table/default-table.component";
import { StockItem } from '../../models/stock-item';

@Component({
  selector: 'app-client-wallet',
  imports: [DefaultTableComponent],
  templateUrl: './client-wallet.component.html',
  styleUrl: './client-wallet.component.scss'
})
export class ClientWalletComponent implements OnInit {

  stockItems: StockItem[] = []


  constructor(private walletService: WalletService){}
  ngOnInit(): void {

    this.walletService.getWallet().subscribe({
        next: (response: StockItem[]) => {
          console.log(response);
          this.stockItems = response;
        },
        error: (err) => {
          console.error('Unable to retrieve wallet information from the server', err);
        }
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
    { label: 'Stock', key: 'stockName', align: 'start' as const },
    { label: 'Shares', key: 'quantity', align: 'end' as const },
    {
      label: 'Market Price',
      key: 'currentValue',
      align: 'end' as const,
      format: (value: number) => `€ ${value.toFixed(2)}`
    },
    {
      label: 'Daily Change',
      key: 'dailyVariation',
      align: 'end' as const,
      format: (value: string) =>
        value.startsWith('-')
          ? `<span class="text-danger"><i class="fas fa-caret-down me-1"></i>${value}</span>`
          : `<span class="text-success"><i class="fas fa-caret-up me-1"></i>${value}</span>`
    },
    {
      label: '',
      align: 'center' as const,
      customRender: (row: StockItem) => this.buyButtonTemplate
    },
    {
      label: '',
      align: 'center' as const,
      customRender: (row: StockItem) => this.sellButtonTemplate
    }
  ];

}
