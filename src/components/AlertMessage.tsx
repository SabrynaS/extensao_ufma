import { AlertCircle, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AlertMessageProps {
  type: "success" | "error" | "warning";
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function AlertMessage({
  type,
  title,
  message,
  duration = 4000,
  onClose,
}: AlertMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          textTitle: "text-green-900",
          textMessage: "text-green-800",
          icon: (
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          ),
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          textTitle: "text-red-900",
          textMessage: "text-red-800",
          icon: <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />,
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          textTitle: "text-yellow-900",
          textMessage: "text-yellow-800",
          icon: (
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          ),
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`${styles.bg} border ${styles.border} rounded-lg p-4 mb-6 flex gap-4 animate-in fade-in slide-in-from-top-2 duration-300`}
    >
      {styles.icon}
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold ${styles.textTitle}`}>{title}</h3>
        <p className={`text-sm ${styles.textMessage}`}>{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className={`flex-shrink-0 ${
          type === "success"
            ? "text-green-600 hover:text-green-700"
            : type === "error"
            ? "text-red-600 hover:text-red-700"
            : "text-yellow-600 hover:text-yellow-700"
        } transition-colors`}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
