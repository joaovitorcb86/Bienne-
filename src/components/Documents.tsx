import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Eye, Search, Plus, FileCode, FileImage, FileSpreadsheet, User, Calendar as CalendarIcon, Activity } from 'lucide-react';
import { Card, Button } from './UI';
import { ClinicalNote, Patient } from '../types';

interface DocumentsProps {
  notes: ClinicalNote[];
  patients: Patient[];
  onOpenPatient: (patient: Patient) => void;
}

export const Documents = ({ notes, patients, onOpenPatient }: DocumentsProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const getPatientName = (patientId: string) => {
    return patients.find(p => p.id === patientId)?.name || 'Paciente Desconhecido';
  };

  const getPatient = (patientId: string) => {
    return patients.find(p => p.id === patientId);
  };

  const filteredNotes = notes.filter(note => {
    const patientName = getPatientName(note.patientId).toLowerCase();
    const type = note.type.toLowerCase();
    const search = searchTerm.toLowerCase();
    return patientName.includes(search) || type.includes(search);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold">Prontuários e Relatórios</h2>
          <p className="text-stone-500 text-sm mt-1">Acesso centralizado a todas as evoluções e documentos clínicos.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar por paciente ou tipo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 h-11 pl-12 pr-4 bg-interactive-surface border border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-stone-200">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-medium">Nenhum prontuário ou relatório encontrado.</p>
          </div>
        ) : (
          filteredNotes.map((note, i) => {
            const patient = getPatient(note.patientId);
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                onClick={() => patient && onOpenPatient(patient)}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg text-text-main truncate group-hover:text-primary transition-colors">
                      {note.type}
                    </h4>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1">
                      Evolução Clínica
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-stone-400" />
                    <span className="text-stone-500">Paciente:</span>
                    <span className="font-bold text-stone-700">{getPatientName(note.patientId)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CalendarIcon className="w-4 h-4 text-stone-400" />
                    <span className="text-stone-500">Data:</span>
                    <span className="font-bold text-stone-700">{note.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Activity className="w-4 h-4 text-stone-400" />
                    <span className="text-stone-500">Autor:</span>
                    <span className="font-bold text-stone-700">{note.author}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-50">
                  <p className="text-xs text-stone-500 line-clamp-2 italic">
                    "{note.content.s}"
                  </p>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button variant="secondary" className="flex-1 text-xs gap-2 h-10 bg-primary/5 text-primary">
                    <Eye className="w-3.5 h-3.5" />
                    Ver Detalhes
                  </Button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
