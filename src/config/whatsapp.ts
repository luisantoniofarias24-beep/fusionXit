/**
 * Configuração centralizada de finalização via WhatsApp.
 * Nenhum número é inventado — vem exclusivamente de variável de ambiente.
 * Sem configuração, `whatsappNumber` é null e a UI deve desabilitar a ação
 * (ver `buildWhatsAppCheckoutUrl`).
 */
export const whatsappNumber: string | null =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER && process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.trim().length > 0
    ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.trim()
    : null;
