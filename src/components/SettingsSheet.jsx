import React from 'react';

const themes = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'pastel', label: 'Pastel' },
];

const SettingsSheet = ({ open, onClose, theme, setTheme, onManageAccount }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[380px] bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-xl p-5 overflow-y-auto">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Settings</h3>
        <div className="mt-5">
          <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Theme</h4>
          <div className="mt-2 space-y-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`w-full text-left px-3 py-2 rounded-xl border transition-colors ${
                  theme === t.id
                    ? 'border-rose-500/50 bg-rose-50/60 dark:bg-rose-500/10 text-rose-700 dark:text-rose-100'
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Account</h4>
          <button onClick={onManageAccount} className="mt-2 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 w-full text-left">
            Manage account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSheet;
