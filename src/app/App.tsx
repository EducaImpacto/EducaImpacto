import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LandingPage } from './screens/LandingPage';
import { AboutScreen } from './screens/AboutScreen';
import { DiagnosticScreen } from './screens/DiagnosticScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { MissionScreen } from './screens/MissionScreen';
import { ModuleCompletedScreen } from './screens/ModuleCompletedScreen';
import { BusinessPlanScreen } from './screens/BusinessPlanScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import type { BusinessPlanHistoryItem } from './screens/DashboardScreen';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { AuthModal } from './components/AuthModal';
import { DiagnosticData } from './screens/DiagnosticScreen';
import { isAdequateAnswer } from './utils/answerValidation';
import { supabase } from './lib/supabase';
import {
  createBusinessPlanSnapshot,
  getOrCreateDefaultBusinessProject,
  getProjectBusinessPlans,
  getProjectDiagnostic,
  getProjectMissionAnswers,
  toJson,
  upsertDiagnostic,
  upsertMissionAnswer,
} from './services/backendRepository';
import type { User } from '@supabase/supabase-js';

// ─── Tipos ───────────────────────────────────────────────────────────────────
type Screen =
  | 'landing'
  | 'about'
  | 'diagnostic'
  | 'onboarding'
  | 'dashboard'
  | 'mission'
  | 'etapa-concluida'
  | 'business-plan';

type EditReturnScreen = 'etapa-concluida' | 'business-plan';

interface Mission {
  id: number;
  etapa: number;
  etapaLabel: string;
  title: string;
  intro: string;
  question: string;
  placeholder: string;
  xpReward: number;
}

