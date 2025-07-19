import { MovementType } from "./enums/MovementType.enum";

export interface MovementRequest {
    amount: number;
  }
  
  export interface MovementResponse {
    id: number;
    amount: number;
    type: string;
    dateTime: string;
  }
