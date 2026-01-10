import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Download, Eye, Filter, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewSolicitationModal } from "@/components/student/NewSolicitationModal";
import { SolicitationDetailsModal } from "@/components/student/SolicitationDetailsModal";
import { useAlerts } from "@/hooks/useAlerts";
import { useSolicitations } from "@/contexts/SolicitationsContext";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentRequests() {
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const { solicitations, updateSolicitation } = useSolicitations();
  const { user } = useAuth();
  const [showNewSolicitation, setShowNewSolicitation] = useState(false);
  const [selectedSolicitation, setSelectedSolicitation] = useState<
    (typeof solicitations)[0] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [solicitationToCancel, setSolicitationToCancel] = useState<
    (typeof solicitations)[0] | null
  >(null);

  // Filter solicitations for current user
  const mySolicitations = solicitations.filter((s) => s.studentId === user?.id || s.studentId === "1");

  const filteredSolicitations = mySolicitations.filter((s) => {
    const matchesSearch = s.activity
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" &&
        (s.status === "Pendente" || s.status === "Em Análise")) ||
      (activeTab === "approved" && s.status === "Aprovado") ||
      (activeTab === "rejected" && s.status === "Rejeitado") ||
      (activeTab === "canceled" && s.status === "Cancelado");
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aprovado":
        return (
          <Badge className="bg-success/10 text-success border-0">
            Aprovado
          </Badge>
        );
      case "Em Análise":
        return (
          <Badge className="bg-warning/10 text-warning border-0">
            Em Análise
          </Badge>
        );
      case "Pendente":
        return (
          <Badge className="bg-warning/10 text-warning border-0">
            Pendente
          </Badge>
        );
      case "Rejeitado":
        return (
          <Badge className="bg-destructive/10 text-destructive border-0">
            Rejeitado
          </Badge>
        );
      case "Em Ajuste":
        return (
          <Badge className="bg-destructive/10 text-destructive border-0">
            Em Ajuste
          </Badge>
        );
      case "Cancelado":
        return (
          <Badge className="bg-muted text-muted-foreground border-0">
            Cancelado
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout breadcrumb={["Início", "Minhas Solicitações"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Minhas Solicitações
            </h1>
            <p className="text-muted-foreground">
              Gerencie suas atividades submetidas
            </p>
          </div>
          <Button
            onClick={() => navigate("/student/register-external-activity")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Solicitação
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por atividade..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-4"
            >
              <TabsList>
                <TabsTrigger value="all">
                  Todas ({mySolicitations.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pendentes (
                  {
                    mySolicitations.filter(
                      (s) =>
                        s.status === "Pendente" || s.status === "Em Análise"
                    ).length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Aprovadas (
                  {
                    mySolicitations.filter((s) => s.status === "Aprovado")
                      .length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rejeitadas (
                  {
                    mySolicitations.filter((s) => s.status === "Rejeitado")
                      .length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger value="canceled">
                  Canceladas (
                  {
                    mySolicitations.filter((s) => s.status === "Cancelado")
                      .length
                  }
                  )
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Atividade
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Tipo
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Carga Horária
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Data Envio
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
                  {filteredSolicitations.map((solicitation) => (
                    <tr
                      key={solicitation.id}
                      className="border-b last:border-0 hover:bg-muted/50"
                    >
                      <td className="py-3 px-4 text-sm">
                        {solicitation.activity}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {solicitation.type}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {solicitation.hours}h
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {solicitation.submitDate}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(solicitation.status)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              setSelectedSolicitation(solicitation);
                            }}
                          >
                            <Eye className="w-3 h-3" />
                            Detalhes
                          </Button>
                          {solicitation.status === "Aprovado" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => {
                                addAlert(
                                  "success",
                                  "Download iniciado",
                                  "O certificado está sendo baixado."
                                );
                                // Aqui faria o download real
                              }}
                            >
                              <Download className="w-3 h-3" />
                              Certificado
                            </Button>
                          )}
                          {solicitation.status === "Pendente" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-destructive hover:text-destructive"
                              onClick={() => {
                                setSolicitationToCancel(solicitation);
                                setShowCancelConfirm(true);
                              }}
                            >
                              <X className="w-3 h-3" />
                              Cancelar
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredSolicitations.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhuma solicitação encontrada
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <NewSolicitationModal
        open={showNewSolicitation}
        onOpenChange={setShowNewSolicitation}
      />

      <SolicitationDetailsModal
        solicitation={selectedSolicitation}
        open={!!selectedSolicitation}
        onOpenChange={(open) => !open && setSelectedSolicitation(null)}
      />

      <Dialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Solicitação</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar a solicitação "{solicitationToCancel?.activity}"? 
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelConfirm(false)}
            >
              Não, manter
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (solicitationToCancel) {
                  updateSolicitation(solicitationToCancel.id, {
                    ...solicitationToCancel,
                    status: "Cancelado",
                  });
                  addAlert(
                    "success",
                    "Solicitação cancelada",
                    `A solicitação "${solicitationToCancel.activity}" foi cancelada.`
                  );
                  setShowCancelConfirm(false);
                  setSolicitationToCancel(null);
                }
              }}
            >
              Sim, cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
