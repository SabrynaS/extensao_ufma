import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, FileText, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const { toast } = useToast();
  const navigate = useNavigate();

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    toast({
      title: 'Novo evento criado com sucesso!',
      description: 'Vefique o catálogo de eventos para ver a nova oportunidade.',
    });
    navigate("/student");
  }

  return (
    <AppLayout breadcrumb={["Início", "Criar Evento"]}>
      <form onSubmit={onSubmit} className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Criar Nova Oportunidade de Extensão
          </h1>
          <p className="text-muted-foreground mt-1">
            Cadastre cursos, projetos, eventos ou outras atividades disponíveis para inscrição
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Informações do Evento
              </CardTitle>
              <CardDescription>
                Preencha os dados básicos da oportunidade de extensão
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">

              <Input placeholder="Título do evento" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo da oportunidade" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="curso">Curso</SelectItem>
                    <SelectItem value="projeto">Projeto</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="evento">Evento</SelectItem>
                    <SelectItem value="liga">Liga</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-9" type="number" placeholder="Carga horária (h)" />
                </div>

                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-9" type="number" placeholder="Quantidade de vagas" />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-9" type="date" />
                </div>
              </div>

              <Input placeholder="Responsável pelo evento" />

              <Textarea
                rows={4}
                placeholder="Descrição detalhada do evento"
              />

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Dicas para um bom cadastro
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>• Use um título claro e objetivo</p>
              <p>• Descreva o público-alvo do evento</p>
              <p>• Informe corretamente carga horária e vagas</p>
              <p>• Revise antes de publicar</p>
            </CardContent>
          </Card>

        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancelar</Button>
          <Button className="px-6">Criar Evento</Button>
        </div>

      </form>
    </AppLayout>
  );
}
