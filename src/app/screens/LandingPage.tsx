import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  Check,
  FileCheck2,
  FileText,
  HandCoins,
  Landmark,
  ShieldCheck,
  Target,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '../components/Button';
import { BrandLogo } from '../components/BrandLogo';
import './LandingPage.css';

interface LandingPageProps {
  onStart: () => void;
}


const journey = [
  { number: '01', title: 'Diagnóstico', description: 'Descubra seu momento empreendedor com perguntas rápidas e objetivas.', icon: Target },
  { number: '02', title: 'Aprendizado', description: 'Entenda os conceitos essenciais sem excesso de teoria ou linguagem difícil.', icon: BookOpenCheck },
  { number: '03', title: 'Missões práticas', description: 'Aplique o conteúdo no seu negócio e avance com XP, progresso e insígnias.', icon: Trophy },
  { number: '04', title: 'Plano com IA', description: 'Ao final, gere seu plano de negócios profissional com apoio da IA.', icon: BrainCircuit },
];

const planFeatures = [
  'Resumo executivo e proposta de valor',
  'Público-alvo, mercado e diferenciais',
  'Operação, receitas, custos e próximos passos',
];

const creditSteps: Array<[LucideIcon, string, string]> = [
  [FileCheck2, 'Organize seu negócio', 'Reúna informações essenciais sobre operação, público e finanças.'],
  [BadgeCheck, 'Entenda sua preparação', 'Identifique o que precisa ser fortalecido antes de buscar crédito.'],
  [HandCoins, 'Busque com mais clareza', 'Use seu plano como apoio na conversa com instituições e programas.'],
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#329314]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#052254] sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-[#50635b]">{description}</p>
    </div>
  );
}

