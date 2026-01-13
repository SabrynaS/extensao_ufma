import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  FileText,
  Lightbulb,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Opportunity,
  mockTeachers,
} from "@/data/mockData";
import { OpportunityDetailsModal } from "@/components/student/OpportunityDetailsModal";
import { DeleteOpportunityConfirm } from "@/components/student/DeleteOpportunityConfirm";
import { Steps, StepsContent } from "@/components/ui/steps";
import { useAlerts } from "@/hooks/useAlerts";
import { useOpportunities } from "@/contexts/OpportunitiesContext";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface FormData {
  title: string;
  type: string;
  hours: string;
  slots: string;
  instructor: string;
  startDate: string;
  endDate: string;
  description: string;
}

export default function CreateEvent() {
  const navigate = useNavigate();
  const { alerts, addAlert, removeAlert } = useAlerts();
  const { userOpportunities, addUserOpportunity, updateUserOpportunity, deleteUserOpportunity } = useOpportunities();
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    type: "",
    hours: "",
    slots: "",
    instructor: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [opportunityToDelete, setOpportunityToDelete] =
    useState<Opportunity | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = (event: React.FormEvent) => {
    event.preventDefault();

    // Validação básica
    if (
      !formData.title ||
      !formData.type ||
      !formData.hours ||
      !formData.slots ||
      !formData.instructor ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.description
    ) {
      addAlert(
        "error",
        "Campos obrigatórios",
        "Preencha todos os campos para continuar."
      );
      return;
    }

    setFormStep(2);
  };

  const handleConfirm = () => {
    // Simular possível erro no servidor (5% de chance)
    const hasError = Math.random() < 0.05;

    if (hasError) {
      addAlert(
        "error",
        "Erro ao criar evento",
        "Ocorreu um erro no servidor. Tente novamente mais tarde."
      );
      return;
    }

    // Create new opportunity object
    const newOpportunity: Opportunity = {
      id: editingId || uuidv4(),
      title: formData.title,
      type: formData.type as any,
      hours: parseInt(formData.hours),
      slots: parseInt(formData.slots),
      instructor: formData.instructor,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
      date: formData.startDate,
      validation: "Automática",
      filledSlots: editingId ? (userOpportunities.find(o => o.id === editingId)?.filledSlots || 0) : 0,
      status: editingId ? (userOpportunities.find(o => o.id === editingId)?.status || "Aguardando aprovação") : "Aguardando aprovação"
    };

    // Save to context (and localStorage)
    if (editingId) {
      updateUserOpportunity(editingId, newOpportunity);
      addAlert(
        "success",
        "Evento atualizado com sucesso!",
        "As alterações foram salvas."
      );
      setEditingId(null);
    } else {
      addUserOpportunity(newOpportunity);
      addAlert(
        "success",
        "Novo evento criado com sucesso!",
        "Verifique a lista de eventos para ver a nova oportunidade."
      );
    }

    // Resetar formulário após sucesso
    setShowForm(false);
    setFormStep(1);
    setFormData({
      title: "",
      type: "",
      hours: "",
      slots: "",
      instructor: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setFormStep(1);
    setFormData({
      title: "",
      type: "",
      hours: "",
      slots: "",
      instructor: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const getTeacherName = (id: string) => {
    return mockTeachers.find((t) => t.id === id)?.name || id;
  };

  const handleViewDetails = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowDetailsModal(true);
  };

  const handleEditClick = (opportunity: Opportunity) => {
    if (opportunity.status === "Aprovado") {
      addAlert(
        "error",
        "Não é possível editar",
        "Eventos aprovados não podem ser editados."
      );
      return;
    }
    navigate(`/events/edit/${opportunity.id}`);
  };

  const handleDeleteClick = (opportunity: Opportunity) => {
    if (opportunity.status === "Aprovado") {
      addAlert(
        "error",
        "Não é possível excluir",
        "Eventos aprovados não podem ser excluídos."
      );
      return;
    }
    setOpportunityToDelete(opportunity);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (opportunityToDelete) {
      deleteUserOpportunity(opportunityToDelete.id);
      addAlert(
        "success",
        "Evento excluído",
        "A oportunidade foi removida com sucesso."
      );
      setShowDeleteConfirm(false);
      setOpportunityToDelete(null);
    }
  };

  return (
    <AppLayout breadcrumb={["Início", "Criar Evento"]}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Minhas Oportunidades de Extensão
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as oportunidades de extensão que você criou
          </p>
        </div>

        {/* Create Form - Hidden by default */}
        {showForm && (
          <>
            {/* Stepper */}
            <div className="mb-8">
              <Steps
                steps={["Dados da Oportunidade", "Revisão"]}
                current={formStep}
              />
            </div>

            <StepsContent
              step={formStep}
              content1={
                <form onSubmit={handleContinue} className="space-y-6 w-full">
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">
                        Cadastrar Nova Oportunidade
                      </CardTitle>
                      <CardDescription>
                        Preencha os dados básicos da oportunidade de extensão
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título do Evento</Label>
                        <Input
                          id="title"
                          placeholder="Digite o título da oportunidade de extensão"
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="type">Tipo da Oportunidade</Label>
                          <Select
                            value={formData.type}
                            onValueChange={(value) =>
                              handleInputChange("type", value)
                            }
                          >
                            <SelectTrigger id="type">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="curso">Curso</SelectItem>
                              <SelectItem value="projeto">Projeto</SelectItem>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="evento">Evento</SelectItem>
                              <SelectItem value="liga">Liga</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="hours">Carga Horária</Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <Input
                              id="hours"
                              className="pl-9"
                              type="number"
                              placeholder="Digite a carga horária em horas"
                              min="1"
                              value={formData.hours}
                              onChange={(e) =>
                                handleInputChange("hours", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="slots">Quantidade de Vagas</Label>
                          <div className="relative">
                            <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <Input
                              id="slots"
                              className="pl-9"
                              type="number"
                              placeholder="Digite o número de vagas disponíveis"
                              min="1"
                              value={formData.slots}
                              onChange={(e) =>
                                handleInputChange("slots", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="instructor">
                            Docente Responsável
                          </Label>
                          <Select
                            value={formData.instructor}
                            onValueChange={(value) =>
                              handleInputChange("instructor", value)
                            }
                          >
                            <SelectTrigger id="instructor">
                              <SelectValue placeholder="Selecione o docente" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockTeachers.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.id}>
                                  {teacher.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="startDate">Data de Início</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <Input
                              id="startDate"
                              className="pl-9"
                              type="date"
                              value={formData.startDate}
                              onChange={(e) =>
                                handleInputChange("startDate", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="endDate">Data de Término</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <Input
                              id="endDate"
                              className="pl-9"
                              type="date"
                              value={formData.endDate}
                              onChange={(e) =>
                                handleInputChange("endDate", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição Detalhada</Label>
                        <Textarea
                          id="description"
                          rows={4}
                          placeholder="Digite uma descrição completa sobre a oportunidade, conteúdo, objetivos e metodologia"
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancelForm}
                        >
                          Cancelar
                        </Button>
                        <Button type="submit" className="px-6 gap-2">
                          Continuar
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </form>
              }
              content2={
                // Etapa 2: Revisão dos dados
                <Card className="w-full">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                      Revisar Oportunidade
                    </CardTitle>
                    <CardDescription>
                      Verifique se todas as informações estão corretas antes de
                      confirmar
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="overflow-x-auto flex justify-center">
                      <table className="w-2/3">
                        <thead>
                          <tr className="bg-red-700/10">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                              Campo
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                              Descrição
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-sm">
                              Título
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {formData.title}
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-sm">
                              Tipo
                            </td>
                            <td className="py-3 px-4 text-sm capitalize">
                              {formData.type}
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-sm">
                              Carga Horária
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {formData.hours}h
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-sm">
                              Quantidade de Vagas
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {formData.slots}
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-sm">
                              Docente Responsável
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {getTeacherName(formData.instructor)}
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-sm">
                              Data de Início
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {formData.startDate}
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-sm">
                              Data de Término
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {formData.endDate}
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-sm">
                              Descrição
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {formData.description}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFormStep(1)}
                        className="gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelForm}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="button"
                        onClick={handleConfirm}
                        className="px-6"
                      >
                        Confirmar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              }
            />
          </>
        )}

        {/* List of Created Opportunities - Hidden when form is open */}
        {!showForm && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Oportunidades Criadas</CardTitle>
                <CardDescription>
                  Total de oportunidades: {userOpportunities.length}
                </CardDescription>
              </div>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar Oportunidade
              </Button>
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
                    {userOpportunities.map((opportunity) => (
                      <tr
                        key={opportunity.id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="py-3 px-4 font-medium">
                          {opportunity.title}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{opportunity.type}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {opportunity.filledSlots} / {opportunity.slots}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              opportunity.status === "Aprovado"
                                ? "bg-success/10 text-success border-0"
                                : opportunity.status === "Aguardando aprovação"
                                ? "bg-destructive/10 text-destructive border-0"
                                : "bg-blue-50 text-blue-700 border-0"
                            }
                          >
                            {opportunity.status === "Aprovado"
                              ? "Ativo"
                              : opportunity.status === "Aguardando aprovação"
                              ? "Aguardando aprovação"
                              : "Aprovado"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => handleViewDetails(opportunity)}
                            >
                              <Eye className="w-3 h-3" />
                              Ver Detalhes
                            </Button>
                            {opportunity.status !== "Aprovado" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => handleEditClick(opportunity)}
                              >
                                <Edit className="w-3 h-3" />
                                Editar
                              </Button>
                            )}
                            {opportunity.status !== "Aprovado" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteClick(opportunity)}
                              >
                                <Trash2 className="w-3 h-3" />
                                Excluir
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <OpportunityDetailsModal
        opportunity={selectedOpportunity}
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
      />
      <DeleteOpportunityConfirm
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={confirmDelete}
        title={opportunityToDelete?.title || ""}
      />
    </AppLayout>
  );
}
