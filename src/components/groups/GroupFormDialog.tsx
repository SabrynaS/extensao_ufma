import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StudentGroup, groupTypeLabels } from '@/data/mockData';
import { mockTeachers, mockStudents } from '@/data/mockData';

interface GroupFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: StudentGroup | null;
  onSave: (group: Partial<StudentGroup>) => void;
}

export function GroupFormDialog({
  open,
  onOpenChange,
  group,
  onSave,
}: GroupFormDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    type: 'outros' as StudentGroup['type'],
    responsibleTeacherId: '',
    coordinatorId: '',
  });

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name,
        description: group.description,
        email: group.email,
        type: group.type,
        responsibleTeacherId: group.responsibleTeacher.id,
        coordinatorId: group.coordinator?.id || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        email: '',
        type: 'outros',
        responsibleTeacherId: '',
        coordinatorId: '',
      });
    }
  }, [group, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const teacher = mockTeachers.find((t) => t.id === formData.responsibleTeacherId);
    const coordinator = mockStudents.find((s) => s.id === formData.coordinatorId);

    onSave({
      ...group,
      name: formData.name,
      description: formData.description,
      email: formData.email,
      type: formData.type,
      responsibleTeacher: teacher ? { id: teacher.id, name: teacher.name } : group?.responsibleTeacher,
      coordinator: coordinator
        ? { id: coordinator.id, name: coordinator.name, email: coordinator.email, role: 'coordinator' }
        : undefined,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {group ? 'Editar Grupo' : 'Novo Grupo'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Grupo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Diretório Acadêmico de Medicina"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: StudentGroup['type']) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {Object.entries(groupTypeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o propósito do grupo..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail de Contato *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="grupo@universidade.edu.br"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacher">Docente Responsável *</Label>
            <Select
              value={formData.responsibleTeacherId}
              onValueChange={(value) =>
                setFormData({ ...formData, responsibleTeacherId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o docente" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {mockTeachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coordinator">Discente Coordenador</Label>
            <Select
              value={formData.coordinatorId}
              onValueChange={(value) =>
                setFormData({ ...formData, coordinatorId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o coordenador" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {mockStudents.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {group ? 'Salvar Alterações' : 'Criar Grupo'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}