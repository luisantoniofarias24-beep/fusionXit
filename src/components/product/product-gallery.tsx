"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/domain/product/types";
import { cn } from "@/lib/cn";

export function ProductGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-background-secondary">
        {active && (
          <Image
            src={active.url}
            alt={active.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            priority
            className="object-cover"
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label={`Imagens de ${productName}`}>
          {images.map((image, index) => (
            <button
              key={image.url + index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Ver imagem ${index + 1} de ${productName}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-md border transition-colors",
                index === activeIndex ? "border-accent" : "border-border hover:border-border-strong"
              )}
            >
              <Image src={image.url} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
