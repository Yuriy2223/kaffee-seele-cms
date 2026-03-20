'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean;
}

export const useInView = (options: UseInViewOptions = {}) => {
  const {
    once = true,
    threshold = 0.15,
    rootMargin = '0px',
    ...rest
  } = options;
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const setRef = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin, ...rest }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, once, threshold, rootMargin]);

  return { ref: setRef as any, inView };
};
