import type { Ad, Offer } from "@/types/intelligence";

const NA = "Não disponível";
const FORMULA_START = /^[=+\-@\t\r]/;

/** Neutraliza fórmulas de planilha prefixando um apóstrofo. */
export function neutralizeFormula(value: string): string {
  return FORMULA_START.test(value) ? `'${value}` : value;
}

/** Converte um valor em célula CSV segura: neutraliza fórmulas e escapa aspas, vírgulas e quebras de linha. */
export function escapeCsvCell(value: unknown): string {
  const text = neutralizeFormula(value === null || value === undefined ? "" : String(value));
  return /[",;\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function toCsv(rows: ReadonlyArray<ReadonlyArray<unknown>>): string {
  return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\r\n");
}

export const AD_CSV_HEADERS = [
  "Ad ID", "Anunciante", "Página", "Oferta", "Produto", "Copy", "Headline", "CTA",
  "Primeira observação pela nossa plataforma", "Tempo observado (dias)", "País", "Categoria",
  "URL pública", "Landing page", "Domínio", "Score de inteligência", "Tags",
] as const;

export function adsToCsv(list: readonly Ad[], offerList: readonly Offer[]): string {
  const rows = list.map((ad) => {
    const offer = offerList.find((o) => o.id === ad.offerId);
    return [
      ad.id, ad.advertiser, ad.page, ad.offerId, offer?.product ?? NA, ad.copy, ad.headline ?? NA, ad.cta ?? NA,
      ad.firstObservedAt, ad.observedDays, ad.country, ad.category, ad.publicUrl, ad.landingPage ?? NA,
      ad.domain ?? NA, offer ? offer.scores.overall : NA, ad.tags.join(" | "),
    ];
  });
  return toCsv([[...AD_CSV_HEADERS], ...rows]);
}

export function downloadCsv(filename: string, content: string) {
  const blob = new Blob(["\uFEFF", content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
