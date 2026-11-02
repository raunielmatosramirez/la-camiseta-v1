"use client";

import { buildProductUrl } from "@/lib/site-url";
import { getWhatsAppShareLink } from "@/lib/whatsapp";

export default function ShareButton({ slug }: { slug: string }) {
  const handleShare = () => {
    const url = buildProductUrl(slug);
    // Sin número: WhatsApp deja elegir el destinatario
    const waUrl = getWhatsAppShareLink(url);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type='button'
      onClick={handleShare}
      className='w-full min-h-[52px] rounded-lg border border-gray-200 px-4 py-2 text-sm transition hover:bg-gray-50 active:bg-gray-100 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:active:bg-neutral-700'
    >
      Compartir producto
    </button>
  );
}
