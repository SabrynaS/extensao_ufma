import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit, Mail, Users } from "lucide-react";
import { useState } from "react";
import { useCommission, CommissionMember } from "@/contexts/CommissionContext";
import { useAlerts } from "@/hooks/useAlerts";

export default function CommissionManagement() {
  const { members, addMember, updateMember, deleteMember } = useCommission();
  const { addAlert } = useAlerts();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<CommissionMember | null>(null);

  const [formData, setFormData] = useState<Omit<CommissionMember, "id">>({
    name: "",
    email: "",
    role: "docente",
  });

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = () => {
    // Validação
    if (!formData.name.trim()) {
      addAlert("error", "Campo obrigatório", "Digite o nome do membro");
      return;
    }

    if (!formData.email.trim()) {
      addAlert("error", "Campo obrigatório", "Digite o email do membro");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      addAlert("error", "Email inválido", "Digite um email válido");
      return;
    }

    // Verificar se email já existe
    if (members.some((m) => m.email === formData.email)) {
      addAlert("error", "Email duplicado", "Já existe um membro com esse email");
      return;
    }

    addMember({
      id: `cm${Date.now()}`,
      ...formData,
    });

    addAlert("success", "Membro adicionado", `${formData.name} foi adicionado à comissão`);

    setFormData({ name: "", email: "", role: "docente" });
    setIsAddOpen(false);
  };

  const handleEditMember = () => {
    if (!selectedMember) return;

    if (!formData.name.trim()) {
      addAlert("error", "Campo obrigatório", "Digite o nome do membro");
      return;
    }

    if (!formData.email.trim()) {
      addAlert("error", "Campo obrigatório", "Digite o email do membro");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      addAlert("error", "Email inválido", "Digite um email válido");
      return;
    }

    // Verificar se email já existe (excluindo o membro atual)
    if (members.some((m) => m.email === formData.email && m.id !== selectedMember.id)) {
      addAlert("error", "Email duplicado", "Já existe outro membro com esse email");
      return;
    }

    updateMember(selectedMember.id, {
      id: selectedMember.id,
      ...formData,
    });

    addAlert("success", "Membro atualizado", `${formData.name} foi atualizado com sucesso`);

    setFormData({ name: "", email: "", role: "docente" });
    setSelectedMember(null);
    setIsEditOpen(false);
  };

  const handleDeleteMember = () => {
    if (!selectedMember) return;

    deleteMember(selectedMember.id);

    addAlert("success", "Membro removido", `${selectedMember.name} foi removido da comissão`);

    setSelectedMember(null);
    setIsDeleteOpen(false);
  };

  const openEditDialog = (member: CommissionMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role,
    });
    setIsEditOpen(true);
  };

  const openDeleteDialog = (member: CommissionMember) => {
    setSelectedMember(member);
    setIsDeleteOpen(true);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "docente":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Docente</Badge>;
      case "comissao":
        return <Badge className="bg-purple-100 text-purple-800 border-0">Comissão</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <AppLayout breadcrumb={["Início", "Comissão", "Gerenciar"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Gerenciar Comissão de Validação</h1>
            <p className="text-muted-foreground">
              Adicione, edite ou remova membros da comissão de validação
            </p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Membro
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Membro</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Nome</label>
                  <Input
                    placeholder="Ex: Prof. Dr. João Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">Email</label>
                  <Input
                    type="email"
                    placeholder="Ex: joao.silva@ufma.br"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">Papel</label>
                  <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="docente">Docente</SelectItem>
                      <SelectItem value="comissao">Membro da Comissão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddMember}>Adicionar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            {/* Busca */}
            <div>
              <label className="text-sm font-medium block mb-2">Buscar membro</label>
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Tabela de Membros */}
            <div className="border-t pt-6">
              {filteredMembers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">Nenhum membro encontrado</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Nome</th>
                        <th className="text-left py-3 px-4 font-medium">Email</th>
                        <th className="text-left py-3 px-4 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">{member.name}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="w-4 h-4" />
                              {member.email}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(member)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => openDeleteDialog(member)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog de Edição */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Membro</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Nome</label>
              <Input
                placeholder="Ex: Prof. Dr. João Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <Input
                type="email"
                placeholder="Ex: joao.silva@ufma.br"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Papel</label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="docente">Docente</SelectItem>
                  <SelectItem value="comissao">Membro da Comissão</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditMember}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Remover Membro da Comissão?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover <strong>{selectedMember?.name}</strong> da comissão? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteMember} className="bg-destructive text-white hover:bg-destructive/90">
            Remover
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
