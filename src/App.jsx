import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WishlistSidebar from './components/WishlistSidebar';
import WishlistGrid from './components/WishlistGrid';
import AddItemModal from './components/AddItemModal';
import SettingsSheet from './components/SettingsSheet';

const sampleImage = (q) => `https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop`; // fallback

const initialLists = [
  { id: 'christmas-2025', name: 'Christmas 2025', count: 2 },
  { id: 'birthday', name: 'Birthday', count: 1 },
  { id: 'gaming', name: 'Gaming Setup', count: 0 },
  { id: 'goals', name: 'Future Goals', count: 0 },
];

export default function App() {
  const [theme, setTheme] = useState('light');
  const [lists, setLists] = useState(initialLists);
  const [activeListId, setActiveListId] = useState(initialLists[0].id);
  const [itemsByList, setItemsByList] = useState({
    'christmas-2025': [
      {
        id: '1',
        url: 'https://www.apple.com/airpods-pro/',
        image: 'https://images.unsplash.com/photo-1758485363383-e82089de4d0e?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxBaXJQb2RzJTIwUHJvJTIwJTI4Mm5kJTIwR2VuZXJhdGlvbiUyOXxlbnwwfDB8fHwxNzYyNzA3MjQ2fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
        title: 'AirPods Pro (2nd Generation)',
        brand: 'apple.com',
        brandLogo: 'https://www.google.com/s2/favicons?domain=apple.com&sz=64',
      },
      {
        id: '2',
        url: 'https://www.lego.com/en-us/product/nasa-apollo-11-lunar-lander-10266',
        image: 'https://images.unsplash.com/photo-1694531309424-8add73eec608?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxMRUdPJTIwTkFTQSUyMEFwb2xsbyUyMDExfGVufDB8MHx8fDE3NjI3MDcyNDZ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
        title: 'LEGO NASA Apollo 11 Lunar Lander',
        brand: 'lego.com',
        brandLogo: 'https://www.google.com/s2/favicons?domain=lego.com&sz=64',
      },
    ],
    birthday: [
      {
        id: '3',
        url: 'https://www.kindleshop.com',
        image: sampleImage('book'),
        title: 'Kindle Paperwhite',
        brand: 'amazon.com',
        brandLogo: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=64',
      },
    ],
    gaming: [],
    goals: [],
  });

  const [addOpen, setAddOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const items = useMemo(() => itemsByList[activeListId] || [], [itemsByList, activeListId]);
  useEffect(() => {
    setLists((prev) => prev.map((l) => ({ ...l, count: (itemsByList[l.id] || []).length })));
  }, [itemsByList]);

  const handleAddItem = (item) => {
    setItemsByList((prev) => ({
      ...prev,
      [activeListId]: [item, ...(prev[activeListId] || [])],
    }));
  };

  const handleCreateList = () => {
    const name = prompt('Name your new wishlist');
    if (!name) return;
    const id = name.toLowerCase().replace(/\s+/g, '-');
    if (lists.some((l) => l.id === id)) return alert('List name already exists');
    setLists((prev) => [{ id, name, count: 0 }, ...prev]);
    setItemsByList((p) => ({ ...p, [id]: [] }));
    setActiveListId(id);
  };

  const handleSignInOut = () => {
    if (user) {
      setUser(null);
    } else {
      setUser({ id: 'demo', name: 'Guest' });
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'pastel' ? 'bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50' : theme === 'dark' ? 'bg-neutral-950' : 'bg-neutral-50'}`}>
      <Navbar
        onAdd={() => setAddOpen(true)}
        onSettings={() => setSettingsOpen(true)}
        user={user}
        onSignInOut={handleSignInOut}
        theme={theme}
      />

      <Hero />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex gap-6">
        <WishlistSidebar
          lists={lists}
          activeListId={activeListId}
          onSelectList={setActiveListId}
          onCreateList={handleCreateList}
          theme={theme}
        />

        <section className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{lists.find((l) => l.id === activeListId)?.name}</h2>
            <button onClick={() => setAddOpen(true)} className="rounded-xl px-3 py-2 text-sm font-medium bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-sm hover:shadow">+ Add item</button>
          </div>
          <WishlistGrid items={items} theme={theme} />
        </section>
      </main>

      <AddItemModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddItem}
        theme={theme}
        activeListName={lists.find((l) => l.id === activeListId)?.name}
      />

      <SettingsSheet
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
        onManageAccount={() => alert('Account settings coming soon')}
      />
    </div>
  );
}
