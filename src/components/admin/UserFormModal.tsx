import React, { useEffect, useState } from "react";
import { AdminRole, AdminUser } from "../../data/mockData";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (payload: Omit<AdminUser, "id" | "createdAt">) => Promise<void>;
  initial?: AdminUser | null;
};

const roles: AdminRole[] = ["docente", "coordenador", "comissao", "secretaria", "admin" , "discente"];

export const UserFormModal: React.FC<Props> = ({ open, onClose, onSave, initial }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState("");
  const [role, setRole] = useState<AdminRole>("docente");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setEmail(initial.email);
      setRegistration(initial.registration ?? "");
      setRole(initial.role);
    } else {
      setName("");
      setEmail("");
      setRegistration("");
      setRole("docente");
    }
  }, [initial, open]);

  if (!open) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    await onSave({
      name: name.trim(),
      email: email.trim(),
      registration: registration.trim() || undefined,
      role,
    });
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow-lg w-full max-w-lg z-10 p-6">
        <h3 className="text-lg font-semibold mb-4">{initial ? "Editar usuário" : "Cadastrar usuário"}</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input className="mt-1 block w-full rounded border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium">E-mail institucional</label>
            <input type="email" className="mt-1 block w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Matrícula / SIAPE (opcional)</label>
            <input className="mt-1 block w-full rounded border px-3 py-2" value={registration} onChange={(e) => setRegistration(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Papel / Autoridade</label>
            <select className="mt-1 block w-full rounded border px-3 py-2" value={role} onChange={(e) => setRole(e.target.value as AdminRole)}>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="px-4 py-2 rounded border" onClick={onClose} disabled={saving}>
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 rounded bg-primary text-white" disabled={saving}>
            {saving ? "Salvando..." : initial ? "Salvar" : "Criar e enviar credenciais"}
          </button>
        </div>
      </form>
    </div>
  );
};