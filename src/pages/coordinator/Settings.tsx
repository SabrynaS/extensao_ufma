import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PPCVersionHistory } from "@/components/ppc/PPCVersionHistory";
import { mockPPCVersions, PPCVersion } from "@/data/mockData";
import { PPCCurrentForm } from "@/components/ppc/PPCCurrentForm";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function CoordinatorSettings() {
  const { addAlert } = useAlerts();
  const [versions, setVersions] = useState<PPCVersion[]>(mockPPCVersions);
  const [selectedVersion, setSelectedVersion] = useState<PPCVersion | null>(
    null
  );
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const currentVersion = versions.find((v) => v.isActive) || null;

  const handleViewVersion = (version: PPCVersion) => {
    setSelectedVersion(version);
    setIsViewDialogOpen(true);
  };

  const handleSave = (data: Partial<PPCVersion>) => {
    const newVersion: PPCVersion = {
      id: String(versions.length + 1),
      version:
        data.version ||
        `PPC ${new Date().getFullYear()}.${Math.ceil(
          (new Date().getMonth() + 1) / 6
        )}`,
      totalHours: data.totalHours || 300,
      allocationRule: data.allocationRule || "flexible",
      author: "Prof. Dr. Roberto Lima",
      effectiveDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    const updatedVersions = versions.map((v) => ({ ...v, isActive: false }));
    setVersions([newVersion, ...updatedVersions]);

    addAlert("success", "PPC atualizado!", "Nova versão criada com sucesso.");
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  };

  return (
    <AppLayout breadcrumb={["Início", "Configurações do Curso"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Configurações do Curso
          </h1>
          <p className="text-muted-foreground">
            Gerencie o PPC, regras de validação e comissões avaliadoras
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="ppc">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="history">Histórico</TabsTrigger>
                <TabsTrigger value="ppc">PPC Vigente</TabsTrigger>
              </TabsList>
              <TabsContent value="ppc" className="mt-6 space-y-6">
                <PPCCurrentForm
                  currentVersion={currentVersion}
                  onSave={handleSave}
                />
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <PPCVersionHistory
                  versions={versions}
                  onViewVersion={handleViewVersion}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Detalhes da Versão
              {selectedVersion?.isActive && (
                <Badge className="bg-emerald-100 text-emerald-700">
                  Vigente
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedVersion && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Versão</p>
                  <p className="font-medium">{selectedVersion.version}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Carga Horária</p>
                  <p className="font-medium">
                    {selectedVersion.totalHours} horas
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Regra de Alocação
                  </p>
                  <p className="font-medium">
                    {selectedVersion.allocationRule === "flexible"
                      ? "100% Flexível"
                      : "Modular"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Data de Vigência
                  </p>
                  <p className="font-medium">
                    {formatDate(selectedVersion.effectiveDate)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Autor da Alteração
                </p>
                <p className="font-medium">{selectedVersion.author}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Criado em</p>
                <p className="font-medium">
                  {format(
                    new Date(selectedVersion.createdAt),
                    "dd/MM/yyyy 'às' HH:mm",
                    { locale: ptBR }
                  )}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
