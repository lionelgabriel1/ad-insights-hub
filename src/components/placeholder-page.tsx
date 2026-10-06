import { Construction } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";

export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return <AppShell><PageHeader title={title} description={description}/><div className="grid min-h-[45vh] place-items-center border border-dashed bg-card"><div className="max-w-sm text-center"><Construction className="mx-auto size-8 text-primary"/><h2 className="mt-4 font-display text-lg font-bold">Estrutura visual preparada</h2><p className="mt-2 text-sm text-muted-foreground">Esta área faz parte da navegação do produto e será detalhada nas próximas etapas.</p></div></div></AppShell>;
}