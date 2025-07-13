import { CommonModule } from '@angular/common';
import { StockItem } from './../../models/stock-item';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wallet-table',
  imports: [CommonModule],
  templateUrl: './wallet-table.component.html',
  styleUrl: './wallet-table.component.scss'
})
export class WalletTableComponent {

  // TODO: Rename stockList to stockItems and exlude list of fake information
  @Input() stockList: StockItem[] = [];

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

  constructor() {}

}
