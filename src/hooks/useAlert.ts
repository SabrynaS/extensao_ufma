import { useState } from "react";

export interface AlertState {
  type: "success" | "error" | "warning";
  title: string;
  message: string;
}

export function useAlert() {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const showAlert = (
    type: "success" | "error" | "warning",
    title: string,
    message: string
  ) => {
    setAlert({ type, title, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return {
    alert,
    showAlert,
    closeAlert,
  };
}
