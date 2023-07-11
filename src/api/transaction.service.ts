import { TransactionSummary } from "../dto/transaction-summary.dto";
import { Transaction } from "../dto/transaction.dto";
import api from "./api";
import { AxiosResponse } from "axios";

export async function getUserTransaction(transaction_id: string | number, token: string): Promise<Transaction> {
  const response: AxiosResponse<Transaction> = await api.get(`/auth/transacao/${transaction_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getUserTransactionsList(token: string): Promise<Transaction[]> {
  const response: AxiosResponse<Transaction[]> = await api.get("/auth/transacao", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getUserTransactionsFiltered(filters: string[], token: string): Promise<Transaction[]> {
  const parameters = filters.map((filter) => `filtro[]=${filter}`).join("&");
  const response: AxiosResponse<Transaction[]> = await api.get(`/auth/transacao?${parameters}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getUserTransactionsSummary(token: string): Promise<TransactionSummary> {
  const response: AxiosResponse<TransactionSummary> = await api.get("/auth/transacao/extrato", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function createUserTransaction(data: Omit<Transaction, "id" | "usuario_id">, token: string): Promise<Transaction> {
  const response: AxiosResponse<Transaction> = await api.post("/auth/transacao", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function sendUserTransactionUpdate(transaction_id: string, data: Partial<Transaction>, token: string): Promise<Transaction> {
  const response: AxiosResponse<Transaction> = await api.put(`/auth/transacao/${transaction_id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteUserTransaction(transaction_id: string | number, token: string): Promise<void> {
  const result: boolean = await confirmTransaction(transaction_id, token);
  if (result) {
    await api.delete(`/auth/transacao/${transaction_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async function confirmTransaction(transaction_id: string | number, token: string): Promise<boolean> {
    const response: Transaction = await getUserTransaction(transaction_id, token);
    return !!response;
  }
}
