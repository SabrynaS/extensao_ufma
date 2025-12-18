import React, { createContext, useContext, useState, useEffect } from 'react';
import { Opportunity, userCreatedOpportunities, coordinatorOpportunities } from '@/data/mockData';

interface OpportunitiesContextType {
  // Student Scholar Opportunities
  userOpportunities: Opportunity[];
  addUserOpportunity: (opportunity: Opportunity) => void;
  updateUserOpportunity: (id: string, opportunity: Opportunity) => void;
  deleteUserOpportunity: (id: string) => void;

  // Coordinator Opportunities
  coordinatorOpportunities: Opportunity[];
  addCoordinatorOpportunity: (opportunity: Opportunity) => void;
  updateCoordinatorOpportunity: (id: string, opportunity: Opportunity) => void;
  deleteCoordinatorOpportunity: (id: string) => void;
}

const OpportunitiesContext = createContext<OpportunitiesContextType | undefined>(undefined);

export function OpportunitiesProvider({ children }: { children: React.ReactNode }) {
  const [userOpportunities, setUserOpportunities] = useState<Opportunity[]>([]);
  const [coordinatorOpportunities, setCoordinatorOpportunities] = useState<Opportunity[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicializar com dados do localStorage ou mockData
  useEffect(() => {
    const savedUserOpps = localStorage.getItem('userCreatedOpportunities');
    const savedCoordOpps = localStorage.getItem('coordinatorOpportunities');

    if (savedUserOpps) {
      setUserOpportunities(JSON.parse(savedUserOpps));
    } else {
      setUserOpportunities(userCreatedOpportunities);
    }

    if (savedCoordOpps) {
      setCoordinatorOpportunities(JSON.parse(savedCoordOpps));
    } else {
      setCoordinatorOpportunities(coordinatorOpportunities as Opportunity[]);
    }

    setIsInitialized(true);
  }, []);

  // Persistir mudanças em localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('userCreatedOpportunities', JSON.stringify(userOpportunities));
    }
  }, [userOpportunities, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('coordinatorOpportunities', JSON.stringify(coordinatorOpportunities));
    }
  }, [coordinatorOpportunities, isInitialized]);

  const addUserOpportunity = (opportunity: Opportunity) => {
    setUserOpportunities(prev => [...prev, opportunity]);
  };

  const updateUserOpportunity = (id: string, opportunity: Opportunity) => {
    setUserOpportunities(prev =>
      prev.map(opp => opp.id === id ? opportunity : opp)
    );
  };

  const deleteUserOpportunity = (id: string) => {
    setUserOpportunities(prev => prev.filter(opp => opp.id !== id));
  };

  const addCoordinatorOpportunity = (opportunity: Opportunity) => {
    setCoordinatorOpportunities(prev => [...prev, opportunity]);
  };

  const updateCoordinatorOpportunity = (id: string, opportunity: Opportunity) => {
    setCoordinatorOpportunities(prev =>
      prev.map(opp => opp.id === id ? opportunity : opp)
    );
  };

  const deleteCoordinatorOpportunity = (id: string) => {
    setCoordinatorOpportunities(prev => prev.filter(opp => opp.id !== id));
  };

  return (
    <OpportunitiesContext.Provider
      value={{
        userOpportunities,
        addUserOpportunity,
        updateUserOpportunity,
        deleteUserOpportunity,
        coordinatorOpportunities,
        addCoordinatorOpportunity,
        updateCoordinatorOpportunity,
        deleteCoordinatorOpportunity,
      }}
    >
      {children}
    </OpportunitiesContext.Provider>
  );
}

export function useOpportunities() {
  const context = useContext(OpportunitiesContext);
  if (!context) {
    throw new Error('useOpportunities deve ser usado dentro de OpportunitiesProvider');
  }
  return context;
}
