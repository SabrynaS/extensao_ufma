import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText, Download, Eye } from 'lucide-react';
import { PPCVersion } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PPCVersionHistoryProps {
  versions: PPCVersion[];
  onViewVersion: (version: PPCVersion) => void;
}

export function PPCVersionHistory({ versions, onViewVersion }: PPCVersionHistoryProps) {
  const { toast } = useToast();
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
  };

  const handleDownloadPPC = () => {
    toast({ title: `Download do PPC iniciado.`, description: 'O arquivo está sendo baixado. Aguarde um momento' });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Histórico de Versões</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Todas as versões anteriores do PPC são preservadas para consulta e auditoria.
      </p>
      
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Versão</TableHead>
              <TableHead className="font-semibold">Carga Horária</TableHead>
              <TableHead className="font-semibold">Regra de Alocação</TableHead>
              <TableHead className="font-semibold">Autor da Alteração</TableHead>
              <TableHead className="font-semibold">Data de Vigência</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {versions.map((version) => (
              <TableRow key={version.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{version.version}</TableCell>
                <TableCell>{version.totalHours}h</TableCell>
                <TableCell>
                  {version.allocationRule === 'flexible' ? '100% Flexível' : 'Modular'}
                </TableCell>
                <TableCell>{version.author}</TableCell>
                <TableCell>{formatDate(version.effectiveDate)}</TableCell>
                <TableCell>
                  {version.isActive ? (
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      Vigente
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-muted text-muted-foreground">
                      Histórico
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewVersion(version)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {version.documentUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDownloadPPC}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
