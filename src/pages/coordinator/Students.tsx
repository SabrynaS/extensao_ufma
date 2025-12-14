import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Eye, Users, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { students } from '@/data/mockData';
import { useState } from 'react';

export default function CoordinatorStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
        <div><h1 className="text-2xl font-bold text-primary">Discentes Matriculados - Ciência da Computação</h1><p className="text-muted-foreground">Gerencie e acompanhe o progresso dos alunos matriculados no curso</p></div>
        <div className="grid grid-cols-4 gap-4">
          <Card><CardContent className="p-4"><div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Total de Alunos</span><Users className="w-4 h-4 text-muted-foreground" /></div><p className="text-2xl font-bold">{students.length}</p></CardContent></Card>
          <Card className="border-success/20 bg-success/5"><CardContent className="p-4"><div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Concluíram</span><CheckCircle className="w-4 h-4 text-success" /></div><p className="text-2xl font-bold text-success">{students.filter(s => s.status === 'Concluído').length}</p></CardContent></Card>
          <Card className="border-destructive/20 bg-destructive/5"><CardContent className="p-4"><div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Em Risco</span><AlertTriangle className="w-4 h-4 text-destructive" /></div><p className="text-2xl font-bold text-destructive">{students.filter(s => s.status.includes('Crítico')).length}</p></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Progresso Médio</span><TrendingUp className="w-4 h-4 text-muted-foreground" /></div><p className="text-2xl font-bold">{Math.round(students.reduce((a, s) => a + s.progress, 0) / students.length)}%</p></CardContent></Card>
        </div>
        <Card><CardContent className="p-6">
          <div className="mb-4"><h3 className="font-semibold">Lista de Discentes</h3><p className="text-sm text-muted-foreground">Visualize o progresso individual e acesse o histórico completo de cada aluno</p></div>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar por nome ou matrícula..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
            <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-48"><SelectValue placeholder="Todos os Status" /></SelectTrigger><SelectContent className="bg-popover"><SelectItem value="all">Todos os Status</SelectItem><SelectItem value="regular">Regular</SelectItem><SelectItem value="atenção">Atenção</SelectItem><SelectItem value="crítico">Crítico</SelectItem><SelectItem value="concluído">Concluído</SelectItem></SelectContent></Select>
            <Button variant="outline"><Download className="w-4 h-4 mr-2" />Exportar Lista</Button>
          </div>
          <table className="w-full"><thead><tr className="border-b"><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Matrícula</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Progresso</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th></tr></thead><tbody>
            {filtered.map(s => (<tr key={s.id} className="border-b hover:bg-muted/50"><td className="py-3 px-4 font-medium">{s.name}</td><td className="py-3 px-4 text-muted-foreground">{s.matricula}</td><td className="py-3 px-4 w-64"><div className="flex items-center gap-3"><div className="flex-1"><div className="flex justify-between text-xs mb-1"><span className="text-success font-medium">{s.approvedHours}h</span>{s.pendingHours > 0 && <span className="text-warning">+ {s.pendingHours}h</span>}<span className="text-muted-foreground">/ {s.totalRequired}h</span><span>{s.progress}%</span></div><Progress value={s.progress} className="h-2" /></div></div></td><td className="py-3 px-4">{getStatusBadge(s.status)}</td><td className="py-3 px-4"><Button variant="outline" size="sm"><Eye className="w-3 h-3 mr-1" />Ver Detalhes</Button></td></tr>))}
          </tbody></table>
        </CardContent></Card>
      </div>
    </AppLayout>
  );
}
