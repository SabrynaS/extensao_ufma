import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
} from "lucide-react";
import { FaFileAlt, FaSearch, FaFileDownload, FaCheckCircle, FaClock, FaExclamationCircle, FaPlus, FaArrowRight, FaFire } from "react-icons/fa";
import { studentProgress, solicitations, certificates } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NewSolicitationModal } from "@/components/student/NewSolicitationModal";
import { SolicitationDetailsModal } from "@/components/student/SolicitationDetailsModal";
import { useAlerts } from "@/hooks/useAlerts";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const [showNewSolicitation, setShowNewSolicitation] = useState(false);
  const [selectedSolicitation, setSelectedSolicitation] = useState<typeof solicitations[0] | null>(null);

  const mySolicitations = solicitations
    .filter((s) => s.studentId === "1")
    .slice(0, 5);
  const progressPercentage =
    ((studentProgress.approved + studentProgress.pending) /
      studentProgress.required) *
    100;
  const approvedPercentage =
    (studentProgress.approved / studentProgress.required) * 100;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aprovado":
        return (
          <Badge className="bg-success/10 text-success border-0">
            Aprovado
          </Badge>
        );
      case "Em Análise":
        return (
          <Badge className="bg-warning/10 text-warning border-0">
            Em Análise
          </Badge>
        );
      case "Pendente":
        return (
          <Badge className="bg-warning/10 text-warning border-0">
            Pendente
          </Badge>
        );
      case "Rejeitado":
        return (
          <Badge className="bg-destructive/10 text-destructive border-0">
            Rejeitado
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout breadcrumb={["Início", "Painel"]}>
      <div className="space-y-6">
        {/* Header com gradiente */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 p-8 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                
                <span className="text-sm font-semibold text-white/80">Seu Progresso de Extensão</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Você está indo muito bem!</h1>
              <p className="text-green-100">Mantenha o ritmo e complete suas atividades de extensão</p>
            </div>
          </div>
        </div>

        {/* Progress Card Redesenhado */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <p className="text-45 text-slate-500 mt-2 px-8">Baseado no PPC 2024.1</p>
          <CardContent className="p-8 bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="space-y-8">
              {/* Stats em destaque */}
              <div className="grid grid-cols-3 gap-4">
                <div className="relative p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="relative z-10">
                    <p className="text-xs text-slate-500 font-medium mb-1">APROVADAS</p>
                    <p className="text-3xl font-bold text-success">{studentProgress.approved}h</p>
                    <p className="text-xs text-slate-400 mt-1">Confirmado</p>
                  </div>
                </div>
                <div className="relative p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="relative z-10">
                    <p className="text-xs text-slate-500 font-medium mb-1">EM ANÁLISE</p>
                    <p className="text-3xl font-bold text-warning">{studentProgress.pending}h</p>
                    <p className="text-xs text-slate-400 mt-1">Aguardando</p>
                  </div>
                </div>
                <div className="relative p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="relative z-10">
                    <p className="text-xs text-slate-500 font-medium mb-1">FALTAM</p>
                    <p className="text-3xl font-bold text-red-600">{Math.max(0, studentProgress.required - studentProgress.approved - studentProgress.pending)}h</p>
                    <p className="text-xs text-slate-400 mt-1">Para completar</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar com estilo moderno */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <p className="text-xl font-bold text-slate-900">
                      {studentProgress.approved + studentProgress.pending}h
                      <span className="text-slate-400 font-normal"> / {studentProgress.required}h</span>
                    </p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden shadow-sm">
                  <div className="h-full flex">
                    <div
                      className="bg-gradient-to-r from-success to-emerald-500 h-full transition-all duration-500 ease-out"
                      style={{ width: `${approvedPercentage}%` }}
                    />
                    <div
                      className="bg-gradient-to-r from-warning to-yellow-400 h-full transition-all duration-500 ease-out"
                      style={{
                        width: `${
                          (studentProgress.pending / studentProgress.required) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {Math.round(progressPercentage) >= 100 ? "✅ Meta atingida!" : `${Math.max(0, 100 - Math.round(progressPercentage))}% para atingir a meta`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions com design moderno */}
        <div className="grid grid-cols-3 gap-4">
          <Card
            className="cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden bg-white"
            onClick={() => navigate("/student/register-external-activity")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-orange-500/5 group-hover:from-warning/10 group-hover:to-orange-500/10 transition-colors"></div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-warning/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:shadow-lg transition-all relative z-10">
                <FaPlus className="w-7 h-7 text-warning group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-bold text-lg mb-1 relative z-10">Nova Solicitação</h3>
              <p className="text-sm text-muted-foreground relative z-10">
                Enviar certificado
              </p>
              <div className="mt-3 flex items-center gap-1 text-warning font-semibold text-sm relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                Enviar <FaArrowRight className="w-3 h-3" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden bg-white"
            onClick={() => navigate("/events")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-colors"></div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:shadow-lg transition-all relative z-10">
                <FaSearch className="w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-bold text-lg mb-1 relative z-10">Explorar Eventos</h3>
              <p className="text-sm text-muted-foreground relative z-10">
                Novas oportunidades
              </p>
              <div className="mt-3 flex items-center gap-1 text-blue-600 font-semibold text-sm relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                Buscar <FaArrowRight className="w-3 h-3" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden bg-white"
            onClick={() => navigate("/student/certificates")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-emerald-500/5 group-hover:from-success/10 group-hover:to-emerald-500/10 transition-colors"></div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:shadow-lg transition-all relative z-10">
                <FaFileDownload className="w-7 h-7 text-success group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-bold text-lg mb-1 relative z-10">Minhas Declarações</h3>
              <p className="text-sm text-muted-foreground relative z-10">
                Baixar comprovante
              </p>
              <div className="mt-3 flex items-center gap-1 text-success font-semibold text-sm relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                Baixar <FaArrowRight className="w-3 h-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Solicitations */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Solicitações Recentes</h3>
              <p className="text-sm text-muted-foreground">
                Histórico de atividades submetidas
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Atividade
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Tipo
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Carga Horária
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Data Envio
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mySolicitations.map((solicitation) => (
                    <tr
                      key={solicitation.id}
                      className="border-b last:border-0"
                    >
                      <td className="py-3 px-4 text-sm">
                        {solicitation.activity}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {solicitation.type}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {solicitation.hours}h
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {solicitation.submitDate}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(solicitation.status)}
                      </td>
                      <td className="py-3 px-4">
                        {solicitation.status === "Aprovado" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              addAlert(
                                "success",
                                "Download iniciado",
                                "O certificado está sendo baixado."
                              );
                            }}
                          >
                            <FaFileDownload className="w-3 h-3" />
                            Certificado
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              setSelectedSolicitation(solicitation);
                            }}
                          >
                            <Eye className="w-3 h-3" />
                            Detalhes
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => navigate("/student/requests")}
              >
                Ver todas as solicitações
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <NewSolicitationModal
        open={showNewSolicitation}
        onOpenChange={setShowNewSolicitation}
      />
      {selectedSolicitation && (
        <SolicitationDetailsModal
          solicitation={selectedSolicitation}
          open={!!selectedSolicitation}
          onOpenChange={(open) => !open && setSelectedSolicitation(null)}
        />
      )}
    </AppLayout>
  );
}
