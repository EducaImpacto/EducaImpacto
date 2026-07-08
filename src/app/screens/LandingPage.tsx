import React from 'react';
import { Button } from '../components/Button';
import { Brain, CheckCircle2, ClipboardCheck, FileText, Lightbulb, Medal, PenLine, Rocket, Sparkles, Target, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BrandLogo } from '../components/BrandLogo';

interface LandingPageProps {
  onStart: () => void;
  onOpenModules: () => void;
}

export function LandingPage({ onStart, onOpenModules }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5faf7]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <BrandLogo />
            <div className="hidden items-center gap-3 sm:flex">
              <Button variant="outline" onClick={onOpenModules} size="md">Ver módulos</Button>
              <Button onClick={onStart} size="md">Começar Diagnóstico</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-88px)] flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Do Sonho ao <span className="text-[#052254]">Negócio</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comece pelo diagnóstico, avance por missões práticas e construa um plano de negócios com apoio de IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onStart} size="lg">
                Começar Diagnóstico
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onOpenModules}
              >
                Ir direto aos módulos
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Medal className="w-5 h-5 text-[#329314]" />
                <span>XP e insígnias</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#052254]" />
                <span>Apoio de IA</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#329314]" />
                <span>Plano estruturado</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#052254] via-[#0A5740] to-[#329314] rounded-2xl transform rotate-3 opacity-20"></div>
            <ImageWithFallback
              src="/empreendedor.jpg"
              alt="Empreendedor usando tecnologia [1200x1000]"
              className="rounded-2xl shadow-2xl relative z-10 w-full"
            />
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-600">Uma jornada iniciante para sair da ideia e chegar ao plano de negócios</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Linha de Progresso */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-[#B2C9BF] via-[#329314] to-[#7CAF70] transform translate-y-1/2" style={{ width: 'calc(100% - 8rem)', left: '4rem' }}></div>
            
            <div className="relative bg-[#f5faf7] rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#052254] to-[#0A5740] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ClipboardCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Diagnóstico</h3>
              <p className="text-gray-600">
                Responda perguntas rápidas para identificar seu ponto de partida na jornada.
              </p>
            </div>

            <div className="relative bg-[#f5faf7] rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0A5740] to-[#329314] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Aprenda</h3>
              <p className="text-gray-600">
                Veja conceitos essenciais de empreendedorismo em conteúdos curtos e objetivos.
              </p>
            </div>

            <div className="relative bg-[#f5faf7] rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#052254] to-[#329314] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <PenLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Aplique em Missões</h3>
              <p className="text-gray-600">
                Transforme o aprendizado em respostas sobre cliente, problema, solução e operação.
              </p>
            </div>

            <div className="relative bg-[#f5faf7] rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#329314] to-[#0A5740] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Gere seu Plano</h3>
              <p className="text-gray-600">
                Ao final, suas respostas viram uma base estruturada de plano de negócios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-gradient-to-br from-[#f5faf7] to-[#f5faf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que Educa Impacto?</h2>
            <p className="text-xl text-gray-600">Uma experiência simples para quem está começando a empreender</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#e5f0ea] rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-[#052254]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Linguagem Simples</h3>
              <p className="text-gray-600 text-sm">Perguntas diretas e explicações claras para avançar sem travar.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#e5f0ea] rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-[#329314]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Construção Progressiva</h3>
              <p className="text-gray-600 text-sm">Cada missão coleta uma parte útil do seu futuro plano de negócios.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#e5f0ea] rounded-lg flex items-center justify-center mb-4">
                <Medal className="w-6 h-6 text-[#329314]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Gamificação Discreta</h3>
              <p className="text-gray-600 text-sm">XP, progresso e insígnias ajudam a manter a sensação de avanço.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#e5f0ea] rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-[#0A5740]" />
              </div>
              <h3 className="font-bold text-lg mb-2">IA de Apoio</h3>
              <p className="text-gray-600 text-sm">Sugestões para melhorar suas respostas durante a jornada.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#e5f0ea] rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-[#329314]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Plano Profissional</h3>
              <p className="text-gray-600 text-sm">Organização das respostas em uma estrutura de plano de negócios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Público-alvo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Para Quem é Esta Plataforma?</h2>
            <p className="text-xl text-gray-600">Para pessoas que querem começar com orientação prática</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#052254] to-[#329314] rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quem tem uma ideia</h3>
              <p className="text-gray-600">Organize o que você quer oferecer e entenda os primeiros passos.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#329314] to-[#0A5740] rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quem está começando do zero</h3>
              <p className="text-gray-600">Aprenda conceitos essenciais enquanto aplica tudo no seu negócio.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#329314] to-[#329314] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quem precisa validar</h3>
              <p className="text-gray-600">Transforme respostas soltas em uma visão mais clara e apresentável.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada Final */}
      <section className="py-20 bg-gradient-to-r from-[#052254] to-[#0A5740]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            O futuro do empreendedorismo será inclusivo.
          </h2>
          <p className="text-xl text-[#e5f0ea] mb-10">
            Inicie pelo diagnóstico e veja sua ideia ganhar forma em uma trilha guiada.
          </p>
          <Button variant="secondary" size="lg" onClick={onStart}>
            Iniciar minha jornada empreendedora
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </Button>
          <div className="mt-4">
            <button
              type="button"
              onClick={onOpenModules}
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              Ver módulos sem responder o diagnóstico agora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <BrandLogo inverted />
            </div>
            <p className="text-sm">© 2026 EducaImpacto. Transformando ideias em negócios.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
