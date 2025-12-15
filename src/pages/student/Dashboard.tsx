import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Search, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye
} from 'lucide-react';
import { studentProgress, solicitations, certificates } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NewSolicitationModal } from '@/components/student/NewSolicitationModal';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [showNewSolicitation, setShowNewSolicitation] = useState(false);
  
  const mySolicitations = solicitations.filter(s => s.studentId === '1').slice(0, 5);
  const progressPercentage = ((studentProgress.approved + studentProgress.pending) / studentProgress.required) * 100;
  const approvedPercentage = (studentProgress.approved / studentProgress.required) * 100;

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
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout breadcrumb={['Início', 'Painel']}>
      <div className="space-y-6">
        {/* Progress Card */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Progresso de Horas de Extensão</h2>
              <p className="text-sm text-muted-foreground">Baseado no {studentProgress.ppcVersion}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-primary">
                  {studentProgress.approved + studentProgress.pending}h
                </span>
                <span className="text-xl text-muted-foreground">/ {studentProgress.required}h</span>
                <span className="ml-auto text-sm text-muted-foreground">
                  {Math.round(progressPercentage)}% concluído
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div 
                    className="bg-success h-full transition-all" 
                    style={{ width: `${approvedPercentage}%` }}
                  />
                  <div 
                    className="bg-warning h-full transition-all" 
                    style={{ width: `${(studentProgress.pending / studentProgress.required) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                <div className="flex items-center gap-2 text-success mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Aprovadas</span>
                </div>
                <span className="text-2xl font-bold text-success">{studentProgress.approved}h</span>
              </div>
              <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                <div className="flex items-center gap-2 text-warning mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Em Análise</span>
                </div>
                <span className="text-2xl font-bold text-warning">{studentProgress.pending}h</span>
              </div>
              <div className="p-4 bg-muted rounded-lg border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Faltantes</span>
                </div>
                <span className="text-2xl font-bold text-foreground">
                  {studentProgress.required - studentProgress.approved - studentProgress.pending}h
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <Card 
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setShowNewSolicitation(true)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-1">Nova Solicitação</h3>
              <p className="text-sm text-muted-foreground">Enviar certificado externo</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => navigate('/events')}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">Buscar Eventos</h3>
              <p className="text-sm text-muted-foreground">Catálogo de oportunidades</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => navigate('/student/certificates')}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Download className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">Emitir Declaração</h3>
              <p className="text-sm text-muted-foreground">Baixar comprovante em PDF</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Solicitations */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Solicitações Recentes</h3>
              <p className="text-sm text-muted-foreground">Histórico de atividades submetidas</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Atividade</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Carga Horária</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Data Envio</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mySolicitations.map((solicitation) => (
                    <tr key={solicitation.id} className="border-b last:border-0">
                      <td className="py-3 px-4 text-sm">{solicitation.activity}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{solicitation.type}</td>
                      <td className="py-3 px-4 text-sm">{solicitation.hours}h</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{solicitation.submitDate}</td>
                      <td className="py-3 px-4">{getStatusBadge(solicitation.status)}</td>
                      <td className="py-3 px-4">
                        {solicitation.status === 'Aprovado' ? (
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download className="w-3 h-3" />
                            Certificado
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="w-3 h-3" />
                            Detalhes
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center">
              <Button variant="link" onClick={() => navigate('/student/requests')}>
                Ver todas as solicitações
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <NewSolicitationModal 
        open={showNewSolicitation} 
        onOpenChange={setShowNewSolicitation} 
      />
    </AppLayout>
  );
}
