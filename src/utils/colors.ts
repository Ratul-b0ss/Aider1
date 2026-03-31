/**
 * Shared color utility — maps Tailwind gradient class tokens
 * to actual CSS hex colors for dynamic inline styles.
 */

export const TAILWIND_COLOR_MAP: Record<string, string> = {
  'from-violet-500': '#8b5cf6',
  'to-purple-600':   '#9333ea',
  'from-green-500':  '#22c55e',
  'to-teal-600':     '#0d9488',
  'from-blue-500':   '#3b82f6',
  'to-cyan-600':     '#0891b2',
  'from-indigo-500': '#6366f1',
  'to-blue-700':     '#1d4ed8',
  'from-orange-500': '#f97316',
  'to-amber-600':    '#d97706',
  'from-pink-500':   '#ec4899',
  'to-rose-600':     '#e11d48',
  'from-yellow-400': '#facc15',
  'to-orange-500':   '#f97316',
  'from-slate-600':  '#475569',
  'to-gray-800':     '#1f2937',
  'from-lime-500':   '#84cc16',
  'to-green-600':    '#16a34a',
  'from-yellow-500': '#eab308',
  'from-red-500':    '#ef4444',
  'to-pink-600':     '#db2777',
  'from-cyan-500':   '#06b6d4',
  'to-blue-600':     '#2563eb',
  'from-purple-400': '#c084fc',
  'to-indigo-500':   '#6366f1',
  'from-gray-500':   '#6b7280',
  'to-slate-700':    '#334155',
  'from-green-400':  '#4ade80',
  'from-violet-400': '#a78bfa',
  'to-purple-600-b': '#9333ea',
  'from-blue-400':   '#60a5fa',
  'from-amber-500':  '#f59e0b',
  'to-yellow-600':   '#ca8a04',
  'from-teal-500':   '#14b8a6',
  'to-emerald-600':  '#059669',
  'from-blue-600':   '#2563eb',
  'to-indigo-700':   '#4338ca',
  'from-rose-500':   '#f43f5e',
  'from-emerald-500':'#10b981',
  'to-teal-700':     '#0f766e',
  'from-pink-400':   '#f472b6',
  'to-red-500':      '#ef4444',
  'from-purple-800': '#6b21a8',
  'to-black':        '#000000',
  'from-blue-700':   '#1d4ed8',
  'to-indigo-800':   '#3730a3',
  'from-yellow-600': '#ca8a04',
  'to-amber-700':    '#b45309',
  'from-amber-600':  '#d97706',
  'to-brown-700':    '#92400e',
  'from-cyan-600':   '#0891b2',
  'to-orange-400':   '#fb923c',
  'from-indigo-400': '#818cf8',
  'to-violet-600':   '#7c3aed',
  'to-red-600':      '#dc2626',
  'from-red-600':    '#dc2626',
  'to-rose-700':     '#be123c',
  'from-fuchsia-500':'#d946ef',
  'from-orange-600': '#ea580c',
  'to-red-700':      '#b91c1c',
  'from-green-700':  '#15803d',
  'to-teal-800':     '#115e59',
  'from-pink-600':   '#db2777',
  'to-purple-700':   '#7e22ce',
  'from-red-700':    '#b91c1c',
  'to-rose-800':     '#9f1239',
  'from-amber-700':  '#b45309',
  'to-orange-800':   '#9a3412',
  'from-gray-600':   '#4b5563',
  'to-zinc-800':     '#27272a',
  'from-pink-700':   '#be185d',
  'from-sky-500':    '#0ea5e9',
  'from-stone-500':  '#78716c',
  'to-gray-700':     '#374151',
  'to-pink-700':     '#be185d',
  'from-teal-600':   '#0d9488',
  'to-cyan-700':     '#0e7490',
  'to-orange-600':   '#ea580c',
  'from-zinc-600':   '#52525b',
  'from-violet-600': '#7c3aed',
  'from-purple-900': '#4a1d96',
  'to-indigo-900':   '#312e81',
};

export function gradientFromClass(colorClass: string): string {
  const parts = colorClass.split(' ');
  const from = TAILWIND_COLOR_MAP[parts[0]] || '#6366f1';
  const to   = TAILWIND_COLOR_MAP[parts[1]] || '#8b5cf6';
  return `linear-gradient(135deg, ${from}, ${to})`;
}

export function gradientColorsFromClass(colorClass: string): string {
  const parts = colorClass.split(' ');
  const from = TAILWIND_COLOR_MAP[parts[0]] || '#6366f1';
  const to   = TAILWIND_COLOR_MAP[parts[1]] || '#8b5cf6';
  return `${from}, ${to}`;
}

export function translateCategory(cat: string, lang: 'en' | 'bn'): string {
  if (lang === 'en') return cat;
  const map: Record<string, string> = {
    'Technology': 'প্রযুক্তি', 'Environment': 'পরিবেশ', 'Science': 'বিজ্ঞান',
    'Health': 'স্বাস্থ্য', 'Finance': 'অর্থ', 'Society': 'সমাজ',
    'Philosophy': 'দর্শন', 'Arts': 'শিল্পকলা', 'History': 'ইতিহাস',
  };
  return map[cat] || cat;
}
