import { SmallLoadingButton, WarningDeleteButton } from "../buttons";
import { successColor, warningColor } from "../colors";
import { ModalDeleteContainer, ModalDeleteContent } from "./modalStyled";
import { deleteUserTransaction } from "../../api";
import { useAuth, useTransaction } from "../../context";
import React from "react";

type DeleteTransactionEntryModalProps = {
  transactionId: number | null;
  onClose: () => void;
}

export default function DeleteTransactionEntryModal({ transactionId, onClose }: DeleteTransactionEntryModalProps) {
  const { token, isLoading, setLoading } = useAuth();
  const { getTransactionData } = useTransaction();

  async function handleDeleteClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    try {
      setLoading();
      if (!transactionId) return;
      await deleteUserTransaction(transactionId, token);

      await getTransactionData();
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading();
    }
  }
  return (
    <ModalDeleteContainer>
      <span>Apagar item?</span>
      <ModalDeleteContent>
        <SmallLoadingButton text="Sim" bgColor={successColor} isLoading={isLoading} onClick={handleDeleteClick} />
        <WarningDeleteButton bgColor={warningColor} onClick={onClose}>
          Não
        </WarningDeleteButton>
      </ModalDeleteContent>
    </ModalDeleteContainer>
  );
}
