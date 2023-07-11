import { useCallback, useEffect, useState } from "react";
import { AddTransactionEntryModal } from "../modals";
import { toBrl } from "../../util/localCurrencyConverter";
import { AddRegisterButton } from "../buttons";
import {
  SummaryCard,
  SummaryContainer,
  SummaryContent,
  SummarySeparator,
  SummarySpanBalance,
  SummarySpanDeposits,
  SummarySpanWithDraws,
} from "./summaryStyled";
import { useTransaction } from "../../context";

export default function TransactionsSummary() {
  const { transactionsSummary } = useTransaction();
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [credits, setCredits] = useState(0);
  const [debits, setDebits] = useState(0);

const setSummary = useCallback(() => {
  try {
    setCredits(transactionsSummary.entrada);
    setDebits(transactionsSummary.saida);
  } catch (error) {
    console.log(error);
  }
}, [transactionsSummary, setCredits, setDebits]);

  useEffect(() => {
    setSummary();
  }, [setSummary]);


  const handleOpenModal = () => {
    setIsAddTransactionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddTransactionModalOpen(false);
  };

  return (
    <SummaryContainer>
      <SummaryCard>
        <strong>Resumo</strong>
        <SummaryContent>
          <span>Entradas</span>
          <SummarySpanDeposits>{toBrl(credits)}</SummarySpanDeposits>
        </SummaryContent>
        <SummaryContent>
          <span>Saídas</span>
          <SummarySpanWithDraws>{toBrl(debits)}</SummarySpanWithDraws>
        </SummaryContent>
        <SummarySeparator />
        <SummaryContent>
          <strong>Saldo</strong>
          <SummarySpanBalance>{toBrl(credits - debits)}</SummarySpanBalance>
        </SummaryContent>
      </SummaryCard>
      <AddRegisterButton type="button" onClick={handleOpenModal}>
        Adicionar Registro
      </AddRegisterButton>
      <AddTransactionEntryModal isOpen={isAddTransactionModalOpen} onClose={handleCloseModal} />
    </SummaryContainer>
  );
}
