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

interface DiagnosticData {
  objetivo: string;
  experiencia: string;
  tempoSemanal: number;
  interesse: string;
  desafio: string;
}

interface Mission {
  id: number;
  level: number;
  title: string;
  microContent: {
    title: string;
    content: string;
  };
  question: string;
  placeholder: string;
  xpReward: number;
  badgeLabel: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
  missions: Mission[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [userXp, setUserXp] = useState(0);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);
  const [completedModuleData, setCompletedModuleData] = useState<{
    title: string;
    xp: number;
    badge: string;
  } | null>(null);

  // Dados dos módulos
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: 'Perfil do Empreendedor',
      description: 'Descubra suas motivações e defina sua visão empreendedora',
      completed: false,
      locked: false,
      missions: [
        {
          id: 1,
          level: 1,
          title: 'Perfil do Empreendedor',
          microContent: {
            title: 'Conheça a si mesmo',
            content: 'Todo negócio de sucesso começa com autoconhecimento. Entender suas motivações, habilidades e valores é fundamental para construir um empreendimento alinhado com quem você é.',
          },
          question: 'O que te motiva a empreender? Quais são suas principais habilidades?',
          placeholder: 'Exemplo: Sempre tive paixão por resolver problemas e ajudar pessoas. Minhas principais habilidades são comunicação e organização...',
          xpReward: 100,
          badgeLabel: 'Autoconhecimento',
        },
      ],
    },
    {
      id: 2,
      title: 'Análise de Mercado',
      description: 'Identifique oportunidades e entenda seu público-alvo',
      completed: false,
      locked: true,
      missions: [
        {
          id: 2,
          level: 2,
          title: 'Análise de Mercado',
          microContent: {
            title: 'Entenda seu mercado',
            content: 'Conhecer profundamente seu público-alvo e o mercado em que você vai atuar é essencial. Isso permite criar soluções que realmente atendem às necessidades dos seus clientes.',
          },
          question: 'Quem é seu público-alvo? Qual problema você vai resolver para eles?',
          placeholder: 'Exemplo: Meu público são mães empreendedoras que precisam de flexibilidade. Vou oferecer soluções que economizam tempo...',
          xpReward: 150,
          badgeLabel: 'Explorador de Mercado',
        },
      ],
    },
    {
      id: 3,
      title: 'Proposta de Valor',
      description: 'Defina o que torna seu negócio único e valioso',
      completed: false,
      locked: true,
      missions: [
        {
          id: 3,
          level: 3,
          title: 'Proposta de Valor',
          microContent: {
            title: 'O que te torna único?',
            content: 'Sua proposta de valor é o que diferencia seu negócio da concorrência. É a promessa de valor que você entrega aos seus clientes.',
          },
          question: 'O que torna seu produto/serviço único? Por que os clientes deveriam escolher você?',
          placeholder: 'Exemplo: Ofereço atendimento personalizado com preços acessíveis, algo que meus concorrentes não fazem...',
          xpReward: 150,
          badgeLabel: 'Diferenciação',
        },
      ],
    },
    {
      id: 4,
      title: 'Estratégia de Marketing',
      description: 'Planeje como atrair e conquistar seus clientes',
      completed: false,
      locked: true,
      missions: [
        {
          id: 4,
          level: 4,
          title: 'Estratégia de Marketing',
          microContent: {
            title: 'Alcance seus clientes',
            content: 'De nada adianta ter um ótimo produto se seus clientes não sabem que ele existe. Uma estratégia de marketing eficaz é crucial para o crescimento do seu negócio.',
          },
          question: 'Como você vai atrair e conquistar seus clientes? Quais canais de marketing vai usar?',
          placeholder: 'Exemplo: Vou usar redes sociais (Instagram e TikTok) para criar conteúdo educativo e parcerias com influenciadores locais...',
          xpReward: 200,
          badgeLabel: 'Estrategista',
        },
      ],
    },
    {
      id: 5,
      title: 'Planejamento Financeiro',
      description: 'Estruture as finanças e projeções do seu negócio',
      completed: false,
      locked: true,
      missions: [
        {
          id: 5,
          level: 5,
          title: 'Planejamento Financeiro',
          microContent: {
            title: 'A saúde do seu negócio',
            content: 'Um bom planejamento financeiro garante que seu negócio seja sustentável. Conhecer seus custos, preços e projeções é fundamental para tomar decisões estratégicas.',
          },
          question: 'Quais são seus principais custos? Como você vai precificar seus produtos/serviços?',
          placeholder: 'Exemplo: Custos fixos: aluguel R$800, materiais R$500. Vou precificar com margem de 40% sobre os custos...',
          xpReward: 200,
          badgeLabel: 'Planejador Financeiro',
        },
      ],
    },
  ]);

  const calculateProgress = () => {
    const completed = modules.filter(m => m.completed).length;
    return Math.round((completed / modules.length) * 100);
  };

  const handleStartFromLanding = () => {
    setCurrentScreen('diagnostic');
  };

  const handleDiagnosticComplete = (data: DiagnosticData) => {
    setDiagnosticData(data);
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
    // Salvar resposta (em uma aplicação real, seria salvo no estado ou backend)
    console.log('Resposta salva:', answer);

    const currentModule = modules[currentModuleIndex];
    const currentMission = currentModule.missions[currentMissionIndex];

    // Adicionar XP
    const newXp = userXp + currentMission.xpReward;
    setUserXp(newXp);

    // Verificar se subiu de nível (a cada 500 XP)
    if (newXp >= userLevel * 500) {
      setUserLevel(userLevel + 1);
    }

    // Verificar se é a última missão do módulo
    if (currentMissionIndex === currentModule.missions.length - 1) {
      // Mostrar tela de módulo completo
      setCompletedModuleData({
        title: currentModule.title,
        xp: currentMission.xpReward,
        badge: currentMission.badgeLabel,
      });

      // Marcar módulo como completo
      const updatedModules = [...modules];
      updatedModules[currentModuleIndex].completed = true;

      // Desbloquear próximo módulo
      if (currentModuleIndex < modules.length - 1) {
        updatedModules[currentModuleIndex + 1].locked = false;
      }

      setModules(updatedModules);
      setCurrentScreen('module-completed');
    } else {
      // Próxima missão do mesmo módulo
      setCurrentMissionIndex(currentMissionIndex + 1);
    }
  };

  const handleImproveMission = (answer: string) => {
    // Simular melhoria com IA
    alert(`IA está analisando sua resposta:\n\n"${answer}"\n\nSugestões de melhoria aparecerão aqui em uma implementação completa!`);
  };

  const handleNextModule = () => {
    setCurrentScreen('dashboard');
    setCurrentMissionIndex(0);
  };

  const handleModuleClick = (moduleId: number) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    const module = modules[moduleIndex];

    if (!module.locked && !module.completed) {
      setCurrentModuleIndex(moduleIndex);
      setCurrentMissionIndex(0);
      setCurrentScreen('mission');
    }
  };

  const handleGeneratePlan = () => {
    setCurrentScreen('business-plan');
  };

  const handleDownloadPlan = () => {
    alert('Em uma implementação completa, o PDF seria gerado e baixado aqui!');
  };

  const handleEditPlan = () => {
    setCurrentScreen('dashboard');
  };

  const handleSharePlan = () => {
    alert('Opções de compartilhamento apareceriam aqui!');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const canGeneratePlan = modules.every(m => m.completed);
  const nextLevelXp = userLevel * 500;

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

      {currentScreen === 'onboarding' && (
        <OnboardingScreen onStart={handleStartFromOnboarding} />
      )}

      {currentScreen === 'mission' && (
        <MissionScreen
          mission={modules[currentModuleIndex].missions[currentMissionIndex]}
          progress={Math.round(((currentModuleIndex + (currentMissionIndex / modules[currentModuleIndex].missions.length)) / modules.length) * 100)}
          onNext={handleNextMission}
          onImprove={handleImproveMission}
        />
      )}

      {currentScreen === 'module-completed' && completedModuleData && (
        <ModuleCompletedScreen
          moduleTitle={completedModuleData.title}
          xpGained={completedModuleData.xp}
          badgeLabel={completedModuleData.badge}
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
          canGeneratePlan={canGeneratePlan}
          onModuleClick={handleModuleClick}
          onGeneratePlan={handleGeneratePlan}
        />
      )}

      {currentScreen === 'business-plan' && (
        <BusinessPlanScreen
          onDownload={handleDownloadPlan}
          onEdit={handleEditPlan}
          onShare={handleSharePlan}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </div>
  );
}
