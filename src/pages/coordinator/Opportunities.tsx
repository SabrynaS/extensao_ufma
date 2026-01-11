import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, Users, Clock, Eye, Edit, Trash2, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOpportunities } from "@/contexts/OpportunitiesContext";
import { useAlerts } from "@/hooks/useAlerts";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CoordinatorOpportunities() {
  const navigate = useNavigate();
  const { coordinatorOpportunities, deleteCoordinatorOpportunity } = useOpportunities();
  const { addAlert } = useAlerts();
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  const getOpportunityStatus = (opportunity: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = opportunity.startDate ? new Date(opportunity.startDate) : null;
    const endDate = opportunity.endDate ? new Date(opportunity.endDate) : null;

    if (!startDate || !endDate) return "Ativo";

    // Se a data atual é antes da data de início: inscrições ainda não abriram
    if (today < startDate) return "Ativo";

    // Se a data atual está entre início e fim: em andamento
    if (today >= startDate && today <= endDate) return "Em andamento";

    // Se a data atual é depois do fim: encerrado
    if (today > endDate) return "Encerrado";

    return "Ativo";
  };

  const getStatusBadgeColor = (status: string) => {
    if (status === "Ativo")
      return "bg-success/10 text-success border-0";
    if (status === "Em andamento")
      return "bg-yellow-100 text-yellow-800 border-0";
    if (status === "Encerrado")
      return "bg-muted text-muted-foreground border-0";
    return "bg-warning/10 text-warning border-0";
  };

  // Aplicar filtros aos dados
  const filteredOpportunities = coordinatorOpportunities.filter((o) => {
    // Filtro por busca (nome/título)
    const matchesSearch = o.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro por status
    const status = getOpportunityStatus(o);
    const matchesStatus = statusFilter === "all" || status === statusFilter;

    // Filtro por período (datas)
    let matchesDateRange = true;
    if (startDateFilter || endDateFilter) {
      const oppStart = o.startDate ? new Date(o.startDate) : null;
      const oppEnd = o.endDate ? new Date(o.endDate) : null;
      const filterStart = startDateFilter ? new Date(startDateFilter) : null;
      const filterEnd = endDateFilter ? new Date(endDateFilter) : null;

      if (filterStart && oppStart && filterEnd && oppEnd) {
        // Verifica se há sobreposição entre períodos
        matchesDateRange = !(oppEnd < filterStart || oppStart > filterEnd);
      } else if (filterStart && oppStart) {
        matchesDateRange = oppStart >= filterStart;
      } else if (filterEnd && oppEnd) {
        matchesDateRange = oppEnd <= filterEnd;
      }
    }

    return matchesSearch && matchesStatus && matchesDateRange;
  });
  
  const activeCount = filteredOpportunities.filter(
    (o) => getOpportunityStatus(o) === "Ativo" || getOpportunityStatus(o) === "Em andamento"
  ).length;
  const totalEnrollments = filteredOpportunities.reduce(
    (a, o) => a + o.filledSlots,
    0
  );

  const handleCreateOpportunity = () => {
    navigate("/coordinator/opportunities/create");
  };

  const handleDeleteOpportunity = (id: string) => {
    deleteCoordinatorOpportunity(id);
    addAlert("success", "Oportunidade excluída", "A oportunidade foi removida com sucesso.");
  };

  const handleViewDetails = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
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
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Oportunidades Ativas
                  </span>
                </div>
                <p className="text-3xl font-bold text-success">{activeCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Ativas no sistema</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Total de Inscrições
                  </span>
                </div>
                <p className="text-3xl font-bold text-blue-600">{totalEnrollments}</p>
                <p className="text-xs text-muted-foreground mt-1">Alunos inscritos</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Total Criadas
                  </span>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {coordinatorOpportunities.length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Oportunidades no total</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Oportunidades</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Gerencie as oportunidades publicadas e acompanhe as inscrições
              </p>

              {/* Filtros */}
              <div className="flex gap-3 flex-wrap items-end">
                {/* Busca por palavra-chave */}
                <div className="flex-1 min-w-[250px]">
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    Buscar por nome
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar oportunidade..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filtro de Status */}
                <div className="min-w-[180px]">
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    Status
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Em andamento">Em andamento</SelectItem>
                      <SelectItem value="Encerrado">Encerrado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtro de Data Inicial */}
                <div className="min-w-[150px]">
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    De
                  </label>
                  <Input
                    type="date"
                    value={startDateFilter}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                  />
                </div>

                {/* Filtro de Data Final */}
                <div className="min-w-[150px]">
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    Até
                  </label>
                  <Input
                    type="date"
                    value={endDateFilter}
                    onChange={(e) => setEndDateFilter(e.target.value)}
                  />
                </div>

                {/* Botão para limpar filtros */}
                {(searchQuery || statusFilter !== "all" || startDateFilter || endDateFilter) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setStartDateFilter("");
                      setEndDateFilter("");
                    }}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Limpar filtros
                  </Button>
                )}
              </div>

              {/* Contador de resultados */}
              {(searchQuery || statusFilter !== "all" || startDateFilter || endDateFilter) && (
                <p className="text-xs text-muted-foreground mt-3">
                  {filteredOpportunities.length} de {coordinatorOpportunities.length} oportunidades encontradas
                </p>
              )}
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
                  {filteredOpportunities.map((o) => (
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
                        {o.startDate && o.endDate
                          ? `${new Date(o.startDate).toLocaleDateString('pt-BR')} a ${new Date(o.endDate).toLocaleDateString('pt-BR')}`
                          : o.period || '-'}
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
                        <Badge className={getStatusBadgeColor(getOpportunityStatus(o))}>
                          {getOpportunityStatus(o)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleViewDetails(o)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              navigate(`/coordinator/opportunities/edit/${o.id}`);
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

      {/* Modal de Detalhes */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Oportunidade</DialogTitle>
          </DialogHeader>

          {selectedOpportunity && (
            <div className="space-y-6">
              {/* Título e Status */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">{selectedOpportunity.title}</h3>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">{selectedOpportunity.type}</Badge>
                  <Badge className={getStatusBadgeColor(getOpportunityStatus(selectedOpportunity))}>
                    {getOpportunityStatus(selectedOpportunity)}
                  </Badge>
                  <Badge
                    className={
                      selectedOpportunity.validation === "Automática"
                        ? "bg-success/10 text-success border-0"
                        : "bg-warning/10 text-warning border-0"
                    }
                  >
                    {selectedOpportunity.validation}
                  </Badge>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Descrição</h4>
                <p className="text-sm">{selectedOpportunity.description}</p>
              </div>

              {/* Informações Principais */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Carga Horária</h4>
                  <p className="text-sm font-medium">{selectedOpportunity.hours}h</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Vagas</h4>
                  <p className="text-sm font-medium">
                    {selectedOpportunity.filledSlots} / {selectedOpportunity.slots}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Período de Inscrição</h4>
                  <p className="text-sm font-medium">
                    {selectedOpportunity.startDate && selectedOpportunity.endDate
                      ? `${new Date(selectedOpportunity.startDate).toLocaleDateString('pt-BR')} a ${new Date(selectedOpportunity.endDate).toLocaleDateString('pt-BR')}`
                      : selectedOpportunity.period || '-'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Criada em</h4>
                  <p className="text-sm font-medium">
                    {selectedOpportunity.createdAt
                      ? new Date(selectedOpportunity.createdAt).toLocaleDateString('pt-BR')
                      : '-'}
                  </p>
                </div>
              </div>

              {/* Responsáveis */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-3">Responsáveis</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Responsável</p>
                    <p className="text-sm font-medium">{selectedOpportunity.instructor || '-'}</p>
                  </div>
                  {selectedOpportunity.studentResponsible && (
                    <div>
                      <p className="text-xs text-muted-foreground">Aluno Responsável</p>
                      <p className="text-sm font-medium">{selectedOpportunity.studentResponsible}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Botão Fechar */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Fechar
                </Button>
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                    navigate(`/coordinator/opportunities/edit/${selectedOpportunity.id}`);
                  }}
                >
                  Editar Oportunidade
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
