import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Users, Clock, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOpportunities } from "@/contexts/OpportunitiesContext";
import { useAlerts } from "@/hooks/useAlerts";

export default function CoordinatorOpportunities() {
  const navigate = useNavigate();
  const { coordinatorOpportunities, deleteCoordinatorOpportunity } = useOpportunities();
  const { addAlert } = useAlerts();
  
  const activeCount = coordinatorOpportunities.filter(
    (o) => o.status === "Ativo"
  ).length;
  const totalEnrollments = coordinatorOpportunities.reduce(
    (a, o) => a + o.filledSlots,
    0
  );

  const handleCreateOpportunity = () => {
    navigate("/events/create");
  };

  const handleDeleteOpportunity = (id: string) => {
    deleteCoordinatorOpportunity(id);
    addAlert("success", "Oportunidade excluída", "A oportunidade foi removida com sucesso.");
  };

  return (
    <AppLayout breadcrumb={["Início", "Gestão de Oportunidades"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Gestão de Oportunidades
            </h1>
            <p className="text-muted-foreground">
              Crie e gerencie oportunidades de extensão para os alunos do curso
            </p>
          </div>
          <Button onClick={handleCreateOpportunity}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Nova Oportunidade
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="border-success/20 bg-success/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Oportunidades Ativas
                </span>
                <Calendar className="w-4 h-4 text-success" />
              </div>
              <p className="text-2xl font-bold text-success">{activeCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Total de Inscrições
                </span>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{totalEnrollments}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Total Criadas
                </span>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">
                {coordinatorOpportunities.length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="font-semibold">Minhas Oportunidades Criadas</h3>
              <p className="text-sm text-muted-foreground">
                Gerencie as oportunidades publicadas e acompanhe as inscrições
              </p>
            </div>
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
                      Período
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Validação
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
                  {coordinatorOpportunities.map((o) => (
                    <tr key={o.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{o.title}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{o.type}</Badge>
                      </td>
                      <td className="py-3 px-4">{o.hours}h</td>
                      <td className="py-3 px-4">
                        {o.status === "Ativo" ? (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {o.filledSlots} / {o.slots}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {o.period}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            o.validation === "Automática"
                              ? "bg-success/10 text-success border-0"
                              : "bg-warning/10 text-warning border-0"
                          }
                        >
                          {o.validation}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            o.status === "Ativo"
                              ? "bg-success/10 text-success border-0"
                              : "bg-muted text-muted-foreground border-0"
                          }
                        >
                          {o.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
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
                            onClick={() => {
                              console.log(
                                "Navegando para editar evento ID:",
                                o.id
                              );
                              navigate(`/events/edit/${o.id}`);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDeleteOpportunity(o.id)}
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
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
