export interface TransactionResponse {
    transactionId: number;
    stockId: number;
    quantity: number;
    value: number;
    transactionType: string;
    totalValue: number;
    dateTime: Date;
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
