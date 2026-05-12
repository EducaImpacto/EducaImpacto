import React, { useState } from 'react';
import { Sparkles, ChevronRight, ChevronLeft, CheckCircle2, Trophy, Zap } from 'lucide-react';
import { motion } from 'motion/react';

// ─── Tipos ───────────────────────────────────────────────────────────────────
export type TrailLevel = 'iniciante' | 'intermediario' | 'avancado';

export interface DiagnosticData {
  objetivo: string;
  experiencia: string;
  capacidadePlano: string;
  usoFerramentas: string;
  experienciaPlano: string;
  nivel: TrailLevel;
}

interface DiagnosticScreenProps {
  onComplete: (data: DiagnosticData) => void;
}

// ─── Dados das perguntas (fiel ao documento) ─────────────────────────────────
const BLOCO_PERFIL = [
  {
    id: 'objetivo',
    bloco: 'Sobre você',
    pergunta: 'Qual é o seu principal objetivo?',
    opcoes: [
      { value: 'primeiro-negocio', label: 'Criar meu primeiro negócio', icon: '🚀' },
      { value: 'aprender', label: 'Aprender mais sobre empreendedorismo', icon: '📚' },
      { value: 'validar', label: 'Validar uma ideia', icon: '💡' },
      { value: 'projetos-clientes', label: 'Desenvolver projetos para mim ou para clientes', icon: '🎯' },
    ],
  },
  {
    id: 'experiencia',
    bloco: 'Sobre você',
    pergunta: 'Você já teve alguma experiência com empreendedorismo?',
    opcoes: [
      { value: 'zero', label: 'Estou começando do zero', icon: '🌱' },
      { value: 'algum-conhecimento', label: 'Tenho algum conhecimento sobre negócios', icon: '📖' },
      { value: 'ja-tive', label: 'Já tive um negócio / Já trabalhei com negócios', icon: '🏪' },
      { value: 'trabalho-hoje', label: 'Trabalho com isso hoje', icon: '🏢' },
    ],
  },
];

const BLOCO_MATURIDADE = [
  {
    id: 'capacidadePlano',
    bloco: 'Sobre conhecimento',
    pergunta: 'Se tivesse que montar um plano de negócios hoje:',
    opcoes: [
      { value: 'nao-saberia', label: 'Não saberia como começar', icon: '😅' },
      { value: 'precisaria-ajuda', label: 'Precisaria de ajuda', icon: '🤝' },
      { value: 'com-dificuldade', label: 'Conseguiria, com alguma dificuldade', icon: '💪' },
      { value: 'com-seguranca', label: 'Faria com segurança', icon: '✅' },
    ],
  },
  {
    id: 'usoFerramentas',
    bloco: 'Sobre conhecimento',
    pergunta: 'Você já utilizou alguma ferramenta ou metodologia para planejar negócios?',
    opcoes: [
      { value: 'nunca', label: 'Nunca', icon: '🙅' },
      { value: 'superficialmente', label: 'Superficialmente', icon: '👀' },
      { value: 'algumas-vezes', label: 'Algumas vezes', icon: '🔄' },
      { value: 'frequentemente', label: 'Frequentemente', icon: '⚡' },
    ],
  },
  {
    id: 'experienciaPlano',
    bloco: 'Sobre conhecimento',
    pergunta: 'Qual sua experiência com plano de negócios?',
    opcoes: [
      { value: 'nunca-contato', label: 'Nunca tive contato', icon: '🔰' },
      { value: 'estudei-pouco', label: 'Estudei um pouco sobre o assunto', icon: '📝' },
      { value: 'participei', label: 'Já participei da construção', icon: '🔨' },
      { value: 'desenvolvo', label: 'Desenvolvo com frequência', icon: '🏆' },
    ],
  },
];

const TODAS_PERGUNTAS = [...BLOCO_PERFIL, ...BLOCO_MATURIDADE];

// ─── Lógica de classificação ─────────────────────────────────────────────────
function classificarNivel(respostas: Record<string, string>): TrailLevel {
  // Pontuação: cada resposta vale 0, 1, 2 ou 3 pontos (índice da opção)
  const scores: Record<string, number> = {
    objetivo: ['primeiro-negocio', 'aprender', 'validar', 'projetos-clientes'].indexOf(respostas.objetivo),
    experiencia: ['zero', 'algum-conhecimento', 'ja-tive', 'trabalho-hoje'].indexOf(respostas.experiencia),
    capacidadePlano: ['nao-saberia', 'precisaria-ajuda', 'com-dificuldade', 'com-seguranca'].indexOf(respostas.capacidadePlano),
    usoFerramentas: ['nunca', 'superficialmente', 'algumas-vezes', 'frequentemente'].indexOf(respostas.usoFerramentas),
    experienciaPlano: ['nunca-contato', 'estudei-pouco', 'participei', 'desenvolvo'].indexOf(respostas.experienciaPlano),
  };

  // Maturidade pesa mais (blocos 3, 4 e 5)
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxTotal = 15; // 5 perguntas × 3 pontos max

  if (total <= 4) return 'iniciante';
  if (total <= 9) return 'intermediario';
  return 'avancado';
}

