import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getObjectItem } from "../../util/storage";
import { ModalTitle } from "../modals/modalStyled";
import { LoadingButton, PrimaryButton } from "../buttons";
import { primaryColor } from "../colors";
import { SpanWarning } from "../styled";
import { useAuth } from "../../context";
import { useFormInput } from "../../lib/customHooks";
import { LoginContainer, LoginFormContainer, LoginLeftContainer, Logo, Paragraph, TittleParagraph } from "./loginFormStyled";
import logo from "../../assets/logo.svg";
import { handleErrorss } from "../../handleErros";
import InputStyled from "../basics/Input/InputStyled";

export default function SignInForm() {
  const { resetValue: resetEmail, ...email } = useFormInput("");
  const { resetValue: resetPassword, ...password } = useFormInput("");
  const [spanWarning, setSpanWarning] = useState("");
  const { handleLogin: onLogin, isLoading, setLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const { token } = getObjectItem();
    if (token) {
      navigate("/main");
    }
  }, [navigate]);

  const handleSelect = (): void => {
    if (spanWarning) setSpanWarning("");
  };

  function signUpClick(e: React.MouseEvent): void {
    e.preventDefault();
    navigate("/signup");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      setLoading();
      if (!email.value || !password.value) {
        setSpanWarning("Preencha todos os campos!");
        return;
      }

      await onLogin(email.value, password.value);

      resetEmail();
      resetPassword();
    } catch (error) {
      handleErrorss(error, setSpanWarning);
    } finally {
      setLoading();
    }
  }

  return (
    <LoginContainer>
      <Logo src={logo} />
      <LoginLeftContainer>
        <TittleParagraph>
          Controle suas <strong>finanças</strong>,<br />
          sem planilha chata.
        </TittleParagraph>
        <Paragraph>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</Paragraph>
        <PrimaryButton width="449px" onClick={signUpClick}>
          Cadastre-se
        </PrimaryButton>
      </LoginLeftContainer>
      <LoginFormContainer onSubmit={handleSubmit}>
        <ModalTitle textColor={primaryColor}>Login</ModalTitle>
        <InputStyled
          name="email"
          type="email"
          label="E-mail"
          placeholder="Digite seu email"
          onSelect={handleSelect}
          value={email.value}
          onChange={email.onChange}
        />
        <InputStyled
          name="password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          onSelect={handleSelect}
          value={password.value}
          onChange={password.onChange}
        />
        <SpanWarning>{spanWarning}</SpanWarning>
        <LoadingButton isLoading={isLoading} text="Entrar" />
      </LoginFormContainer>
    </LoginContainer>
  );
}
