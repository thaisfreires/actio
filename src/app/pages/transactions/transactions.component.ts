import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionResponse } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  imports: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit{
  transactions: TransactionResponse[] = [];

  tableColumns = [
    { key: 'dateTime', label: 'Date', align: 'center' },
    { key: 'stockSymbol', label: 'Symbol', align: 'center' },
    { key: 'stockName', label: 'Name', align: 'start' },
    { key: 'quantity', label: 'Qty', align: 'center' },
    { key: 'price', label: 'Price', align: 'end', format: (val: number) => `$${val.toFixed(2)}` },
    { key: 'total', label: 'Total', align: 'end', format: (val: number) => `$${val.toFixed(2)}` },
    { key: 'type', label: 'Type', align: 'center', format: (val: string) => `<span class="badge bg-${val === 'BUY' ? 'success' : 'danger'}">${val}</span>` },
  ];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getAll().subscribe({
      next: data => (this.transactions = data),
      error: err => console.error('Failed to load transactions', err),
    });
  }
}
