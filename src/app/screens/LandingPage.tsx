import React from 'react';
import { Button } from '../components/Button';
import { Brain, CheckCircle2, ClipboardCheck, FileText, Lightbulb, Medal, PenLine, Rocket, Sparkles, Target, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface LandingPageProps {
  onStart: () => void;
  onOpenModules: () => void;
}

export function LandingPage({ onStart, onOpenModules }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">Educa Impacto</span>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <Button variant="outline" onClick={onOpenModules} size="md">Ver módulos</Button>
              <Button onClick={onStart} size="md">Começar Diagnóstico</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-5">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-semibold">Demonstração MVP da trilha iniciante</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Do Sonho ao <span className="text-blue-600">Negócio</span>
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
                <Medal className="w-5 h-5 text-orange-500" />
                <span>XP e insígnias</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>Apoio de IA</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                <span>Plano estruturado</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl transform rotate-3 opacity-20"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1765648763939-5cf190529964?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjB3b21hbiUyMHN0YXJ0dXAlMjBidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNjY1NDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Empreendedor usando tecnologia"
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
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-orange-400 to-green-400 transform translate-y-1/2" style={{ width: 'calc(100% - 8rem)', left: '4rem' }}></div>
            
            <div className="relative bg-blue-50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ClipboardCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Diagnóstico</h3>
              <p className="text-gray-600">
                Responda perguntas rápidas para identificar seu ponto de partida na jornada.
              </p>
            </div>

            <div className="relative bg-orange-50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Aprenda</h3>
              <p className="text-gray-600">
                Veja conceitos essenciais de empreendedorismo em conteúdos curtos e objetivos.
              </p>
            </div>

            <div className="relative bg-purple-50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <PenLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Aplique em Missões</h3>
              <p className="text-gray-600">
                Transforme o aprendizado em respostas sobre cliente, problema, solução e operação.
              </p>
            </div>

            <div className="relative bg-green-50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que Educa Impacto?</h2>
            <p className="text-xl text-gray-600">Uma experiência simples para quem está começando a empreender</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Linguagem Simples</h3>
              <p className="text-gray-600 text-sm">Perguntas diretas e explicações claras para avançar sem travar.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Construção Progressiva</h3>
              <p className="text-gray-600 text-sm">Cada missão coleta uma parte útil do seu futuro plano de negócios.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Medal className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Gamificação Discreta</h3>
              <p className="text-gray-600 text-sm">XP, progresso e insígnias ajudam a manter a sensação de avanço.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">IA de Apoio</h3>
              <p className="text-gray-600 text-sm">Sugestões para melhorar suas respostas durante a jornada.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-emerald-600" />
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
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quem tem uma ideia</h3>
              <p className="text-gray-600">Organize o que você quer oferecer e entenda os primeiros passos.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quem está começando do zero</h3>
              <p className="text-gray-600">Aprenda conceitos essenciais enquanto aplica tudo no seu negócio.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quem precisa validar</h3>
              <p className="text-gray-600">Transforme respostas soltas em uma visão mais clara e apresentável.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            O futuro do empreendedorismo será inclusivo.
          </h2>
          <p className="text-xl text-blue-100 mb-10">
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
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Sparkles className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white">Educa Impacto</span>
            </div>
            <p className="text-sm">© 2026 Educa Impacto. Transformando ideias em negócios.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
