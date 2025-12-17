import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Opportunity } from "@/data/mockData";

interface OpportunityDetailsModalProps {
  opportunity: Opportunity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OpportunityDetailsModal({
  opportunity,
  open,
  onOpenChange,
}: OpportunityDetailsModalProps) {
  if (!opportunity) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aprovado":
        return (
          <Badge className="bg-success/10 text-success border-0">
            Aprovado
          </Badge>
        );
      case "Ativo":
        return (
          <Badge className="bg-blue-50 text-blue-700 border-0">Ativo</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes da Oportunidade</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{opportunity.title}</h2>
            {getStatusBadge(opportunity.status)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Tipo</span>
              <p className="font-medium">{opportunity.type}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Carga Horária
              </span>
              <p className="font-medium">{opportunity.hours}h</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Vagas</span>
              <p className="font-medium">
                {opportunity.filledSlots}/{opportunity.slots}
              </p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Data de Cadastro
              </span>
              <p className="font-medium">{opportunity.createdAt}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">
                Data de Início
              </span>
              <p className="font-medium">{opportunity.startDate}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Data Final</span>
              <p className="font-medium">{opportunity.endDate}</p>
            </div>
          </div>

          {opportunity.studentResponsible && (
            <div>
              <span className="text-sm text-muted-foreground">
                Discente Responsável
              </span>
              <p className="font-medium">{opportunity.studentResponsible}</p>
            </div>
          )}

          {opportunity.instructor && (
            <div>
              <span className="text-sm text-muted-foreground">
                Docente Responsável
              </span>
              <p className="font-medium">{opportunity.instructor}</p>
            </div>
          )}

          {opportunity.description && (
            <div>
              <span className="text-sm text-muted-foreground">Descrição</span>
              <p className="font-medium text-sm">{opportunity.description}</p>
            </div>
          )}

          <div className="pt-2 border-t flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => {
                // TODO: Implement download certificate
              }}
            >
              <Download className="w-3 h-3" />
              Baixar Relatório
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
