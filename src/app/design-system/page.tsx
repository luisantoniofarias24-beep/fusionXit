"use client";

import { useState } from "react";
import { Search, Mail, ShoppingBag, PackageX } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton, ProductCardSkeleton } from "@/components/ui/skeleton";
import { Loading } from "@/components/ui/loading";
import { Modal } from "@/components/ui/modal";
import { Drawer } from "@/components/ui/drawer";
import { ProductCard } from "@/components/product/product-card";
import { useToastStore } from "@/store/toast-store";
import { MOCK_PRODUCTS } from "@/data/mock/products";

const TOKEN_GROUPS: { title: string; tokens: { name: string; varName: string }[] }[] = [
  {
    title: "Background",
    tokens: [
      { name: "background", varName: "--color-background" },
      { name: "background-secondary", varName: "--color-background-secondary" },
    ],
  },
  {
    title: "Surface",
    tokens: [
      { name: "surface", varName: "--color-surface" },
      { name: "surface-hover", varName: "--color-surface-hover" },
      { name: "surface-elevated", varName: "--color-surface-elevated" },
    ],
  },
  {
    title: "Foreground",
    tokens: [
      { name: "foreground", varName: "--color-foreground" },
      { name: "foreground-secondary", varName: "--color-foreground-secondary" },
      { name: "foreground-muted", varName: "--color-foreground-muted" },
    ],
  },
  {
    title: "Border",
    tokens: [
      { name: "border", varName: "--color-border" },
      { name: "border-strong", varName: "--color-border-strong" },
    ],
  },
  {
    title: "Accent",
    tokens: [
      { name: "accent", varName: "--color-accent" },
      { name: "accent-hover", varName: "--color-accent-hover" },
    ],
  },
  {
    title: "Semânticas",
    tokens: [
      { name: "success", varName: "--color-success" },
      { name: "warning", varName: "--color-warning" },
      { name: "danger", varName: "--color-danger" },
    ],
  },
];

const TYPE_SCALE: { label: string; className: string }[] = [
  { label: "Display XL", className: "text-display-xl font-display" },
  { label: "Display", className: "text-display font-display" },
  { label: "H1", className: "text-h1 font-display" },
  { label: "H2", className: "text-h2 font-display" },
  { label: "H3", className: "text-h3 font-display" },
  { label: "H4", className: "text-h4 font-display" },
  { label: "Body Large", className: "text-body-lg" },
  { label: "Body", className: "text-body" },
  { label: "Body Small", className: "text-body-sm" },
  { label: "Caption", className: "text-caption uppercase tracking-wide" },
  { label: "Label", className: "text-label" },
  { label: "Button", className: "text-button" },
];

function LabSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5 border-b border-border py-12">
      <h2 className="font-display text-h3 text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const pushToast = useToastStore((state) => state.push);

  const demoProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <Container className="py-10">
      <div className="mb-10 flex flex-col gap-2">
        <Badge variant="warning">Ferramenta interna — não faz parte da navegação comercial</Badge>
        <h1 className="font-display text-display text-foreground">FusionXit Design System</h1>
        <p className="max-w-xl text-body text-foreground-secondary">
          Inspeção visual de todos os tokens e componentes fundamentais da Etapa 2.
        </p>
      </div>

      <LabSection title="Paleta">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TOKEN_GROUPS.flatMap((group) => group.tokens).map((token) => (
            <div key={token.varName} className="flex flex-col gap-2">
              <div
                className="h-16 rounded-md border border-border"
                style={{ backgroundColor: `rgb(var(${token.varName}))` }}
              />
              <span className="text-caption text-foreground-muted">{token.name}</span>
            </div>
          ))}
        </div>
      </LabSection>

      <LabSection title="Tipografia">
        <div className="flex flex-col gap-4">
          {TYPE_SCALE.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 border-b border-border/60 pb-4">
              <span className="text-caption text-foreground-muted">{item.label}</span>
              <span className={item.className}>FusionXit — Tecnologia. Performance.</span>
            </div>
          ))}
        </div>
      </LabSection>

      <LabSection title="Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" iconLeft={<ShoppingBag className="size-4" aria-hidden="true" />}>
            Com ícone
          </Button>
        </div>
      </LabSection>

      <LabSection title="IconButton">
        <div className="flex flex-wrap items-center gap-3">
          <IconButton aria-label="Exemplo default" icon={<Mail aria-hidden="true" />} />
          <IconButton aria-label="Exemplo ghost" icon={<Mail aria-hidden="true" />} variant="ghost" />
          <IconButton aria-label="Exemplo accent" icon={<Mail aria-hidden="true" />} variant="accent" />
          <IconButton aria-label="Exemplo disabled" icon={<Mail aria-hidden="true" />} disabled />
        </div>
      </LabSection>

      <LabSection title="Input & SearchInput & Select">
        <div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Nome" placeholder="Seu nome" />
          <Input
            label="E-mail"
            placeholder="voce@exemplo.com"
            errorText="Informe um e-mail válido"
          />
          <Input
            label="Com ícone"
            placeholder="Buscar"
            icon={<Search aria-hidden="true" />}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input label="Desabilitado" placeholder="Indisponível" disabled />
          <SearchInput value={searchValue} onChange={setSearchValue} onClear={() => setSearchValue("")} />
          <Select
            label="Ordenar por"
            options={[
              { value: "relevance", label: "Relevância" },
              { value: "price-asc", label: "Menor preço" },
              { value: "price-desc", label: "Maior preço" },
            ]}
          />
        </div>
      </LabSection>

      <LabSection title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="accent">Novo</Badge>
          <Badge variant="success">Disponível</Badge>
          <Badge variant="warning">-20%</Badge>
          <Badge variant="danger">Esgotado</Badge>
          <Badge variant="neutral">Mais vendido</Badge>
        </div>
      </LabSection>

      <LabSection title="Price & Rating">
        <div className="flex flex-col gap-4">
          <Price price={399.9} compareAtPrice={499.9} size="lg" />
          <Price price={899.9} size="md" />
          <Rating value={4.7} reviewsCount={132} />
          <Rating value={null} reviewsCount={0} />
        </div>
      </LabSection>

      <LabSection title="QuantitySelector">
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </LabSection>

      <LabSection title="ProductCard">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {demoProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => pushToast("success", `${product.name} adicionado ao carrinho`)} />
          ))}
        </div>
      </LabSection>

      <LabSection title="Breadcrumb & SectionHeader">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Produtos", href: "/produtos" },
            { label: "Áudio", href: "/categoria/audio" },
            { label: "Fone Bluetooth FX Pro" },
          ]}
        />
        <SectionHeader
          eyebrow="Curadoria FusionXit"
          title="Destaques da semana"
          description="Uma seleção de produtos escolhidos pela equipe FusionXit."
          action={<Button variant="outline" size="sm">Ver todos</Button>}
        />
      </LabSection>

      <LabSection title="EmptyState">
        <div className="grid gap-4 sm:grid-cols-2">
          <EmptyState
            icon={<ShoppingBag aria-hidden="true" />}
            title="Seu carrinho está vazio"
            description="Explore o catálogo e adicione produtos."
            action={<Button size="sm">Explorar produtos</Button>}
          />
          <EmptyState
            icon={<PackageX aria-hidden="true" />}
            title="Nenhum resultado encontrado"
            description="Tente ajustar os filtros ou buscar outro termo."
          />
        </div>
      </LabSection>

      <LabSection title="Skeleton & Loading">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
        <Skeleton className="h-4 w-1/3" />
        <Loading label="Carregando produtos" />
      </LabSection>

      <LabSection title="Modal & Drawer">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setModalOpen(true)}>Abrir Modal</Button>
          <Button onClick={() => setDrawerOpen(true)} variant="secondary">
            Abrir Drawer
          </Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Confirmar exclusão">
          <p className="mb-4 text-body-sm text-foreground-secondary">
            Tem certeza de que deseja excluir este produto? Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => setModalOpen(false)}>
              Excluir
            </Button>
          </div>
        </Modal>
        <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} title="Exemplo de Drawer">
          <p className="p-5 text-body-sm text-foreground-secondary">
            Conteúdo de exemplo do Drawer — base reutilizada pelo carrinho lateral.
          </p>
        </Drawer>
      </LabSection>

      <LabSection title="Toast">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => pushToast("success", "Produto salvo com sucesso")}>
            Disparar sucesso
          </Button>
          <Button variant="secondary" onClick={() => pushToast("info", "Produto removido")}>
            Disparar info
          </Button>
          <Button variant="danger" onClick={() => pushToast("error", "Ocorreu um erro")}>
            Disparar erro
          </Button>
        </div>
      </LabSection>
    </Container>
  );
}
