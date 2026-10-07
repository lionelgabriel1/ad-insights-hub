import type {
  Ad, AdFormat, Advertiser, Alert, ChangeEvent, Creative, CreativeAnalysis, CreativeTag, DomainSummary,
  ExtensionDiagnostics, IntelligenceScores, LandingPage, Offer, SearchSession,
} from "@/types/intelligence";

/** Exemplo explícito: todos os valores abaixo são dados de demonstração. */
export const NA = "Não disponível";
export const REFERENCE_DATE = "2026-10-05";

export const formatDate = (value: string | null | undefined) =>
  value ? new Intl.DateTimeFormat("pt-BR").format(new Date(`${value.slice(0, 10)}T12:00:00`)) : NA;
export const formatDateTime = (value: string | null | undefined) =>
  value ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value)) : NA;

const at = <T,>(list: readonly T[], index: number): T => list[index % list.length] as T;
const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};
export const daysBetween = (a: string, b: string) =>
  Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 86_400_000) + 1;
const minDate = (a: string, b: string) => (a < b ? a : b);
export const slug = (v: string) => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const media = [
  "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1583743814966-8936f37f998a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
] as const;

interface OfferSeed {
  id: string; product: string; category: string; priceRange: string | null;
  platformStartDate: string | null; firstObservedAt: string; lastObservedAt: string;
  growth: number; confidence: number; monitored: boolean; favorite: boolean; note: string | null;
  scores: IntelligenceScores; evolution: Array<{ label: string; share: number }>;
  advertisers: string[]; countries: string[]; copies: string[]; headlines: string[]; ctas: Array<string | null>;
  media: string; analysis: CreativeAnalysis; tags: CreativeTag[][];
}

