export function normalizeAnswer(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

export function checkAnswer(guess: string, answer: string, accepted: string[] = []): boolean {
  const normalized = normalizeAnswer(guess);
  const targets = [answer, ...accepted].map(normalizeAnswer);
  return targets.some((target) => normalized === target);
}
