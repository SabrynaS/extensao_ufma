import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { coordinatorStats } from '@/data/mockData';

export default function CoordinatorReports() {
  return (
    <AppLayout breadcrumb={['Início', 'Painel Geral']}>
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
              <h1 className="text-3xl font-bold mb-2">Painel Geral</h1>
              <p className="text-blue-100">Acompanhe o desempenho completo dos alunos e estatísticas gerais</p>
            </div>
          </div>
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

        {/* Dashboard de Oportunidades por Tipo */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-6">Distribuição de Atividades por Tipo</h2>
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
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
