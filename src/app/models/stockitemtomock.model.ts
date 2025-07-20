

export interface StockItemToMock{
    id: number;               // id do stock
    stockName: string;        // ex: "NOS.LS"
    quote: {
        price: number;
        changePercent: string;
    };
}