// ─── Resultado por nível ─────────────────────────────────────────────────────
const RESULTADO_NIVEL = {
  iniciante: {
    emoji: '🚀',
    titulo: 'Você está começando sua jornada empreendedora!',
    desc: 'Vamos te guiar passo a passo para construir seu negócio.',
    cor: 'from-blue-500 to-blue-600',
    badge: 'Trilha Iniciante',
    xp: 50,
  },
  intermediario: {
    emoji: '⚡',
    titulo: 'Você já tem alguma base sobre negócios!',
    desc: 'Vamos aprofundar o que você já sabe e estruturar seu plano.',
    cor: 'from-orange-500 to-orange-600',
    badge: 'Trilha Intermediária',
    xp: 75,
  },
  avancado: {
    emoji: '🏆',
    titulo: 'Você já tem experiência com negócios!',
    desc: 'Vamos direto ao desenvolvimento do plano de negócios.',
    cor: 'from-green-500 to-green-600',
    badge: 'Trilha Avançada',
    xp: 100,
  },
};

// ─── Componente principal ─────────────────────────────────────────────────────
export function DiagnosticScreen({ onComplete }: DiagnosticScreenProps) {
  const [step, setStep] = useState(0); // 0..4 = perguntas, 5 = resultado
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [nivel, setNivel] = useState<TrailLevel | null>(null);

  const totalPerguntas = TODAS_PERGUNTAS.length; // 5
  const perguntaAtual = TODAS_PERGUNTAS[step];
  const blocoAtual = step < 2 ? 'Bloco 1 — Perfil' : 'Bloco 2 — Maturidade';
  const progresso = Math.round((step / totalPerguntas) * 100);
  const respostaAtual = respostas[perguntaAtual?.id] ?? '';

  const handleSelecionar = (value: string) => {
    setRespostas((prev) => ({ ...prev, [perguntaAtual.id]: value }));
  };

  const handleProximo = () => {
    if (step < totalPerguntas - 1) {
      setStep(step + 1);
    } else {
      // Última pergunta — classificar
      const nivelCalculado = classificarNivel(respostas);
      setNivel(nivelCalculado);
      setStep(totalPerguntas); // tela de resultado
    }
  };

  const handleVoltar = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleContinuar = () => {
    if (!nivel) return;
    onComplete({
      objetivo: respostas.objetivo,
      experiencia: respostas.experiencia,
      capacidadePlano: respostas.capacidadePlano,
      usoFerramentas: respostas.usoFerramentas,
      experienciaPlano: respostas.experienciaPlano,
      nivel,
    });
  };

  // ── Tela de resultado ──────────────────────────────────────────────────────
  if (step === totalPerguntas && nivel) {
    const resultado = RESULTADO_NIVEL[nivel];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header colorido */}
            <div className={`bg-gradient-to-r ${resultado.cor} px-8 py-10 text-center text-white`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-6xl mb-4"
              >
                {resultado.emoji}
              </motion.div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <CheckCircle2 className="w-4 h-4" />
                Perfil do Empreendedor identificado
              </div>
              <h2 className="text-2xl font-bold leading-tight">{resultado.titulo}</h2>
              <p className="text-white/80 mt-2 text-sm">{resultado.desc}</p>
            </div>

            {/* Recompensas */}
            <div className="p-8">
              <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-5">
                Recompensas desbloqueadas
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Insígnia desbloqueada</div>
                    <div className="text-xs text-orange-700">Jornada Iniciada</div>
                  </div>
                  <div className="ml-auto text-orange-500">✓</div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">+{resultado.xp} XP ganhos</div>
                    <div className="text-xs text-blue-700">Por completar o diagnóstico</div>
                  </div>
                  <div className="ml-auto text-blue-500">✓</div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Trilha desbloqueada</div>
                    <div className="text-xs text-green-700">{resultado.badge}</div>
                  </div>
                  <div className="ml-auto text-green-500">✓</div>
                </div>
              </div>

              <button
                onClick={handleContinuar}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
              >
                Ver minha trilha
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Telas de perguntas ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">

        {/* Header */}
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full mb-4 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Primeiros passos
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Começando sua jornada</h1>
          <p className="text-gray-500 text-sm">
            {step < 2 ? 'Bloco 1 de 2 — Sobre você' : 'Bloco 2 de 2 — Sobre conhecimento'}
          </p>
        </motion.div>

        {/* Barra de progresso */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Pergunta {step + 1} de {totalPerguntas}</span>
            <span className="font-semibold text-blue-600">{progresso}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progresso}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {/* Indicadores de bloco */}
          <div className="flex justify-between mt-2">
            <span className={`text-xs font-medium ${step < 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              Perfil
            </span>
            <span className={`text-xs font-medium ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              Maturidade
            </span>
          </div>
        </div>

        {/* Card da pergunta */}
        <motion.div
          key={step}
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -24, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-6"
        >
          {/* Label do bloco */}
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {blocoAtual}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {perguntaAtual.pergunta}
          </h2>

          <div className="space-y-3">
            {perguntaAtual.opcoes.map((opcao) => (
              <button
                key={opcao.value}
                onClick={() => handleSelecionar(opcao.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 flex items-center gap-3 ${
                  respostaAtual === opcao.value
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl flex-shrink-0">{opcao.icon}</span>
                <span className={`font-medium ${respostaAtual === opcao.value ? 'text-blue-900' : 'text-gray-800'}`}>
                  {opcao.label}
                </span>
                {respostaAtual === opcao.value && (
                  <CheckCircle2 className="w-5 h-5 text-blue-600 ml-auto flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Botões de navegação */}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={handleVoltar}
              className="flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold px-6 py-3.5 rounded-2xl transition-all duration-150 hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>
          )}
          <button
            onClick={handleProximo}
            disabled={!respostaAtual}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-all duration-150 shadow hover:shadow-md text-base"
          >
            {step === totalPerguntas - 1 ? 'Ver meu resultado' : 'Próxima'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          🔒 Suas respostas são usadas apenas para personalizar sua jornada
        </p>
      </div>
    </div>
  );
}