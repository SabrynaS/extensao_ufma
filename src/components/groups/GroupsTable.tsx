import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Power, Users } from 'lucide-react';
import { StudentGroup } from '@/data/mockData';
import { GroupStatusBadge } from './GroupStatusBadge';
import { GroupTypeBadge } from './GroupTypeBadge';

interface GroupsTableProps {
  groups: StudentGroup[];
  onEdit: (group: StudentGroup) => void;
  onToggleStatus: (group: StudentGroup) => void;
  onViewMembers: (group: StudentGroup) => void;
}

export function GroupsTable({
  groups,
  onEdit,
  onToggleStatus,
  onViewMembers,
}: GroupsTableProps) {
  return (
    <div className="bg-card rounded-lg card-shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-table-header hover:bg-table-header">
            <TableHead className="font-semibold">Nome</TableHead>
            <TableHead className="font-semibold">Tipo</TableHead>
            <TableHead className="font-semibold">Docente Responsável</TableHead>
            <TableHead className="font-semibold">Coordenador</TableHead>
            <TableHead className="font-semibold text-center">Membros</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold w-[60px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <TableRow
              key={group.id}
              className="hover:bg-table-hover transition-colors"
            >
              <TableCell>
                <div>
                  <p className="font-medium">{group.name}</p>
                  <p className="text-sm text-muted-foreground truncate max-w-[250px]">
                    {group.email}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <GroupTypeBadge type={group.type} />
              </TableCell>
              <TableCell className="text-sm">
                {group.responsibleTeacher.name}
              </TableCell>
              <TableCell className="text-sm">
                {group.coordinator?.name || (
                  <span className="text-muted-foreground">Não definido</span>
                )}
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                  {group.members.length}
                </span>
              </TableCell>
              <TableCell>
                <GroupStatusBadge status={group.status} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover w-48">
                    <DropdownMenuItem onClick={() => onEdit(group)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onViewMembers(group)}>
                      <Users className="h-4 w-4 mr-2" />
                      Ver Membros
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onToggleStatus(group)}
                      className={group.status === 'active' ? 'text-destructive' : 'text-success'}
                    >
                      <Power className="h-4 w-4 mr-2" />
                      {group.status === 'active' ? 'Inativar' : 'Ativar'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}