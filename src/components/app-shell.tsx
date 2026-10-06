import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Activity, Bell, Bot, Boxes, Building2, ChartNoAxesCombined, CircleUserRound, ClipboardList,
  Download, FileSearch, FolderHeart, Globe2, Image, LayoutDashboard, Menu, Moon, PackageSearch,
  Search, Settings, ShieldCheck, Sun, Tags, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthGuard } from "@/lib/auth";
import { cn } from "@/lib/utils";

const nav = [
  ["Dashboard", "/", LayoutDashboard], ["Pesquisas", "/pesquisas", Search], ["Ofertas", "/ofertas", PackageSearch],
  ["Anúncios", "/anuncios", ClipboardList], ["Criativos", "/criativos", Image], ["Anunciantes", "/anunciantes", Building2],
  ["Landing Pages", "/landing-pages", FileSearch], ["Domínios", "/dominios", Globe2], ["Monitoramento", "/monitoramento", Activity],
  ["Alertas", "/alertas", Bell], ["Coleções", "/colecoes", FolderHeart], ["IA", "/ia", Bot],
  ["Exportações", "/exportacoes", Download], ["Configurações", "/configuracoes", Settings],
  ["Diagnóstico da extensão", "/diagnostico-extensao", ShieldCheck],
] as const;

function Brand() {
  return <Link to="/" className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground"><ChartNoAxesCombined className="size-5" /></div><div><div className="font-display text-[15px] font-bold leading-none">Ad Intelligence</div><div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Signal workspace</div></div></Link>;
}

function Navigation({ close }: { close?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <nav className="space-y-0.5">{nav.map(([label, to, Icon]) => {
    const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
    return <Link key={to} to={to} onClick={close} className={cn("flex h-9 items-center gap-3 rounded-md px-3 text-[13px] font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent", active && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary")}><Icon className="size-4" /><span className="truncate">{label}</span>{label === "Alertas" && <span className="ml-auto grid size-5 place-items-center rounded-full bg-signal text-[10px] font-bold text-signal-foreground">6</span>}</Link>;
  })}</nav>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => document.documentElement.classList.toggle("dark", dark), [dark]);
  return <AuthGuard><div className="min-h-screen bg-background text-foreground">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-sidebar-border bg-sidebar lg:flex"><div className="px-5 py-5"><Brand /></div><div className="flex-1 overflow-y-auto px-3 pb-4"><Navigation /></div><div className="border-t border-sidebar-border p-3"><div className="flex items-center gap-3 rounded-md px-3 py-2"><div className="grid size-8 place-items-center rounded-full bg-secondary"><CircleUserRound className="size-4" /></div><div className="min-w-0"><div className="truncate text-xs font-semibold">Equipe Gabriel</div><div className="text-[11px] text-muted-foreground">Workspace demo</div></div></div></div></aside>
    {mobileOpen && <div className="fixed inset-0 z-50 bg-overlay lg:hidden"><aside className="h-full w-[290px] overflow-y-auto bg-sidebar p-4"><div className="mb-5 flex items-center justify-between"><Brand/><Button variant="ghost" size="icon" aria-label="Fechar menu" onClick={() => setMobileOpen(false)}><X/></Button></div><Navigation close={() => setMobileOpen(false)}/></aside></div>}
    <div className="lg:pl-60"><header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur md:px-7"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu" onClick={() => setMobileOpen(true)}><Menu/></Button><div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><Boxes className="size-4"/><span>Dados públicos coletados pela extensão</span></div></div><div className="flex items-center gap-1"><Button variant="ghost" size="icon" aria-label="Alternar tema" title="Alternar tema" onClick={() => setDark((v) => !v)}>{dark ? <Sun/> : <Moon/>}</Button><Button variant="ghost" size="icon" aria-label="Notificações"><Bell/></Button><div className="ml-2 hidden border-l pl-3 text-right sm:block"><div className="text-xs font-semibold">Equipe Gabriel</div><div className="text-[10px] text-muted-foreground">Plano demonstração</div></div></div></header><main className="mx-auto max-w-[1600px] p-4 md:p-7">{children}</main></div>
  </div></AuthGuard>;
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-end"><div>{eyebrow && <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</div>}<h1 className="font-display text-2xl font-bold md:text-3xl">{title}</h1><p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p></div>{action}</div>;
}