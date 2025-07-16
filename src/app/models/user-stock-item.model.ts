

export interface UserStockItem{
    id: number;               // id do stock
    //id_account: string;              
    stockName: string;        // ex: "NOS.LS"
    quantity: number;         // quantas unidades o utilizador tem
    quote: {
        price: number;
        changePercent: string;
    };
}