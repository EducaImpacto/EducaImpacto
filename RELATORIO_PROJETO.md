# 📋 Relatório do Projeto Educa Impacto - Monolito

**Data:** 01 de Setembro de 2026  
**Versão:** 0.0.1  
**Status:** Em Desenvolvimento

---

## 📌 Visão Geral

**Educa Impacto** é uma plataforma web de trilha empreendedora com gamificação, missões e consolidação de respostas em um plano de negócios. O projeto é um monolito frontend construído com React + Vite, integrado com Supabase como backend.

### Propósito
Oferecer uma jornada educativa interativa para empreendedores, guiando-os através de 4 módulos com 5 missões cada (20 missões total) que culminam na geração de um plano de negócios personalizado.

---

## 🏗️ Stack Tecnológico

### Frontend
- **Framework:** React 18.3.1 com TypeScript
- **Build Tool:** Vite 6.3.5
- **Styling:** Tailwind CSS 4.1.12 + Emotion (para componentes MUI)
- **UI Components:** Material-UI 7.3.5 + Radix UI (primitivos acessíveis)
- **Forms:** React Hook Form 7.55.0
- **Routing:** React Router 7.13.0
- **Charts/Dados:** Recharts 2.15.2

### Backend & Banco de Dados
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **ORM/Client:** @supabase/supabase-js 2.110.1

### Deployment
- **Hosting:** Cloudflare Pages
- **Deploy Tool:** Wrangler CLI

### Bibliotecas Complementares
- `react-dnd` + `react-dnd-html5-backend` - Drag and drop
- `react-resizable-panels` - Painéis redimensionáveis
- `motion` - Animações
- `sonner` - Toast notifications
- `vaul` - Drawer component
- `date-fns` - Manipulação de datas
- `next-themes` - Dark mode
- `embla-carousel-react` - Carousel

---

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── App.tsx                    # Orquestrador principal de estado e navegação
│   ├── components/
│   │   ├── [Componentes Reutilizáveis]
│   │   │   ├── AppHeader.tsx      # Cabeçalho global
│   │   │   ├── AppFooter.tsx      # Rodapé global
│   │   │   ├── AuthModal.tsx      # Modal de autenticação
│   │   │   ├── ProgressBar.tsx    # Barra de progresso
│   │   │   ├── LevelIndicator.tsx # Indicador de nível/XP
│   │   │   ├── ModuleCard.tsx     # Card de módulo
│   │   │   ├── Badge.tsx          # Badge reutilizável
│   │   │   ├── Button.tsx         # Botão customizado
│   │   │   ├── BrandLogo.tsx      # Logo da marca
│   │   │   ├── MicroContentCard.tsx
│   │   │   └── ui/                # Biblioteca de UI primitivos
│   │   │       ├── tabs.tsx
│   │   │       ├── checkbox.tsx
│   │   │       ├── form.tsx
│   │   │       ├── slider.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── drawer.tsx
│   │   │       ├── popover.tsx
│   │   │       └── [30+ componentes Radix UI]
│   │   └── figma/                 # Componentes importados do Figma
│   │
│   ├── screens/                   # Telas principais da aplicação
│   │   ├── LandingPage.tsx        # Página inicial
│   │   ├── AboutScreen.tsx        # Sobre a plataforma
│   │   ├── DiagnosticScreen.tsx   # Diagnóstico inicial do empreendedor
│   │   ├── OnboardingScreen.tsx   # Onboarding/Setup inicial
│   │   ├── DashboardScreen.tsx    # Dashboard de progresso
│   │   ├── MissionScreen.tsx      # Tela de execução de uma missão
│   │   ├── ModuleCompletedScreen.tsx # Resumo ao fim de cada módulo
│   │   ├── PersonalizedTrailScreen.tsx # Trilha personalizada
│   │   └── BusinessPlanScreen.tsx # Plano de negócios final
│   │
│   ├── services/
│   │   └── backendRepository.ts   # Camada de integração com Supabase
│   │       ├── CRUD para diagnóstico
│   │       ├── CRUD para respostas de missões
│   │       ├── Obtenção de histórico de planos
│   │       └── Geração de snapshots de plano
│   │
│   ├── lib/
│   │   ├── supabase.ts            # Configuração e inicialização Supabase
│   │   └── database.types.ts      # Tipos TypeScript gerados do schema Supabase
│   │
│   ├── utils/
│   │   └── answerValidation.ts    # Validação de respostas das missões
│   │
│   └── styles/
│       ├── index.css              # Estilos globais
│       ├── theme.css              # Variáveis de tema
│       ├── tailwind.css           # Configuração Tailwind
│       └── fonts.css              # Definição de fontes
│
├── imports/                       # HTML/Layout importados (possível do Figma)
│   ├── diagnostico.html
│   ├── educa-impacto-home.html
│   ├── educa-impacto-layout.md
│   ├── plano-negocio.html
│   └── trilha-personalizada.html
│
├── main.tsx                       # Entry point da aplicação
└── vite-env.d.ts                  # Tipos Vite
```

---

## 🎯 Fluxo Principal da Aplicação

A jornada do usuário segue este fluxo:

```
Landing Page
    ↓
