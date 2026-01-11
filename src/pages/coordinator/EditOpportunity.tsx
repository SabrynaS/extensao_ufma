import { useNavigate, useParams } from "react-router-dom";
import { useOpportunities } from "@/contexts/OpportunitiesContext";
import { useAlerts } from "@/hooks/useAlerts";
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

interface FormData {
  title: string;
  type: "Curso" | "Workshop" | "Projeto" | "Evento" | "Liga";
  validation: "Automática" | "Manual";
  description: string;
  hours: number;
  slots: number;
  period: string;
  startDate: string;
  endDate: string;
  instructor: string;
  studentResponsible: string;
}

export default function EditOpportunity() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { coordinatorOpportunities, updateCoordinatorOpportunity } = useOpportunities();
  const { addAlert } = useAlerts();

  const opportunity = coordinatorOpportunities.find((o) => o.id === id);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    type: "Curso",
    validation: "Manual",
    description: "",
    hours: 0,
    slots: 0,
    period: "",
    startDate: "",
    endDate: "",
    instructor: "",
    studentResponsible: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return "";
    
    // Se já está em formato YYYY-MM-DD, retorna como está
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    
    // Se está em formato DD/MM/YYYY, converte para YYYY-MM-DD
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
    }
    
    return dateStr;
  };

  useEffect(() => {
    if (opportunity) {
      setFormData({
        title: opportunity.title || "",
        type: opportunity.type || "Curso",
        validation: opportunity.validation || "Manual",
        description: opportunity.description || "",
        hours: opportunity.hours || 0,
        slots: opportunity.slots || 0,
        period: opportunity.period || "",
        startDate: formatDateForInput(opportunity.startDate || ""),
        endDate: formatDateForInput(opportunity.endDate || ""),
        instructor: opportunity.instructor || "",
        studentResponsible: opportunity.studentResponsible || "",
      });
    }
  }, [opportunity]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Título é obrigatório";
    if (!formData.description.trim()) newErrors.description = "Descrição é obrigatória";
    if (formData.hours <= 0) newErrors.hours = "Carga horária deve ser maior que 0";
    if (formData.slots <= 0) newErrors.slots = "Número de vagas deve ser maior que 0";
    if (!formData.startDate) newErrors.startDate = "Data de início é obrigatória";
    if (!formData.endDate) newErrors.endDate = "Data de término é obrigatória";
    if (!formData.instructor.trim()) newErrors.instructor = "Instrutor é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      addAlert("error", "Validação", "Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (!id) return;

    const updatedOpportunity: any = {
      ...opportunity!,
      ...formData,
    };

    updateCoordinatorOpportunity(id, updatedOpportunity);
    addAlert("success", "Oportunidade atualizada", `${formData.title} foi atualizada com sucesso`);

    setTimeout(() => {
      navigate("/coordinator/opportunities");
    }, 1500);
  };

  if (!opportunity) {
    return (
      <AppLayout breadcrumb={["Início", "Gestão de Oportunidades", "Editar"]}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Oportunidade não encontrada</p>
          <Button onClick={() => navigate("/coordinator/opportunities")} className="mt-4">
            Voltar para Oportunidades
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumb={["Início", "Gestão de Oportunidades", "Editar"]}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/coordinator/opportunities")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Editar Oportunidade</h1>
            <p className="text-muted-foreground">Atualize os dados da oportunidade selecionada</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Dados principais da oportunidade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Oportunidade *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Workshop de React Avançado"
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Oportunidade *</Label>
                    <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger id="type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Curso">Curso</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Projeto">Projeto</SelectItem>
                        <SelectItem value="Evento">Evento</SelectItem>
                        <SelectItem value="Liga">Liga</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validation">Tipo de Validação *</Label>
                    <Select value={formData.validation} onValueChange={(value: any) => setFormData({ ...formData, validation: value })}>
                      <SelectTrigger id="validation">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automática">Automática</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o conteúdo e objetivos da oportunidade"
                    rows={4}
                    className={errors.description ? "border-destructive" : ""}
                  />
                  {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Dados Específicos */}
            <Card>
              <CardHeader>
                <CardTitle>Dados Específicos</CardTitle>
                <CardDescription>Informações de carga horária e período</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Carga Horária (horas) *</Label>
                    <Input
                      id="hours"
                      type="number"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) || 0 })}
                      placeholder="Ex: 16"
                      min="1"
                      className={errors.hours ? "border-destructive" : ""}
                    />
                    {errors.hours && <p className="text-xs text-destructive">{errors.hours}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slots">Número de Vagas *</Label>
                    <Input
                      id="slots"
                      type="number"
                      value={formData.slots}
                      onChange={(e) => setFormData({ ...formData, slots: parseInt(e.target.value) || 0 })}
                      placeholder="Ex: 25"
                      min="1"
                      className={errors.slots ? "border-destructive" : ""}
                    />
                    {errors.slots && <p className="text-xs text-destructive">{errors.slots}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data de Início *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className={errors.startDate ? "border-destructive" : ""}
                    />
                    {errors.startDate && <p className="text-xs text-destructive">{errors.startDate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data de Término *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className={errors.endDate ? "border-destructive" : ""}
                    />
                    {errors.endDate && <p className="text-xs text-destructive">{errors.endDate}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Responsáveis */}
            <Card>
              <CardHeader>
                <CardTitle>Responsáveis</CardTitle>
                <CardDescription>Pessoas responsáveis pela oportunidade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instructor">Responsável *</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    placeholder="Ex: Dr. Carlos Eduardo Silva"
                    className={errors.instructor ? "border-destructive" : ""}
                  />
                  {errors.instructor && <p className="text-xs text-destructive">{errors.instructor}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentResponsible">Aluno Responsável (Opcional)</Label>
                  <Input
                    id="studentResponsible"
                    value={formData.studentResponsible}
                    onChange={(e) => setFormData({ ...formData, studentResponsible: e.target.value })}
                    placeholder="Ex: Ana Paula Santos"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Botões */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => navigate("/coordinator/opportunities")}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary">
                Atualizar Oportunidade
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
