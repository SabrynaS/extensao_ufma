import { users } from "@/data/mockData";

const roleLabels: Record<string, string> = {
  discente: "Estudante",
  coordenador: "Coordenador",
  docente: "Docente",
  secretaria: "Secretária",
  admin: "Administrador",
  comissao: "Comissão",
  student_scholar: "Diretor",
};

export default function MockProfiles() {
  const profilesList = Object.entries(users).map(([_, user]) => user);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Perfis de Demonstração
        </h1>
        <p className="text-slate-600 mb-6">
          Credenciais para teste do sistema (Senha: password)
        </p>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Perfil
                </th>
              </tr>
            </thead>
            <tbody>
              {profilesList.map((user, index) => (
                <tr
                  key={user.id}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50 border-b border-slate-100"
                  }
                >
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-mono">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {roleLabels[user.role] || user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
