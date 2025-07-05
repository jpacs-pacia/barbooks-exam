import { useEffect, useState } from 'react';

export const useSummary = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/summary');
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch summary');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return { data, loading, error, refetch: fetchSummary }; 
};
