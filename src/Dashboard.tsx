import React from 'react';
import { motion } from 'motion/react';
import { Users, FileText, Calendar, FolderOpen, TrendingUp, Star, Bell, Activity, Bone, Brain, HeartPulse } from 'lucide-react';
import { Card, Hexagon, Button, cn } from './components/UI';
import { MOCK_APPOINTMENTS, MOCK_USER, PROTOCOLS } from './constants';
import { UserRole } from './types';

export const Dashboard = ({ role, onNavigate }: { role: UserRole, onNavigate: (view: any) => void }) => {
  const isSocio = role === UserRole.SOCIO;
  const [socioView, setSocioView] = React.useState<'clinic' | 'personal'>('clinic');

  const stats = [
    { label: 'Gerenciar Pacientes', value: '128 ativos', icon: Users, color: 'bg-primary/10', id: 'patients' },
    { label: 'Prontuários', value: 'Histórico de saúde', icon: FileText, color: 'bg-primary/10', id: 'documents' },
    { label: 'Agenda', value: '8 hoje', icon: Calendar, color: 'bg-primary/10', id: 'schedule' },
  ];

  const scaleData = [
    { name: 'Dr. Aris', status: 'Em Atendimento', patient: 'Eleanor S.', address: 'Rua das Flores, 123' },
    { name: 'Dra. Julian', status: 'Disponível', patient: '-', address: '-' },
    { name: 'Dr. Marcos', status: 'Em Atendimento', patient: 'Chidi A.', address: 'Av. Paulista, 1000' },
    { name: 'Dra. Sarah', status: 'Intervalo', patient: '-', address: '-' },
  ];

  const protocolCategories = [
    { name: 'Traumatologia', icon: Bone, count: 12 },
    { name: 'Neurologia', icon: Brain, count: 8 },
    { name: 'Cardiorrespiratória', icon: HeartPulse, count: 5 },
  ];

  const myAppointments = [
    { time: '08:00', patient: 'Michael Scott', type: 'Avaliação Clínica', address: 'Rua Augusta, 500' },
    { time: '10:00', patient: 'Pam Beesly', type: 'Retorno', address: 'Av. Brasil, 1200' },
    { time: '14:30', patient: 'Jim Halpert', type: 'Fisioterapia', address: 'Rua Oscar Freire, 80' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-primary font-bold tracking-wider text-xs uppercase mb-1">
            {isSocio 
              ? (socioView === 'clinic' ? 'Painel de Gestão' : 'Espaço Pessoal') 
              : 'Visão Clínica'}
          </p>
          <h2 className="text-4xl font-display font-bold text-text-main">
            {isSocio 
              ? (socioView === 'clinic' ? 'Desempenho da Clínica' : `Bem-vindo, ${MOCK_USER.name}`) 
              : `Bom dia, ${MOCK_USER.name}`}
          </h2>
          <p className="mt-2 text-stone-500">
            {isSocio 
              ? (socioView === 'clinic' 
                  ? 'Visão estratégica das operações e equipe da clínica.' 
                  : 'Gerencie seus pacientes pessoais e agenda diária.') 
              : 'Gerencie sua prática e o cuidado ao paciente com eficiência.'}
          </p>
        </div>
        
        {isSocio && (
          <div className="flex bg-stone-100 p-1 rounded-xl self-start md:self-auto">
            <button 
              onClick={() => setSocioView('clinic')}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                socioView === 'clinic' ? "bg-white shadow-sm text-primary" : "text-stone-500 hover:text-stone-700"
              )}
            >
              Visão Clínica
            </button>
            <button 
              onClick={() => setSocioView('personal')}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                socioView === 'personal' ? "bg-white shadow-sm text-primary" : "text-stone-500 hover:text-stone-700"
              )}
            >
              Meu Espaço
            </button>
          </div>
        )}
      </header>

      {isSocio ? (
        socioView === 'clinic' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Scale Management */}
            <Card className="lg:col-span-2" angled>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Escala e Status da Equipe</h3>
                <Button variant="ghost" className="text-primary">Gerenciar Escala</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-stone-400 text-xs font-bold uppercase tracking-wider border-b border-stone-100">
                      <th className="px-4 py-3">Profissional</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Paciente</th>
                      <th className="px-4 py-3">Endereço</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {scaleData.map((staff) => (
                      <tr key={staff.name} className="hover:bg-primary/5 transition-colors group cursor-pointer">
                        <td className="px-4 py-4 font-bold text-sm">{staff.name}</td>
                        <td className="px-4 py-4">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            staff.status === 'Em Atendimento' ? "bg-primary/10 text-primary" : "bg-stone-100 text-stone-500"
                          )}>
                            {staff.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-stone-500">{staff.patient}</td>
                        <td className="px-4 py-4 text-sm text-stone-500">{staff.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Performance Honeycomb */}
            <div className="space-y-8">
              <Card angled className="bg-primary text-white border-none shadow-xl shadow-primary/20">
                <h3 className="font-bold text-lg mb-6">Taxa de Ocupação</h3>
                <div className="flex justify-center py-4">
                  <div className="relative">
                    <Hexagon className="w-32 h-32 bg-white/20">
                      <div className="text-center">
                        <p className="text-3xl font-black">82%</p>
                        <p className="text-[10px] font-bold uppercase opacity-80">Capacidade</p>
                      </div>
                    </Hexagon>
                    <div className="absolute -top-4 -right-4">
                      <Hexagon className="w-12 h-12 bg-white/10">
                        <TrendingUp className="w-6 h-6" />
                      </Hexagon>
                    </div>
                  </div>
                </div>
              </Card>

              <Card angled>
                <h3 className="font-bold text-lg mb-4">Protocolos Internos</h3>
                <div className="space-y-4">
                  {protocolCategories.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-4 group cursor-pointer">
                      <Hexagon className="w-12 h-12 bg-stone-100 group-hover:bg-primary/10 transition-colors">
                        <cat.icon className="w-6 h-6 text-stone-400 group-hover:text-primary transition-colors" />
                      </Hexagon>
                      <div>
                        <p className="font-bold text-sm">{cat.name}</p>
                        <p className="text-xs text-stone-400">{cat.count} diretrizes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Agenda */}
            <Card className="lg:col-span-2" angled>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Minha Agenda Diária</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" className="text-stone-400">Semana</Button>
                  <Button variant="secondary" className="bg-primary/10 text-primary">Hoje</Button>
                </div>
              </div>
              <div className="space-y-4">
                {myAppointments.map((app, i) => (
                  <motion.div 
                    key={app.patient}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-5 rounded-2xl bg-interactive-surface border border-transparent hover:border-primary/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-center min-w-[60px]">
                        <p className="text-lg font-black text-primary">{app.time}</p>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Início</p>
                      </div>
                      <div className="w-px h-10 bg-stone-200" />
                      <div>
                        <h4 className="font-bold text-text-main text-lg group-hover:text-primary transition-colors">{app.patient}</h4>
                        <p className="text-xs text-stone-500">{app.type} • {app.address}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" className="p-2 hover:text-primary">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" className="p-2 hover:text-primary">
                        <Activity className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
                <Button variant="ghost" className="w-full border-2 border-dashed border-stone-200 py-4 rounded-2xl text-stone-400 hover:border-primary/30 hover:text-primary">
                  + Adicionar Agendamento Pessoal
                </Button>
              </div>
            </Card>

            {/* Personal Sidebar */}
            <div className="space-y-8">
              <Card angled className="bg-stone-900 text-white border-none">
                <h3 className="font-bold text-lg mb-4">Meu Desempenho</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 opacity-60">
                      <span>Meta Mensal</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[85%]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <p className="text-2xl font-black">42</p>
                      <p className="text-[10px] font-bold uppercase opacity-50">Pacientes</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <p className="text-2xl font-black">156</p>
                      <p className="text-[10px] font-bold uppercase opacity-50">Horas</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card angled>
                <h3 className="font-bold text-lg mb-4">Acesso Rápido</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => onNavigate('patients')}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-interactive-surface hover:bg-primary/5 hover:text-primary transition-all group"
                  >
                    <Users className="w-6 h-6 mb-2 text-stone-400 group-hover:text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Meus Pacientes</span>
                  </button>
                  <button 
                    onClick={() => onNavigate('schedule')}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-interactive-surface hover:bg-primary/5 hover:text-primary transition-all group"
                  >
                    <Calendar className="w-6 h-6 mb-2 text-stone-400 group-hover:text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Agenda Completa</span>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onNavigate(stat.id)}
            >
              <div className="aspect-square bg-white hexagon border border-stone-100 shadow-xl shadow-stone-200/50 flex flex-col items-center justify-center p-6 text-center group-hover:scale-105 transition-transform">
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", stat.color)}>
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-text-main">{stat.label}</h3>
                <p className="text-sm text-stone-500 mt-1">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {(!isSocio || socioView === 'personal') && (
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2" angled>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">
                {isSocio ? 'Meus Pacientes Favoritos' : 'Próximos Agendamentos'}
              </h3>
              <Button variant="ghost" className="text-primary" onClick={() => onNavigate('patients')}>Ver Todos</Button>
            </div>
            <div className="space-y-4">
              {MOCK_APPOINTMENTS.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 rounded-2xl bg-interactive-surface border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {app.time}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-main group-hover:text-primary transition-colors">{app.patientName}</h4>
                      <p className="text-xs text-stone-500">{app.type} • {app.address}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="p-2">
                    <Activity className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-8">
            <Card angled className="bg-primary p-6 text-white relative overflow-hidden shadow-lg shadow-primary/20 border-none">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-4">Eficiência da Prática</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-bold italic font-display">94%</p>
                    <p className="text-xs text-white/80 mt-1">Satisfação dos pacientes esta semana</p>
                  </div>
                  <Hexagon className="w-12 h-12 bg-white/20">
                    <Star className="w-6 h-6 fill-white" />
                  </Hexagon>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 hexagon rotate-12" />
            </Card>

            <Card angled>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Atividade Recente
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-light mt-2" />
                  <p className="text-sm text-stone-600 leading-relaxed">
                    <span className="font-semibold text-text-main">Novo Resultado de Exame:</span> 
                    O relatório do paciente #1042 está pronto para revisão.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-sm text-stone-600 leading-relaxed">
                    <span className="font-semibold text-text-main">Agendamento Atualizado:</span> 
                    Jason Mendoza remarcou para amanhã.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

