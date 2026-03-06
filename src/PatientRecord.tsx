import React, { useState } from 'react';
import { Heart, Droplets, Thermometer, AlertTriangle, FileText, Plus, Edit3, Trash2, X, Check } from 'lucide-react';
import { Card, Button, Hexagon } from './components/UI';
import { Patient, ClinicalNote } from './types';

interface PatientRecordProps {
  patient: Patient;
  notes: ClinicalNote[];
  onNewEntry: () => void;
  onEditNote: (note: ClinicalNote) => void;
  onDeleteNote: (id: string) => void;
  onUpdatePatient: (patient: Patient) => void;
}

export const PatientRecord = ({ patient, notes, onNewEntry, onEditNote, onDeleteNote, onUpdatePatient }: PatientRecordProps) => {
  const [isEditingVitals, setIsEditingVitals] = useState(false);
  const [isEditingAlerts, setIsEditingAlerts] = useState(false);
  const [tempVitals, setTempVitals] = useState(patient.vitals);
  const [tempAlerts, setTempAlerts] = useState(patient.alerts.join(', '));

  React.useEffect(() => {
    setTempVitals(patient.vitals);
    setTempAlerts(patient.alerts.join(', '));
  }, [patient]);

  const handleSaveVitals = () => {
    onUpdatePatient({ ...patient, vitals: tempVitals });
    setIsEditingVitals(false);
  };

  const handleSaveAlerts = () => {
    const alertsArray = tempAlerts.split(',').map(a => a.trim()).filter(a => a !== '');
    onUpdatePatient({ ...patient, alerts: alertsArray });
    setIsEditingAlerts(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Profile & Vitals */}
      <div className="space-y-8">
        <Card className="text-center" angled>
          <div className="relative inline-block mb-4">
            <Hexagon className="w-24 h-24 bg-stone-50 mx-auto border-2 border-primary/20">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} 
                alt={patient.name} 
                className="w-16 h-16"
              />
            </Hexagon>
          </div>
          <h3 className="text-2xl font-display font-bold text-text-main">{patient.name}</h3>
          <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">ID do Paciente: #{patient.id}</p>
          
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-stone-50">
            <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Idade</p>
              <p className="font-bold text-sm">{patient.age}</p>
            </div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Sangue</p>
              <p className="font-bold text-sm text-primary">{patient.bloodType}</p>
            </div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Status</p>
              <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-2 shadow-sm shadow-primary/50" />
            </div>
          </div>
        </Card>

        <Card angled>
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary hexagon" />
              Estatísticas Vitais
            </h4>
            {!isEditingVitals ? (
              <Button variant="ghost" className="p-1 h-auto" onClick={() => setIsEditingVitals(true)}>
                <Edit3 className="w-3.5 h-3.5 text-stone-400" />
              </Button>
            ) : (
              <div className="flex gap-1">
                <Button variant="ghost" className="p-1 h-auto text-red-500" onClick={() => setIsEditingVitals(false)}>
                  <X className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" className="p-1 h-auto text-green-500" onClick={handleSaveVitals}>
                  <Check className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-interactive-surface rounded-xl text-stone-400 group-hover:text-primary transition-colors">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Freq. Cardíaca</span>
              </div>
              {isEditingVitals ? (
                <input 
                  type="text" 
                  value={tempVitals.heartRate}
                  onChange={(e) => setTempVitals({ ...tempVitals, heartRate: e.target.value })}
                  className="w-24 text-right bg-stone-50 border-b border-stone-200 focus:border-primary outline-none font-bold text-sm"
                />
              ) : (
                <span className="font-black text-lg">{patient.vitals.heartRate}</span>
              )}
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-interactive-surface rounded-xl text-stone-400 group-hover:text-primary transition-colors">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Pressão Arterial</span>
              </div>
              {isEditingVitals ? (
                <input 
                  type="text" 
                  value={tempVitals.bloodPressure}
                  onChange={(e) => setTempVitals({ ...tempVitals, bloodPressure: e.target.value })}
                  className="w-24 text-right bg-stone-50 border-b border-stone-200 focus:border-primary outline-none font-bold text-sm"
                />
              ) : (
                <span className="font-black text-lg">{patient.vitals.bloodPressure}</span>
              )}
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-interactive-surface rounded-xl text-stone-400 group-hover:text-primary transition-colors">
                  <Thermometer className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Temperatura</span>
              </div>
              {isEditingVitals ? (
                <input 
                  type="text" 
                  value={tempVitals.temperature}
                  onChange={(e) => setTempVitals({ ...tempVitals, temperature: e.target.value })}
                  className="w-24 text-right bg-stone-50 border-b border-stone-200 focus:border-primary outline-none font-bold text-sm"
                />
              ) : (
                <span className="font-black text-lg">{patient.vitals.temperature}</span>
              )}
            </div>
          </div>
        </Card>

        <Card angled>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary hexagon" />
              Alertas e Alergias
            </h4>
            {!isEditingAlerts ? (
              <Button variant="ghost" className="p-1 h-auto" onClick={() => setIsEditingAlerts(true)}>
                <Edit3 className="w-3.5 h-3.5 text-stone-400" />
              </Button>
            ) : (
              <div className="flex gap-1">
                <Button variant="ghost" className="p-1 h-auto text-red-500" onClick={() => setIsEditingAlerts(false)}>
                  <X className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" className="p-1 h-auto text-green-500" onClick={handleSaveAlerts}>
                  <Check className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>
          
          {isEditingAlerts ? (
            <textarea 
              value={tempAlerts}
              onChange={(e) => setTempAlerts(e.target.value)}
              placeholder="Separe por vírgulas..."
              className="w-full h-24 p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-primary resize-none"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {patient.alerts.length > 0 ? (
                patient.alerts.map(alert => (
                  <span key={alert} className="px-4 py-1.5 bg-white text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/10 shadow-sm">
                    {alert}
                  </span>
                ))
              ) : (
                <span className="text-xs text-stone-400 italic">Nenhum alerta registrado</span>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Right Column: Clinical Notes Timeline */}
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex gap-8">
            <button className="text-primary font-black text-xs uppercase tracking-[0.2em] border-b-2 border-primary pb-2">Evoluções Clínicas</button>
            <button className="text-stone-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-stone-600 transition-colors pb-2">Exames</button>
            <button className="text-stone-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-stone-600 transition-colors pb-2">Medicamentos</button>
          </div>
          <Button onClick={onNewEntry} className="h-12 px-8">
            <Plus className="w-4 h-4" />
            Nova Evolução
          </Button>
        </div>

        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-0 before:w-px before:bg-stone-100">
          {notes.map((note) => (
            <div key={note.id} className="relative pl-14">
              <div className="absolute left-0 top-2 w-10 h-10 bg-white border border-stone-100 hexagon flex items-center justify-center z-10 shadow-sm">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <Card angled className="hover:border-primary/20 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h5 className="font-black text-xl text-text-main group-hover:text-primary transition-colors">{note.type}</h5>
                    <p className="text-[10px] text-stone-400 font-black uppercase tracking-[0.2em] mt-1">{note.date} • {note.author}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      className="p-2 hover:bg-primary/5 hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditNote(note);
                      }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="p-2 hover:bg-red-50 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteNote(note.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-interactive-surface rounded-2xl border border-transparent group-hover:border-stone-100 transition-all">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">S: Subjetivo</span>
                    <p className="text-stone-500 text-sm leading-relaxed">{note.content.s}</p>
                  </div>
                  <div className="p-5 bg-interactive-surface rounded-2xl border border-transparent group-hover:border-stone-100 transition-all">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">O: Objetivo</span>
                    <p className="text-stone-500 text-sm leading-relaxed">{note.content.o}</p>
                  </div>
                  <div className="p-5 bg-interactive-surface rounded-2xl border border-transparent group-hover:border-stone-100 transition-all">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">A: Avaliação</span>
                    <p className="text-stone-500 text-sm leading-relaxed">{note.content.a}</p>
                  </div>
                  <div className="p-5 bg-interactive-surface rounded-2xl border border-transparent group-hover:border-stone-100 transition-all">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">P: Plano</span>
                    <p className="text-stone-500 text-sm leading-relaxed">{note.content.p}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
