import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { FaUsers, FaAward, FaTrendingUp, FaClock, FaChartBar, FaFire } from 'react-icons/fa';
import { coordinatorStats, reportData } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CoordinatorReports() {
  return (
    <AppLayout breadcrumb={['Início', 'Relatórios e Métricas']}>
      <div className="space-y-6">
        {/* Header com gradiente */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-8 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-white/80">Análise de Desempenho</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Relatórios e Métricas</h1>
              <p className="text-blue-100">Acompanhe o desempenho completo dos alunos e estatísticas gerais</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mb-4">
          <p className="text-30 text-slate-400 mr-2">Escolha o semestre:</p>
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
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-medium mb-1">TOTAL DE ALUNOS</p>
                <p className="text-3xl font-bold text-blue-600">{coordinatorStats.totalStudents}</p>
                <p className="text-xs text-slate-400 mt-1">Ativos no curso</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-medium mb-1">CONCLUÍRAM</p>
                <p className="text-3xl font-bold text-success">{coordinatorStats.concluded}</p>
                <p className="text-xs text-slate-400 mt-1">100% das horas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-medium mb-1">PROGRESSO MÉDIO</p>
                <p className="text-3xl font-bold text-purple-600">{coordinatorStats.averageProgress}%</p>
                <p className="text-xs text-slate-400 mt-1">De todas as turmas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-medium mb-1">PENDENTES</p>
                <p className="text-3xl font-bold text-orange-600">{coordinatorStats.pending}</p>
                <p className="text-xs text-slate-400 mt-1">Aguardando análise</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-medium mb-1">TAXA APROVAÇÃO</p>
                <p className="text-3xl font-bold text-emerald-600">{coordinatorStats.approvalRate}%</p>
                <p className="text-xs text-slate-400 mt-1">Das solicitações</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="conclusion">
              <TabsList><TabsTrigger value="conclusion">Relatório de Conclusão</TabsTrigger><TabsTrigger value="distribution">Distribuição por Tipo</TabsTrigger><TabsTrigger value="evolution">Evolução Semestral</TabsTrigger><TabsTrigger value="rankings">Rankings</TabsTrigger></TabsList>
              <TabsContent value="conclusion" className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div><p className="text-sm text-muted-foreground">Alunos que completaram a carga horária mínima de extensão no semestre 2025.2</p></div>
                  <div className="flex gap-2"><Button variant="outline"><Download className="w-4 h-4 mr-2" />Exportar PDF</Button><Button variant="outline"><Download className="w-4 h-4 mr-2" />Excel</Button></div>
                </div>
                <table className="w-full"><thead><tr className="border-b"><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome do Aluno</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Matrícula</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Horas Exigidas</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Horas Cumpridas</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Semestre</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th></tr></thead><tbody>{reportData.map((row, i) => (<tr key={i} className="border-b"><td className="py-3 px-4">{row.name}</td><td className="py-3 px-4 text-muted-foreground">{row.matricula}</td><td className="py-3 px-4">{row.requiredHours}h</td><td className="py-3 px-4 font-medium text-success">{row.completedHours}h</td><td className="py-3 px-4">{row.semester}</td><td className="py-3 px-4"><Badge className="bg-success/10 text-success border-success/20">{row.status}</Badge></td></tr>))}</tbody></table>
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
