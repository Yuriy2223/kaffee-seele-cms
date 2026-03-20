'use client';

import { useCallback } from 'react';

export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const header = document.querySelector('header');
    const headerHeight = header?.offsetHeight ?? 80;
    const elementPosition = element.offsetTop - headerHeight;

    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
  }, []);

  return scrollToSection;
};
