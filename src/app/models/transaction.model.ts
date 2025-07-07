import { TransactionType } from "./enums/TransactionType.enum";

export interface Transaction {
    id_transaction: string;
    id_account: string;
    id_stock: string;
    negotiation_price: number;
    quantity: number;
    transaction_type: TransactionType;
    date_time: Date;
}
