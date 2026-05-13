# Educa Impacto

Plataforma de trilha empreendedora com gamificacao, missoes e consolidacao de respostas em um plano de negocios.

## Requisitos

- Node.js 18+
- npm 9+

## Como rodar o projeto

1. Instale as dependencias:

```bash
npm install
```

2. Inicie em modo desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador o endereco exibido pelo Vite (normalmente `http://localhost:5173`).

## Build de producao

```bash
npm run build
```

O resultado sera gerado na pasta `dist/`.

## Leitura rapida da arquitetura

Fluxo principal:

1. `landing`
2. `diagnostic`
3. `onboarding`
4. `mission` (4 modulos x 5 missoes)
5. `etapa-concluida` (resumo ao fim de cada modulo)
6. `business-plan` (consolidacao final das respostas)

Arquivo de orquestracao de estado e navegação:

- `src/app/App.tsx`

Telas principais:

- `src/app/screens/LandingPage.tsx`
- `src/app/screens/DiagnosticScreen.tsx`
- `src/app/screens/OnboardingScreen.tsx`
- `src/app/screens/MissionScreen.tsx`
- `src/app/screens/ModuleCompletedScreen.tsx`
- `src/app/screens/BusinessPlanScreen.tsx`

Componentes reutilizaveis:

- `src/app/components/`
- `src/app/components/ui/` (biblioteca base de UI)

Estilos:

- `src/styles/index.css`
- `src/styles/theme.css`
- `src/styles/tailwind.css`

## Como o plano de negocios e montado hoje

- As respostas das 20 missoes ficam no estado em `App.tsx`.
- Ao final, as respostas sao enviadas para `BusinessPlanScreen`.
- A tela final organiza em 4 blocos de 5 respostas:
  - Contexto do Negocio
  - Cliente
  - Problema
  - Solucao e Viabilidade

## Edicao de respostas no final da trilha

- Cada card de resposta na tela final possui acao `Editar`.
- Ao clicar, o app abre a missao especifica em modo de edicao.
- Ao salvar, retorna direto para o plano sem reiniciar a trilha.

## Observacoes importantes

- O botao `Baixar PDF` ainda e placeholder (nao gera PDF real nesta versao).
- O botao de `Compartilhar` tambem esta como placeholder.