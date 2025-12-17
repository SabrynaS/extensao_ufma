import React from "react";
import { AdminUser } from "../../data/mockData";
import { RoleBadge } from "./RoleBadge";

export const UsersTable: React.FC<{
  users: AdminUser[];
  onEdit: (u: AdminUser) => void;
  onRemove: (id: string) => void;
}> = ({ users, onEdit, onRemove }) => {
  return (
    <div className="bg-white rounded shadow overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Nome</th>
            <th className="px-4 py-2 text-left">E-mail</th>
            <th className="px-4 py-2 text-left">Matrícula / SIAPE</th>
            <th className="px-4 py-2 text-left">Papel</th>
            <th className="px-4 py-2 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="px-4 py-3">{u.name}</td>
              <td className="px-4 py-3">{u.email}</td>
              <td className="px-4 py-3">{u.registration ?? "—"}</td>
              <td className="px-4 py-3">
                <RoleBadge role={u.role} />
              </td>
              <td className="px-4 py-3 text-right">
                <button className="mr-2 text-sm text-sky-600" onClick={() => onEdit(u)}>
                  Editar
                </button>
                <button className="text-sm text-red-600" onClick={() => onRemove(u.id)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">
                Nenhum usuário cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};