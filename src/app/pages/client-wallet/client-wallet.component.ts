import { CommonModule } from '@angular/common';
import { WalletService } from './../../services/wallet.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DefaultTableComponent, TableColumn } from "../../components/default-table/default-table.component";
import { StockItem } from '../../models/stock-item';
import { StockSearchComponent } from "../../components/stock-search/stock-search.component";
import { StockPurchasePopupComponent } from "../../components/stock-purchase-popup/stock-purchase-popup.component";
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-client-wallet',
  imports: [CommonModule, DefaultTableComponent, StockSearchComponent,StockPurchasePopupComponent],
  templateUrl: './client-wallet.component.html',
  styleUrl: './client-wallet.component.scss'
})
export class ClientWalletComponent implements OnInit {

  stockItems: StockItem[] = []
  selectedStock: StockItem | null = null;
  showPurchasePopup = false;
  isBuying = true;
  clientBalance = 0;
  errorMessage = '';
  successMessage = '';

  constructor(private walletService: WalletService, private accountService: AccountService){}
  ngOnInit(): void {

    this.accountService.getAccountBalance().subscribe({
      next: (value) => {
        this.clientBalance = value;
        console.log(this.clientBalance)
      },
      error: (err) => {
        console.error('Erro ao buscar saldo da conta:', err);
      }
    });

    this.walletService.getWallet()
      .subscribe({
        next: (response: StockItem[]) => {
          this.stockItems = response.map(row => ({
            ...row,
            position: row.quantity * row.currentValue
          }));
        },
        error: (err) => {
          console.error('Unable to retrieve wallet information from the server', err);
        }
    });

    this.stockItems = this.stockItems.map(row => ({
      ...row,
      position: row.quantity * row.currentValue
    }));
  }

  onBuy(item: StockItem): void {
    this.selectedStock = item;
    this.isBuying = true;
    this.showPurchasePopup = true;
  }

  onSell(item: StockItem): void {
    this.selectedStock = item;
    this.isBuying = false;
    this.showPurchasePopup = true;
  }

  title: string = "My Wallet";
  subtitle: string = "An Overview of Your Latest Market Positions"

  @ViewChild('buyButton', { static: true }) buyButtonTemplate!: TemplateRef<any>;
  @ViewChild('sellButton', { static: true }) sellButtonTemplate!: TemplateRef<any>;

  tableColumns: TableColumn[] = [
    {
      label: 'Stock',
      key: 'stockName',
      align: 'start'
    },
    {
      label: 'Daily Change',
      key: 'dailyVariation',
      align: 'end',
      format: (value: string) =>
        value.startsWith('-')
          ? `<span class="text-danger"><i class="fas fa-caret-down me-1"></i>${value}</span>`
          : `<span class="text-success"><i class="fas fa-caret-up me-1"></i>${value}</span>`
    },
    {
      label: 'Shares',
      key: 'quantity',
      align: 'end'
    },
    {
      label: 'Market Price',
      key: 'currentValue',
      align: 'end',
      format: (value: number) => `€ ${value.toFixed(2)}`
    },
    {
      label: 'Position',
      key: 'position',
      align: 'end',
      format: (value: number) => `€ ${value.toFixed(2)}`
    },
    {
      label: '',
      align: 'center',
      customRender: (row: StockItem) => this.buyButtonTemplate
    },
    {
      label: '',
      align: 'center',
      customRender: (row: StockItem) => this.sellButtonTemplate
    }
  ];


  handleTransactionSuccess(): void {
    this.successMessage = 'Transaction completed successfully!';
    this.refreshWallet();

    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }

  refreshWallet(): void {
    this.walletService.getWallet().subscribe({
      next: (response: StockItem[]) => {
        this.stockItems = [...response.map(row => ({
          ...row,
          position: row.quantity * row.currentValue
        }))];
      },
      error: err => console.error('Could not refresh wallet', err)
    });
  }

  handleConfirmTransaction(quantity: number): void {
    this.successMessage = `${this.isBuying ? 'Purchased' : 'Sold'} ${quantity} share(s) of ${this.selectedStock?.stockName}.`;
    this.showPurchasePopup = false;

    setTimeout(() => this.successMessage = '', 5000);
  }

  handleTransactionError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
    this.showPurchasePopup = false;
  }

  updateStockItemQuantity(stockId: number): void {
    this.walletService.getStockQuantity(stockId)
      .subscribe({
        next: resp => {
          const newList = this.stockItems.map(item => {
            if (item.stockId === stockId) {
              const updatedQty = resp.quantity;
              return {
                ...item,
                quantity: updatedQty,
                position: updatedQty * item.currentValue
              };
            }
            return item;
          });

          this.stockItems = newList;
        },
        error: err => console.error(`Erro ao atualizar estoque ${stockId}:`, err)
      });
  }
}
