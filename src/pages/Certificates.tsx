import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CheckCircle2, AlertCircle, Search } from "lucide-react";

interface CertificateData {
  id: string;
  certificateNumber: string;
  studentName: string;
  activityName: string;
  hours: number;
  issueDate: string;
  coordinator: string;
  status: "valid" | "invalid" | "pending";
}

const mockCertificates: CertificateData[] = [
  {
    id: "1",
    certificateNumber: "CERT-2024-001",
    studentName: "João Silva",
    activityName: "Workshop de Python",
    hours: 20,
    issueDate: "2024-06-15",
    coordinator: "Prof. Dr. Carlos Santos",
    status: "valid",
  },
  {
    id: "2",
    certificateNumber: "CERT-2024-002",
    studentName: "Maria Oliveira",
    activityName: "Semana de Ciência e Tecnologia",
    hours: 40,
    issueDate: "2024-07-20",
    coordinator: "Prof. Dra. Ana Costa",
    status: "valid",
  },
];

export default function CertificatesPage() {
  const [searchCode, setSearchCode] = useState("");
  const [searchResult, setSearchResult] = useState<CertificateData | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    const result = mockCertificates.find(
      (cert) =>
        cert.certificateNumber.toLowerCase() === searchCode.toLowerCase()
    );

    setSearchResult(result || null);
  };

  const resetSearch = () => {
    setSearchCode("");
    setSearchResult(null);
    setSearched(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-foreground">
                Validar Certificados
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Verifique a autenticidade de certificados de atividades de extensão da UFMA
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Buscar Certificado</CardTitle>
                  <CardDescription>
                    Digite o número do certificado para validar sua autenticidade
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ex: CERT-2024-001"
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="sm" className="gap-2">
                        <Search className="h-4 w-4" />
                        Buscar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Search Results */}
              {searched && (
                <div className="mt-8">
                  {searchResult ? (
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                          <CardTitle className="text-green-900">
                            Certificado Válido
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Número do Certificado
                            </p>
                            <p className="text-lg font-semibold">
                              {searchResult.certificateNumber}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Nome do Estudante
                              </p>
                              <p className="font-semibold">
                                {searchResult.studentName}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Horas
                              </p>
                              <p className="font-semibold">
                                {searchResult.hours}h
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Atividade
                            </p>
                            <p className="font-semibold">
                              {searchResult.activityName}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Data de Emissão
                              </p>
                              <p className="font-semibold">
                                {new Date(
                                  searchResult.issueDate
                                ).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Coordenador
                              </p>
                              <p className="font-semibold">
                                {searchResult.coordinator}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-red-200 bg-red-50">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-6 w-6 text-red-600" />
                          <CardTitle className="text-red-900">
                            Certificado Não Encontrado
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-red-800 mb-4">
                          Nenhum certificado encontrado com o número "
                          <strong>{searchCode}</strong>". Verifique se digitou
                          corretamente e tente novamente.
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={resetSearch}
                        >
                          Tentar Novamente
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="border-t border-border/50 bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="mb-8 text-2xl font-bold text-foreground">
                Sobre a Validação de Certificados
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Como Funciona?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      Digite o número do certificado no campo de busca acima.
                      Nosso sistema verificará a autenticidade do certificado
                      em nossa base de dados.
                    </p>
                    <p>
                      Se o certificado for válido, você verá os detalhes
                      completos da atividade e da emissão.
                    </p>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
