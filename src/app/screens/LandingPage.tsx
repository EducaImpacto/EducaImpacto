import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BookOpenCheck,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FileText,
  HandCoins,
  Landmark,
  Lightbulb,
  Medal,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '../components/Button';
import { BrandLogo } from '../components/BrandLogo';

interface LandingPageProps {
  onStart: () => void;
  onOpenModules: () => void;
}

const navigation = [
  ['Como funciona', '#como-funciona'],
  ['Plano de Negócios', '#resultado'],
  ['Microcrédito', '#microcredito'],
  ['Para quem é', '#para-quem'],
] as const;

const trustItems: Array<[LucideIcon, string, string]> = [
  [CircleDollarSign, 'Comece gratuitamente', 'Diagnóstico, aprendizado e missões'],
  [ShieldCheck, 'Sem cartão no início', 'Conheça a jornada antes de pagar'],
  [Clock3, 'Diagnóstico em 3 minutos', 'Direto ao que importa'],
];

const journey = [
  { number: '01', title: 'Diagnóstico', description: 'Descubra seu momento empreendedor com perguntas rápidas e objetivas.', icon: Target },
  { number: '02', title: 'Aprendizado', description: 'Entenda os conceitos essenciais sem excesso de teoria ou linguagem difícil.', icon: BookOpenCheck },
  { number: '03', title: 'Missões práticas', description: 'Aplique o conteúdo no seu negócio e avance com XP, progresso e insígnias.', icon: Trophy },
  { number: '04', title: 'Plano com IA', description: 'Ao final, gere seu plano de negócios profissional com apoio da IA.', icon: BrainCircuit },
];

const audiences = [
  { icon: Lightbulb, label: 'Tenho uma ideia', title: 'Quero saber por onde começar', text: 'Organize sua visão, entenda seu público e transforme uma ideia solta em próximos passos concretos.' },
  { icon: Rocket, label: 'Estou começando do zero', title: 'Preciso de direção prática', text: 'Aprenda no seu ritmo e construa cada parte do negócio com perguntas simples e missões guiadas.' },
  { icon: CheckCircle2, label: 'Já comecei', title: 'Quero validar meu negócio', text: 'Reveja suas escolhas, identifique pontos frágeis e estruture melhor sua proposta para crescer.' },
];

