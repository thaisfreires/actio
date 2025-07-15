import { WalletService } from './../../services/wallet.service';
import { Component, OnInit } from '@angular/core';
import { DefaultTableComponent } from "../../components/default-table/default-table.component";
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

  title: string = "My Wallet";
  subtitle: string = "An Overview of Your Latest Market Positions"

  tableColumns = [
    { label: 'Stock', key: 'stockName', align: 'start' as const },
    { label: 'Shares', key: 'quantity', align: 'end' as const },
    { label: 'Market Price', key: 'currentValue', align: 'end' as const },
    {
      label: 'Daily Change',
      key: 'dailyVariation',
      align: 'end' as const,
      format: (value: string) =>
        value.startsWith('-')
          ? `<span class="text-danger d-inline-flex align-items-center">
               <i class="fas fa-caret-down me-1"></i>${value}
             </span>`
          : `<span class="text-success d-inline-flex align-items-center">
               <i class="fas fa-caret-up me-1"></i>${value}
             </span>`
    }
  ];


}
