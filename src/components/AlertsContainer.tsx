import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";
import { AlertState } from "@/hooks/useAlerts";

interface AlertsContainerProps {
  alerts: AlertState[];
  onRemove: (id: string) => void;
}

export function AlertsContainer({ alerts, onRemove }: AlertsContainerProps) {
  const getVariant = (type: AlertState["type"]) => {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "destructive";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "default";
    }
  };

  const getIcon = (type: AlertState["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "info":
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 w-96 space-y-3">
      {alerts.map((alert) => (
        <div key={alert.id} className="relative">
          <Alert variant={getVariant(alert.type)}>
            {getIcon(alert.type)}
            <div className="flex-1">
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </div>
            <button
              onClick={() => onRemove(alert.id)}
              className="absolute right-4 top-4 h-4 w-4 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        </div>
      ))}
    </div>
  );
}
