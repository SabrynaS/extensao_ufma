import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FaUsers, FaBook, FaExclamationCircle, FaCheckCircle, FaFire } from 'react-icons/fa';
import { mockGroups } from '@/data/mockData';

export default function TeacherDashboard() {
  const activeGroups = mockGroups.filter(g => g.status === 'active').length;
  const totalMembers = mockGroups.reduce((sum, g) => sum + g.members.length, 0);

  return (
    <AppLayout breadcrumb={['Início', 'Painel']}>
      <div className="space-y-6">
        {/* Header com gradiente */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 p-8 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-white/80">Gestão de Grupos</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Painel do Docente</h1>
              <p className="text-indigo-100">Gerencie seus grupos acadêmicos e acompanhe as atividades</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-medium mb-1">GRUPOS ATIVOS</p>
                <p className="text-3xl font-bold text-blue-600">{activeGroups}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-medium mb-1">TOTAL DE MEMBROS</p>
                <p className="text-3xl font-bold text-green-600">{totalMembers}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-medium mb-1">TOTAL DE GRUPOS</p>
                <p className="text-3xl font-bold text-purple-600">{mockGroups.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-medium mb-1">INATIVOS</p>
                <p className="text-3xl font-bold text-orange-600">{mockGroups.filter(g => g.status === 'inactive').length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Groups Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
            <CardTitle className="text-xl">Seus Grupos Acadêmicos</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {mockGroups.map((group) => (
                <div key={group.id} className="flex items-start justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{group.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">{group.type}</Badge>
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
