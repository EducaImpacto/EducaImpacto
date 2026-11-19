import React, { useEffect, useState } from 'react';
import { ProgressBar } from '../components/ProgressBar';
import { Sparkles, ArrowRight, ArrowLeft, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAnswerValidationMessage } from '../utils/answerValidation';
import { isUnsafeProposal, safetyMessage } from '../../../supabase/functions/_shared/planSafety';

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
  totalModules: number;
  currentModuleNumber: number;
  totalModuleMissions: number;
  currentModuleMissionNumber: number;
  draftKey: string;
  initialAnswer?: string;
  isEditing?: boolean;
  canGoBackQuestion?: boolean;
  pageBackLabel?: string;
  onNext: (answer: string) => void;
  onBackQuestion: () => void;
  onBackPage: () => void;
}

export function MissionScreen({
  mission,
  progress,
  totalModules,
  currentModuleNumber,
  totalModuleMissions,
  currentModuleMissionNumber,
  draftKey,
  initialAnswer = '',
  isEditing = false,
  canGoBackQuestion = false,
  pageBackLabel = 'Voltar aos módulos',
  onNext,
  onBackQuestion,
  onBackPage,
}: MissionScreenProps) {
  const [answer, setAnswer] = useState(initialAnswer);
  const [suggestionError, setSuggestionError] = useState(false);
  const updateDraft = (value: string) => {
    setAnswer(value);
    localStorage.setItem(draftKey, value);
  };
  const [loadingIA, setLoadingIA] = useState(false);
  const [sugestaoIA, setSugestaoIA] = useState('');
  const [mostrarSugestao, setMostrarSugestao] = useState(false);
  const validationMessage = getAnswerValidationMessage(answer);

  useEffect(() => {
    setAnswer(localStorage.getItem(draftKey) ?? initialAnswer);
    setSugestaoIA('');
    setMostrarSugestao(false);
  }, [draftKey, initialAnswer]);

  const handleNext = () => {
    if (!validationMessage) {
      localStorage.removeItem(draftKey);
      onNext(answer.trim());
      setSugestaoIA('');
      setMostrarSugestao(false);
    }
  };

  const handleMelhorarComIA = async () => {
    if (validationMessage) return;
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
      if (!response.ok) throw new Error();
      const data = await response.json();
      const texto = data.content?.find((b: { type: string }) => b.type === 'text')?.text;
      if (typeof texto !== 'string' || !texto.trim()) throw new Error();
      if (isUnsafeProposal(texto)) {
        setSuggestionError(true);
        setSugestaoIA(safetyMessage);
        setMostrarSugestao(true);
        return;
      }
      setSuggestionError(false);
      setSugestaoIA(texto);
      setMostrarSugestao(true);
    } catch {
      setSuggestionError(true);
      setSugestaoIA('Não foi possível conectar à IA. Verifique sua conexão e tente novamente.');
      setMostrarSugestao(true);
    } finally {
      setLoadingIA(false);
    }
  };

  const handleAplicarSugestao = () => {
    if (suggestionError) return;
    const linhas = sugestaoIA.split('\n').filter(Boolean);
    const versaoMelhorada = linhas[linhas.length - 1] ?? sugestaoIA;
    updateDraft(versaoMelhorada);
    setMostrarSugestao(false);
  };

  return (
    <div className="min-h-screen bg-[#f5faf7]">
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-semibold text-gray-500">
              Módulo {currentModuleNumber} de {totalModules}
            </span>
            <span className="text-xs font-semibold text-gray-500">
              Pergunta {currentModuleMissionNumber} de {totalModuleMissions}
            </span>
            <span className="ml-auto text-xs font-bold text-[#052254]">{progress}%</span>
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
          <div className="inline-flex items-center gap-2 bg-[#e5f0ea] text-[#052254] text-xs font-bold px-3 py-1.5 rounded-full">
            Etapa {mission.etapa} - {mission.etapaLabel}
          </div>
        </motion.div>

        <motion.div
          key={mission.id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-lg border border-[#d8e7df] p-6 md:p-8 mb-4"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Missão - {mission.title}
          </h2>

          <p className="text-gray-500 text-sm mb-6 leading-relaxed">{mission.intro}</p>

          <label htmlFor="mission-answer" className="mb-3 block font-semibold text-[#052254]">{mission.question}</label>

          <textarea id="mission-answer"
            value={answer}
            onChange={(e) => updateDraft(e.target.value)}
            placeholder={mission.placeholder}
            rows={5}
            className={`w-full p-4 border-2 focus-visible:ring-2 focus-visible:ring-[#0A5740] rounded-lg text-gray-800 text-sm leading-relaxed resize-none transition-colors placeholder:text-gray-400 ${
              validationMessage && answer.trim()
                ? 'border-red-200 focus:border-red-400'
                : 'border-gray-200 focus:border-[#7CAF70]'
            }`}
          />

          <div className="mt-3 flex flex-col gap-2 text-xs">
            {validationMessage && answer.trim() && (
              <span className="font-medium text-red-600">{validationMessage}</span>
            )}

          </div>
        </motion.div>

        <AnimatePresence>
          {mostrarSugestao && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="bg-[#f5faf7] border border-[#B2C9BF] rounded-lg p-5 mb-4"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#329314] flex-shrink-0" />
                  <span className="text-sm font-bold text-[#0A5740]">Sugestão da IA</span>
                </div>
                <button onClick={() => setMostrarSugestao(false)} className="text-[#7CAF70] hover:text-[#329314]">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[#0A5740] text-sm leading-relaxed whitespace-pre-line mb-4">{sugestaoIA}</p>
              <button
                disabled={suggestionError}
                onClick={handleAplicarSugestao}
                className="text-sm font-semibold text-[#0A5740] border border-[#7CAF70] hover:bg-[#e5f0ea] px-4 py-2 rounded-lg transition-colors"
              >
                Aplicar versão melhorada
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onBackQuestion}
              disabled={!canGoBackQuestion}
              className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-semibold py-3.5 rounded-lg transition-all duration-150 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar pergunta
            </button>

            <button
              type="button"
              onClick={onBackPage}
              className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-lg transition-all duration-150 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {pageBackLabel}
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={Boolean(validationMessage)}
            className="w-full flex items-center justify-center gap-2 bg-[#052254] hover:bg-[#06173C] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all duration-150 shadow hover:shadow-sm text-base"
          >
            {isEditing ? 'Salvar resposta' : 'Avançar missão'}
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleMelhorarComIA}
            disabled={Boolean(validationMessage) || loadingIA}
            className="w-full flex items-center justify-center gap-2 border-2 border-[#B2C9BF] hover:border-[#329314] hover:bg-[#f5faf7] disabled:opacity-40 disabled:cursor-not-allowed text-[#0A5740] font-semibold py-3.5 rounded-lg transition-all duration-150 text-sm"
          >
            {loadingIA ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analisando sua resposta...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Melhorar minha resposta com IA
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
