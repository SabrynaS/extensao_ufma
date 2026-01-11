import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CommissionMember {
  id: string;
  name: string;
  email: string;
  role: "docente" | "comissao";
}

interface CommissionContextType {
  members: CommissionMember[];
  addMember: (member: CommissionMember) => void;
  updateMember: (id: string, member: CommissionMember) => void;
  deleteMember: (id: string) => void;
  getMemberById: (id: string) => CommissionMember | undefined;
}

const CommissionContext = createContext<CommissionContextType | undefined>(undefined);

export function CommissionProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<CommissionMember[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicializar com dados do localStorage ou mockData
  useEffect(() => {
    const savedMembers = localStorage.getItem('commissionMembers');

    if (savedMembers) {
      try {
        setMembers(JSON.parse(savedMembers));
      } catch (error) {
        console.error('Failed to parse saved commission members:', error);
        initializeWithDefaults();
      }
    } else {
      initializeWithDefaults();
    }

    setIsInitialized(true);
  }, []);

  const initializeWithDefaults = () => {
    const defaultMembers: CommissionMember[] = [
      { id: "cm1", name: "Prof. Dr. Carlos Eduardo Silva", email: "carlos.silva@ufma.br", role: "docente" },
      { id: "cm2", name: "Dra. Fernanda Lima", email: "fernanda.lima@ufma.br", role: "docente" },
      { id: "cm3", name: "Prof. Roberto Campos", email: "roberto.campos@ufma.br", role: "docente" },
      { id: "cm4", name: "Dr. Humberto Silva", email: "humberto.silva@ufma.br", role: "comissao" },
      { id: "cm5", name: "Dra. Patricia Nogueira", email: "patricia.nogueira@ufma.br", role: "docente" },
    ];
    setMembers(defaultMembers);
  };

  // Persistir mudanças em localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('commissionMembers', JSON.stringify(members));
    }
  }, [members, isInitialized]);

  const addMember = (member: CommissionMember) => {
    // Gerar novo ID se não fornecido
    const newMember = {
      ...member,
      id: member.id || `cm${Date.now()}`,
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const updateMember = (id: string, member: CommissionMember) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? member : m))
    );
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const getMemberById = (id: string) => {
    return members.find((m) => m.id === id);
  };

  return (
    <CommissionContext.Provider value={{ members, addMember, updateMember, deleteMember, getMemberById }}>
      {children}
    </CommissionContext.Provider>
  );
}

export function useCommission() {
  const context = useContext(CommissionContext);
  if (context === undefined) {
    throw new Error('useCommission deve ser usado dentro de CommissionProvider');
  }
  return context;
}
