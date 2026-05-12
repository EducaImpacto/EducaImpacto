import React from 'react';
import { Button } from '../components/Button';
import { ModuleCard } from '../components/ModuleCard';
import { LevelIndicator } from '../components/LevelIndicator';
import { ProgressBar } from '../components/ProgressBar';
import { BarChart3, FileDown, History, Sparkles } from 'lucide-react';
import type { Module } from '../App';

interface DashboardScreenProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  overallProgress: number;
  modules: Module[];
  totalMissions: number;
  completedMissions: number;
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
  totalMissions,
  completedMissions,
  canGeneratePlan,
  onModuleClick,
  onGeneratePlan,
}: DashboardScreenProps) {
  const completedModules = modules.filter((module) => module.completed).length;
  const nextModule = modules.find((module) => !module.completed && !module.locked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard da Trilha</h1>
                <p className="text-sm text-gray-600">Acompanhe seu progresso na construção do plano de negócios</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Progresso Geral</h2>
                  <p className="text-sm text-gray-600">Uma missão concluída por vez, sem sobrecarga.</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
                  <div className="text-xs text-gray-500">da trilha</div>
                </div>
              </div>
              <ProgressBar progress={overallProgress} height="lg" />
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-600">{completedMissions} de {totalMissions} missões concluídas</span>
                <span className="font-semibold text-blue-600">{completedModules} de {modules.length} etapas completas</span>
              </div>
            </div>

            {nextModule && (
              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Continue sua próxima missão</h2>
                <p className="text-blue-100 mb-6">
                  Próxima etapa liberada: {nextModule.title}. Cada resposta aproxima seu plano de negócios da versão final.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => onModuleClick(nextModule.id)}
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Continuar Trilha
                </Button>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Etapas da Trilha Iniciante</h2>
              <div className="space-y-4">
                {modules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    title={module.title}
                    description={`${module.description} (${module.missions.length} missões)`}
                    completed={module.completed}
                    locked={module.locked}
                    onClick={() => onModuleClick(module.id)}
                  />
                ))}
              </div>
            </div>

            {canGeneratePlan && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg p-8 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">Plano de Negócios desbloqueado</h2>
                    <p className="text-green-100 mb-6">
                      Você completou as 20 missões. Agora a IA organiza suas respostas em um plano estruturado.
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

          <div className="space-y-6">
            <LevelIndicator level={level} xp={xp} nextLevelXp={nextLevelXp} />

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Indicadores MVP</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Missões concluídas</span>
                  <span className="font-bold text-green-600">{completedMissions}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Missões pendentes</span>
                  <span className="font-bold text-orange-600">{totalMissions - completedMissions}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Nível atual</span>
                  <span className="font-bold text-blue-600">{level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">XP acumulado</span>
                  <span className="font-bold text-purple-600">{xp}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-900">Histórico de Downloads</h3>
              </div>
              <p className="text-sm text-gray-500 text-center py-8">
                Nenhum download realizado ainda
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Dica</h4>
                  <p className="text-sm text-blue-800">
                    Responda com exemplos concretos. Isso ajuda a gerar um plano mais claro, profissional e útil.
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
