# FusionXit — Auditoria técnica

## Arquitetura

Página/UI → `Service` (`ProductService`, `CartService`) → `Repository`
(interface) → `LocalProductRepository`/`LocalCategoryRepository`. Nenhuma
página importa `src/data/mock` diretamente. Ponto único de composição em
`src/data/repositories/index.ts` — trocar para uma API real é uma alteração
de um arquivo.

Exceção documentada: a área `/admin` usa uma store própria
(`useAdminProductsStore`, Zustand + localStorage) isolada do repository
público, porque não há backend para persistir de fato. Ver
`src/store/admin-products-store.ts` para o raciocínio completo, incluindo a
limitação de que edições no admin não se refletem no catálogo público
renderizado em Server Components.

## Funcionalidades implementadas

- Home Premium (Hero, Categorias, Destaques, Mais vendidos, Novidades,
  Ofertas, Benefícios, Newsletter demonstrativa)
- Catálogo com busca, filtro por categoria/estoque e 5 ordenações
- Página de categoria
- Página de produto (galeria, variantes, quantidade, adicionar ao carrinho,
  comprar agora, especificações, relacionados, JSON-LD de produto)
- Carrinho (drawer lateral + página), com persistência local e cálculo de
  subtotal/total via `CartService`
- Checkout visual de 5 etapas + finalização via WhatsApp condicionada a
  variável de ambiente
- Admin local: dashboard, listagem, criação, edição e exclusão (com
  confirmação) de produtos
- 6 páginas institucionais com placeholders claramente identificados
- 404 personalizada e error boundary global
- `sitemap.ts` e `robots.ts` dinâmicos

## Segurança

- Nenhum segredo, token ou credencial no código-fonte.
- `.env.example` sem valores reais; `.gitignore` cobre `.env*.local`.
- `/admin` explicitamente sinalizado (visualmente e em comentário) como sem
  autenticação real — proteção de verdade depende de backend futuro.
- Checkout não coleta nem armazena CVV, número completo de cartão ou
  qualquer dado sensível de pagamento — a etapa de pagamento é
  declaradamente uma preparação visual.
- Mensagem do WhatsApp inclui apenas produto/quantidade/variante/total —
  nenhum dado pessoal sensível.

## Acessibilidade

- HTML semântico (`nav`, `header`, `footer`, `main`, `dialog` via `role`).
- Foco visível global (`:focus-visible`) nunca removido sem substituto.
- `aria-label` obrigatório em todo IconButton.
- Modal/Drawer com gerenciamento de foco (foco inicial, `Tab` preso dentro
  do overlay, restauração do foco ao fechar) e fechamento por `Escape`,
  implementados em `useDismissableOverlay` sem dependência externa.
- Erros de formulário nunca comunicados só por cor (ícone + texto sempre).
- `prefers-reduced-motion` respeitado nas animações do Drawer.
- Rating nunca inventa avaliações — reflete exatamente os dados recebidos.

## Performance

- Server Components por padrão; `"use client"` só onde há interação
  (formulários, carrinho, filtros, overlays).
- `next/image` com `sizes` definido em todas as imagens de produto/galeria.
- `next/font` (Manrope + Inter) — self-hosted, sem layout shift de fonte
  externa.
- Proporção `1:1` fixa nas imagens de produto para evitar CLS.

## SEO

- Metadata por rota (`generateMetadata` em produto e categoria).
- Open Graph na página de produto.
- JSON-LD `Product` (preço, disponibilidade, avaliação quando existente) —
  nenhum dado inventado além do catálogo mock já identificado como tal.
- `sitemap.ts` dinâmico a partir do catálogo mock.
- `robots.ts` bloqueando `/admin` e `/design-system` de indexação.

## Responsividade

Todos os componentes e páginas foram escritos com classes responsivas
(`sm:`, `lg:`) considerando mobile-first, incluindo Header/menu mobile,
Drawer, grids de produto (2 colunas no mobile, até 4 no desktop) e tabela do
admin com scroll horizontal. **Não testado visualmente em navegador real**
neste ambiente — ver checklist de validação externa.

## Limitações conhecidas

- Sem backend/banco de dados.
- Sem autenticação real no admin.
- Sem processamento real de pagamento.
- Catálogo, imagens e conteúdo institucional demonstrativos/placeholder.
- `npm install`, `lint`, `tsc --noEmit`, `build` e deploy real não
  executados neste ambiente.

## Pendências que dependem de informação comercial real

- Catálogo real de produtos e imagens.
- Número real de WhatsApp.
- CNPJ, endereço, telefone, e-mail, redes sociais para o Footer.
- Políticas de privacidade, termos, trocas/devoluções e entrega
  (texto jurídico definitivo).

## Resultado dos comandos de validação

Não executados neste ambiente (sem terminal/rede). Ver
`FUSIONXIT-VALIDATION-CHECKLIST.md` para o passo a passo de validação
externa.
