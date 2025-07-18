export interface StockItem {
  stockId: number
  stockName: string;
  quantity: number;
  currentValue: number;
  dailyVariation: string;

}


export interface StockQuantityResponse {
  stockId: number;
  quantity: number;
}
