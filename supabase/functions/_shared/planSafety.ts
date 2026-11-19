export const safetyMessage = 'Esta proposta envolve risco à segurança. Escolha uma atividade segura para continuar.';

export function isUnsafeProposal(value: string): boolean {
  const normalized = value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/\s+/g, ' ')
    .replace(/\bbombas?\s+(?:(?:de|d['’])\s*)?(?:agua|chocolate|combustivel|calor|ar|hidraulicas?)\b/g, ' ');
  return [
    /\b(armas?|armamentos?|municao|municoes|explosivos?|pistolas?|fuzil|fuzis|revolver(es)?|granadas?|bombas?)\b/,
    /\b(ferir|matar|envenenar|assassinar|atacar|machucar|atingir|explodir) (?:[a-z]+ ){0,3}(pessoas|multidoes|aglomeracoes|comunidades|vitimas|inocentes|alguem|escolas|civis)\b/,
    /\b(atentados?|assassinatos? (por encomenda|de aluguel)|trafico de (armas|drogas|pessoas))\b/,
  ].some(rule => rule.test(normalized));
}

export function hasUnsafePlanText(value: unknown): boolean {
  if (typeof value === 'string') return isUnsafeProposal(value);
  if (value && typeof value === 'object') return Object.values(value).some(hasUnsafePlanText);
  return false;
}
