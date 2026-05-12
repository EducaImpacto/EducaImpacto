import React, { useState } from 'react';
import { LandingPage } from './screens/LandingPage';
import { DiagnosticScreen } from './screens/DiagnosticScreen';
import { PersonalizedTrailScreen } from './screens/PersonalizedTrailScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { MissionScreen } from './screens/MissionScreen';
import { ModuleCompletedScreen } from './screens/ModuleCompletedScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { BusinessPlanScreen } from './screens/BusinessPlanScreen';

type Screen = 'landing' | 'diagnostic' | 'personalized-trail' | 'onboarding' | 'mission' | 'module-completed' | 'dashboard' | 'business-plan';
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

export interface MissionAnswer {
  missionId: string;
  moduleTitle: string;
  missionTitle: string;
  question: string;
  answer: string;
  planBlocks: string[];
}

export interface Mission {
  id: string;
  level: number;
  title: string;
  intro: string;
  microContent: {
    title: string;
    content: string;
  };
  question: string;
  placeholder: string;
  xpReward: number;
  badgeLabel: string;
  planBlocks: string[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  objective: string;
  completed: boolean;
  locked: boolean;
  missions: Mission[];
}

const initialModules: Module[] = [
  {
    id: 1,
    title: 'Contexto do Negócio',
    description: 'Entenda sua motivação, sua ideia e os primeiros recursos para começar.',
    objective: 'Entender quem é o empreendedor, qual é a ideia e em que contexto o negócio está começando.',
    completed: false,
    locked: false,
    missions: [
      {
        id: 'contexto-motivacao',
        level: 1,
        title: 'Motivação',
        intro: 'Todo negócio começa por um motivo. Antes de pensar em como fazer, vamos entender o que te trouxe até aqui.',
        microContent: {
          title: 'O ponto de partida',
          content: 'A motivação ajuda a definir a missão do negócio e deixa mais claro por que essa ideia merece sair do papel.',
        },
        question: 'O que te motivou a criar esse negócio?',
        placeholder: 'Exemplo: Quero criar esse negócio porque percebi uma dificuldade no meu bairro e acredito que posso ajudar...',
        xpReward: 50,
        badgeLabel: 'Primeiro Passo',
        planBlocks: ['Empreendedor e contexto'],
      },
      {
        id: 'contexto-ideia',
        level: 1,
        title: 'Sua ideia',
        intro: 'Vamos entender melhor o que você quer construir.',
        microContent: {
          title: 'Ideia clara, plano mais forte',
          content: 'Descrever a ideia em palavras simples ajuda a separar produto, público e valor entregue.',
        },
        question: 'Qual é a sua ideia de negócio? O que você pretende vender ou oferecer?',
        placeholder: 'Exemplo: Quero vender marmitas saudáveis por encomenda para pessoas que trabalham perto da minha casa...',
        xpReward: 50,
        badgeLabel: 'Ideia no Papel',
        planBlocks: ['Empreendedor e contexto', 'Produto / Serviço', 'Proposta de valor'],
      },
      {
        id: 'contexto-experiencia',
        level: 1,
        title: 'Sua experiência',
        intro: 'Você não precisa saber tudo para começar, mas toda experiência ajuda.',
        microContent: {
          title: 'Use o que você já sabe',
          content: 'Vivências anteriores, cursos, trabalhos e contatos podem reduzir riscos e acelerar os primeiros testes.',
        },
        question: 'Você já teve alguma experiência com esse tipo de negócio? Conte como foi.',
        placeholder: 'Exemplo: Já fiz bolos para familiares, atendi encomendas pequenas e aprendi a calcular ingredientes...',
        xpReward: 50,
        badgeLabel: 'Experiência Reconhecida',
        planBlocks: ['Empreendedor e contexto'],
      },
      {
        id: 'contexto-comeco',
        level: 1,
        title: 'O começo',
        intro: 'Todo negócio começa com ações simples. Pensar no primeiro passo ajuda a tirar a ideia do papel.',
        microContent: {
          title: 'Primeira ação prática',
          content: 'Um primeiro passo pequeno e concreto é melhor do que um plano perfeito que nunca começa.',
        },
        question: 'Qual é a primeira coisa que você pretende fazer para começar esse negócio?',
        placeholder: 'Exemplo: Vou conversar com 10 possíveis clientes e testar uma primeira oferta durante uma semana...',
        xpReward: 50,
        badgeLabel: 'Ação Inicial',
        planBlocks: ['Empreendedor e contexto', 'Operação básica'],
      },
      {
        id: 'contexto-recursos',
        level: 1,
        title: 'O que você já tem',
        intro: 'Você não precisa começar do zero. Pode já existir algo ao seu redor que ajude no começo.',
        microContent: {
          title: 'Recursos disponíveis',
          content: 'Conhecimentos, ferramentas, contatos, espaço e dinheiro inicial ajudam a entender a viabilidade do negócio.',
        },
        question: 'O que você já tem hoje que pode te ajudar a começar esse negócio?',
        placeholder: 'Exemplo: Tenho uma cozinha equipada, contatos de fornecedores, uma página no Instagram e R$ 500 para materiais...',
        xpReward: 50,
        badgeLabel: 'Recursos Mapeados',
        planBlocks: ['Empreendedor e contexto', 'Canais de venda e aquisição', 'Operação básica'],
      },
    ],
  },
  {
    id: 2,
    title: 'Cliente',
    description: 'Defina quem será atendido, como essa pessoa vive e onde encontrá-la.',
    objective: 'Entender quem é o cliente, como ele vive, onde está e como se comporta.',
    completed: false,
    locked: true,
    missions: [
      {
        id: 'cliente-publico',
        level: 2,
        title: 'Seu cliente',
        intro: 'Todo negócio existe para solucionar o problema de alguém. Vamos começar entendendo quem é essa pessoa.',
        microContent: {
          title: 'Cliente antes da solução',
          content: 'Quanto mais claro for o público, mais fácil será criar uma oferta que faça sentido para ele.',
        },
        question: 'Quem você quer atender com seu negócio? Descreva da forma mais clara possível.',
        placeholder: 'Exemplo: Quero atender mães que trabalham fora e precisam de refeições práticas para a família...',
        xpReward: 60,
        badgeLabel: 'Cliente Identificado',
        planBlocks: ['Cliente e mercado'],
      },
      {
        id: 'cliente-perfil',
        level: 2,
        title: 'Perfil do cliente',
        intro: 'Vamos entender melhor como é essa pessoa no dia a dia.',
        microContent: {
          title: 'Rotina e comportamento',
          content: 'Dados como idade, rotina, interesses e profissão ajudam a ajustar linguagem, preço e canais.',
        },
        question: 'Como é o seu cliente? Pense em idade, rotina, interesses, profissão e hábitos.',
        placeholder: 'Exemplo: São pessoas entre 25 e 45 anos, trabalham o dia todo, usam WhatsApp e compram por indicação...',
        xpReward: 60,
        badgeLabel: 'Perfil Mapeado',
        planBlocks: ['Cliente e mercado'],
      },
      {
        id: 'cliente-realidade',
        level: 2,
        title: 'Realidade do cliente',
        intro: 'Antes de conhecer sua solução, seu cliente já tenta lidar com essa situação de alguma forma.',
        microContent: {
          title: 'Soluções atuais',
          content: 'Entender o que o cliente faz hoje mostra concorrentes diretos, alternativas informais e oportunidades.',
        },
        question: 'O que seu cliente faz atualmente para resolver esse problema?',
        placeholder: 'Exemplo: Hoje ele compra de aplicativos, pede indicação para amigos ou improvisa uma solução em casa...',
        xpReward: 60,
        badgeLabel: 'Realidade Entendida',
        planBlocks: ['Cliente e mercado', 'Problema'],
      },
      {
        id: 'cliente-canais',
        level: 2,
        title: 'Onde encontrar seu cliente',
        intro: 'Para o negócio crescer, você precisa saber onde encontrar esse cliente.',
        microContent: {
          title: 'Canais de encontro',
          content: 'Redes sociais, grupos, comunidades, bairros e parceiros podem virar canais de venda e divulgação.',
        },
        question: 'Onde você consegue encontrar esse tipo de cliente?',
        placeholder: 'Exemplo: Consigo encontrar em grupos de WhatsApp do bairro, Instagram, feiras locais e indicações...',
        xpReward: 60,
        badgeLabel: 'Canais Encontrados',
        planBlocks: ['Cliente e mercado', 'Canais de venda e aquisição'],
      },
      {
        id: 'cliente-dinheiro',
        level: 2,
        title: 'Como seu cliente gasta dinheiro',
        intro: 'Para que um negócio funcione, o cliente precisa estar disposto e conseguir pagar pela solução.',
        microContent: {
          title: 'Disposição de pagamento',
          content: 'Observar gastos atuais ajuda a validar preço, frequência de compra e formato da oferta.',
        },
        question: 'Seu cliente costuma gastar dinheiro para resolver esse problema? Com o que ele gasta atualmente?',
        placeholder: 'Exemplo: Sim, ele já paga por entregas, produtos prontos e serviços parecidos, mas reclama do preço...',
        xpReward: 60,
        badgeLabel: 'Compra Mapeada',
        planBlocks: ['Cliente e mercado', 'Receita'],
      },
    ],
  },
  {
    id: 3,
    title: 'Problema',
    description: 'Compreenda o problema principal, sua frequência, impacto e causas.',
    objective: 'Entender qual problema o cliente enfrenta, sua relevância e por que vale a pena resolvê-lo.',
    completed: false,
    locked: true,
    missions: [
      {
        id: 'problema-principal',
        level: 3,
        title: 'Problema principal',
        intro: 'Todo negócio resolve problemas. Vamos deixar claro qual é o principal deles.',
        microContent: {
          title: 'Problema bem definido',
          content: 'Um problema claro ajuda a explicar por que o negócio existe e qual valor ele pode entregar.',
        },
        question: 'Qual é o principal problema que seu cliente enfrenta?',
        placeholder: 'Exemplo: Meu cliente não consegue encontrar comida saudável, acessível e pronta perto do trabalho...',
        xpReward: 70,
        badgeLabel: 'Problema Definido',
        planBlocks: ['Cliente e mercado', 'Problema'],
      },
      {
        id: 'problema-frequencia',
        level: 3,
        title: 'Ocorrência e frequência',
        intro: 'Entender quando e com que frequência o problema acontece ajuda a enxergar o tamanho dele.',
        microContent: {
          title: 'Tamanho do problema',
          content: 'Problemas frequentes costumam indicar mais oportunidades de venda e maior urgência para o cliente.',
        },
        question: 'Em quais situações esse problema costuma acontecer? Isso acontece com que frequência?',
        placeholder: 'Exemplo: Acontece durante a semana, principalmente no almoço, quase todos os dias de trabalho...',
        xpReward: 70,
        badgeLabel: 'Frequência Entendida',
        planBlocks: ['Cliente e mercado', 'Problema'],
      },
      {
        id: 'problema-impacto',
        level: 3,
        title: 'Impacto',
        intro: 'Resolver problemas importantes gera mais valor para o negócio.',
        microContent: {
          title: 'Consequências para o cliente',
          content: 'O impacto mostra o custo emocional, financeiro ou prático de deixar o problema sem solução.',
        },
        question: 'Como esse problema afeta a vida do seu cliente?',
        placeholder: 'Exemplo: Ele perde tempo, gasta mais do que gostaria e sente que não consegue cuidar da saúde...',
        xpReward: 70,
        badgeLabel: 'Impacto Revelado',
        planBlocks: ['Problema'],
      },
      {
        id: 'problema-causa',
        level: 3,
        title: 'Por que isso acontece',
        intro: 'Entender a causa do problema ajuda a encontrar soluções melhores.',
        microContent: {
          title: 'Causa antes da resposta',
          content: 'Quando a causa fica clara, a solução deixa de ser chute e passa a atacar o que realmente incomoda.',
        },
        question: 'Por que esse problema acontece?',
        placeholder: 'Exemplo: Porque há poucas opções perto, os preços são altos e o cliente não tem tempo para cozinhar...',
        xpReward: 70,
        badgeLabel: 'Causa Identificada',
        planBlocks: ['Cliente e mercado', 'Problema'],
      },
      {
        id: 'problema-solucoes-atuais',
        level: 3,
        title: 'O que não funciona hoje',
        intro: 'Se o problema continua existindo, é porque as soluções atuais não resolvem bem.',
        microContent: {
          title: 'Espaço para diferenciação',
          content: 'Saber o que falha nas alternativas atuais ajuda a construir uma proposta de valor mais forte.',
        },
        question: 'O que seu cliente já tentou fazer para resolver esse problema, mas não deu certo?',
        placeholder: 'Exemplo: Já tentou aplicativos, marmitas congeladas e cozinhar no fim de semana, mas nada encaixou bem...',
        xpReward: 70,
        badgeLabel: 'Oportunidade Encontrada',
        planBlocks: ['Problema', 'Proposta de valor'],
      },
    ],
  },
  {
    id: 4,
    title: 'Solução e Viabilidade',
    description: 'Defina a solução, receita, funcionamento, recursos e custos iniciais.',
    objective: 'Definir como o problema será resolvido, como o negócio vai funcionar e o que é necessário para começar.',
    completed: false,
    locked: true,
    missions: [
      {
        id: 'solucao-oferta',
        level: 4,
        title: 'Sua solução',
        intro: 'Agora que o problema está claro, vamos pensar na solução.',
        microContent: {
          title: 'Oferta principal',
          content: 'A solução deve deixar claro o que será entregue e qual problema ela resolve para o cliente.',
        },
        question: 'O que você pretende oferecer para resolver esse problema?',
        placeholder: 'Exemplo: Vou oferecer marmitas saudáveis por assinatura semanal, com entrega no horário do almoço...',
        xpReward: 80,
        badgeLabel: 'Solução Criada',
        planBlocks: ['Problema', 'Produto / Serviço'],
      },
      {
        id: 'solucao-valor',
        level: 4,
        title: 'Como sua solução ajuda o cliente',
        intro: 'Uma boa solução precisa resolver o problema de forma clara e funcionar no dia a dia do cliente.',
        microContent: {
          title: 'Proposta de valor',
          content: 'Mostre o benefício concreto: economia de tempo, redução de custo, praticidade, qualidade ou confiança.',
        },
        question: 'Como sua solução resolve o problema do cliente? Como ele usaria isso no dia a dia?',
        placeholder: 'Exemplo: O cliente escolhe o cardápio pelo WhatsApp e recebe a refeição pronta no trabalho...',
        xpReward: 80,
        badgeLabel: 'Valor Explicado',
        planBlocks: ['Produto / Serviço', 'Proposta de valor'],
      },
      {
        id: 'solucao-receita',
        level: 4,
        title: 'Como você ganha dinheiro',
        intro: 'Todo negócio precisa gerar dinheiro para funcionar.',
        microContent: {
          title: 'Modelo de receita',
          content: 'Definir como o cliente paga ajuda a estimar faturamento, preço e recorrência.',
        },
        question: 'Como você pretende ganhar dinheiro com isso? O cliente paga por produto, serviço, mensalidade ou outro formato?',
        placeholder: 'Exemplo: Vou vender planos semanais com pagamento antecipado por Pix e pedidos avulsos com preço maior...',
        xpReward: 80,
        badgeLabel: 'Receita Planejada',
        planBlocks: ['Receita'],
      },
      {
        id: 'solucao-operacao',
        level: 4,
        title: 'Funcionamento',
        intro: 'Além da ideia, é importante entender como o negócio acontece na prática.',
        microContent: {
          title: 'Rotina operacional',
          content: 'Um plano operacional simples descreve atendimento, produção, entrega e organização do trabalho.',
        },
        question: 'Como seu negócio vai funcionar no dia a dia?',
        placeholder: 'Exemplo: Recebo pedidos até domingo, compro ingredientes na segunda, preparo pela manhã e entrego ao meio-dia...',
        xpReward: 80,
        badgeLabel: 'Operação Desenhada',
        planBlocks: ['Produto / Serviço', 'Operação básica'],
      },
      {
        id: 'solucao-recursos-custos',
        level: 4,
        title: 'O que você precisa para começar',
        intro: 'Todo negócio precisa de alguns recursos para sair do papel.',
        microContent: {
          title: 'Viabilidade inicial',
          content: 'Listar recursos e custos iniciais ajuda a saber o tamanho do primeiro investimento e o que ainda falta.',
        },
        question: 'O que você precisa para começar esse negócio? Descreva o que é necessário e quais seriam os custos disso.',
        placeholder: 'Exemplo: Preciso de embalagens, ingredientes, divulgação inicial, uma balança e R$ 800 para começar...',
        xpReward: 80,
        badgeLabel: 'Viabilidade Mapeada',
        planBlocks: ['Produto / Serviço', 'Custos', 'Operação básica', 'Crescimento'],
      },
    ],
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [userXp, setUserXp] = useState(0);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);
  const [answers, setAnswers] = useState<MissionAnswer[]>([]);
  const [completedModuleData, setCompletedModuleData] = useState<{
    title: string;
    xp: number;
    badge: string;
    isLastModule: boolean;
  } | null>(null);
  const [modules, setModules] = useState<Module[]>(initialModules);

  const totalMissions = modules.reduce((total, module) => total + module.missions.length, 0);
  const completedMissions = answers.length;

  const calculateProgress = () => Math.round((completedMissions / totalMissions) * 100);

  const handleStartFromLanding = () => {
    setCurrentScreen('diagnostic');
  };

  const handleDiagnosticComplete = (data: DiagnosticData) => {
    setDiagnosticData(data);
    setUserXp(100);
    setCurrentScreen('personalized-trail');
  };

  const handleStartTrail = () => {
    setCurrentScreen('onboarding');
  };

  const handleStartFromOnboarding = () => {
    setCurrentScreen('mission');
    setCurrentModuleIndex(0);
    setCurrentMissionIndex(0);
  };

  const handleNextMission = (answer: string) => {
    const currentModule = modules[currentModuleIndex];
    const currentMission = currentModule.missions[currentMissionIndex];
    const nextAnswers = [
      ...answers.filter((item) => item.missionId !== currentMission.id),
      {
        missionId: currentMission.id,
        moduleTitle: currentModule.title,
        missionTitle: currentMission.title,
        question: currentMission.question,
        answer,
        planBlocks: currentMission.planBlocks,
      },
    ];

    setAnswers(nextAnswers);

    const newXp = userXp + currentMission.xpReward;
    setUserXp(newXp);
    setUserLevel(Math.max(1, Math.floor(newXp / 500) + 1));

    if (currentMissionIndex < currentModule.missions.length - 1) {
      setCurrentMissionIndex(currentMissionIndex + 1);
      return;
    }

    const updatedModules = [...modules];
    updatedModules[currentModuleIndex] = {
      ...updatedModules[currentModuleIndex],
      completed: true,
    };

    if (currentModuleIndex < modules.length - 1) {
      updatedModules[currentModuleIndex + 1] = {
        ...updatedModules[currentModuleIndex + 1],
        locked: false,
      };
    }

    setModules(updatedModules);
    setCompletedModuleData({
      title: currentModule.title,
      xp: currentModule.missions.reduce((total, mission) => total + mission.xpReward, 0),
      badge: currentMission.badgeLabel,
      isLastModule: currentModuleIndex === modules.length - 1,
    });
    setCurrentScreen('module-completed');
  };

  const handleImproveMission = (answer: string) => {
    const currentModule = modules[currentModuleIndex];
    alert(
      `IA de apoio - ${currentModule.title}\n\n` +
      `Sua resposta já traz uma boa base:\n"${answer}"\n\n` +
      'Sugestão: inclua quem é afetado, qual situação concreta acontece e o que torna sua resposta mais específica para o plano de negócios.'
    );
  };

  const handleNextModule = () => {
    if (completedModuleData?.isLastModule) {
      setCurrentScreen('dashboard');
      return;
    }

    setCurrentMissionIndex(0);
    setCurrentModuleIndex((index) => Math.min(index + 1, modules.length - 1));
    setCurrentScreen('dashboard');
  };

  const handleModuleClick = (moduleId: number) => {
    const moduleIndex = modules.findIndex((module) => module.id === moduleId);
    const module = modules[moduleIndex];

    if (!module || module.locked || module.completed) {
      return;
    }

    setCurrentModuleIndex(moduleIndex);
    setCurrentMissionIndex(0);
    setCurrentScreen('mission');
  };

  const handleGeneratePlan = () => {
    setCurrentScreen('business-plan');
  };

  const handleDownloadPlan = () => {
    alert('Nesta versão MVP, o PDF ainda será conectado ao backend. A prévia estruturada do plano já está disponível na tela.');
  };

  const handleEditPlan = () => {
    setCurrentScreen('dashboard');
  };

  const handleSharePlan = () => {
    alert('Compartilhamento será habilitado na próxima etapa da aplicação.');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const canGeneratePlan = modules.every((module) => module.completed);
  const nextLevelXp = userLevel * 500;
  const currentModule = modules[currentModuleIndex];
  const currentMission = currentModule?.missions[currentMissionIndex];
  const currentMissionNumber = modules
    .slice(0, currentModuleIndex)
    .reduce((total, module) => total + module.missions.length, 0) + currentMissionIndex + 1;

  return (
    <div className="min-h-screen">
      {currentScreen === 'landing' && (
        <LandingPage onStart={handleStartFromLanding} />
      )}

      {currentScreen === 'diagnostic' && (
        <DiagnosticScreen onComplete={handleDiagnosticComplete} />
      )}

      {currentScreen === 'personalized-trail' && diagnosticData && (
        <PersonalizedTrailScreen
          diagnosticSummary={diagnosticData}
          onStartTrail={handleStartTrail}
        />
      )}

      {currentScreen === 'onboarding' && diagnosticData && (
        <OnboardingScreen
          profileType={diagnosticData.profileType}
          onStart={handleStartFromOnboarding}
        />
      )}

      {currentScreen === 'mission' && currentMission && (
        <MissionScreen
          mission={currentMission}
          moduleTitle={currentModule.title}
          moduleObjective={currentModule.objective}
          progress={Math.round((currentMissionNumber / totalMissions) * 100)}
          missionNumber={currentMissionNumber}
          totalMissions={totalMissions}
          onNext={handleNextMission}
          onImprove={handleImproveMission}
        />
      )}

      {currentScreen === 'module-completed' && completedModuleData && (
        <ModuleCompletedScreen
          moduleTitle={completedModuleData.title}
          xpGained={completedModuleData.xp}
          badgeLabel={completedModuleData.badge}
          isLastModule={completedModuleData.isLastModule}
          onNext={handleNextModule}
        />
      )}

      {currentScreen === 'dashboard' && (
        <DashboardScreen
          level={userLevel}
          xp={userXp}
          nextLevelXp={nextLevelXp}
          overallProgress={calculateProgress()}
          modules={modules}
          totalMissions={totalMissions}
          completedMissions={completedMissions}
          canGeneratePlan={canGeneratePlan}
          onModuleClick={handleModuleClick}
          onGeneratePlan={handleGeneratePlan}
        />
      )}

      {currentScreen === 'business-plan' && diagnosticData && (
        <BusinessPlanScreen
          diagnosticData={diagnosticData}
          answers={answers}
          onDownload={handleDownloadPlan}
          onEdit={handleEditPlan}
          onShare={handleSharePlan}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </div>
  );
}
