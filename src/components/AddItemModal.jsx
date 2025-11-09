import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';

const extractDomain = (url) => {
  try {
    const u = new URL(url);
    return u.hostname.replace('www.', '');
  } catch {
    return '';
  }
};

const AddItemModal = ({ open, onClose, onAdd, theme, activeListName }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setUrl('');
      setLoading(false);
      setError('');
    }
  }, [open]);

  const preview = useMemo(() => {
    if (!url) return null;
    const domain = extractDomain(url);
    const titleGuess = domain ? domain.split('.')[0] : 'Item';
    return {
      image: `https://image.thum.io/get/width/800/crop/800/${url}`,
      title: titleGuess.charAt(0).toUpperCase() + titleGuess.slice(1),
      brand: domain,
      brandLogo: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
    };
  }, [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!url) {
      setError('Please paste a product URL');
      return;
    }
    try {
      setLoading(true);
      // In a full app we'd call the backend to scrape metadata.
      // Here we create a client-side preview-based item.
      const domain = extractDomain(url);
      const item = {
        id: crypto.randomUUID(),
        url,
        image: `https://image.thum.io/get/width/1200/crop/1200/${url}`,
        title: document.title || domain,
        brand: domain,
        brandLogo: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        createdAt: Date.now(),
      };
      onAdd(item);
      onClose();
    } catch (err) {
      setError('Could not add this link. Please try another URL.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative w-full max-w-lg rounded-2xl border ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} shadow-xl`}>
        <button onClick={onClose} className="absolute right-3 top-3 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
          <X className="h-5 w-5 text-neutral-500" />
        </button>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Add item to {activeListName}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Paste a product link. We’ll pull the image, title, and brand automatically.</p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/product"
              className={`w-full px-3 py-2 rounded-xl border ${theme === 'dark' ? 'bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500' : 'bg-white border-neutral-300'} focus:outline-none focus:ring-2 focus:ring-rose-500/50`}
            />
            {preview && (
              <div className={`flex gap-3 p-3 rounded-xl border ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                <img src={preview.image} alt="Preview" className="h-16 w-16 rounded-lg object-cover" />
                <div>
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{preview.title}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">{preview.brand}</div>
                </div>
              </div>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={onClose} className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10">Cancel</button>
              <button disabled={loading} type="submit" className="px-3 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-red-500 shadow-sm hover:shadow disabled:opacity-60">
                {loading ? 'Adding…' : 'Add item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
