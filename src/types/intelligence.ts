export type Availability<T> = T | null;

export type EntityKind = "ad" | "offer" | "advertiser" | "creative" | "landingPage" | "session";

export interface ObservableDates {
  /** Data de início informada pela plataforma (Biblioteca de Anúncios). */
  platformStartDate: Availability<string>;
  /** Primeira observação pela nossa plataforma. */
  firstObservedAt: string;
  /** Última observação pela nossa plataforma. */
  lastObservedAt: string;
  /** Tempo observado, em dias, pela nossa plataforma. */
  observedDays: number;
}

export type AdFormat = "Imagem" | "Vídeo" | "Carrossel";

export interface Ad extends ObservableDates {
  id: string;
  advertiser: string;
  advertiserId: string;
  page: string;
  copy: string;
  headline: Availability<string>;
  description: Availability<string>;
  cta: Availability<string>;
  format: AdFormat;
  mediaUrl: string;
  publicUrl: string;
  active: boolean;
  country: string;
  category: string;
  language: string;
  links: string[];
  domain: Availability<string>;
  landingPage: Availability<string>;
  landingPageId: Availability<string>;
  offerId: string;
  creativeId: string;
  searchSessionId: string;
  favorite: boolean;
  note: Availability<string>;
  tags: string[];
}

export interface IntelligenceScores {
  longevity: number;
  creativeDiversity: number;
  offerDensity: number;
  growth: number;
  landingPage: number;
  copyStrength: number;
  overall: number;
}

export interface Offer extends ObservableDates {
  id: string;
  product: string;
  category: string;
  priceRange: Availability<string>;
  adCount: number;
  creativeCount: number;
  advertiserCount: number;
  landingPageCount: number;
  countries: string[];
  confidence: number;
  growth: number;
  scores: IntelligenceScores;
  monitored: boolean;
  favorite: boolean;
  note: Availability<string>;
  evolution: Array<{ label: string; ads: number }>;
}

export interface SearchSession {
  id: string;
  query: string;
  country: string;
  startedAt: string;
  endedAt: Availability<string>;
  processedAds: number;
  offers: number;
  creatives: number;
  filteredResults: number;
  monitored: boolean;
  sinceLastObservation: Availability<{ newAds: number; removedAds: number; newCreatives: number; newOffers: number }>;
}

export type ChangeType =
  | "new_ad" | "removed_ad" | "new_creative" | "removed_creative" | "price_change"
  | "landing_page_change" | "domain_change" | "copy_change" | "new_advertiser";

export interface ChangeEvent {
  id: string;
  entityKind: "ad" | "offer";
  entityId: string;
  date: string;
  type: ChangeType;
  description: string;
}

export const CREATIVE_TAGS = [
  "UGC", "Demonstração", "Testimonial", "Antes/depois", "Problema/solução", "Desconto", "Promoção",
  "Autoridade", "Comparação", "Storytelling", "Lista de benefícios", "Produto em uso",
  "Demonstração de resultado", "Prova social", "Urgência",
] as const;
export type CreativeTag = (typeof CREATIVE_TAGS)[number];

export interface CreativeAnalysis {
  hook: Availability<string>;
  problem: Availability<string>;
  desire: Availability<string>;
  mechanism: Availability<string>;
  offer: Availability<string>;
  proof: Availability<string>;
  cta: Availability<string>;
}

export interface Creative {
  id: string;
  adId: string;
  offerId: string;
  advertiser: string;
  advertiserId: string;
  format: AdFormat;
  imageUrl: Availability<string>;
  thumbnailUrl: Availability<string>;
  videoUrl: Availability<string>;
  durationSeconds: Availability<number>;
  text: string;
  headline: Availability<string>;
  cta: Availability<string>;
  country: string;
  firstObservedAt: string;
  observedDays: number;
  publicUrl: string;
  analysis: CreativeAnalysis;
  tags: CreativeTag[];
}

export interface Advertiser {
  id: string;
  name: string;
  pages: string[];
  countries: string[];
  adCount: number;
  offerCount: number;
  creativeCount: number;
  observedDays: number;
  growth: Availability<number>;
  firstObservedAt: string;
  lastObservedAt: string;
}

export interface LandingPage {
  id: string;
  offerId: string;
  url: string;
  domain: string;
  title: Availability<string>;
  headline: Availability<string>;
  subheadline: Availability<string>;
  cta: Availability<string>;
  price: Availability<string>;
  currency: Availability<string>;
  discount: Availability<string>;
  benefits: string[];
  features: string[];
  guarantee: Availability<string>;
  socialProof: Availability<string>;
  faq: boolean | null;
  form: boolean | null;
  whatsapp: boolean | null;
  trustElements: string[];
  structure: string[];
  httpStatus: Availability<number>;
  https: boolean | null;
  technologies: string[];
  speed: Availability<string>;
  sectionCount: Availability<number>;
  firstObservedAt: string;
  lastObservedAt: string;
}

export interface DomainSummary {
  domain: string;
  adCount: number;
  offerCount: number;
  landingPageCount: number;
  https: boolean | null;
}

export type AlertType = "new_activity" | "new_creative" | "new_landing_page" | "growth" | "decline" | "new_advertiser";

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  date: string;
  target: Availability<{ kind: EntityKind; id: string }>;
}

export interface ExtensionDiagnostics {
  version: Availability<string>;
  sessionsStarted: number;
  sessionsCompleted: number;
  processedAds: number;
  duplicates: number;
  parsingErrors: number;
  missingFields: Array<{ field: string; count: number }>;
  averageSessionSeconds: Availability<number>;
  syncFailures: number;
  apiErrors: number;
  lastSyncAt: Availability<string>;
}

export interface ExportRecord {
  id: string;
  createdAt: string;
  filename: string;
  rowCount: number;
  scope: string;
}

export interface CollectionItem { kind: EntityKind; id: string }
export interface Collection { id: string; name: string; items: CollectionItem[] }
