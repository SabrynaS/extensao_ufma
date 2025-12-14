import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { Solicitation } from '@/data/mockData';

interface SolicitationDetailsModalProps {
  solicitation: Solicitation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SolicitationDetailsModal({ solicitation, open, onOpenChange }: SolicitationDetailsModalProps) {
  if (!solicitation) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <Badge className="bg-success/10 text-success border-0">Aprovado</Badge>;
      case 'Em Análise':
        return <Badge className="bg-warning/10 text-warning border-0">Em Análise</Badge>;
      case 'Pendente':
        return <Badge className="bg-warning/10 text-warning border-0">Pendente</Badge>;
      case 'Rejeitado':
        return <Badge className="bg-destructive/10 text-destructive border-0">Rejeitado</Badge>;
      case 'Em Ajuste':
        return <Badge className="bg-warning/10 text-warning border-0">Em Ajuste</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes da Solicitação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            {getStatusBadge(solicitation.status)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Atividade</span>
              <p className="font-medium">{solicitation.activity}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Tipo</span>
              <p className="font-medium">{solicitation.type}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Carga Horária</span>
              <p className="font-medium">{solicitation.hours}h</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Data de Envio</span>
              <p className="font-medium">{solicitation.submitDate}</p>
            </div>
          </div>

          {solicitation.institution && (
            <div>
              <span className="text-sm text-muted-foreground">Instituição</span>
              <p className="font-medium">{solicitation.institution}</p>
            </div>
          )}

          <div className="pt-2 border-t">
            <span className="text-sm text-muted-foreground block mb-2">Certificado Anexado</span>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <FileText className="w-8 h-8 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">certificado.pdf</p>
                <p className="text-xs text-muted-foreground">PDF - 245KB</p>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            {solicitation.status === 'Aprovado' && (
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Baixar Certificado
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
