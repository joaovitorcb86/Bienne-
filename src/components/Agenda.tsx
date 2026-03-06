import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin, User, ChevronLeft, ChevronRight, Plus, X, Check, Activity, Trash2 } from 'lucide-react';
import { Card, Button, cn } from './UI';
import { Appointment, Patient } from '../types';

interface AgendaProps {
  appointments: Appointment[];
  patients: Patient[];
  onAddAppointment: (appointment: Appointment) => void;
  onRemoveAppointment: (id: string) => void;
}

export const Agenda = ({ appointments, patients, onAddAppointment, onRemoveAppointment }: AgendaProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [newApp, setNewApp] = useState({
    patientId: '',
    time: '08:00',
    type: 'Consulta Geral',
  });

  // Calendar helpers
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const isSameDay = (d1: Date, d2: Date) => 
    d1.getDate() === d2.getDate() && 
    d1.getMonth() === d2.getMonth() && 
    d1.getFullYear() === d2.getFullYear();

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(app => app.date === dateStr);
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === newApp.patientId);
    if (!patient) return;

    const appointment: Appointment = {
      id: `app-${Date.now()}`,
      patientName: patient.name,
      date: selectedDate.toISOString().split('T')[0],
      time: newApp.time,
      type: newApp.type,
      address: patient.address,
      status: 'scheduled',
    };

    onAddAppointment(appointment);
    setIsAddingAppointment(false);
    setNewApp({ patientId: '', time: '08:00', type: 'Consulta Geral' });
  };

  const selectedDateAppointments = getAppointmentsForDate(selectedDate);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold">Agenda Clínica</h2>
          <p className="text-stone-500 text-sm mt-1">Gerencie seus horários e atendimentos.</p>
        </div>
        <Button variant="primary" onClick={() => setIsAddingAppointment(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Agendamento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Grid */}
        <Card className="lg:col-span-7 p-8" angled>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold capitalize">{monthName}</h3>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={prevMonth} className="p-2">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="ghost" onClick={nextMonth} className="p-2">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest py-2">
                {day}
              </div>
            ))}
            
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {Array.from({ length: days }).map((_, i) => {
              const date = new Date(year, month, i + 1);
              const isSelected = isSameDay(date, selectedDate);
              const isToday = isSameDay(date, new Date());
              const dayAppointments = getAppointmentsForDate(date);

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "aspect-square rounded-2xl border transition-all flex flex-col items-center justify-center relative group",
                    isSelected 
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                      : "bg-white border-stone-100 hover:border-primary/30 text-stone-700",
                    isToday && !isSelected && "border-primary/50 text-primary font-bold"
                  )}
                >
                  <span className="text-sm font-bold">{i + 1}</span>
                  {dayAppointments.length > 0 && (
                    <div className={cn(
                      "absolute bottom-2 flex gap-0.5",
                      isSelected ? "bg-white/20" : "bg-primary/10",
                      "px-1.5 py-0.5 rounded-full"
                    )}>
                      {dayAppointments.slice(0, 3).map((_, idx) => (
                        <div key={idx} className={cn("w-1 h-1 rounded-full", isSelected ? "bg-white" : "bg-primary")} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Day Details */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6" angled>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </h3>
                <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">
                  {selectedDateAppointments.length} Atendimentos
                </p>
              </div>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
              {selectedDateAppointments.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-stone-100 rounded-2xl">
                  <Clock className="w-8 h-8 text-stone-200 mx-auto mb-3" />
                  <p className="text-stone-400 text-sm">Nenhum atendimento para este dia.</p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 text-primary text-xs"
                    onClick={() => setIsAddingAppointment(true)}
                  >
                    Agendar agora
                  </Button>
                </div>
              ) : (
                selectedDateAppointments.sort((a, b) => a.time.localeCompare(b.time)).map((app, i) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 bg-interactive-surface rounded-2xl border border-stone-50 hover:border-primary/20 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span className="text-sm font-black text-primary">{app.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-white rounded-md text-[9px] font-bold text-stone-400 uppercase tracking-wider border border-stone-100">
                          {app.type}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveAppointment(app.id);
                          }}
                          className="p-1 text-stone-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-bold text-stone-800 group-hover:text-primary transition-colors">{app.patientName}</h4>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-stone-400">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{app.address}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Add Appointment Modal */}
      <AnimatePresence>
        {isAddingAppointment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-interactive-surface">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Plus className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold">Novo Agendamento</h3>
                </div>
                <button onClick={() => setIsAddingAppointment(false)} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                  <X className="w-5 h-5 text-stone-400" />
                </button>
              </div>

              <form onSubmit={handleAddAppointment} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Data Selecionada</label>
                    <div className="w-full h-12 px-4 bg-stone-50 border border-stone-100 rounded-xl flex items-center gap-3 text-stone-600 font-medium">
                      <CalendarIcon className="w-4 h-4" />
                      {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Paciente</label>
                    <select 
                      required
                      value={newApp.patientId}
                      onChange={(e) => setNewApp({ ...newApp, patientId: e.target.value })}
                      className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    >
                      <option value="">Selecionar Paciente...</option>
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Horário</label>
                      <input 
                        required
                        type="time" 
                        value={newApp.time}
                        onChange={(e) => setNewApp({ ...newApp, time: e.target.value })}
                        className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Tipo</label>
                      <select 
                        value={newApp.type}
                        onChange={(e) => setNewApp({ ...newApp, type: e.target.value })}
                        className="w-full h-12 px-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      >
                        <option value="Consulta Geral">Consulta Geral</option>
                        <option value="Fisioterapia">Fisioterapia</option>
                        <option value="Avaliação">Avaliação</option>
                        <option value="Retorno">Retorno</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="ghost" className="flex-1 h-12" onClick={() => setIsAddingAppointment(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1 h-12 gap-2">
                    <Check className="w-4 h-4" />
                    Confirmar
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
