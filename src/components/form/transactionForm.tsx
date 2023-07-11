import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { ModalCloseButton, ModalContainer, ModalContentForm, ModalTitle } from "../modals/modalStyled";
import { successColor, warningColor } from "../colors";
import { CreditsTransactionTypeButton, DebitsTransactionTypeButton, LoadingButton } from "../buttons";
import { formatMoney, toBrl } from "../../util/localCurrencyConverter";
import { onlyDate } from "../../util/localDateFormater";
import { useOnClickOutside } from "../../lib/customHooks";
import { useAuth } from "../../context";
import { useLoaderData } from "react-router-dom";
import InputStyled, { NumberInputStyled, SelectStyled } from "../basics/Input/InputStyled";
import { Transaction, TransactionType } from "../../dto/transaction.dto";
import { Category } from "../../dto/category.dto";

type TransactionFormProps = {
  tittle: string;
  onClose: () => void;
  transactionObject: Transaction;
  setTransactionObject: React.Dispatch<React.SetStateAction<Transaction>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
export default function TransactionForm({ tittle, onClose, transactionObject, setTransactionObject, handleSubmit }: TransactionFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const { isLoading } = useAuth();
  const transactionFormRef = useRef<HTMLFormElement>(null);
  const categoriesList = useLoaderData() as Category[];

  useOnClickOutside(transactionFormRef, () => onClose());

  useEffect(() => {
    if (transactionObject.categoria_id) setSelectedCategory(transactionObject.categoria_id);
  }, [transactionObject]);

  function handleChangeTransactionType(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const buttonId: string = e.currentTarget.id;

    if (buttonId === "credit") {
      setTransactionObject({ ...transactionObject, tipo: TransactionType.CREDITS });
    }

    if (buttonId === "debit") {
      setTransactionObject({ ...transactionObject, tipo: TransactionType.DEBITS });
    }
  }

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setTransactionObject({ ...transactionObject, [name]: value });
  }

  function handleChangeNumberInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    const formattedValue = formatMoney(value);

    setTransactionObject({ ...transactionObject, [name]: formattedValue });
  }

  function handleOptionChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const { name, value } = e.target;
    const valueAsNumber = parseInt(value);
    console.log("value", typeof value, value, "valueAsNumber", valueAsNumber);

    setSelectedCategory(valueAsNumber);
    setTransactionObject({ ...transactionObject, [name]: valueAsNumber });
  }

  return (
    <ModalContentForm onSubmit={handleSubmit} ref={transactionFormRef}>
      <ModalContainer>
        <ModalTitle>{tittle}</ModalTitle>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
      </ModalContainer>
      <ModalContainer>
        <CreditsTransactionTypeButton id="credit" bgColor={successColor} buttonType={transactionObject.tipo} onClick={handleChangeTransactionType}>
          Entrada
        </CreditsTransactionTypeButton>
        <DebitsTransactionTypeButton id="debit" bgColor={warningColor} buttonType={transactionObject.tipo} onClick={handleChangeTransactionType}>
          Saída
        </DebitsTransactionTypeButton>
      </ModalContainer>
      <InputStyled name="valor" type="text" label="Valor*" value={toBrl(transactionObject.valor)} onChange={handleChangeNumberInput} />
      <SelectStyled name="categoria_id" label="Categoria" value={selectedCategory} onChange={handleOptionChange} options={categoriesList} />
      <InputStyled name="data" type="date" label="Data*" value={onlyDate(transactionObject.data)} onChange={handleChangeInput} />
      <InputStyled name="descricao" type="text" label="Descrição*" value={transactionObject.descricao} onChange={handleChangeInput} />
      <LoadingButton isLoading={isLoading} text="Confirma" />
    </ModalContentForm>
  );
}
