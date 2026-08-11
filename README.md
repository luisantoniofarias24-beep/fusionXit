# FusionXit

Loja digital premium de produtos e serviços para jogadores de Free Fire
(Android, iPhone e PC). Next.js (App Router) + React + TypeScript
strict + Tailwind CSS + Lucide + Zustand. Sem backend nesta fase — dados
locais/mock por trás de uma camada Repository/Service preparada para
substituição futura por uma API real.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript strict
- Tailwind CSS (tokens semânticos via CSS custom properties)
- Lucide Icons
- Zustand (+ `persist` para carrinho e admin local)

## Requisitos

- Node.js 20+
- npm

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Build de produção

```bash
npm run build
npm run start
```

## Validação

```bash
npm run lint
npx tsc --noEmit
npm run build
```

> Estes três comandos ainda não foram executados neste ambiente (sem
> terminal/rede reais) — ver `FUSIONXIT-VALIDATION-CHECKLIST.md`.

## Arquitetura

```
src/
  app/            App Router: grupo (site) [comercial], admin/, design-system/
  components/     ui/, layout/, cart/, product/, home/, admin/
  domain/         Product, Category, Cart — tipos + regras de negócio (Service)
  data/           repositories/ (interface + impl. local) e mock/ (dados demo)
  store/          Zustand: carrinho, toasts, produtos do admin
  lib/            formatters, cn, fonts, whatsapp
  hooks/          useDismissableOverlay (Modal/Drawer)
  config/         variáveis de ambiente centralizadas (WhatsApp)
```

Regra de dependência: página/UI → `Service` → `Repository` (interface) →
implementação local atual. Nenhuma página lê os arquivos de `data/mock`
diretamente.

## Dados locais

O catálogo público (`MOCK_PRODUCTS`/`MOCK_CATEGORIES` em `src/data/mock`) é
demonstrativo — nomes, preços e avaliações são fictícios. Ele é servido por
`LocalProductRepository`/`LocalCategoryRepository`, que implementam as
interfaces `ProductRepository`/`CategoryRepository`. Trocar essas classes por
uma implementação de API real (`ApiProductRepository` etc.) não exige
alterar nenhuma página.

O carrinho é persistido no navegador via Zustand `persist` (localStorage).

## Admin local (`/admin`)

Área administrativa **local e demonstrativa**, sem autenticação real —
qualquer pessoa com a URL acessa. Opera sobre uma store isolada
(`useAdminProductsStore`, também `persist` em localStorage) e **não** se
reflete automaticamente no catálogo público, que é renderizado em Server
Components a partir dos dados mock estáticos. Ver comentário completo em
`src/store/admin-products-store.ts`.

Proteção administrativa real só deve ser implementada quando houver
backend/autenticação de verdade.

## WhatsApp

O checkout oferece finalização via WhatsApp. Configure em `.env.local`:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

Sem essa variável, o botão de finalizar via WhatsApp fica desabilitado —
nenhum número é inventado no código.

## Deploy (Netlify)

Ver `FUSIONXIT-NETLIFY-DEPLOY.md`.

## Limitações atuais

- Sem backend/banco de dados — tudo local/mock.
- Sem autenticação real no `/admin`.
- Sem processamento real de pagamento no `/checkout`.
- Catálogo de 8 produtos demonstrativos (não é o catálogo real da FusionXit).
- Páginas institucionais com conteúdo placeholder até receber os textos
  oficiais.
- Build/lint/TypeScript ainda não validados de fato (ver checklist).

## Evolução futura

1. Criar `ApiProductRepository`/`ApiCategoryRepository` implementando as
   interfaces existentes e trocar a instância em `src/data/repositories/index.ts`.
2. Adicionar autenticação real e proteger `/admin` no servidor.
3. Integrar gateway de pagamento real no `/checkout`.
4. Substituir dados/imagens demonstrativos pelo catálogo oficial.

