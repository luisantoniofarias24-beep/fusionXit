"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Drawer } from "@/components/ui/drawer";
import { IconButton } from "@/components/ui/icon-button";
import { SearchInput } from "@/components/ui/search-input";
import { PLATFORM_LIST } from "@/domain/product/platform";
import { useCartStore } from "@/store/cart-store";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/produtos" },
  ...PLATFORM_LIST.map((meta) => ({
    label: meta.label,
    href: `/categoria/${meta.categorySlug}`,
  })),
  { label: "Suporte", href: "/contato" },
];

/**
 * Header premium.
 * Desktop: logo + navegação + busca + carrinho. A busca inline só aparece
 * a partir de `xl`, onde sobra largura para os seis itens de navegação.
 * Mobile: menu lateral (Drawer) + logo + busca + carrinho.
 */
export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const openDrawer = useCartStore((state) => state.openDrawer);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <IconButton
              aria-label="Abrir menu"
              icon={<Menu aria-hidden="true" />}
              variant="ghost"
              size="md"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            />
            <Link
              href="/"
              className="font-display text-h4 font-semibold tracking-tight text-foreground"
            >
              FUSIONXIT
            </Link>
          </div>

          <nav
            className="hidden items-center gap-6 lg:flex xl:gap-8"
            aria-label="Navegação principal"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-body-sm text-foreground-secondary transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden max-w-xs flex-1 xl:block">
            <SearchInput value={query} onChange={setQuery} />
          </div>

          <div className="flex items-center gap-1.5">
            <IconButton
              aria-label="Buscar"
              icon={<Search aria-hidden="true" />}
              variant="ghost"
              className="xl:hidden"
              onClick={() => setSearchOpen((v) => !v)}
            />
            <div className="relative">
              <IconButton
                aria-label={`Carrinho, ${itemCount} ${itemCount === 1 ? "item" : "itens"}`}
                icon={<ShoppingBag aria-hidden="true" />}
                variant="ghost"
                onClick={openDrawer}
              />
              {itemCount > 0 && (
                <span className="pointer-events-none absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-pill bg-accent text-[10px] font-semibold text-accent-foreground">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="pb-4 xl:hidden">
            <SearchInput value={query} onChange={setQuery} onClear={() => setQuery("")} />
          </div>
        )}
      </Container>

      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Menu"
        side="left"
        className="max-w-[300px]"
      >
        <nav className="flex flex-col p-2" aria-label="Navegação mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-3.5 text-body text-foreground-secondary transition-colors hover:bg-surface-hover hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}
