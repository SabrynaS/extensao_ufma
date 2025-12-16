import { CheckCircle, GraduationCap, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "react-day-picker";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  icon: React.ReactNode;
}

export function Modal({ isOpen, onClose, children, icon }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <Card className="w-full max-w-sm transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl text-primary">Extensão UFMA</CardTitle>
            <CardDescription>Sistema de Gerenciamento de Extensão</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
