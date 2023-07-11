import { AxiosError } from "axios";
import { ValidationError } from "yup";
import { DynamicType } from "../type";

type SetSpanWarning = (warning: string) => void;
type SetWarning = (warning: DynamicType) => void;

export const handleErrors = (err: any, setSpanWarning: SetSpanWarning, setWarning: SetWarning): void => {
  const newErrors: DynamicType = {};
  if (err.response?.data?.mensagem) {
    setSpanWarning(err.response.data.mensagem);
  } else if (err.name === "ValidationError") {
    err.inner.forEach((error: any) => {
      newErrors[error.path] = error.message;
    });
  } else {
    setSpanWarning("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
  }
  setWarning(newErrors);
};

export const handleErrorss = (err: any, setSpanWarning?: SetSpanWarning, setWarning?: SetWarning): void => {
  let newErrors: DynamicType = {};
  let errorMessage;

  if (err instanceof ValidationError) {
    newErrors = err.inner.reduce((errors: DynamicType, error): DynamicType => ({ ...errors, [error.path as keyof DynamicType]: error.message }), {});
  }

  if (err instanceof AxiosError) {
    errorMessage = err.response?.data?.mensagem ?? "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.";
  }

  if (err instanceof AxiosError && err.code === "ECONNABORTED") {
    errorMessage = "A requisição excedeu o tempo limite. Por favor, tente novamente.";
  }
  
  setSpanWarning && setSpanWarning(errorMessage);
  setWarning && setWarning(newErrors);
};
