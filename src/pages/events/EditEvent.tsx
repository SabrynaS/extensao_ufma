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
import { Calendar, Clock, Users, ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import {
  userCreatedOpportunities,
  Opportunity,
  mockTeachers,
} from "@/data/mockData";
import { Steps, StepsContent } from "@/components/ui/steps";
import { useParams, useNavigate } from "react-router-dom";
import { useAlerts } from "@/hooks/useAlerts";

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

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { alerts, addAlert, removeAlert } = useAlerts();

  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
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

  useEffect(() => {
    const found = userCreatedOpportunities.find((opp) => opp.id === id);
    if (found) {
      setOpportunity(found);
      setFormData({
        title: found.title,
        type: found.type,
        hours: String(found.hours),
        slots: String(found.slots),
        instructor: found.instructor,
        startDate: found.startDate || "",
        endDate: found.endDate || "",
        description: found.description,
      });
    } else {
      addAlert(
        "error",
        "Oportunidade não encontrada",
        "A oportunidade que você está tentando editar não existe."
      );
      navigate("/events");
    }
  }, [id, navigate, addAlert]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = (event: React.FormEvent) => {
    event.preventDefault();

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
    // Simular validação dos dados
    const requiredFields = [
      "title",
      "type",
      "hours",
      "slots",
      "instructor",
      "startDate",
      "endDate",
      "description",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof FormData]?.trim()
    );

    if (emptyFields.length > 0) {
      addAlert(
        "error",
        "Erro ao salvar alterações",
        "Todos os campos obrigatórios devem ser preenchidos."
      );
      return;
    }

    // Simular possível erro no servidor (10% de chance)
    const hasError = Math.random() < 0.1;

    if (hasError) {
      addAlert(
        "error",
        "Erro ao salvar alterações",
        "Ocorreu um erro no servidor. Tente novamente mais tarde."
      );
      return;
    }

    // Sucesso - atualizar os dados
    if (opportunity) {
      const updatedOpportunity = {
        ...opportunity,
        title: formData.title,
        type: formData.type,
        hours: parseInt(formData.hours),
        slots: parseInt(formData.slots),
        instructor: formData.instructor,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
      };

      // Aqui você faria a chamada real para a API
      console.log("Oportunidade atualizada:", updatedOpportunity);
    }

    addAlert(
      "success",
      "Evento atualizado com sucesso!",
      "As alterações da oportunidade foram salvas."
    );

    // Redirecionar após um pequeno delay para que o usuário veja a mensagem
    setTimeout(() => {
      navigate("/coordinator/opportunities");
    }, 2000);
  };

  const handleCancelForm = () => {
    navigate("/events");
  };

  const getTeacherName = (id: string) => {
    return mockTeachers.find((t) => t.id === id)?.name || id;
  };

  const getTypeName = (type: string) => {
    const types: { [key: string]: string } = {
      Curso: "Curso",
      Projeto: "Projeto",
      Workshop: "Workshop",
      Evento: "Evento",
      Liga: "Liga",
    };
    return types[type] || type;
  };

  if (!opportunity) {
    return (
      <AppLayout breadcrumb={["Início", "Editar Evento"]}>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumb={["Início", "Meus Eventos", "Editar"]}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Editar Oportunidade
          </h1>
          <p className="text-muted-foreground mt-1">
            Atualize os dados da oportunidade de extensão
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <Steps steps={["Editar Dados", "Revisar"]} current={formStep} />
        </div>

        <StepsContent
          step={formStep}
          content1={
            <form onSubmit={handleContinue} className="space-y-6 w-full">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">
                    Editar Dados da Oportunidade
                  </CardTitle>
                  <CardDescription>
                    Atualize as informações da oportunidade de extensão
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
                          <SelectItem value="Curso">Curso</SelectItem>
                          <SelectItem value="Projeto">Projeto</SelectItem>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                          <SelectItem value="Evento">Evento</SelectItem>
                          <SelectItem value="Liga">Liga</SelectItem>
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
                      <Label htmlFor="instructor">Docente Responsável</Label>
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
                            <SelectItem key={teacher.id} value={teacher.name}>
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
                      rows={5}
                      placeholder="Digite uma descrição completa sobre a oportunidade, conteúdo, objetivos e metodologia"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex justify-center gap-3 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelForm}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="gap-2 px-8">
                      Próximo
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          }
          content2={
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Revisar Alterações</CardTitle>
                <CardDescription>
                  Verifique todos os dados antes de confirmar as alterações
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex justify-center">
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
                        <td className="py-3 px-4 text-sm">{formData.title}</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-sm">Tipo</td>
                        <td className="py-3 px-4 text-sm capitalize">
                          {getTypeName(formData.type)}
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-sm">
                          Carga Horária
                        </td>
                        <td className="py-3 px-4 text-sm">{formData.hours}h</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-sm">
                          Quantidade de Vagas
                        </td>
                        <td className="py-3 px-4 text-sm">{formData.slots}</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-sm">
                          Docente Responsável
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {formData.instructor}
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-sm">
                          Status
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <Badge
                            className={
                              opportunity.status === "Aprovado"
                                ? "bg-success/10 text-success border-0"
                                : "bg-blue-50 text-blue-700 border-0"
                            }
                          >
                            {opportunity.status === "Aprovado"
                              ? "Aprovada"
                              : "Aguardando aprovação"}
                          </Badge>
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

                <div className="flex justify-end gap-3 pt-4 border-t">
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
                    className="px-8"
                  >
                    Confirmar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          }
        />
      </div>
    </AppLayout>
  );
}
