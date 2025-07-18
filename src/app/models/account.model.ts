import { AccountStatus } from "./enums/AccountStatus.enum";

export interface Account {
    id_account: string;
    id_user: string;
    current: number;
    status: AccountStatus;
}
export interface AccountInfo {
  id: number;
  userEmail: string;
  status: string;
  currentBalance: number;
}
