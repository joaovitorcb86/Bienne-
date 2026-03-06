import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './Dashboard';
import { PatientRecord } from './PatientRecord';
import { SOAPForm } from './components/SOAPForm';
import { Agenda } from './components/Agenda';
import { Patients } from './components/Patients';
import { Documents } from './components/Documents';
import { Login } from './Login';
import { User, UserRole, Patient, Appointment } from './types';
import { MOCK_USER, MOCK_PATIENTS, MOCK_APPOINTMENTS, MOCK_NOTES } from './constants';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { Button, Hexagon } from './components/UI';
import { ClinicalNote } from './types';

type View = 'dashboard' | 'patients' | 'schedule' | 'documents' | 'patient-record' | 'soap-form' | 'settings';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editingNote, setEditingNote] = useState<ClinicalNote | null>(null);
  const [notes, setNotes] = useState<ClinicalNote[]>(MOCK_NOTES);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);

  const updatePatient = (updatedPatient: Patient) => {
    setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    if (selectedPatient?.id === updatedPatient.id) {
      setSelectedPatient(updatedPatient);
    }
  };

  const handleLogin = (id: string, role: UserRole) => {
    setUser({
      id: '1',
      name: id.split('@')[0] || 'Dr. Aris',
      role: role,
      professionalId: id,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
    setSelectedPatient(null);
  };

  const openPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('patient-record');
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    if (view !== 'patient-record' && view !== 'soap-form') {
      setSelectedPatient(null);
      setEditingNote(null);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const getActiveMenuView = () => {
    if (currentView === 'patient-record' || currentView === 'soap-form') return 'patients';
    return currentView;
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      isFocusMode={currentView === 'soap-form'}
      activeView={getActiveMenuView()}
      onNavigate={handleNavigate}
    >
      <AnimatePresence mode="wait">
        {currentView === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Dashboard role={user.role} onNavigate={handleNavigate} />
            {!user.role.includes('SOCIO') && (
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Pacientes Recentes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {patients.slice(0, 3).map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => openPatient(p)}
                      className="bg-white p-6 angled-card border border-stone-100 hover:border-primary transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <Hexagon className="w-12 h-12 bg-interactive-surface border border-primary/10">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} alt={p.name} className="w-8 h-8" />
                        </Hexagon>
                        <div>
                          <h4 className="font-bold group-hover:text-primary transition-colors text-sm">{p.name}</h4>
                          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">ID: {p.id} • {p.lastVisit}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {currentView === 'schedule' && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Agenda 
              appointments={appointments} 
              patients={patients}
              onAddAppointment={(newApp) => setAppointments(prev => [...prev, newApp])}
              onRemoveAppointment={(id) => setAppointments(prev => prev.filter(a => a.id !== id))}
            />
          </motion.div>
        )}

        {currentView === 'patients' && (
          <motion.div
            key="patients"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Patients 
              patients={patients} 
              onOpenPatient={openPatient} 
              onUpdatePatients={(newPatients) => {
                setPatients(newPatients);
                if (selectedPatient && !newPatients.find(p => p.id === selectedPatient.id)) {
                  setSelectedPatient(null);
                  setCurrentView('dashboard');
                }
              }}
            />
          </motion.div>
        )}

        {currentView === 'documents' && (
          <motion.div
            key="documents"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Documents 
              notes={notes} 
              patients={patients} 
              onOpenPatient={openPatient} 
            />
          </motion.div>
        )}

        {currentView === 'patient-record' && selectedPatient && (
          <motion.div
            key="patient-record"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <Button variant="ghost" onClick={() => setCurrentView('dashboard')} className="mb-4">
              <ChevronLeft className="w-4 h-4" />
              Voltar ao Painel
            </Button>
            <PatientRecord 
              patient={selectedPatient} 
              notes={notes.filter(n => n.patientId === selectedPatient.id)}
              onNewEntry={() => {
                setEditingNote(null);
                setCurrentView('soap-form');
              }} 
              onEditNote={(note) => {
                setEditingNote(note);
                setCurrentView('soap-form');
              }}
              onDeleteNote={(id) => {
                setNotes(prev => prev.filter(n => n.id !== id));
              }}
              onUpdatePatient={updatePatient}
            />
          </motion.div>
        )}

        {currentView === 'soap-form' && selectedPatient && (
          <motion.div
            key="soap-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <Button variant="ghost" onClick={() => {
                setCurrentView('patient-record');
                setEditingNote(null);
              }} className="mb-4">
                <ChevronLeft className="w-4 h-4" />
                Voltar ao Prontuário
              </Button>
              <h2 className="text-3xl font-display font-bold">
                {editingNote ? 'Editar Evolução Clínica' : 'Nova Evolução Clínica'}
              </h2>
              <p className="text-stone-500">Paciente: <span className="font-bold text-stone-900">{selectedPatient.name}</span></p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
              <SOAPForm 
                onCancel={() => {
                  setCurrentView('patient-record');
                  setEditingNote(null);
                }}
                initialData={editingNote ? {
                  s: editingNote.content.s,
                  o: editingNote.content.o,
                  a: editingNote.content.a,
                  p: editingNote.content.p,
                  type: editingNote.type
                } : undefined}
                onSubmit={(data) => {
                  if (editingNote) {
                    setNotes(prev => prev.map(n => n.id === editingNote.id ? {
                      ...n,
                      type: data.type,
                      content: { s: data.s, o: data.o, a: data.a, p: data.p }
                    } : n));
                  } else {
                    const newNote: ClinicalNote = {
                      id: `n-${Date.now()}`,
                      patientId: selectedPatient.id,
                      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
                      author: user.name,
                      type: data.type,
                      content: {
                        s: data.s,
                        o: data.o,
                        a: data.a,
                        p: data.p,
                      },
                    };
                    setNotes(prev => [newNote, ...prev]);
                  }
                  setEditingNote(null);
                  setCurrentView('patient-record');
                }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
