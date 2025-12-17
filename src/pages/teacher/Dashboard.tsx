import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { mockGroups } from '@/data/mockData';

export default function TeacherDashboard() {
  const activeGroups = mockGroups.filter(g => g.status === 'active').length;
  const totalMembers = mockGroups.reduce((sum, g) => sum + g.members.length, 0);

  return (
    <AppLayout breadcrumb={['Início', 'Painel']}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel do Docente</h1>
          <p className="text-muted-foreground mt-2">Gerencie seus grupos acadêmicos e acompanhe as atividades</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Grupos Ativos</span>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{activeGroups}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total de Membros</span>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{totalMembers}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total de Grupos</span>
                <BookOpen className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{mockGroups.length}</p>
            </CardContent>
          </Card>

          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Inativos</span>
                <AlertCircle className="w-4 h-4 text-warning" />
              </div>
              <p className="text-2xl font-bold text-warning">{mockGroups.filter(g => g.status === 'inactive').length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Groups Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Seus Grupos Acadêmicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockGroups.map((group) => (
                <div key={group.id} className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{group.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{group.type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {group.members.length} membro{group.members.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {group.status === 'active' ? (
                      <Badge className="bg-success/10 text-success border-0">Ativo</Badge>
                    ) : (
                      <Badge className="bg-muted text-muted-foreground border-0">Inativo</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
