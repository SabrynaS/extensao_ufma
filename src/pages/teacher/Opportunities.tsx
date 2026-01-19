import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Edit, Trash2, Plus, X, Users, Award, Check } from "lucide-react";
import { opportunities, Opportunity, Student } from "@/data/mockData";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TeacherOpportunities() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Certificate Modal State
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [certificateOpportunity, setCertificateOpportunity] = useState<Opportunity | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const getOpportunityStatus = (opportunity: Opportunity) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = opportunity.startDate
      ? new Date(opportunity.startDate)
      : null;
    const endDate = opportunity.endDate ? new Date(opportunity.endDate) : null;

    if (!startDate || !endDate) return "Ativo";

    if (today < startDate) return "Ativo";
    if (today >= startDate && today <= endDate) return "Em andamento";
    if (today > endDate) return "Encerrado";

    return "Ativo";
  };

  const getStatusBadgeColor = (status: string) => {
    if (status === "Ativo") return "bg-success/10 text-success border-0";
    if (status === "Em andamento")
      return "bg-warning/10 text-warning border-0";
    if (status === "Encerrado")
      return "bg-muted text-muted-foreground border-0";
    return "bg-warning/10 text-warning border-0";
  };

  const filteredOpportunities = opportunities.filter((o) => {
    const matchesSearch = o.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const status = getOpportunityStatus(o);
    const matchesStatus = statusFilter === "all" || status === statusFilter;

    let matchesDateRange = true;
    if (startDateFilter || endDateFilter) {
      const oppStart = o.startDate ? new Date(o.startDate) : null;
      const oppEnd = o.endDate ? new Date(o.endDate) : null;
      const filterStart = startDateFilter ? new Date(startDateFilter) : null;
      const filterEnd = endDateFilter ? new Date(endDateFilter) : null;

      if (filterStart && oppStart && filterEnd && oppEnd) {
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
    (o) =>
      getOpportunityStatus(o) === "Ativo" ||
      getOpportunityStatus(o) === "Em andamento"
  ).length;
  const totalEnrollments = filteredOpportunities.reduce(
    (a, o) => a + o.filledSlots,
    0
  );

  const handleViewDetails = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const handleOpenCertificateModal = (opportunity: Opportunity) => {
    setCertificateOpportunity(opportunity);
    setSelectedStudents([]);
    setIsCertificateModalOpen(true);
  };

  const handleStudentSelection = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents((prev) => [...prev, studentId]);
    } else {
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId));
    }
  };

  const handleSelectAllStudents = () => {
    if (certificateOpportunity) {
      if (selectedStudents.length === certificateOpportunity.enrolledStudents.length) {
        setSelectedStudents([]);
      } else {
        setSelectedStudents(certificateOpportunity.enrolledStudents.map((s) => s.id));
      }
    }
  };

  const handleIssueCertificates = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "Atenção",
        description: "Selecione pelo menos um aluno para emitir certificados.",
        variant: "destructive",
      });
      return;
    }

    // Simulate certificate issuance
    toast({
      title: "Certificados emitidos com sucesso!",
      description: `${selectedStudents.length} certificado(s) emitido(s) para os alunos selecionados.`,
    });
    
    setIsCertificateModalOpen(false);
    setSelectedStudents([]);
    setCertificateOpportunity(null);
  };

  return (
    <AppLayout breadcrumb={["Início", "Gerenciar Oportunidades"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Gerenciar Oportunidades
            </h1>
            <p className="text-muted-foreground">
              Crie e supervise oportunidades de extensão
            </p>
          </div>
          <Button
            onClick={() => navigate("/coordinator/opportunities/create")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Oportunidade
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-success/5 to-success/10">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Oportunidades Ativas
                  </span>
                </div>
                <p className="text-3xl font-bold text-success">{activeCount}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ativas no sistema
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-info/5 to-info/10">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Total de Inscrições
                  </span>
                </div>
                <p className="text-3xl font-bold text-info">
                  {totalEnrollments}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Alunos inscritos
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-4 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Total Criadas
                  </span>
                </div>
                <p className="text-3xl font-bold text-accent-foreground">
                  {opportunities.length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Oportunidades no total
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="font-semibold mb-4">
                Oportunidades Supervisionadas
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Gerencie as oportunidades publicadas e acompanhe as inscrições
              </p>

              {/* Filtros */}
              <div className="flex gap-3 flex-wrap items-end">
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

                {(searchQuery ||
                  statusFilter !== "all" ||
                  startDateFilter ||
                  endDateFilter) && (
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

              {(searchQuery ||
                statusFilter !== "all" ||
                startDateFilter ||
                endDateFilter) && (
                <p className="text-xs text-muted-foreground mt-3">
                  {filteredOpportunities.length} de {opportunities.length}{" "}
                  oportunidades encontradas
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
                    <tr key={o.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{o.title}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{o.type}</Badge>
                      </td>
                      <td className="py-3 px-4">{o.hours}h</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {o.filledSlots} / {o.slots}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {o.startDate && o.endDate
                          ? `${new Date(o.startDate).toLocaleDateString(
                              "pt-BR"
                            )} a ${new Date(o.endDate).toLocaleDateString(
                              "pt-BR"
                            )}`
                          : o.period || "-"}
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
                          className={getStatusBadgeColor(
                            getOpportunityStatus(o)
                          )}
                        >
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
                            title="Ver detalhes"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                            onClick={() => handleOpenCertificateModal(o)}
                            title="Emitir certificados"
                          >
                            <Award className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Excluir"
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

            {filteredOpportunities.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Nenhuma oportunidade encontrada
              </div>
            )}
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
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {selectedOpportunity.title}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">{selectedOpportunity.type}</Badge>
                  <Badge
                    className={getStatusBadgeColor(
                      getOpportunityStatus(selectedOpportunity)
                    )}
                  >
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

              <div>
                <h4 className="font-semibold mb-2">Descrição</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedOpportunity.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Carga Horária
                  </p>
                  <p className="font-semibold">{selectedOpportunity.hours}h</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Vagas
                  </p>
                  <p className="font-semibold">
                    {selectedOpportunity.filledSlots} /{" "}
                    {selectedOpportunity.slots}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Data de Início
                  </p>
                  <p className="font-semibold">
                    {selectedOpportunity.startDate
                      ? new Date(
                          selectedOpportunity.startDate
                        ).toLocaleDateString("pt-BR")
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Data de Término
                  </p>
                  <p className="font-semibold">
                    {selectedOpportunity.endDate
                      ? new Date(
                          selectedOpportunity.endDate
                        ).toLocaleDateString("pt-BR")
                      : "-"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Instrutor
                </p>
                <p className="font-semibold">
                  {selectedOpportunity.instructor}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Emissão de Certificados */}
      <Dialog open={isCertificateModalOpen} onOpenChange={setIsCertificateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Emitir Certificados
            </DialogTitle>
          </DialogHeader>

          {certificateOpportunity && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground">
                  {certificateOpportunity.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Carga horária: {certificateOpportunity.hours}h • {certificateOpportunity.enrolledStudents.length} alunos inscritos
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">
                    Selecione os alunos que receberão o certificado:
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAllStudents}
                    className="gap-2"
                  >
                    <Check className="w-3 h-3" />
                    {selectedStudents.length === certificateOpportunity.enrolledStudents.length
                      ? "Desmarcar todos"
                      : "Selecionar todos"}
                  </Button>
                </div>

                <ScrollArea className="h-[300px] rounded-md border p-4">
                  <div className="space-y-3">
                    {certificateOpportunity.enrolledStudents.map((student) => (
                      <div
                        key={student.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                          selectedStudents.includes(student.id)
                            ? "bg-primary/5 border-primary/30"
                            : "bg-card hover:bg-muted/50"
                        }`}
                        onClick={() =>
                          handleStudentSelection(
                            student.id,
                            !selectedStudents.includes(student.id)
                          )
                        }
                      >
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={(checked) =>
                            handleStudentSelection(student.id, checked as boolean)
                          }
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {student.enrollment} • {student.course}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {selectedStudents.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-3">
                    {selectedStudents.length} aluno(s) selecionado(s)
                  </p>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsCertificateModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleIssueCertificates}
              disabled={selectedStudents.length === 0}
              className="gap-2"
            >
              <Award className="w-4 h-4" />
              Emitir Certificados
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