const seeds: OfferSeed[] = [
  { id: "of-001", product: "Sérum facial Vitamina C", category: "Beleza", priceRange: "R$ 89–129", platformStartDate: "2026-05-12", firstObservedAt: "2026-06-03", lastObservedAt: REFERENCE_DATE, growth: 38, confidence: 92, monitored: true, favorite: true, note: null,
    scores: { longevity: 88, creativeDiversity: 94, offerDensity: 86, growth: 82, landingPage: 79, copyStrength: 84, overall: 87 },
    evolution: [{ label: "Jun", share: .15 }, { label: "Jul", share: .3 }, { label: "Ago", share: .5 }, { label: "Set", share: .75 }, { label: "Out", share: 1 }],
    advertisers: ["Lumina Labs", "Derma Vita"], countries: ["Brasil", "Portugal"],
    copies: ["Uma rotina simples pode transformar a forma como você cuida da pele.", "Pele com aparência mais uniforme em poucas semanas de uso contínuo.", "Dermatologistas explicam por que a vitamina C entrou na rotina de tantas pessoas."],
    headlines: ["Cuidado diário, resultado visível", "Sua pele merece essa rotina", "O sérum que virou rotina"], ctas: ["Saiba mais", "Comprar agora", "Ver oferta"], media: media[0],
    analysis: { hook: "Rotina simples de cuidado com a pele", problem: "Pele sem uniformidade", desire: "Aparência mais uniforme", mechanism: "Vitamina C em sérum", offer: "Condição por tempo limitado", proof: "Menção a especialistas", cta: "Saiba mais" },
    tags: [["Demonstração", "Produto em uso"], ["Antes/depois", "Prova social"], ["Autoridade", "Lista de benefícios"]] },
  { id: "of-002", product: "Modelador sem costura", category: "Moda", priceRange: "R$ 119–189", platformStartDate: "2026-04-18", firstObservedAt: "2026-05-01", lastObservedAt: "2026-10-04", growth: 24, confidence: 87, monitored: false, favorite: false, note: "Acompanhar variação de domínio.",
    scores: { longevity: 91, creativeDiversity: 82, offerDensity: 76, growth: 69, landingPage: 73, copyStrength: 78, overall: 80 },
    evolution: [{ label: "Mai", share: .2 }, { label: "Jun", share: .35 }, { label: "Jul", share: .45 }, { label: "Ago", share: .65 }, { label: "Set", share: .8 }, { label: "Out", share: 1 }],
    advertisers: ["Forma Brasil", "Silhueta Store"], countries: ["Brasil"],
    copies: ["Conforto que acompanha cada movimento, sem marcar.", "Experimentei por uma semana e conto o que achei.", "Modela sem apertar: veja a comparação."],
    headlines: ["Vista e sinta a diferença", "Conforto o dia todo", "Sem costura, sem marcas"], ctas: ["Comprar agora", null, "Saiba mais"], media: media[1],
    analysis: { hook: "Experiência pessoal de uso", problem: "Peças que marcam e apertam", desire: "Conforto ao longo do dia", mechanism: "Tecido sem costura", offer: null, proof: "Relato em primeira pessoa", cta: "Comprar agora" },
    tags: [["UGC", "Testimonial"], ["Comparação", "Produto em uso"], ["Storytelling", "Problema/solução"]] },
  { id: "of-003", product: "Massageador portátil", category: "Bem-estar", priceRange: null, platformStartDate: null, firstObservedAt: "2026-07-11", lastObservedAt: "2026-10-02", growth: -12, confidence: 79, monitored: false, favorite: false, note: null,
    scores: { longevity: 67, creativeDiversity: 75, offerDensity: 71, growth: 42, landingPage: 81, copyStrength: 69, overall: 68 },
    evolution: [{ label: "Jul", share: .25 }, { label: "Ago", share: .6 }, { label: "Set", share: 1.15 }, { label: "Out", share: 1 }],
    advertisers: ["Vita Motion", "Relax Já"], countries: ["Brasil", "México"],
    copies: ["Relaxe onde estiver com uma experiência prática para o dia a dia.", "¿Tensión en la espalda? Prueba esta rutina de cinco minutos."],
    headlines: ["Seu momento de pausa", "Alívio em qualquer lugar"], ctas: [null, "Ver oferta"], media: media[2],
    analysis: { hook: "Pausa rápida no dia a dia", problem: "Tensão muscular", desire: "Relaxamento prático", mechanism: null, offer: null, proof: null, cta: "Ver oferta" },
    tags: [["Problema/solução", "Produto em uso"], ["Urgência", "Desconto"]] },
  { id: "of-004", product: "Garrafa térmica inteligente", category: "Casa", priceRange: "R$ 149–219", platformStartDate: "2026-08-02", firstObservedAt: "2026-08-09", lastObservedAt: REFERENCE_DATE, growth: 52, confidence: 84, monitored: true, favorite: false, note: null,
    scores: { longevity: 65, creativeDiversity: 88, offerDensity: 72, growth: 93, landingPage: 76, copyStrength: 80, overall: 82 },
    evolution: [{ label: "Ago", share: .15 }, { label: "Set", share: .55 }, { label: "Out", share: 1 }],
    advertisers: ["Casa Norte"], countries: ["Brasil"],
    copies: ["Sua bebida na temperatura certa por mais tempo.", "Mostra a temperatura na tampa. Simples assim.", "Últimas unidades com frete especial."],
    headlines: ["Temperatura sob controle", "A garrafa que mostra a temperatura", "Frete especial hoje"], ctas: ["Ver oferta", "Comprar agora", "Comprar agora"], media: media[3],
    analysis: { hook: "Temperatura exibida na tampa", problem: "Bebida esfria rápido", desire: "Temperatura certa por mais tempo", mechanism: "Sensor com visor na tampa", offer: "Frete especial", proof: null, cta: "Ver oferta" },
    tags: [["Demonstração", "Demonstração de resultado"], ["Promoção", "Urgência"], ["Lista de benefícios", "Produto em uso"]] },
];

