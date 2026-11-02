"use client";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");

    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // ignore
    }
  };

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label='Cambiar tema'
      title='Cambiar tema'
      className='flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50 active:bg-gray-100 touch-manipulation dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700'
      style={{
        WebkitTouchCallout: "none",
        touchAction: "manipulation",
        lineHeight: 1,
      }}
    >
      <svg
        className='h-[18px] w-[18px] dark:hidden'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='12' cy='12' r='4' />
        <path d='M12 2v2' />
        <path d='M12 20v2' />
        <path d='m4.93 4.93 1.41 1.41' />
        <path d='m17.66 17.66 1.41 1.41' />
        <path d='M2 12h2' />
        <path d='M20 12h2' />
        <path d='m6.34 17.66-1.41 1.41' />
        <path d='m19.07 4.93-1.41 1.41' />
      </svg>
      <svg
        className='hidden h-[18px] w-[18px] dark:block'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
      </svg>
    </button>
  );
}
