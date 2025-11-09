import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WishlistCard = ({ item, theme }) => {
  return (
    <motion.div layout initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }}
      className={`group rounded-2xl overflow-hidden border ${theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white/70 border-neutral-200'} shadow-sm backdrop-blur`}
    >
      <div className="aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-3">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 min-h-[2.5rem]">{item.title}</h4>
      </div>
      <div className="p-3 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {item.brandLogo && (
            <img src={item.brandLogo} alt={item.brand} className="h-5 w-5 rounded" />
          )}
          <span className="text-xs text-neutral-500 dark:text-neutral-400">{item.brand}</span>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 text-sm font-medium"
        >
          Visit <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};

const WishlistGrid = ({ items, theme }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <AnimatePresence>
        {items.map((item) => (
          <WishlistCard key={item.id} item={item} theme={theme} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WishlistGrid;
