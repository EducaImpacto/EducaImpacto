import React from 'react';
import { Button } from '../components/Button';
import { ModuleCard } from '../components/ModuleCard';
import { LevelIndicator } from '../components/LevelIndicator';
import { ProgressBar } from '../components/ProgressBar';
import { Sparkles, FileDown, History } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
}

interface DashboardScreenProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  overallProgress: number;
  modules: Module[];
  canGeneratePlan: boolean;
  onModuleClick: (moduleId: number) => void;
  onGeneratePlan: () => void;
}

export function DashboardScreen({
  level,
  xp,
  nextLevelXp,
  overallProgress,
  modules,
  canGeneratePlan,
  onModuleClick,
  onGeneratePlan,
}: DashboardScreenProps) {
  const completedModules = modules.filter(m => m.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Acompanhe seu progresso</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progresso Geral */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Progresso da Trilha</h2>
              <ProgressBar progress={overallProgress} height="lg" />
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-600">{completedModules} de {modules.length} módulos concluídos</span>
                <span className="font-semibold text-blue-600">{modules.length - completedModules} restantes</span>
              </div>
            </div>

            {/* Módulos */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Seus Módulos</h2>
              <div className="space-y-4">
                {modules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    title={module.title}
                    description={module.description}
                    completed={module.completed}
                    locked={module.locked}
                    onClick={() => onModuleClick(module.id)}
                  />
                ))}
              </div>
            </div>

            {/* Gerar Plano de Negócios */}
            {canGeneratePlan && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg p-8 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">Parabéns! 🎉</h2>
                    <p className="text-green-100 mb-6">
                      Você completou todos os módulos e está pronto para gerar seu plano de negócios profissional.
                    </p>
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      onClick={onGeneratePlan}
                      className="bg-white text-green-600 hover:bg-green-50"
                    >
                      <FileDown className="w-5 h-5 mr-2 inline" />
                      Gerar Plano de Negócios
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Indicador de Nível */}
            <LevelIndicator level={level} xp={xp} nextLevelXp={nextLevelXp} />

            {/* Estatísticas */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Estatísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Módulos Concluídos</span>
                  <span className="font-bold text-green-600">{completedModules}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Módulos Pendentes</span>
                  <span className="font-bold text-orange-600">{modules.length - completedModules}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Nível Atual</span>
                  <span className="font-bold text-blue-600">{level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">XP Acumulado</span>
                  <span className="font-bold text-purple-600">{xp}</span>
                </div>
              </div>
            </div>

            {/* Histórico de Downloads */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-900">Histórico de Downloads</h3>
              </div>
              <p className="text-sm text-gray-500 text-center py-8">
                Nenhum download realizado ainda
              </p>
            </div>

            {/* Dica Motivacional */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Dica</h4>
                  <p className="text-sm text-blue-800">
                    Complete os módulos em sequência para maximizar seu aprendizado e construir um plano de negócios sólido.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
