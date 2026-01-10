import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, ArrowLeft } from "lucide-react";
import { activityTypes } from "@/data/mockData";
import { useAlerts } from "@/hooks/useAlerts";
import { useSolicitations } from "@/contexts/SolicitationsContext";
import { useAuth } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from 'uuid';

export default function RegisterExternalActivityPage() {
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const { addSolicitation } = useSolicitations();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    type: "",
    institution: "",
    activity: "",
    hours: "",
    year: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar campos obrigatórios
    const requiredFields = [
      "type",
      "institution",
      "activity",
      "hours",
      "year",
      "startDate",
      "endDate",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (emptyFields.length > 0) {
      addAlert(
        "error",
        "Campos obrigatórios",
        "Todos os campos marcados são obrigatórios."
      );
      setIsSubmitting(false);
      return;
    }

    if (!selectedFile) {
      addAlert(
        "error",
        "Arquivo necessário",
        "É necessário anexar o certificado da atividade."
      );
      setIsSubmitting(false);
      return;
    }

    // Simular possível erro de upload (10% de chance)
    const hasError = Math.random() < 0.1;

    if (hasError) {
      addAlert(
        "error",
        "Erro no envio",
        "Ocorreu um erro ao processar sua solicitação. Tente novamente."
      );
      setIsSubmitting(false);
      return;
    }

    // Criar nova solicitação
    const newSolicitation = {
      id: uuidv4(),
      activity: formData.activity,
      type: formData.type,
      hours: parseInt(formData.hours),
      submitDate: new Date().toLocaleDateString('pt-BR'),
      status: "Pendente" as const,
      studentId: user?.id || "1",
      studentName: user?.name || "Estudante",
      studentMatricula: user?.matricula || "",
      institution: formData.institution,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
      certificateUrl: selectedFile.name,
    };

    // Salvar no context (e localStorage)
    addSolicitation(newSolicitation);

    addAlert(
      "success",
      "Solicitação enviada!",
      "Sua atividade foi submetida para análise."
    );

    // Redirecionar após um pequeno delay
    setTimeout(() => {
      navigate("/student/requests");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <AppLayout breadcrumb={["Início", "Minhas Solicitações", "Registrar Atividade Externa"]}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header com botão voltar */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/student/requests")}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Registrar Atividade Externa</h1>
            <p className="mt-1 text-muted-foreground">
              Preencha os dados da atividade realizada e anexe o certificado comprobatório
            </p>
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Dados da Atividade</CardTitle>
            <CardDescription>
              Todos os campos marcados com * são obrigatórios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo de Atividade */}
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Atividade *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {activityTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Instituição */}
              <div className="space-y-2">
                <Label htmlFor="institution">Nome da Instituição/Evento *</Label>
                <Input
                  id="institution"
                  placeholder="Ex: Universidade Federal do Maranhão"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  required
                />
              </div>

              {/* Atividade */}
              <div className="space-y-2">
                <Label htmlFor="activity">Nome da Atividade *</Label>
                <Input
                  id="activity"
                  placeholder="Ex: Curso de Python para Ciência de Dados"
                  value={formData.activity}
                  onChange={(e) =>
                    setFormData({ ...formData, activity: e.target.value })
                  }
                  required
                />
              </div>

              {/* Grid: Horas e Ano */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hours">Carga Horária (Horas) *</Label>
                  <Input
                    id="hours"
                    type="number"
                    placeholder="Ex: 40"
                    value={formData.hours}
                    onChange={(e) =>
                      setFormData({ ...formData, hours: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Ano de Realização *</Label>
                  <Input
                    id="year"
                    placeholder="Ex: 2024"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Grid: Datas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data de Início *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data de Fim *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Upload de Arquivo */}
              <div className="space-y-2">
                <Label>Certificado Comprobatório *</Label>
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-medium text-foreground">{selectedFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Arraste seu certificado aqui
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        ou clique para selecionar
                      </p>
                      <Button type="button" variant="secondary" size="sm">
                        Selecionar Arquivo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Formatos aceitos: PDF, JPG, PNG (máx. 5MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Descrição/Observações Adicionais
                </Label>
                <Textarea
                  id="description"
                  placeholder="Descreva brevemente as atividades realizadas ou informações relevantes..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Opcional - máximo 500 caracteres ({formData.description.length}/500)
                </p>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/student/requests")}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
