/**
 * Aceita apenas URLs absolutas com protocolo https.
 * Qualquer outro protocolo (javascript:, data:, http:, etc.) ou valor inválido devolve null.
 */
export function safeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
