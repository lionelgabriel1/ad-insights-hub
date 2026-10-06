# Plano — Ad Intelligence Frontend

## Objetivo
Construir somente o frontend inicial da plataforma, com uma base preparada para substituir os dados de exemplo por uma integração futura sem refazer as telas.

## O que será entregue agora
- Layout responsivo de SaaS com menu lateral completo, cabeçalho, navegação móvel e alternância entre tema claro e escuro.
- Dashboard inicial com os indicadores, rankings, distribuições e pesquisas recentes solicitados.
- Tela de Anúncios com busca, filtros, ordenação, paginação, exportação CSV visual e acesso ao detalhe.
- Detalhe do anúncio com todos os campos pedidos, histórico, favorito e notas simulados.
- Tela de Ofertas com agrupamentos, confiança, sinais e acesso ao detalhe.
- Detalhe da oferta com score geral, sinais separados, evolução, anúncios, criativos, landing pages, hipótese cautelosa e ação de monitoramento simulada.
- Login e cadastro apenas visuais, além de páginas-base para todos os itens do menu, sem inventar fluxos adicionais.

## Dados e segurança
- Criar `src/data` com interfaces TypeScript e dados de exemplo explícitos.
- Exibir “Não disponível” quando um campo não tiver informação.
- Renderizar todo conteúdo externo como texto puro.
- Preparar um guard de frontend substituível por autenticação real futuramente, sem credenciais ou persistência sensível.
- Validar formulários com Zod.

## Direção visual
Interface editorial e analítica, densa mas legível, com superfícies neutras, acento verde-lima controlado, gráficos claros e contraste adequado nos dois temas.

## Verificação
Validar as rotas principais, a alternância de tema, filtros e paginação, além da apresentação em desktop e celular.
