# Contrato para geracao do plano com IA

Este documento descreve o primeiro contrato entre o site Educa Impacto, o Supabase e a futura IA geradora de plano de negocios.

## Quando o payload e criado

O payload e criado quando a pessoa clica em **Gerar Plano de Negocios** depois de concluir as missoes.

Por enquanto, o front salva um registro em `public.business_plans` com `status = 'draft'`. Esse registro e a entrada que a IA deve consumir no proximo passo.

## Tabela

`public.business_plans`

Campos usados agora:

- `project_id`: projeto do usuario.
- `version`: versao incremental do plano naquele projeto.
- `title`: titulo do plano.
- `status`: `draft` enquanto ainda nao passou pela IA.
- `content`: corpo estruturado que a IA deve usar como base.
- `generated_from`: metadados da geracao e diagnostico.

## Formato atual de `content`

```json
{
  "format": "educa-impacto-business-plan-v1",
  "profile": "iniciante",
  "modules": [
    {
      "moduleId": 1,
      "moduleTitle": "Contexto do Negocio",
      "totalQuestions": 4,
      "answeredQuestions": 4,
      "missions": [
        {
          "missionId": 1,
          "missionTitle": "Sua ideia",
          "question": "Qual e a sua ideia de negocio?",
          "answer": "Resposta da pessoa",
          "planBlocks": ["Empreendedor e contexto", "Operacao basica", "Produto / Servico"]
        }
      ]
    }
  ],
  "sections": [
    "Sumario Executivo",
    "Cliente e Mercado",
    "Problema e Proposta de Valor",
    "Operacao",
    "Custos e Receita",
    "Proximos Passos"
  ]
}
```

## Formato atual de `generated_from`

```json
{
  "source": "educa-impacto-web",
  "generatedAt": "2026-07-27T00:00:00.000Z",
  "projectId": "uuid-do-projeto",
  "diagnostic": {
    "objetivo": "primeiro-negocio",
    "experiencia": "zero",
    "capacidadePlano": "precisaria-ajuda",
    "usoFerramentas": "nunca",
    "experienciaPlano": "nunca-contato",
    "nivel": "iniciante"
  },
  "totalQuestions": 19,
  "answeredQuestions": 19,
  "moduleQuestionCounts": [
    {
      "moduleId": 1,
      "title": "Contexto do Negocio",
      "total": 4
    }
  ]
}
```

## Proximo passo tecnico

Criar uma Edge Function ou API chamada `generate-business-plan` que:

1. Recebe `project_id` ou `business_plan_id`.
2. Busca o `business_plans` mais recente com `status = 'draft'`.
3. Envia `content` e `generated_from` para a IA.
4. Recebe o plano refinado.
5. Atualiza `business_plans.content` com o resultado final.
6. Muda `status` para `generated`.

## Observacoes

- A quantidade de perguntas por modulo nao deve ser fixa. Use sempre `totalQuestions` e `moduleQuestionCounts`.
- A IA deve preservar respostas originais e apenas organizar, complementar e sugerir melhorias.
- Antes de gerar PDF, o resultado deve ficar salvo no Supabase.
