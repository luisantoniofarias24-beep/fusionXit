import type { CartItem } from "@/domain/cart/types";
import type { Product } from "@/domain/product/types";
import { formatCurrency } from "@/lib/format";
import { whatsappNumber } from "@/config/whatsapp";

interface BuildParams {
  items: CartItem[];
  products: Record<string, Product>;
  total: number;
}

/**
 * Monta a URL de finalização de pedido via WhatsApp.
 * Retorna null quando não há número configurado — a UI deve tratar isso
 * desabilitando o botão, nunca enviando para um número inexistente.
 * A mensagem inclui apenas produto/quantidade/variante/total — nenhum
 * dado sensível (endereço completo, pagamento) é incluído aqui.
 */
export function buildWhatsAppCheckoutUrl({ items, products, total }: BuildParams): string | null {
  if (!whatsappNumber) return null;

  const lines = items.map((item) => {
    const product = products[item.productId];
    const name = product?.name ?? "Produto";
    const variantLabel = item.variantId
      ? product?.variants.find((v) => v.id === item.variantId)?.name
      : null;
    return `• ${item.quantity}x ${name}${variantLabel ? ` (${variantLabel})` : ""}`;
  });

  const message = [
    "Olá! Gostaria de finalizar este pedido na FusionXit:",
    "",
    ...lines,
    "",
    `Total: ${formatCurrency(total)}`,
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
