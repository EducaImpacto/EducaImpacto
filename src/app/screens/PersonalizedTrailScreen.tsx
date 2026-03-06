import React from 'react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Sparkles, Brain, TrendingUp, CheckCircle2, Lock, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface PersonalizedTrailScreenProps {
  userName?: string;
  diagnosticSummary: {
    objetivo: string;
    experiencia: string;
    tempoSemanal: number;
    interesse: string;
  };
  onStartTrail: () => void;
}

export function PersonalizedTrailScreen({ 
  userName = 'Empreendedor(a)',
  diagnosticSummary,
  onStartTrail 
}: PersonalizedTrailScreenProps) {
  
  const getObjetivoLabel = (objetivo: string) => {
    const labels: { [key: string]: string } = {
      empreender: 'Criar seu próprio negócio',
      aprender: 'Aprender empreendedorismo',
      melhorar: 'Melhorar ideia existente',
      validar: 'Validar ideia de negócio',
    };
    return labels[objetivo] || objetivo;
  };

  const getExperienciaLabel = (experiencia: string) => {
    const labels: { [key: string]: string } = {
      nenhuma: 'Iniciante',
      basica: 'Básico',
      intermediaria: 'Intermediário',
      avancada: 'Avançado',
    };
    return labels[experiencia] || experiencia;
  };

  const getInteresseLabel = (interesse: string) => {
    const labels: { [key: string]: string } = {
      comercio: 'Comércio',
      servicos: 'Serviços',
      digital: 'Digital',
      alimentacao: 'Alimentação',
      criativo: 'Criativo',
      social: 'Impacto Social',
    };
    return labels[interesse] || interesse;
  };

  const trilhaModules = [
    {
      id: 1,
      title: 'Perfil do Empreendedor',
      description: 'Descubra suas motivações e defina sua visão empreendedora. Entenda seus pontos fortes e como usá-los no seu negócio.',
      duration: '30 min',
      xp: 100,
      recommended: true,
      locked: false,
      icon: '👤',
    },
    {
      id: 2,
      title: 'Mentalidade Empreendedora',
      description: 'Aprenda os fundamentos de uma mentalidade voltada à inovação, superação de desafios e visão de oportunidades.',
      duration: '45 min',
      xp: 150,
      recommended: true,
      locked: false,
      icon: '🧠',
    },
    {
      id: 3,
      title: 'Validação de Ideias',
      description: 'Descubra como validar suas ideias com testes práticos, pesquisas e feedbacks reais do mercado.',
      duration: '40 min',
      xp: 150,
      recommended: diagnosticSummary.interesse === 'digital',
      locked: false,
      icon: '💡',
    },
    {
      id: 4,
      title: 'Análise de Mercado',
      description: 'Identifique oportunidades e entenda profundamente seu público-alvo e concorrência.',
      duration: '50 min',
      xp: 150,
      recommended: true,
      locked: false,
      icon: '📊',
    },
    {
      id: 5,
      title: 'Proposta de Valor',
      description: 'Defina o que torna seu negócio único e valioso para seus clientes.',
      duration: '35 min',
      xp: 150,
      recommended: true,
      locked: false,
      icon: '⭐',
    },
    {
      id: 6,
      title: 'Estratégia de Marketing',
      description: 'Planeje como atrair, conquistar e fidelizar seus clientes de forma eficiente.',
      duration: '45 min',
      xp: 200,
      recommended: true,
      locked: false,
      icon: '📢',
    },
    {
      id: 7,
      title: 'Planejamento Financeiro',
      description: 'Estruture as finanças e projeções do seu negócio para garantir sustentabilidade.',
      duration: '50 min',
      xp: 200,
      recommended: true,
      locked: false,
      icon: '💰',
    },
  ];

  const totalDuration = trilhaModules.reduce((acc, mod) => {
    const mins = parseInt(mod.duration);
    return acc + mins;
  }, 0);

  const totalXP = trilhaModules.reduce((acc, mod) => acc + mod.xp, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Gerado por Inteligência Artificial</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sua Trilha Foi Personalizada! 🎉
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Com base nas suas respostas, nossa IA criou uma trilha de aprendizagem sob medida para você alcançar seus objetivos.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge type="star" label={getObjetivoLabel(diagnosticSummary.objetivo)} color="orange" />
              <Badge type="zap" label={`Nível: ${getExperienciaLabel(diagnosticSummary.experiencia)}`} color="green" />
              <Badge type="award" label={getInteresseLabel(diagnosticSummary.interesse)} color="purple" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{trilhaModules.length}</div>
                <div className="text-blue-100">Módulos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">~{Math.round(totalDuration / 60)}h</div>
                <div className="text-blue-100">Duração Total</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{totalXP} XP</div>
                <div className="text-blue-100">Para Ganhar</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trilha Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Seus Módulos de Aprendizagem</h2>
          </div>
          <p className="text-lg text-gray-600">
            Siga esta sequência para maximizar seu aprendizado. Cada módulo foi escolhido especialmente para você.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {trilhaModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`
                bg-white rounded-2xl shadow-lg overflow-hidden
                ${module.recommended ? 'ring-2 ring-purple-500' : ''}
                ${module.locked ? 'opacity-60' : 'hover:shadow-xl transition-shadow'}
              `}
            >
              {module.recommended && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold py-2 px-4 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Recomendado pela IA
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{module.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-purple-600 mb-1">
                        Módulo {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                    </div>
                  </div>
                  {module.locked ? (
                    <Lock className="w-6 h-6 text-gray-400" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-green-500 opacity-0" />
                  )}
                </div>

                <p className="text-gray-600 mb-6">{module.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-600 font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>+{module.xp} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Trilha Adaptativa</h3>
                <p className="text-sm text-blue-800">
                  Sua trilha é atualizada automaticamente conforme seu desempenho. A IA vai sugerir conteúdos complementares baseados no seu progresso.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-900 mb-2">Seu Ritmo</h3>
                <p className="text-sm text-green-800">
                  Você indicou {diagnosticSummary.tempoSemanal}h por semana. Com esse ritmo, você completará a trilha em aproximadamente {Math.ceil(totalDuration / 60 / diagnosticSummary.tempoSemanal)} semanas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar sua jornada? 🚀
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Cada módulo concluído te aproxima do seu objetivo de {getObjetivoLabel(diagnosticSummary.objetivo).toLowerCase()}. Vamos juntos!
          </p>
          <Button variant="secondary" size="lg" onClick={onStartTrail} className="bg-white text-orange-600 hover:bg-orange-50">
            Iniciar Trilha Agora
            <Sparkles className="w-5 h-5 ml-2 inline" />
          </Button>
        </motion.div>
      </section>

    </div>
  );
}
