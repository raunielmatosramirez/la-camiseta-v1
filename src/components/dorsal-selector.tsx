"use client";

export default function DorsalSelector({
  dorsales,
  selected,
  onChange,
}: {
  dorsales: { numero: string; tallas: string[] }[];
  selected?: string;
  onChange: (d?: string) => void;
}) {
  if (!dorsales || dorsales.length === 0) return null;

  return (
    <div className='space-y-2'>
      <div className='text-sm font-medium'>Dorsal</div>
      <div className='flex flex-wrap gap-2'>
        {dorsales.map((d) => (
          <button
            type='button'
            key={d.numero}
            onClick={() => onChange(d.numero)}
            className={`min-h-[52px] min-w-[52px] touch-manipulation rounded-lg border px-4 py-2 text-sm transition active:scale-[0.98] ${
              selected === d.numero
                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                : "border-gray-200 hover:border-gray-400 active:border-gray-500 dark:border-neutral-700 dark:hover:border-neutral-500 dark:active:border-neutral-400"
            }`}
          >
            {d.numero}
          </button>
        ))}
      </div>
    </div>
  );
}
