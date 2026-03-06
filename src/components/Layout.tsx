import React, { useState } from 'react';
import { Search, Bell, LayoutDashboard, Users, Calendar, FolderOpen, Settings, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Hexagon, cn } from './UI';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  isFocusMode?: boolean;
  activeView: string;
  onNavigate: (view: any) => void;
}

export const Layout = ({ children, user, onLogout, isFocusMode = false, activeView, onNavigate }: LayoutProps) => {
  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-500", isFocusMode ? "bg-interactive-surface" : "bg-background-light")}>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className={cn(
          "h-20 glass-panel border-b border-stone-200 px-8 flex items-center justify-between sticky top-0 z-40 transition-all duration-500",
          isFocusMode ? "bg-interactive-surface/50 opacity-50" : "bg-white/80"
        )}>
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-3 mr-8 cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <Hexagon className="w-10 h-10 bg-primary shrink-0">
                <div className="w-4 h-4 bg-white hexagon" />
              </Hexagon>
              <h1 className="font-display text-2xl font-bold text-primary tracking-tight hidden sm:block">Bienne</h1>
            </div>
            
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Buscar pacientes, prontuários..." 
                className="w-full bg-interactive-surface border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-interactive-surface rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-stone-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user.name}</p>
                <p className="text-xs text-stone-500">
                  {user.role === UserRole.SOCIO ? 'Sócio' : 'Colaborador'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" />
              </div>
              <button 
                onClick={onLogout}
                className="p-2 hover:bg-red-50 text-stone-400 hover:text-red-500 rounded-lg transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {!isFocusMode && (
          <nav className="bg-white border-b border-stone-100 px-8 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar sticky top-20 z-30">
            {[
              { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
              { id: 'patients', label: 'Pacientes', icon: Users },
              { id: 'schedule', label: 'Agenda', icon: Calendar },
              { id: 'documents', label: 'Prontuários', icon: FolderOpen },
              { id: 'settings', label: 'Configurações', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                  activeView === item.id 
                    ? "bg-primary/10 text-primary shadow-sm" 
                    : "text-stone-400 hover:bg-stone-50 hover:text-stone-600"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        )}

        <main className={cn("flex-1 p-8 overflow-y-auto transition-all duration-500", isFocusMode ? "max-w-5xl mx-auto w-full" : "")}>
          {children}
        </main>
      </div>
    </div>
  );
};
