import React, { useState } from "react";
import { LoadingButton } from "../buttons";
import { schemaPasswordConfirmValidation } from "../../util/schemas";
import { SpanWarning } from "../styled";
import { setObjectItem } from "../../util/storage";
import { ModalBackdrop, ModalCloseButton, ModalContainer, ModalContentForm, ModalTitle } from "./modalStyled";
import { handleErrors } from "../../handleErros";
import { getUserInfo, sendUserUpdateInfo } from "../../api";
import { useAuth } from "../../context";
import { useFormInput } from "../../lib/customHooks";
import InputStyled from "../basics/Input/InputStyled";
import { DynamicType } from "../../type";

type UserPerfilEditModalProps = {
  onClose: () => void;
};

export default function UserPerfilEditModal({ onClose }: UserPerfilEditModalProps) {
  const { token, user, setUserData, isLoading, setLoading } = useAuth();
  const { resetValue: resetName, ...name } = useFormInput(user.nome);
  const { resetValue: resetEmail, ...email } = useFormInput(user.email);
  const { resetValue: resetPassword, ...password } = useFormInput("");
  const { resetValue: resetConfirmPassword, ...confirmPassword } = useFormInput("");
  const [warning, setWarning] = useState({} as DynamicType);
  const [spanWarning, setSpanWarning] = useState("");

  function handleSelect() {
    setWarning({});
    setSpanWarning("");
  }

  function resetAllFields() {
    resetName();
    resetEmail();
    resetPassword();
    resetConfirmPassword();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading();

      const userData = {
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

      await schemaPasswordConfirmValidation.validate(userData, { abortEarly: false });

      token && (await sendUserUpdateInfo(token, userData.name, userData.email, userData.password));

      setObjectItem({...user,nome: userData.name, email: userData.email});

      const newUserData = await getUserInfo(token);
      setUserData({ ...user, nome: newUserData.nome, email: newUserData.email });

      resetAllFields();
      onClose();
    } catch (err) {
      console.log(err);
      handleErrors(err, setSpanWarning, setWarning);
    } finally {
      setLoading();
    }
  }

  return (
    <ModalBackdrop>
      <ModalContentForm onSubmit={handleSubmit}>
        <ModalContainer>
          <ModalTitle>Editar Perfil</ModalTitle>
          <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        </ModalContainer>
        <InputStyled name="name" label="Nome" placeholder="Digite seu nome" type="text" onSelect={handleSelect} {...name}  />
        {warning.name && <SpanWarning>{warning.name}</SpanWarning>}
        <InputStyled name="email" label="E-mail" placeholder="Digite seu e-mail" type="email" onSelect={handleSelect} {...email} />
        {warning.email && <SpanWarning>{warning.email}</SpanWarning>}
        <InputStyled name="password" label="Senha" placeholder="Digite sua senha" type="password" onSelect={handleSelect} required={true} autoComplete="new-password" {...password} />
        <SpanWarning>{warning.password}</SpanWarning>
        <InputStyled name="confirmPassword" label="Senha" placeholder="Confirme sua senha" type="password" onSelect={handleSelect} required={true} autoComplete="new-password" {...confirmPassword} />
        {warning.confirmPassword && <SpanWarning>{warning.confirmPassword}</SpanWarning>}
        <SpanWarning>{spanWarning}</SpanWarning>
        <LoadingButton text="Confirmar" isLoading={isLoading} />
      </ModalContentForm>
    </ModalBackdrop>
  );
}
