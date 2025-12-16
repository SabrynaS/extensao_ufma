import { useContext } from "react";
import { AlertContext } from "@/contexts/AlertContext";

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlerts deve ser usado dentro de um AlertProvider");
  }
  return context;
}

export type { AlertState } from "@/contexts/AlertContext";
