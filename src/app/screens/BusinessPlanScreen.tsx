import React, { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { CheckCircle2, Edit, FileDown, MessageSquare, Share2, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { DiagnosticData } from './DiagnosticScreen';

type ProfileType = 'iniciante' | 'intermediario' | 'avancado';

interface MissionAnswer {
  missionId: string;
  moduleId: number;
  moduleTitle: string;
  missionTitle: string;
  answer: string;
  planBlocks: string[];
}

interface ModuleAnswerTarget {
  moduleId: number;
  title: string;
  total: number;
}

interface BusinessPlanScreenProps {
  diagnosticData: DiagnosticData;
  answers: MissionAnswer[];
  moduleAnswerTargets: ModuleAnswerTarget[];
  onDownload: () => void;
  onEditAnswer: (missionId: string) => void;
  onShare: () => void;
  onBackToDashboard: () => void;
}

const planSections = [
  {
    title: 'Sumário Executivo',
    blocks: ['Empreendedor e contexto', 'Produto / Serviço', 'Proposta de valor'],
    description: 'Visão geral do negócio, oportunidade, solução proposta e principais pontos de atenção.',
  },
  {
    title: 'Descrição do Negócio',
    blocks: ['Empreendedor e contexto', 'Produto / Serviço', 'Operação básica'],
    description: 'Apresentação do que será oferecido, como o negócio começa e quais recursos já existem.',
  },
  {
    title: 'Público-Alvo e Mercado',
    blocks: ['Cliente e mercado'],
    description: 'Perfil de cliente, contexto de compra, canais de acesso e cenário de mercado inicial.',
  },
  {
    title: 'Problema e Oportunidade',
    blocks: ['Problema', 'Cliente e mercado'],
    description: 'Dor principal do cliente e oportunidade que justifica a existência do negócio.',
  },
  {
    title: 'Solução e Proposta de Valor',
    blocks: ['Proposta de valor', 'Produto / Serviço'],
    description: 'Como a solução responde ao problema e por que ela pode ser relevante para o cliente.',
  },
  {
    title: 'Operação',
    blocks: ['Operação básica'],
    description: 'Primeiros processos, recursos, estrutura necessária e forma de entrega.',
  },
  {
    title: 'Marketing e Vendas',
    blocks: ['Canais de venda e aquisição', 'Cliente e mercado', 'Crescimento'],
    description: 'Canais para encontrar clientes, comunicar a oferta e iniciar as primeiras vendas.',
  },
  {
    title: 'Financeiro Inicial',
    blocks: ['Custos', 'Receita'],
    description: 'Principais custos, fontes de receita e pontos que precisam de validação financeira.',
  },
  {
    title: 'Riscos e Próximos Passos',
    blocks: ['Crescimento', 'Custos', 'Operação básica'],
    description: 'Incertezas, validações pendentes e ações recomendadas para evoluir o negócio.',
  },
];

const profileLabels: Record<ProfileType, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
};

function buildProfessionalDraft(sectionTitle: string, description: string, answers: MissionAnswer[]) {
  if (answers.length === 0) {
    return 'Esta seção será consolidada pela IA assim que houver informações suficientes para análise.';
  }

  const sourceText = answers
    .slice(0, 3)
    .map((answer) => answer.answer.trim())
    .filter(Boolean)
    .join(' ');

  return `${description} Com base nas informações fornecidas, esta seção deve considerar: ${sourceText}`;
}

export function BusinessPlanScreen({
  diagnosticData,
  answers,
  moduleAnswerTargets,
  onDownload,
  onEditAnswer,
  onShare,
  onBackToDashboard,
}: BusinessPlanScreenProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const answersBySection = useMemo(() => {
    return planSections.map((section) => {
      const sectionAnswers = answers.filter((answer) =>
        answer.planBlocks.some((block) => section.blocks.includes(block))
      );

      return {
        ...section,
        totalAnswers: sectionAnswers.length,
        answers: sectionAnswers,
        draft: buildProfessionalDraft(section.title, section.description, sectionAnswers),
      };
    });
  }, [answers]);

  const activeSection = answersBySection[activeSectionIndex] ?? answersBySection[0];
  const activeSectionAnswerCount = activeSection?.answers.length ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5faf7] via-[#f5faf7] to-[#f5faf7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-[#329314] via-[#0A5740] to-[#329314] px-8 py-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <CheckCircle2 className="w-12 h-12 text-[#329314]" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Plano de Negócios concluído
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-[#e5f0ea] mb-6"
            >
              A IA organizou suas respostas em uma estrutura profissional para apresentar e validar sua ideia.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-3 flex-wrap"
            >
              <Badge type="trophy" label="Jornada Completa" color="green" />
              <Badge type="star" label={`Perfil: ${profileLabels[diagnosticData.nivel]}`} color="orange" />
              <Badge type="zap" label="Insígnia: Plano Concluído" color="blue" />
            </motion.div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-[1fr_320px] gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Plano profissional estruturado</h2>
                <p className="text-gray-600 mb-6">
                  Esta versão prepara a estrutura oficial que a IA deverá preencher e refinar. Por enquanto,
                  o texto usa suas respostas como base de rascunho para validar o formato do plano.
                </p>

                <div className="mb-5 rounded-2xl border border-gray-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Seções do plano
                      </p>
                      <p className="text-sm text-gray-600">
                        Mostrando {activeSectionIndex + 1} de {answersBySection.length}
                      </p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <div className="font-semibold text-gray-700">{activeSectionAnswerCount} insumos</div>
                      <div>da seção atual</div>
                    </div>
                  </div>

                  <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
                    {answersBySection.map((section, index) => {
                      const isActive = index === activeSectionIndex;
                      const isComplete = section.answers.length === section.totalAnswers;

                      return (
                        <button
                          key={section.title}
                          type="button"
                          onClick={() => setActiveSectionIndex(index)}
                          className={`min-w-[180px] rounded-2xl px-4 py-3 text-left transition-all ${
                            isActive
                              ? 'bg-[#052254] text-white shadow-md'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className="text-sm font-bold">{section.title}</div>
                          <div className={`mt-1 text-xs ${isActive ? 'text-[#e5f0ea]' : 'text-gray-500'}`}>
                            {section.answers.length} insumos{isComplete ? ' mapeados' : ''}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {activeSection && (
                  <div className="border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#329314] flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-gray-900">{activeSection.title}</h3>
                          <p className="text-sm text-gray-600">{activeSection.description}</p>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-gray-500">
                        {activeSectionIndex + 1} de {answersBySection.length}
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#f5faf7] p-4 text-sm leading-7 text-gray-700">
                      {activeSection.draft}
                    </div>

                    <div className="mt-5 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Insumos usados nesta seção
                      </p>
                      {activeSection.answers.map((answer) => (
                        <div key={`${activeSection.title}-${answer.missionId}`} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <div className="text-sm font-semibold text-[#052254]">
                              {answer.missionTitle}
                            </div>
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
                      {activeSection.answers.length === 0 && (
                        <p className="text-sm text-gray-500">Sem respostas vinculadas a esta seção.</p>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveSectionIndex((current) => Math.max(0, current - 1))}
                        disabled={activeSectionIndex === 0}
                      >
                        Seção anterior
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveSectionIndex((current) => Math.min(answersBySection.length - 1, current + 1))}
                        disabled={activeSectionIndex === answersBySection.length - 1}
                      >
                        Próxima seção
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <aside className="space-y-5">
                <div className="bg-[#f5faf7] border-l-4 border-[#052254] rounded-lg p-5">
                  <h3 className="font-bold text-[#06173C] mb-3">Estrutura contemplada</h3>
                  <div className="space-y-2 text-sm text-[#06173C]">
                    {[
                      'Sumário Executivo',
                      'Mercado',
                      'Operação',
                      'Financeiro',
                      'Riscos',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#329314]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">Blocos internos preenchidos</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {new Set(answers.flatMap((answer) => answer.planBlocks)).size} de 10 blocos estruturais receberam dados.
                  </p>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#052254] to-[#329314]"
                      style={{ width: `${Math.min(100, (new Set(answers.flatMap((answer) => answer.planBlocks)).size / 10) * 100)}%` }}
                    />
                  </div>
                </div>
              </aside>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Button variant="primary" size="lg" className="w-full" onClick={onDownload}>
                <FileDown className="w-5 h-5 mr-2 inline" />
                Baixar PDF
              </Button>

              <Button variant="outline" size="lg" className="w-full" disabled>
                <Edit className="w-5 h-5 mr-2 inline" />
                Edite direto nos cards
              </Button>

              <Button variant="outline" size="lg" className="w-full" onClick={onShare}>
                <Share2 className="w-5 h-5 mr-2 inline" />
                Compartilhar
              </Button>
            </div>

            <div className="bg-[#f5faf7] border-l-4 border-[#052254] rounded-lg p-5">
              <p className="text-sm text-[#06173C]">
                <strong>Próximo passo:</strong> use esta prévia para validar se o plano representa bem o negócio e identificar pontos que precisam de pesquisa de mercado, custos reais e projeções financeiras.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-[#052254]" />
            <h2 className="text-2xl font-bold text-gray-900">Validação da experiência</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">O plano gerado representa bem seu negócio?</p>
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setRating(value)}
                    className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all ${
                      rating >= value ? 'bg-[#e5f0ea] border-[#329314] text-[#329314]' : 'border-gray-200 text-gray-400'
                    }`}
                    aria-label={`Avaliar com ${value}`}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Essa avaliação ajuda a medir qualidade percebida do plano e orientar melhorias da IA.
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-3" htmlFor="feedback">
                Quais foram os pontos mais úteis ou difíceis da trilha?
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder="Exemplo: As perguntas sobre cliente ajudaram bastante, mas senti dificuldade na parte de custos..."
                className="w-full min-h-[140px] p-4 border-2 border-gray-200 rounded-xl focus:border-[#052254] focus:outline-none resize-none"
              />
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <Button variant="outline" size="md" onClick={onBackToDashboard}>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
