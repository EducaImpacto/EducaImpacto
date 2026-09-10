import React, { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { CheckCircle2, Edit, FileDown, Loader2, MessageSquare, Share2, Star } from 'lucide-react';
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

/** Espelha `business_plans.content.generatedPlan` gravado pelo agente de IA. */
export interface GeneratedBusinessPlanContent {
  executiveSummary: string;
  businessDescription: string;
  targetAudienceAndMarket: string;
  problemAndOpportunity: string;
  solutionAndValueProposition: string;
  operationsPlan: string;
  marketingAndSalesPlan: string;
  financialOverview: string;
  risksAndMitigations: string;
  nextSteps: string[];
}

export type BusinessPlanGenerationStatus = 'idle' | 'polling' | 'generated' | 'failed' | 'timeout';

interface BusinessPlanScreenProps {
  diagnosticData: DiagnosticData;
  answers: MissionAnswer[];
  moduleAnswerTargets: ModuleAnswerTarget[];
  onDownload: () => void;
  onEditAnswer: (missionId: string) => void;
  onShare: () => void;
  onBackToDashboard: () => void;
  generationStatus?: BusinessPlanGenerationStatus;
  generatedPlan?: GeneratedBusinessPlanContent;
}

const planSections = [
  {
    title: 'Sumário Executivo',
    blocks: ['Empreendedor e contexto', 'Produto / Serviço', 'Proposta de valor'],
    description: 'Visão geral do negócio, oportunidade, solução proposta e principais pontos de atenção.',
    generatedField: 'executiveSummary' as const,
  },
  {
    title: 'Descrição do Negócio',
    blocks: ['Empreendedor e contexto', 'Produto / Serviço', 'Operação básica'],
    description: 'Apresentação do que será oferecido, como o negócio começa e quais recursos já existem.',
    generatedField: 'businessDescription' as const,
  },
  {
    title: 'Público-Alvo e Mercado',
    blocks: ['Cliente e mercado'],
    description: 'Perfil de cliente, contexto de compra, canais de acesso e cenário de mercado inicial.',
    generatedField: 'targetAudienceAndMarket' as const,
  },
  {
    title: 'Problema e Oportunidade',
    blocks: ['Problema', 'Cliente e mercado'],
    description: 'Dor principal do cliente e oportunidade que justifica a existência do negócio.',
    generatedField: 'problemAndOpportunity' as const,
  },
  {
    title: 'Solução e Proposta de Valor',
    blocks: ['Proposta de valor', 'Produto / Serviço'],
    description: 'Como a solução responde ao problema e por que ela pode ser relevante para o cliente.',
    generatedField: 'solutionAndValueProposition' as const,
  },
  {
    title: 'Operação',
    blocks: ['Operação básica'],
    description: 'Primeiros processos, recursos, estrutura necessária e forma de entrega.',
    generatedField: 'operationsPlan' as const,
  },
  {
    title: 'Marketing e Vendas',
    blocks: ['Canais de venda e aquisição', 'Cliente e mercado', 'Crescimento'],
    description: 'Canais para encontrar clientes, comunicar a oferta e iniciar as primeiras vendas.',
    generatedField: 'marketingAndSalesPlan' as const,
  },
  {
    title: 'Financeiro Inicial',
    blocks: ['Custos', 'Receita'],
    description: 'Principais custos, fontes de receita e pontos que precisam de validação financeira.',
    generatedField: 'financialOverview' as const,
  },
  {
    title: 'Riscos e Próximos Passos',
    blocks: ['Crescimento', 'Custos', 'Operação básica'],
    description: 'Incertezas, validações pendentes e ações recomendadas para evoluir o negócio.',
    generatedField: 'risksAndMitigations' as const,
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
  generationStatus = 'idle',
  generatedPlan,
}: BusinessPlanScreenProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const answersBySection = useMemo(() => {
    return planSections.map((section) => {
      const sectionAnswers = answers.filter((answer) =>
        answer.planBlocks.some((block) => section.blocks.includes(block))
      );
      const generatedText = generatedPlan?.[section.generatedField];

      return {
        ...section,
        totalAnswers: sectionAnswers.length,
        answers: sectionAnswers,
        draft: generatedText || buildProfessionalDraft(section.title, section.description, sectionAnswers),
        isAiGenerated: Boolean(generatedText),
      };
    });
  }, [answers, generatedPlan]);

  const activeSection = answersBySection[activeSectionIndex] ?? answersBySection[0];
  const activeSectionAnswerCount = activeSection?.answers.length ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5faf7] via-[#f5faf7] to-[#f5faf7]">
      <div className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 overflow-hidden rounded-lg bg-white shadow-xl sm:mb-8"
        >
          <div className="bg-gradient-to-r from-[#329314] via-[#0A5740] to-[#329314] px-4 py-8 text-center sm:px-8 sm:py-10 lg:py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg sm:h-20 sm:w-20 lg:h-24 lg:w-24"
            >
              <CheckCircle2 className="h-8 w-8 text-[#329314] sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mb-3 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              Plano de Negócios concluído
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mb-5 max-w-4xl text-base leading-relaxed text-[#e5f0ea] sm:text-lg lg:text-xl"
            >
              A IA organizou suas respostas em uma estrutura profissional para apresentar e validar sua ideia.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 sm:gap-3"
            >
              <Badge type="trophy" label="Jornada Completa" color="green" />
              <Badge type="star" label={`Perfil: ${profileLabels[diagnosticData.nivel]}`} color="orange" />
              <Badge type="zap" label="Insígnia: Plano Concluído" color="blue" />
            </motion.div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
              <div className="min-w-0">
                <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">Plano profissional estruturado</h2>
                <p className="mb-5 max-w-4xl text-sm leading-relaxed text-gray-600 sm:text-base">
                  Esta versão prepara a estrutura oficial que a IA deverá preencher e refinar. Por enquanto,
                  o texto usa suas respostas como base de rascunho para validar o formato do plano.
                </p>

                {(generationStatus === 'polling') && (
                  <div className="mb-5 flex items-start gap-3 rounded-lg border border-[#B2C9BF] bg-[#f5faf7] p-4 text-sm text-[#052254]">
                    <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
                    <span>Gerando a versão profissional do plano com IA. Isso pode levar até alguns minutos.</span>
                  </div>
                )}
                {generationStatus === 'generated' && (
                  <div className="mb-5 flex items-start gap-3 rounded-lg border border-[#329314]/40 bg-[#e5f0ea] p-4 text-sm text-[#0A5740]">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>Plano profissional gerado com IA. As seções abaixo já refletem o conteúdo revisado.</span>
                  </div>
                )}
                {(generationStatus === 'failed' || generationStatus === 'timeout') && (
                  <div className="mb-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
                    Não foi possível concluir a geração com IA agora. As seções abaixo seguem mostrando o rascunho
                    a partir das suas respostas.
                  </div>
                )}

                <div className="mb-5 rounded-lg border border-gray-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm">
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Seções do plano
                      </p>
                      <p className="text-sm text-gray-600">
                        Mostrando {activeSectionIndex + 1} de {answersBySection.length}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 sm:text-right">
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
                          className={`min-w-[160px] rounded-lg px-3 py-3 text-left transition-all sm:min-w-[180px] sm:px-4 ${
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
                  <div className="rounded-lg border border-gray-200 p-4 sm:p-5">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#329314] flex-shrink-0 mt-1" />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-gray-900">{activeSection.title}</h3>
                            {activeSection.isAiGenerated && (
                              <span className="rounded-full bg-[#e5f0ea] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#0A5740]">
                                Gerado com IA
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{activeSection.description}</p>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-gray-500">
                        {activeSectionIndex + 1} de {answersBySection.length}
                      </div>
                    </div>

                    <div className="whitespace-pre-wrap break-words rounded-lg bg-[#f5faf7] p-4 text-sm leading-7 text-gray-700">
                      {activeSection.draft}
                    </div>

                    {activeSection.generatedField === 'risksAndMitigations' && generatedPlan?.nextSteps?.length ? (
                      <div className="mt-4 rounded-lg border border-gray-200 p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                          Próximos passos sugeridos pela IA
                        </p>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                          {generatedPlan.nextSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="mt-5 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Insumos usados nesta seção
                      </p>
                      {activeSection.answers.map((answer) => (
                        <div key={`${activeSection.title}-${answer.missionId}`} className="rounded-lg bg-gray-50 p-4">
                          <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
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

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveSectionIndex((current) => Math.max(0, current - 1))}
                        disabled={activeSectionIndex === 0}
                      >
                        Seção anterior
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveSectionIndex((current) => Math.min(answersBySection.length - 1, current + 1))}
                        disabled={activeSectionIndex === answersBySection.length - 1}
                      >
                        Próxima seção
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <aside className="grid min-w-0 gap-4 sm:grid-cols-2 lg:block lg:space-y-5">
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

                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
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

            <div className="mb-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
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
          className="mb-8 rounded-lg bg-white p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-[#052254]" />
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Validação da experiência</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div>
              <p className="text-gray-600 mb-4">O plano gerado representa bem seu negócio?</p>
              <div className="mb-6 flex flex-wrap gap-2">
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
