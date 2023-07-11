import styled from "@emotion/styled";
import { backDropColor, boxShadowColor, confirmationDialogBgColor, whitePureColor } from "../colors";
import { Container } from "../styled";
import { ButtonProps } from "../../type";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${backDropColor};
  z-index: 2;

  @media (min-width: 967px) {
    align-items: center;
  }
`;

export const ModalBackDropTransactions = styled(ModalBackdrop.withComponent("td"))``;

export const ModalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ModalDeleteContainer = styled.td`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: -0.93rem;
  flex-direction: column;
  text-align: center;
  font-size: 0.7rem;
  width: 110px;
  height: 45px;
  padding: 0.5rem;
  background-color: ${confirmationDialogBgColor};
  border-radius: 4px;
  z-index: 1;
  transform: translateX(-35%);

  ::after {
    content: "";
    width: 0;
    height: 0;
    border: 0 solid transparent;
    border-width: 0 13px 17px 13px;
    border-bottom-color: ${confirmationDialogBgColor};

    position: absolute;
    top: -10px;
    right: 5px;
  }
`;

export const ModalDeleteContent = styled(Container)`
  gap: 0.5rem;
`;
export const ModalContentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${whitePureColor};
  border-radius: 20px;
  box-shadow: 0 0 10px ${boxShadowColor};
  padding: 4%;
  margin: 2%;
  gap: 1rem;

  @media (min-width: 967px) {
    justify-content: space-around;
    width: auto;
    max-height: 770px;
  }
`;

export const ModalTitle = styled.strong<ButtonProps>`
  font-size: 1.5rem;
  color: ${(props) => props.textColor || "black"};
  text-align: center;
  margin-top: 0;
`;

export const ModalCloseButton = styled(ModalTitle)`
  color: black;
  cursor: pointer;
`;
