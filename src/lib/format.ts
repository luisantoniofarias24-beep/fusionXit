const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata um valor em centavos-livre (número decimal) como "R$ 399,90". */
export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

/**
 * Calcula o percentual de desconto entre o preço "de" e o preço atual.
 * Retorna um inteiro arredondado (ex.: 20 para 20%) ou null quando não
 * há desconto real (compareAtPrice ausente ou não maior que o preço atual).
 */
export function calculateDiscountPercent(
  price: number,
  compareAtPrice: number | null | undefined
): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  const percent = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(percent);
}

/** Formata um percentual de desconto pronto para exibição, ex.: "-20%". */
export function formatDiscountPercent(
  price: number,
  compareAtPrice: number | null | undefined
): string | null {
  const percent = calculateDiscountPercent(price, compareAtPrice);
  return percent === null ? null : `-${percent}%`;
}
