import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { TransactionRequest } from '../../models/transaction.model';

@Component({
  selector: 'app-stock-purchase-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-purchase-popup.component.html',
  styleUrls: ['./stock-purchase-popup.component.scss']
})
export class StockPurchasePopupComponent {
  @Input() stockName = '';
  @Input() stockId = 0;
  @Input() unitPrice = 0;
  @Input() availableBalance = 0;

  @Output() onConfirm = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() errorMessage = new EventEmitter<string>();

  constructor(private transactionService: TransactionService){}

  quantity = 1;
  get total(): number {
    return this.unitPrice * this.quantity;
  }

  confirm() {
    const request: TransactionRequest = {
        'stockId': this.stockId,
        'quantity': this.quantity,
        'value': this.unitPrice
      }

      this.transactionService.buy(request).subscribe({
        next: () => {
          this.onConfirm.emit(this.quantity);
        },
        error: err => {
          if(err.message.startsWith("Insufficient balance")){
            this.errorMessage.emit("Insufficient balance to complete the purchase.");
          } else{
            this.errorMessage.emit("Purchase failed. Contact the support.");
          }
          console.error('Purchase failed:', err.message);
        }
      });
  }

  cancel() {
    this.onCancel.emit();
  }

  get hasInsufficientFunds(): boolean {
    return this.total > this.availableBalance;
  }

}

