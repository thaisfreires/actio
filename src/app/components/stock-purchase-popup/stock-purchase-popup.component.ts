import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-purchase-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-purchase-popup.component.html',
  styleUrls: ['./stock-purchase-popup.component.scss']
})
export class StockPurchasePopupComponent {
  @Input() stockName = '';
  @Input() unitPrice = 0;
  @Input() availableBalance = 0;

  @Output() onConfirm = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<void>();

  quantity = 1;
  get total(): number {
    return this.unitPrice * this.quantity;
  }

  confirm() {
    this.onConfirm.emit(this.quantity);
  }

  cancel() {
    this.onCancel.emit();
  }

  get hasInsufficientFunds(): boolean {
    return this.total > this.availableBalance;
  }
}

