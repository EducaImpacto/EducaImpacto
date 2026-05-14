import React from 'react';
import { Button } from '../components/Button';
import { BookOpen, Clock, FileText, PauseCircle, Sparkles, Target } from 'lucide-react';

type ProfileType = 'iniciante' | 'intermediario' | 'avancado';

interface OnboardingScreenProps {
  profileType: ProfileType;
  onStart: () => void;
  onOpenModules: () => void;
  onBackToDiagnostic: () => void;
}

export function OnboardingScreen({ profileType, onStart, onOpenModules, onBackToDiagnostic }: OnboardingScreenProps) {
  const isBeginner = profileType === 'iniciante';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Você está prestes a começar!
            </h1>
            <p className="text-lg text-gray-600">
              {isBeginner
                ? 'Sua trilha iniciante vai te guiar passo a passo na construção do seu negócio.'
                : 'Nesta demonstração, você seguirá a trilha iniciante para visualizar o fluxo completo do MVP.'}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" />
            ))}
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">4 etapas interativas</h3>
                <p className="text-gray-600 text-sm">Contexto do negócio, cliente, problema, solução e viabilidade</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Cerca de 10 minutos por etapa</h3>
                <p className="text-gray-600 text-sm">Perguntas em blocos pequenos para evitar sensação de formulário</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Aprenda e aplique no seu negócio</h3>
                <p className="text-gray-600 text-sm">Cada missão alimenta uma parte do plano de negócios final</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Recompensa final</h3>
                <p className="text-gray-600 text-sm">Seu plano de negócios profissional e estruturado</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-8 flex items-center gap-3 text-gray-600">
            <PauseCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm">Você pode pausar quando quiser. O importante é avançar com clareza, uma missão por vez.</p>
          </div>

          <div className="space-y-4">
            <Button variant="primary" size="lg" className="w-full" onClick={onStart}>
              Começar minha jornada
            </Button>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="outline" size="md" className="w-full" onClick={onOpenModules}>
                Ver módulos da trilha
              </Button>
              <Button variant="outline" size="md" className="w-full" onClick={onBackToDiagnostic}>
                Voltar às perguntas
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500">
              Ganhe XP, desbloqueie insígnias e construa seu plano enquanto avança
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
