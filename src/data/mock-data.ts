import type { Ad, Offer, SearchSession, TimelineEvent } from "@/types/intelligence";

export const formatDate = (value: string | null) =>
  value ? new Intl.DateTimeFormat("pt-BR").format(new Date(`${value}T12:00:00`)) : "Não disponível";

const media = [
  "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1583743814966-8936f37f998a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
];

export const offers: Offer[] = [
  { id:"of-001", product:"Sérum facial Vitamina C", category:"Beleza", priceRange:"R$ 89–129", adCount:148, creativeCount:34, advertiserCount:8, landingPageCount:6, countries:["Brasil","Portugal"], confidence:92, growth:38, platformStartDate:"2026-05-12", firstObservedAt:"2026-06-03", lastObservedAt:"2026-10-05", observedDays:124, monitored:true, favorite:true, note:null, scores:{longevity:88,creativeDiversity:94,offerDensity:86,growth:82,landingPage:79,copyStrength:84,overall:87}, evolution:[{label:"Mai",ads:12},{label:"Jun",ads:28},{label:"Jul",ads:46},{label:"Ago",ads:72},{label:"Set",ads:110},{label:"Out",ads:148}] },
  { id:"of-002", product:"Modelador sem costura", category:"Moda", priceRange:"R$ 119–189", adCount:96, creativeCount:27, advertiserCount:5, landingPageCount:4, countries:["Brasil"], confidence:87, growth:24, platformStartDate:"2026-04-18", firstObservedAt:"2026-05-01", lastObservedAt:"2026-10-04", observedDays:156, monitored:false, favorite:false, note:"Acompanhar variação de domínio.", scores:{longevity:91,creativeDiversity:82,offerDensity:76,growth:69,landingPage:73,copyStrength:78,overall:80}, evolution:[{label:"Mai",ads:21},{label:"Jun",ads:35},{label:"Jul",ads:42},{label:"Ago",ads:63},{label:"Set",ads:78},{label:"Out",ads:96}] },
  { id:"of-003", product:"Massageador portátil", category:"Bem-estar", priceRange:null, adCount:74, creativeCount:19, advertiserCount:6, landingPageCount:7, countries:["Brasil","México"], confidence:79, growth:-12, platformStartDate:null, firstObservedAt:"2026-07-11", lastObservedAt:"2026-10-02", observedDays:83, monitored:false, favorite:false, note:null, scores:{longevity:67,creativeDiversity:75,offerDensity:71,growth:42,landingPage:81,copyStrength:69,overall:68}, evolution:[{label:"Jul",ads:18},{label:"Ago",ads:49},{label:"Set",ads:84},{label:"Out",ads:74}] },
  { id:"of-004", product:"Garrafa térmica inteligente", category:"Casa", priceRange:"R$ 149–219", adCount:61, creativeCount:22, advertiserCount:4, landingPageCount:3, countries:["Brasil"], confidence:84, growth:52, platformStartDate:"2026-08-02", firstObservedAt:"2026-08-09", lastObservedAt:"2026-10-05", observedDays:57, monitored:true, favorite:false, note:null, scores:{longevity:65,creativeDiversity:88,offerDensity:72,growth:93,landingPage:76,copyStrength:80,overall:82}, evolution:[{label:"Ago",ads:8},{label:"Set",ads:35},{label:"Out",ads:61}] },
];

export const ads: Ad[] = Array.from({ length: 18 }, (_, index) => {
  const offer = offers[index % offers.length];
  const days = [67, 31, 15, 8, 4, 92][index % 6];
  return {
    id: `ad-${String(index + 1).padStart(4,"0")}`,
    advertiser: ["Lumina Labs","Forma Brasil","Vita Motion","Casa Norte"][index % 4],
    page: ["Lumina Oficial","Forma Brasil Store","Vita Motion BR","Casa Norte Shop"][index % 4],
    copy: ["Uma rotina simples pode transformar a forma como você cuida da pele.","Conforto que acompanha cada movimento, sem marcar.","Relaxe onde estiver com uma experiência prática para o dia a dia.","Sua bebida na temperatura certa por mais tempo."][index % 4],
    headline: index % 5 === 0 ? null : ["Cuidado diário, resultado visível","Vista e sinta a diferença","Seu momento de pausa","Temperatura sob controle"][index % 4],
    description: index % 4 === 2 ? null : "Condição disponível por tempo limitado no site oficial.",
    cta: ["Saiba mais","Comprar agora",null,"Ver oferta"][index % 4],
    format: (["Vídeo","Imagem","Carrossel"] as const)[index % 3], mediaUrl:media[index % media.length],
    publicUrl:`https://www.facebook.com/ads/library/?id=${100000 + index}`, active:index % 5 !== 3,
    country:index % 4 === 2 ? "México" : "Brasil", category:offer.category, language:index % 4 === 2 ? "Espanhol" : "Português",
    links:[`https://exemplo-${index + 1}.com/oferta`], domain:index % 6 === 0 ? null : `exemplo-${index + 1}.com`, landingPage:index % 6 === 0 ? null : `https://exemplo-${index + 1}.com/oferta`, offerId:offer.id,
    platformStartDate:index % 7 === 0 ? null : "2026-08-01", firstObservedAt:"2026-08-08", lastObservedAt:"2026-10-05", observedDays:days,
    favorite:index % 7 === 0, note:index === 0 ? "Acompanhar novas variações de copy." : null, tags:[index % 2 ? "UGC" : "Demonstração", "Produto em uso"],
  };
});

export const searchSessions: SearchSession[] = [
  {id:"ss-01",query:"shapewear",country:"Brasil",startedAt:"2026-10-05 09:12",endedAt:"2026-10-05 09:26",processedAds:482,offers:31,creatives:126,filteredResults:94},
  {id:"ss-02",query:"serum vitamina c",country:"Brasil",startedAt:"2026-10-04 14:05",endedAt:"2026-10-04 14:18",processedAds:316,offers:22,creatives:89,filteredResults:71},
  {id:"ss-03",query:"smart bottle",country:"Portugal",startedAt:"2026-10-03 11:30",endedAt:"2026-10-03 11:38",processedAds:144,offers:12,creatives:42,filteredResults:35},
];

export const timeline: TimelineEvent[] = [
  {id:"ev-1",date:"05 out, 10:42",type:"Novo criativo",description:"Uma nova variação em vídeo foi observada."},
  {id:"ev-2",date:"01 out, 16:18",type:"Mudança de copy",description:"O texto principal observado foi alterado."},
  {id:"ev-3",date:"28 set, 08:05",type:"Nova landing page",description:"Uma landing page em novo domínio foi observada."},
];