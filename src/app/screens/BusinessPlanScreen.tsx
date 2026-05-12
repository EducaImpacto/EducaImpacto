import React, { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { CheckCircle2, Edit, FileDown, MessageSquare, Share2, Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { MissionAnswer } from '../App';

type ProfileType = 'iniciante' | 'intermediario' | 'avancado';

interface DiagnosticData {
  objetivo: string;
  experiencia: string;
  planoHoje: string;
  ferramenta: string;
  planoNegocios: string;
  score: number;
  profileType: ProfileType;
}

interface BusinessPlanScreenProps {
  diagnosticData: DiagnosticData;
  answers: MissionAnswer[];
  onDownload: () => void;
  onEdit: () => void;
  onShare: () => void;
  onBackToDashboard: () => void;
}

const planSections = [
  {
    title: 'Sumário Executivo',
    blocks: ['Empreendedor e contexto', 'Produto / Serviço', 'Proposta de valor'],
    description: 'Síntese inicial do negócio, da motivação do empreendedor e da solução proposta.',
  },
  {
    title: 'Descrição da Empresa',
    blocks: ['Empreendedor e contexto', 'Operação básica'],
    description: 'Contexto, missão inicial, recursos disponíveis e primeiros passos para começar.',
  },
  {
    title: 'Análise de Mercado',
    blocks: ['Cliente e mercado', 'Problema'],
    description: 'Perfil do cliente, realidade atual, problema enfrentado e relevância da oportunidade.',
  },
  {
    title: 'Plano de Marketing e Vendas',
    blocks: ['Proposta de valor', 'Canais de venda e aquisição', 'Receita'],
    description: 'Benefícios percebidos, canais para encontrar clientes e formato de geração de receita.',
  },
  {
    title: 'Plano Operacional',
    blocks: ['Produto / Serviço', 'Operação básica', 'Custos'],
    description: 'Funcionamento diário, recursos necessários, custos iniciais e capacidade de entrega.',
  },
  {
    title: 'Crescimento e Validação',
    blocks: ['Crescimento', 'Problema', 'Receita'],
    description: 'Pontos que precisam ser testados, oportunidades de melhoria e próximos passos.',
  },
];

const profileLabels: Record<ProfileType, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
};

export function BusinessPlanScreen({
  diagnosticData,
  answers,
  onDownload,
  onEdit,
  onShare,
  onBackToDashboard,
}: BusinessPlanScreenProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const answersBySection = useMemo(() => {
    return planSections.map((section) => ({
      ...section,
      answers: answers.filter((answer) =>
        answer.planBlocks.some((block) => section.blocks.includes(block))
      ),
    }));
  }, [answers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-8 py-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <CheckCircle2 className="w-12 h-12 text-green-500" />
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
              className="text-xl text-green-100 mb-6"
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
              <Badge type="star" label={`Perfil: ${profileLabels[diagnosticData.profileType]}`} color="orange" />
              <Badge type="zap" label="Insígnia: Plano Concluído" color="blue" />
            </motion.div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-[1fr_320px] gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Prévia estruturada do plano</h2>
                <p className="text-gray-600 mb-6">
                  Esta versão MVP usa as respostas da trilha iniciante para montar a base do plano de negócios.
                  Na integração final, esse conteúdo será refinado e exportado em PDF.
                </p>

                <div className="space-y-5">
                  {answersBySection.map((section) => (
                    <div key={section.title} className="border border-gray-200 rounded-2xl p-5">
                      <div className="flex items-start gap-3 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {section.answers.slice(0, 4).map((answer) => (
                          <div key={`${section.title}-${answer.missionId}`} className="bg-gray-50 rounded-xl p-4">
                            <div className="text-sm font-semibold text-blue-700 mb-1">
                              {answer.moduleTitle} - {answer.missionTitle}
                            </div>
                            <p className="text-sm text-gray-700">{answer.answer}</p>
                          </div>
                        ))}
                        {section.answers.length === 0 && (
                          <p className="text-sm text-gray-500">Sem respostas vinculadas a esta seção.</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="space-y-5">
                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-5">
                  <h3 className="font-bold text-blue-900 mb-3">Estrutura contemplada</h3>
                  <div className="space-y-2 text-sm text-blue-900">
                    {[
                      'Sumário executivo',
                      'Descrição da empresa',
                      'Análise de mercado',
                      'Plano de marketing',
                      'Plano operacional',
                      'Plano financeiro inicial',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
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
                      className="h-full bg-gradient-to-r from-blue-600 to-green-500"
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

              <Button variant="outline" size="lg" className="w-full" onClick={onEdit}>
                <Edit className="w-5 h-5 mr-2 inline" />
                Editar Respostas
              </Button>

              <Button variant="outline" size="lg" className="w-full" onClick={onShare}>
                <Share2 className="w-5 h-5 mr-2 inline" />
                Compartilhar
              </Button>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-5">
              <p className="text-sm text-blue-900">
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
            <MessageSquare className="w-6 h-6 text-blue-600" />
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
                      rating >= value ? 'bg-orange-100 border-orange-500 text-orange-600' : 'border-gray-200 text-gray-400'
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
                className="w-full min-h-[140px] p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
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
