import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Panel({ title, caption, action, children, className }: { title?: string; caption?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={cn("border border-border bg-card", className)}>{(title || action) && <div className="flex items-center justify-between gap-3 border-b px-4 py-3.5"><div><h2 className="text-sm font-bold">{title}</h2>{caption && <p className="mt-0.5 text-xs text-muted-foreground">{caption}</p>}</div>{action}</div>}<div className="p-4">{children}</div></section>;
}
export function Metric({ label, value, delta, icon }: { label: string; value: string; delta?: number; icon: ReactNode }) {
  const DeltaIcon = delta === undefined || delta === 0 ? Minus : delta > 0 ? ArrowUpRight : ArrowDownRight;
  return <div className="border border-border bg-card p-4"><div className="flex items-start justify-between"><span className="text-xs font-semibold text-muted-foreground">{label}</span><span className="text-primary">{icon}</span></div><div className="mt-4 flex items-end justify-between"><strong className="font-display text-2xl">{value}</strong>{delta !== undefined && <span className={cn("flex items-center text-xs font-bold", delta > 0 ? "text-positive" : delta < 0 ? "text-destructive" : "text-muted-foreground")}><DeltaIcon className="size-3.5" />{Math.abs(delta)}%</span>}</div></div>;
}
export function Score({ value, label, compact = false }: { value: number; label: string; compact?: boolean }) {
  return <div className={cn("flex items-center gap-3", compact && "gap-2")}><div className={cn("relative grid shrink-0 place-items-center rounded-full border-4 border-muted font-display font-bold", compact ? "size-10 text-xs" : "size-16 text-lg")} style={{ borderTopColor: "var(--primary)", borderRightColor: value > 75 ? "var(--primary)" : undefined }}><span>{value}</span></div><div><div className="text-xs font-bold">{label}</div><div className="mt-0.5 text-[10px] leading-tight text-muted-foreground">score de inteligência baseado em sinais observáveis</div></div></div>;
}
export function Bar({ label, value, total }: { label: string; value: number; total: number }) {
  return <div><div className="mb-1.5 flex justify-between text-xs"><span>{label}</span><strong>{value}</strong></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(5, value / total * 100)}%` }} /></div></div>;
}
export function Status({ active }: { active: boolean }) { return <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold", active ? "text-positive" : "text-muted-foreground")}><span className={cn("size-1.5 rounded-full", active ? "bg-positive" : "bg-muted-foreground")} />{active ? "Ativo" : "Inativo"}</span>; }