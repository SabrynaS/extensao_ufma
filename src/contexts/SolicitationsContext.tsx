import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Solicitation } from '@/data/mockData';
import { solicitations as mockSolicitations } from '@/data/mockData';

interface SolicitationsContextType {
  solicitations: Solicitation[];
  addSolicitation: (solicitation: Solicitation) => void;
  updateSolicitation: (id: string, solicitation: Solicitation) => void;
  deleteSolicitation: (id: string) => void;
  getSolicitationById: (id: string) => Solicitation | undefined;
  updateSolicitationDelegation: (ids: string[], delegatedTo: string) => void;
}

const SolicitationsContext = createContext<SolicitationsContextType | undefined>(undefined);

export const SolicitationsProvider = ({ children }: { children: ReactNode }) => {
  const [solicitations, setSolicitations] = useState<Solicitation[]>([]);

  // Load solicitations from localStorage on mount
  useEffect(() => {
    const savedSolicitations = localStorage.getItem('studentSolicitations');
    if (savedSolicitations) {
      try {
        setSolicitations(JSON.parse(savedSolicitations));
      } catch (error) {
        console.error('Failed to parse saved solicitations:', error);
        setSolicitations(mockSolicitations);
        localStorage.setItem('studentSolicitations', JSON.stringify(mockSolicitations));
      }
    } else {
      setSolicitations(mockSolicitations);
      localStorage.setItem('studentSolicitations', JSON.stringify(mockSolicitations));
    }
  }, []);

  // Save solicitations to localStorage whenever they change
  useEffect(() => {
    if (solicitations.length > 0) {
      localStorage.setItem('studentSolicitations', JSON.stringify(solicitations));
    }
  }, [solicitations]);

  const addSolicitation = (solicitation: Solicitation) => {
    setSolicitations((prev) => [...prev, solicitation]);
  };

  const updateSolicitation = (id: string, solicitation: Solicitation) => {
    setSolicitations((prev) =>
      prev.map((s) => (s.id === id ? solicitation : s))
    );
  };

  const deleteSolicitation = (id: string) => {
    setSolicitations((prev) => prev.filter((s) => s.id !== id));
  };

  const getSolicitationById = (id: string) => {
    return solicitations.find((s) => s.id === id);
  };

  const updateSolicitationDelegation = (ids: string[], delegatedTo: string) => {
    setSolicitations((prev) =>
      prev.map((s) => (ids.includes(s.id) ? { ...s, delegatedTo } : s))
    );
  };

  return (
    <SolicitationsContext.Provider
      value={{
        solicitations,
        addSolicitation,
        updateSolicitation,
        deleteSolicitation,
        getSolicitationById,
        updateSolicitationDelegation,
      }}
    >
      {children}
    </SolicitationsContext.Provider>
  );
};

export const useSolicitations = () => {
  const context = useContext(SolicitationsContext);
  if (context === undefined) {
    throw new Error('useSolicitations must be used within a SolicitationsProvider');
  }
  return context;
};
