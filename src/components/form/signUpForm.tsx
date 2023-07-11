import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "../buttons";
import { Logo } from "./loginFormStyled";
import { primaryColor } from "../colors";
import { schemaPasswordConfirmValidation } from "../../util/schemas";
import { Container, SpanWarning } from "../styled";
import { handleErrorss } from "../../handleErros";
import { ModalTitle } from "../modals/modalStyled";
import { userSignUp } from "../../api";
import { useFormInput } from "../../lib/customHooks";
import { useAuth } from "../../context";
import InputStyled from "../basics/Input/InputStyled";
import { DynamicType } from "../../type";

export default function SignUpForm() {
  const { isLoading, setLoading } = useAuth();
  const { resetValue: resetName, ...name } = useFormInput("");
  const { resetValue: resetEmail, ...email } = useFormInput("");
  const { resetValue: resetPassword, ...password } = useFormInput("");
  const { resetValue: resetConfirmPassword, ...confirmPassword } = useFormInput("");
  const [warning, setWarning] = useState({} as DynamicType);
  const [spanWarning, setSpanWarning] = useState<string>('');

  const navigate = useNavigate();


function handleSelect(e: React.FocusEvent<HTMLInputElement>): void {
  e.preventDefault();
  if (warning) setWarning({});
}

  function resetAllFileds() {
    resetName();
    resetEmail();
    resetPassword();
    resetConfirmPassword();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading();

      const signUpData = {
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

      await schemaPasswordConfirmValidation.validate(signUpData, { abortEarly: false });

      await userSignUp(name.value, email.value, password.value);

      navigate("/");
      resetAllFileds();
    } catch (err) {
      handleErrorss(err, setSpanWarning, setWarning);
    } finally {
      setLoading();
    }
  }
  
  return (
    <SignUpContainer>
      <Logo src={logo} />
      <SignUpContent onSubmit={handleSubmit}>
        <ModalTitle textColor={primaryColor}>Cadastre-se</ModalTitle>
        <InputStyled name="name" label="Nome" placeholder="Digite seu nome" type="text" onSelect={handleSelect} {...name}  />
        {warning.name && <SpanWarning>{warning.name}</SpanWarning>}
        <InputStyled name="email" label="E-mail" placeholder="Digite seu e-mail" type="email" onSelect={handleSelect} {...email} />
        {warning.email && <SpanWarning>{warning.email}</SpanWarning>}
        <InputStyled name="password" label="Senha" placeholder="Digite sua senha" type="password" onSelect={handleSelect} required={true} autoComplete="new-password" {...password} />
        <SpanWarning>{warning.password}</SpanWarning>
        <InputStyled name="confirmPassword" label="Senha" placeholder="Confirme sua senha" type="password" onSelect={handleSelect} required={true} autoComplete="new-password" {...confirmPassword} />
        {warning.confirmPassword && <SpanWarning>{warning.confirmPassword}</SpanWarning>}
        <SpanWarning>{spanWarning}</SpanWarning>

        <LoadingButton isLoading={isLoading} text="Cadastrar" />
        <SignUpLink href="/">Já tem cadastro? Clique aqui!</SignUpLink>
      </SignUpContent>
    </SignUpContainer>
  );
}

const SignUpContainer = styled(Container)`
  flex-direction: column;
`;

const SignUpContent = styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1.5rem;
  width: 25rem;
`;

const SignUpLink = styled.a`
  margin-top: 0.6rem;
`;