function PlatformPreview() {
  return (
    <div className="home-preview overflow-hidden rounded-lg border border-[#d8e7df] bg-white">
      <div className="flex items-center justify-between border-b border-[#d8e7df] px-5 py-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#329314]">Jornada Educa Impacto</p>
          <p className="mt-1 text-lg font-extrabold text-[#052254]">Plano em construção</p>
        </div>
        <span className="rounded-full bg-[#e5f0ea] px-3 py-1 text-xs font-bold text-[#0A5740]">68%</span>
      </div>
      <div className="grid gap-4 p-5">
        {['Contexto do negócio', 'Cliente e problema', 'Solução e viabilidade'].map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center bg-[#e5f0ea] text-[#329314]">
              <Check className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-[#052254]">{item}</p>
              <div className="mt-2 h-2 overflow-hidden bg-[#eef5f1]">
                <div className="h-full bg-[#0A5740]" style={{ width: `${index === 2 ? 42 : 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BusinessPlanDocument() {
  const blocks = [
    ['Proposta', 'Uma cafeteria de bairro que serve café e pão de queijo antes do primeiro horário de aula.'],
    ['Público', 'Estudantes e professores que passam em frente ao ponto a caminho da faculdade.'],
    ['Operação', 'Testar o balcão de retirada pela manhã e registrar quantos pedidos saem antes das 8h.'],
    ['Finanças', 'Comparar a receita de cada combo com os gastos em ingredientes e embalagem antes de definir o preço.'],
  ];

  return (
    <div className="home-plan-sheet relative mx-auto w-full max-w-2xl">
      <div className="border border-[#d8e7df] bg-white p-6 text-[#052254] shadow-sm sm:p-8">
        <div className="flex items-center justify-between border-b border-[#d8e7df] pb-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center bg-[#e5f0ea] text-[#329314]">
              <FileText className="size-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#329314]">Plano de Negócios</p>
              <p className="mt-1 text-lg font-extrabold">Café Raiz</p>
            </div>
          </div>
          <span className="hidden items-center gap-1.5 bg-[#e5f0ea] px-3 py-1.5 text-xs font-bold text-[#0A5740] sm:flex">
            <FileCheck2 className="size-4" /> Estruturado
          </span>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {blocks.map(([title, detail]) => (
            <div key={title} className="border-l-2 border-[#329314] pl-4">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.08em]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#394f47]">{detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {['Mercado', 'Operação', 'Riscos', 'Próximos passos'].map((tag) => (
            <span key={tag} className="border border-[#d8e7df] bg-[#eef5f1] px-3 py-1.5 text-[10px] font-semibold text-[#50635b]">{tag}</span>
          ))}
        </div>
      </div>

    </div>
  );
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="educa-home min-h-screen bg-[#fbfdfa] text-[#052254]">
      <main>
        <section id="inicio" className="border-b border-[#B2C9BF] bg-[#fbfdfa]">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 md:grid-cols-2 md:gap-10 lg:px-8 lg:py-10">
            <div>
            <p className="mb-3 font-semibold text-[#0A5740]">Educa Impacto</p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-6xl">Seu plano de negócios</h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed">Responda às missões sobre sua ideia e receba um plano com público, operação e finanças organizados.</p>
            <Button onClick={onStart} className="mt-7">Começar <ArrowRight className="ml-2 inline size-4" /></Button>
            <p className="mt-3 text-sm text-[#394f47]"><strong>Trilha gratuita.</strong> R$ 29,90 apenas para exportar o PDF.</p>
            </div>
            <div className="home-composition">
              <div className="home-photo">
                <img
                  src="/empreendedora-documental.jpg"
                  alt="Empreendedora organizando as ideias do seu negócio"
                  className="h-full w-full object-cover object-center"
                />
                <div className="home-caption">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#f5cf63]">Clareza para avançar</p>
                  <p className="mt-2 max-w-[24ch] text-lg font-bold leading-snug">Cada resposta constrói uma parte real do seu negócio.</p>
                </div>
              </div>
              <div className="home-float">
                <PlatformPreview />
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-20 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Sua jornada"
              title="Como funciona"
              description="Preencha o diagnóstico ou vá direto às missões para construir seu plano."
            />
            <div className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="absolute left-[12%] right-[12%] top-9 hidden h-px bg-[#B2C9BF] lg:block" />
              {journey.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number} className="relative border-t border-[#B2C9BF] bg-white py-5 pr-4">
                    <div className="flex items-center justify-between">
                      <span className="grid size-14 place-items-center bg-[#e5f0ea] text-[#329314]"><Icon className="size-6" /></span>
                      <span className="font-mono text-sm font-bold text-[#329314]">{step.number}</span>
                    </div>
                    <h3 className="mt-7 text-xl font-bold">{step.title}</h3>
                    <p className="mt-3 leading-7 text-[#50635b]">{step.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="resultado" className="scroll-mt-20 bg-[#f2f8f4] py-12 text-[#052254] sm:py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold text-[#0A5740]">Exemplo de plano</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">O plano do Café Raiz</h2>
              <p className="mt-4 text-lg leading-8 text-[#394f47]">Veja como a ideia de uma cafeteria perto da faculdade ganha público definido, rotina de vendas e critérios para decidir o preço.</p>
              <blockquote className="mt-6 max-w-lg border-l-2 border-[#7CAF70] pl-4">
                <p className="text-sm font-semibold text-[#0A5740]">Exemplo · Café Raiz</p>
                <p className="mt-1 leading-relaxed">“Quero vender café perto da faculdade.” No plano, essa ideia vira uma ação: testar um combo de café e pão de queijo antes da primeira aula.</p>
              </blockquote>
              <ul className="mt-8 space-y-4">
                {planFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 size-5 shrink-0 text-[#0A5740]" />{item}</li>
                ))}
              </ul>
              <div className="mt-9 border-l-4 border-[#329314] bg-white p-5 text-[#052254]">
                <div className="flex items-end gap-2">
                  <strong className="text-3xl font-extrabold text-[#329314]">R$ 29,90</strong>
                  <span className="pb-1 text-sm font-semibold text-[#50635b]">pagamento único</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#50635b]">Ao final da jornada, você pode exportar o documento em PDF para apresentar ou imprimir.</p>
              </div>
            </div>
            <BusinessPlanDocument />
          </div>
        </section>

        <section id="microcredito" className="scroll-mt-20 bg-white py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.78fr_1.22fr] lg:px-8">
            <div>
              <span className="grid size-14 place-items-center bg-[#e5f0ea] text-[#329314]"><Landmark className="size-7" /></span>
              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.14em] text-[#329314]">Orientação ao microcrédito</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#052254] sm:text-5xl">Prepare-se para buscar crédito com mais segurança.</h2>
              <p className="mt-6 text-lg leading-8 text-[#50635b]">Entenda quais informações organizar, avalie a preparação do seu negócio e chegue mais bem informado à conversa com instituições financeiras.</p>
              <Button onClick={onStart} size="lg" className="mt-8">
                Começar <ArrowRight className="ml-2 inline size-5" />
              </Button>
            </div>
            <div>
              <div className="grid gap-4">
                {creditSteps.map(([Icon, title, text], index) => (
                  <article key={title} className="grid grid-cols-[auto_1fr] gap-5 border border-[#d8e7df] bg-white p-6 shadow-sm">
                    <span className="grid size-12 place-items-center bg-[#e5f0ea] text-[#329314]"><Icon className="size-6" /></span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#329314]">Passo {index + 1}</p>
                      <h3 className="mt-2 text-xl font-bold">{title}</h3>
                      <p className="mt-2 leading-7 text-[#50635b]">{text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-3 border border-[#d8e7df] bg-[#eef5f1] p-5 text-sm leading-6 text-[#50635b]">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#329314]" />
                <p>A Educa Impacto oferece orientação educativa e apoio à preparação. Não concede crédito, não intermedeia propostas e não garante aprovação.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-[#d8e7df] bg-white py-10 text-[#06173C]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 text-center md:flex-row md:text-left lg:px-8">
          <BrandLogo className="h-16 sm:h-20" />
          <p className="text-sm">© 2026 Educa Impacto. Transformando ideias em negócios.</p>
        </div>
      </footer>
    </div>
  );
}
