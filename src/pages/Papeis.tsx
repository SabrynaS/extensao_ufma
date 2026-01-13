import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { users } from "@/data/mockData";

export default function PapeisPage() {
  const navigate = useNavigate();

  const roleLabels: Record<string, string> = {
    discente: "Discente",
    coordenador: "Coordenador",
    docente: "Docente",
    secretaria: "Secretária",
    student_scholar: "Bolsista",
    admin: "Administrador",
    comissao: "Comissão",
  };

  const profileList = Object.values(users).map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background p-10">
      <div className="max-w-2xl mx-auto -6">
        {/* Header */}

        {/* Tabela de Perfis */}
        <Card>
          <CardHeader className="bg-muted/50 border-b">
            <CardTitle className="text-lg">Usuários do Sistema</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left py-4 px-6 font-semibold">Nome</th>
                    <th className="text-left py-4 px-6 font-semibold">Email</th>
                    <th className="text-left py-4 px-6 font-semibold">Papel</th>
                  </tr>
                </thead>
                <tbody>
                  {profileList.map((profile, index) => (
                    <tr
                      key={profile.id}
                      className={`border-b transition-colors hover:bg-muted/50 ${
                        index % 2 === 0 ? "bg-white/50" : "bg-muted/20"
                      }`}
                    >
                      <td className="py-4 px-6 font-medium text-sm">
                        {profile.name}
                      </td>
                      <td className="py-4 px-6 text-sm text-muted-foreground">
                        {profile.email}
                      </td>
                      <td className="py-4 px-6 text-sm">
                        {roleLabels[profile.role] || profile.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
