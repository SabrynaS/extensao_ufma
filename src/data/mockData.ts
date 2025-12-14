// Mock data for the academic extension system

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'coordinator';
  course: string;
  matricula?: string;
  avatar?: string;
}

export interface Solicitation {
  id: string;
  activity: string;
  type: string;
  hours: number;
  submitDate: string;
  status: 'Aprovado' | 'Em Análise' | 'Pendente' | 'Rejeitado' | 'Em Ajuste';
  studentId: string;
  studentName: string;
  studentMatricula: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  certificateUrl?: string;
  deadlineDays?: number;
  urgent?: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  type: 'Curso' | 'Workshop' | 'Projeto' | 'Evento' | 'Liga';
  description: string;
  hours: number;
  slots: number;
  filledSlots: number;
  date: string;
  instructor: string;
  status: 'Inscrições Abertas' | 'Vagas Esgotadas' | 'Encerrado' | 'Ativo';
  validation: 'Automática' | 'Manual';
  period?: string;
}

export interface Student {
  id: string;
  name: string;
  matricula: string;
  approvedHours: number;
  pendingHours: number;
  totalRequired: number;
  status: 'Regular' | 'Crítico (Abaixo da média)' | 'Atenção' | 'Concluído';
  progress: number;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'reminder';
  title: string;
  description: string;
  studentName: string;
  responsible: string;
  submitDate: string;
  deadline: string;
  daysLate?: number;
  hoursRemaining?: number;
}

export interface Certificate {
  id: string;
  activity: string;
  type: string;
  hours: number;
  completionDate: string;
  validationCode: string;
}

// Current user (simulated)
export const currentUser: User = {
  id: '1',
  name: 'Ana Souza',
  email: 'ana.souza@ufma.br',
  role: 'student',
  course: 'Ciência da Computação',
  matricula: '2021001234',
};

export const coordinatorUser: User = {
  id: '2',
  name: 'Prof. Dr. Roberto Lima',
  email: 'roberto.lima@ufma.br',
  role: 'coordinator',
  course: 'Ciência da Computação',
};

// Student progress data
export const studentProgress = {
  approved: 100,
  pending: 20,
  required: 300,
  ppcVersion: 'PPC 2024.1',
};

// Mock solicitations
export const solicitations: Solicitation[] = [
  {
    id: '1',
    activity: 'Curso de Python Avançado',
    type: 'Curso',
    hours: 40,
    submitDate: '05/12/2025',
    status: 'Aprovado',
    studentId: '1',
    studentName: 'Ana Souza',
    studentMatricula: '2021001234',
    institution: 'Universidade Federal do Maranhão',
    startDate: '2025-10-01',
    endDate: '2025-11-15',
    deadlineDays: 2,
  },
  {
    id: '2',
    activity: 'Workshop de Design Thinking',
    type: 'Workshop',
    hours: 20,
    submitDate: '08/12/2025',
    status: 'Em Análise',
    studentId: '1',
    studentName: 'Ana Souza',
    studentMatricula: '2021001234',
    institution: 'SEBRAE',
    deadlineDays: 8,
  },
  {
    id: '3',
    activity: 'Evento Tech Week',
    type: 'Evento',
    hours: 20,
    submitDate: '13/10/2025',
    status: 'Pendente',
    studentId: '3',
    studentName: 'Carlos Lima',
    studentMatricula: '2023005',
    deadlineDays: 8,
  },
  {
    id: '4',
    activity: 'Projeto Comunidade Digital',
    type: 'Projeto',
    hours: 60,
    submitDate: '11/10/2025',
    status: 'Pendente',
    studentId: '4',
    studentName: 'Maria Santos',
    studentMatricula: '2022015',
    deadlineDays: 1,
    urgent: true,
  },
  {
    id: '5',
    activity: 'Workshop de Acessibilidade',
    type: 'Workshop',
    hours: 16,
    submitDate: '10/10/2025',
    status: 'Pendente',
    studentId: '5',
    studentName: 'João Silva',
    studentMatricula: '2023012',
    deadlineDays: 5,
  },
  {
    id: '6',
    activity: 'Monitoria de Algoritmos',
    type: 'Monitoria',
    hours: 80,
    submitDate: '09/10/2025',
    status: 'Pendente',
    studentId: '6',
    studentName: 'Beatriz Costa',
    studentMatricula: '2021078',
    deadlineDays: 3,
  },
  {
    id: '7',
    activity: 'Hackathon UFMA',
    type: 'Evento',
    hours: 24,
    submitDate: '15/10/2025',
    status: 'Em Ajuste',
    studentId: '1',
    studentName: 'Ana Souza',
    studentMatricula: '2021001234',
    deadlineDays: 4,
  },
];

