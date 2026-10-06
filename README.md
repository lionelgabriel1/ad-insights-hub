# Ad Insights Hub

Construa APENAS o FRONTEND do dashboard de uma plataforma web chamada "Ad Intelligence". Interface em português, visual de SaaS profissional, responsiva, com tema claro e escuro. Não crie banco de dados, autenticação real nem Edge Functions nesta etapa: use uma camada de dados tipada (pasta src/data com interfaces TypeScript e dados de exemplo) para que depois possamos trocar por Supabase sem refazer as telas. Não invente funcionalidades além das descritas abaixo.

CONTEXTO
A plataforma recebe dados públicos da Biblioteca de Anúncios da Meta coletados por uma extensão de navegador (feita à parte) e transforma em inteligência: organização, histórico, monitoramento, análise de criativos e landing pages, scores e alertas.

REGRAS DE LINGUAGEM (valem para todas as telas)
- Campo sem informação: mostrar exatamente "Não disponível". Nunca inventar valores.
- Distinguir sempre "Data de início informada pela plataforma" de "Primeira/Última observação pela nossa plataforma" e "Tempo observado". Nunca apresentar inferência como fato.
- Scores se chamam "score de inteligência baseado em sinais observáveis". Nunca usar os termos faturamento, ROAS, lucro, vendas ou produto vencedor.
- Hipóteses usam linguagem cautelosa, por exemplo: "Persistência observada elevada e aumento no número de criativos podem indicar continuidade de teste ou investimento, mas não comprovam vendas ou rentabilidade."
- Texto de anúncios, headlines e landing pages vem de terceiros: renderize sempre como texto puro. Proibido usar dangerouslySetInnerHTML ou qualquer HTML injetado.

NAVEGAÇÃO (menu lateral)
Dashboard, Pesquisas, Ofertas, Anúncios, Criativos, Anunciantes, Landing Pages, Domínios, Monitoramento, Alertas, Coleções, IA, Exportações, Configurações. Inclua também uma página "Diagnóstico da extensão". Telas de login e cadastro visuais (sem backend ainda).

MVP 1
- Pesquisas: lista de sessões de coleta (SEARCH_SESSION) com pesquisa, país, início, fim, anúncios processados, ofertas, criativos e resultados filtrados. Detalhe da sessão.
- Anúncios: tabela com filtros (ativos/inativos, anunciante, página, país, idioma, categoria, domínio, palavra-chave, período, tempo observado 3+/7+/14+/30+/60+ dias), busca, ordenação e paginação. Página de detalhe do anúncio com todos os campos: ID, anunciante, página, texto, headline, descrição, CTA, formato, imagem/thumbnail, vídeo/preview, URL pública, data inicial informada, status, país, categoria, idioma, links, domínio, landing page.
- Ofertas: lista e detalhe (ver MVP 2 para os scores).
- Histórico: timeline de alterações (novo e removido anúncio, novo e removido criativo, mudança de preço, de landing page, de domínio e de copy, novo anunciante).
- Favoritos e notas em anúncios, ofertas, anunciantes, criativos e landing pages. Coleções.
- Exportação CSV (botão em tabelas e página Exportações) com os campos: Ad ID, anunciante, página, oferta, produto, copy, headline, CTA, data, tempo observado, país, categoria, URL pública, landing page, domínio, score, tags.
- Dashboard inicial: cartões Ofertas, Anúncios, Criativos, Anunciantes; novos anúncios, ofertas em crescimento, persistentes e desaparecendo; países, categorias, domínios; pesquisas recentes; blocos "Ofertas em alta", "Maior crescimento", "Maior persistência observada", "Maior diversidade criativa", "Novas ofertas".

MVP 2
- Agrupamento de ofertas: cada oferta mostra produto, categoria, faixa de preço, número de anúncios, criativos, anunciantes, landing pages, países, persistência observada e o nível de confiança do agrupamento (ex.: 92%).
- Rankings: Top Ofertas (ordenar por mais anúncios, maior persistência, maior crescimento, maior diversidade criativa, maior score), Top Anunciantes (anunciante, anúncios, ofertas, criativos, tempo observado, crescimento), Top Criativos (criativo, formato, hook, CTA, oferta, anunciante, tempo observado).
- Página da oferta: score geral, anúncios, criativos, anunciantes, primeira e última observação, tempo observado, gráfico de evolução do número de anúncios ao longo do tempo, botão "Monitorar", lista de anúncios, criativos e landing pages, e bloco de hipótese.
- Scores separados exibidos com explicação curta: Longevity Signal, Creative Diversity, Offer Density, Growth Signal, Landing Page Score, Copy Strength, Overall Intelligence Score.
- Criativos: imagem, vídeo/thumbnail quando houver, formato, duração quando houver, texto, headline, CTA, anunciante, oferta, país, data, URL. Painel de análise com Hook, Problema, Desejo, Mecanismo, Oferta, Prova e CTA. Tags automáticas (UGC, demonstração, testimonial, antes/depois, problema/solução, desconto, promoção, autoridade, comparação, storytelling, lista de benefícios, produto em uso, demonstração de resultado, prova social, urgência) com edição manual (adicionar e remover).
- Landing Pages: URL, domínio, título, headline, subheadline, CTA, preço, moeda, desconto, benefícios, características, garantia, prova social, FAQ, formulário, WhatsApp, elementos de confiança, estrutura; status HTTP, HTTPS, tecnologias detectáveis, velocidade, quantidade aproximada de seções.
- Monitoramento: lista de ofertas e pesquisas monitoradas, botão "Monitorar pesquisa" nas pesquisas salvas (ex.: "shapewear", Brasil, 5+ anúncios, 7+ dias).
- Alertas: nova atividade, novo criativo, nova landing page (mudança de domínio), crescimento, queda e novo anunciante, em uma central de notificações dentro do dashboard (e-mail fica para depois, não implementar).
- Análise de copy: exibir a estrutura da copy de cada criativo.

DIAGNÓSTICO DA EXTENSÃO
Sessões iniciadas e concluídas, anúncios processados, duplicações, erros de parsing, campos ausentes, tempo médio, falhas de sincronização, erros da API e versão da extensão.

FORA DESTA ETAPA (não construir): comparação entre ofertas, "Recriar estrutura", "Recriar conceito", geração de copy original, automações, relatórios, exportação XLSX/JSON/PDF e Funnel Map.

SEGURANÇA DO FRONTEND
- Nenhuma chave secreta no código do cliente.
- Toda entrada do usuário validada com Zod nos formulários.
- Rotas do dashboard protegidas por um guard de autenticação preparado para ser ligado ao Supabase Auth depois.
- Sem armazenar credenciais da Meta ou do Facebook em lugar nenhum.

Organize o código em pastas claras (pages, components, data, types) e comece pelo layout com menu lateral, o Dashboard e as telas de Anúncios e Ofertas.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6d6c9ed0-62e9-40b8-aae6-fdfe5f5e10f7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
