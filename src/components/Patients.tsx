import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, Phone, Mail, MapPin, Edit3, ChevronRight, FileText, Activity, Trash2, X, Check, Plus } from 'lucide-react';
import { Card, Button, Hexagon } from './UI';
import { Patient } from '../types';

interface PatientsProps {
  patients: Patient[];
  onOpenPatient: (patient: Patient) => void;
  onUpdatePatients: (patients: Patient[]) => void;
}

export const Patients = ({ patients, onOpenPatient, onUpdatePatients }: PatientsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isAddingPatient, setIsAddingPatient] = useState(false);

  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    name: '',
    address: '',
    phone: '',
    email: '',
    diagnosis: '',
    age: 0,
    bloodType: 'O+',
  });

  const filteredPatients = patients
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      onUpdatePatients(patients.map(p => p.id === editingPatient.id ? editingPatient : p));
      setEditingPatient(null);
    }
  };

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const patientToAdd: Patient = {
      id: `BN-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newPatient.name || '',
      address: newPatient.address || '',
      phone: newPatient.phone || '',
      email: newPatient.email || '',
      diagnosis: newPatient.diagnosis || '',
      age: Number(newPatient.age) || 0,
      bloodType: newPatient.bloodType || 'O+',
      status: 'active',
      lastVisit: new Date().toISOString().split('T')[0],
      vitals: {
        heartRate: '--',
        bloodPressure: '--/--',
        temperature: '--',
      },
      alerts: [],
    };

    onUpdatePatients([...patients, patientToAdd]);
    setIsAddingPatient(false);
    setNewPatient({
      name: '',
      address: '',
      phone: '',
      email: '',
      diagnosis: '',
      age: 0,
      bloodType: 'O+',
    });
  };

  const handleDeletePatient = (id: string) => {
    onUpdatePatients(patients.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-display font-bold">Meus Pacientes</h2>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar por nome..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 h-11 pl-12 pr-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
            />
          </div>
          <Button variant="primary" onClick={() => setIsAddingPatient(true)}>Novo Paciente</Button>
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <Card angled className="p-12 text-center bg-white border-dashed border-2 border-stone-200">
          <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-stone-300" />
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">Nenhum paciente encontrado</h3>
          <p className="text-stone-500 mb-8">Comece adicionando seu primeiro paciente para gerenciar atendimentos.</p>
          <Button variant="primary" onClick={() => setIsAddingPatient(true)}>Adicionar Paciente</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPatients.map((patient, i) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex items-start gap-6">
                <Hexagon className="w-16 h-16 bg-interactive-surface border border-primary/10 shrink-0">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} alt={patient.name} className="w-10 h-10" />
                </Hexagon>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{patient.name}</h3>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">ID: {patient.id}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        type="button"
                        className="p-2 hover:bg-primary/5 hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPatient(patient);
                        }}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        type="button"
                        className="p-2 hover:bg-red-50 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePatient(patient.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate">{patient.email || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate">{patient.address}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-50">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Diagnóstico Principal</p>
                    <p className="text-sm font-semibold text-text-main">{patient.diagnosis}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex gap-2">
                      <div className="px-2 py-1 bg-primary/5 rounded-lg text-[10px] font-bold text-primary uppercase">
                        {patient.bloodType}
                      </div>
                      <div className="px-2 py-1 bg-stone-100 rounded-lg text-[10px] font-bold text-stone-500 uppercase">
                        {patient.age} anos
                      </div>
                    </div>
                    <Button 
                      variant="secondary" 
                      className="text-xs font-bold gap-2 group/btn"
                      onClick={() => onOpenPatient(patient)}
                    >
                      Ver Prontuário
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* New Patient Modal */}
      <AnimatePresence>
        {isAddingPatient && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-interactive-surface">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Cadastrar Novo Paciente</h3>
                    <p className="text-xs text-stone-500">Preencha os dados para iniciar o acompanhamento</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAddingPatient(false)}
                  className="p-2 hover:bg-stone-200 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-stone-400" />
                </button>
              </div>

              <form onSubmit={handleAddPatient} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Nome Completo</label>
                    <input 
                      required
                      type="text" 
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Telefone</label>
                    <input 
                      required
                      type="text" 
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">E-mail (Opcional)</label>
                    <input 
                      type="email" 
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Endereço</label>
                    <input 
                      required
                      type="text" 
                      value={newPatient.address}
                      onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Rua, Número, Bairro, Cidade"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Idade</label>
                    <input 
                      required
                      type="number" 
                      value={newPatient.age || ''}
                      onChange={(e) => setNewPatient({ ...newPatient, age: Number(e.target.value) })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Ex: 30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Tipo Sanguíneo</label>
                    <select 
                      value={newPatient.bloodType}
                      onChange={(e) => setNewPatient({ ...newPatient, bloodType: e.target.value })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Diagnóstico Principal</label>
                    <textarea 
                      required
                      value={newPatient.diagnosis}
                      onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
                      className="w-full h-24 p-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                      placeholder="Descreva o diagnóstico principal do paciente..."
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="flex-1 h-14"
                    onClick={() => setIsAddingPatient(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="flex-1 h-14 gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Cadastrar Paciente
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Patient Modal */}
      <AnimatePresence>
        {editingPatient && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-interactive-surface">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Edit3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Editar Perfil do Paciente</h3>
                    <p className="text-xs text-stone-500">Atualize as informações pessoais e clínicas</p>
                  </div>
                </div>
                <button 
                  onClick={() => setEditingPatient(null)}
                  className="p-2 hover:bg-stone-200 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-stone-400" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Nome Completo</label>
                    <input 
                      type="text" 
                      value={editingPatient.name}
                      onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Telefone</label>
                    <input 
                      type="text" 
                      value={editingPatient.phone}
                      onChange={(e) => setEditingPatient({ ...editingPatient, phone: e.target.value })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">E-mail</label>
                    <input 
                      type="email" 
                      value={editingPatient.email}
                      onChange={(e) => setEditingPatient({ ...editingPatient, email: e.target.value })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Endereço de Atendimento</label>
                    <input 
                      type="text" 
                      value={editingPatient.address}
                      onChange={(e) => setEditingPatient({ ...editingPatient, address: e.target.value })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Idade</label>
                    <input 
                      type="number" 
                      value={editingPatient.age}
                      onChange={(e) => setEditingPatient({ ...editingPatient, age: Number(e.target.value) })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Tipo Sanguíneo</label>
                    <select 
                      value={editingPatient.bloodType}
                      onChange={(e) => setEditingPatient({ ...editingPatient, bloodType: e.target.value })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Diagnóstico Clínico</label>
                    <textarea 
                      value={editingPatient.diagnosis}
                      onChange={(e) => setEditingPatient({ ...editingPatient, diagnosis: e.target.value })}
                      className="w-full h-24 p-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="flex-1 h-14"
                    onClick={() => setEditingPatient(null)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="flex-1 h-14 gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
