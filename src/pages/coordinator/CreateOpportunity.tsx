import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
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
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useAlerts } from '@/hooks/useAlerts';
import { useOpportunities } from '@/contexts/OpportunitiesContext';
import { v4 as uuidv4 } from 'uuid';

export default function CreateOpportunityPage() {
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const { addCoordinatorOpportunity } = useOpportunities();

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    hours: '',
    slots: '',
    instructor: '',
    validation: 'Manual',
    startDate: '',
    endDate: '',
    studentResponsible: '',
    period: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obrigatórios
    const requiredFields = ['title', 'type', 'description', 'hours', 'slots', 'instructor', 'startDate', 'endDate'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (emptyFields.length > 0) {
      addAlert('error', 'Campos obrigatórios', 'Todos os campos marcados com * são obrigatórios.');
      return;
    }

    // Criar nova oportunidade
    const newOpportunity = {
      id: uuidv4(),
      title: formData.title,
      type: formData.type as 'Curso' | 'Workshop' | 'Projeto' | 'Evento' | 'Liga',
      description: formData.description,
      hours: parseInt(formData.hours),
      slots: parseInt(formData.slots),
      filledSlots: 0,
      date: new Date().toLocaleDateString('pt-BR'),
      instructor: formData.instructor,
      status: 'Ativo' as const,
      validation: formData.validation as 'Automática' | 'Manual',
      startDate: formData.startDate,
      endDate: formData.endDate,
      studentResponsible: formData.studentResponsible || undefined,
      period: formData.period || undefined,
      createdAt: new Date().toISOString(),
    };

    addCoordinatorOpportunity(newOpportunity);

    addAlert('success', 'Oportunidade criada', `${formData.title} foi criada com sucesso.`);

    setTimeout(() => {
      navigate('/coordinator/opportunities');
    }, 1500);
  };

  return (
    <AppLayout breadcrumb={['Início', 'Gestão de Oportunidades', 'Criar Oportunidade']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/coordinator/opportunities')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Criar Nova Oportunidade</h1>
            <p className="text-muted-foreground">Preencha os dados para cadastrar uma nova oportunidade de extensão</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações Básicas</h3>

                <div className="space-y-2">
                  <Label htmlFor="title">Título da Oportunidade *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Curso de Python para Iniciantes"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Oportunidade *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="Curso">Curso</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Projeto">Projeto</SelectItem>
                        <SelectItem value="Evento">Evento</SelectItem>
                        <SelectItem value="Liga">Liga</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validation">Tipo de Validação *</Label>
                    <Select
                      value={formData.validation}
                      onValueChange={(value) =>
                        setFormData({ ...formData, validation: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a validação" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="Automática">Automática</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva a oportunidade, conteúdo, objetivos..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="min-h-24"
                    required
                  />
                </div>
              </div>

              {/* Dados Específicos */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Dados Específicos</h3>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Carga Horária (Horas) *</Label>
                    <Input
                      id="hours"
                      type="number"
                      placeholder="Ex: 40"
                      value={formData.hours}
                      onChange={(e) =>
                        setFormData({ ...formData, hours: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slots">Vagas Disponíveis *</Label>
                    <Input
                      id="slots"
                      type="number"
                      placeholder="Ex: 30"
                      value={formData.slots}
                      onChange={(e) =>
                        setFormData({ ...formData, slots: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="period">Período (Semestre)</Label>
                    <Input
                      id="period"
                      placeholder="Ex: 2025.2"
                      value={formData.period}
                      onChange={(e) =>
                        setFormData({ ...formData, period: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data de Início *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data de Término *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Responsável */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Responsáveis</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Docente Responsável *</Label>
                    <Input
                      id="instructor"
                      placeholder="Ex: Dr. João Silva"
                      value={formData.instructor}
                      onChange={(e) =>
                        setFormData({ ...formData, instructor: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentResponsible">Aluno Responsável (Opcional)</Label>
                    <Input
                      id="studentResponsible"
                      placeholder="Nome do aluno ou monitor"
                      value={formData.studentResponsible}
                      onChange={(e) =>
                        setFormData({ ...formData, studentResponsible: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-6 border-t">
                <Button
                  type="submit"
                  className="flex-1"
                >
                  Criar Oportunidade
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate('/coordinator/opportunities')}
                >
                  Cancelar
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                * Campos obrigatórios
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
