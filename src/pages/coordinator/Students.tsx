import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Eye, FileDown } from 'lucide-react';
import { students } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAlerts } from '@/hooks/useAlerts';

export default function CoordinatorStudents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const { addAlert } = useAlerts();

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.matricula.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || s.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'Concluído') return <Badge className="bg-success/10 text-success border-0">Concluído</Badge>;
    if (status === 'Regular') return <Badge className="bg-success/10 text-success border-0">Regular</Badge>;
    if (status === 'Atenção') return <Badge className="bg-warning/10 text-warning border-0">Atenção</Badge>;
    return <Badge className="bg-destructive/10 text-destructive border-0">{status}</Badge>;
  };

  return (
    <AppLayout breadcrumb={['Início', 'Gerenciar Alunos']}>
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold text-primary">Discentes Matriculados</h1><p className="text-muted-foreground">Gerencie e acompanhe o progresso dos alunos matriculados no curso</p></div>
        <Card><CardContent className="p-6">
          <div className="mb-4"><h3 className="font-semibold">Lista de Discentes</h3><p className="text-sm text-muted-foreground">Visualize o progresso individual e acesse o histórico completo de cada aluno</p></div>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar por nome ou matrícula..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
            <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-48"><SelectValue placeholder="Todos os Status" /></SelectTrigger><SelectContent className="bg-popover"><SelectItem value="all">Todos os Status</SelectItem><SelectItem value="regular">Regular</SelectItem><SelectItem value="crítico">Crítico</SelectItem><SelectItem value="concluído">Concluído</SelectItem></SelectContent></Select>
            <Button variant="outline" onClick={() => addAlert("success", "Lista Exportada", "A lista de discentes foi gerada e está sendo baixada.")}><Download className="w-4 h-4 mr-2" />Exportar Lista</Button>
          </div>
          <table className="w-full"><thead><tr className="border-b"><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Matrícula</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Progresso</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th></tr></thead><tbody>
            {filtered.map(s => (<tr key={s.id} className="border-b hover:bg-muted/50"><td className="py-3 px-4 font-medium">{s.name}</td><td className="py-3 px-4 text-muted-foreground">{s.matricula}</td><td className="py-3 px-4"><div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">Progresso: <span className="text-primary font-bold">{s.progress}%</span></span>
                    <span className="text-muted-foreground">{s.approvedHours}h de {s.totalRequired}h</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" 
                      style={{ width: `${s.progress}%` }}
                    ></div>
                  </div>
                </div></td><td className="py-3 px-4">{getStatusBadge(s.status)}</td><td className="py-3 px-4 space-x-2"><Button variant="outline" size="sm" onClick={() => navigate(`/coordinator/students/${s.id}/history`)} className="gap-1"><Eye className="w-3 h-3" />Histórico</Button><Button variant="outline" size="sm" onClick={() => addAlert("success", "Relatório Exportado", `Relatório de ${s.name} foi gerado e está sendo baixado.`)} className="gap-1"><FileDown className="w-3 h-3" />Exportar</Button></td></tr>))}
          </tbody></table>
        </CardContent></Card>

        {/* Modal de Detalhes do Aluno */}
        <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Aluno</DialogTitle>
              <DialogDescription>Informações completas e histórico de atividades</DialogDescription>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6">
                {/* Informações Básicas */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-semibold mb-4">Informações Pessoais</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Nome</p>
                      <p className="font-semibold">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Matrícula</p>
                      <p className="font-semibold">{selectedStudent.matricula}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      {getStatusBadge(selectedStudent.status)}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Progresso Geral</p>
                      <p className="font-semibold text-lg">{selectedStudent.progress}%</p>
                    </div>
                  </div>
                </div>

                {/* Progresso Detalhado */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold mb-4">Progresso de Horas</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-700">Horas Aprovadas</span>
                        <span className="font-bold text-success">{selectedStudent.approvedHours}h</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-success rounded-full" 
                          style={{ width: `${(selectedStudent.approvedHours / selectedStudent.totalRequired) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    {selectedStudent.pendingHours > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-700">Horas Aguardando Validação</span>
                          <span className="font-bold text-warning">{selectedStudent.pendingHours}h</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full bg-warning rounded-full" 
                            style={{ width: `${(selectedStudent.pendingHours / selectedStudent.totalRequired) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <div className="pt-3 border-t">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-slate-900">Total Necessário</span>
                        <span className="text-slate-900">{selectedStudent.totalRequired}h</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {selectedStudent.approvedHours + selectedStudent.pendingHours >= selectedStudent.totalRequired
                          ? '✓ Meta atingida ou próxima de ser atingida'
                          : `Faltam ${selectedStudent.totalRequired - (selectedStudent.approvedHours + selectedStudent.pendingHours)}h`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => navigate(`/coordinator/students/${selectedStudent.id}/history`)}>Abrir Histórico Completo</Button>
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedStudent(null)}>Fechar</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
