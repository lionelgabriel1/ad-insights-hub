import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Building2, Clock3, Image, PackageSearch, Plus, Search, Sparkles } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Bar, Metric, Panel, Score } from "@/components/intelligence-ui";
import { Button } from "@/components/ui/button";
import { offers, searchSessions } from "@/data/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Dashboard — Ad Intelligence" },
    { name: "description", content: "Visão geral dos sinais observáveis em anúncios, ofertas e criativos." },
    { property: "og:title", content: "Dashboard — Ad Intelligence" },
    { property: "og:description", content: "Visão geral dos sinais observáveis em anúncios, ofertas e criativos." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: DashboardPage,
});

const trend = [{d:"29 set",v:46},{d:"30 set",v:51},{d:"1 out",v:49},{d:"2 out",v:66},{d:"3 out",v:74},{d:"4 out",v:69},{d:"5 out",v:88}];

function DashboardPage() {
  return <AppShell>
    <PageHeader eyebrow="Visão geral · Últimos 30 dias" title="Inteligência em movimento" description="Sinais públicos observados nas coletas recentes. Indicadores não representam desempenho financeiro." action={<Button><Plus/>Nova pesquisa</Button>}/>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Ofertas agrupadas" value="248" delta={18} icon={<PackageSearch/>}/><Metric label="Anúncios observados" value="3.842" delta={12} icon={<Activity/>}/><Metric label="Criativos únicos" value="1.126" delta={26} icon={<Image/>}/><Metric label="Anunciantes" value="394" delta={7} icon={<Building2/>}/></div>
    <div className="mt-3 grid gap-3 xl:grid-cols-[1.55fr_1fr]">
      <Panel title="Novos anúncios observados" caption="Ocorrências por dia nas coletas concluídas"><div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend} margin={{left:-20,right:4,top:12,bottom:0}}><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={.35}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="d" tickLine={false} axisLine={false} tick={{fontSize:11,fill:"var(--muted-foreground)"}}/><YAxis tickLine={false} axisLine={false} tick={{fontSize:11,fill:"var(--muted-foreground)"}}/><Tooltip contentStyle={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:6,fontSize:12}}/><Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2} fill="url(#area)"/></AreaChart></ResponsiveContainer></div></Panel>
      <Panel title="Distribuição observada" caption="Anúncios por categoria"><div className="space-y-5"><Bar label="Beleza" value={1240} total={3842}/><Bar label="Moda" value={948} total={3842}/><Bar label="Bem-estar" value={724} total={3842}/><Bar label="Casa" value={542} total={3842}/><Bar label="Outros" value={388} total={3842}/></div></Panel>
    </div>
    <div className="mt-3 grid gap-3 xl:grid-cols-3">
      <Panel title="Ofertas em alta" action={<Link to="/ofertas" className="text-xs font-semibold text-primary">Ver todas</Link>} className="xl:col-span-2"><div className="divide-y">{offers.slice(0,3).map((offer,i)=><Link key={offer.id} to="/ofertas/$offerId" params={{offerId:offer.id}} className="grid grid-cols-[28px_1fr_auto] items-center gap-3 py-3 first:pt-0 last:pb-0"><span className="font-display text-sm font-bold text-muted-foreground">0{i+1}</span><div><div className="text-sm font-bold">{offer.product}</div><div className="mt-1 text-xs text-muted-foreground">{offer.adCount} anúncios · {offer.creativeCount} criativos · {offer.observedDays} dias observados</div></div><Score value={offer.scores.overall} label="Overall" compact/></Link>)}</div></Panel>
      <Panel title="Sinais de ciclo"><div className="space-y-3"><Signal title="Maior crescimento" value="Garrafa térmica inteligente" meta="+52% em anúncios observados"/><Signal title="Maior persistência observada" value="Modelador sem costura" meta="156 dias observados"/><Signal title="Maior diversidade criativa" value="Sérum facial Vitamina C" meta="34 criativos observados"/><Signal title="Desaparecendo" value="Massageador portátil" meta="−12% em anúncios observados"/></div></Panel>
    </div>
    <div className="mt-3 grid gap-3 xl:grid-cols-[1.25fr_1fr]">
      <Panel title="Pesquisas recentes" action={<Link to="/pesquisas" className="text-xs font-semibold text-primary">Ver sessões</Link>}><div className="overflow-x-auto"><table className="w-full min-w-[580px] text-left text-xs"><thead className="text-muted-foreground"><tr><th className="pb-3 font-semibold">Pesquisa</th><th className="pb-3 font-semibold">País</th><th className="pb-3 font-semibold">Processados</th><th className="pb-3 font-semibold">Ofertas</th><th className="pb-3 font-semibold">Resultados</th></tr></thead><tbody className="divide-y">{searchSessions.map(s=><tr key={s.id}><td className="py-3 font-bold"><Search className="mr-2 inline size-3.5 text-primary"/>{s.query}</td><td>{s.country}</td><td>{s.processedAds}</td><td>{s.offers}</td><td>{s.filteredResults}</td></tr>)}</tbody></table></div></Panel>
      <Panel title="Novas ofertas"><div className="space-y-3"><Signal title="Observada há 2 dias" value="Kit organizador modular" meta="18 anúncios · confiança 76%"/><Signal title="Observada há 3 dias" value="Máscara de LED facial" meta="24 anúncios · confiança 81%"/><Signal title="Observada há 4 dias" value="Escova secadora compacta" meta="15 anúncios · confiança 73%"/></div><div className="mt-4 flex items-start gap-2 border-t pt-4 text-xs text-muted-foreground"><Sparkles className="mt-0.5 size-4 shrink-0 text-primary"/>Agrupamentos são probabilísticos e exibem seu nível de confiança.</div></Panel>
    </div>
  </AppShell>;
}
function Signal({title,value,meta}:{title:string;value:string;meta:string}) { return <div className="border-l-2 border-primary pl-3"><div className="text-[10px] font-bold uppercase text-muted-foreground">{title}</div><div className="mt-0.5 text-sm font-bold">{value}</div><div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3"/>{meta}</div></div> }