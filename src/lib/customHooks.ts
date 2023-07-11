import { useState, useEffect, useCallback } from "react";

interface FormInput {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetValue: () => void;
}

export function useFormInput(initialValue: string): FormInput {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.trim());
  }, []);

  function resetValue() {
    setValue(initialValue);
  }

  return {
    value,
    onChange,
    resetValue,
  };
}

type ToggleHook = [boolean, () => void];

export function useToggle(initialState = false): ToggleHook {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
}

export function useOnClickOutside<T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
