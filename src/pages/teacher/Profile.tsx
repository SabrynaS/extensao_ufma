import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import { useState } from 'react';

export default function TeacherProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    department: 'Ciência da Computação',
    siape: '1234567',
    specialization: 'Engenharia de Software',
    bio: 'Professor dedicado ao ensino de desenvolvimento de software e extensão acadêmica.',
    lattes: 'http://lattes.cnpq.br/1234567890123456',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aqui seria feita uma chamada para salvar os dados
    console.log('Dados salvos:', formData);
  };

  const getInitials = () => {
    return user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'JD';
  };

  return (
    <AppLayout breadcrumb={['Início', 'Perfil']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
            <p className="text-muted-foreground mt-2">Gerenciar informações pessoais e profissionais</p>
          </div>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            variant={isEditing ? 'default' : 'outline'}
            className="gap-2"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Salvar
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Editar
              </>
            )}
          </Button>
          {isEditing && (
            <Button
              onClick={() => setIsEditing(false)}
              variant="ghost"
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Cancelar
            </Button>
          )}
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-700">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-muted-foreground mb-3">Docente • {formData.department}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  {formData.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{formData.phone}</span>
                    </div>
                  )}
                  {formData.siape && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>SIAPE: {formData.siape}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          {/* Informações Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled
                  />
                ) : (
                  <p className="text-sm text-foreground">{formData.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Institucional</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled
                  />
                ) : (
                  <p className="text-sm text-foreground">{formData.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    placeholder="(XX) 9XXXX-XXXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-foreground">{formData.phone || 'Não informado'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="siape">SIAPE</Label>
                {isEditing ? (
                  <Input
                    id="siape"
                    value={formData.siape}
                    onChange={(e) => handleInputChange('siape', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-foreground">{formData.siape}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informações Profissionais */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                {isEditing ? (
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-foreground">{formData.department}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Especialização</Label>
                {isEditing ? (
                  <Input
                    id="specialization"
                    placeholder="Digite sua especialização"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-foreground">{formData.specialization || 'Não informado'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lattes">Currículo Lattes</Label>
                {isEditing ? (
                  <Input
                    id="lattes"
                    placeholder="URL do Lattes"
                    value={formData.lattes}
                    onChange={(e) => handleInputChange('lattes', e.target.value)}
                    type="url"
                  />
                ) : (
                  <p className="text-sm text-blue-600 truncate">
                    {formData.lattes ? (
                      <a href={formData.lattes} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {formData.lattes}
                      </a>
                    ) : (
                      'Não informado'
                    )}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Biografia */}
        <Card>
          <CardHeader>
            <CardTitle>Biografia Profissional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Sobre você</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  placeholder="Descreva um pouco sobre você e sua atuação profissional"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={5}
                />
              ) : (
                <p className="text-sm text-foreground">{formData.bio || 'Nenhuma biografia informada'}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Áreas de Atuação */}
        <Card>
          <CardHeader>
            <CardTitle>Áreas de Atuação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Desenvolvimento de Software</Badge>
              <Badge>Engenharia de Software</Badge>
              <Badge>Extensão Acadêmica</Badge>
              <Badge>Liderança de Grupos</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Credenciais e Segurança */}
        <Card>
          <CardHeader>
            <CardTitle>Credenciais e Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">Senha</p>
                  <p className="text-xs text-muted-foreground">Última alteração há 3 meses</p>
                </div>
                <Button variant="outline" size="sm">
                  Alterar Senha
                </Button>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">Autenticação de Dois Fatores</p>
                  <p className="text-xs text-muted-foreground">Não ativado</p>
                </div>
                <Badge variant="secondary">Desativado</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
