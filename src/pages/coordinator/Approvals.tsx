import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAlerts } from "@/hooks/useAlerts";
import { useSolicitations } from "@/contexts/SolicitationsContext";

export default function CoordinatorApprovals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { addAlert } = useAlerts();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { solicitations } = useSolicitations();
  const isCommission = user?.role === "comissao" || user?.role === "commission";

  const pendingSolicitations = solicitations.filter(
    (s) => s.status === "Pendente" || s.status === "Em Ajuste"
  );
  const filtered = pendingSolicitations.filter((s) => {
    const matchesSearch =
      s.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && s.status === "Pendente") ||
      (activeTab === "adjustment" && s.status === "Em Ajuste");
    return matchesSearch && matchesTab;
  });

  const handleEvaluate = (id: string) => {
    navigate(`/coordinator/approvals/${id}`);
  };

  return (
    <AppLayout breadcrumb={["Início", "Solicitações de Validação"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Solicitações de Validação
            </h1>
            <p className="text-muted-foreground">
              Solicitações aguardando análise e validação da coordenação
            </p>
          </div>
          {!isCommission && (
            <Button
              onClick={() => navigate("/coordinator/approvals/delegate")}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Delegar Solicitações
            </Button>
          )}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="font-semibold">Solicitações para Validação</h3>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por aluno, atividade ou matrícula..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-4"
            >
              <TabsList>
                <TabsTrigger value="all">Todos (7)</TabsTrigger>
                <TabsTrigger value="pending">Pendente (5)</TabsTrigger>
                <TabsTrigger value="adjustment">Em Ajuste (2)</TabsTrigger>
              </TabsList>
            </Tabs>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Aluno
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Atividade
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Tipo
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Horas
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Data Envio
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Prazo Restante
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
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{s.studentName}</p>
                        <p className="text-xs text-muted-foreground">
                          {s.studentMatricula}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{s.activity}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{s.type}</Badge>
                    </td>
                    <td className="py-3 px-4">{s.hours}h</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {s.submitDate}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          s.urgent
                            ? "bg-destructive/10 text-destructive border-0"
                            : "bg-success/10 text-success border-0"
                        }
                      >
                        {s.urgent
                          ? `⚠ ${s.deadlineDays} dias`
                          : `${s.deadlineDays} dias`}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-warning/10 text-warning border-0">
                        {s.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" onClick={() => handleEvaluate(s.id)}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Avaliar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
