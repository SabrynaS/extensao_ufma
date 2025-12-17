import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react';
import { mockGroups, opportunities } from '@/data/mockData';

export default function TeacherReports() {
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
      </div>
    </AppLayout>
  );
}
