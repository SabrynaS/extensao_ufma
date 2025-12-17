import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Award, FileCheck } from "lucide-react";
import { certificates } from "@/data/mockData";
import { useAlerts } from "@/hooks/useAlerts";

export default function StudentCertificates() {
  const { addAlert } = useAlerts();

  const handleDownload = (certificate: (typeof certificates)[0]) => {
    addAlert(
      "success",
      "Download iniciado",
      `Baixando certificado de "${certificate.activity}"`
    );
  };

  const handleDownloadDeclaration = () => {
    // Simular possível erro (5% de chance)
    const hasError = Math.random() < 0.05;

    if (hasError) {
      addAlert(
        "error",
        "Erro ao gerar declaração",
        "Ocorreu um erro ao processar sua solicitação. Tente novamente."
      );
      return;
    }

    addAlert(
      "success",
      "Declaração gerada!",
      "Sua declaração de horas foi gerada em PDF."
    );
  };

  return (
    <AppLayout breadcrumb={["Início", "Meus Certificados"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Meus Certificados
            </h1>
            <p className="text-muted-foreground">
              Certificados de atividades aprovadas
            </p>
          </div>
          <Button onClick={handleDownloadDeclaration}>
            <Download className="w-4 h-4 mr-2" />
            Emitir Declaração de Horas
          </Button>
        </div>

        {/* Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Total de Horas Certificadas
                </h3>
                <p className="text-2xl font-bold text-success">
                  {certificates.reduce((acc, c) => acc + c.hours, 0)}h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificates List */}
        <div className="grid gap-4">
          {certificates.map((certificate) => (
            <Card key={certificate.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {certificate.activity}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge variant="outline">{certificate.type}</Badge>
                        <span>{certificate.hours}h</span>
                        <span>•</span>
                        <span>Concluído em {certificate.completionDate}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Código de validação: {certificate.validationCode}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(certificate)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {certificates.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Nenhum certificado ainda
              </h3>
              <p className="text-muted-foreground">
                Seus certificados de atividades aprovadas aparecerão aqui
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
