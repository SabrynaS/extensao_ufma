import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Download, FileText } from "lucide-react";
import { solicitations } from "@/data/mockData";
import { useState } from "react";
import { useAlerts } from "@/hooks/useAlerts";

export default function SolicitationValidation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addAlert } = useAlerts();
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null);
  const [feedback, setFeedback] = useState("");
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const solicitation = solicitations.find((s) => s.id === id);

  if (!solicitation) {
    return (
      <AppLayout breadcrumb={["Início", "Solicitações de Validação", "Avaliação"]}>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Solicitação não encontrada</p>
            <Button onClick={() => navigate("/coordinator/approvals")} className="mt-4">
              Voltar
            </Button>
          </CardContent>
        </Card>
      </AppLayout>
    );
  }

  const handleApprove = () => {
    addAlert("success", "Solicitação Aprovada", "A solicitação foi validada e aprovada com sucesso.");
    setTimeout(() => navigate("/coordinator/approvals"), 1500);
  };

  const handleReject = () => {
    if (!feedback.trim()) {
      addAlert("error", "Campo obrigatório", "Por favor, forneça um motivo para a rejeição.");
      return;
    }
    addAlert("success", "Solicitação Rejeitada", "A solicitação foi rejeitada e o aluno será notificado.");
    setTimeout(() => navigate("/coordinator/approvals"), 1500);
  };

  return (
    <AppLayout breadcrumb={["Início", "Solicitações de Validação", "Avaliação"]}>
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate("/coordinator/approvals")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Validar Solicitação</h1>
            <p className="text-muted-foreground">Avalie a solicitação e aprove ou rejeite</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Informações da Solicitação */}
          <div className="col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Informações da Solicitação</h2>
                <div className="space-y-4">
                  {/* Seção do Aluno */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Aluno</p>
                      <p className="font-semibold">{solicitation.studentName}</p>
                      <p className="text-xs text-muted-foreground">{solicitation.studentMatricula}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data de Envio</p>
                      <p className="font-semibold">{solicitation.submitDate}</p>
                    </div>
                  </div>

                  {/* Atividade */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Atividade</p>
                    <p className="font-semibold text-base">{solicitation.activity}</p>
                  </div>

                  {/* Tipo, Horas e Status */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <Badge variant="outline" className="mt-1">{solicitation.type}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Horas</p>
                      <p className="font-semibold">{solicitation.hours}h</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className="bg-warning/10 text-warning border-0 mt-1">
                        {solicitation.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Instituição */}
                  {solicitation.institution && (
                    <div>
                      <p className="text-sm text-muted-foreground">Instituição</p>
                      <p className="font-semibold">{solicitation.institution}</p>
                    </div>
                  )}

                  {/* Ano de Realização */}
                  {solicitation.year && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Ano de Realização</p>
                      <p className="font-bold text-lg text-blue-700">{solicitation.year}</p>
                    </div>
                  )}

                  {/* Datas da Atividade - Destacado */}
                  {(solicitation.startDate || solicitation.endDate) && (
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <p className="text-xs font-semibold text-amber-900 uppercase tracking-wide mb-3">Período da Atividade</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-amber-700 font-medium mb-1">Data de Início</p>
                          <p className="text-lg font-bold text-amber-900">
                            {solicitation.startDate 
                              ? new Date(solicitation.startDate).toLocaleDateString('pt-BR')
                              : "—"
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-amber-700 font-medium mb-1">Data de Encerramento</p>
                          <p className="text-lg font-bold text-amber-900">
                            {solicitation.endDate 
                              ? new Date(solicitation.endDate).toLocaleDateString('pt-BR')
                              : "—"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Descrição */}
                  {solicitation.description && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Descrição</p>
                      <p className="text-sm leading-relaxed">{solicitation.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {solicitation.certificateUrl && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Certificado Anexado
                  </h3>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <FileText className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm break-words">{solicitation.certificateUrl}</p>
                        <p className="text-xs text-muted-foreground mt-1">Arquivo de certificado</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full gap-2"
                        onClick={() => addAlert("success", "Certificado baixado", "O arquivo foi salvo com sucesso.")}
                      >
                        <Download className="w-4 h-4" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Modal para visualizar certificado */}
            <Dialog open={showCertificateModal} onOpenChange={setShowCertificateModal}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Baixar Certificado</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-8 text-center min-h-96 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                    <FileText className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 font-medium">{solicitation.certificateUrl}</p>
                    <p className="text-sm text-gray-500 mt-2">Clique em baixar para obter o arquivo</p>
                  </div>
                  <Button className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Baixar Certificado
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Painel de Decisão */}
          <div>
            <Card className="border-0 shadow-lg sticky top-6">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-base">Sua Avaliação</h3>

                <div className="space-y-3">
                  <Textarea
                    placeholder="Adicione observações ou motivo da rejeição (obrigatório se rejeitar)"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="pt-4 border-t space-y-3">
                  <Button
                    onClick={handleApprove}
                    className="w-full bg-success hover:bg-success/90 text-white gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Aprovar
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="destructive"
                    className="w-full gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Rejeitar
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/coordinator/approvals")}
                >
                  Cancelar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
