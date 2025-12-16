import { Badge } from '@/components/ui/badge';

interface GroupStatusBadgeProps {
  status: 'active' | 'inactive';
}

export function GroupStatusBadge({ status }: GroupStatusBadgeProps) {
  if (status === 'active') {
    return (
      <Badge className="bg-success/10 text-success hover:bg-success/20 border-0">
        Ativo
      </Badge>
    );
  }

  return (
    <Badge className="bg-muted text-muted-foreground hover:bg-muted/80 border-0">
      Inativo
    </Badge>
  );
}
