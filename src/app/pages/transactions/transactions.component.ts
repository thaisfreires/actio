import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionResponse } from '../../models/transaction.model';
import { DefaultTableComponent, TableColumn } from '../../components/default-table/default-table.component';
import { WalletService } from '../../services/wallet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [DefaultTableComponent, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit{
  transactions: TransactionResponse[] = [];
  tableData: any[] = [];
  stockNameMap = new Map<number, string>();

  tableColumns: TableColumn[]= [
    {
      key: 'dateTime',
      label: 'Date',
      align: 'center',
      format: (value: string) => new Date(value).toLocaleString()
    },
    {
      key: 'stockName',
      label: 'Stock',
      align: 'start',
    },
    {
      key: 'quantity',
      label: 'Shares',
      align: 'center',
    },
    {
      key: 'value',
      label: 'Price',
      align: 'end',
      format: (val: number) => `$${val.toFixed(2)}`
    },
    {
      key: 'totalValue',
      label: 'Total',
      align: 'end',
      format: (val: number) => `$${val.toFixed(2)}`
    },
    {
      key: 'transactionType',
      label: 'Type',
      align: 'center',
      format: (val: string) =>
        `<span class="badge bg-${val === 'BUY' ? 'success' : 'danger'}">${val}</span>`
    }
  ];

  constructor(private transactionService: TransactionService, private walletService: WalletService) {}

  ngOnInit(): void {
    this.walletService.getWallet().subscribe(wallet => {
      wallet.forEach(item => {
        this.stockNameMap.set(item.stockId, item.stockName);
      });

      this.transactionService.getAll().subscribe(transactions => {
        this.transactions = transactions;

        this.tableData = transactions.map(tx => ({
          ...tx,
          stockName: this.stockNameMap.get(tx.stockId) || `#${tx.stockId}`,
        }));
      });
    });
  }
}