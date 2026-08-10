# Deploy da FusionXit na Netlify

## Compatibilidade verificada

Pesquisado em agosto de 2026: a Netlify suporta Next.js nativamente através
do pacote oficial `@netlify/plugin-nextjs`, com detecção e instalação
automáticas durante o build — sem necessidade de `next export` nem de
configuração manual para Server Components, App Router, SSR ou rotas
dinâmicas (que este projeto usa). A documentação recomenda **não fixar** a
versão do adapter, deixando a Netlify usar sempre a mais recente compatível.
Fonte: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/

Por isso, `netlify.toml` neste projeto é mínimo — apenas o comando de build
e a versão do Node — e não força um plugin ou versão específica.

## Passo a passo

1. **Suba o projeto para um repositório Git** (GitHub, GitLab ou Bitbucket).
   O diretório `node_modules` e `.next` não devem ser versionados (já
   cobertos pelo `.gitignore`).

2. **Crie um novo site na Netlify** a partir desse repositório
   (`Add new site` → `Import an existing project`).

3. **Configuração de build** (a Netlify detecta automaticamente a partir de
   `netlify.toml`, mas confirme):
   - Build command: `npm run build`
   - Node version: 20

4. **Variáveis de ambiente** — em `Site settings` → `Environment variables`,
   adicione:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — número real da FusionXit (formato
     internacional, só dígitos). Sem isso, o botão de finalizar via
     WhatsApp permanece desabilitado.
   - `NEXT_PUBLIC_SITE_URL` — URL final do site (usada em metadata,
     Open Graph, sitemap e robots).

   > `NEXT_PUBLIC_*` são embutidas no bundle em tempo de build — qualquer
   > alteração exige um novo deploy.

5. **Deploy.** A Netlify instalará `@netlify/plugin-nextjs` automaticamente
   ao detectar o projeto Next.js e cuidará de SSR, imagens otimizadas e
   rotas dinâmicas.

6. **Pós-deploy — validar manualmente:**
   - `/` carrega a Home
   - `/produtos` lista e filtra produtos
   - Um produto válido em `/produto/[slug]` abre corretamente
   - Uma categoria válida em `/categoria/[slug]` abre corretamente
   - `/carrinho` reflete itens adicionados
   - `/checkout` percorre as 5 etapas e o botão do WhatsApp funciona (se
     configurado)
   - `/admin` carrega o dashboard (lembrar: sem autenticação real)
   - `/design-system` carrega o Design Lab
   - uma URL inexistente mostra a página 404 personalizada

## Não realizado neste ambiente

Este documento foi preparado sem acesso a terminal ou rede reais — o deploy
em si **não foi executado nem testado** a partir daqui. Siga os passos acima
em um ambiente com acesso à Netlify para validar de fato.
