// Mock data for the academic extension system

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  course: string;
  matricula?: string;
  avatar?: string;
}

export type AdminRole = 'docente' | 'coordenador' | 'comissao' | 'secretaria' | 'admin' | 'discente';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  registration?: string; // matrícula ou SIAPE
  role: AdminRole;
  createdAt: string;
}

export type GroupMemberRole = 'diretor' | 'vice' | 'tesoureiro' | 'membro';

export const groupMemberRoleLabels: Record<GroupMemberRole, string> = {
  diretor: 'Diretor',
  vice: 'Vice-Diretor',
  tesoureiro: 'Tesoureiro',
  membro: 'Membro',
};

export type AllocationRule = "flexible" | "modular";

export interface PPCVersion {
  id: string;
  version: string;
  totalHours: number;
  allocationRule: AllocationRule;
  documentUrl?: string;
  author: string;
  effectiveDate: string;
  createdAt: string;
  isActive: boolean;
}

export interface ModularCategory {
  id: string;
  name: string;
  minPercentage: number;
  maxPercentage: number;
}

export interface Solicitation {
  id: string;
  activity: string;
  type: string;
  hours: number;
  submitDate: string;
  status: "Aprovado" | "Em Análise" | "Pendente" | "Rejeitado" | "Em Ajuste";
  studentId: string;
  studentName: string;
  studentMatricula: string;
  institution?: string;
  year?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  certificateUrl?: string;
  deadlineDays?: number;
  urgent?: boolean;
  delegatedTo?: string; // ID do membro da comissão que está ajudando
}

export interface StudentCertificate {
  id: string;
  name: string;
  email: string;
  enrollment: string;
  course: string;
}

export interface Opportunity {
  id: string;
  title: string;
  type: "Curso" | "Workshop" | "Projeto" | "Evento" | "Liga";
  description: string;
  hours: number;
  slots: number;
  filledSlots: number;
  date: string;
  instructor: string;
  status:
    | "Inscrições Abertas"
    | "Vagas Esgotadas"
    | "Encerrado"
    | "Ativo"
    | "Aprovado"
    | "Aguardando aprovação";
  validation: "Automática" | "Manual";
  period?: string;
  studentResponsible?: string;
  createdAt?: string;
  startDate?: string;
  endDate?: string;
  enrolledStudents: StudentCertificate[];
}

export interface Student {
  id: string;
  name: string;
  matricula: string;
  approvedHours: number;
  pendingHours: number;
  totalRequired: number;
  status: "Regular" | "Crítico (Abaixo da média)" | "Concluído";
  progress: number;
}

export interface Alert {
  id: string;
  type: "critical" | "warning" | "reminder";
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

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  matricula: string;
  role: GroupMemberRole;
}

export interface RoleHistoryEntry {
  id: string;
  groupId: string;
  memberId: string;
  memberName: string;
  memberMatricula: string;
  previousRole: GroupMemberRole | null;
  newRole: GroupMemberRole;
  changedBy: string;
  changedAt: string;
}

