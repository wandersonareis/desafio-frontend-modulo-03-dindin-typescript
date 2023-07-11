import { useContext } from "react";
import TransactionContext from "./transactionProvider";
import { TransactionContextValue } from "../type";

export default function useTransaction() {
  const context = useContext(TransactionContext);
  if (!context) throw new Error("useTransaction must be used within a TransactionProvider");
  return context as TransactionContextValue;
}
