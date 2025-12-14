import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function CoordinatorSettings() {
  const { toast } = useToast();
  const [allocationRule, setAllocationRule] = useState('flexible');

  return (
    <AppLayout breadcrumb={['Início', 'Configurações do Curso']}>
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold text-primary">Configurações do Curso</h1><p className="text-muted-foreground">Gerencie o PPC, regras de validação e comissões avaliadoras</p></div>
        <Card><CardContent className="p-6">
          <Tabs defaultValue="ppc"><TabsList className="w-full justify-start"><TabsTrigger value="data">Dados do Curso</TabsTrigger><TabsTrigger value="ppc">PPC Vigente</TabsTrigger><TabsTrigger value="validation">Regras de Validação</TabsTrigger><TabsTrigger value="committees">Comissões</TabsTrigger></TabsList>
            <TabsContent value="ppc" className="mt-6 space-y-6">
              <div><h3 className="font-semibold mb-2">Parâmetros de Extensão - PPC Vigente</h3><p className="text-sm text-muted-foreground">Defina as regras e requisitos de horas complementares de extensão (RF059, RF064)</p></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2"><Label>Carga Horária Total Exigida</Label><div className="flex gap-2"><Input defaultValue="300" /><span className="flex items-center text-sm text-muted-foreground">horas</span></div><p className="text-xs text-muted-foreground">Total de horas de extensão necessárias para conclusão do curso</p></div>
                <div className="space-y-2"><Label>Versão do PPC</Label><Input defaultValue="PPC 2024.1" /><p className="text-xs text-muted-foreground">Identificação da versão atual do projeto pedagógico</p></div>
              </div>
              <div className="space-y-4"><Label>Regra de Alocação Modular (RF064)</Label><p className="text-sm text-muted-foreground mb-3">Define como as horas de extensão podem ser distribuídas entre diferentes categorias</p>
                <RadioGroup value={allocationRule} onValueChange={setAllocationRule} className="space-y-3">
                  <div className={`p-4 rounded-lg border ${allocationRule === 'flexible' ? 'border-primary bg-primary/5' : ''}`}><div className="flex items-center gap-3"><RadioGroupItem value="flexible" id="flexible" /><div><Label htmlFor="flexible" className="text-base font-medium cursor-pointer">100% Flexível</Label><p className="text-sm text-muted-foreground">O aluno pode cumprir as 300h em qualquer categoria de atividade, sem restrições de distribuição.</p></div></div></div>
                  <div className={`p-4 rounded-lg border ${allocationRule === 'modular' ? 'border-primary bg-primary/5' : ''}`}><div className="flex items-center gap-3"><RadioGroupItem value="modular" id="modular" /><div><Label htmlFor="modular" className="text-base font-medium cursor-pointer">Modular (Distribuição Obrigatória)</Label><p className="text-sm text-muted-foreground">As horas devem ser distribuídas entre categorias específicas conforme percentuais definidos.</p></div></div></div>
                </RadioGroup>
              </div>
              <div className="space-y-2"><Label>Anexo do Documento PPC (PDF)</Label><p className="text-sm text-muted-foreground mb-3">Faça upload do documento oficial do Projeto Pedagógico do Curso</p><div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50"><Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" /><p className="text-sm text-muted-foreground">Arraste o arquivo ou clique para selecionar</p></div></div>
              <Button onClick={() => toast({ title: 'Configurações salvas!', description: 'As configurações do PPC foram atualizadas.' })}>Salvar Configurações</Button>
            </TabsContent>
            <TabsContent value="data"><div className="py-12 text-center text-muted-foreground">Dados gerais do curso</div></TabsContent>
            <TabsContent value="validation"><div className="py-12 text-center text-muted-foreground">Configuração de regras de validação</div></TabsContent>
            <TabsContent value="committees"><div className="py-12 text-center text-muted-foreground">Gerenciamento de comissões avaliadoras</div></TabsContent>
          </Tabs>
        </CardContent></Card>
      </div>
    </AppLayout>
  );
}
