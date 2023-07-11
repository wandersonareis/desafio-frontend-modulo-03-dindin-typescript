import styled from "@emotion/styled";
import { InputHTMLAttributes } from "react";
import { InputProps } from "../../../type";

const InputContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  max-width: 449px;
  margin-bottom: 2%;

  @media (min-width: 967px) {
    width: 22rem;
  }
`;

const InputLabel = styled.label`
  text-align: left;
  font-size: 1.2rem;
  color: black;
  margin-bottom: 0.1rem;
`;

const InputElement = styled.input`
  font-size: 1.2rem;
  border: solid 1px rgb(85, 85, 85);
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 0.5rem;

  position: relative;
`;

const Prefix = styled.span`
  position: absolute;
  top: 62%;
  left: 1.2rem;
  font-size: 1.2rem;
  transform: translateY(-50%);
`;

const NumberInput = styled(InputElement)`
  padding-left: 3rem;
`;
const SelectElement = styled(InputElement.withComponent("select"))``;


const InputStyled: React.FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({ label, ...rest }) => {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputElement {...rest} />
    </InputContainer>
  );
};
export const NumberInputStyled: React.FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({ label, ...rest }) => {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <NumberInput {...rest} />
      <Prefix>R$</Prefix>
    </InputContainer>
  );
};

export const SelectStyled: React.FC<InputProps & InputHTMLAttributes<HTMLSelectElement>> = ({ label, options, ...rest }) => {  
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <SelectElement {...rest}>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.descricao}
          </option>
        ))}
      </SelectElement>
    </InputContainer>
  );
};

export default InputStyled;
