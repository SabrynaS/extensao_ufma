import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Clock, Users, BookOpen } from "lucide-react";
import { opportunities } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export function PublicOpportunities() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || opp.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = Array.from(new Set(opportunities.map((o) => o.type)));

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      "Inscrições Abertas": "bg-success/10 text-success border-0",
      "Vagas Esgotadas": "bg-destructive/10 text-destructive border-0",
      Encerrado: "bg-muted text-muted-foreground border-0",
      Ativo: "bg-blue-50 text-blue-700 border-0",
      Aprovado: "bg-blue-50 text-blue-700 border-0",
      "Aguardando aprovação": "bg-warning/10 text-warning border-0",
    };

    return (
      <Badge className={statusColors[status] || "bg-muted text-muted-foreground border-0"}>
        {status}
      </Badge>
    );
  };

  const handleSubscribe = (opportunityId: string) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { returnTo: `/opportunities/${opportunityId}` } });
    } else {
      // Lógica de inscrição para usuário autenticado
      navigate("/student");
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Curso":
        return <BookOpen className="w-4 h-4" />;
      case "Workshop":
        return <Clock className="w-4 h-4" />;
      case "Projeto":
        return <Users className="w-4 h-4" />;
      case "Evento":
        return <BookOpen className="w-4 h-4" />;
      case "Liga":
        return <Users className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Oportunidades de Extensão
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore todas as oportunidades disponíveis e inscreva-se em projetos,
              cursos e eventos que transformam realidades.
            </p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar oportunidades..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedType === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(null)}
              >
                Todas
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Oportunidades</p>
                    <p className="text-2xl font-bold">{opportunities.length}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-primary/20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Inscrições Abertas</p>
                    <p className="text-2xl font-bold">
                      {opportunities.filter((o) => o.status === "Inscrições Abertas").length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-success/20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Inscritos</p>
                    <p className="text-2xl font-bold">
                      {opportunities.reduce((sum, o) => sum + o.filledSlots, 0)}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-700/20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Opportunities Grid */}
          {filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredOpportunities.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="flex flex-col hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 bg-primary/10 rounded">
                            {getTypeIcon(opportunity.type)}
                          </div>
                          <Badge variant="outline">{opportunity.type}</Badge>
                        </div>
                        <h3 className="font-semibold text-foreground line-clamp-2">
                          {opportunity.title}
                        </h3>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 pb-3 space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {opportunity.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Carga Horária:</span>
                        <span className="font-medium">{opportunity.hours}h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Vagas:</span>
                        <span className="font-medium">
                          {opportunity.slots - opportunity.filledSlots} de {opportunity.slots}
                        </span>
                      </div>
                      {opportunity.period && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Período:</span>
                          <span className="font-medium text-xs">{opportunity.period}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Validação:</span>
                        <span className="font-medium">{opportunity.validation}</span>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        {getStatusBadge(opportunity.status)}
                      </div>
                    </div>
                  </CardContent>

                  <div className="px-6 pb-6">
                    <Button
                      className="w-full"
                      onClick={() => handleSubscribe(opportunity.id)}
                      disabled={opportunity.status === "Vagas Esgotadas" || opportunity.status === "Encerrado"}
                    >
                      {opportunity.status === "Vagas Esgotadas" || opportunity.status === "Encerrado"
                        ? "Indisponível"
                        : isAuthenticated
                          ? "Inscrever-se"
                          : "Fazer Login para Inscrever"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-lg text-muted-foreground">Nenhuma oportunidade encontrada</p>
              <p className="text-sm text-muted-foreground">
                Tente ajustar seus filtros de busca
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
