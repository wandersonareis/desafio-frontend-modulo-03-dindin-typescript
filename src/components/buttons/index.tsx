import styled from "@emotion/styled";
import { boxShadowColor, whitePureColor, whiteSnowColor } from "../colors";
import LoadingSpinner from "../LoadingSpinner";
import { ButtonProps } from "../../type";
import { TransactionType } from "../../dto/transaction.dto";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 52px;
  font-size: 1em;
  font-weight: 500;
  color: ${whitePureColor};
  border-radius: 5px;
  padding: 0.6em 1.2em;
  border: none;
  outline: none;
  box-shadow: 0px 3px 0px 0px hsla(232, 95%, 63%, 0.8);
  transition: transform 0.2s ease-in-out;

  &:hover {
    filter: brightness(110%);
    border-color: #646cff;
  }

  &:active {
    transform: translateY(3px);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const Loading = styled(Button)`
  background: linear-gradient(to right, hsla(200, 90%, 50%, 0.8) 0%, hsla(232, 95%, 63%, 0.8) 50%, hsla(242, 95%, 53%, 0.7) 100%);
  &:disabled {
    cursor: progress;
  }
`;

type PrimaryButtonProps = {
  width?: string;
}

export const PrimaryButton = styled(Button)<PrimaryButtonProps>`
  width: ${(props) => props.width || "100%"};
  margin-top: 2rem;
  background: linear-gradient(to right, hsla(200, 90%, 50%, 0.8) 0%, hsla(232, 95%, 63%, 0.8) 50%, hsla(242, 95%, 53%, 0.7) 100%);
`;

export const AddRegisterButton = styled(Button)`
  align-self: flex-end;
  background: linear-gradient(to right, hsla(200, 90%, 50%, 0.8) 0%, hsla(232, 95%, 63%, 0.8) 50%, hsla(242, 95%, 53%, 0.7) 100%);
`;

export type TransactionTypeButtonProps = {
  buttonType: TransactionType;
  bgColor: string;
}

export const CreditsTransactionTypeButton = styled(Button)<TransactionTypeButtonProps>`
  border: none;
  background-color: ${(props) => (props.buttonType === TransactionType.CREDITS ? props.bgColor : "gray")};
  border-radius: 10px 0px 0px 10px;
`;

export const DebitsTransactionTypeButton = styled(Button)<TransactionTypeButtonProps>`
  border: none;
  background-color: ${({ buttonType, bgColor }) => (buttonType === TransactionType.DEBITS ? bgColor : "gray")};
  border-radius: "0px 10px 10px 0px";
`;

export const WarningDeleteButton = styled(Button)<ButtonProps>`
  width: 37px;
  height: 15px;
  background-color: ${(props) => props.bgColor || "gray"};
`;

export const FilterButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #d7d7d7;
  color: ${(props) => (props.isSelected ? `${whitePureColor}` : "black")};
  background-color: ${(props) => (props.isSelected ? props.bgColor : `${whiteSnowColor}`)};
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  box-shadow: 0px 3px 0px 0px ${boxShadowColor};
  transition: transform 0.2s ease-in-out;
  ::after {
    content: "${(props) => props.afterContent}";
  }

  &:hover {
    filter: brightness(110%);
  }

  &:active {
    transform: translateY(2px);
  }
`;
export const FiltersActionApplyButton = styled(FilterButton)`
  justify-content: center;
  text-align: center;
  color: ${(props) => props.textColor || `black`};
  background-color: ${(props) => props.bgColor || `${whiteSnowColor}`};
  gap: 0;
`;

type LoadingButtonProps = {
  isLoading: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  bgColor?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, onClick, text }) => {
  return (
    <Loading onClick={onClick} disabled={isLoading}>
      {isLoading ? <LoadingSpinner /> : text}
    </Loading>
  );
};
export const SmallLoadingButton: React.FC<LoadingButtonProps> = ({ bgColor = '', isLoading, onClick, text }) => {
  return (
    <WarningDeleteButton bgColor={bgColor} onClick={onClick} disabled={isLoading}>
      {isLoading ? <LoadingSpinner small /> : text}
    </WarningDeleteButton>
  );
};
