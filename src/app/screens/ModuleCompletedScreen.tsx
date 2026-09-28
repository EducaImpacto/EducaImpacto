import React from 'react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Trophy, Star, ArrowRight, Edit, CheckCircle2, TrendingUp, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface MissionAnswer {
  missionId: string;
  missionTitle: string;
  answer: string;
}

interface ModuleCompletedScreenProps {
  moduleTitle: string;
  xpGained: number;
  badgeLabel: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  overallProgress: number;
  completedMissions: number;
  totalMissions: number;
  isLastModule?: boolean;
  answers: MissionAnswer[];
  onEditAnswer: (missionId: string) => void;
  onNext: () => void;
  onNextModule?: () => void;
}

export function ModuleCompletedScreen({ 
  moduleTitle, 
  xpGained, 
  badgeLabel, 
  level,
  xp,
  nextLevelXp,
  overallProgress,
  completedMissions,
  totalMissions,
  isLastModule = false,
  answers,
  onEditAnswer,
  onNext,
  onNextModule
}: ModuleCompletedScreenProps) {
  const safeProgress = Math.min(100, Math.max(0, overallProgress));
  const remainingProgress = Math.max(0, 100 - safeProgress);
  const xpToNextLevel = Math.max(0, nextLevelXp - xp);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5faf7] via-[#f5faf7] to-[#f5faf7] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#dbe9e2] bg-white p-6 text-center shadow-xl sm:p-8 md:p-10"
        >
          {/* Ícone de Conquista */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A5740] to-[#329314] shadow-lg"
          >
            <Trophy className="h-10 w-10 text-white" />
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-3xl font-bold text-[#052254] md:text-4xl"
          >
            Módulo concluído
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            {moduleTitle}
          </motion.p>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.43 }}
            className="mb-8 grid gap-4 md:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="rounded-xl border border-[#B2C9BF] bg-[#f5faf7] p-5 text-left">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#052254] to-[#0A5740]">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0A5740]">Seu progresso</div>
                    <div className="text-2xl font-bold text-[#052254]">Nível {level}</div>
                  </div>
                </div>
                <Badge type="award" label={badgeLabel} color="green" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white p-4">
                  <div className="text-xs font-semibold text-gray-500">XP total</div>
                  <div className="mt-1 text-2xl font-bold text-[#329314]">{xp}</div>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <div className="text-xs font-semibold text-gray-500">Próximo nível</div>
                  <div className="mt-1 text-2xl font-bold text-[#052254]">
                    {xpToNextLevel === 0 ? 'Agora!' : `${xpToNextLevel} XP`}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#7CAF70] bg-gradient-to-br from-[#e5f0ea] to-white p-5 text-left">
              <div className="mb-4 flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#329314] text-white">
                  <Target className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0A5740]">Plano completo</div>
                  <div className="mt-1 text-3xl font-bold text-[#052254]">{safeProgress}% concluído</div>
                  <p className="mt-1 text-sm text-gray-600">
                    {completedMissions} de {totalMissions} missões respondidas.
                  </p>
                </div>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#052254] via-[#0A5740] to-[#329314] transition-all duration-700"
                  style={{ width: `${safeProgress}%` }}
                />
              </div>

              <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm font-semibold leading-6 text-[#052254]">
                {remainingProgress > 0
                  ? `Faltam ${remainingProgress}% para chegar ao plano de negócios e se preparar para buscar até R$ 10.000 em microcrédito.`
                  : 'Você chegou ao plano de negócios e já tem uma base melhor para se preparar para buscar microcrédito.'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mb-8 text-left"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#329314]" />
              <h3 className="text-lg font-bold text-gray-900">Respostas deste módulo</h3>
            </div>

            <div className="space-y-3">
              {answers.map((answer) => (
                <div key={answer.missionId} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="text-sm font-semibold text-[#052254]">{answer.missionTitle}</div>
                    <button
                      type="button"
                      onClick={() => onEditAnswer(answer.missionId)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#052254] hover:text-[#06173C]"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Editar
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">{answer.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* XP Ganho */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mb-6 rounded-xl border border-[#7CAF70] bg-gradient-to-r from-[#e5f0ea] to-[#e5f0ea] p-5 sm:p-6"
          >
            <div className="flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-[#329314]" />
              <div className="text-left">
                <div className="text-sm text-[#0A5740] font-medium">XP do módulo</div>
                <div className="text-3xl font-bold text-[#329314]">+{xpGained} XP</div>
              </div>
            </div>
          </motion.div>

          {/* Botão para Próximo Módulo */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={onNext}
            >
              Voltar ao Dashboard
            </Button>

            {!isLastModule && onNextModule && (
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={onNextModule}
              >
                Próximo módulo
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            )}
          </motion.div>

          {/* Mensagem Motivacional */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-sm text-gray-500"
          >
            Continue assim! Você está mais perto do seu plano de negócios.
          </motion.p>
        </motion.div>

        {/* Animação de Confete */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-center gap-3"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-gradient-to-br from-[#7CAF70] to-[#329314] rounded-sm"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
