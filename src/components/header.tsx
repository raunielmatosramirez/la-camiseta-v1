"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { useCart } from "@/context/cart-context";

export default function Header() {
  const { count } = useCart();

  return (
    <header className='sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-950'>
      <div className='mx-auto flex max-w-5xl items-center justify-between px-4 py-2'>
        <Link href='/' className='flex min-h-[44px] items-center gap-2'>
          <Image
            src='/icon.svg'
            alt=''
            width={28}
            height={28}
            className='h-7 w-7'
            unoptimized
            priority
          />
          <div>
            <div className='text-sm font-medium leading-tight'>La Camiseta</div>
          </div>
        </Link>
        <div className='flex items-center gap-1.5'>
          <ThemeToggle />
          <Link
            href='/carrito'
            onClick={(e) => e.stopPropagation()}
            className='relative z-50 flex h-[54px] min-w-[54px] shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-sm leading-none transition hover:bg-gray-50 active:bg-gray-100 touch-manipulation dark:border-neutral-700 dark:hover:bg-neutral-800 dark:active:bg-neutral-700'
            style={{
              WebkitTouchCallout: "none",
              touchAction: "manipulation",
              lineHeight: 1,
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='9' cy='21' r='1'></circle>
              <circle cx='20' cy='21' r='1'></circle>
              <path d='M1 1h4l2.68 13.39A2 2 0 0 0 9.66 17h8.66a2 2 0 0 0 1.97-1.61L23 6H6'></path>
            </svg>
            <span>Carrito</span>
            {count > 0 && (
              <span className='absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white dark:bg-white dark:text-black'>
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