export interface StudentGroup {
  id: string;
  name: string;
  description: string;
  email: string;
  type: "diretorio_academico" | "liga" | "atletica" | "outros";
  responsibleTeacher: {
    id: string;
    name: string;
    email: string;
  };
  coordinator?: GroupMember;
  members: GroupMember[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export const groupTypeLabels: Record<StudentGroup["type"], string> = {
  diretorio_academico: "Diretório Acadêmico",
  liga: "Liga",
  atletica: "Atlética",
  outros: "Outros",
};

export const users = {
  student: {
    id: "1",
    name: "Ana Souza",
    email: "ana.souza@ufma.br",
    role: "discente",
    course: "Ciência da Computação",
    matricula: "2021001234",
  },
  coordinator: {
    id: "2",
    name: "Prof. Dr. Roberto Lima",
    email: "roberto.lima@ufma.br",
    role: "coordenador",
    course: "Ciência da Computação",
  },
  teacher: {
    id: "3",
    name: "João Silva",
    email: "joao.silva@ufma.br",
    role: "docente",
    course: "Ciência da Computação",
  },
  student_scholar: {
    id: "5",
    name: "João Pereira",
    email: "joao@discente.ufma.br",
    role: "student_scholar",
    course: "Ciência da Computação",
  },
  admin: {
    id: "6",
    name: "Leidiane",
    email: "leidiane@ufma.br",
    role: "admin",
    course: "Ciência da Computação",
  },
  user_comissao: {
    id: "7",
    name: "Humberto Silva",
    email: "humberto.silva@ufma.br",
    role: "comissao",
    course: "Ciência da Computação",
  },
};

export const groupsThatStudentIsPartOf: StudentGroup[] = [
  {
    id: '1',
    name: 'Diretório Acadêmico de Ciência da Computação',
    description: 'Representação estudantil do curso de Ciência da Computação, promovendo eventos acadêmicos e culturais.',
    email: 'da.computacao@universidade.edu.br',
    type: 'diretorio_academico',
    responsibleTeacher: {
      id: 't1',
      name: 'Dr. João Silva',
      email: 'joao.silva@ufma.br'
    },
    coordinator: {
      id: 's5',
      name: 'João Pereira',
      matricula: '2021001234',
      email: 'joao@discente.ufma.br',
      role: 'diretor',
    },
    members: [
      { id: 's1', name: 'João Pereira', email: 'joao@discente.ufma.br', role: 'diretor', matricula: '2021001234' },
      { id: 's2', name: 'Lucas Oliveira', email: 'lucas.oliveira@discente.ufma.br', role: 'membro', matricula: '2021005678' },
      { id: 's3', name: 'Maria Clara', email: 'maria.clara@discente.ufma.br', role: 'membro', matricula: '2021009012' },
    ],
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01",
  }
];

export const mockGroups: StudentGroup[] = [
  {
    id: '1',
    name: 'Diretório Acadêmico de Ciência da Computação',
    description: 'Representação estudantil do curso de Ciência da Computação, promovendo eventos acadêmicos e culturais.',
    email: 'da.computacao@universidade.edu.br',
    type: 'diretorio_academico',
    responsibleTeacher: {
      id: 't1',
      name: 'Dr. João Silva',
      email: 'joao.silva@ufma.br'
    },
    coordinator: {
      id: 's1',
      name: 'Ana Paula Santos',
      matricula: '2021001234',
      email: 'ana.santos@discente.ufma.br',
      role: 'diretor',
    },
    members: [
      { id: 's1', name: 'Ana Paula Santos', email: 'ana.santos@discente.ufma.br', role: 'diretor', matricula: '2021001234' },
      { id: 's2', name: 'Lucas Oliveira', email: 'lucas.oliveira@discente.ufma.br', role: 'membro', matricula: '2021005678' },
      { id: 's3', name: 'Maria Clara', email: 'maria.clara@discente.ufma.br', role: 'membro', matricula: '2021009012' },
    ],
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01",
  },
  {
    id: '2',
    name: 'Liga de Desenvolvimento Cardiológico',
    description: 'Liga acadêmica dedicada ao desenvolvimento de sistemas para ajudar no tratamento de doenças cardíacas.',
    email: 'liga.cardio@universidade.edu.br',
    type: 'liga',
    responsibleTeacher: {
      id: 't2',
      name: 'Dra. Fernanda Lima',
      email: 'fernanda.lima@ufma.br'
    },
    coordinator: {
      id: 's4',
      name: 'Pedro Henrique Costa',
      email: 'pedro.costa@aluno.ufma.br',
      matricula: '2022005678',
      role: 'diretor',
    },
    members: [
      { id: 's4', name: 'Pedro Henrique Costa', email: 'pedro.costa@aluno.ufma.br', role: 'diretor', matricula: '2022005678' },
      { id: 's5', name: 'Juliana Mendes', email: 'juliana.mendes@aluno.ufma.br', role: 'membro', matricula: '2022009012' },
    ],
    status: "active",
    createdAt: "2024-03-20",
    updatedAt: "2024-11-15",
  },
  {
    id: '3',
    name: 'Atlética LORD',
    description: 'Associação atlética responsável pelo esporte universitário do curso de Ciência da Computação.',
    email: 'atletica.lord@ufma.br',
    type: 'atletica',
    responsibleTeacher: {
      id: 't3',
      name: 'Prof. Roberto Campos',
      email: 'roberto.campos@ufma.br'
    },
    coordinator: {
      id: 's6',
      name: 'Gabriel Souza',
      email: 'gabriel.souza@discente.ufma.br',
      matricula: '2022012345',
      role: 'diretor',
    },
    members: [
      { id: 's6', name: 'Gabriel Souza', email: 'gabriel.souza@discente.ufma.br', role: 'diretor', matricula: '2022012345' },
      { id: 's7', name: 'Beatriz Almeida', email: 'beatriz.almeida@discente.ufma.br', role: 'membro', matricula: '2022016789' },
      { id: 's8', name: 'Thiago Martins', email: 'thiago.martins@discente.ufma.br', role: 'membro', matricula: '2022023456' },
      { id: 's9', name: 'Carolina Pereira', email: 'carolina.pereira@discente.ufma.br', role: 'membro', matricula: '2022027890' },
    ],
    status: "active",
    createdAt: "2023-08-10",
    updatedAt: "2024-10-20",
  },
  {
    id: '4',
    name: 'PETComp UFMA',
    description: 'Liga acadêmica focada em estudos oncológicos e cuidados paliativos.',
    email: 'liga.onco@ufma.br',
    type: 'liga',
    responsibleTeacher: {
      id: 't4',
      name: 'Dr. Marcos Antônio Reis',
      email: 'marcos.reis@ufma.br'
    },
    members: [],
    status: "inactive",
    createdAt: "2022-05-01",
    updatedAt: "2024-06-30",
  },
];

// Student progress data
export const studentProgress = {
  approved: 100,
  pending: 20,
  required: 300,
  ppcVersion: "PPC 2024.1",
};

// Mock solicitations
export const solicitations: Solicitation[] = [
  {
    id: "1",
    activity: "Curso de Python Avançado",
    type: "Curso",
    hours: 40,
    submitDate: "05/12/2025",
    status: "Aprovado",
    studentId: "1",
    studentName: "Ana Souza",
    studentMatricula: "2021001234",
    institution: "Universidade Federal do Maranhão",
    year: "2025",
    startDate: "2025-10-01",
    endDate: "2025-11-15",
    certificateUrl: "certificado_Ana Souza.pdf",
    deadlineDays: 2,
  },
  {
    id: "2",
    activity: "Workshop de Design Thinking",
    type: "Workshop",
    hours: 20,
    submitDate: "08/12/2025",
    status: "Em Análise",
    studentId: "1",
    studentName: "Ana Souza",
    studentMatricula: "2021001234",
    institution: "SEBRAE",
    year: "2025",
    startDate: "2025-11-20",
    endDate: "2025-11-22",
    certificateUrl: "certificado_Ana Souza.pdf",
    deadlineDays: 8,
  },
  {
    id: "3",
    activity: "Evento Tech Week",
    type: "Evento",
    hours: 20,
    submitDate: "13/10/2025",
    status: "Pendente",
    studentId: "3",
    studentName: "Carlos Lima",
    studentMatricula: "2023005",
    institution: "UFMA",
    year: "2025",
    startDate: "2025-11-10",
    endDate: "2025-11-14",
    certificateUrl: "certificado_Carlos Lima.pdf",
    deadlineDays: 8,
  },
  {
    id: "4",
    activity: "Projeto Comunidade Digital",
    type: "Projeto",
    hours: 60,
    submitDate: "11/10/2025",
    status: "Pendente",
    studentId: "4",
    studentName: "Maria Santos",
    studentMatricula: "2022015",
    institution: "Secretaria de Ação Social",
    year: "2025",
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    certificateUrl: "certificado_Maria Santos.pdf",
    deadlineDays: 1,
    urgent: true,
  },
  {
    id: "5",
    activity: "Workshop de Acessibilidade",
    type: "Workshop",
    hours: 16,
    submitDate: "10/10/2025",
    status: "Pendente",
    studentId: "5",
    studentName: "João Silva",
    studentMatricula: "2023012",
    institution: "Instituto Inclusão Brasil",
    year: "2025",
    startDate: "2025-09-15",
    endDate: "2025-09-17",
    certificateUrl: "certificado_João Silva.pdf",
    deadlineDays: 5,
  },
  {
    id: "6",
    activity: "Monitoria de Algoritmos",
    type: "Monitoria",
    hours: 80,
    submitDate: "09/10/2025",
    status: "Pendente",
    studentId: "6",
    studentName: "Beatriz Costa",
    studentMatricula: "2021078",
    institution: "UFMA - Departamento de Computação",
    year: "2025",
    startDate: "2025-08-15",
    endDate: "2025-12-10",
    certificateUrl: "certificado_Beatriz Costa.pdf",
    deadlineDays: 3,
  },
  {
    id: "7",
    activity: "Hackathon UFMA",
    type: "Evento",
    hours: 24,
    submitDate: "15/10/2025",
    status: "Em Ajuste",
    studentId: "1",
    studentName: "Ana Souza",
    studentMatricula: "2021001234",
    institution: "UFMA",
    year: "2025",
    startDate: "2025-10-25",
    endDate: "2025-10-27",
    certificateUrl: "certificado_Ana Souza.pdf",
    deadlineDays: 4,
  },
];

export const mockTeachers = [
  { id: "t1", name: "Dr. Carlos Eduardo Silva", email: "carlos.silva@ufma.br" },
  { id: "t2", name: "Dra. Fernanda Lima", email: "fernanda.lima@ufma.br" },
  { id: "t3", name: "Prof. Roberto Campos", email: "roberto.campos@ufma.br" },
  { id: "t4", name: "Dr. Marcos Antônio Reis", email: "marcos.reis@ufma.br" },
  { id: "t5", name: "Dra. Patricia Nogueira", email: "patricia.nogueira@ufma.br" },
];

// Membros da Comissão de Validação
export const commissionMembers = [
  { id: "cm1", name: "Prof. Dr. Carlos Eduardo Silva", email: "carlos.silva@ufma.br", role: "docente" },
  { id: "cm2", name: "Dra. Fernanda Lima", email: "fernanda.lima@ufma.br", role: "docente" },
  { id: "cm3", name: "Prof. Roberto Campos", email: "roberto.campos@ufma.br", role: "docente" },
  { id: "cm4", name: "Dr. Humberto Silva", email: "humberto.silva@ufma.br", role: "comissao" },
  { id: "cm5", name: "Dra. Patricia Nogueira", email: "patricia.nogueira@ufma.br", role: "docente" },
];

export const mockStudents = [
  { id: 's1', name: 'Ana Paula Santos', email: 'ana.santos@ufma.br', matricula: '2021001234' },
  { id: 's2', name: 'Lucas Oliveira', email: 'lucas.oliveira@ufma.br', matricula: '2021001235' },
  { id: 's3', name: 'Maria Clara', email: 'maria.clara@ufma.br', matricula: '2021001236' },
  { id: 's4', name: 'Pedro Henrique Costa', email: 'pedro.costa@ufma.br', matricula: '2021001237' },
  { id: 's5', name: 'Juliana Mendes', email: 'juliana.mendes@ufma.br', matricula: '2021001238' },
  { id: 's6', name: 'Gabriel Souza', email: 'gabriel.souza@ufma.br', matricula: '2021001239' },
  { id: 's7', name: 'Beatriz Almeida', email: 'beatriz.almeida@ufma.br', matricula: '2021001240' },
  { id: 's8', name: 'Thiago Martins', email: 'thiago.martins@ufma.br', matricula: '2021001241' },
  { id: 's9', name: 'Carolina Pereira', email: 'carolina.pereira@ufma.br', matricula: '2021001242' },
  { id: 's10', name: 'Rafael Gomes', email: 'rafael.gomes@ufma.br', matricula: '2021001243' },
];

// Mock opportunities
export const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Workshop de Acessibilidade Web",
    type: "Workshop",
    description:
      "Aprenda as melhores práticas para criar sites acessíveis seguindo as diretrizes WCAG 2.1",
    hours: 40,
    slots: 30,
    filledSlots: 18,
    date: "15/01/2026",
    instructor: "Prof. Carlos Santos",
    status: "Inscrições Abertas",
    validation: "Automática",
    period: "15/01/2026 - 22/01/2026",
    enrolledStudents: [
      { id: "s1", name: "Ana Carolina Santos", email: "ana.santos@email.com", enrollment: "2021001234", course: "Ciência da Computação" },
      { id: "s2", name: "Bruno Oliveira Lima", email: "bruno.lima@email.com", enrollment: "2021001235", course: "Engenharia de Software" },
      { id: "s3", name: "Carla Mendes", email: "carla.mendes@email.com", enrollment: "2021001236", course: "Ciência da Computação" },
      { id: "s4", name: "Daniel Ferreira", email: "daniel.ferreira@email.com", enrollment: "2021001237", course: "Sistemas de Informação" },
      { id: "s5", name: "Elena Rodrigues", email: "elena.rodrigues@email.com", enrollment: "2021001238", course: "Ciência da Computação" },
    ]
  },
  {
    id: "2",
    title: "Projeto Comunidade Digital",
    type: "Projeto",
    description:
      "Projeto de extensão voltado para inclusão digital em comunidades carentes",
    hours: 60,
    slots: 20,
    filledSlots: 12,
    date: "05/02/2026",
    instructor: "Profa. Maria Silva",
    status: "Inscrições Abertas",
    validation: "Manual",
    period: "01/02/2026 - 30/06/2026",
    enrolledStudents: [
      { id: "s10", name: "Julia Pereira", email: "julia.pereira@email.com", enrollment: "2020000111", course: "Engenharia Civil" },
      { id: "s11", name: "Kevin Santos", email: "kevin.santos@email.com", enrollment: "2020000112", course: "Matemática" },
      { id: "s12", name: "Larissa Gomes", email: "larissa.gomes@email.com", enrollment: "2020000113", course: "Física" },
    ]
  },
  {
    id: "3",
    title: "Curso de Python para Ciência de Dados",
    type: "Curso",
    description:
      "Curso completo de Python com foco em análise de dados e machine learning",
    hours: 30,
    slots: 40,
    filledSlots: 15,
    date: "10/01/2026",
    instructor: "Prof. João Costa",
    status: "Inscrições Abertas",
    validation: "Automática",
    period: "10/02/2026 - 10/03/2026",
    enrolledStudents: [
      { id: "s13", name: "Marcos Vieira", email: "marcos.vieira@email.com", enrollment: "2023003451", course: "Engenharia Ambiental" },
      { id: "s14", name: "Natália Souza", email: "natalia.souza@email.com", enrollment: "2023003452", course: "Biologia" },
      { id: "s15", name: "Oscar Barbosa", email: "oscar.barbosa@email.com", enrollment: "2023003453", course: "Química" },
      { id: "s16", name: "Patrícia Lima", email: "patricia.lima@email.com", enrollment: "2023003454", course: "Engenharia Ambiental" },
      { id: "s17", name: "Quirino Alves", email: "quirino.alves@email.com", enrollment: "2023003455", course: "Geografia" },
    ]
  },
  {
    id: "4",
    title: "Mostra de Inovação e Tecnologia",
    type: "Evento",
    description:
      "Evento anual para apresentação de projetos inovadores desenvolvidos na UFMA",
    hours: 16,
    slots: 100,
    filledSlots: 25,
    date: "20/03/2026",
    instructor: "Coord. Extensão",
    status: "Inscrições Abertas",
    validation: "Automática",
    enrolledStudents: [
      { id: "s18", name: "Rafael Cunha", email: "rafael.cunha@email.com", enrollment: "2021001567", course: "Química Industrial" },
      { id: "s19", name: "Samantha Dias", email: "samantha.dias@email.com", enrollment: "2021001568", course: "Química" },
      { id: "s20", name: "Thiago Rocha", email: "thiago.rocha@email.com", enrollment: "2021001569", course: "Engenharia Química" },
    ]
  },
  {
    id: "5",
    title: "Liga Acadêmica de Desenvolvimento Web",
    type: "Liga",
    description:
      "Grupo de estudos focado em tecnologias web modernas e desenvolvimento full-stack",
    hours: 45,
    slots: 25,
    filledSlots: 20,
    date: "01/03/2026",
    instructor: "Prof. Ana Lima",
    status: "Inscrições Abertas",
    validation: "Manual",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
  {
    id: "6",
    title: "Curso de Libras Básico",
    type: "Curso",
    description:
      "Curso introdutório de Língua Brasileira de Sinais para a comunidade acadêmica",
    hours: 20,
    slots: 30,
    filledSlots: 30,
    date: "15/02/2026",
    instructor: "Profa. Clara Souza",
    status: "Vagas Esgotadas",
    validation: "Automática",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
];

// Mock students for coordinator
export const students: Student[] = [
  {
    id: "1",
    name: "Ana Souza",
    matricula: "2021001234",
    approvedHours: 120,
    pendingHours: 20,
    totalRequired: 300,
    status: "Regular",
    progress: 40,
  },
  {
    id: "2",
    name: "João Silva",
    matricula: "2023005",
    approvedHours: 20,
    pendingHours: 0,
    totalRequired: 300,
    status: "Crítico (Abaixo da média)",
    progress: 7,
  },
  {
    id: "3",
    name: "Maria Santos",
    matricula: "2022015",
    approvedHours: 180,
    pendingHours: 40,
    totalRequired: 300,
    status: "Regular",
    progress: 60,
  },
  {
    id: "4",
    name: "Carlos Oliveira",
    matricula: "2021045",
    approvedHours: 250,
    pendingHours: 30,
    totalRequired: 300,
    status: "Regular",
    progress: 83,
  },
  {
    id: "5",
    name: "Beatriz Costa",
    matricula: "2023012",
    approvedHours: 45,
    pendingHours: 15,
    totalRequired: 300,
    status: "Crítico (Abaixo da média)",
    progress: 15,
  },
  {
    id: "6",
    name: "Pedro Alves",
    matricula: "2022030",
    approvedHours: 300,
    pendingHours: 0,
    totalRequired: 300,
    status: "Concluído",
    progress: 100,
  },
  {
    id: "7",
    name: "Julia Rocha",
    matricula: "2021078",
    approvedHours: 210,
    pendingHours: 20,
    totalRequired: 300,
    status: "Regular",
    progress: 70,
  },
  {
    id: "8",
    name: "Rafael Santos",
    matricula: "2023028",
    approvedHours: 90,
    pendingHours: 30,
    totalRequired: 300,
    status: "Crítico (Abaixo da média)",
    progress: 30,
  },
];

// Mock alerts
export const alerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Solicitação #4590 em ATRASO",
    description: "12 dias sem resposta da Comissão de Validação Geral",
    studentName: "Carlos Oliveira",
    responsible: "Comissão de Validação Geral",
    submitDate: "01/12/2025",
    deadline: "11/12/2025",
    daysLate: 12,
  },
  {
    id: "2",
    type: "critical",
    title: "Solicitação #4512 em ATRASO",
    description: "5 dias sem resposta da Comissão de Projetos",
    studentName: "Maria Santos",
    responsible: "Comissão de Projetos de Extensão",
    submitDate: "08/12/2025",
    deadline: "18/12/2025",
    daysLate: 5,
  },
  {
    id: "3",
    type: "warning",
    title: "Prazo Vencendo em 24h - Solicitação #4620",
    description: "Urgente: prazo de análise vence amanhã",
    studentName: "João Silva",
    responsible: "Comissão de Cursos",
    submitDate: "10/12/2025",
    deadline: "14/12/2025",
    hoursRemaining: 24,
  },
];

