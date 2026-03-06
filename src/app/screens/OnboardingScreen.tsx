import React from 'react';
import { Button } from '../components/Button';
import { Clock, BookOpen, FileText, Sparkles } from 'lucide-react';

interface OnboardingScreenProps {
  onStart: () => void;
}

export function OnboardingScreen({ onStart }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Em poucos passos, você construirá seu plano de negócios
            </h1>
            <p className="text-lg text-gray-600">
              Uma jornada gamificada para transformar sua ideia em realidade
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Tempo Estimado</h3>
                <p className="text-gray-600 text-sm">30-45 minutos para completar toda a jornada</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">5 Módulos Interativos</h3>
                <p className="text-gray-600 text-sm">Aprenda e aplique conceitos fundamentais do empreendedorismo</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Recompensa Final</h3>
                <p className="text-gray-600 text-sm">Plano de negócios completo em PDF profissional</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button variant="primary" size="lg" className="w-full" onClick={onStart}>
              🚀 Começar Missão
            </Button>
            <p className="text-center text-sm text-gray-500">
              Ganhe XP, desbloqueie insígnias e construa seu futuro
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
