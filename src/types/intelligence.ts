export type Availability<T> = T | null;

export interface ObservableDates {
  platformStartDate: Availability<string>;
  firstObservedAt: string;
  lastObservedAt: string;
  observedDays: number;
}

export interface Ad extends ObservableDates {
  id: string;
  advertiser: string;
  page: string;
  copy: string;
  headline: Availability<string>;
  description: Availability<string>;
  cta: Availability<string>;
  format: "Imagem" | "Vídeo" | "Carrossel";
  mediaUrl: string;
  publicUrl: string;
  active: boolean;
  country: string;
  category: string;
  language: string;
  links: string[];
  domain: Availability<string>;
  landingPage: Availability<string>;
  offerId: string;
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
  endedAt: string;
  processedAds: number;
  offers: number;
  creatives: number;
  filteredResults: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: string;
  description: string;
}