# FusionXit — Checklist de validação externa

Este projeto foi escrito inteiramente à mão neste ambiente (chat do Claude,
sem terminal nem acesso à internet). Nada abaixo foi executado por mim —
execute na sua máquina (idealmente via Claude Code, que tem acesso real a
terminal) antes de considerar qualquer etapa concluída.

## 1. Instalação

```bash
cd fusionxit
npm install
```

## 2. Validação estática

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Corrija todos os erros encontrados antes de seguir. Avisos não triviais
devem ser investigados — a maior fonte provável de ajuste fino são as
versões exatas de `next`/`react`/`zustand`/`lucide-react` resolvidas pelo
npm (fixei versões razoáveis em `package.json`, mas não pude confirmar
contra o resolvedor real do npm).

## 3. Rodar localmente

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## 4. Rotas a testar manualmente

- `/` — Home (Hero, Categorias, Destaques, Mais vendidos, Novidades,
  Ofertas, Benefícios, Newsletter)
- `/produtos` — busca, filtro por categoria, ordenação, checkbox "somente
  disponíveis"
- `/produto/<slug-de-um-produto-mock>` — galeria, variantes (quando houver),
  adicionar ao carrinho, comprar agora, produtos relacionados
- `/categoria/<slug>` — ex.: `/categoria/audio`
- `/carrinho` — alterar quantidade, remover item, limpar carrinho
- `/checkout` — percorrer as 5 etapas; testar com e sem
  `NEXT_PUBLIC_WHATSAPP_NUMBER` configurado
- `/admin` — dashboard com contagens
- `/admin/produtos` — listar, editar, excluir (com confirmação)
- `/admin/produtos/novo` — criar produto, testar validação de campos
  obrigatórios
- `/design-system` — inspecionar todos os componentes
- uma URL inexistente, ex. `/pagina-que-nao-existe` — deve mostrar a 404

## 5. Testar carrinho

1. Adicionar 2+ produtos diferentes
2. Alterar quantidade de um item (verificar limites min/max)
3. Recarregar a página — os itens devem persistir (localStorage)
4. Remover um item
5. Limpar o carrinho

## 6. Testar admin

1. Criar um produto novo em `/admin/produtos/novo`
2. Confirmar que aparece na listagem `/admin/produtos`
3. Editar esse produto
4. Excluir — confirmar que pede confirmação antes

## 7. Testar WhatsApp

1. Sem `NEXT_PUBLIC_WHATSAPP_NUMBER`: o botão de finalizar via WhatsApp no
   checkout deve estar desabilitado
2. Com a variável configurada (número de teste): o botão deve abrir uma URL
   `wa.me` com produtos, quantidades e total na mensagem

## 8. Testar mobile

Usar as ferramentas de dispositivo do navegador nas larguras: 320px, 360px,
375px, 390px, 430px, além de tablet e desktop. Verificar especialmente:
menu mobile do Header, Drawer do carrinho, tabela do admin (scroll
horizontal), formulários de checkout/admin.

## 9. Publicar na Netlify

Seguir `FUSIONXIT-NETLIFY-DEPLOY.md`.
