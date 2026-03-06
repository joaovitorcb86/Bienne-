import React, { useState } from 'react';
import { Hexagon, Button } from './components/UI';
import { Lock, BadgeCheck, ArrowRight, HelpCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: (id: string, role: 'COLABORADOR' | 'SOCIO') => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.includes('SOCIO')) {
      onLogin(id, 'SOCIO');
    } else {
      onLogin(id, 'COLABORADOR');
    }
  };

  return (
    <div className="font-display bg-background-light honeycomb-bg min-h-screen flex items-center justify-center p-4">
      <div className="relative flex h-auto w-full max-w-[440px] flex-col group/design-root overflow-visible">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="layout-container flex h-full grow flex-col"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-2xl border border-primary/20 p-8 md:p-12 flex flex-col items-center">
            <div className="mb-8 flex flex-col items-center gap-4">
              <div className="relative flex items-center justify-center">
                <div className="hexagon-clip w-20 h-20 bg-primary flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg className="w-full h-full text-white fill-none stroke-current stroke-[4px]" viewBox="0 0 100 100">
                      <path d="M50 20 L76 35 L76 65 L50 80 L24 65 L24 35 Z"></path>
                      <path className="opacity-80" d="M76 35 L98 48 L98 78 L76 93 L54 80"></path>
                      <path className="opacity-80" d="M24 35 L2 48 L2 78 L24 93 L46 80"></path>
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 hexagon-clip bg-primary blur-xl opacity-20 -z-10"></div>
              </div>
              <div className="text-center mt-2">
                <h1 className="text-slate-900 text-3xl font-extrabold tracking-tight">Bienne</h1>
                <p className="text-primary font-bold text-xs tracking-[0.2em] uppercase">Inteligência Clínica</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-sm font-semibold ml-1">ID Profissional</label>
                <div className="relative">
                  <input 
                    className="hex-input w-full bg-interactive-surface border-none ring-1 ring-primary/30 focus:ring-2 focus:ring-primary h-14 px-5 text-slate-900 placeholder:text-slate-400 transition-all outline-none" 
                    placeholder="PHT-000-000" 
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary/60">badge</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-slate-700 text-sm font-semibold">Senha</label>
                </div>
                <div className="relative flex items-stretch">
                  <input 
                    className="hex-input w-full bg-interactive-surface border-none ring-1 ring-primary/30 focus:ring-2 focus:ring-primary h-14 px-5 text-slate-900 placeholder:text-slate-400 transition-all outline-none" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg h-16 shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-3 rounded-lg"
                  type="submit"
                >
                  <span>Entrar no Painel</span>
                  <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                </button>
              </div>

              <div className="flex flex-col gap-4 items-center pt-4">
                <a className="text-slate-500 text-sm hover:text-primary transition-colors flex items-center gap-1" href="#">
                  <span className="material-symbols-outlined text-base">lock_reset</span>
                  Esqueceu a senha?
                </a>
                <div className="w-full h-px bg-slate-200 my-2"></div>
                <div className="flex items-center gap-6">
                  <a className="flex items-center gap-2 text-primary font-semibold text-sm hover:opacity-80" href="#">
                    <span className="material-symbols-outlined text-lg">help</span>
                    Suporte
                  </a>
                  <a className="flex items-center gap-2 text-primary font-semibold text-sm hover:opacity-80" href="#">
                    <span className="material-symbols-outlined text-lg">info</span>
                    Sobre
                  </a>
                </div>
              </div>
            </form>

            <div className="mt-10 opacity-20 pointer-events-none">
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-primary text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>hexagon</span>
                <span className="material-symbols-outlined text-primary text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>hexagon</span>
                <span className="material-symbols-outlined text-primary text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>hexagon</span>
              </div>
            </div>
          </div>
          <footer className="mt-8 text-center text-slate-500 text-xs px-4">
            <p>© 2024 Bienne Clinical Management Systems. <br className="md:hidden" /> Todos os dados profissionais são criptografados.</p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};
