import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { TransactionRequest } from '../../models/transaction.model';

@Component({
  selector: 'app-stock-purchase-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './stock-purchase-popup.component.html',
  styleUrls: ['./stock-purchase-popup.component.scss']
})
export class StockPurchasePopupComponent {
  @Input() stockName = '';
  @Input() stockId = 0;
  @Input() unitPrice = 0;
  @Input() availableBalance = 0;
  @Input() isBuy = true;
  @Input() availableShares = 0;


  @Output() onConfirm = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() errorMessage = new EventEmitter<string>();
  @Output() onSuccess = new EventEmitter<void>();

  constructor(private transactionService: TransactionService){}

  quantity = 1;
  get total(): number {
    return this.unitPrice * this.quantity;
  }

  confirm() {
    if (this.hasInsufficientFunds) {
     this.errorMessage.emit("Insufficient balance to complete the purchase.");

      return;
    }

    if (this.hasInsufficientShares) {
      this.errorMessage.emit("You don't have enough shares to complete the sale.");
      return;
    }

    const request: TransactionRequest = {
      stockId: this.stockId,
      quantity: this.quantity,
      value: this.unitPrice
    };

    const transaction$ = this.isBuy
      ? this.transactionService.buy(request)
      : this.transactionService.sell(request);

    transaction$.subscribe({
      next: () => {
        this.onConfirm.emit(this.quantity);
        this.onSuccess.emit();
      },
      error: err => {
        this.errorMessage.emit("Transaction failed. Contact support.");
        console.error('Transaction failed:', err.message);
      }
    });
  }

  get blockMessage(): string | null {
    if (this.hasInsufficientFunds) {
      return "Insufficient balance to complete the purchase.";
    }

    if (this.hasInsufficientShares) {
      return "You don't have enough shares to complete the sale.";
    }

    return null;
  }


  cancel() {
    this.onCancel.emit();
  }

  get hasInsufficientFunds(): boolean {
    return this.isBuy && this.total > this.availableBalance;
  }

  get hasInsufficientShares(): boolean {
    return !this.isBuy && this.quantity > this.availableShares;
  }
}