// Mock opportunities
export const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Workshop de Acessibilidade Web',
    type: 'Workshop',
    description: 'Aprenda as melhores práticas para criar sites acessíveis seguindo as diretrizes WCAG 2.1',
    hours: 40,
    slots: 30,
    filledSlots: 18,
    date: '15/01/2026',
    instructor: 'Prof. Carlos Santos',
    status: 'Inscrições Abertas',
    validation: 'Automática',
    period: '15/01/2026 - 22/01/2026',
  },
  {
    id: '2',
    title: 'Projeto Comunidade Digital',
    type: 'Projeto',
    description: 'Projeto de extensão voltado para inclusão digital em comunidades carentes',
    hours: 60,
    slots: 20,
    filledSlots: 12,
    date: '05/02/2026',
    instructor: 'Profa. Maria Silva',
    status: 'Inscrições Abertas',
    validation: 'Manual',
    period: '01/02/2026 - 30/06/2026',
  },
  {
    id: '3',
    title: 'Curso de Python para Ciência de Dados',
    type: 'Curso',
    description: 'Curso completo de Python com foco em análise de dados e machine learning',
    hours: 30,
    slots: 40,
    filledSlots: 15,
    date: '10/01/2026',
    instructor: 'Prof. João Costa',
    status: 'Inscrições Abertas',
    validation: 'Automática',
    period: '10/02/2026 - 10/03/2026',
  },
  {
    id: '4',
    title: 'Mostra de Inovação e Tecnologia',
    type: 'Evento',
    description: 'Evento anual para apresentação de projetos inovadores desenvolvidos na UFMA',
    hours: 16,
    slots: 100,
    filledSlots: 25,
    date: '20/03/2026',
    instructor: 'Coord. Extensão',
    status: 'Inscrições Abertas',
    validation: 'Automática',
  },
  {
    id: '5',
    title: 'Liga Acadêmica de Desenvolvimento Web',
    type: 'Liga',
    description: 'Grupo de estudos focado em tecnologias web modernas e desenvolvimento full-stack',
    hours: 45,
    slots: 25,
    filledSlots: 20,
    date: '01/03/2026',
    instructor: 'Prof. Ana Lima',
    status: 'Inscrições Abertas',
    validation: 'Manual',
  },
  {
    id: '6',
    title: 'Curso de Libras Básico',
    type: 'Curso',
    description: 'Curso introdutório de Língua Brasileira de Sinais para a comunidade acadêmica',
    hours: 20,
    slots: 30,
    filledSlots: 30,
    date: '15/02/2026',
    instructor: 'Profa. Clara Souza',
    status: 'Vagas Esgotadas',
    validation: 'Automática',
  },
];

// Mock students for coordinator
export const students: Student[] = [
  { id: '1', name: 'Ana Souza', matricula: '2021001234', approvedHours: 120, pendingHours: 20, totalRequired: 300, status: 'Regular', progress: 40 },
  { id: '2', name: 'João Silva', matricula: '2023005', approvedHours: 20, pendingHours: 0, totalRequired: 300, status: 'Crítico (Abaixo da média)', progress: 7 },
  { id: '3', name: 'Maria Santos', matricula: '2022015', approvedHours: 180, pendingHours: 40, totalRequired: 300, status: 'Regular', progress: 60 },
  { id: '4', name: 'Carlos Oliveira', matricula: '2021045', approvedHours: 250, pendingHours: 30, totalRequired: 300, status: 'Regular', progress: 83 },
  { id: '5', name: 'Beatriz Costa', matricula: '2023012', approvedHours: 45, pendingHours: 15, totalRequired: 300, status: 'Atenção', progress: 15 },
  { id: '6', name: 'Pedro Alves', matricula: '2022030', approvedHours: 300, pendingHours: 0, totalRequired: 300, status: 'Concluído', progress: 100 },
  { id: '7', name: 'Julia Rocha', matricula: '2021078', approvedHours: 210, pendingHours: 20, totalRequired: 300, status: 'Regular', progress: 70 },
  { id: '8', name: 'Rafael Santos', matricula: '2023028', approvedHours: 90, pendingHours: 30, totalRequired: 300, status: 'Atenção', progress: 30 },
];