// Mock certificates
export const certificates: Certificate[] = [
  {
    id: "1",
    activity: "Curso de Python Avançado",
    type: "Curso",
    hours: 40,
    completionDate: "05/12/2025",
    validationCode: "CERT-2025-001234",
  },
  {
    id: "2",
    activity: "Semana de Tecnologia 2024",
    type: "Evento",
    hours: 20,
    completionDate: "15/11/2024",
    validationCode: "CERT-2024-005678",
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
  {
    name: "Ana Souza",
    matricula: "2021001234",
    requiredHours: 300,
    completedHours: 300,
    semester: "2025.2",
    status: "Apto para UCE",
  },
  {
    name: "João Silva",
    matricula: "2023001",
    requiredHours: 300,
    completedHours: 300,
    semester: "2025.2",
    status: "Apto para UCE",
  },
  {
    name: "Maria Santos",
    matricula: "2022015",
    requiredHours: 300,
    completedHours: 320,
    semester: "2025.2",
    status: "Apto para UCE",
  },
  {
    name: "Carlos Oliveira",
    matricula: "2021045",
    requiredHours: 300,
    completedHours: 305,
    semester: "2025.2",
    status: "Apto para UCE",
  },
];

// Coordinator opportunities management
export const coordinatorOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Workshop de Acessibilidade Web",
    type: "Workshop",
    description: "Aprenda as melhores práticas para criar sites acessíveis",
    hours: 16,
    slots: 30,
    filledSlots: 28,
    date: "15/01/2026",
    instructor: "Prof. Carlos Santos",
    status: "Ativo",
    validation: "Automática",
    period: "15/01/2026 - 22/01/2026",
    startDate: "2026-01-15",
    endDate: "2026-01-22",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
  {
    id: "2",
    title: "Projeto Comunidade Digital",
    type: "Projeto",
    description: "Projeto de extensão voltado para inclusão digital",
    hours: 60,
    slots: 15,
    filledSlots: 15,
    date: "01/02/2026",
    instructor: "Profa. Maria Silva",
    status: "Ativo",
    validation: "Manual",
    period: "01/02/2026 - 30/06/2026",
    startDate: "2026-02-01",
    endDate: "2026-06-30",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
  {
    id: "3",
    title: "Curso de Python para Iniciantes",
    type: "Curso",
    description: "Curso introdutório de Python",
    hours: 40,
    slots: 25,
    filledSlots: 23,
    date: "10/02/2026",
    instructor: "Prof. João Costa",
    status: "Ativo",
    validation: "Automática",
    period: "10/02/2026 - 10/03/2026",
    startDate: "2026-02-10",
    endDate: "2026-03-10",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
  {
    id: "4",
    title: "Semana de Tecnologia 2025",
    type: "Evento",
    description: "Evento anual de tecnologia",
    hours: 20,
    slots: 100,
    filledSlots: 87,
    date: "01/11/2025",
    instructor: "Coord. Extensão",
    status: "Encerrado",
    validation: "Automática",
    period: "01/11/2025 - 05/11/2025",
    startDate: "2025-11-01",
    endDate: "2025-11-05",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
  {
    id: "5",
    title: "Liga de Desenvolvimento Web",
    type: "Projeto",
    description: "Grupo de estudos de tecnologias web",
    hours: 80,
    slots: 20,
    filledSlots: 12,
    date: "15/01/2026",
    instructor: "Prof. Ana Lima",
    status: "Ativo",
    validation: "Manual",
    period: "15/01/2026 - 30/06/2026",
    startDate: "2026-01-15",
    endDate: "2026-06-30",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
];

// Activity types for forms
export const activityTypes = [
  "Curso",
  "Workshop",
  "Projeto",
  "Evento",
  "Liga",
  "Monitoria",
  "Estágio",
  "Voluntariado",
  "Pesquisa",
  "Outro",
];

export const mockPPCVersions: PPCVersion[] = [
  {
    id: "1",
    version: "PPC 2024.1",
    totalHours: 300,
    allocationRule: "flexible",
    documentUrl: "/docs/ppc-2024-1.pdf",
    author: "Prof. Dr. Roberto Lima",
    effectiveDate: "2024-01-15",
    createdAt: "2024-01-10T10:30:00Z",
    isActive: true,
  },
  {
    id: "2",
    version: "PPC 2023.2",
    totalHours: 280,
    allocationRule: "modular",
    documentUrl: "/docs/ppc-2023-2.pdf",
    author: "Prof. Dra. Maria Santos",
    effectiveDate: "2023-08-01",
    createdAt: "2023-07-25T14:00:00Z",
    isActive: false,
  },
  {
    id: "3",
    version: "PPC 2023.1",
    totalHours: 250,
    allocationRule: "flexible",
    documentUrl: "/docs/ppc-2023-1.pdf",
    author: "Prof. Dr. Carlos Mendes",
    effectiveDate: "2023-02-01",
    createdAt: "2023-01-20T09:15:00Z",
    isActive: false,
  },
  {
    id: "4",
    version: "PPC 2022.1",
    totalHours: 240,
    allocationRule: "modular",
    author: "Prof. Dr. Roberto Lima",
    effectiveDate: "2022-03-01",
    createdAt: "2022-02-15T11:00:00Z",
    isActive: false,
  },
];

export const mockAuthors = [
  'Prof. Dr. Roberto Lima',
  'Prof. Dra. Maria Santos',
  'Prof. Dr. Carlos Mendes',
  'Prof. Dra. Ana Paula Silva',
];

export const mockRoleHistory: RoleHistoryEntry[] = [
  {
    id: 'h1',
    groupId: '1',
    memberId: 's1',
    memberName: 'Ana Paula Santos',
    memberMatricula: '2021001234',
    previousRole: 'vice',
    newRole: 'diretor',
    changedBy: 'Dr. João Silva',
    changedAt: '2024-11-15T10:30:00Z',
  },
  {
    id: 'h2',
    groupId: '1',
    memberId: 's2',
    memberName: 'Lucas Oliveira',
    memberMatricula: '2021005678',
    previousRole: 'membro',
    newRole: 'vice',
    changedBy: 'Dr. João Silva',
    changedAt: '2024-11-15T10:35:00Z',
  },
  {
    id: 'h3',
    groupId: '1',
    memberId: 's3',
    memberName: 'Maria Clara',
    memberMatricula: '2022003456',
    previousRole: null,
    newRole: 'tesoureiro',
    changedBy: 'Dr. João Silva',
    changedAt: '2024-10-01T14:00:00Z',
  },
  {
    id: 'h4',
    groupId: '1',
    memberId: 's1',
    memberName: 'Ana Paula Santos',
    memberMatricula: '2021001234',
    previousRole: null,
    newRole: 'vice',
    changedBy: 'Dr. João Silva',
    changedAt: '2024-03-10T09:00:00Z',
  },
  {
    id: 'h5',
    groupId: '3',
    memberId: 's6',
    memberName: 'Gabriel Souza',
    memberMatricula: '2021002345',
    previousRole: 'membro',
    newRole: 'diretor',
    changedBy: 'Prof. Roberto Campos',
    changedAt: '2024-09-01T11:00:00Z',
  },
  {
    id: 'h6',
    groupId: '3',
    memberId: 's7',
    memberName: 'Beatriz Almeida',
    memberMatricula: '2021006789',
    previousRole: null,
    newRole: 'vice',
    changedBy: 'Prof. Roberto Campos',
    changedAt: '2024-09-01T11:15:00Z',
  },
];

export const userCreatedOpportunities: Opportunity[] = [
  {
    id: "uc1",
    title: "Workshop de React Avançado",
    type: "Workshop",
    description: "Aprenda técnicas avançadas de React com Hooks e Context API",
    hours: 16,
    slots: 25,
    filledSlots: 18,
    date: "20/01/2026",
    instructor: "Dr. Carlos Eduardo Silva",
    status: "Ativo",
    validation: "Manual",
    period: "20/01/2026 - 27/01/2026",
    studentResponsible: "Ana Paula Santos",
    createdAt: "10/12/2025",
    startDate: "2026-01-20",
    endDate: "2026-01-27",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
  {
    id: "uc2",
    title: "Projeto: Sistema de Gerenciamento Acadêmico",
    type: "Projeto",
    description: "Desenvolvimento de um sistema acadêmico em equipe",
    hours: 80,
    slots: 20,
    filledSlots: 15,
    date: "01/02/2026",
    instructor: "Dra. Fernanda Lima",
    status: "Aprovado",
    validation: "Manual",
    period: "01/02/2026 - 30/06/2026",
    studentResponsible: "Lucas Oliveira",
    createdAt: "15/11/2025",
    startDate: "2026-02-01",
    endDate: "2026-06-30",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
  {
    id: "uc3",
    title: "Minicurso de JavaScript ES6+",
    type: "Curso",
    description: "Introdução aos novos recursos do JavaScript moderno",
    hours: 12,
    slots: 40,
    filledSlots: 22,
    date: "10/01/2026",
    instructor: "Prof. Roberto Campos",
    status: "Inscrições Abertas",
    validation: "Automática",
    period: "10/01/2026 - 20/01/2026",
    studentResponsible: "Maria Clara",
    createdAt: "05/12/2025",
    startDate: "2026-01-10",
    endDate: "2026-01-20",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
  {
    id: "uc4",
    title: "Workshop de Python com Data Science",
    type: "Workshop",
    description: "Análise de dados e visualização com Python",
    hours: 20,
    slots: 30,
    filledSlots: 28,
    date: "15/12/2025",
    instructor: "Dra. Patricia Nogueira",
    status: "Encerrado",
    validation: "Automática",
    period: "15/12/2025 - 22/12/2025",
    studentResponsible: "Gabriel Souza",
    createdAt: "10/11/2025",
    startDate: "2025-12-15",
    endDate: "2025-12-22",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
  {
    id: "uc5",
    title: "Liga de Empreendedorismo",
    type: "Liga",
    description: "Desenvolvimento de projetos empreendedores",
    hours: 60,
    slots: 15,
    filledSlots: 15,
    date: "03/10/2025",
    instructor: "Dr. Marcos Antônio Reis",
    status: "Encerrado",
    validation: "Manual",
    period: "03/10/2025 - 30/11/2025",
    studentResponsible: "Beatriz Almeida",
    createdAt: "20/08/2025",
    startDate: "2025-10-03",
    endDate: "2025-11-30",
    enrolledStudents: [
      { id: "s21", name: "Úrsula Fernandes", email: "ursula.fernandes@email.com", enrollment: "2022002678", course: "Letras" },
      { id: "s22", name: "Victor Hugo", email: "victor.hugo@email.com", enrollment: "2022002679", course: "Pedagogia" },
      { id: "s23", name: "Wanda Nascimento", email: "wanda.nascimento@email.com", enrollment: "2022002680", course: "Fonoaudiologia" },
      { id: "s24", name: "Xavier Pinto", email: "xavier.pinto@email.com", enrollment: "2022002681", course: "Psicologia" },
    ]
  },
];