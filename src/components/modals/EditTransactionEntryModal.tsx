import React from "react";
import { ModalBackDropTransactions } from "./modalStyled";
import { sendUserTransactionUpdate } from "../../api";
import { TransactionForm } from "../form";
import { onlyDate, toIsodateString } from "../../util/localDateFormater";
import { formatToCents } from "../../util/localCurrencyConverter";
import { useAuth, useTransaction } from "../../context";
import { Transaction } from "../../dto/transaction.dto";

type EditTransactionEntryModalProps = {
  onClose: () => void;
  transactionToUpdate: Transaction;
  setTransactionToUpdate: React.Dispatch<React.SetStateAction<Transaction>>;
}

export default function EditTransactionEntryModal({ onClose, transactionToUpdate, setTransactionToUpdate }: EditTransactionEntryModalProps) {
  const { token, setLoading } = useAuth();
  const { getTransactionData } = useTransaction();

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    try {
      setLoading();

      const transactionData: Partial<Transaction> = {
        tipo: transactionToUpdate.tipo,
        descricao: transactionToUpdate.descricao,
        valor: formatToCents(transactionToUpdate.valor.toString()),
        data: onlyDate(transactionToUpdate.data),
        categoria_id: transactionToUpdate.categoria_id,
      };

      await sendUserTransactionUpdate(transactionToUpdate.id?.toString(), transactionData, token);

      await getTransactionData();
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading();
    }
  }


  return (
    <ModalBackDropTransactions>
      {transactionToUpdate && (
        <TransactionForm
          tittle="Editar registro"
          onClose={onClose}
          transactionObject={transactionToUpdate}
          setTransactionObject={setTransactionToUpdate}
          handleSubmit={handleSubmit}
        />
      )}
    </ModalBackDropTransactions>
  );
}
