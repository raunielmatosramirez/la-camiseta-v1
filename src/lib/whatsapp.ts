import { getTienda } from "./data";

/**
 * Enlace para PEDIR a la tienda.
 * Abre el chat con el número de la tienda.
 * Úsalo en el carrito / checkout.
 */
export function getWhatsAppOrderLink(message: string) {
  const tienda = getTienda();
  const cleaned = tienda.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${text}`;
}

/**
 * Enlace para COMPARTIR con cualquiera.
 * Sin número de destino: WhatsApp pide al usuario elegir el contacto.
 * Úsalo en el botón de compartir producto.
 */
export function getWhatsAppShareLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/?text=${text}`;
}
