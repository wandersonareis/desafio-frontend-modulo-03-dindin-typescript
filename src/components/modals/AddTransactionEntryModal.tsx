import React, { useState } from "react";
import { ModalBackdrop } from "./modalStyled";
import { createUserTransaction } from "../../api";
import { TransactionForm } from "../form";
import { toIsodateString } from "../../util/localDateFormater";
import { formatToCents } from "../../util/localCurrencyConverter";
import { useAuth, useTransaction } from "../../context";
import { Transaction } from "../../dto/transaction.dto";

type AddTransactionEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddTransactionEntryModal({ isOpen, onClose }: AddTransactionEntryModalProps) {
  const [transaction, setTransaction] = useState<Transaction>(new Transaction());
  const { token, setLoading } = useAuth();
  const { getTransactionData } = useTransaction();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading();

      const transactionData: Omit<Transaction, "id" | "usuario_id"> = {
        tipo: transaction.tipo,
        descricao: transaction.descricao,
        valor: formatToCents(transaction.valor.toString()),
        data: toIsodateString(transaction.data),
        categoria_id: transaction.categoria_id,
      };

      await createUserTransaction(transactionData, token);

      setTransaction(new Transaction());
      await getTransactionData();
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading();
    }
  }

  if (!isOpen) {
    return null;
  }
  return (
    <ModalBackdrop>
      <TransactionForm
        tittle="Adicionar Registro"
        onClose={onClose}
        transactionObject={transaction}
        handleSubmit={handleSubmit}
        setTransactionObject={setTransaction}
      />
    </ModalBackdrop>
  );
}