export const landingPages: LandingPage[] = [
  { id: "lp-01", offerId: "of-001", url: "https://lumina-skin.com.br/vitamina-c", domain: "lumina-skin.com.br", title: "Sérum Vitamina C | Lumina", headline: "Cuidado diário, resultado visível", subheadline: "Rotina simples para pele com aparência uniforme", cta: "Comprar agora", price: "109,90", currency: "BRL", discount: "20% no primeiro pedido", benefits: ["Textura leve", "Uso diário", "Fórmula vegana"], features: ["30 ml", "Vitamina C estabilizada"], guarantee: "30 dias", socialProof: "Avaliações exibidas na página", faq: true, form: false, whatsapp: true, trustElements: ["Selo de site seguro", "Política de troca"], structure: ["Hero", "Benefícios", "Como usar", "Depoimentos", "FAQ", "Rodapé"], httpStatus: 200, https: true, technologies: ["Shopify", "Google Tag Manager"], speed: "Rápida", sectionCount: 6, firstObservedAt: "2026-06-03", lastObservedAt: REFERENCE_DATE },
  { id: "lp-02", offerId: "of-001", url: "https://dermavita.com/serum-c", domain: "dermavita.com", title: "Derma Vita — Sérum C", headline: "O sérum que virou rotina", subheadline: null, cta: "Ver oferta", price: "89,90", currency: "BRL", discount: null, benefits: ["Absorção rápida"], features: [], guarantee: null, socialProof: null, faq: false, form: true, whatsapp: false, trustElements: [], structure: ["Hero", "Oferta", "Formulário"], httpStatus: 200, https: true, technologies: ["WordPress", "WooCommerce"], speed: "Média", sectionCount: 3, firstObservedAt: "2026-09-28", lastObservedAt: REFERENCE_DATE },
  { id: "lp-03", offerId: "of-002", url: "https://formabrasil.com.br/modelador", domain: "formabrasil.com.br", title: "Modelador sem costura", headline: "Conforto o dia todo", subheadline: "Modela sem apertar", cta: "Comprar agora", price: "149,00", currency: "BRL", discount: "Leve 3, pague 2", benefits: ["Sem costura", "Não marca", "Respirável"], features: ["Tamanhos P ao GG", "3 cores"], guarantee: "Troca grátis", socialProof: "Fotos de clientes", faq: true, form: false, whatsapp: true, trustElements: ["Selo de site seguro"], structure: ["Hero", "Comparação", "Tabela de medidas", "Depoimentos", "FAQ"], httpStatus: 200, https: true, technologies: ["Shopify"], speed: "Rápida", sectionCount: 5, firstObservedAt: "2026-05-01", lastObservedAt: "2026-10-04" },
  { id: "lp-04", offerId: "of-003", url: "http://vitamotion.mx/masajeador", domain: "vitamotion.mx", title: null, headline: "Alivio en cualquier lugar", subheadline: null, cta: "Comprar", price: null, currency: "MXN", discount: null, benefits: [], features: [], guarantee: null, socialProof: null, faq: null, form: null, whatsapp: true, trustElements: [], structure: ["Hero", "Vídeo", "Botão de compra"], httpStatus: 301, https: false, technologies: [], speed: null, sectionCount: 3, firstObservedAt: "2026-07-20", lastObservedAt: "2026-10-02" },
  { id: "lp-05", offerId: "of-003", url: "https://vitamotion.com.br/relax", domain: "vitamotion.com.br", title: "Massageador portátil Vita Motion", headline: "Seu momento de pausa", subheadline: "Compacto e recarregável", cta: "Ver oferta", price: "199,90", currency: "BRL", discount: "Frete grátis", benefits: ["Portátil", "Recarregável"], features: ["6 níveis de intensidade"], guarantee: "90 dias", socialProof: null, faq: true, form: false, whatsapp: false, trustElements: ["Política de privacidade"], structure: ["Hero", "Benefícios", "Especificações", "FAQ"], httpStatus: 200, https: true, technologies: ["Nuvemshop"], speed: "Lenta", sectionCount: 4, firstObservedAt: "2026-07-11", lastObservedAt: "2026-10-01" },
  { id: "lp-06", offerId: "of-004", url: "https://casanorte.com.br/garrafa-smart", domain: "casanorte.com.br", title: "Garrafa térmica inteligente", headline: "A garrafa que mostra a temperatura", subheadline: "Visor de LED na tampa", cta: "Comprar agora", price: "179,00", currency: "BRL", discount: "15% via Pix", benefits: ["Mantém a temperatura", "Visor na tampa", "Inox"], features: ["500 ml", "Bateria de longa duração"], guarantee: "1 ano", socialProof: "Contador de pedidos", faq: true, form: false, whatsapp: true, trustElements: ["Selo de site seguro", "CNPJ no rodapé"], structure: ["Hero", "Demonstração", "Benefícios", "Comparação", "Garantia", "FAQ"], httpStatus: 200, https: true, technologies: ["Shopify", "Hotjar"], speed: "Rápida", sectionCount: 6, firstObservedAt: "2026-08-09", lastObservedAt: REFERENCE_DATE },
];

