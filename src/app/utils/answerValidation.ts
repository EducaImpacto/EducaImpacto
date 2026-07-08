export function getAnswerValidationMessage(answer: string): string | null {
  const trimmed = answer.trim();
  const letters = trimmed.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g) ?? [];
  const words = trimmed
    .split(/\s+/)
    .map((word) => word.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9]/g, ''))
    .filter((word) => word.length >= 2);
  const uniqueLetters = new Set(letters.map((letter) => letter.toLowerCase()));

  if (!trimmed) return 'Escreva uma resposta para continuar.';
  if (letters.length < 12 || words.length < 3) {
    return 'Responda com uma frase curta e concreta, usando pelo menos algumas palavras.';
  }
  if (uniqueLetters.size <= 2) {
    return 'A resposta parece incompleta. Conte um pouco mais sobre sua ideia.';
  }

  return null;
}

export function isAdequateAnswer(answer: string | undefined): boolean {
  return !getAnswerValidationMessage(answer ?? '');
}
