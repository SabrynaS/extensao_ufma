import { Badge } from '@/components/ui/badge';
import { StudentGroup, groupTypeLabels } from '@/data/mockData';

interface GroupTypeBadgeProps {
  type: StudentGroup['type'];
}

const typeColors: Record<StudentGroup['type'], string> = {
  diretorio_academico: 'bg-primary/10 text-primary hover:bg-primary/20',
  liga: 'bg-accent text-accent-foreground hover:bg-accent/80',
  atletica: 'bg-warning/10 text-warning hover:bg-warning/20',
  outros: 'bg-muted text-muted-foreground hover:bg-muted/80',
};

export function GroupTypeBadge({ type }: GroupTypeBadgeProps) {
  return (
    <Badge className={`${typeColors[type]} border-0`}>
      {groupTypeLabels[type]}
    </Badge>
  );
}
