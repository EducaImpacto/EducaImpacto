import React from 'react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { CheckCircle2, Clock, FileText, Lock, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

type ProfileType = 'iniciante' | 'intermediario' | 'avancado';

interface PersonalizedTrailScreenProps {
  userName?: string;
  diagnosticSummary: {
    objetivo: string;
    experiencia: string;
    planoHoje: string;
    ferramenta: string;
    planoNegocios: string;
    score: number;
    profileType: ProfileType;
  };
  onStartTrail: () => void;
}

const profileLabels: Record<ProfileType, string> = {
  iniciante: 'Trilha Iniciante',
  intermediario: 'Trilha Intermediária',
  avancado: 'Trilha Avançada',
};

const profileMessages: Record<ProfileType, string> = {
  iniciante: 'Você está começando sua jornada empreendedora. Vamos te guiar passo a passo para construir seu negócio.',
  intermediario: 'Você já tem alguma base. Para o MVP, vamos liberar a demonstração da trilha iniciante como fluxo principal.',
  avancado: 'Você já tem experiência com negócios. Para o MVP, vamos mostrar a estrutura da trilha iniciante e a geração do plano.',
};

const beginnerModules = [
  {
    title: 'Contexto do Negócio',
    description: 'Motivação, ideia, experiência, primeiros passos e recursos disponíveis.',
    duration: '10 min',
    xp: 250,
  },
  {
    title: 'Cliente',
    description: 'Público, perfil, realidade atual, canais e disposição de pagamento.',
    duration: '10 min',
    xp: 300,
  },
  {
    title: 'Problema',
    description: 'Problema principal, frequência, impacto, causas e falhas das soluções atuais.',
    duration: '10 min',
    xp: 350,
  },
  {
    title: 'Solução e Viabilidade',
    description: 'Oferta, proposta de valor, receita, operação e custos para começar.',
    duration: '10 min',
    xp: 400,
  },
];

export function PersonalizedTrailScreen({
  userName = 'Empreendedor(a)',
  diagnosticSummary,
  onStartTrail,
}: PersonalizedTrailScreenProps) {
  const profileType = diagnosticSummary.profileType;
  const totalXP = beginnerModules.reduce((total, module) => total + module.xp, 0) + 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5faf7] via-[#f5faf7] to-[#f5faf7]">
      <section className="bg-gradient-to-r from-[#052254] via-[#06173C] to-[#0A5740] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Perfil do Empreendedor identificado</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {userName}, sua jornada começa aqui
            </h1>

            <p className="text-xl text-[#e5f0ea] mb-8 max-w-3xl mx-auto">
              {profileMessages[profileType]}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge type="star" label={profileLabels[profileType]} color="orange" />
              <Badge type="zap" label="Insígnia: Jornada Iniciada" color="green" />
              <Badge type="award" label="+100 XP no diagnóstico" color="purple" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">4</div>
                <div className="text-[#e5f0ea]">Etapas interativas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">20</div>
                <div className="text-[#e5f0ea]">Missões práticas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{totalXP}</div>
                <div className="text-[#e5f0ea]">XP disponível</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-[#052254]" />
            <h2 className="text-3xl font-bold text-gray-900">Trilha Iniciante do MVP</h2>
          </div>
          <p className="text-lg text-gray-600">
            A trilha segue a construção progressiva do negócio: aprender, aplicar em missões e avançar com recompensas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {beginnerModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden ring-1 ring-[#B2C9BF]"
            >
              <div className="bg-gradient-to-r from-[#052254] to-[#0A5740] text-white text-sm font-semibold py-2 px-4 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Etapa {index + 1} de 4
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-gray-600">{module.description}</p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-[#329314] opacity-40 flex-shrink-0 ml-4" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#329314] font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{module.xp} XP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#f5faf7] border-l-4 border-[#052254] rounded-lg p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-[#052254] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#06173C] mb-2">Recompensa final</h3>
                <p className="text-sm text-[#06173C]">
                  Ao concluir as missões, suas respostas serão organizadas em uma prévia de plano de negócios profissional e estruturado.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f5faf7] border-l-4 border-[#329314] rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-[#329314] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#0A5740] mb-2">Próximas trilhas</h3>
                <p className="text-sm text-[#0A5740]">
                  Trilhas intermediária e avançada ficam registradas no diagnóstico, mas entram em uma próxima versão do produto.
                </p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-[#329314] to-[#329314] rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Pronto para dar o primeiro passo no seu negócio?
          </h2>
          <p className="text-xl text-[#f5faf7] mb-8 max-w-2xl mx-auto">
            Você vai aprender conceitos essenciais e aplicar cada resposta diretamente na construção do seu plano.
          </p>
          <Button variant="secondary" size="lg" onClick={onStartTrail} className="bg-white text-[#329314] hover:bg-[#f5faf7]">
            Começar minha jornada
            <Sparkles className="w-5 h-5 ml-2 inline" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
