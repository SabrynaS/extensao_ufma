import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, MapPin } from "lucide-react";
import { Opportunity } from "@/data/mockData";
import { useAlerts } from "@/hooks/useAlerts";

interface EventDetailsModalProps {
  event: Opportunity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailsModal({
  event,
  open,
  onOpenChange,
}: EventDetailsModalProps) {
  const { addAlert } = useAlerts();

  if (!event) return null;

  const handleEnroll = () => {
    // Simular possível erro de inscrição (10% de chance)
    const hasError = Math.random() < 0.1;

    if (hasError) {
      addAlert(
        "error",
        "Erro na inscrição",
        "Ocorreu um erro ao processar sua inscrição. Tente novamente."
      );
      return;
    }

    addAlert(
      "success",
      "Inscrição realizada!",
      `Você foi inscrito em "${event.title}" com sucesso.`
    );
    onOpenChange(false);
  };

  const getStatusBadge = (status: string) => {
    if (status === "Inscrições Abertas") {
      return (
        <Badge className="bg-success/10 text-success border-0">
          Inscrições Abertas
        </Badge>
      );
    }
    return (
      <Badge className="bg-destructive/10 text-destructive border-0">
        Vagas Esgotadas
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-primary text-primary-foreground">
              {event.type}
            </Badge>
            {getStatusBadge(event.status)}
          </div>
          <DialogTitle className="text-xl">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">{event.description}</p>

          <div className="grid grid-cols-2 gap-4 py-4 border-y">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Carga Horária</p>
                <p className="font-medium">{event.hours} horas</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Vagas</p>
                <p className="font-medium">
                  {event.filledSlots}/{event.slots} inscritos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Data de Início</p>
                <p className="font-medium">{event.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Responsável</p>
                <p className="font-medium">{event.instructor}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Validação</h4>
            <p className="text-sm text-muted-foreground">
              {event.validation === "Automática"
                ? "As horas serão validadas automaticamente após a conclusão da atividade."
                : "As horas precisarão ser validadas manualmente pela coordenação após a conclusão."}
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
            <Button
              className="flex-1"
              disabled={event.status === "Vagas Esgotadas"}
              onClick={handleEnroll}
            >
              {event.status === "Vagas Esgotadas"
                ? "Vagas Esgotadas"
                : "Inscrever-se"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
