import { User, UserRole, Patient, Appointment, ClinicalNote } from './types';

export const MOCK_USER: User = {
  id: '1',
  name: 'Dr. Aris',
  role: UserRole.SOCIO,
  professionalId: 'PHT-123-456',
};

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'BN-8829',
    name: 'Eleanor Shellstrop',
    age: 34,
    bloodType: 'O+',
    status: 'active',
    lastVisit: '2023-10-24',
    phone: '(11) 98765-4321',
    email: 'eleanor@thegoodplace.com',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    diagnosis: 'Lombalgia Crônica',
    vitals: {
      heartRate: '72 bpm',
      bloodPressure: '120/80',
      temperature: '98.6°F',
    },
    alerts: ['Penicilina', 'Amendoim', 'Látex'],
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientName: 'Eleanor Shellstrop',
    date: '2023-10-24',
    time: '09:00',
    type: 'Consulta Domiciliar',
    address: 'Rua das Flores, 123',
    status: 'scheduled',
  },
  {
    id: '2',
    patientName: 'Chidi Anagonye',
    date: '2023-10-24',
    time: '10:30',
    type: 'Fisioterapia Motora',
    address: 'Av. Paulista, 1000',
    status: 'scheduled',
  },
  {
    id: '3',
    patientName: 'Tahani Al-Jamil',
    date: '2023-10-25',
    time: '11:15',
    type: 'Reabilitação de Joelho',
    address: 'Alameda Santos, 500',
    status: 'scheduled',
  },
];

export const MOCK_NOTES: ClinicalNote[] = [
  {
    id: 'n1',
    patientId: 'BN-8829',
    date: '02 Mar, 2026',
    author: 'Dr. Aris',
    type: 'Consulta Geral',
    content: {
      s: 'Paciente relata melhora significativa na dor lombar após início dos exercícios.',
      o: 'Amplitude de movimento preservada, sem sinais de inflamação aguda.',
      a: 'Evolução positiva do quadro de lombalgia crônica.',
      p: 'Manter protocolo de exercícios e reavaliar em 15 dias.',
    },
  },
];

export const PROTOCOLS = [
  {
    id: 'p1',
    name: 'Lombalgia Aguda',
    guidelines: [
      'Mobilização neural leve',
      'Exercícios de controle motor',
      'Evitar repouso absoluto',
    ],
  },
  {
    id: 'p2',
    name: 'Pós-Operatório de Joelho',
    guidelines: [
      'Controle de edema',
      'Ganho de ADM passiva',
      'Ativação de quadríceps',
    ],
  },
];