// Mock alerts
export const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Solicitação #4590 em ATRASO',
    description: '12 dias sem resposta da Comissão de Validação Geral',
    studentName: 'Carlos Oliveira',
    responsible: 'Comissão de Validação Geral',
    submitDate: '01/12/2025',
    deadline: '11/12/2025',
    daysLate: 12,
  },
  {
    id: '2',
    type: 'critical',
    title: 'Solicitação #4512 em ATRASO',
    description: '5 dias sem resposta da Comissão de Projetos',
    studentName: 'Maria Santos',
    responsible: 'Comissão de Projetos de Extensão',
    submitDate: '08/12/2025',
    deadline: '18/12/2025',
    daysLate: 5,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Prazo Vencendo em 24h - Solicitação #4620',
    description: 'Urgente: prazo de análise vence amanhã',
    studentName: 'João Silva',
    responsible: 'Comissão de Cursos',
    submitDate: '10/12/2025',
    deadline: '14/12/2025',
    hoursRemaining: 24,
  },
];

// Mock certificates
export const certificates: Certificate[] = [
  {
    id: '1',
    activity: 'Curso de Python Avançado',
    type: 'Curso',
    hours: 40,
    completionDate: '05/12/2025',
    validationCode: 'CERT-2025-001234',
  },
  {
    id: '2',
    activity: 'Semana de Tecnologia 2024',
    type: 'Evento',
    hours: 20,
    completionDate: '15/11/2024',
    validationCode: 'CERT-2024-005678',
  },
];

// Coordinator stats
export const coordinatorStats = {
  totalStudents: 450,
  concluded: 85,
  averageProgress: 42,
  pending: 28,
  approvalRate: 87,
};

// Report data
export const reportData = [
  { name: 'Ana Souza', matricula: '2021001234', requiredHours: 300, completedHours: 300, semester: '2025.2', status: 'Apto para UCE' },
  { name: 'João Silva', matricula: '2023001', requiredHours: 300, completedHours: 300, semester: '2025.2', status: 'Apto para UCE' },
  { name: 'Maria Santos', matricula: '2022015', requiredHours: 300, completedHours: 320, semester: '2025.2', status: 'Apto para UCE' },
  { name: 'Carlos Oliveira', matricula: '2021045', requiredHours: 300, completedHours: 305, semester: '2025.2', status: 'Apto para UCE' },
];

// Coordinator opportunities management
export const coordinatorOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Workshop de Acessibilidade Web',
    type: 'Workshop',
    description: 'Aprenda as melhores práticas para criar sites acessíveis',
    hours: 16,
    slots: 30,
    filledSlots: 28,
    date: '15/01/2026',
    instructor: 'Prof. Carlos Santos',
    status: 'Ativo',
    validation: 'Automática',
    period: '15/01/2026 - 22/01/2026',
  },
  {
    id: '2',
    title: 'Projeto Comunidade Digital',
    type: 'Projeto',
    description: 'Projeto de extensão voltado para inclusão digital',
    hours: 60,
    slots: 15,
    filledSlots: 15,
    date: '01/02/2026',
    instructor: 'Profa. Maria Silva',
    status: 'Ativo',
    validation: 'Manual',
    period: '01/02/2026 - 30/06/2026',
  },
  {
    id: '3',
    title: 'Curso de Python para Iniciantes',
    type: 'Curso',
    description: 'Curso introdutório de Python',
    hours: 40,
    slots: 25,
    filledSlots: 23,
    date: '10/02/2026',
    instructor: 'Prof. João Costa',
    status: 'Ativo',
    validation: 'Automática',
    period: '10/02/2026 - 10/03/2026',
  },
  {
    id: '4',
    title: 'Semana de Tecnologia 2025',
    type: 'Evento',
    description: 'Evento anual de tecnologia',
    hours: 20,
    slots: 100,
    filledSlots: 87,
    date: '01/11/2025',
    instructor: 'Coord. Extensão',
    status: 'Encerrado',
    validation: 'Automática',
    period: '01/11/2025 - 05/11/2025',
  },
  {
    id: '5',
    title: 'Liga de Desenvolvimento Web',
    type: 'Projeto',
    description: 'Grupo de estudos de tecnologias web',
    hours: 80,
    slots: 20,
    filledSlots: 12,
    date: '15/01/2026',
    instructor: 'Prof. Ana Lima',
    status: 'Ativo',
    validation: 'Manual',
    period: '15/01/2026 - 30/06/2026',
  },
];

// Activity types for forms
export const activityTypes = [
  'Curso',
  'Workshop',
  'Projeto',
  'Evento',
  'Liga',
  'Monitoria',
  'Estágio',
  'Voluntariado',
  'Pesquisa',
  'Outro',
];
