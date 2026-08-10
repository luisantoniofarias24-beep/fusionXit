"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, User, ShoppingBag, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { SearchInput } from "@/components/ui/search-input";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Produtos", href: "/produtos" },
  { label: "Categorias", href: "/produtos" },
  { label: "Ofertas", href: "/produtos?promocao=1" },
];

/**
 * Header premium — base visual reutilizável.
 * Desktop: logo + navegação + busca + conta + carrinho.
 * Mobile: menu compacto + logo + busca + carrinho, sem prejudicar navegação.
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
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <IconButton
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              icon={isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              variant="ghost"
              size="md"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
            />
            <Link href="/" className="font-display text-h4 font-semibold tracking-tight text-foreground">
              FUSIONXIT
            </Link>
          </div>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-sm text-foreground-secondary transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden max-w-xs flex-1 lg:block">
            <SearchInput value={query} onChange={setQuery} />
          </div>

          <div className="flex items-center gap-1.5">
            <IconButton
              aria-label="Buscar"
              icon={<Search aria-hidden="true" />}
              variant="ghost"
              className="lg:hidden"
              onClick={() => setSearchOpen((v) => !v)}
            />
            <IconButton
              aria-label="Minha conta"
              icon={<User aria-hidden="true" />}
              variant="ghost"
              className="hidden sm:inline-flex"
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
          <div className="pb-4 lg:hidden">
            <SearchInput value={query} onChange={setQuery} />
          </div>
        )}
      </Container>

      {isMobileMenuOpen && (
        <div className={cn("border-t border-border bg-background lg:hidden")}>
          <Container>
            <nav className="flex flex-col py-2" aria-label="Navegação mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 text-body text-foreground-secondary transition-colors hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
