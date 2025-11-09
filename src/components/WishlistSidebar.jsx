import React from 'react';
import { ListTree, PlusCircle } from 'lucide-react';

const WishlistSidebar = ({ lists, activeListId, onSelectList, onCreateList, theme }) => {
  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className={`rounded-2xl p-4 md:p-5 border ${theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white/70 border-neutral-200'} shadow-sm backdrop-blur`}> 
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ListTree className="h-4 w-4 text-rose-500" />
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">Wish lists</h3>
          </div>
          <button onClick={onCreateList} className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 text-sm font-medium">
            <PlusCircle className="h-4 w-4" /> New
          </button>
        </div>
        <ul className="space-y-1">
          {lists.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => onSelectList(l.id)}
                className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${
                  activeListId === l.id
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-500/20 dark:text-rose-100'
                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate text-sm font-medium">{l.name}</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">{l.count || 0}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default WishlistSidebar;
