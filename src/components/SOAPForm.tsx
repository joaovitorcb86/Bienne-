import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Button, Card } from './UI';
import { PROTOCOLS } from '../constants';

interface SOAPFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: { s: string; o: string; a: string; p: string; type: string };
}

export const SOAPForm = ({ onSubmit, onCancel, initialData }: SOAPFormProps) => {
  const [soap, setSoap] = useState(initialData || { s: '', o: '', a: '', p: '', type: 'Consulta Geral' });
  const [protocolAlert, setProtocolAlert] = useState<string | null>(null);

  const checkProtocol = (text: string) => {
    const keywords = ['repouso absoluto', 'gelo 24h', 'imobilização total'];
    const found = keywords.find(k => text.toLowerCase().includes(k));
    if (found) {
      setProtocolAlert(`Atenção: A conduta "${found}" pode divergir dos Protocolos Internos.`);
    } else {
      setProtocolAlert(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(soap);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2 group max-w-md">
        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-primary transition-colors">Tipo de Evolução</label>
        <select 
          value={soap.type}
          onChange={(e) => setSoap({ ...soap, type: e.target.value })}
          className="w-full h-12 px-4 bg-interactive-surface border-stone-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
        >
          <option value="Consulta Geral">Consulta Geral</option>
          <option value="Fisioterapia Motora">Fisioterapia Motora</option>
          <option value="Avaliação Clínica">Avaliação Clínica</option>
          <option value="Retorno">Retorno</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2 group">
          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-primary transition-colors">S: Subjetivo</label>
          <textarea 
            value={soap.s}
            onChange={(e) => setSoap({ ...soap, s: e.target.value })}
            placeholder="Relato do paciente..."
            className="w-full h-40 bg-interactive-surface border-stone-100 rounded-2xl p-5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm leading-relaxed"
          />
        </div>
        <div className="space-y-2 group">
          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-primary transition-colors">O: Objetivo</label>
          <textarea 
            value={soap.o}
            onChange={(e) => setSoap({ ...soap, o: e.target.value })}
            placeholder="Exame físico, testes, sinais vitais..."
            className="w-full h-40 bg-interactive-surface border-stone-100 rounded-2xl p-5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm leading-relaxed"
          />
        </div>
        <div className="space-y-2 group">
          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-primary transition-colors">A: Avaliação</label>
          <textarea 
            value={soap.a}
            onChange={(e) => setSoap({ ...soap, a: e.target.value })}
            placeholder="Análise técnica e diagnóstico funcional..."
            className="w-full h-40 bg-interactive-surface border-stone-100 rounded-2xl p-5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm leading-relaxed"
          />
        </div>
        <div className="space-y-2 group">
          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-primary transition-colors">P: Plano</label>
          <textarea 
            value={soap.p}
            onChange={(e) => {
              setSoap({ ...soap, p: e.target.value });
              checkProtocol(e.target.value);
            }}
            placeholder="Condutas baseadas no protocolo..."
            className="w-full h-40 bg-interactive-surface border-stone-100 rounded-2xl p-5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm leading-relaxed"
          />
        </div>
      </div>

      {protocolAlert && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-100 p-5 rounded-2xl flex items-start gap-4 text-red-600"
        >
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="text-sm font-bold leading-relaxed">{protocolAlert}</p>
        </motion.div>
      )}

      <div className="flex justify-end gap-4 pt-4 border-t border-stone-50">
        <Button variant="ghost" type="button" onClick={onCancel} className="px-8">Cancelar</Button>
        <Button variant="primary" type="submit" className="px-12 h-14 text-base shadow-xl shadow-primary/30">
          Salvar Evolução
        </Button>
      </div>
    </form>
  );
};
