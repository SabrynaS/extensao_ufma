import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  groupTypeLabels,
  groupMemberRoleLabels,
  type GroupMember,
  type GroupMemberRole,
  type StudentGroup,
  mockGroups,
  groupsThatStudentIsPartOf,
} from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import {
  Crown,
  Star,
  Wallet,
  User,
  ChevronDown,
  Plus,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate  } from "react-router-dom";

const roleIcons: Record<GroupMemberRole, React.ReactNode> = {
  diretor: <Crown className="h-4 w-4" />,
  vice: <Star className="h-4 w-4" />,
  tesoureiro: <Wallet className="h-4 w-4" />,
  membro: <User className="h-4 w-4" />,
};

export default function MyGroups() {
  const [groups, setGroups] = useState<StudentGroup[]>(groupsThatStudentIsPartOf);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<StudentGroup | null>(null);
  const [isEditMembersOpen, setIsEditMembersOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberMatricula, setNewMemberMatricula] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<GroupMemberRole>("membro");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const handleAddMember = () => {
    if (
      !selectedGroup ||
      !newMemberName ||
      !newMemberEmail ||
      !newMemberMatricula
    ) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    const newMember: GroupMember = {
      id: Date.now().toString(),
      name: newMemberName,
      email: newMemberEmail,
      matricula: newMemberMatricula,
      role: newMemberRole,
    };

    const updatedGroup = {
      ...selectedGroup,
      members: [...selectedGroup.members, newMember],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    const updatedGroups = groups.map((g) =>
      g.id === selectedGroup.id ? updatedGroup : g
    );
    setGroups(updatedGroups);
    setSelectedGroup(updatedGroup);

    toast({
      title: "Membro adicionado",
      description: `${newMemberName} foi adicionado ao grupo.`,
    });

    setNewMemberName("");
    setNewMemberEmail("");
    setNewMemberMatricula("");
    setNewMemberRole("membro");
    setIsAddMemberOpen(false);
  };

  const handleRemoveMember = (memberId: string) => {
    if (!selectedGroup) return;

    const updatedGroup = {
      ...selectedGroup,
      members: selectedGroup.members.filter((m) => m.id !== memberId),
      updatedAt: new Date().toISOString().split("T")[0],
    };

    const updatedGroups = groups.map((g) =>
      g.id === selectedGroup.id ? updatedGroup : g
    );
    setGroups(updatedGroups);
    setSelectedGroup(updatedGroup);

    toast({
      title: "Membro removido",
      description: "O membro foi removido do grupo.",
    });
  };

  const handleChangeMemberRole = (
    member: GroupMember,
    newRole: GroupMemberRole
  ) => {
    if (!selectedGroup) return;

    const updatedGroup = {
      ...selectedGroup,
      members: selectedGroup.members.map((m) =>
        m.id === member.id ? { ...m, role: newRole } : m
      ),
      updatedAt: new Date().toISOString().split("T")[0],
    };

    const updatedGroups = groups.map((g) =>
      g.id === selectedGroup.id ? updatedGroup : g
    );
    setGroups(updatedGroups);
    setSelectedGroup(updatedGroup);

    toast({
      title: "Cargo atualizado",
      description: `${member.name} agora é ${groupMemberRoleLabels[newRole]}.`,
    });
  };

  return (
    <AppLayout breadcrumb={["Início", "Meus Grupos Acadêmicos"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Meus Grupos Acadêmicos</h1>
          <p className="text-slate-600">
            Gerencie os membros e cargos dos seus grupos
          </p>
        </div>

        {groups.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Nenhum grupo disponível.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <Card
                key={group.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedGroup(group);
                  setIsEditMembersOpen(true);
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {group.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {groupTypeLabels[group.type]}
                    </Badge>
                    <Badge
                      className={
                        group.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {group.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {group.members.length} membro
                    {group.members.length !== 1 ? "s" : ""}
                  </div>
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGroup(group);
                      setIsEditMembersOpen(true);
                    }}
                  >
                    Gerenciar Membros
                  </Button>
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Redirecting to /events/create');
                      navigate('/events/create')
                    }}
                  >
                    Criar Novas Oportunidades
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Dialog para gerenciar membros */}
      <Dialog open={isEditMembersOpen} onOpenChange={setIsEditMembersOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedGroup?.name}</DialogTitle>
            <DialogDescription>Gerencie os membros do grupo</DialogDescription>
          </DialogHeader>

          {selectedGroup && (
            <div className="space-y-6">
              {/* Lista de membros */}
              <div>
                <h3 className="font-semibold mb-3">
                  Membros ({selectedGroup.members.length})
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedGroup.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {member.matricula}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              disabled={member.role === "diretor"}
                            >
                              {roleIcons[member.role]}
                              {groupMemberRoleLabels[member.role]}
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {(
                              [
                                "diretor",
                                "vice",
                                "tesoureiro",
                                "membro",
                              ] as GroupMemberRole[]
                            ).map((role) => (
                              <DropdownMenuItem
                                key={role}
                                onClick={() =>
                                  handleChangeMemberRole(member, role)
                                }
                              >
                                {groupMemberRoleLabels[role]}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={member.role === "diretor"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Adicionar novo membro */}
              {!isAddMemberOpen ? (
                <Button
                  onClick={() => setIsAddMemberOpen(true)}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Membro
                </Button>
              ) : (
                <div className="space-y-3 p-4 border border-slate-200 rounded-lg bg-slate-50">
                  <h4 className="font-medium">Novo Membro</h4>

                  <div>
                    <Label htmlFor="name" className="text-sm">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="Nome completo"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="email@ufma.br"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="matricula" className="text-sm">
                      Matrícula
                    </Label>
                    <Input
                      id="matricula"
                      value={newMemberMatricula}
                      onChange={(e) => setNewMemberMatricula(e.target.value)}
                      placeholder="2021001234"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role" className="text-sm">
                      Cargo
                    </Label>
                    <Select
                      value={newMemberRole}
                      onValueChange={(value) =>
                        setNewMemberRole(value as GroupMemberRole)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(
                          [
                            "diretor",
                            "vice",
                            "tesoureiro",
                            "membro",
                          ] as GroupMemberRole[]
                        ).map((role) => (
                          <SelectItem key={role} value={role}>
                            {groupMemberRoleLabels[role]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddMember} className="flex-1">
                      Adicionar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddMemberOpen(false);
                        setNewMemberName("");
                        setNewMemberEmail("");
                        setNewMemberMatricula("");
                        setNewMemberRole("membro");
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditMembersOpen(false)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
