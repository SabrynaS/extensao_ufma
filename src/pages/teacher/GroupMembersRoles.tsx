import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Users,
  Mail,
  Shield,
  Crown,
  Star,
  Wallet,
  User,
  ChevronDown,
  Check,
  Building2,
  History,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  groupTypeLabels,
  groupMemberRoleLabels,
  type GroupMember,
  type GroupMemberRole,
  type StudentGroup,
  RoleHistoryEntry,
  mockRoleHistory,
} from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useStudentGroups } from "@/contexts/StudentGroupsContext";
import { AppLayout } from "@/components/layout/AppLayout";

const roleIcons: Record<GroupMemberRole, React.ReactNode> = {
  diretor: <Crown className="h-4 w-4" />,
  vice: <Star className="h-4 w-4" />,
  tesoureiro: <Wallet className="h-4 w-4" />,
  membro: <User className="h-4 w-4" />,
};

const roleBadgeVariants: Record<GroupMemberRole, "diretor" | "vice" | "tesoureiro" | "membro"> = {
  diretor: "diretor",
  vice: "vice",
  tesoureiro: "tesoureiro",
  membro: "membro",
};

const roleOrder: GroupMemberRole[] = ["diretor", "vice", "tesoureiro", "membro"];

export default function GroupMemberRoles() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { groups, updateGroup } = useStudentGroups();
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [roleHistory, setRoleHistory] = useState<RoleHistoryEntry[]>(mockRoleHistory);
  const [pendingRole, setPendingRole] = useState<GroupMemberRole | null>(null);

  const group = groups.find((g) => g.responsibleTeacher.email === user?.email);
  
  const groupHistory = roleHistory
    .filter((h) => h.groupId === group?.id)
    .sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());

  if (!group) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Grupo não encontrado</h2>
            <p className="text-muted-foreground mb-4">
              O grupo solicitado não existe ou foi removido.
            </p>
            <Button onClick={() => navigate("/")}>Voltar para a lista</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sortedMembers = [...group.members].sort(
    (a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role)
  );

  const handleRoleChange = (member: GroupMember, newRole: GroupMemberRole) => {
    if (member.role === newRole) return;

    setSelectedMember(member);
    setPendingRole(newRole);
    setIsDialogOpen(true);
  };

  const confirmRoleChange = () => {
    if (!selectedMember || !pendingRole || !group || !user) return;

    const previousRole = selectedMember.role;

    updateGroup(group.id, {
      ...group,
      members: group.members.map((m) =>
        m.id === selectedMember.id ? { ...m, role: pendingRole } : m
      ),
      updatedAt: new Date().toISOString().split("T")[0],
    });

    const newHistoryEntry: RoleHistoryEntry = {
      id: Date.now().toString(), 
      groupId: group.id,
      memberId: selectedMember.id,
      memberName: selectedMember.name,
      memberMatricula: selectedMember.matricula || "N/A", 
      previousRole: previousRole,
      newRole: pendingRole,
      changedAt: new Date().toISOString(),
      changedBy: user.name || "Docente Responsável",
    };

    setRoleHistory((prevHistory) => [newHistoryEntry, ...prevHistory]);

    toast({
      title: "Cargo atualizado",
      description: `${selectedMember.name} agora é ${groupMemberRoleLabels[pendingRole]}.`,
    });

    setIsDialogOpen(false);
    setSelectedMember(null);
    setPendingRole(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppLayout breadcrumb={["Início", "Gerenciar Cargos"]}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gerenciar Cargos
        </h1>
        <p className="text-muted-foreground mt-1">
          {group.name}
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={group.status === "active" ? "active" : "inactive"}>
                  {group.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
                <Badge variant="secondary">{groupTypeLabels[group.type]}</Badge>
              </div>
              <CardTitle className="text-xl font-display">{group.name}</CardTitle>
              <CardDescription className="mt-1">{group.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">
                <span className="font-medium text-foreground">Responsável:</span>{" "}
                {group.responsibleTeacher.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">{group.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 shrink-0 text-primary" />
              <span>{group.members.length} membros</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-5">
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Cargos disponíveis
          </h3>
          <div className="flex flex-wrap gap-2">
            {roleOrder.map((role) => (
              <div
                key={role}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border text-sm"
              >
                <span className="text-muted-foreground">{roleIcons[role]}</span>
                <span className="font-medium">{groupMemberRoleLabels[role]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-semibold">Membros do Grupo</h2>
        </div>

        {sortedMembers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Este grupo ainda não possui membros.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {sortedMembers.map((member, index) => (
              <Card
                key={member.id}
                className="card-hover animate-slide-up"
                style={{ animationDelay: `${0.15 + index * 0.05}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 shrink-0 border-2 border-primary/10">
                      <AvatarFallback className="bg-primary/5 text-primary font-semibold">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-foreground truncate">
                          {member.name}
                        </span>
                        <Badge variant={roleBadgeVariants[member.role]} className="shrink-0">
                          {roleIcons[member.role]}
                          <span className="ml-1">{groupMemberRoleLabels[member.role]}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {member.matricula}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="shrink-0">
                          <span className="hidden sm:inline mr-1">Alterar cargo</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                          Selecione o cargo
                        </div>
                        <DropdownMenuSeparator />
                        {roleOrder.map((role) => (
                          <DropdownMenuItem
                            key={role}
                            onClick={() => handleRoleChange(member, role)}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">
                                {roleIcons[role]}
                              </span>
                              <span>{groupMemberRoleLabels[role]}</span>
                            </div>
                            {member.role === role && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-display font-semibold">Histórico de Cargos</h2>
        </div>

        {groupHistory.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <History className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">
                Nenhuma alteração de cargo registrada.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {groupHistory.map((entry, index) => (
              <Card
                key={entry.id}
                className="animate-slide-up"
                style={{ animationDelay: `${0.4 + index * 0.05}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-foreground">
                          {entry.memberName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({entry.memberMatricula})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {entry.previousRole ? (
                          <>
                            <Badge variant={roleBadgeVariants[entry.previousRole]} className="text-xs">
                              {groupMemberRoleLabels[entry.previousRole]}
                            </Badge>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Ingresso como</span>
                        )}
                        <Badge variant={roleBadgeVariants[entry.newRole]} className="text-xs">
                          {groupMemberRoleLabels[entry.newRole]}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground text-right shrink-0">
                      <p className="font-medium text-foreground/80">{entry.changedBy}</p>
                      <p className="text-xs">
                        {format(new Date(entry.changedAt), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="flex gap-3">
          <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">
              Permissões do Docente Responsável
            </p>
            <p className="text-muted-foreground">
              Como docente responsável pelo grupo, você pode atribuir ou remover cargos
              dos membros. Os cargos disponíveis são: Diretor, Vice-Diretor, Tesoureiro e
              Membro.
            </p>
          </div>
        </div>
      </div>

      {/* --- Diálogo de Confirmação de Alteração --- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Confirmar alteração de cargo</DialogTitle>
            <DialogDescription>
              Você está prestes a alterar o cargo de um membro do grupo.
            </DialogDescription>
          </DialogHeader>

          {selectedMember && pendingRole && (
            <div className="py-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <Avatar className="h-12 w-12 border-2 border-primary/10">
                  <AvatarFallback className="bg-primary/5 text-primary font-semibold">
                    {getInitials(selectedMember.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{selectedMember.name}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <Badge variant={roleBadgeVariants[selectedMember.role]}>
                      {groupMemberRoleLabels[selectedMember.role]}
                    </Badge>
                    <span className="text-muted-foreground">→</span>
                    <Badge variant={roleBadgeVariants[pendingRole]}>
                      {groupMemberRoleLabels[pendingRole]}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmRoleChange}>Confirmar alteração</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}