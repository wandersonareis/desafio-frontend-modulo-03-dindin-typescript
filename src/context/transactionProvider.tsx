import React, { useState, createContext, useCallback } from "react";
import { getUserTransactionsFiltered, getUserTransactionsList, getUserTransactionsSummary } from "../api";
import { handleErrorss } from "../handleErros";
import { getObjectItem } from "../util/storage";
import { Transaction } from "../dto/transaction.dto";
import { TransactionSummary } from "../dto/transaction-summary.dto";
import { ReactChildren, TransactionContextValue } from "../type";

const TransactionContext = createContext<TransactionContextValue | undefined>(undefined);

export const TransactionProvider: React.FC<ReactChildren> = ({ children }) => {
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
  const [transactionsSummary, setTransactionsSummary] = useState<TransactionSummary>({ entrada: 0, saida: 0 });
  const { token } = getObjectItem();

const getTransactionData = useCallback(async (filters: string[] = []): Promise<void> => {
  try {    
    const transactionListResponse: Transaction[] = filters.length ? await getUserTransactionsFiltered(filters, token) : await getUserTransactionsList(token);
    const transactionResponseSummary: TransactionSummary = await getUserTransactionsSummary(token);
    setTransactionsList(transactionListResponse);
    setTransactionsSummary(transactionResponseSummary);
  } catch (error) {
    handleErrorss(error);
  }
}, [token, setTransactionsList, setTransactionsSummary]);

  const value = {
    transactionsList,
    setTransactionsList,
    transactionsSummary,
    setTransactionsSummary,
    getTransactionData,
  };

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};

export default TransactionContext;
