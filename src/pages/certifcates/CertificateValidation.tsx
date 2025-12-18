import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, CheckCircle2, XCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface CertificateData {
  participantName: string;
  eventName: string;
  issueDate: string;
  workload: number;
  valid: boolean;
}

// Mock data for certificate validation
const mockCertificates: Record<string, CertificateData> = {
  "ABC123XYZ": {
    participantName: "João Silva Santos",
    eventName: "Workshop de Inteligência Artificial",
    issueDate: "2024-03-15",
    workload: 20,
    valid: true,
  },
  "DEF456UVW": {
    participantName: "Maria Oliveira Costa",
    eventName: "Semana Acadêmica de Medicina 2024",
    issueDate: "2024-02-20",
    workload: 40,
    valid: true,
  },
};

function generateCaptcha(): { num1: number; num2: number; answer: number } {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, answer: num1 + num2 };
}

export default function CertificateValidation() {
  const [hash, setHash] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const handleValidate = async () => {
    if (!hash.trim()) {
      toast.error("Por favor, insira o código do certificado");
      return;
    }

    if (!captchaInput.trim()) {
      toast.error("Por favor, responda a verificação de segurança");
      return;
    }

    if (parseInt(captchaInput) !== captcha.answer) {
      toast.error("Resposta incorreta. Tente novamente.");
      refreshCaptcha();
      return;
    }

    setIsLoading(true);
    setCertificate(null);
    setNotFound(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const found = mockCertificates[hash.toUpperCase()];
    
    if (found) {
      setCertificate(found);
      toast.success("Certificado encontrado!");
    } else {
      setNotFound(true);
      toast.error("Certificado não encontrado");
    }

    setIsLoading(false);
    refreshCaptcha();
  };

  return (
    <div>
      <Header />
      <div className=" bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Validação de Certificado</h1>
            <p className="text-muted-foreground">
              Verifique a autenticidade do seu certificado inserindo o código único
            </p>
          </div>

          {/* Validation Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Verificar Certificado
              </CardTitle>
              <CardDescription>
                Insira o código hash presente no certificado para validar sua autenticidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hash Input */}
              <div className="space-y-2">
                <Label htmlFor="hash">Código do Certificado (Hash)</Label>
                <Input
                  id="hash"
                  placeholder="Ex: ABC123XYZ"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                  className="font-mono text-lg tracking-wider"
                />
              </div>

              {/* Captcha */}
              <div className="space-y-2">
                <Label>Verificação de Segurança</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-muted/50 border rounded-md p-4 text-center">
                    <span className="text-xl font-bold text-foreground">
                      {captcha.num1} + {captcha.num2} = ?
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={refreshCaptcha}
                    title="Gerar novo cálculo"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Digite o resultado"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  type="number"
                  className="mt-2"
                />
              </div>

              <Button 
                onClick={handleValidate} 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Validando...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Validar Certificado
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Result - Certificate Found */}
          {certificate && (
            <Card className="shadow-lg border-green-200 bg-green-50/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="h-6 w-6" />
                    Certificado Válido
                  </CardTitle>
                  <Badge className="bg-green-600 hover:bg-green-700">Autêntico</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-sm">Nome do Participante</Label>
                    <p className="text-lg font-semibold text-foreground">{certificate.participantName}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-sm">Nome do Evento</Label>
                    <p className="text-lg font-semibold text-foreground">{certificate.eventName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Data de Emissão</Label>
                      <p className="font-medium text-foreground">
                        {new Date(certificate.issueDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Carga Horária</Label>
                      <p className="font-medium text-foreground">{certificate.workload} horas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result - Certificate Not Found */}
          {notFound && (
            <Card className="shadow-lg border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <XCircle className="h-6 w-6" />
                  Certificado Não Encontrado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Não foi possível encontrar um certificado com o código informado. 
                  Verifique se o código está correto e tente novamente.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