Diagnostic (avaliação inicial)
    ↓
Onboarding (setup de projeto)
    ↓
Dashboard (visualização de progresso)
    ↓
4 Módulos × 5 Missões cada (20 missões total)
│
├─ Módulo 1: Contexto do Negócio (5 missões)
├─ Módulo 2: Cliente (5 missões)
├─ Módulo 3: Problema (5 missões)
└─ Módulo 4: Solução e Viabilidade (5 missões)
    ↓
Module Completed Screen (resumo ao fim de cada módulo)
    ↓
Business Plan Screen (consolidação final - versão legível)
    ↓
PDF Download / Compartilhamento
```

### Telas Principais

| Tela | Arquivo | Propósito |
|------|---------|----------|
| Landing | `LandingPage.tsx` | Página inicial, chamada à ação |
| Diagnóstico | `DiagnosticScreen.tsx` | Avaliação do nível de conhecimento empreendedor |
| Onboarding | `OnboardingScreen.tsx` | Setup inicial do projeto/negócio |
| Dashboard | `DashboardScreen.tsx` | Visão geral de progresso e histórico de planos |
| Missão | `MissionScreen.tsx` | Interface para responder uma missão específica |
| Módulo Concluído | `ModuleCompletedScreen.tsx` | Resumo das 5 respostas de um módulo |
| Plano de Negócios | `BusinessPlanScreen.tsx` | Consolidação final em 4 blocos de 5 respostas cada |
| Sobre | `AboutScreen.tsx` | Informações sobre a plataforma |
| Trilha Personalizada | `PersonalizedTrailScreen.tsx` | (Em desenvolvimento) |

---

## 🎮 Sistema de Gamificação

### XP (Experiência)
- Cada missão concedida gera XP ao usuário
- Missão padrão = 50 XP
- Sistema de nível vinculado à quantidade total de XP acumulado

### Badges
- Cada módulo concluído concede um badge
- Exemplo: "Contexto Definido" ao completar o módulo de Contexto

### Progresso Visual
- `ProgressBar.tsx` - Mostra % de conclusão
- `LevelIndicator.tsx` - Mostra nível e XP atual

---

## 💾 Estrutura de Dados

### Dados Salvos no Supabase

#### 1. **Usuário (Autenticação)**
- Gerenciado por Supabase Auth
- Email, senha, perfil básico

#### 2. **Projeto de Negócio**
```
projects {
  id (UUID)
  user_id (FK → auth.users)
  name (string)
  created_at
  updated_at
}
```

#### 3. **Diagnóstico**
```
diagnostics {
  id (UUID)
  project_id (FK → projects)
  [campos de resposta do diagnóstico]
  created_at
  updated_at
}
```

#### 4. **Respostas de Missões**
```
mission_answers {
  id (UUID)
  project_id (FK → projects)
  mission_id (number)
  answer (text)
  created_at
  updated_at
}
```

#### 5. **Snapshots de Plano de Negócios**
```
business_plan_snapshots {
  id (UUID)
  project_id (FK → projects)
  title (string)
  content (JSON)
  created_at
}
```

---

## 🔄 Fluxo de Estado e Persistência

### Estado Local (React)
- **App.tsx** centraliza todo o estado da aplicação
- Estado de tela atual
- Respostas do diagnóstico
- Respostas das missões
- Dados do usuário autenticado

### Persistência no Backend
- `backendRepository.ts` fornece funções para CRUD
- Funções principais:
  - `getOrCreateDefaultBusinessProject()` - Cria ou obtém projeto padrão
  - `getProjectDiagnostic()` - Busca diagnóstico
  - `upsertDiagnostic()` - Salva/atualiza diagnóstico
  - `getProjectMissionAnswers()` - Busca todas respostas de missões
  - `upsertMissionAnswer()` - Salva/atualiza resposta de missão
  - `getProjectBusinessPlans()` - Busca histórico de planos salvos
  - `createBusinessPlanSnapshot()` - Cria nova versão do plano

### Validação de Respostas
- `answerValidation.ts` - Função `isAdequateAnswer()` valida se resposta tem comprimento mínimo

---

## 🚀 Scripts Disponíveis

```bash
npm run dev              # Inicia servidor Vite (localhost:5173)
npm run build            # Build para produção em dist/
npm run deploy           # Deploy para Cloudflare Pages
npm run domain:add       # Adiciona domínio no Cloudflare
npm run domain:point     # Aponta DNS para Cloudflare Pages
npm run domain:status    # Verifica status do domínio
```

---

## 🔐 Autenticação

### Fluxo de Login
1. Usuário clica em "Login" ou tenta acessar trilha
2. `AuthModal.tsx` exibe formulário (email + senha)
3. Supabase Auth processa autenticação
4. Em sucesso: cria/obtém projeto padrão
5. Em falha: exibe mensagem de erro

### Token & Sessão
- Gerenciado automaticamente por `@supabase/supabase-js`
- Refresh token armazenado localmente
- Sessão persiste ao recarregar página

---

## ✍️ Edição de Respostas

### Feature: Editar Missão
- Cada card de resposta na tela final (Business Plan) possui ação "Editar"
- Ao clicar, abre `MissionScreen.tsx` em modo de edição
- Usuário edita a resposta original
- Ao salvar, retorna direto para Business Plan **sem reiniciar a trilha**

---

## 📊 Plano de Negócios

### Estrutura de Organização
O plano final organiza as 20 respostas em 4 blocos:

| Bloco | Módulo | Missões | Respostas |
|-------|--------|---------|-----------|
| 1 | Contexto do Negócio | 1-5 | 5 respostas sobre ideia, experiência, começo, etc |
| 2 | Cliente | 6-10 | 5 respostas sobre quem é o cliente ideal |
| 3 | Problema | 11-15 | 5 respostas sobre problema e necessidade |
| 4 | Solução e Viabilidade | 16-20 | 5 respostas sobre solução e viabilidade |

### Geração de Snapshots
- Cada vez que usuário completa a trilha, um snapshot é criado
- Snapshots são armazenados em `business_plan_snapshots`
- Dashboard mostra histórico de todas versões geradas

---

## 📝 Notas Importantes & TODOs

### ✅ Implementado
- ✓ Fluxo completo de trilha (landing → diagnostic → onboarding → missions → business-plan)
- ✓ Sistema de gamificação (XP, badges, progresso visual)
- ✓ Integração Supabase Auth (login/logout)
- ✓ Persistência de diagnóstico e respostas no banco
- ✓ Edição de respostas individuais
- ✓ Histórico de planos salvos
- ✓ Validação básica de respostas

### ⏳ Em Desenvolvimento / Placeholders
- ⏳ **Geração de PDF** - Botão "Baixar PDF" é placeholder (não gera PDF real nesta versão)
- ⏳ **Compartilhamento** - Botão "Compartilhar" também é placeholder
- ⏳ **Trilha Personalizada** - `PersonalizedTrailScreen.tsx` iniciado mas não integrado ao fluxo
- ⏳ **AI-powered Plano** - Possível próximo passo: usar IA para gerar plano profissional a partir das respostas

### 🐛 Possíveis Melhorias
- [ ] Implementar real PDF generation (usar library como `pdfkit` ou `jsPDF`)
- [ ] Implementar compartilhamento por link (gerar ID compartilhável)
- [ ] Adicionar análise de progresso (gráficos, comparações)
- [ ] Melhorar UX mobile (layout responsivo em telas pequenas)
- [ ] Adicionar undo/redo para edições
- [ ] Notificações em tempo real
- [ ] Export em múltiplos formatos (PDF, DOCX, JSON)

---

## 📦 Dependências Principais

### UI & Componentes (40+ libs)
- Radix UI (30+ primitivos)
- Material-UI
- Emotion (CSS-in-JS)
- Tailwind CSS

### Funcionalidades
- React Router - Roteamento
- React Hook Form - Formulários
- React DnD - Drag and drop
- Recharts - Gráficos
- Motion - Animações
- Sonner - Toasts
- Date-fns - Datas

### Backend
- Supabase JS Client

### Build
- Vite
- Tailwind CSS Vite Plugin

---

## 🔗 Arquivos Críticos

| Arquivo | Linhas | Crítico? | Descrição |
|---------|--------|----------|-----------|
| `App.tsx` | ~400 | 🔴 CRÍTICO | Orquestra todo o estado e navegação |
| `backendRepository.ts` | ? | 🔴 CRÍTICO | Todas operações com Supabase |
| `BusinessPlanScreen.tsx` | ? | 🟠 ALTO | Tela final de consolidação |
| `MissionScreen.tsx` | ? | 🟠 ALTO | Interface de resposta de missão |
| `index.html` | 30 | 🟡 MÉDIO | Entry point HTML |
| Telas dos Screens | ~2171 (total) | 🟡 MÉDIO | Cada tela da jornada |

---

## 🚢 Deployment

### Configuração Cloudflare Pages
- Projeto: `educaimpacto`
- Comando build: `npm run build`
- Pasta output: `dist/`

### Domínio
- Scripts disponíveis para gerenciar DNS com Cloudflare
- `npm run domain:status` para verificar configuração

---

## 📞 Contato & Atribuições

- **Email:** educaimpactobr@gmail.com
- **Versão do Node.js:** 18+
- **Versão npm:** 9+

Veja `ATTRIBUTIONS.md` para atribuições de código externo.

---

## 📅 Histórico de Commits Recentes

```
c56a3327 ix
8b008594 Prepara plano profissional para IA
82139d6f Gera PDF MVP do plano
ef553fe3 Renova bundle apos propagacao de cache
c07dd5ce Corrige cache de assets no dominio
c310af2e Mostra historico de planos salvos
b788f0d5 Melhora fluxo de login para gerar plano
aef043ee Mantem assets antigos para cache do site
bbf4a072 Atualiza logo horizontal em PNG
8123bb18 Prepara backend para geracao de plano
b4d05d36 Adiciona login e sincronizacao Supabase
5f923d4c Forca nova versao do CSS publicado
117a862f Conecta front ao Supabase
33773aad Adiciona schema inicial do Supabase
```

---

## 🎓 Como Usar Este Relatório

1. **Para novos developers:** Use como onboarding da arquitetura
2. **Para planejamento:** Identifique features em desenvolvimento e TODOs
3. **Para debug:** Consulte estrutura de dados e fluxo de estado
4. **Para deploy:** Veja seção de Scripts e Deployment

---

**Gerado em:** 01 de Setembro de 2026  
**Status:** Atualizado ✓
