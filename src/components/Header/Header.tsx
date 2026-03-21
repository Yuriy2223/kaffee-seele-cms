'use client';

import { useState, useEffect, useRef } from 'react';
import { Logo } from '../Logo/Logo';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { MobileMenuButton } from './MobileMenuButton';
import { Container } from '@/shared/Container';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollToSection } from '@/hooks/useScrollToSection';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const headerRef = useRef<HTMLElement>(null);
  const closeMenu = () => setIsMenuOpen(false);
  const scrollTo = useScrollToSection();

  const scrollToSection = (sectionId: string) => {
    scrollTo(sectionId);
    closeMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 bg-warm-white/95 backdrop-blur-sm shadow-sm z-50"
      >
        <Container className="py-4 px-4">
          <nav className="flex items-center justify-between">
            <Logo />
            <DesktopNav
              onClick={scrollToSection}
              activeSection={activeSection}
            />
            <MobileMenuButton
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen(!isMenuOpen)}
            />
          </nav>
        </Container>

        <div
          className={`lg:hidden absolute top-full left-0 w-full transition-all duration-500 ease-spring ${
            isMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <MobileNav
            onClick={scrollToSection}
            activeSection={activeSection}
            isOpen={isMenuOpen}
          />
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 lg:hidden transition-opacity duration-500 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
};
