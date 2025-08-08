import { Stock } from "./stock.model";

export interface TransactionResponse {
  transactionId: number;
  transactionType: string;
  transactionTypeId: number;
  stockSymbol: string;
  stockId: number;
  quantity: number;
  value: number;
  transactionDateTime: string;
}

export interface TransactionRequest {
  stockId: number;
  quantity: number;
  value: number;
}

export interface Transaction {
  id_transaction: string;
  id_account: string;
  id_stock: string;
  negotiation_price: number;
  quantity: number;
  transaction_type: string;
  date_time: Date;
}
