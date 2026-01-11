import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { students, solicitations } from '@/data/mockData';
import { useAlerts } from '@/hooks/useAlerts';

export default function StudentHistory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addAlert } = useAlerts();

  const student = students.find(s => s.id === id);
  const studentSolicitations = solicitations.filter(s => s.studentId === id);

  if (!student) {
    return (
      <AppLayout breadcrumb={['Início', 'Gerenciar Alunos', 'Histórico']}>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Aluno não encontrado</p>
            <Button onClick={() => navigate('/coordinator/students')} className="mt-4">
              Voltar
            </Button>
          </CardContent>
        </Card>
      </AppLayout>
    );
  }

  const handleExportReport = () => {
    addAlert("success", "Relatório Exportado", `Relatório de ${student.name} foi gerado e está sendo baixado.`);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Aprovado') return <Badge className="bg-success/10 text-success border-0">Aprovado</Badge>;
    if (status === 'Em Análise') return <Badge className="bg-info/10 text-info border-0">Em Análise</Badge>;
    if (status === 'Pendente') return <Badge className="bg-warning/10 text-warning border-0">Pendente</Badge>;
    if (status === 'Rejeitado') return <Badge className="bg-destructive/10 text-destructive border-0">Rejeitado</Badge>;
    return <Badge className="bg-slate-100 text-slate-900 border-0">{status}</Badge>;
  };

  return (
    <AppLayout breadcrumb={['Início', 'Gerenciar Alunos', 'Histórico']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate('/coordinator/students')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Histórico do Aluno</h1>
            <p className="text-muted-foreground">{student.name} • Matrícula: {student.matricula}</p>
          </div>
        </div>

        {/* Informações do Aluno */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Informações do Aluno</h2>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nome</p>
                <p className="font-semibold">{student.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Matrícula</p>
                <p className="font-semibold">{student.matricula}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="font-semibold">{student.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Progresso</p>
                <p className="font-bold text-primary text-lg">{student.progress}%</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Horas Aprovadas</p>
                <p className="font-bold text-success text-lg">{student.approvedHours}h</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Horas Pendentes</p>
                <p className="font-bold text-warning text-lg">{student.pendingHours}h</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Necessário</p>
                <p className="font-bold text-slate-900 text-lg">{student.totalRequired}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Atividades */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Histórico de Atividades</h2>
              <Button onClick={handleExportReport} className="gap-2">
                <Download className="w-4 h-4" />
                Exportar Relatório Individual
              </Button>
            </div>

            {studentSolicitations.length > 0 ? (
              <div className="space-y-4">
                {studentSolicitations.map((solicitation) => (
                  <div key={solicitation.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{solicitation.activity}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{solicitation.institution}</p>
                      </div>
                      {getStatusBadge(solicitation.status)}
                    </div>
                    
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Tipo</p>
                        <p className="font-medium">{solicitation.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Horas</p>
                        <p className="font-medium">{solicitation.hours}h</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Enviado em</p>
                        <p className="font-medium">{solicitation.submitDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Período</p>
                        <p className="font-medium text-xs">
                          {solicitation.startDate && solicitation.endDate
                            ? `${new Date(solicitation.startDate).toLocaleDateString('pt-BR')} a ${new Date(solicitation.endDate).toLocaleDateString('pt-BR')}`
                            : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Ano</p>
                        <p className="font-medium">{solicitation.year || '—'}</p>
                      </div>
                    </div>

                    {solicitation.description && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-muted-foreground mb-1">Descrição:</p>
                        <p className="text-sm text-slate-700">{solicitation.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhuma atividade registrada para este aluno</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resumo por Tipo */}
        {studentSolicitations.length > 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Resumo por Tipo de Atividade</h2>
              <div className="grid grid-cols-3 gap-4">
                {Array.from(new Set(studentSolicitations.map(s => s.type))).map((type) => {
                  const typeActivities = studentSolicitations.filter(s => s.type === type);
                  const typeHours = typeActivities.reduce((acc, s) => acc + s.hours, 0);
                  return (
                    <div key={type} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-sm text-muted-foreground mb-2">{type}</p>
                      <p className="font-bold text-lg text-primary">{typeHours}h</p>
                      <p className="text-xs text-slate-600 mt-1">{typeActivities.length} atividade{typeActivities.length !== 1 ? 's' : ''}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