export const searchSessions: SearchSession[] = [
  { id: "ss-01", query: "shapewear", country: "Brasil", startedAt: "2026-10-05T09:12:00", endedAt: "2026-10-05T09:26:00", processedAds: 482, offers: 31, creatives: 126, filteredResults: 94, monitored: true, sinceLastObservation: { newAds: 12, removedAds: 3, newCreatives: 5, newOffers: 1 } },
  { id: "ss-02", query: "serum vitamina c", country: "Brasil", startedAt: "2026-10-04T14:05:00", endedAt: "2026-10-04T14:18:00", processedAds: 316, offers: 22, creatives: 89, filteredResults: 71, monitored: false, sinceLastObservation: null },
  { id: "ss-03", query: "smart bottle", country: "Portugal", startedAt: "2026-10-03T11:30:00", endedAt: "2026-10-03T11:38:00", processedAds: 144, offers: 12, creatives: 42, filteredResults: 35, monitored: false, sinceLastObservation: null },
  { id: "ss-04", query: "masajeador", country: "México", startedAt: "2026-10-02T18:40:00", endedAt: null, processedAds: 58, offers: 4, creatives: 17, filteredResults: 11, monitored: false, sinceLastObservation: null },
];

const offerPattern = [0, 0, 1, 0, 2, 1, 3, 0, 1, 2, 3, 0];
const formats: AdFormat[] = ["Vídeo", "Imagem", "Carrossel"];
const perOffer = new Map<string, number>();

export const ads: Ad[] = Array.from({ length: 48 }, (_, index) => {
  const seed = at(seeds, at(offerPattern, index));
  const k = perOffer.get(seed.id) ?? 0;
  perOffer.set(seed.id, k + 1);
  const advertiser = at(seed.advertisers, k);
  const country = at(seed.countries, k);
  const lps = landingPages.filter((lp) => lp.offerId === seed.id);
  const lp = index % 6 === 0 ? null : at(lps, k);
  const span = Math.max(1, daysBetween(seed.firstObservedAt, seed.lastObservedAt) - 4);
  const firstObservedAt = addDays(seed.firstObservedAt, (k * 9) % span);
  const active = index % 5 !== 3;
  const lastObservedAt = active ? seed.lastObservedAt : minDate(addDays(firstObservedAt, 6 + (k % 5) * 4), seed.lastObservedAt);
  const number = String(index + 1).padStart(4, "0");
  return {
    id: `ad-${number}`, advertiser, advertiserId: slug(advertiser), page: `${advertiser} Oficial`,
    copy: at(seed.copies, k), headline: index % 5 === 0 ? null : at(seed.headlines, k),
    description: index % 4 === 2 ? null : "Condição disponível por tempo limitado no site oficial.",
    cta: at(seed.ctas, k), format: at(formats, index), mediaUrl: seed.media,
    publicUrl: index === 13 ? "javascript:alert(1)" : `https://www.facebook.com/ads/library/?id=${100000 + index}`,
    active, country, category: seed.category, language: country === "México" ? "Espanhol" : "Português",
    links: lp ? [lp.url] : [], domain: lp?.domain ?? null, landingPage: lp?.url ?? null, landingPageId: lp?.id ?? null,
    offerId: seed.id, creativeId: `cr-${number}`, searchSessionId: at(searchSessions, index).id,
    platformStartDate: index % 7 === 0 ? null : addDays(firstObservedAt, -((index % 4) + 2)),
    firstObservedAt, lastObservedAt, observedDays: daysBetween(firstObservedAt, lastObservedAt),
    favorite: index % 9 === 0, note: index === 0 ? "Acompanhar novas variações de copy." : null,
    tags: [...at(seed.tags, k)],
  };
});

const unique = <T,>(list: T[]) => [...new Set(list)];

export const offers: Offer[] = seeds.map((seed) => {
  const list = ads.filter((a) => a.offerId === seed.id);
  return {
    id: seed.id, product: seed.product, category: seed.category, priceRange: seed.priceRange,
    adCount: list.length, creativeCount: unique(list.map((a) => a.creativeId)).length,
    advertiserCount: unique(list.map((a) => a.advertiser)).length,
    landingPageCount: unique(list.flatMap((a) => (a.landingPageId ? [a.landingPageId] : []))).length,
    countries: unique(list.map((a) => a.country)), confidence: seed.confidence, growth: seed.growth, scores: seed.scores,
    monitored: seed.monitored, favorite: seed.favorite, note: seed.note,
    evolution: seed.evolution.map((e) => ({ label: e.label, ads: Math.round(e.share * list.length) })),
    platformStartDate: seed.platformStartDate, firstObservedAt: seed.firstObservedAt, lastObservedAt: seed.lastObservedAt,
    observedDays: daysBetween(seed.firstObservedAt, seed.lastObservedAt),
  };
});

