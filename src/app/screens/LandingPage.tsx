import React from 'react';
import { Button } from '../components/Button';
import { Lightbulb, Rocket, FileText, Users, Sparkles, Target, Award, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
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
            <Button onClick={onStart} size="md">Começar Agora</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Do Sonho ao <span className="text-blue-600">Negócio</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Construa seu plano de negócios com apoio da Inteligência Artificial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onStart} size="lg">
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
              <Button variant="outline" size="lg">
                Saiba Mais
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-500" />
                <span>Gamificado</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>IA Personalizada</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl transform rotate-3 opacity-20"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1765648763939-5cf190529964?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjB3b21hbiUyMHN0YXJ0dXAlMjBidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNjY1NDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Empreendedor usando tecnologia"
              className="rounded-2xl shadow-2xl relative z-10 w-full"
            />
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-600">Transforme sua ideia em realidade em 3 passos simples</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Linha de Progresso */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-orange-400 transform translate-y-1/2" style={{ width: 'calc(100% - 8rem)', left: '4rem' }}></div>
            
            <div className="relative bg-blue-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Aprenda</h3>
              <p className="text-gray-600">
                Microlearning prático com conteúdos diretos ao ponto sobre empreendedorismo
              </p>
            </div>

            <div className="relative bg-orange-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Aplique</h3>
              <p className="text-gray-600">
                Responda perguntas estratégicas sobre seu negócio de forma guiada
              </p>
            </div>

            <div className="relative bg-green-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Gere seu Plano</h3>
              <p className="text-gray-600">
                Receba um plano de negócios profissional em PDF pronto para usar
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
            <p className="text-xl text-gray-600">Tecnologia e educação para transformar vidas</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Microlearning Prático</h3>
              <p className="text-gray-600 text-sm">Aprenda no seu ritmo com conteúdos objetivos e aplicáveis</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">IA Personalizada</h3>
              <p className="text-gray-600 text-sm">Inteligência artificial adaptada às suas necessidades</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Gamificação</h3>
              <p className="text-gray-600 text-sm">Níveis, insígnias e XP para manter você motivado</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">PDF Profissional</h3>
              <p className="text-gray-600 text-sm">Documento completo pronto para apresentar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Público-alvo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Para Quem é Esta Plataforma?</h2>
            <p className="text-xl text-gray-600">Empreendedorismo inclusivo e acessível para todos</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mulheres Empreendedoras</h3>
              <p className="text-gray-600">Ferramentas e suporte para transformar ideias em negócios sustentáveis</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Jovens Empreendedores</h3>
              <p className="text-gray-600">Educação prática para iniciar sua jornada empreendedora</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Empreendedores por Necessidade</h3>
              <p className="text-gray-600">Transforme desafios em oportunidades com planejamento estratégico</p>
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
            Faça parte dessa transformação. Comece agora sua jornada empreendedora.
          </p>
          <Button variant="secondary" size="lg" onClick={onStart}>
            Começar Minha Jornada
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </Button>
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
