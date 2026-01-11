import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Send, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import { useSolicitations } from "@/contexts/SolicitationsContext";
import { useCommission } from "@/contexts/CommissionContext";

export default function DelegateSolicitations() {
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const { solicitations, updateSolicitationDelegation } = useSolicitations();
  const { members: commissionMembers } = useCommission();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pendente"); // Apenas Pendente
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedSolicitations, setSelectedSolicitations] = useState<Set<string>>(new Set());

  // Filtrar APENAS solicitações pendentes E que não foram delegadas
  const filteredSolicitations = solicitations
    .filter((s) => s.status === "Pendente") // Apenas Pendente
    .filter((s) => !s.delegatedTo) // Apenas as que NÃO foram delegadas
    .filter((s) => {
      const matchesSearch =
        s.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentName.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });

  // Toggle seleção de solicitação
  const toggleSolicitation = (id: string) => {
    const newSelected = new Set(selectedSolicitations);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedSolicitations(newSelected);
  };

  // Selecionar/desselecionar todos
  const toggleSelectAll = () => {
    if (selectedSolicitations.size === filteredSolicitations.length) {
      setSelectedSolicitations(new Set());
    } else {
      setSelectedSolicitations(new Set(filteredSolicitations.map((s) => s.id)));
    }
  };

  // Delegar solicitações
  const handleDelegate = () => {
    if (selectedSolicitations.size === 0) {
      addAlert("error", "Nenhuma seleção", "Selecione pelo menos uma solicitação");
      return;
    }

    if (!selectedMember) {
      addAlert("error", "Membro não selecionado", "Escolha um membro da comissão");
      return;
    }

    const member = commissionMembers.find((m) => m.id === selectedMember);
    const count = selectedSolicitations.size;

    // Atualizar as solicitações com o membro delegado
    const selectedIds = Array.from(selectedSolicitations);
    updateSolicitationDelegation(selectedIds, selectedMember);

    addAlert(
      "success",
      "Solicitações delegadas",
      `${count} solicitação(ões) direcionada(s) para ${member?.name}`
    );

    // Limpar seleções
    setSelectedSolicitations(new Set());
    setSelectedMember("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <Badge className="bg-success/10 text-success border-0">Aprovado</Badge>;
      case "Em Análise":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Em Análise</Badge>;
      case "Pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Pendente</Badge>;
      case "Rejeitado":
        return <Badge className="bg-destructive/10 text-destructive border-0">Rejeitado</Badge>;
      case "Em Ajuste":
        return <Badge className="bg-warning/10 text-warning border-0">Em Ajuste</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout breadcrumb={["Início", "Solicitações de Validação", "Delegar"]}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/coordinator/approvals")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Delegar Solicitações</h1>
            <p className="text-muted-foreground">
              Selecione solicitações e direcione para um membro da comissão ajudar na validação
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Filtros */}
            <div className="space-y-4">
              <h3 className="font-semibold">Filtrar e Selecionar</h3>
              
              <div className="flex gap-3 flex-wrap items-end">
                {/* Busca */}
                <div className="flex-1 min-w-[250px]">
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    Buscar atividade ou aluno
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Seleção de Membro */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold">Destino</h3>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Selecione um membro da comissão
                </label>
                <Select value={selectedMember} onValueChange={setSelectedMember}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Escolha um membro..." />
                  </SelectTrigger>
                  <SelectContent>
                    {commissionMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </div>

            {/* Tabela de Solicitações */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Solicitações para Delegar</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredSolicitations.length} solicitações encontradas{" "}
                    {selectedSolicitations.size > 0 && `• ${selectedSolicitations.size} selecionada(s)`}
                  </p>
                </div>
                
                {filteredSolicitations.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSelectAll}
                  >
                    {selectedSolicitations.size === filteredSolicitations.length
                      ? "Desselecionar Tudo"
                      : "Selecionar Tudo"}
                  </Button>
                )}
              </div>

              {filteredSolicitations.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">Nenhuma solicitação encontrada</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 w-8">
                          <Checkbox
                            checked={
                              filteredSolicitations.length > 0 &&
                              selectedSolicitations.size === filteredSolicitations.length
                            }
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th className="text-left py-3 px-4 font-medium">Atividade</th>
                        <th className="text-left py-3 px-4 font-medium">Aluno</th>
                        <th className="text-left py-3 px-4 font-medium">Horas</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Enviada em</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSolicitations.map((s) => (
                        <tr
                          key={s.id}
                          className={`border-b hover:bg-muted/50 cursor-pointer ${
                            selectedSolicitations.has(s.id) ? "bg-blue-50" : ""
                          }`}
                        >
                          <td className="py-3 px-4" onClick={() => toggleSolicitation(s.id)}>
                            <Checkbox
                              checked={selectedSolicitations.has(s.id)}
                              onChange={() => toggleSolicitation(s.id)}
                            />
                          </td>
                          <td className="py-3 px-4 font-medium">{s.activity}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{s.studentName}</p>
                              <p className="text-xs text-muted-foreground">{s.studentMatricula}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{s.hours}h</td>
                          <td className="py-3 px-4">{getStatusBadge(s.status)}</td>
                          <td className="py-3 px-4 text-muted-foreground">{s.submitDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <div className="border-t pt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => navigate("/coordinator/approvals")}>
                Cancelar
              </Button>
              <Button
                onClick={handleDelegate}
                disabled={selectedSolicitations.size === 0 || !selectedMember}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                Delegar {selectedSolicitations.size > 0 && `(${selectedSolicitations.size})`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