const benefits: Array<[string, string, LucideIcon]> = [
  ['Orientação sem complicação', 'Conteúdo direto, feito para quem está dando os primeiros passos.', BookOpenCheck],
  ['Aplicação no seu negócio', 'Cada missão ajuda você a tomar uma decisão útil para sua realidade.', Target],
  ['IA como apoio', 'A tecnologia ajuda a organizar e aprimorar o que você construiu.', Sparkles],
  ['Progresso que motiva', 'XP, etapas e insígnias tornam a jornada leve, sem tirar o foco do resultado.', Medal],
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
    <div className="overflow-hidden border border-[#d8e7df] bg-white shadow-2xl">
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
                <div className="h-full bg-gradient-to-r from-[#052254] via-[#0A5740] to-[#329314]" style={{ width: `${index === 2 ? 42 : 100}%` }} />
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
    ['Resumo executivo', ['Negócio de alimentação com foco', 'em produtos locais e experiência', 'acolhedora para a comunidade.']],
    ['Público-alvo', ['Profissionais e estudantes', 'que valorizam praticidade, qualidade', 'e conexão com o território.']],
    ['Proposta de valor', ['Café de origem, atendimento próximo', 'e um espaço pensado para trabalhar.']],
    ['Visão financeira', ['Receitas, custos e investimentos', 'organizados para apoiar', 'decisões mais conscientes.']],
  ];

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="rotate-[1deg] border border-[#d8e7df] bg-white p-6 text-[#052254] shadow-xl sm:p-8">
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
          {blocks.map(([title, lines]) => (
            <div key={title as string} className="border-l-2 border-[#329314] pl-4">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.08em]">{title}</h3>
              <div className="mt-3 space-y-1">
                {(lines as string[]).map((line) => (
                  <p key={line} className="text-[11px] leading-4 text-[#50635b]">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {['Mercado', 'Operação', 'Riscos', 'Próximos passos'].map((tag) => (
            <span key={tag} className="border border-[#d8e7df] bg-[#eef5f1] px-3 py-1.5 text-[10px] font-semibold text-[#50635b]">{tag}</span>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-5 -right-3 flex items-center gap-3 bg-[#f5cf63] px-4 py-3 text-[#052254] shadow-lg sm:right-8">
        <Sparkles className="size-5" />
        <div>
          <p className="text-xs font-extrabold">Organizado com IA</p>
          <p className="text-[10px] opacity-70">A partir das suas respostas</p>
        </div>
      </div>
    </div>
  );
}

export function LandingPage({ onStart, onOpenModules }: LandingPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbfdfa] text-[#052254]">
      <header className="sticky top-0 z-40 border-b border-[#d8e7df] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Ir para o inicio da Educa Impacto">
            <BrandLogo compact className="h-11 w-11 sm:h-12 sm:w-12" />
            <span className="hidden text-lg font-extrabold tracking-tight text-[#052254] sm:inline">
              Educa Impacto
            </span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map(([label, href]) => (
              <a key={href} href={href} className="text-sm font-bold text-[#50635b] transition-colors hover:text-[#052254]">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onOpenModules} className="hidden border-[#d8e7df] px-4 py-2 text-sm sm:inline-flex">
              Ver módulos
            </Button>
            <Button onClick={onStart} className="px-4 py-2 text-sm">
              Começar
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section id="inicio" className="relative overflow-hidden bg-[#f2f8f4]">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(5,34,84,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,34,84,.06)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />
          <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 pb-24 pt-12 lg:min-h-[760px] lg:grid-cols-[.94fr_1.06fr] lg:px-8 lg:pb-28 lg:pt-16">
            <div className="relative z-20 max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 border border-[#329314]/20 bg-white px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] shadow-sm sm:mb-8 sm:text-xs">
                <Sparkles className="size-4 text-[#329314]" /> Da ideia ao plano, passo a passo
              </div>
              <h1 className="max-w-[11ch] text-[2.75rem] font-extrabold leading-[1.02] text-[#052254] sm:text-6xl lg:text-[4.65rem]">
                Sua ideia merece<span className="mt-2 block text-[#329314]">virar negócio.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#50635b] sm:text-xl sm:leading-8">
                Descubra o que falta, aprenda fazendo e termine sua jornada com um Plano de Negócios estruturado com apoio de IA.
              </p>
              <div className="mt-7 flex flex-col gap-2 sm:mt-9 sm:flex-row sm:gap-3">
                <Button onClick={onStart} size="lg" className="shadow-lg">
                  Começar Diagnóstico Gratuito <ArrowRight className="ml-2 inline size-5" />
                </Button>
                <Button onClick={onOpenModules} size="lg" variant="outline" className="bg-white">
                  Ver Módulos <ChevronRight className="ml-2 inline size-5" />
                </Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs font-medium text-[#50635b] sm:text-sm">
                <ShieldCheck className="size-4 shrink-0 text-[#329314]" /> Comece grátis. Plano completo por R$ 29,90 somente ao final.
              </p>
            </div>

            <div className="relative hidden min-h-[600px] lg:block">
              <div className="absolute right-0 top-0 h-[530px] w-[70%] overflow-hidden shadow-[22px_22px_0_#329314]">
                <img
                  src="/empreendedora-documental.jpg"
                  alt="Empreendedora organizando as ideias do seu negócio"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#052254]/80 to-transparent px-6 pb-6 pt-24 text-white">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#f5cf63]">Clareza para avançar</p>
                  <p className="mt-2 max-w-[24ch] text-lg font-bold leading-snug">Cada resposta constrói uma parte real do seu negócio.</p>
                </div>
              </div>
              <div className="absolute bottom-2 left-0 z-10 w-[79%] [transform:perspective(1400px)_rotateY(-3deg)_rotateX(1deg)]">
                <PlatformPreview />
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-12 px-5 lg:px-8" aria-label="Compromissos da plataforma">
          <div className="mx-auto grid max-w-6xl border border-[#d8e7df] bg-white shadow-xl sm:grid-cols-3">
            {trustItems.map(([Icon, title, text], index) => (
              <div key={title} className={`flex items-center gap-4 p-5 sm:p-6 ${index > 0 ? 'border-t border-[#d8e7df] sm:border-l sm:border-t-0' : ''}`}>
                <span className="grid size-11 shrink-0 place-items-center bg-[#e5f0ea] text-[#329314]"><Icon className="size-5" /></span>
                <div>
                  <p className="font-bold">{title}</p>
                  <p className="mt-0.5 text-sm text-[#50635b]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-20 bg-white py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Sua jornada"
              title="Da ideia ao plano, passo a passo"
              description="Você não precisa saber tudo para começar. A Educa Impacto mostra o próximo passo e ajuda a transformar aprendizado em ação."
            />
            <div className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="absolute left-[12%] right-[12%] top-9 hidden h-px bg-gradient-to-r from-[#d8e7df] via-[#329314] to-[#d8e7df] lg:block" />
              {journey.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number} className="relative border border-[#d8e7df] bg-white p-6 shadow-sm">
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

        <section id="resultado" className="scroll-mt-20 bg-[#f2f8f4] py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#329314]">Resultado tangível</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#052254] sm:text-5xl">Um plano que organiza sua ideia e abre caminhos.</h2>
              <p className="mt-6 text-lg leading-8 text-[#50635b]">Ao concluir a jornada, você pode gerar um documento estruturado para apresentar sua visão com mais clareza e confiança.</p>
              <ul className="mt-8 space-y-4">
                {planFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#052254]/85"><Check className="mt-0.5 size-5 shrink-0 text-[#329314]" />{item}</li>
                ))}
              </ul>
              <div className="mt-9 border-l-4 border-[#329314] bg-white p-5 shadow-sm">
                <div className="flex items-end gap-2">
                  <strong className="text-3xl font-extrabold text-[#329314]">R$ 29,90</strong>
                  <span className="pb-1 text-sm font-semibold text-[#50635b]">pagamento único</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#50635b]">Pagamento único, somente ao final da jornada, para gerar, baixar ou imprimir seu Plano de Negócios.</p>
              </div>
            </div>
            <BusinessPlanDocument />
          </div>
        </section>

        <section id="microcredito" className="scroll-mt-20 bg-white py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.78fr_1.22fr] lg:px-8">
            <div>
              <span className="grid size-14 place-items-center bg-[#e5f0ea] text-[#329314]"><Landmark className="size-7" /></span>
              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.14em] text-[#329314]">Orientação ao microcrédito</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#052254] sm:text-5xl">Prepare-se para buscar crédito com mais segurança.</h2>
              <p className="mt-6 text-lg leading-8 text-[#50635b]">Entenda quais informações organizar, avalie a preparação do seu negócio e chegue mais bem informado à conversa com instituições financeiras.</p>
              <Button onClick={onStart} size="lg" className="mt-8">
                Começar minha preparação <ArrowRight className="ml-2 inline size-5" />
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

        <section id="para-quem" className="scroll-mt-20 bg-[#eef5f1] py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Para quem é"
              title="Feita para quem quer começar com clareza"
              description="Não importa se você ainda está só com uma ideia ou já deu os primeiros passos."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {audiences.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.label} className="group border border-[#d8e7df] bg-white p-7 transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center bg-[#e5f0ea] text-[#329314]"><Icon className="size-6" /></span>
                      <ArrowRight className="size-5 text-[#50635b] transition-transform group-hover:translate-x-1 group-hover:text-[#329314]" />
                    </div>
                    <p className="mt-7 text-xs font-bold uppercase tracking-[0.12em] text-[#329314]">{item.label}</p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight">{item.title}</h3>
                    <p className="mt-4 leading-7 text-[#50635b]">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="diferenciais" className="scroll-mt-20 bg-white py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#329314]">Por que Educa Impacto</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#052254] sm:text-5xl">Menos teoria solta. Mais negócio construído.</h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-[#50635b]">Uma experiência acolhedora que respeita seu ritmo, valoriza sua realidade e mantém o foco no que você pode colocar em prática.</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-[#d8e7df] bg-[#d8e7df] sm:grid-cols-2">
              {benefits.map(([title, text, Icon]) => (
                <article key={title} className="bg-white p-7 sm:p-8">
                  <Icon className="size-7 text-[#329314]" />
                  <h3 className="mt-6 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-[#50635b]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#052254] to-[#0A5740] py-20">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <h2 className="text-4xl font-extrabold text-white md:text-5xl">O futuro do empreendedorismo será inclusivo.</h2>
            <p className="mt-6 text-xl text-[#e5f0ea]">Inicie pelo diagnóstico e veja sua ideia ganhar forma em uma trilha guiada.</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="secondary" size="lg" onClick={onStart}>
                Iniciar minha jornada <ArrowRight className="ml-2 inline size-5" />
              </Button>
              <button type="button" onClick={onOpenModules} className="font-semibold text-white underline-offset-4 hover:underline">
                Ver módulos sem responder agora
              </button>
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
