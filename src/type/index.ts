import { SerializedStyles } from "@emotion/react";
import { AxiosError } from "axios";
import { ValidationError } from "yup";
import { Transaction } from "../dto/transaction.dto";
import { Category } from "../dto/category.dto";
import { TransactionSummary } from "../dto/transaction-summary.dto";
import { User } from "../dto/user.dto";

export type DynamicType = { [key: string]: string };

export type ButtonProps = {
  isSelected?: boolean;
  textColor?: string;
  bgColor?: string;
  afterContent?: string;
}

export type InputProps = {
  label: string;
  options?: Category[];
  inputStyles?: SerializedStyles;
};

export type InputsTypes<T extends HTMLElement> = {
  [key: string]: any;

  inputType: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  onSelect?: () => void;
  value: number | string;
  onChange: (event: React.ChangeEvent<T>) => void;
  resetValue: () => void;
};

export type TransactionContextValue = {
  transactionsList: Transaction[];
  setTransactionsList: React.Dispatch<React.SetStateAction<Transaction[]>>;
  transactionsSummary: TransactionSummary;
  setTransactionsSummary: React.Dispatch<React.SetStateAction<TransactionSummary>>;
  getTransactionData: (filters?: string[]) => Promise<void>;
};

export type ReactChildren = { children: React.ReactNode };

export type AnyError = Error | AxiosError | ValidationError;

export interface UserContext {
  token: string;
  user: User;
  setUserData: (data: User) => void;
  isLoggedIn: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}
