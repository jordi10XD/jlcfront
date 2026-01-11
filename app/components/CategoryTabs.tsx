'use client';
import { motion } from 'framer-motion';

export default function CategoryTabs({ categories, selected, onSelect }: any) {
  const all = ['ALL', ...categories];
  return (
    <ul className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {all.map((cat) => (
        <li key={cat} className="relative shrink-0">
          <button
            onClick={() => onSelect(cat)}
            className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-colors duration-300 relative z-10 
              ${selected === cat ? 'text-white' : 'text-slate-400 hover:text-slate-900'}`}
          >
            {cat === 'ALL' ? 'Todos' : cat}
            {selected === cat && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute inset-0 bg-blue-600 rounded-2xl -z-10 shadow-lg shadow-blue-500/30" 
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} 
              />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}