export const creatives: Creative[] = ads.map((ad, index) => {
  const seed = seeds.find((s) => s.id === ad.offerId)!;
  return {
    id: ad.creativeId, adId: ad.id, offerId: ad.offerId, advertiser: ad.advertiser, advertiserId: ad.advertiserId, format: ad.format,
    imageUrl: ad.format === "Vídeo" ? null : ad.mediaUrl, thumbnailUrl: ad.format === "Vídeo" ? ad.mediaUrl : null, videoUrl: null,
    durationSeconds: ad.format === "Vídeo" ? 15 + (index % 4) * 8 : null, text: ad.copy, headline: ad.headline, cta: ad.cta,
    country: ad.country, firstObservedAt: ad.firstObservedAt, observedDays: ad.observedDays, publicUrl: ad.publicUrl,
    analysis: { ...seed.analysis, hook: ad.headline ?? seed.analysis.hook, cta: ad.cta },
    tags: ad.tags.filter((t): t is CreativeTag => (seed.tags.flat() as string[]).includes(t)),
  };
});

const advertiserGrowth: Record<string, number | null> = { "lumina-labs": 41, "derma-vita": 65, "forma-brasil": 18, "silhueta-store": 27, "vita-motion": -9, "relax-ja": null, "casa-norte": 52 };

export const advertisers: Advertiser[] = unique(ads.map((a) => a.advertiserId)).map((id) => {
  const list = ads.filter((a) => a.advertiserId === id);
  const first = list.map((a) => a.firstObservedAt).sort()[0] ?? REFERENCE_DATE;
  const last = list.map((a) => a.lastObservedAt).sort().at(-1) ?? REFERENCE_DATE;
  return {
    id, name: list[0]?.advertiser ?? id, pages: unique(list.map((a) => a.page)), countries: unique(list.map((a) => a.country)),
    adCount: list.length, offerCount: unique(list.map((a) => a.offerId)).length, creativeCount: unique(list.map((a) => a.creativeId)).length,
    observedDays: daysBetween(first, last), growth: advertiserGrowth[id] ?? null, firstObservedAt: first, lastObservedAt: last,
  };
});

export const domains: DomainSummary[] = unique(landingPages.map((lp) => lp.domain)).map((domain) => {
  const pages = landingPages.filter((lp) => lp.domain === domain);
  const list = ads.filter((a) => a.domain === domain);
  return { domain, adCount: list.length, offerCount: unique(pages.map((p) => p.offerId)).length, landingPageCount: pages.length, https: pages.every((p) => p.https === true) ? true : pages.some((p) => p.https === false) ? false : null };
});

const offerEvents: ChangeEvent[] = [
  { id: "oe-01", entityKind: "offer", entityId: "of-001", date: "2026-10-05T10:42:00", type: "new_creative", description: "Uma nova variação em vídeo foi observada." },
  { id: "oe-02", entityKind: "offer", entityId: "of-001", date: "2026-09-28T08:05:00", type: "landing_page_change", description: "Uma landing page em novo domínio (dermavita.com) foi observada." },
  { id: "oe-03", entityKind: "offer", entityId: "of-001", date: "2026-09-20T15:30:00", type: "new_advertiser", description: "O anunciante Derma Vita passou a ser observado no agrupamento." },
  { id: "oe-04", entityKind: "offer", entityId: "of-001", date: "2026-09-02T11:00:00", type: "price_change", description: "O preço observado na landing page passou de R$ 129,90 para R$ 109,90." },
  { id: "oe-05", entityKind: "offer", entityId: "of-002", date: "2026-10-03T09:10:00", type: "domain_change", description: "O domínio de destino observado foi alterado." },
  { id: "oe-06", entityKind: "offer", entityId: "of-002", date: "2026-09-25T17:45:00", type: "removed_creative", description: "Um criativo deixou de ser observado." },
  { id: "oe-07", entityKind: "offer", entityId: "of-003", date: "2026-10-02T13:20:00", type: "removed_ad", description: "Três anúncios deixaram de ser observados." },
  { id: "oe-08", entityKind: "offer", entityId: "of-003", date: "2026-09-12T10:00:00", type: "copy_change", description: "O texto principal observado foi alterado." },
  { id: "oe-09", entityKind: "offer", entityId: "of-004", date: "2026-10-05T07:55:00", type: "new_ad", description: "Seis novos anúncios foram observados." },
  { id: "oe-10", entityKind: "offer", entityId: "of-004", date: "2026-09-30T19:15:00", type: "price_change", description: "Um desconto de 15% via Pix passou a ser observado." },
];

