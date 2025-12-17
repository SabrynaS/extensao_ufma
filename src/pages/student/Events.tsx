import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Clock,
  Users,
  Calendar,
  MapPin,
  Filter,
  ChevronDown,
} from "lucide-react";
import { opportunities } from "@/data/mockData";
import { EventDetailsModal } from "@/components/student/EventDetailsModal";

export default function StudentEvents() {
  const [activeTab, setActiveTab] = useState("open");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof opportunities)[0] | null
  >(null);
  const [filters, setFilters] = useState({
    types: [] as string[],
    hours: [] as string[],
    status: [] as string[],
  });

  // Dados mockados das oportunidades que o usuário se inscreveu
  const enrolledOpportunities = [
    {
      id: "101",
      title: "Workshop de Desenvolvimento Web",
      description:
        "Aprenda as tecnologias mais modernas para desenvolvimento web",
      type: "Workshop",
      hours: 20,
      slots: 30,
      filledSlots: 25,
      date: "15/01/2024",
      instructor: "Prof. Carlos Silva",
      status: "Inscrições Abertas",
      enrollmentStatus: "Começa em breve", // Status da inscrição do usuário
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      validation: "Automática",
    },
    {
      id: "102",
      title: "Projeto de Extensão Comunitária",
      description:
        "Projeto voltado para desenvolvimento de soluções para a comunidade local",
      type: "Projeto",
      hours: 40,
      slots: 20,
      filledSlots: 18,
      date: "01/12/2024",
      instructor: "Prof. Maria Santos",
      status: "Inscrições Abertas",
      enrollmentStatus: "Em andamento",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      validation: "Manual",
    },
    {
      id: "103",
      title: "Curso de Python para Iniciantes",
      description: "Curso introdutório de programação em Python",
      type: "Curso",
      hours: 30,
      slots: 25,
      filledSlots: 25,
      date: "15/11/2024",
      instructor: "Prof. João Oliveira",
      status: "Vagas Esgotadas",
      enrollmentStatus: "Finalizado",
      startDate: "2024-11-15",
      endDate: "2024-12-15",
      validation: "Automática",
    },
    {
      id: "104",
      title: "Liga de Programação Competitiva",
      description: "Grupo de estudos focado em programação competitiva",
      type: "Liga",
      hours: 50,
      slots: 15,
      filledSlots: 12,
      date: "01/10/2024",
      instructor: "Prof. Ana Costa",
      status: "Inscrições Abertas",
      enrollmentStatus: "Aprovado",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      validation: "Manual",
    },
    {
      id: "105",
      title: "Workshop de Machine Learning",
      description: "Introdução aos conceitos de aprendizado de máquina",
      type: "Workshop",
      hours: 25,
      slots: 20,
      filledSlots: 18,
      date: "10/12/2024",
      instructor: "Prof. Roberto Silva",
      status: "Inscrições Abertas",
      enrollmentStatus: "Aguardando aprovação",
      startDate: "2024-12-10",
      endDate: "2024-12-20",
      validation: "Manual",
    },
  ];

  const typeOptions = ["Curso", "Projeto", "Workshop", "Evento", "Liga"];
  const hoursOptions = ["10-20 horas", "20-40 horas", "40+ horas"];
  const statusOptions = ["Inscrições Abertas", "Vagas Esgotadas"];

  const toggleFilter = (
    category: "types" | "hours" | "status",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const clearFilters = () => {
    setFilters({ types: [], hours: [], status: [] });
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      filters.types.length === 0 || filters.types.includes(opp.type);
    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(opp.status);

    let matchesHours = filters.hours.length === 0;
    if (!matchesHours) {
      if (
        filters.hours.includes("10-20 horas") &&
        opp.hours >= 10 &&
        opp.hours <= 20
      )
        matchesHours = true;
      if (
        filters.hours.includes("20-40 horas") &&
        opp.hours > 20 &&
        opp.hours <= 40
      )
        matchesHours = true;
      if (filters.hours.includes("40+ horas") && opp.hours > 40)
        matchesHours = true;
    }

    return matchesSearch && matchesType && matchesStatus && matchesHours;
  });

  const filteredEnrolledOpportunities = enrolledOpportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      filters.types.length === 0 || filters.types.includes(opp.type);

    let matchesHours = filters.hours.length === 0;
    if (!matchesHours) {
      if (
        filters.hours.includes("10-20 horas") &&
        opp.hours >= 10 &&
        opp.hours <= 20
      )
        matchesHours = true;
      if (
        filters.hours.includes("20-40 horas") &&
        opp.hours > 20 &&
        opp.hours <= 40
      )
        matchesHours = true;
      if (filters.hours.includes("40+ horas") && opp.hours > 40)
        matchesHours = true;
    }

    return matchesSearch && matchesType && matchesHours;
  });

  const getEnrollmentStatusBadge = (status: string) => {
    switch (status) {
      case "Começa em breve":
        return (
          <Badge className="bg-blue-500 text-white border-0">
            Começa em breve
          </Badge>
        );
      case "Em andamento":
        return (
          <Badge className="bg-yellow-500 text-white border-0">
            Em andamento
          </Badge>
        );
      case "Finalizado":
        return (
          <Badge className="bg-gray-500 text-white border-0">Finalizado</Badge>
        );
      case "Aprovado":
        return (
          <Badge className="bg-green-500 text-white border-0">Aprovado</Badge>
        );
      case "Aguardando aprovação":
        return (
          <Badge className="bg-orange-500 text-white border-0">
            Aguardando aprovação
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Workshop":
        return "bg-primary text-primary-foreground";
      case "Projeto":
        return "bg-primary text-primary-foreground";
      case "Curso":
        return "bg-primary text-primary-foreground";
      case "Evento":
        return "bg-primary text-primary-foreground";
      case "Liga":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "Inscrições Abertas") {
      return (
        <Badge className="bg-success/10 text-success border-0">
          Inscrições Abertas
        </Badge>
      );
    }
    return (
      <Badge className="bg-destructive/10 text-destructive border-0">
        Vagas Esgotadas
      </Badge>
    );
  };

  return (
    <AppLayout breadcrumb={["Início", "Oportunidades"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Oportunidades de Extensão
          </h1>
          <p className="text-muted-foreground pt-2">
            Explore cursos, projetos, eventos e outras atividades de extensão
            disponíveis
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, descrição ou palavra-chave..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="open">Oportunidades em Aberto</TabsTrigger>
            <TabsTrigger value="enrolled">Minhas Inscrições</TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="space-y-6">
            <div className="flex gap-6">
              {/* Filters */}
              {showFilters && (
                <Card className="w-64 shrink-0 h-fit">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Filtros</h3>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0"
                        onClick={clearFilters}
                      >
                        Limpar
                      </Button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3">Tipo</h4>
                        <div className="space-y-2">
                          {typeOptions.map((type) => (
                            <label
                              key={type}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={filters.types.includes(type)}
                                onCheckedChange={() =>
                                  toggleFilter("types", type)
                                }
                              />
                              <span className="text-sm">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-3">
                          Carga Horária
                        </h4>
                        <div className="space-y-2">
                          {hoursOptions.map((hours) => (
                            <label
                              key={hours}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={filters.hours.includes(hours)}
                                onCheckedChange={() =>
                                  toggleFilter("hours", hours)
                                }
                              />
                              <span className="text-sm">{hours}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-3">Status</h4>
                        <div className="space-y-2">
                          {statusOptions.map((status) => (
                            <label
                              key={status}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={filters.status.includes(status)}
                                onCheckedChange={() =>
                                  toggleFilter("status", status)
                                }
                              />
                              <span className="text-sm">{status}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Results */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    {filteredOpportunities.length} oportunidades encontradas
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredOpportunities.map((opportunity) => (
                    <Card
                      key={opportunity.id}
                      className="overflow-hidden hover:border-primary/50 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <Badge
                            className={getTypeBadgeColor(opportunity.type)}
                          >
                            {opportunity.type}
                          </Badge>
                          {getStatusBadge(opportunity.status)}
                        </div>

                        <h3 className="font-semibold mb-2 line-clamp-2">
                          {opportunity.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {opportunity.description}
                        </p>

                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{opportunity.hours} horas</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>
                              Vagas: {opportunity.filledSlots}/
                              {opportunity.slots}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{opportunity.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{opportunity.instructor}</span>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          variant={
                            opportunity.status === "Vagas Esgotadas"
                              ? "outline"
                              : "default"
                          }
                          disabled={opportunity.status === "Vagas Esgotadas"}
                          onClick={() => setSelectedEvent(opportunity)}
                        >
                          Ver Detalhes
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredOpportunities.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    Nenhuma oportunidade encontrada com os filtros selecionados
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="enrolled" className="space-y-6">
            <div className="flex gap-6">
              {/* Filters para aba de inscrições */}
              {showFilters && (
                <Card className="w-64 shrink-0 h-fit">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Filtros</h3>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0"
                        onClick={clearFilters}
                      >
                        Limpar
                      </Button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3">Tipo</h4>
                        <div className="space-y-2">
                          {typeOptions.map((type) => (
                            <label
                              key={type}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={filters.types.includes(type)}
                                onCheckedChange={() =>
                                  toggleFilter("types", type)
                                }
                              />
                              <span className="text-sm">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-3">
                          Carga Horária
                        </h4>
                        <div className="space-y-2">
                          {hoursOptions.map((hours) => (
                            <label
                              key={hours}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={filters.hours.includes(hours)}
                                onCheckedChange={() =>
                                  toggleFilter("hours", hours)
                                }
                              />
                              <span className="text-sm">{hours}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Results para oportunidades inscritas */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    {filteredEnrolledOpportunities.length} oportunidades
                    encontradas
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredEnrolledOpportunities.map((opportunity) => (
                    <Card
                      key={opportunity.id}
                      className="overflow-hidden hover:border-primary/50 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <Badge
                            className={getTypeBadgeColor(opportunity.type)}
                          >
                            {opportunity.type}
                          </Badge>
                          {getEnrollmentStatusBadge(
                            opportunity.enrollmentStatus
                          )}
                        </div>

                        <h3 className="font-semibold mb-2 line-clamp-2">
                          {opportunity.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {opportunity.description}
                        </p>

                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{opportunity.hours} horas</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>
                              Vagas: {opportunity.filledSlots}/
                              {opportunity.slots}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{opportunity.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{opportunity.instructor}</span>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => setSelectedEvent(opportunity)}
                        >
                          Ver Detalhes
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredEnrolledOpportunities.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    Você ainda não se inscreveu em nenhuma oportunidade
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <EventDetailsModal
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      />
    </AppLayout>
  );
}
