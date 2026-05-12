import React, { useState } from 'react';
import { ProgressBar } from '../components/ProgressBar';
import { Sparkles, ArrowRight, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Mission {
  id: number;
  etapa: number;
  etapaLabel: string;
  title: string;
  intro: string;
  question: string;
  placeholder: string;
  xpReward: number;
}

interface MissionScreenProps {
  mission: Mission;
  progress: number;
  totalMissions: number;
  currentMissionNumber: number;
  onNext: (answer: string) => void;
}

export function MissionScreen({
  mission,
  progress,
  totalMissions,
  currentMissionNumber,
  onNext,
}: MissionScreenProps) {
  const [answer, setAnswer] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);
  const [sugestaoIA, setSugestaoIA] = useState('');
  const [mostrarSugestao, setMostrarSugestao] = useState(false);

  const handleNext = () => {
    if (answer.trim()) {
      onNext(answer.trim());
      setAnswer('');
      setSugestaoIA('');
      setMostrarSugestao(false);
    }
  };

  const handleMelhorarComIA = async () => {
    if (!answer.trim()) return;
    setLoadingIA(true);
    setMostrarSugestao(false);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `Você é um assistente especializado em planos de negócios para empreendedores brasileiros iniciantes.\n\nO usuário está respondendo à seguinte missão:\n"${mission.question}"\n\nResposta atual do usuário:\n"${answer}"\n\nSua tarefa:\n1. Analise a resposta em 1 frase curta (o que está bom)\n2. Sugira UMA melhoria específica e prática\n3. Ofereça uma versão melhorada da resposta (máximo 3 linhas)\n\nResponda em português, de forma encorajadora e direta. Não use marcadores ou asteriscos. Use parágrafos simples.`,
            },
          ],
        }),
      });
      const data = await response.json();
      const texto = data.content?.find((b: { type: string }) => b.type === 'text')?.text ?? 'Não foi possível gerar sugestão. Tente novamente.';
      setSugestaoIA(texto);
      setMostrarSugestao(true);
    } catch {
      setSugestaoIA('Não foi possível conectar à IA. Verifique sua conexão e tente novamente.');
      setMostrarSugestao(true);
    } finally {
      setLoadingIA(false);
    }
  };

  const handleAplicarSugestao = () => {
    const linhas = sugestaoIA.split('\n').filter(Boolean);
    const versaoMelhorada = linhas[linhas.length - 1] ?? sugestaoIA;
    setAnswer(versaoMelhorada);
    setMostrarSugestao(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-semibold text-gray-500">
              Missão {currentMissionNumber} de {totalMissions}
            </span>
            <span className="ml-auto text-xs font-bold text-blue-600">{progress}%</span>
          </div>
          <ProgressBar progress={progress} showLabel={false} height="sm" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">
            Etapa {mission.etapa} - {mission.etapaLabel}
          </div>
        </motion.div>

        <motion.div
          key={mission.id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-4"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Missão - {mission.title}
          </h2>

          <p className="text-gray-500 text-sm mb-6 leading-relaxed">{mission.intro}</p>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
            <p className="text-blue-900 font-semibold text-base">{`-> ${mission.question}`}</p>
          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={mission.placeholder}
            rows={5}
            className="w-full p-4 border-2 border-gray-200 focus:border-blue-400 focus:outline-none rounded-xl text-gray-800 text-sm leading-relaxed resize-none transition-colors placeholder:text-gray-400"
          />

          <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>+{mission.xpReward} XP ao completar esta missão</span>
          </div>
        </motion.div>

        <AnimatePresence>
          {mostrarSugestao && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-4"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm font-bold text-orange-900">Sugestão da IA</span>
                </div>
                <button onClick={() => setMostrarSugestao(false)} className="text-orange-400 hover:text-orange-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-orange-800 text-sm leading-relaxed whitespace-pre-line mb-4">{sugestaoIA}</p>
              <button
                onClick={handleAplicarSugestao}
                className="text-sm font-semibold text-orange-700 border border-orange-300 hover:bg-orange-100 px-4 py-2 rounded-lg transition-colors"
              >
                Aplicar versão melhorada
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <button
            onClick={handleNext}
            disabled={!answer.trim()}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all duration-150 shadow hover:shadow-md text-base"
          >
            Avançar missão
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleMelhorarComIA}
            disabled={!answer.trim() || loadingIA}
            className="w-full flex items-center justify-center gap-2 border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed text-orange-700 font-semibold py-3.5 rounded-2xl transition-all duration-150 text-sm"
          >
            {loadingIA ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analisando sua resposta...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Quer melhorar sua resposta?
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          Suas respostas constroem seu plano de negócios
        </p>
      </div>
    </div>
  );
}