const adEvents: ChangeEvent[] = ads.flatMap((ad, i) => {
  const list: ChangeEvent[] = [{ id: `ae-${ad.id}-1`, entityKind: "ad", entityId: ad.id, date: `${ad.firstObservedAt}T09:00:00`, type: "new_ad", description: "Anúncio observado pela primeira vez pela nossa plataforma." }];
  if (i % 3 === 0) list.push({ id: `ae-${ad.id}-2`, entityKind: "ad", entityId: ad.id, date: `${minDate(addDays(ad.firstObservedAt, 5), ad.lastObservedAt)}T14:00:00`, type: "copy_change", description: "O texto principal observado foi alterado." });
  if (i % 4 === 1) list.push({ id: `ae-${ad.id}-3`, entityKind: "ad", entityId: ad.id, date: `${minDate(addDays(ad.firstObservedAt, 9), ad.lastObservedAt)}T16:00:00`, type: "landing_page_change", description: "A landing page de destino observada foi alterada." });
  if (i % 6 === 2) list.push({ id: `ae-${ad.id}-4`, entityKind: "ad", entityId: ad.id, date: `${minDate(addDays(ad.firstObservedAt, 3), ad.lastObservedAt)}T11:00:00`, type: "new_creative", description: "Uma nova variação de criativo foi observada." });
  if (!ad.active) list.push({ id: `ae-${ad.id}-5`, entityKind: "ad", entityId: ad.id, date: `${ad.lastObservedAt}T18:00:00`, type: "removed_ad", description: "O anúncio deixou de ser observado." });
  return list;
});

export const changeEvents: ChangeEvent[] = [...offerEvents, ...adEvents].sort((a, b) => b.date.localeCompare(a.date));
export const eventsFor = (kind: "ad" | "offer", id: string) => changeEvents.filter((e) => e.entityKind === kind && e.entityId === id);

export const alerts: Alert[] = [
  { id: "al-01", type: "new_creative", title: "Novo criativo", description: "Sérum facial Vitamina C recebeu uma nova variação em vídeo.", date: "2026-10-05T10:42:00", target: { kind: "offer", id: "of-001" } },
  { id: "al-02", type: "growth", title: "Crescimento", description: "Garrafa térmica inteligente teve aumento de anúncios observados.", date: "2026-10-05T08:00:00", target: { kind: "offer", id: "of-004" } },
  { id: "al-03", type: "new_activity", title: "Nova atividade", description: "A pesquisa monitorada “shapewear” recebeu 12 novos anúncios.", date: "2026-10-05T09:26:00", target: { kind: "session", id: "ss-01" } },
  { id: "al-04", type: "new_landing_page", title: "Nova landing page (mudança de domínio)", description: "Modelador sem costura passou a apontar para outro domínio.", date: "2026-10-03T09:10:00", target: { kind: "offer", id: "of-002" } },
  { id: "al-05", type: "decline", title: "Queda", description: "Massageador portátil teve redução de anúncios observados.", date: "2026-10-02T13:20:00", target: { kind: "offer", id: "of-003" } },
  { id: "al-06", type: "new_advertiser", title: "Novo anunciante", description: "Derma Vita passou a ser observado no agrupamento do sérum.", date: "2026-09-20T15:30:00", target: { kind: "advertiser", id: "derma-vita" } },
];

export const diagnostics: ExtensionDiagnostics = {
  version: "0.4.2", sessionsStarted: 27, sessionsCompleted: 24, processedAds: 6418, duplicates: 312, parsingErrors: 19,
  missingFields: [{ field: "Headline", count: 214 }, { field: "CTA", count: 167 }, { field: "Data de início informada pela plataforma", count: 98 }, { field: "Landing page", count: 73 }],
  averageSessionSeconds: 642, syncFailures: 2, apiErrors: 5, lastSyncAt: "2026-10-05T09:27:00",
};

export const findOffer = (id: string) => offers.find((o) => o.id === id);
export const findAdvertiser = (id: string) => advertisers.find((a) => a.id === id);
export const findLandingPage = (id: string | null) => (id ? landingPages.find((l) => l.id === id) : undefined);
