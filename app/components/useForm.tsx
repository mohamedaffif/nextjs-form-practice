import { useState } from "react";

export function useForm<T>(initialState: T) {
  const [form, setForm] = useState<T>(initialState);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function reset() {
    setForm(initialState);
  }

  return { form, setForm, handleChange, reset };
}
