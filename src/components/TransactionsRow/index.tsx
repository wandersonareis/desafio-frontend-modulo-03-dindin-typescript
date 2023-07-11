import { useState } from "react";
import pencilIcon from "../../assets/pencil.svg";
import trashIcon from "../../assets/trash.svg";
import { useToggle } from "../../lib/customHooks";
import { toBrl } from "../../util/localCurrencyConverter";
import { toPtBrDateFormatter, toPtBrWeekDay } from "../../util/localDateFormater";
import { DeleteTransactionEntryModal, EditTransactionEntryModal } from "../modals";
import { ColumnDate, ColumnValue, TableCell, TableCellActions, TableCellActionsIcons, TableRow } from "./rowStyled";
import { Transaction } from "../../dto/transaction.dto";

type TransactionRowProps = {
  isOpen: number | null;
  onOpen: (id: number | null) => void;
  transaction: Transaction;
}

function TransactionRow({ isOpen, onOpen, transaction }: TransactionRowProps) {
  const [transactionToUpdate, setTransactionToUpdate] = useState<Transaction>(transaction);
  const [isTransactionEditModalOpen, setTransactionEditModalOpen] = useToggle();

  return (
    <TableRow>
      <ColumnDate className="date">{toPtBrDateFormatter(transaction.data)}</ColumnDate>
      <TableCell>{toPtBrWeekDay(transaction.data)}</TableCell>
      <TableCell>{transaction.descricao}</TableCell>
      <TableCell>{transaction.categoria_nome}</TableCell>
      <ColumnValue tipo={transaction.tipo}>{toBrl(transaction.valor)}</ColumnValue>
      <TableCellActions>
        <TableCellActionsIcons src={pencilIcon} alt="Editar transação." onClick={setTransactionEditModalOpen} />
        <TableCellActionsIcons src={trashIcon} alt="Excluir transação."
         onClick={() => onOpen(transaction?.id ?? null)} />
      </TableCellActions>
      {isTransactionEditModalOpen && (
        <EditTransactionEntryModal
          onClose={setTransactionEditModalOpen}
          transactionToUpdate={transactionToUpdate}
          setTransactionToUpdate={setTransactionToUpdate}
        />
      )}
      {isOpen === transaction.id && (
        <DeleteTransactionEntryModal transactionId={transaction.id} onClose={() => onOpen(null)} />
      )}
    </TableRow>
  );
}

export default TransactionRow;
