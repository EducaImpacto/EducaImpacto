import React, { useState } from 'react';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { MicroContentCard } from '../components/MicroContentCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Mission {
  id: number;
  level: number;
  title: string;
  microContent: {
    title: string;
    content: string;
  };
  question: string;
  placeholder: string;
}

interface MissionScreenProps {
  mission: Mission;
  progress: number;
  onNext: (answer: string) => void;
  onImprove: (answer: string) => void;
}

export function MissionScreen({ mission, progress, onNext, onImprove }: MissionScreenProps) {
  const [answer, setAnswer] = useState('');

  const handleNext = () => {
    if (answer.trim()) {
      onNext(answer);
      setAnswer('');
    }
  };

  const handleImprove = () => {
    if (answer.trim()) {
      onImprove(answer);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header com Progress Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <ProgressBar progress={progress} height="md" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Nível e Título */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full mb-4">
            <span className="font-semibold">Nível {mission.level}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{mission.title}</h1>
        </div>

        {/* Microconteúdo */}
        <MicroContentCard 
          title={mission.microContent.title}
          content={mission.microContent.content}
        />

        {/* Pergunta Principal */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{mission.question}</h2>
          
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={mission.placeholder}
            className="w-full min-h-[200px] p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
          />

          {/* XP Indicator */}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>+100 XP ao completar esta missão</span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={handleNext}
            disabled={!answer.trim()}
          >
            Avançar Missão
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </Button>

          <Button 
            variant="outline" 
            size="md" 
            className="w-full"
            onClick={handleImprove}
            disabled={!answer.trim()}
          >
            <Sparkles className="w-4 h-4 mr-2 inline" />
            Quer melhorar sua resposta com IA?
          </Button>
        </div>

        {/* Dica de Navegação */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Suas respostas serão usadas para gerar seu plano de negócios
        </p>
      </div>
    </div>
  );
}
