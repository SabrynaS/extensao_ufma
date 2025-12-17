import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, ArrowRight, ArrowLeft } from "lucide-react";
import { Opportunity, mockTeachers } from "@/data/mockData";
import { useState, useEffect } from "react";
import { Steps, StepsContent } from "@/components/ui/steps";

interface EditOpportunityModalProps {
  opportunity: Opportunity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (opportunity: Opportunity) => void;
}

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

export function EditOpportunityModal({
  opportunity,
  open,
  onOpenChange,
  onSave,
}: EditOpportunityModalProps) {
  const [formStep, setFormStep] = useState<1 | 2>(1);
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
    if (opportunity) {
      setFormData({
        title: opportunity.title,
        type: opportunity.type,
        hours: String(opportunity.hours),
        slots: String(opportunity.slots),
        instructor: opportunity.instructor,
        startDate: opportunity.startDate || "",
        endDate: opportunity.endDate || "",
        description: opportunity.description,
      });
      setFormStep(1);
    }
  }, [opportunity, open]);

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
      return;
    }

    setFormStep(2);
  };

  const handleConfirm = () => {
    if (opportunity) {
      const updatedOpportunity: Opportunity = {
        ...opportunity,
        title: formData.title,
        type: formData.type as
          | "Curso"
          | "Workshop"
          | "Projeto"
          | "Evento"
          | "Liga",
        hours: Number(formData.hours),
        slots: Number(formData.slots),
        instructor: formData.instructor,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
      };
      onSave(updatedOpportunity);
    }
  };

  const handleBack = () => {
    setFormStep(1);
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

  if (!opportunity) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Oportunidade</DialogTitle>
          <DialogDescription>
            Atualize os dados da oportunidade de extensão
          </DialogDescription>
        </DialogHeader>

        <div className="mb-6">
          <Steps steps={["Editar Dados", "Revisar"]} current={formStep} />
        </div>

        <StepsContent
          step={formStep}
          content1={
            <form onSubmit={handleContinue} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Título do Evento</Label>
                <Input
                  id="edit-title"
                  placeholder="Digite o título da oportunidade de extensão"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Tipo da Oportunidade</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: string) =>
                      handleInputChange("type", value)
                    }
                  >
                    <SelectTrigger id="edit-type">
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
                  <Label htmlFor="edit-hours">Carga Horária</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="edit-hours"
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
                  <Label htmlFor="edit-slots">Quantidade de Vagas</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="edit-slots"
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
                  <Label htmlFor="edit-instructor">Docente Responsável</Label>
                  <Select
                    value={formData.instructor}
                    onValueChange={(value) =>
                      handleInputChange("instructor", value)
                    }
                  >
                    <SelectTrigger id="edit-instructor">
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
                  <Label htmlFor="edit-startDate">Data de Início</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="edit-startDate"
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
                  <Label htmlFor="edit-endDate">Data de Término</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="edit-endDate"
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
                <Label htmlFor="edit-description">Descrição Detalhada</Label>
                <Textarea
                  id="edit-description"
                  rows={4}
                  placeholder="Digite uma descrição completa sobre a oportunidade, conteúdo, objetivos e metodologia"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="gap-2">
                  Próximo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          }
          content2={
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revisar Alterações</CardTitle>
                  <CardDescription>
                    Verifique os dados antes de confirmar as alterações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Título
                      </Label>
                      <p className="font-medium">{formData.title}</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Tipo
                      </Label>
                      <p className="font-medium">
                        {getTypeName(formData.type)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Carga Horária
                      </Label>
                      <p className="font-medium">{formData.hours}h</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Vagas Disponíveis
                      </Label>
                      <p className="font-medium">{formData.slots}</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Docente Responsável
                      </Label>
                      <p className="font-medium">{formData.instructor}</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Status
                      </Label>
                      <Badge
                        className={
                          opportunity.status === "Aprovado"
                            ? "bg-success/10 text-success border-0 w-fit"
                            : "bg-blue-50 text-blue-700 border-0 w-fit"
                        }
                      >
                        {opportunity.status === "Aprovado"
                          ? "Aprovada"
                          : "Aguardando aprovação"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Data de Início
                      </Label>
                      <p className="font-medium">{formData.startDate}</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Data de Término
                      </Label>
                      <p className="font-medium">{formData.endDate}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Descrição
                    </Label>
                    <p className="text-sm bg-muted p-4 rounded-md whitespace-pre-wrap">
                      {formData.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button type="button" onClick={handleConfirm}>
                  Confirmar Alterações
                </Button>
              </div>
            </div>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
