import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Sparkles, Target, Clock, Lightbulb, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DiagnosticData {
  objetivo: string;
  experiencia: string;
  tempoSemanal: number;
  interesse: string;
  desafio: string;
}

interface DiagnosticScreenProps {
  onComplete: (data: DiagnosticData) => void;
}

export function DiagnosticScreen({ onComplete }: DiagnosticScreenProps) {
  const [step, setStep] = useState(1);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData>({
    objetivo: '',
    experiencia: '',
    tempoSemanal: 5,
    interesse: '',
    desafio: '',
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(diagnosticData);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return diagnosticData.objetivo !== '';
      case 2:
        return diagnosticData.experiencia !== '';
      case 3:
        return true; // tempo sempre tem valor
      case 4:
        return diagnosticData.interesse !== '';
      case 5:
        return diagnosticData.desafio !== '';
      default:
        return false;
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Diagnóstico Inicial</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Vamos conhecer você melhor
          </h1>
          <p className="text-lg text-gray-600">
            Responda algumas perguntas para personalizarmos sua trilha de aprendizagem
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pergunta {step} de {totalSteps}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Cards */}
        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-6"
        >
          {/* Step 1: Objetivo */}
          {step === 1 && (
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Qual é o seu principal objetivo?
              </h2>
              <p className="text-gray-600 mb-6">
                Isso nos ajuda a direcionar o conteúdo mais relevante para você.
              </p>
              <div className="space-y-3">
                {[
                  { value: 'empreender', label: 'Quero empreender e criar meu próprio negócio', icon: '🚀' },
                  { value: 'aprender', label: 'Aprender mais sobre empreendedorismo', icon: '📚' },
                  { value: 'melhorar', label: 'Melhorar uma ideia de negócio que já tenho', icon: '💡' },
                  { value: 'validar', label: 'Validar se minha ideia tem potencial', icon: '✅' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDiagnosticData({ ...diagnosticData, objetivo: option.value })}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      diagnosticData.objetivo === option.value
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Experiência */}
          {step === 2 && (
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Você já tem alguma experiência com empreendedorismo?
              </h2>
              <p className="text-gray-600 mb-6">
                Não se preocupe, começamos do seu nível atual!
              </p>
              <div className="space-y-3">
                {[
                  { value: 'nenhuma', label: 'Nenhuma experiência, estou começando do zero', icon: '🌱' },
                  { value: 'basica', label: 'Tenho conhecimento básico sobre negócios', icon: '📖' },
                  { value: 'intermediaria', label: 'Já trabalhei com negócios ou tive pequenos projetos', icon: '🏪' },
                  { value: 'avancada', label: 'Tenho ou já tive um negócio próprio', icon: '🏢' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDiagnosticData({ ...diagnosticData, experiencia: option.value })}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      diagnosticData.experiencia === option.value
                        ? 'border-purple-600 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Tempo Disponível */}
          {step === 3 && (
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Quanto tempo por semana você pode dedicar?
              </h2>
              <p className="text-gray-600 mb-6">
                Vamos ajustar o ritmo da trilha ao seu tempo disponível.
              </p>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 bg-orange-50 px-8 py-4 rounded-2xl border-2 border-orange-200 mb-4">
                    <Clock className="w-6 h-6 text-orange-600" />
                    <span className="text-4xl font-bold text-orange-600">
                      {diagnosticData.tempoSemanal}
                    </span>
                    <span className="text-lg text-orange-700">horas/semana</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={diagnosticData.tempoSemanal}
                  onChange={(e) => setDiagnosticData({ ...diagnosticData, tempoSemanal: Number(e.target.value) })}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1h</span>
                  <span>10h</span>
                  <span>20h</span>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    {diagnosticData.tempoSemanal < 3 && '⏰ Ritmo tranquilo - Conteúdo condensado e prático'}
                    {diagnosticData.tempoSemanal >= 3 && diagnosticData.tempoSemanal <= 10 && '⚡ Ritmo equilibrado - Aprendizado consistente'}
                    {diagnosticData.tempoSemanal > 10 && '🚀 Ritmo acelerado - Máximo aproveitamento'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Área de Interesse */}
          {step === 4 && (
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Qual área mais te interessa?
              </h2>
              <p className="text-gray-600 mb-6">
                Vamos priorizar conteúdos relacionados ao seu interesse.
              </p>
              <div className="space-y-3">
                {[
                  { value: 'comercio', label: 'Comércio (loja física ou online)', icon: '🛍️' },
                  { value: 'servicos', label: 'Prestação de serviços', icon: '🔧' },
                  { value: 'digital', label: 'Negócios digitais e tecnologia', icon: '💻' },
                  { value: 'alimentacao', label: 'Alimentação e gastronomia', icon: '🍽️' },
                  { value: 'criativo', label: 'Economia criativa e artesanato', icon: '🎨' },
                  { value: 'social', label: 'Impacto social e sustentabilidade', icon: '🌍' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDiagnosticData({ ...diagnosticData, interesse: option.value })}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      diagnosticData.interesse === option.value
                        ? 'border-green-600 bg-green-50 shadow-md'
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Maior Desafio */}
          {step === 5 && (
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Qual é o seu maior desafio agora?
              </h2>
              <p className="text-gray-600 mb-6">
                Vamos focar em te ajudar exatamente no que você precisa.
              </p>
              <div className="space-y-3">
                {[
                  { value: 'ideia', label: 'Não sei por onde começar ou que negócio abrir', icon: '❓' },
                  { value: 'planejamento', label: 'Preciso organizar melhor minhas ideias', icon: '📋' },
                  { value: 'clientes', label: 'Entender meu público e atrair clientes', icon: '👥' },
                  { value: 'financeiro', label: 'Controle financeiro e precificação', icon: '💰' },
                  { value: 'marketing', label: 'Divulgar e vender mais', icon: '📢' },
                  { value: 'tempo', label: 'Gestão de tempo e organização', icon: '⏱️' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDiagnosticData({ ...diagnosticData, desafio: option.value })}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      diagnosticData.desafio === option.value
                        ? 'border-pink-600 bg-pink-50 shadow-md'
                        : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {step > 1 && (
            <Button variant="outline" size="lg" onClick={handlePrevious} className="flex-1">
              Voltar
            </Button>
          )}
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1"
          >
            {step === totalSteps ? 'Gerar Trilha Personalizada' : 'Próxima'}
            <ChevronRight className="w-5 h-5 ml-2 inline" />
          </Button>
        </div>

        {/* Footer Info */}
        <p className="text-center text-sm text-gray-500 mt-6">
          🔒 Suas respostas são confidenciais e usadas apenas para personalizar sua experiência
        </p>
      </div>
    </div>
  );
}
