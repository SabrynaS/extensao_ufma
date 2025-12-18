import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudentGroup } from '@/data/mockData';
import { mockGroups } from '@/data/mockData';

interface StudentGroupsContextType {
  groups: StudentGroup[];
  addGroup: (group: StudentGroup) => void;
  updateGroup: (id: string, group: StudentGroup) => void;
  deleteGroup: (id: string) => void;
  getGroupById: (id: string) => StudentGroup | undefined;
}

const StudentGroupsContext = createContext<StudentGroupsContextType | undefined>(undefined);

export const StudentGroupsProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<StudentGroup[]>([]);

  // Load groups from localStorage on mount
  useEffect(() => {
    const savedGroups = localStorage.getItem('studentGroups');
    if (savedGroups) {
      try {
        setGroups(JSON.parse(savedGroups));
      } catch (error) {
        console.error('Failed to parse saved groups:', error);
        setGroups(mockGroups);
        localStorage.setItem('studentGroups', JSON.stringify(mockGroups));
      }
    } else {
      setGroups(mockGroups);
      localStorage.setItem('studentGroups', JSON.stringify(mockGroups));
    }
  }, []);

  // Save groups to localStorage whenever they change
  useEffect(() => {
    if (groups.length > 0) {
      localStorage.setItem('studentGroups', JSON.stringify(groups));
    }
  }, [groups]);

  const addGroup = (group: StudentGroup) => {
    setGroups((prev) => [...prev, group]);
  };

  const updateGroup = (id: string, group: StudentGroup) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? group : g))
    );
  };

  const deleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const getGroupById = (id: string) => {
    return groups.find((g) => g.id === id);
  };

  return (
    <StudentGroupsContext.Provider
      value={{
        groups,
        addGroup,
        updateGroup,
        deleteGroup,
        getGroupById,
      }}
    >
      {children}
    </StudentGroupsContext.Provider>
  );
};

export const useStudentGroups = () => {
  const context = useContext(StudentGroupsContext);
  if (context === undefined) {
    throw new Error('useStudentGroups must be used within a StudentGroupsProvider');
  }
  return context;
};
