import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Edit, Trash2, Clock, Users } from 'lucide-react';
import { opportunities } from '@/data/mockData';
import { useState } from 'react';

export default function TeacherOpportunities() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar oportunidades onde o docente é responsável ou que ele gerencia
  const teacherOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      'Ativo': 'bg-success/10 text-success border-0',
      'Aprovado': 'bg-blue-50 text-blue-700 border-0',
      'Inscrições Abertas': 'bg-blue-50 text-blue-700 border-0',
      'Vagas Esgotadas': 'bg-destructive/10 text-destructive border-0',
      'Encerrado': 'bg-muted text-muted-foreground border-0',
    };
    
    return (
      <Badge className={statusColors[status] || 'bg-muted text-muted-foreground border-0'}>
        {status}
      </Badge>
    );
  };

  return (
    <AppLayout breadcrumb={['Início', 'Minhas Oportunidades']}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minhas Oportunidades</h1>
          <p className="text-muted-foreground mt-2">Acompanhe as oportunidades que você está supervisionando</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Ativas</span>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">
                {opportunities.filter(o => o.status === 'Ativo' || o.status === 'Inscrições Abertas').length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total de Inscrições</span>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">
                {opportunities.reduce((sum, o) => sum + o.filledSlots, 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total de Oportunidades</span>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{opportunities.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar oportunidades..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Oportunidades Table */}
        <Card>
          <CardHeader>
            <CardTitle>Oportunidades Supervisionadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Título
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Tipo
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Carga Horária
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Inscrições
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teacherOpportunities.map((opp) => (
                    <tr key={opp.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">
                        <div>
                          <p className="font-medium">{opp.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{opp.description}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <Badge variant="outline">{opp.type}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{opp.hours}h</td>
                      <td className="py-3 px-4 text-sm">
                        {opp.status === 'Ativo' ? opp.filledSlots : '-'}/{opp.slots}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {getStatusBadge(opp.status)}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {teacherOpportunities.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Nenhuma oportunidade encontrada
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
