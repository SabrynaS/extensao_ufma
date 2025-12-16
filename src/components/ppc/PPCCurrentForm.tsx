import { useState } from 'react';
import { Upload } from 'lucide-react';
import { PPCVersion, AllocationRule } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PPCCurrentFormProps {
  currentVersion: PPCVersion | null;
  onSave: (data: Partial<PPCVersion>) => void;
}

export function PPCCurrentForm({ currentVersion, onSave }: PPCCurrentFormProps) {
  const [totalHours, setTotalHours] = useState(currentVersion?.totalHours || 300);
  const [version, setVersion] = useState(currentVersion?.version || '');
  const [allocationRule, setAllocationRule] = useState<AllocationRule>(
    currentVersion?.allocationRule || 'flexible'
  );

  const handleSubmit = () => {
    onSave({
      totalHours,
      version,
      allocationRule,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Parâmetros de Extensão - PPC Vigente</h3>
        <p className="text-sm text-muted-foreground">
          Defina as regras e requisitos de horas complementares de extensão (RF059, RF064)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="totalHours">Carga Horária Total Exigida</Label>
          <div className="flex items-center gap-2">
            <Input
              id="totalHours"
              type="number"
              value={totalHours}
              onChange={(e) => setTotalHours(Number(e.target.value))}
              className="bg-background"
            />
            <span className="text-sm text-muted-foreground">horas</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Total de horas de extensão necessárias para conclusão do curso
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="version">Versão do PPC</Label>
          <Input
            id="version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="PPC 2024.1"
            className="bg-background"
          />
          <p className="text-xs text-muted-foreground">
            Identificação da versão atual do projeto pedagógico
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-base">Regra de Alocação Modular </Label>
          <p className="text-sm text-muted-foreground">
            Define como as horas de extensão podem ser distribuídas entre diferentes categorias
          </p>
        </div>

        <RadioGroup
          value={allocationRule}
          onValueChange={(value) => setAllocationRule(value as AllocationRule)}
          className="space-y-3"
        >
          <div
            className={`flex items-start space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
              allocationRule === 'flexible'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:bg-muted/50'
            }`}
            onClick={() => setAllocationRule('flexible')}
          >
            <RadioGroupItem value="flexible" id="flexible" className="mt-1" />
            <div className="space-y-1">
              <Label htmlFor="flexible" className="font-medium cursor-pointer">
                100% Flexível
              </Label>
              <p className="text-sm text-muted-foreground">
                O aluno pode cumprir as {totalHours}h em qualquer categoria de atividade, sem restrições de distribuição.
              </p>
            </div>
          </div>

          <div
            className={`flex items-start space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
              allocationRule === 'modular'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:bg-muted/50'
            }`}
            onClick={() => setAllocationRule('modular')}
          >
            <RadioGroupItem value="modular" id="modular" className="mt-1" />
            <div className="space-y-1">
              <Label htmlFor="modular" className="font-medium cursor-pointer">
                Modular (Distribuição Obrigatória)
              </Label>
              <p className="text-sm text-muted-foreground">
                As horas devem ser distribuídas entre categorias específicas conforme percentuais definidos.
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-primary">Anexo do Documento PPC (PDF)</Label>
          <p className="text-sm text-muted-foreground">
            Faça upload do documento oficial do Projeto Pedagógico do Curso
          </p>
        </div>

        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Arraste o arquivo ou{' '}
            <span className="text-primary hover:underline">clique para selecionar</span>
          </p>
        </div>
      </div>

      <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
        Salvar Configurações
      </Button>
    </div>
  );
}