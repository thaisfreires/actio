

export interface StockItem{
    id: number;               // id do stock
    stockName: string;        // ex: "NOS.LS"
    quantity: number;         // quantas unidades o utilizador tem
    quote: {
        price: number;
        changePercent: string;
    };
}