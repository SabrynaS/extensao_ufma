import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { groupTypeLabels, mockGroups, StudentGroup } from "@/data/mockData";
import { AlertTriangle, Badge, CheckCircle, Download, Eye, Filter, Network, Plus, PlusCircle, Search, TrendingUp, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { GroupsTable } from "@/components/groups/GroupsTable";
import { GroupFormDialog } from "@/components/groups/GroupFormDialog";
import { MembersDialog } from "@/components/groups/MembersDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GroupsManagement() {
  const [groups, setGroups] = useState<StudentGroup[]>(mockGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<StudentGroup | null>(null);
  
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [viewingGroup, setViewingGroup] = useState<StudentGroup | null>(null);

  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.responsibleTeacher.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || group.status === statusFilter;
      const matchesType = typeFilter === 'all' || group.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [groups, searchTerm, statusFilter, typeFilter]);

  const handleCreateGroup = () => {
    setEditingGroup(null);
    setIsFormOpen(true);
  };

  const handleEditGroup = (group: StudentGroup) => {
    setEditingGroup(group);
    setIsFormOpen(true);
  };

  const handleSaveGroup = (groupData: Partial<StudentGroup>) => {
    if (editingGroup) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === editingGroup.id
            ? { ...g, ...groupData, updatedAt: new Date().toISOString().split('T')[0] }
            : g
        )
      );
      toast({ title: 'Grupo atualizado com sucesso!' });
    } else {
      const newGroup: StudentGroup = {
        id: String(Date.now()),
        name: groupData.name || '',
        description: groupData.description || '',
        email: groupData.email || '',
        type: groupData.type || 'outros',
        responsibleTeacher: groupData.responsibleTeacher || { id: '', name: '', email: '' },
        coordinator: groupData.coordinator,
        members: groupData.coordinator ? [groupData.coordinator] : [],
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setGroups((prev) => [...prev, newGroup]);
      toast({ title: 'Grupo criado com sucesso!' });
    }
  };

  const handleToggleStatus = (group: StudentGroup) => {
    const newStatus = group.status === 'active' ? 'inactive' : 'active';
    setGroups((prev) =>
      prev.map((g) =>
        g.id === group.id
          ? { ...g, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
          : g
      )
    );
    toast({
      title: newStatus === 'active' ? 'Grupo Ativado' : 'Grupo Inativado',
    });
  };

  const handleViewMembers = (group: StudentGroup) => {
    setViewingGroup(group);
    setIsMembersOpen(true);
  };

  const stats = useMemo(() => ({
    total: groups.length,
    active: groups.filter((g) => g.status === 'active').length,
    inactive: groups.filter((g) => g.status === 'inactive').length,
  }), [groups]);

  const handlwDownloadFile = () => {
    toast({ title: `Download do arquivo iniciado.` });
  }
 
  return (
    <AppLayout breadcrumb={['Início', 'Gerenciar Grupos']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Gestão de Grupos - Ciência da Computação</h1>
          <p className="text-muted-foreground">Gerencie os grupos acadêmicos, ligas, atléticas e diretórios</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total de Grupos</span>
              </div>
              <p className="text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Grupos Ativos</span>
              </div>
              <p className="text-2xl font-bold text-success">{stats.active}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Grupos Inativos</span>
              </div>
              <p className="text-2xl font-bold text-destructive">{stats.inactive}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6"> 
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar por nome, e-mail ou docente..." 
                    className="pl-9" value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                  />
                </div>

                <div className="flex gap-3 text-black border-1 border-black pl-10 bg-card">
                  <Select value={statusFilter} onValueChange={(v: 'all' | 'active' | 'inactive') => setStatusFilter(v)}>
                    <SelectTrigger  className="w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Ativos</SelectItem>
                      <SelectItem value="inactive">Inativos</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px] bg-card">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      {Object.entries(groupTypeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" onClick={handlwDownloadFile}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Lista
                </Button>

                <Button onClick={handleCreateGroup} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Grupo
                </Button>
            </div>

            {/* Table */}
            {filteredGroups.length > 0 ? (
              <GroupsTable
                groups={filteredGroups}
                onEdit={handleEditGroup}
                onToggleStatus={handleToggleStatus}
                onViewMembers={handleViewMembers}
              />
            ) : (
              <div className="bg-card rounded-lg card-shadow p-12 text-center">
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                    ? 'Nenhum grupo encontrado com os filtros aplicados.'
                    : 'Nenhum grupo cadastrado ainda.'}
                </p>
                {!searchTerm && statusFilter === 'all' && typeFilter === 'all' && (
                  <Button onClick={handleCreateGroup} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Grupo
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialogs */}
        <GroupFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          group={editingGroup}
          onSave={handleSaveGroup}
        />

        <MembersDialog
          open={isMembersOpen}
          onOpenChange={setIsMembersOpen}
          group={viewingGroup}
        />
      </div>


    </AppLayout>
  );
}