interface Etapa {
  id: number;
  label: string;
  badge: string;
  missions: Mission[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
  missions: Mission[];
}

// ─── 4 Etapas × 5 Missões = 20 missões (Trilha Iniciante) ───────────────────
const ETAPAS: Etapa[] = [
  {
    id: 1,
    label: 'Contexto do Negócio',
    badge: 'Contexto Definido',
    missions: [
      {
        id: 1, etapa: 1, etapaLabel: 'Contexto do Negócio',
        title: 'Sua ideia',
        intro: 'Vamos entender melhor o que você quer construir.',
        question: 'Qual é a sua ideia de negócio? O que você pretende vender ou oferecer?',
        placeholder: 'Ex: Quero oferecer um serviço de marmitas saudáveis para entrega em casa, com foco em trabalhadores...',
        xpReward: 50,
      },
      {
        id: 2, etapa: 1, etapaLabel: 'Contexto do Negócio',
        title: 'Sua experiência',
        intro: 'Você não precisa saber tudo para começar, mas toda experiência ajuda.',
        question: 'Você já teve alguma experiência com esse tipo de negócio? Conte como foi.',
        placeholder: 'Ex: Trabalhei dois anos em uma padaria e aprendi muito sobre atendimento ao cliente e gestão de estoque...',
        xpReward: 50,
      },
      {
        id: 3, etapa: 1, etapaLabel: 'Contexto do Negócio',
        title: 'O começo',
        intro: 'Todo negócio começa com ações simples. Pensar no primeiro passo ajuda a tirar a ideia do papel.',
        question: 'Qual é a primeira coisa que você pretende fazer para começar esse negócio?',
        placeholder: 'Ex: Vou conversar com 5 possíveis clientes para entender se eles comprariam meu produto...',
        xpReward: 50,
      },
      {
        id: 4, etapa: 1, etapaLabel: 'Contexto do Negócio',
        title: 'O que você já tem',
        intro: 'Você não precisa começar do zero. Você pode já ter algo que ajude no começo.',
        question: 'O que você já tem hoje que pode te ajudar a começar esse negócio?\n(Conhecimentos, ferramentas, contatos, espaço, dinheiro, ...)',
        placeholder: 'Ex: Tenho um forno em casa, sei cozinhar bem, e tenho uma amiga que pode me ajudar nas entregas nos primeiros meses...',
        xpReward: 50,
      },
    ],
  },
  {
    id: 2,
    label: 'Cliente',
    badge: 'Cliente Mapeado',
    missions: [
      {
        id: 5, etapa: 2, etapaLabel: 'Cliente',
        title: 'Seu cliente',
        intro: 'Todo negócio existe para solucionar o problema de alguém. Vamos começar entendendo quem é essa pessoa.',
        question: 'Quem você quer atender com seu negócio? Descreva da forma mais clara possível.',
        placeholder: 'Ex: Quero atender jovens entre 25 e 40 anos que trabalham em escritório, não têm tempo para cozinhar...',
        xpReward: 60,
      },
      {
        id: 6, etapa: 2, etapaLabel: 'Cliente',
        title: 'Perfil do cliente',
        intro: 'Vamos entender melhor como é essa pessoa no dia a dia.',
        question: 'Como é o seu cliente?\n(Idade, rotina, interesses, profissão, ...)',
        placeholder: 'Ex: São pessoas entre 28-35 anos, trabalham de segunda a sexta, ganham entre R$2.000 e R$5.000, moram sozinhas...',
        xpReward: 60,
      },
      {
        id: 7, etapa: 2, etapaLabel: 'Cliente',
        title: 'Realidade do cliente',
        intro: 'Antes de conhecer sua solução, seu cliente já tenta lidar com essa situação de alguma forma.',
        question: 'O que seu cliente faz atualmente para resolver esse problema?',
        placeholder: 'Ex: Atualmente compram marmitas de restaurantes caros, pedem delivery todos os dias ou comem mal...',
        xpReward: 60,
      },
      {
        id: 8, etapa: 2, etapaLabel: 'Cliente',
        title: 'Onde encontrar seu cliente',
        intro: 'Para o negócio crescer, você precisa saber onde encontrar esse cliente.',
        question: 'Onde você consegue encontrar esse tipo de cliente?\n(Redes sociais, lojas, grupos, bairros, comunidades, ...)',
        placeholder: 'Ex: No Instagram e grupos de WhatsApp de condomínios, nos prédios comerciais do centro da cidade...',
        xpReward: 60,
      },
      {
        id: 9, etapa: 2, etapaLabel: 'Cliente',
        title: 'Como seu cliente gasta dinheiro',
        intro: 'Para que um negócio funcione, o cliente precisa estar disposto e conseguir pagar pela solução.',
        question: 'Seu cliente costuma gastar dinheiro para resolver esse problema? Com o que ele gasta atualmente?',
        placeholder: 'Ex: Sim, gastam em média R$30-50 por dia com almoço em restaurantes ou delivery. Estão abertos a gastar menos...',
        xpReward: 60,
      },
    ],
  },
  {
    id: 3,
    label: 'Problema',
    badge: 'Problema Identificado',
    missions: [
      {
        id: 10, etapa: 3, etapaLabel: 'Problema',
        title: 'Problema principal',
        intro: 'Todo negócio resolve problemas. Vamos deixar claro qual é o principal deles.',
        question: 'Qual é o principal problema que seu cliente enfrenta?',
        placeholder: 'Ex: Meu cliente não tem tempo para cozinhar e acaba comendo mal ou gastando muito com delivery...',
        xpReward: 70,
      },
      {
        id: 11, etapa: 3, etapaLabel: 'Problema',
        title: 'Ocorrência e Frequência',
        intro: 'Entender quando e com que frequência o problema acontece ajuda a enxergar o tamanho dele.',
        question: 'Em quais situações esse problema costuma acontecer? Isso acontece com que frequência?',
        placeholder: 'Ex: Acontece todos os dias na hora do almoço e jantar. Na segunda-feira já está procurando o que comer...',
        xpReward: 70,
      },
      {
        id: 12, etapa: 3, etapaLabel: 'Problema',
        title: 'Impacto',
        intro: 'Resolver problemas importantes gera mais valor para o negócio.',
        question: 'Como esse problema afeta a vida do seu cliente?',
        placeholder: 'Ex: Afeta a saúde, o bolso e o bem-estar. Ele se sente culpado por comer mal e gasta mais do que deveria...',
        xpReward: 70,
      },
      {
        id: 13, etapa: 3, etapaLabel: 'Problema',
        title: 'Por que isso acontece',
        intro: 'Entender a causa do problema ajuda a encontrar soluções melhores.',
        question: 'Por que esse problema acontece?',
        placeholder: 'Ex: Acontece por falta de tempo, falta de habilidade para cozinhar e pela praticidade do delivery...',
        xpReward: 70,
      },
      {
        id: 14, etapa: 3, etapaLabel: 'Problema',
        title: 'O que não funciona hoje',
        intro: 'Se o problema continua existindo, é porque as soluções atuais não resolvem bem.',
        question: 'O que seu cliente já tentou fazer para resolver esse problema, mas não deu certo?',
        placeholder: 'Ex: Tentaram cozinhar aos domingos para a semana, mas cansa. O delivery é caro e pouco saudável...',
        xpReward: 70,
      },
    ],
  },
  {
    id: 4,
    label: 'Solução e Viabilidade',
    badge: 'Plano Viável',
    missions: [
      {
        id: 15, etapa: 4, etapaLabel: 'Solução e Viabilidade',
        title: 'Sua solução',
        intro: 'Agora que o problema está claro, vamos pensar na solução.',
        question: 'O que você pretende oferecer para resolver esse problema?',
        placeholder: 'Ex: Vou oferecer marmitas saudáveis e saborosas, entregues toda segunda-feira para a semana toda...',
        xpReward: 80,
      },
      {
        id: 16, etapa: 4, etapaLabel: 'Solução e Viabilidade',
        title: 'Como sua solução ajuda o cliente',
        intro: 'Uma boa solução precisa resolver o problema de forma clara e funcionar no dia a dia do cliente.',
        question: 'Como sua solução resolve o problema do cliente? Como ele usaria isso no dia a dia?',
        placeholder: 'Ex: O cliente recebe 5 marmitas na segunda-feira, guarda na geladeira e aquece na hora. Economiza tempo e come melhor...',
        xpReward: 80,
      },
      {
        id: 17, etapa: 4, etapaLabel: 'Solução e Viabilidade',
        title: 'Como você ganha dinheiro',
        intro: 'Todo negócio precisa gerar dinheiro para funcionar.',
        question: 'Como você pretende ganhar dinheiro com isso?\n(Como o cliente paga? Por produto, serviço, mensalidade, etc.)',
        placeholder: 'Ex: Vou cobrar R$15 por marmita ou R$60 pelo pacote semanal de 5 marmitas. Pagamento via PIX antecipado...',
        xpReward: 80,
      },
      {
        id: 18, etapa: 4, etapaLabel: 'Solução e Viabilidade',
        title: 'Funcionamento',
        intro: 'Além da ideia, é importante entender como o negócio acontece na prática.',
        question: 'Como seu negócio vai funcionar no dia a dia?\n(O que você faz, como entrega, como atende o cliente, ...)',
        placeholder: 'Ex: Cozinho na quinta e sexta-feira, entrego na segunda de manhã. Atendo pedidos pelo WhatsApp até quarta-feira...',
        xpReward: 80,
      },
      {
        id: 19, etapa: 4, etapaLabel: 'Solução e Viabilidade',
        title: 'O que você precisa para começar',
        intro: 'Todo negócio precisa de alguns recursos para sair do papel.',
        question: 'O que você precisa para começar esse negócio? Descreva o que é necessário e quais seriam os custos.\n(Materiais, equipamentos, dinheiro, ajuda de alguém, ...)',
        placeholder: 'Ex: Preciso de embalagens (~R$100), ingredientes para a primeira semana (~R$200) e uma caixinha de isopor (~R$50)...',
        xpReward: 80,
      },
    ],
  },
];

const TOTAL_MISSIONS = ETAPAS.reduce((acc, e) => acc + e.missions.length, 0); // 20
const STORAGE_KEY = 'educa-impacto-progress-v1';
const APP_BUILD_MARKER = '2026-07-27-plan-history-cache-fix-2';

const DEFAULT_DIAGNOSTIC_DATA: DiagnosticData = {
  objetivo: 'primeiro-negocio',
  experiencia: 'zero',
  capacidadePlano: 'precisaria-ajuda',
  usoFerramentas: 'nunca',
  experienciaPlano: 'nunca-contato',
  nivel: 'iniciante',
};

interface PersistedState {
  screen: Screen;
  diagnosticData: DiagnosticData | null;
  etapaIndex: number;
  missaoIndex: number;
  respostas: Record<number, string>;
  xp: number;
  nivel: number;
}

interface NavigationState {
  screen: Screen;
  etapaIndex: number;
  missaoIndex: number;
  editingMissionId: number | null;
  editReturnScreen: EditReturnScreen;
}

interface BusinessPlanMissionSnapshot {
  missionId: number;
  missionTitle: string;
  question: string;
  answer: string;
  planBlocks: string[];
}

interface BusinessPlanModuleSnapshot {
  moduleId: number;
  moduleTitle: string;
  totalQuestions: number;
  answeredQuestions: number;
  missions: BusinessPlanMissionSnapshot[];
}

function readPersistedState(): Partial<PersistedState> | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getPlanBlocksByEtapa(etapa: number): string[] {
  switch (etapa) {
    case 1:
      return ['Empreendedor e contexto', 'Operação básica', 'Produto / Serviço'];
    case 2:
      return ['Cliente e mercado', 'Canais de venda e aquisição', 'Receita'];
    case 3:
      return ['Problema', 'Proposta de valor', 'Crescimento'];
    case 4:
      return ['Produto / Serviço', 'Operação básica', 'Custos', 'Receita'];
    default:
      return [];
  }
}

function buildBusinessPlanModulesSnapshot(
  respostas: Record<number, string>
): BusinessPlanModuleSnapshot[] {
  return ETAPAS.map((etapa) => {
    const missions = etapa.missions
      .map((mission) => ({
        missionId: mission.id,
        missionTitle: mission.title,
        question: mission.question,
        answer: respostas[mission.id],
        planBlocks: getPlanBlocksByEtapa(etapa.id),
      }))
      .filter((mission) => isAdequateAnswer(mission.answer));

    return {
      moduleId: etapa.id,
      moduleTitle: etapa.label,
      totalQuestions: etapa.missions.length,
      answeredQuestions: missions.length,
      missions,
    };
  });
}

function getAuthErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);

  if (/load failed|failed to fetch|network|fetch/i.test(message)) {
    return 'Nao consegui conectar ao Supabase. Confira se a Project URL esta correta e se o projeto esta ativo.';
  }

  return message;
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const persistedState = useMemo(() => readPersistedState(), []);
  const isRestoringHistory = useRef(false);
  const lastHistoryKey = useRef('');
  const remoteSyncStarted = useRef(false);
  const [screen, setScreen] = useState<Screen>(persistedState?.screen ?? 'landing');
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState('');
  const [isPreparingPlan, setIsPreparingPlan] = useState(false);
  const [businessPlanHistory, setBusinessPlanHistory] = useState<BusinessPlanHistoryItem[]>([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, [screen]);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(persistedState?.diagnosticData ?? null);
  const [editingMissionId, setEditingMissionId] = useState<number | null>(null);
  const [editReturnScreen, setEditReturnScreen] = useState<EditReturnScreen>('business-plan');

  // Progresso na trilha
  const [etapaIndex, setEtapaIndex] = useState(persistedState?.etapaIndex ?? 0);   // 0..3
  const [missaoIndex, setMissaoIndex] = useState(persistedState?.missaoIndex ?? 0); // 0..4 dentro da etapa
  const [respostas, setRespostas] = useState<Record<number, string>>(persistedState?.respostas ?? {}); // missionId → resposta

  // Gamificação
  const [xp, setXp] = useState(persistedState?.xp ?? 0);
  const [nivel, setNivel] = useState(persistedState?.nivel ?? 1);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) setAuthUser(data.session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
      if (!session?.user) {
        setActiveProjectId(null);
        setBusinessPlanHistory([]);
        remoteSyncStarted.current = false;
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!authUser) return;

    let isMounted = true;

    getOrCreateDefaultBusinessProject()
      .then(async (project) => {
        if (!isMounted) return;

        setActiveProjectId(project.id);

        const [remoteDiagnostic, remoteAnswers, remotePlans] = await Promise.all([
          getProjectDiagnostic(project.id),
          getProjectMissionAnswers(project.id),
          getProjectBusinessPlans(project.id),
        ]);

        if (!isMounted) return;

        if (!diagnosticData && remoteDiagnostic?.answers && typeof remoteDiagnostic.answers === 'object') {
          setDiagnosticData({
            ...(remoteDiagnostic.answers as Partial<DiagnosticData>),
            nivel: remoteDiagnostic.profile_level,
          } as DiagnosticData);
        }

        if (Object.keys(respostas).length === 0 && remoteAnswers.length > 0) {
          setRespostas(
            remoteAnswers.reduce<Record<number, string>>((acc, answer) => {
              acc[answer.mission_id] = answer.answer;
              return acc;
            }, {})
          );
        }

        setBusinessPlanHistory(
          remotePlans.map((plan) => ({
            id: plan.id,
            version: plan.version,
            title: plan.title,
            status: plan.status,
            createdAt: plan.created_at,
          }))
        );

        remoteSyncStarted.current = true;
        setSyncMessage('Progresso conectado ao Supabase.');
      })
      .catch((error) => {
        console.error('Nao foi possivel preparar projeto no Supabase.', error);
        setSyncMessage('Nao foi possivel conectar seu progresso ao Supabase agora.');
      });

    return () => {
      isMounted = false;
    };
  }, [authUser]);

  useEffect(() => {
    if (!activeProjectId || !diagnosticData || !remoteSyncStarted.current) return;

    upsertDiagnostic({
      project_id: activeProjectId,
      profile_level: diagnosticData.nivel,
      answers: toJson(diagnosticData),
    }).catch((error) => {
      console.error('Nao foi possivel salvar diagnostico no Supabase.', error);
      setSyncMessage('Diagnostico salvo localmente. Tentaremos sincronizar depois.');
    });
  }, [activeProjectId, diagnosticData]);

  useEffect(() => {
    if (!activeProjectId || !remoteSyncStarted.current) return;

    const entries = Object.entries(respostas).filter(([, answer]) => isAdequateAnswer(answer));
    if (entries.length === 0) return;

    Promise.all(
      entries.map(([missionId, answer]) => {
        const missionIdNumber = Number(missionId);
        const etapa = ETAPAS.find((item) => item.missions.some((mission) => mission.id === missionIdNumber));
        const mission = etapa?.missions.find((item) => item.id === missionIdNumber);

        if (!etapa || !mission) return Promise.resolve();

        return upsertMissionAnswer({
          project_id: activeProjectId,
          module_id: etapa.id,
          module_title: etapa.label,
          mission_id: mission.id,
          mission_title: mission.title,
          question: mission.question,
          answer,
          status: 'answered',
        });
      })
    ).catch((error) => {
      console.error('Nao foi possivel salvar respostas no Supabase.', error);
      setSyncMessage('Respostas salvas localmente. Tentaremos sincronizar depois.');
    });
  }, [activeProjectId, respostas]);

  useEffect(() => {
    if (etapaIndex < 0 || etapaIndex >= ETAPAS.length) {
      setEtapaIndex(0);
      setMissaoIndex(0);
      return;
    }

    const totalMissoesEtapaAtual = ETAPAS[etapaIndex].missions.length;
    if (missaoIndex < 0 || missaoIndex >= totalMissoesEtapaAtual) {
      setMissaoIndex(0);
    }
  }, [etapaIndex, missaoIndex]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const state: PersistedState = {
      screen,
      diagnosticData,
      etapaIndex,
      missaoIndex,
      respostas,
      xp,
      nivel,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [diagnosticData, etapaIndex, missaoIndex, nivel, respostas, screen, xp]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const applyNavigationState = (state: NavigationState) => {
      isRestoringHistory.current = true;
      setScreen(state.screen);
      setEtapaIndex(state.etapaIndex);
      setMissaoIndex(state.missaoIndex);
      setEditingMissionId(state.editingMissionId);
      setEditReturnScreen(state.editReturnScreen);
    };

    const initialState: NavigationState = {
      screen,
      etapaIndex,
      missaoIndex,
      editingMissionId,
      editReturnScreen,
    };

    window.history.replaceState(initialState, '', window.location.href);
    lastHistoryKey.current = JSON.stringify(initialState);

    const handlePopState = (event: PopStateEvent) => {
      if (!event.state) return;
      applyNavigationState(event.state as NavigationState);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const navigationState: NavigationState = {
      screen,
      etapaIndex,
      missaoIndex,
      editingMissionId,
      editReturnScreen,
    };
    const nextHistoryKey = JSON.stringify(navigationState);

    if (isRestoringHistory.current) {
      isRestoringHistory.current = false;
      lastHistoryKey.current = nextHistoryKey;
      return;
    }

    if (nextHistoryKey !== lastHistoryKey.current) {
      window.history.pushState(navigationState, '', window.location.href);
      lastHistoryKey.current = nextHistoryKey;
    }
  }, [editReturnScreen, editingMissionId, etapaIndex, missaoIndex, screen]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const etapaIndexSeguro = etapaIndex >= 0 && etapaIndex < ETAPAS.length ? etapaIndex : 0;
  const etapaAtual = ETAPAS[etapaIndexSeguro];
  const missaoIndexSeguro =
    missaoIndex >= 0 && missaoIndex < etapaAtual.missions.length ? missaoIndex : 0;
  const missaoAtual = etapaAtual.missions[missaoIndexSeguro];

  const missaoGlobalAtual =
    ETAPAS.slice(0, etapaIndexSeguro).reduce((acc, e) => acc + e.missions.length, 0) +
    missaoIndexSeguro +
    1;

  const progresso = Math.round(((missaoIndexSeguro + 1) / etapaAtual.missions.length) * 100);
  const activeDiagnosticData = diagnosticData ?? DEFAULT_DIAGNOSTIC_DATA;

  const businessPlanAnswers = ETAPAS.flatMap((etapa) =>
    etapa.missions
      .map((mission) => ({
        missionId: String(mission.id),
        moduleId: etapa.id,
        moduleTitle: etapa.label,
        missionTitle: mission.title,
        answer: respostas[mission.id],
        planBlocks: getPlanBlocksByEtapa(etapa.id),
      }))
      .filter((mission) => isAdequateAnswer(mission.answer))
  );

  const currentModuleAnswers = etapaAtual.missions
    .map((mission) => ({
      missionId: String(mission.id),
      missionTitle: mission.title,
      answer: respostas[mission.id],
    }))
    .filter((mission) => isAdequateAnswer(mission.answer));

  const completedMissionCount = Object.values(respostas).filter(isAdequateAnswer).length;
  const overallProgress = Math.round((completedMissionCount / TOTAL_MISSIONS) * 100);
  const modules: Module[] = ETAPAS.map((etapa) => {
    const answeredMissions = etapa.missions.filter((mission) => isAdequateAnswer(respostas[mission.id])).length;

    return {
      id: etapa.id,
      title: etapa.label,
      description: answeredMissions > 0
        ? `${answeredMissions} de ${etapa.missions.length} respostas preenchidas`
        : 'Comece quando quiser',
      completed: answeredMissions === etapa.missions.length,
      locked: false,
      missions: etapa.missions,
    };
  });

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleDiagnosticComplete = (data: DiagnosticData) => {
    setDiagnosticData(data);
    setScreen('onboarding');
  };

  const handleOpenModules = () => {
    setDiagnosticData((current) => current ?? DEFAULT_DIAGNOSTIC_DATA);
    setEditingMissionId(null);
    setScreen('dashboard');
  };

  const handleGoHome = () => {
    setEditingMissionId(null);
    setScreen('landing');
    window.scrollTo(0, 0);
  };

  const handleOpenAbout = () => {
    setEditingMissionId(null);
    setScreen('about');
    window.scrollTo(0, 0);
  };

  const handleStartTrail = () => {
    setEtapaIndex(0);
    setMissaoIndex(0);
    setEditingMissionId(null);
    setScreen('mission');
  };

  const handleModuleClick = (moduleId: number) => {
    const moduleIndex = ETAPAS.findIndex((etapa) => etapa.id === moduleId);
    if (moduleIndex === -1) return;

    const firstUnansweredMissionIndex = ETAPAS[moduleIndex].missions.findIndex(
      (mission) => !isAdequateAnswer(respostas[mission.id])
    );

    setDiagnosticData((current) => current ?? DEFAULT_DIAGNOSTIC_DATA);
    setEtapaIndex(moduleIndex);
    setMissaoIndex(firstUnansweredMissionIndex === -1 ? 0 : firstUnansweredMissionIndex);
    setEditingMissionId(null);
    setScreen('mission');
  };

  const handlePreviousPage = () => {
    if (editingMissionId !== null) {
      setEditingMissionId(null);
      setScreen(editReturnScreen);
      return;
    }

    setScreen('dashboard');
  };

  const handlePreviousQuestion = () => {
    if (missaoIndex > 0) {
      if (editingMissionId !== null) {
        const previousMission = etapaAtual.missions[missaoIndex - 1];
        setEditingMissionId(previousMission.id);
      }
      setMissaoIndex((i) => i - 1);
    }
  };

  const handleNextMission = (answer: string) => {
    if (editingMissionId !== null) {
      setRespostas((prev) => ({ ...prev, [editingMissionId]: answer }));
      setEditingMissionId(null);
      setScreen(editReturnScreen);
      return;
    }

    // Salvar resposta
    setRespostas((prev) => ({ ...prev, [missaoAtual.id]: answer }));

    // Ganhar XP
    const novoXp = xp + missaoAtual.xpReward;
    setXp(novoXp);
    if (novoXp >= nivel * 300) setNivel((n) => n + 1);

    const ultimaMissaoDaEtapa = missaoIndex === etapaAtual.missions.length - 1;

    if (ultimaMissaoDaEtapa) {
      // Concluiu a etapa
      setScreen('etapa-concluida');
    } else {
      // Próxima missão da mesma etapa
      setMissaoIndex((i) => i + 1);
    }
  };

  const handleNextEtapa = () => {
    const ultimaEtapa = etapaIndex === ETAPAS.length - 1;

    if (!ultimaEtapa) {
      setEtapaIndex((i) => i + 1);
      setMissaoIndex(0);
    }

    setScreen('dashboard');
  };

  const handleDownloadPlan = () => {
    alert('Em uma implementação completa, o PDF seria gerado aqui pela IA com todas as suas respostas!');
  };

  const handleGenerateBusinessPlan = async () => {
    if (!authUser || !activeProjectId) {
      setAuthModalMode('signin');
      setAuthMessage('Entre ou crie uma conta para salvar suas respostas no Supabase e preparar o plano para a IA.');
      setIsAuthModalOpen(true);
      return;
    }

    setScreen('business-plan');
    setIsPreparingPlan(true);

    const modulesSnapshot = buildBusinessPlanModulesSnapshot(respostas);
    const answeredQuestions = modulesSnapshot.reduce((total, module) => total + module.answeredQuestions, 0);

    try {
      const savedPlan = await createBusinessPlanSnapshot({
        project_id: activeProjectId,
        title: 'Plano de negocios Educa Impacto',
        status: 'draft',
        content: toJson({
          format: 'educa-impacto-business-plan-v1',
          profile: activeDiagnosticData.nivel,
          modules: modulesSnapshot,
          sections: [
            'Sumario Executivo',
            'Cliente e Mercado',
            'Problema e Proposta de Valor',
            'Operacao',
            'Custos e Receita',
            'Proximos Passos',
          ],
        }),
        generated_from: toJson({
          source: 'educa-impacto-web',
          generatedAt: new Date().toISOString(),
          projectId: activeProjectId,
          diagnostic: activeDiagnosticData,
          totalQuestions: TOTAL_MISSIONS,
          answeredQuestions,
          moduleQuestionCounts: ETAPAS.map((etapa) => ({
            moduleId: etapa.id,
            title: etapa.label,
            total: etapa.missions.length,
          })),
        }),
      });

      setBusinessPlanHistory((current) => [
        {
          id: savedPlan.id,
          version: savedPlan.version,
          title: savedPlan.title,
          status: savedPlan.status,
          createdAt: savedPlan.created_at,
        },
        ...current.filter((plan) => plan.id !== savedPlan.id),
      ]);

      setSyncMessage('Plano preparado no Supabase para a integracao com IA.');
    } catch (error) {
      console.error('Nao foi possivel preparar o plano para IA.', error);
      setSyncMessage('Previa aberta. Nao foi possivel salvar o plano no Supabase agora.');
    } finally {
      setIsPreparingPlan(false);
    }
  };

  const handleEditAnswer = (missionId: string, returnScreen: EditReturnScreen) => {
    const missionIdNumber = Number(missionId);
    if (Number.isNaN(missionIdNumber)) return;

    const etapaFoundIndex = ETAPAS.findIndex((etapa) =>
      etapa.missions.some((mission) => mission.id === missionIdNumber)
    );

    if (etapaFoundIndex === -1) return;

    const missionFoundIndex = ETAPAS[etapaFoundIndex].missions.findIndex(
      (mission) => mission.id === missionIdNumber
    );

    if (missionFoundIndex === -1) return;

    setEtapaIndex(etapaFoundIndex);
    setMissaoIndex(missionFoundIndex);
    setEditingMissionId(missionIdNumber);
    setEditReturnScreen(returnScreen);
    setScreen('mission');
  };

  const handleSignIn = async (email: string, password: string) => {
    setAuthLoading(true);
    setAuthMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setAuthMessage(getAuthErrorMessage(error));
        setAuthLoading(false);
        return;
      }

      setAuthMessage('Entrada realizada. Seu progresso sera sincronizado.');
      setAuthLoading(false);
      setIsAuthModalOpen(false);
    } catch (error) {
      setAuthMessage(getAuthErrorMessage(error));
      setAuthLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    setAuthLoading(true);
    setAuthMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setAuthMessage(getAuthErrorMessage(error));
        setAuthLoading(false);
        return;
      }

      if (data.session) {
        setAuthMessage('Conta criada. Seu progresso sera sincronizado.');
        setIsAuthModalOpen(false);
      } else {
        setAuthMessage('Conta criada. Verifique seu e-mail para confirmar o acesso.');
      }

      setAuthLoading(false);
    } catch (error) {
      setAuthMessage(getAuthErrorMessage(error));
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSyncMessage('');
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" data-build={APP_BUILD_MARKER}>
      <AppHeader
        onHome={handleGoHome}
        onAbout={handleOpenAbout}
        onOpenModules={handleOpenModules}
        userEmail={authUser?.email ?? null}
        onAuthClick={() => {
          setAuthModalMode('signin');
          setAuthMessage('');
          setIsAuthModalOpen(true);
        }}
        onSignOut={handleSignOut}
      />

      {(syncMessage || isPreparingPlan) && (
        <div className="border-b border-[#dbe9e2] bg-[#f5faf7] px-4 py-2 text-center text-xs font-semibold text-[#052254]">
          {isPreparingPlan ? 'Preparando plano no Supabase para a IA...' : syncMessage}
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        loading={authLoading}
        message={authMessage}
        onClose={() => setIsAuthModalOpen(false)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />

      {screen === 'landing' && (
        <LandingPage onStart={() => setScreen('diagnostic')} onOpenModules={handleOpenModules} />
      )}

      {screen === 'about' && (
        <AboutScreen onStart={() => setScreen('diagnostic')} onOpenModules={handleOpenModules} />
      )}

      {screen === 'diagnostic' && (
        <DiagnosticScreen
          onComplete={handleDiagnosticComplete}
          onBack={() => setScreen("landing")}
        />
      )}

      {screen === 'onboarding' && (
        <OnboardingScreen
          profileType={activeDiagnosticData.nivel}
          onBackToLanding={() => {
            setScreen("landing");
            window.scrollTo(0, 0);
          }}
          onOpenModules={handleOpenModules}
          onBackToDiagnostic={() => setScreen('diagnostic')}
        />
      )}

      {screen === 'dashboard' && (
        <DashboardScreen
          level={nivel}
          xp={xp}
          nextLevelXp={nivel * 300}
          overallProgress={overallProgress}
          modules={modules}
          totalMissions={TOTAL_MISSIONS}
          completedMissions={completedMissionCount}
          canGeneratePlan={completedMissionCount === TOTAL_MISSIONS}
          businessPlanHistory={businessPlanHistory}
          onModuleClick={handleModuleClick}
          onGeneratePlan={handleGenerateBusinessPlan}
        />
      )}

      {screen === 'mission' && missaoAtual && (
        <MissionScreen
          mission={missaoAtual}
          progress={progresso}
          totalMissions={TOTAL_MISSIONS}
          currentMissionNumber={missaoGlobalAtual}
          totalModules={ETAPAS.length}
          currentModuleNumber={etapaIndexSeguro + 1}
          totalModuleMissions={etapaAtual.missions.length}
          currentModuleMissionNumber={missaoIndexSeguro + 1}
          initialAnswer={respostas[missaoAtual.id] ?? ''}
          isEditing={editingMissionId !== null}
          canGoBackQuestion={missaoIndex > 0}
          pageBackLabel={
            editingMissionId !== null
              ? editReturnScreen === 'business-plan'
                ? 'Voltar ao plano'
                : 'Voltar ao resumo'
              : 'Voltar aos módulos'
          }
          onNext={handleNextMission}
          onBackQuestion={handlePreviousQuestion}
          onBackPage={handlePreviousPage}
        />
      )}

      {screen === 'mission' && !missaoAtual && (
        <div className="min-h-screen bg-gradient-to-br from-[#f5faf7] to-white flex items-center justify-center px-4">
          <p className="text-sm font-medium text-gray-600">Preparando sua primeira missão...</p>
        </div>
      )}

      {screen === 'etapa-concluida' && (
        <ModuleCompletedScreen
          moduleTitle={etapaAtual.label}
          xpGained={etapaAtual.missions.reduce((acc, m) => acc + m.xpReward, 0)}
          badgeLabel={etapaAtual.badge}
          answers={currentModuleAnswers}
          onEditAnswer={(missionId) => handleEditAnswer(missionId, 'etapa-concluida')}
          onNext={handleNextEtapa}
          onNextModule={
            etapaIndex < ETAPAS.length - 1
              ? () => {
                  setEtapaIndex((i) => i + 1);
                  setMissaoIndex(0);
                  setScreen('mission');
                }
              : undefined
          }
        />
      )}

      {screen === 'business-plan' && (
        <BusinessPlanScreen
          diagnosticData={activeDiagnosticData}
          answers={businessPlanAnswers}
          moduleAnswerTargets={ETAPAS.map((etapa) => ({
            moduleId: etapa.id,
            title: etapa.label,
            total: etapa.missions.length,
          }))}
          onDownload={handleDownloadPlan}
          onEditAnswer={(missionId) => handleEditAnswer(missionId, 'business-plan')}
          onShare={() => alert('Compartilhamento disponível em breve!')}
          onBackToDashboard={handleOpenModules}
        />
      )}

      {screen !== 'landing' && <AppFooter />}
    </div>
  );
}
