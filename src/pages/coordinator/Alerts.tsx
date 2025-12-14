import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AlertTriangle, Bell, TrendingDown, Send, Eye } from 'lucide-react';
import { alerts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function CoordinatorAlerts() {
  const { toast } = useToast();
  const criticalAlerts = alerts.filter(a => a.type === 'critical');

  return (
    <AppLayout breadcrumb={['Início', 'Central de Alertas']}>
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold text-primary">Central de Alertas e Lembretes</h1><p className="text-muted-foreground">Monitore atrasos, prazos e envie lembretes automáticos (RF057, RF068)</p></div>
        <Tabs defaultValue="critical"><TabsList><TabsTrigger value="critical"><AlertTriangle className="w-4 h-4 mr-1" />Alertas Críticos ({criticalAlerts.length})</TabsTrigger><TabsTrigger value="reminders"><Bell className="w-4 h-4 mr-1" />Lembretes Automáticos</TabsTrigger><TabsTrigger value="below"><TrendingDown className="w-4 h-4 mr-1" />Alunos Abaixo da Meta</TabsTrigger></TabsList>
          <TabsContent value="critical" className="mt-6 space-y-4">
            {alerts.map(alert => (<Card key={alert.id} className="border-destructive/30 bg-destructive/5"><CardContent className="p-6">
              <div className="flex items-start justify-between mb-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-destructive" /></div><div><h3 className="font-semibold text-destructive">{alert.title}</h3><p className="text-sm text-muted-foreground">{alert.description}</p></div></div><Badge className="bg-destructive text-destructive-foreground">{alert.daysLate ? `${alert.daysLate} dias de atraso` : `${alert.hoursRemaining}h restantes`}</Badge></div>
              <div className="grid grid-cols-2 gap-4 mb-4"><div className="p-3 bg-card rounded-lg"><p className="text-xs text-muted-foreground">Aluno</p><p className="font-medium">{alert.studentName}</p></div><div className="p-3 bg-card rounded-lg"><p className="text-xs text-muted-foreground">Responsável</p><p className="font-medium">{alert.responsible}</p></div><div className="p-3 bg-card rounded-lg"><p className="text-xs text-muted-foreground">Data de Envio</p><p className="font-medium">{alert.submitDate}</p></div><div className="p-3 bg-card rounded-lg"><p className="text-xs text-muted-foreground">Prazo Limite</p><p className="font-medium">{alert.deadline}</p></div></div>
              <div className="flex gap-2"><Button size="sm" variant="destructive" onClick={() => toast({ title: 'Cobrança enviada!', description: 'Notificação enviada para a comissão.' })}><Send className="w-3 h-3 mr-1" />Cobrar Comissão</Button><Button size="sm" variant="outline" onClick={() => toast({ title: 'Notificação enviada!', description: 'Aluno foi notificado.' })}><Send className="w-3 h-3 mr-1" />Notificar Aluno</Button><Button size="sm" variant="outline"><Eye className="w-3 h-3 mr-1" />Ver Solicitação</Button></div>
            </CardContent></Card>))}
          </TabsContent>
          <TabsContent value="reminders"><div className="py-12 text-center text-muted-foreground">Configuração de lembretes automáticos</div></TabsContent>
          <TabsContent value="below"><div className="py-12 text-center text-muted-foreground">Lista de alunos abaixo da meta de progresso</div></TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
