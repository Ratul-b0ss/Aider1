import { useState, useCallback } from 'react';

export type Route = { view: 'home' } | { view: 'page'; slug: string };

export function useRouter() {
  const [route, setRoute] = useState<Route>({ view: 'home' });

  const navigate = useCallback((slug: string) => {
    setRoute({ view: 'page', slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goHome = useCallback(() => {
    setRoute({ view: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route, navigate, goHome };
}
