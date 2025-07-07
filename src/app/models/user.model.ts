import { UserRole } from "./enums/UserRole.enum";

export interface User {
    id_user: string;
    name: string;
    nif: string;
    date_of_birth: Date;
    email: string;
    password: string;
    role: UserRole;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    token: string;
}
export interface UserRegistrationRequest {
    name: string;
  nif: string;
  date_of_birth: string; 
  email: string;
  password: string;

  }
  