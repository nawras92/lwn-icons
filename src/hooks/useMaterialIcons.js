import { useState, useEffect } from '@wordpress/element';

const LS_ICONS = 'material-icons-data';
const LS_ICONS_TIME = 'material-icons-cache-time';
const ICONS_URL =
  'https://raw.githubusercontent.com/nawras92/google-material-icons-json/main/data/icons.json';

export default function useMaterialIcons({ forceRefresh = false } = {}) {
  const [icons, setIcons] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchIcons = async () => {
    setLoading(true);
    setMessage('Fetching icons...');

    try {
      // 1. Check cache
      const cached = localStorage.getItem(LS_ICONS);
      const cacheTime = localStorage.getItem(LS_ICONS_TIME);

      if (
        !forceRefresh &&
        cached &&
        cacheTime &&
        Date.now() - parseInt(cacheTime, 10) < 24 * 60 * 60 * 1000
      ) {
        setIcons(JSON.parse(cached));
        setMessage('Using cached icons');
        setLoading(false);
        return;
      }

      // 2. Fetch JSON (entire file at once)
      const res = await fetch(ICONS_URL);
      if (!res.ok) throw new Error(`Failed to fetch icons: ${res.status}`);
      const data = await res.json();

      // 3. Save to cache & state without looping
      localStorage.setItem(LS_ICONS, JSON.stringify(data));
      localStorage.setItem(LS_ICONS_TIME, Date.now().toString());
      setIcons(data);
      setMessage(`Fetched ${data.length} categories`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch once on mount, not on every render
    fetchIcons();
  }, []); // <-- empty dependency array prevents loops

  const clearCache = () => {
    localStorage.removeItem(LS_ICONS);
    localStorage.removeItem(LS_ICONS_TIME);
    setIcons([]);
    setMessage('Cache cleared');
  };

  return { icons, message, loading, refetch: fetchIcons, clearCache };
}
