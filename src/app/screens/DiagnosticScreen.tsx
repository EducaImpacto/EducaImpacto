import React, { useState } from 'react';
import { Button } from '../components/Button';
import { BriefcaseBusiness, ChevronRight, ClipboardList, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

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

interface DiagnosticScreenProps {
  onComplete: (data: DiagnosticData) => void;
}

interface Option {
  value: string;
  label: string;
  score: number;
}

const questions: Array<{
  key: keyof Omit<DiagnosticData, 'score' | 'profileType'>;
  block: string;
  title: string;
  helper: string;
  options: Option[];
}> = [
  {
    key: 'objetivo',
    block: 'Perfil',
    title: 'Qual é o seu principal objetivo?',
    helper: 'Vamos entender o que você quer alcançar com a jornada.',
    options: [
      { value: 'criar-primeiro-negocio', label: 'Criar meu primeiro negócio', score: 0 },
      { value: 'aprender-empreendedorismo', label: 'Aprender mais sobre empreendedorismo', score: 1 },
      { value: 'validar-ideia', label: 'Validar uma ideia', score: 1 },
      { value: 'desenvolver-projetos', label: 'Desenvolver projetos para mim ou para clientes', score: 2 },
    ],
  },
  {
    key: 'experiencia',
    block: 'Perfil',
    title: 'Você já teve alguma experiência com empreendedorismo?',
    helper: 'Não existe resposta certa. A trilha começa do seu ponto atual.',
    options: [
      { value: 'zero', label: 'Estou começando do zero', score: 0 },
      { value: 'algum-conhecimento', label: 'Tenho algum conhecimento sobre negócios', score: 1 },
      { value: 'ja-trabalhei', label: 'Já tive um negócio / Já trabalhei com negócios', score: 2 },
      { value: 'trabalho-hoje', label: 'Trabalho com isso hoje', score: 3 },
    ],
  },
  {
    key: 'planoHoje',
    block: 'Maturidade',
    title: 'Se tivesse que montar um plano de negócios hoje:',
    helper: 'Essa resposta ajuda a definir o nível de autonomia na construção do plano.',
    options: [
      { value: 'nao-saberia', label: 'Não saberia como começar', score: 0 },
      { value: 'precisaria-ajuda', label: 'Precisaria de ajuda', score: 1 },
      { value: 'com-dificuldade', label: 'Conseguiria, com alguma dificuldade', score: 2 },
      { value: 'com-seguranca', label: 'Faria com segurança', score: 3 },
    ],
  },
  {
    key: 'ferramenta',
    block: 'Maturidade',
    title: 'Você já utilizou alguma ferramenta ou metodologia para planejar negócios?',
    helper: 'Pode ser Canvas, SWOT, plano financeiro, pesquisa de mercado ou outra ferramenta.',
    options: [
      { value: 'nunca', label: 'Nunca', score: 0 },
      { value: 'superficialmente', label: 'Superficialmente', score: 1 },
      { value: 'algumas-vezes', label: 'Algumas vezes', score: 2 },
      { value: 'frequentemente', label: 'Frequentemente', score: 3 },
    ],
  },
  {
    key: 'planoNegocios',
    block: 'Maturidade',
    title: 'Qual sua experiência com plano de negócios?',
    helper: 'Queremos saber se esse tema já faz parte da sua rotina.',
    options: [
      { value: 'nunca-contato', label: 'Nunca tive contato', score: 0 },
      { value: 'estudei-pouco', label: 'Estudei um pouco sobre o assunto', score: 1 },
      { value: 'participei-construcao', label: 'Já participei da construção', score: 2 },
      { value: 'desenvolvo-frequencia', label: 'Desenvolvo com frequência', score: 3 },
    ],
  },
];

const getProfileType = (score: number): ProfileType => {
  if (score <= 5) return 'iniciante';
  if (score <= 10) return 'intermediario';
  return 'avancado';
};

export function DiagnosticScreen({ onComplete }: DiagnosticScreenProps) {
  const [step, setStep] = useState(1);
  const [diagnosticData, setDiagnosticData] = useState<Omit<DiagnosticData, 'score' | 'profileType'>>({
    objetivo: '',
    experiencia: '',
    planoHoje: '',
    ferramenta: '',
    planoNegocios: '',
  });

  const currentQuestion = questions[step - 1];
  const totalSteps = questions.length;
  const progressPercentage = (step / totalSteps) * 100;

  const selectedValue = diagnosticData[currentQuestion.key];
  const canProceed = selectedValue !== '';

  const handleSelect = (value: string) => {
    setDiagnosticData({
      ...diagnosticData,
      [currentQuestion.key]: value,
    });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    const score = questions.reduce((total, question) => {
      const value = diagnosticData[question.key];
      const option = question.options.find((item) => item.value === value);
      return total + (option?.score ?? 0);
    }, 0);

    onComplete({
      ...diagnosticData,
      score,
      profileType: getProfileType(score),
    });
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Começando sua jornada</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Primeiro, vamos identificar seu perfil empreendedor
          </h1>
          <p className="text-lg text-gray-600">
            São 5 perguntas rápidas para definir seu ponto de partida.
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pergunta {step} de {totalSteps}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
            {currentQuestion.block === 'Perfil' ? (
              <BriefcaseBusiness className="w-8 h-8 text-white" />
            ) : (
              <ClipboardList className="w-8 h-8 text-white" />
            )}
          </div>

          <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            {currentQuestion.block}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {currentQuestion.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {currentQuestion.helper}
          </p>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedValue === option.value
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium text-gray-900">{option.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="flex gap-4">
          {step > 1 && (
            <Button variant="outline" size="lg" onClick={handlePrevious} className="flex-1">
              Voltar
            </Button>
          )}
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="flex-1"
          >
            {step === totalSteps ? 'Identificar Perfil' : 'Próxima'}
            <ChevronRight className="w-5 h-5 ml-2 inline" />
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Suas respostas serão usadas apenas para orientar a experiência da trilha.
        </p>
      </div>
    </div>
  );
}
