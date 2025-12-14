import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Users, CheckCircle, TrendingUp, Clock, BarChart3, Download } from 'lucide-react';
import { coordinatorStats, reportData } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CoordinatorReports() {
  return (
    <AppLayout breadcrumb={['Início', 'Relatórios e Métricas']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Relatórios e Métricas</h1>
            <p className="text-muted-foreground">Análise completa do desempenho e estatísticas do curso (RF033, RF034, RF067)</p>
          </div>
          <Select defaultValue="2025.2">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="2025.2">2025.2</SelectItem>
              <SelectItem value="2025.1">2025.1</SelectItem>
              <SelectItem value="2024.2">2024.2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          <Card><CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total de Alunos</span>
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{coordinatorStats.totalStudents}</p>
            <p className="text-xs text-muted-foreground">Ativos no curso</p>
          </CardContent></Card>
          <Card className="border-success/20 bg-success/5"><CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Concluíram</span>
              <CheckCircle className="w-4 h-4 text-success" />
            </div>
            <p className="text-2xl font-bold text-success">{coordinatorStats.concluded}</p>
            <p className="text-xs text-muted-foreground">100% das horas</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progresso Médio</span>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{coordinatorStats.averageProgress}%</p>
            <p className="text-xs text-muted-foreground">De todas as turmas</p>
          </CardContent></Card>
          <Card className="border-warning/20 bg-warning/5"><CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Pendentes</span>
              <Clock className="w-4 h-4 text-warning" />
            </div>
            <p className="text-2xl font-bold text-warning">{coordinatorStats.pending}</p>
            <p className="text-xs text-muted-foreground">Aguardando análise</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Taxa Aprovação</span>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-success">{coordinatorStats.approvalRate}%</p>
            <p className="text-xs text-muted-foreground">Das solicitações</p>
          </CardContent></Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="conclusion">
              <TabsList><TabsTrigger value="conclusion">Relatório de Conclusão</TabsTrigger><TabsTrigger value="distribution">Distribuição por Tipo</TabsTrigger><TabsTrigger value="evolution">Evolução Semestral</TabsTrigger><TabsTrigger value="rankings">Rankings</TabsTrigger></TabsList>
              <TabsContent value="conclusion" className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div><h3 className="font-semibold">Relatório Formal de Conclusão de Carga Horária (RF034)</h3><p className="text-sm text-muted-foreground">Alunos que completaram a carga horária mínima de extensão no semestre 2025.2</p></div>
                  <div className="flex gap-2"><Button variant="outline"><Download className="w-4 h-4 mr-2" />Exportar PDF</Button><Button variant="outline"><Download className="w-4 h-4 mr-2" />Excel</Button></div>
                </div>
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg mb-4"><p className="text-sm"><strong>Finalidade:</strong> Este relatório serve de base para o lançamento oficial da UCE (Unidade Curricular de Extensão) no sistema acadêmico.</p></div>
                <table className="w-full"><thead><tr className="border-b"><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome do Aluno</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Matrícula</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Horas Exigidas</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Horas Cumpridas</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Semestre</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th></tr></thead><tbody>{reportData.map((row, i) => (<tr key={i} className="border-b"><td className="py-3 px-4">{row.name}</td><td className="py-3 px-4 text-muted-foreground">{row.matricula}</td><td className="py-3 px-4">{row.requiredHours}h</td><td className="py-3 px-4 font-medium text-success">{row.completedHours}h</td><td className="py-3 px-4">{row.semester}</td><td className="py-3 px-4"><Badge className="bg-success/10 text-success border-success/20">{row.status}</Badge></td></tr>))}</tbody></table>
                <div className="mt-6 p-4 bg-muted rounded-lg"><h4 className="font-medium mb-2">Resumo do Relatório:</h4><ul className="text-sm text-muted-foreground space-y-1"><li>• Total de alunos aptos para lançamento da UCE: 4</li><li>• Semestre de referência: 2025.2</li><li>• Data de emissão: 13/12/2025</li><li>• Responsável: Prof. Dr. Roberto Lima</li></ul></div>
              </TabsContent>
              <TabsContent value="distribution"><div className="py-12 text-center text-muted-foreground">Gráfico de distribuição por tipo de atividade</div></TabsContent>
              <TabsContent value="evolution"><div className="py-12 text-center text-muted-foreground">Gráfico de evolução semestral</div></TabsContent>
              <TabsContent value="rankings"><div className="py-12 text-center text-muted-foreground">Rankings de alunos e atividades</div></TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
