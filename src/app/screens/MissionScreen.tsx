import React, { useState } from 'react';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { MicroContentCard } from '../components/MicroContentCard';
import { ArrowRight, ClipboardList, Sparkles } from 'lucide-react';
import type { Mission } from '../App';

interface MissionScreenProps {
  mission: Mission;
  moduleTitle: string;
  moduleObjective: string;
  progress: number;
  missionNumber: number;
  totalMissions: number;
  onNext: (answer: string) => void;
  onImprove: (answer: string) => void;
}

export function MissionScreen({
  mission,
  moduleTitle,
  moduleObjective,
  progress,
  missionNumber,
  totalMissions,
  onNext,
  onImprove,
}: MissionScreenProps) {
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
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Missão {missionNumber} de {totalMissions}</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar progress={progress} height="md" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full mb-4">
            <ClipboardList className="w-4 h-4" />
            <span className="font-semibold">Nível {mission.level} - {moduleTitle}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Missão - {mission.title}
          </h1>
          <p className="text-gray-600 max-w-2xl">{moduleObjective}</p>
        </div>

        <MicroContentCard
          title={mission.microContent.title}
          content={mission.microContent.content}
        />

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{mission.intro}</p>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">{mission.question}</h2>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={mission.placeholder}
            className="w-full min-h-[200px] p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
          />

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>+{mission.xpReward} XP ao completar esta missão</span>
            </div>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>Alimenta: {mission.planBlocks.join(', ')}</span>
          </div>
        </div>

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
            Quer melhorar sua resposta?
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Suas respostas serão usadas para estruturar o plano de negócios final.
        </p>
      </div>
    </div>
  );
}
