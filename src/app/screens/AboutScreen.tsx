import React from 'react';
import { ArrowRight, BrainCircuit, CheckCircle2, FileText, GraduationCap, HandHeart, Target } from 'lucide-react';
import { Button } from '../components/Button';
import { BrandLogo } from '../components/BrandLogo';

interface AboutScreenProps {
  onStart: () => void;
  onOpenModules: () => void;
}

export function AboutScreen({ onStart, onOpenModules }: AboutScreenProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#f5faf7] to-white">
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
        <div className="flex justify-center lg:justify-start">
          <div className="rounded-3xl border border-[#dbe9e2] bg-white p-8 shadow-xl">
            <BrandLogo className="h-36 w-auto sm:h-44 lg:h-52" />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#329314]">Quem somos</p>
          <h1 className="mb-6 text-4xl font-bold text-[#06173C] sm:text-5xl">
            Educação empreendedora para transformar ideias em negócios possíveis.
          </h1>
          <p className="mb-5 text-lg leading-8 text-gray-700">
            A Educa Impacto nasceu para apoiar pessoas que querem empreender, mas precisam de uma trilha clara,
            linguagem acessível e orientação prática para sair da ideia e chegar a um plano de negócios.
          </p>
          <p className="text-lg leading-8 text-gray-700">
            A plataforma combina diagnóstico, missões guiadas, gamificação leve e apoio de IA para organizar
            respostas importantes sobre cliente, problema, solução, operação, custos e receita.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={onStart} size="lg">
              Começar diagnóstico
              <ArrowRight className="ml-2 inline h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={onOpenModules}>
              Ver módulos
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dbe9e2] bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              icon: GraduationCap,
              title: 'Aprender',
              text: 'Conteúdos curtos e perguntas simples para entender os fundamentos do negócio.',
            },
            {
              icon: Target,
              title: 'Empreender',
              text: 'Missões que transformam reflexão em respostas úteis para validar e estruturar a ideia.',
            },
            {
              icon: HandHeart,
              title: 'Transformar',
              text: 'Um caminho para gerar autonomia, clareza e oportunidades com apoio de tecnologia.',
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl bg-[#f5faf7] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#052254] to-[#329314] text-white">
                <item.icon className="h-6 w-6" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-[#06173C]">{item.title}</h2>
              <p className="leading-7 text-gray-700">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-[#06173C]">O que estamos construindo</h2>
            <p className="leading-8 text-gray-700">
              Uma experiência quase conversacional, onde a IA ajuda a organizar as informações que a pessoa fornece
              durante a jornada e transforma esses dados em um plano de negócios estruturado.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Diagnóstico para entender o ponto de partida do empreendedor.',
              'Módulos editáveis com perguntas ligadas à estrutura do plano.',
              'Sincronização das respostas com o Supabase para manter o progresso salvo.',
              'Base de dados pronta para alimentar a IA no momento de gerar o plano.',
            ].map((text) => (
              <div key={text} className="flex items-start gap-3 rounded-2xl border border-[#dbe9e2] bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#329314]" />
                <p className="text-sm font-medium text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#052254] via-[#0A5740] to-[#329314] py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-center gap-4">
            <BrainCircuit className="h-9 w-9" />
            <span className="font-bold">IA como apoio</span>
          </div>
          <div className="flex items-center gap-4">
            <FileText className="h-9 w-9" />
            <span className="font-bold">Plano estruturado</span>
          </div>
          <div className="flex items-center gap-4">
            <Target className="h-9 w-9" />
            <span className="font-bold">Foco em ação prática</span>
          </div>
        </div>
      </section>
    </main>
  );
}
