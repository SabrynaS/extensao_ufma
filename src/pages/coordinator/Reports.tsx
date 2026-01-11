import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { FaUsers, FaAward, FaTrendingUp, FaClock, FaChartBar, FaFire } from 'react-icons/fa';
import { coordinatorStats, reportData } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAlerts } from '@/hooks/useAlerts';

export default function CoordinatorReports() {
  const { addAlert } = useAlerts();
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
              <TabsList><TabsTrigger value="conclusion">Relatório de Conclusão</TabsTrigger><TabsTrigger value="distribution">Distribuição por Tipo</TabsTrigger><TabsTrigger value="rankings">Rankings</TabsTrigger></TabsList>
              <TabsContent value="conclusion" className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div><p className="text-sm text-muted-foreground">Alunos que completaram a carga horária mínima de extensão no semestre 2025.2</p></div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => addAlert("success", "Relatório Gerado", "Relatório em PDF foi gerado e está sendo baixado.")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exportar PDF
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => addAlert("success", "Relatório Gerado", "Relatório em Excel foi gerado e está sendo baixado.")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Excel
                    </Button>
                  </div>
                </div>
                <table className="w-full"><thead><tr className="border-b"><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome do Aluno</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Matrícula</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Horas Exigidas</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Horas Cumpridas</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Semestre</th><th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th></tr></thead><tbody>{reportData.map((row, i) => (<tr key={i} className="border-b"><td className="py-3 px-4">{row.name}</td><td className="py-3 px-4 text-muted-foreground">{row.matricula}</td><td className="py-3 px-4">{row.requiredHours}h</td><td className="py-3 px-4 font-medium text-success">{row.completedHours}h</td><td className="py-3 px-4">{row.semester}</td><td className="py-3 px-4"><Badge className="bg-success/10 text-success border-success/20">{row.status}</Badge></td></tr>))}</tbody></table>
              </TabsContent>
              <TabsContent value="distribution">
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-6">Distribuição de Atividades por Tipo</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-700">Cursos</span>
                        <span className="text-sm text-slate-600">145 atividades</span>
                      </div>
                      <div className="h-8 bg-slate-200 rounded-lg overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-700">Workshops</span>
                        <span className="text-sm text-slate-600">120 atividades</span>
                      </div>
                      <div className="h-8 bg-slate-200 rounded-lg overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600" style={{ width: '29%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-700">Eventos</span>
                        <span className="text-sm text-slate-600">98 atividades</span>
                      </div>
                      <div className="h-8 bg-slate-200 rounded-lg overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-green-600" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-700">Projetos</span>
                        <span className="text-sm text-slate-600">87 atividades</span>
                      </div>
                      <div className="h-8 bg-slate-200 rounded-lg overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600" style={{ width: '21%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-700">Ligas Acadêmicas</span>
                        <span className="text-sm text-slate-600">60 atividades</span>
                      </div>
                      <div className="h-8 bg-slate-200 rounded-lg overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600" style={{ width: '14%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="rankings">
                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">🏆 Top Alunos (Horas Cumpridas)</h3>
                    <div className="space-y-3">
                      {[
                        { pos: 1, name: 'Ana Souza', matricula: '2021001234', hours: 320, progress: '107%' },
                        { pos: 2, name: 'Maria Santos', matricula: '2022015', hours: 310, progress: '103%' },
                        { pos: 3, name: 'Carlos Oliveira', matricula: '2021045', hours: 305, progress: '102%' },
                        { pos: 4, name: 'Julia Rocha', matricula: '2021078', hours: 295, progress: '98%' },
                        { pos: 5, name: 'Pedro Alves', matricula: '2022030', hours: 300, progress: '100%' },
                      ].map((student) => (
                        <div key={student.pos} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            student.pos === 1 ? 'bg-yellow-500' : student.pos === 2 ? 'bg-gray-400' : student.pos === 3 ? 'bg-orange-500' : 'bg-slate-400'
                          }`}>
                            {student.pos}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{student.name}</p>
                            <p className="text-xs text-slate-500">{student.matricula}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">{student.hours}h</p>
                            <p className="text-xs text-emerald-600 font-medium">{student.progress}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">📊 Atividades Mais Populares</h3>
                    <div className="space-y-3">
                      {[
                        { pos: 1, name: 'Curso de Python Avançado', count: 87, hours: 40 },
                        { pos: 2, name: 'Workshop de Design Thinking', count: 76, hours: 20 },
                        { pos: 3, name: 'Mostra de Inovação e Tecnologia', count: 64, hours: 16 },
                        { pos: 4, name: 'Projeto Comunidade Digital', count: 52, hours: 60 },
                        { pos: 5, name: 'Liga de Desenvolvimento Web', count: 45, hours: 45 },
                      ].map((activity) => (
                        <div key={activity.pos} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            activity.pos === 1 ? 'bg-yellow-500' : activity.pos === 2 ? 'bg-gray-400' : activity.pos === 3 ? 'bg-orange-500' : 'bg-slate-400'
                          }`}>
                            {activity.pos}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{activity.name}</p>
                            <p className="text-xs text-slate-500">{activity.hours}h por aluno</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">{activity.count}</p>
                            <p className="text-xs text-slate-500">inscrições</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
