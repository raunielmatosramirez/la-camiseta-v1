import Image from "next/image";
import Link from "next/link";
import { getTienda } from "@/lib/data";
import { getWhatsAppOrderLink } from "@/lib/whatsapp";

function formatPhone(number: string) {
  const match = number.match(/^\+(\d{2})(\d{4})(\d{4})$/);
  if (!match) return number;
  return `+${match[1]} ${match[2]} ${match[3]}`;
}

export default function Footer() {
  const tienda = getTienda();
  const whatsappLink = getWhatsAppOrderLink(
    "Hola, quiero información sobre una camiseta.",
  );
  const telefono = formatPhone(tienda.whatsapp);

  return (
    <footer className='border-t border-gray-200 dark:border-neutral-800'>
      <div className='mx-auto max-w-5xl px-4 py-6'>
        <div className='grid gap-6 sm:grid-cols-[1.2fr_1fr_1fr]'>
          <div>
            <Link href='/' className='flex items-center gap-2'>
              <Image
                src='/icon.svg'
                alt=''
                width={28}
                height={28}
                className='h-7 w-7'
                unoptimized
              />
              <span className='text-sm font-medium'>La Camiseta</span>
            </Link>
            <p className='mt-2 max-w-xs text-sm text-gray-600 dark:text-neutral-400'>
              {tienda.descripcion}
            </p>
          </div>

          <div>
            <h2 className='text-sm font-medium'>Tienda física</h2>
            <p className='mt-1 text-sm text-gray-600 dark:text-neutral-400'>
              {tienda.direccionRecogida}
            </p>
            <p className='mt-1 text-xs text-gray-500 dark:text-neutral-500'>
              Visítanos en nuestra tienda física.
            </p>
          </div>

          <div>
            <h2 className='text-sm font-medium'>WhatsApp</h2>
            <a
              href={whatsappLink}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-1 inline-block text-sm text-gray-600 underline-offset-4 transition hover:text-gray-900 hover:underline dark:text-neutral-400 dark:hover:text-neutral-200'
            >
              {telefono}
            </a>
            <p className='mt-1 text-xs text-gray-500 dark:text-neutral-500'>
              Atención y pedidos
            </p>
          </div>
        </div>

        <div className='mt-6 border-t border-gray-200 pt-4 text-xs text-gray-500 dark:border-neutral-800 dark:text-neutral-500'>
          © {new Date().getFullYear()} La Camiseta. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
