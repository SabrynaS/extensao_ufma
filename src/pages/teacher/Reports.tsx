import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react';
import { mockGroups, opportunities, reportData } from '@/data/mockData';
import { useAlerts } from '@/hooks/useAlerts';

export default function TeacherReports() {
  const { addAlert } = useAlerts();
  // Calcular estatísticas dos grupos
  const activeGroups = mockGroups.filter(g => g.status === 'active').length;
  const inactiveGroups = mockGroups.filter(g => g.status === 'inactive').length;
  const totalMembers = mockGroups.reduce((sum, g) => sum + g.members.length, 0);

  // Calcular estatísticas de oportunidades
  const totalOpportunities = opportunities.length;
  const activeOpportunities = opportunities.filter(o => o.status === 'Ativo' || o.status === 'Inscrições Abertas').length;
  const totalEnrollments = opportunities.reduce((sum, o) => sum + o.filledSlots, 0);
  const totalSlots = opportunities.reduce((sum, o) => sum + o.slots, 0);
  const enrollmentRate = totalSlots > 0 ? Math.round((totalEnrollments / totalSlots) * 100) : 0;

  // Calcular por tipo
  const opportunitiesByType = opportunities.reduce((acc, opp) => {
    const existing = acc.find(item => item.type === opp.type);
    if (existing) {
      existing.count += 1;
      existing.enrollments += opp.filledSlots;
    } else {
      acc.push({
        type: opp.type,
        count: 1,
        enrollments: opp.filledSlots,
      });
    }
    return acc;
  }, [] as Array<{ type: string; count: number; enrollments: number }>);

  // Calcular carga horária total
  const totalHours = opportunities.reduce((sum, o) => sum + o.hours * o.filledSlots, 0);

  return (
    <AppLayout breadcrumb={['Início', 'Relatórios']}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground mt-2">Acompanhe os dados dos seus grupos e oportunidades</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Grupos Ativos</span>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{activeGroups}</p>
              <p className="text-xs text-muted-foreground mt-1">{inactiveGroups} inativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total de Membros</span>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{totalMembers}</p>
              <p className="text-xs text-muted-foreground mt-1">em todos os grupos</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Oportunidades Ativas</span>
                <BookOpen className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{activeOpportunities}</p>
              <p className="text-xs text-muted-foreground mt-1">de {totalOpportunities} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Taxa de Ocupação</span>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{enrollmentRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">{totalEnrollments}/{totalSlots} vagas</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* Oportunidades por Tipo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Oportunidades por Tipo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunitiesByType.length > 0 ? (
                  opportunitiesByType.map((item) => (
                    <div key={item.type} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.type}</p>
                        <p className="text-xs text-muted-foreground">{item.enrollments} inscrições</p>
                      </div>
                      <Badge variant="outline">{item.count}</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhuma oportunidade disponível</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Carga Horária */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Carga Horária Oferecida
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200/50">
                  <p className="text-sm text-muted-foreground mb-1">Total em Oferecimento</p>
                  <p className="text-3xl font-bold text-blue-600">{totalHours}h</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {opportunities.reduce((sum, o) => sum + o.hours, 0)}h de carga distribuída
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-1">Média por oportunidade</p>
                    <p className="font-semibold">
                      {totalOpportunities > 0 ? Math.round(opportunities.reduce((sum, o) => sum + o.hours, 0) / totalOpportunities) : 0}h
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grupos Detalhados */}
        <Card>
          <CardHeader>
            <CardTitle>Grupos Supervisionados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockGroups.map((group) => (
                <div key={group.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                    <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                      {group.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                    <span>{group.members.length} membros</span>
                    <span>Tipo: {group.type}</span>
                    <span>Criado em: {group.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Oportunidades Detalhadas */}
        <Card>
          <CardHeader>
            <CardTitle>Oportunidades Supervisionadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-medium">Título</th>
                    <th className="text-left py-2 px-3 font-medium">Tipo</th>
                    <th className="text-left py-2 px-3 font-medium">Horas</th>
                    <th className="text-left py-2 px-3 font-medium">Inscrições</th>
                    <th className="text-left py-2 px-3 font-medium">Taxa Ocupação</th>
                    <th className="text-left py-2 px-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((opp) => {
                    const occupationRate = opp.slots > 0 ? Math.round((opp.filledSlots / opp.slots) * 100) : 0;
                    return (
                      <tr key={opp.id} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-3 font-medium text-xs line-clamp-2">{opp.title}</td>
                        <td className="py-2 px-3">
                          <Badge variant="outline" className="text-xs">{opp.type}</Badge>
                        </td>
                        <td className="py-2 px-3">{opp.hours}h</td>
                        <td className="py-2 px-3">{opp.filledSlots}/{opp.slots}</td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500"
                                style={{ width: `${occupationRate}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{occupationRate}%</span>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <Badge 
                            className={
                              opp.status === 'Ativo' || opp.status === 'Inscrições Abertas'
                                ? 'bg-green-100 text-green-800 border-0'
                                : opp.status === 'Encerrado'
                                ? 'bg-gray-100 text-gray-800 border-0'
                                : 'bg-blue-100 text-blue-800 border-0'
                            }
                          >
                            {opp.status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Relatório Detalhado de Alunos - Seção de Docente */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alunos que Completaram a Carga Horária</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addAlert("success", "Relatório Gerado", "Relatório em PDF foi gerado e está sendo baixado.")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addAlert("success", "Relatório Gerado", "Relatório em Excel foi gerado e está sendo baixado.")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Excel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Alunos que completaram a carga horária mínima de extensão no semestre 2025.2</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome do Aluno</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Matrícula</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Horas Exigidas</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Horas Cumpridas</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Semestre</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-3 px-4">{row.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.matricula}</td>
                      <td className="py-3 px-4">{row.requiredHours}h</td>
                      <td className="py-3 px-4 font-medium text-success">{row.completedHours}h</td>
                      <td className="py-3 px-4">{row.semester}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-success/10 text-success border-success/20">{row.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Top Alunos e Atividades */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>🏆 Top Alunos (Horas Cumpridas)</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Atividades Mais Populares</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
