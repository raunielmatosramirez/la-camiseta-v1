"use client";

export default function TallaSelector({
  tallas,
  selected,
  onChange,
}: {
  tallas: string[];
  selected?: string;
  onChange: (t: string) => void;
}) {
  if (!tallas || tallas.length === 0) return null;

  return (
    <div className='space-y-2'>
      <div className='text-sm font-medium'>Talla</div>
      <div className='flex flex-wrap gap-2'>
        {tallas.map((t) => (
          <button
            type='button'
            key={t}
            onClick={() => onChange(t)}
            className={`min-h-[52px] min-w-[52px] rounded-lg border px-4 py-2 text-sm transition active:scale-[0.98] ${
              selected === t
                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                : "border-gray-200 hover:border-gray-400 active:border-gray-500 dark:border-neutral-700 dark:hover:border-neutral-500 dark:active:border-neutral-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
