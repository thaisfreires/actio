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
  styleUrls: ['./transactions.component.scss']  // plural
})

export class TransactionsComponent implements OnInit {
  transactions: TransactionResponse[] = [];
  tableData: any[] = [];

  tableColumns: TableColumn[] = [
    {
      key: 'transactionDateTime', // ajustado aqui
      label: 'Date',
      align: 'center',
      format: (val: string) => new Date(val).toLocaleString()
    },
    {
      key: 'stockSymbol',
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
      format: (val?: number) => val != null ? `$${val.toFixed(2)}` : ''
    },
    {
      key: 'totalValue',
      label: 'Total',
      align: 'end',
      format: (val?: number) => val != null ? `$${val.toFixed(2)}` : ''
    },
    {
      key: 'transactionType',
      label: 'Type',
      align: 'center',
      format: (val: string) =>
        `<span class="badge bg-${val === 'BUY' ? 'success' : 'danger'}">${val}</span>`
    }
  ];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
  this.transactionService.getAll().subscribe(transactions => {
    this.transactions = transactions;
    this.tableData = transactions.map(tx => ({
      ...tx,
      stockName: tx.stockSymbol,
      totalValue: (tx.value ?? 0) * (tx.quantity ?? 0)
    }));
  });
}
}
