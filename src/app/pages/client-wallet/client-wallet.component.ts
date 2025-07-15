import { Component } from '@angular/core';
import { DefaultTableComponent } from "../../components/default-table/default-table.component";
import { StockItem } from '../../models/stock-item';

@Component({
  selector: 'app-client-wallet',
  imports: [DefaultTableComponent],
  templateUrl: './client-wallet.component.html',
  styleUrl: './client-wallet.component.scss'
})
export class ClientWalletComponent {

  title: string = "Table Title";
  subtitle: string = "The Long Table Subtitle here"


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

  stockItems: StockItem[] = [
    {
      stockName: "GALP.LS",
      quantity: 120,
      currentValue: 13.4565,
      dailyVariation: "+1.52%"
    },
    {
      stockName: "EDP.LS",
      quantity: 80,
      currentValue: 4.82,
      dailyVariation: "-0.34%"
    },
    {
      stockName: "SAN.PA",
      quantity: 45,
      currentValue: 88.67,
      dailyVariation: "+0.78%"
    },
    {
      stockName: "OR.PA",
      quantity: 25,
      currentValue: 430.10,
      dailyVariation: "+1.05%"
    },
    {
      stockName: "BNP.PA",
      quantity: 60,
      currentValue: 56.20,
      dailyVariation: "-0.12%"
    }
  ];

}
