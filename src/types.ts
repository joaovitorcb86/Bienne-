import { LucideIcon } from 'lucide-react';

export enum UserRole {
  COLABORADOR = 'COLABORADOR',
  SOCIO = 'SOCIO',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  professionalId: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  bloodType: string;
  status: 'active' | 'inactive';
  lastVisit: string;
  phone: string;
  email: string;
  address: string;
  diagnosis: string;
  vitals: {
    heartRate: string;
    bloodPressure: string;
    temperature: string;
  };
  alerts: string[];
}

export interface ClinicalNote {
  id: string;
  patientId: string;
  date: string;
  author: string;
  type: string;
  content: {
    s: string; // Subjective
    o: string; // Objective
    a: string; // Assessment
    p: string; // Plan
  };
}

export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  address: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Protocol {
  id: string;
  name: string;
  description: string;
  guidelines: string[];
}
