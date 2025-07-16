import { Component, Input } from '@angular/core';
import { StockItem } from '../../models/stock-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-table',
  imports: [CommonModule],
  templateUrl: './default-table.component.html',
  styleUrl: './default-table.component.scss'
})
export class DefaultTableComponent {


  @Input() tableTitle: String = "";
  @Input() tableSubTitle: String = "";
  @Input() tableData: Array<Record<string, any>> = [];
  @Input() tableColumns: Array<{
    key: string;
    label: string;
    align?: 'start' | 'center' | 'end';
    format?: (value: any, row?: any) => string;
  }> = [];

  /*
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
  */

  constructor() {}

}
