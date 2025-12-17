import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StudentGroup } from '@/data/mockData';
import { Mail, Crown } from 'lucide-react';

interface MembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: StudentGroup | null;
}

export function MembersDialog({ open, onOpenChange, group }: MembersDialogProps) {
  if (!group) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Membros - {group.name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {group.members.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Este grupo não possui membros cadastrados.
            </div>
          ) : (
            <div className="space-y-3">
              {group.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{member.name}</p>
                      {member.role === 'diretor' && (
                        <Badge className="bg-warning/10 text-warning hover:bg-warning/20 border-0 flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          Coordenador
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 truncate">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
