import React from 'react';
import { Plus, Settings, User } from 'lucide-react';

const Navbar = ({ onAdd, onSettings, user, theme, onSignInOut }) => {
  return (
    <header className={`w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-rose-500 to-red-500 shadow-sm" />
          <span className={`font-semibold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>WishGrid</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-rose-500 to-red-500 text-white px-3 py-2 text-sm font-medium shadow-sm hover:shadow transition-shadow"
            aria-label="Add item"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add item</span>
          </button>
          <button
            onClick={onSettings}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}
            aria-label="Open settings"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button
            onClick={onSignInOut}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium border ${theme === 'dark' ? 'border-neutral-700 text-white' : 'border-neutral-300 text-neutral-900'} hover:bg-black/5 dark:hover:bg-white/10 transition-colors`}
            aria-label={user ? 'Account' : 'Sign in'}
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{user ? user.name : 'Sign in'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
