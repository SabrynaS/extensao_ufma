import React from "react";
import { AdminRole } from "../../data/mockData";

const labels: Record<AdminRole, string> = {
  docente: "Docente",
  coordenador: "Coordenador",
  comissao: "Comissão",
  secretaria: "Secretária",
  admin: "Administrador",
  discente: "Discente",
};

export const RoleBadge: React.FC<{ role: AdminRole }> = ({ role }) => {
  const colors: Record<AdminRole, string> = {
    docente: "bg-emerald-100 text-emerald-800",
    coordenador: "bg-sky-100 text-sky-800",
    comissao: "bg-violet-100 text-violet-800",
    secretaria: "bg-amber-100 text-amber-800",
    admin: "bg-gray-100 text-gray-800",
    discente: "bg-green-100 text-green-800",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${colors[role]}`}>
      {labels[role]}
    </span>
  );
};