import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AlertState {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  id: string;
}

interface AlertContextType {
  alerts: AlertState[];
  addAlert: (
    type: "success" | "error" | "warning" | "info",
    title: string,
    message: string,
    duration?: number
  ) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export { AlertContext };

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alerts, setAlerts] = useState<AlertState[]>([]);

  const addAlert = (
    type: "success" | "error" | "warning" | "info",
    title: string,
    message: string,
    duration: number = 4000
  ) => {
    const id = Date.now().toString();
    const newAlert: AlertState = { type, title, message, id };

    setAlerts((prev) => [...prev, newAlert]);

    if (duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
