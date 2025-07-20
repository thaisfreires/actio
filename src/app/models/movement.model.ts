export interface Movement {
  id: number;
  amount: number;
  type: string;
  dateTime: string;
}

export interface MovementRequest {
  amount: number;
}
