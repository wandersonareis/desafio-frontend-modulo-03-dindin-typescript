import styled from "@emotion/styled";
import { tableBorderColor, tableCreditsColor, tableDebitsColor } from "../colors";

export const TableRow = styled.tr`
  position: relative;
  max-height: 3.125rem;
`;

export const TableCell = styled.td`
  text-align: center;
  border-bottom: 1px solid ${tableBorderColor};
`;

export const ColumnDate = styled(TableCell)`
  font-weight: bold; ;
`;

type ColumnValueProps = {
  tipo: string;
}

export const ColumnValue = styled(TableCell)<ColumnValueProps>`
  font-weight: bold;
  color: ${({ tipo }) => (tipo === "entrada" ? tableCreditsColor : tableDebitsColor)};
`;

export const TableCellActions = styled.td`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  min-width: 4rem;
  height: 100%;
  border-bottom: 1px solid ${tableBorderColor};
`;

export const TableCellActionsIcons = styled.img`
  width: 100%;
`;
