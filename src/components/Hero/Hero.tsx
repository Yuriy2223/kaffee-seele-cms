'use client';

import { Container } from '@/shared/Container';
import { useCallback, useState, useEffect } from 'react';
import { AnimatedLogo } from '../Logo/AnimatedLogo';
import { ContactModal } from './ContactModal';
import { CoffeeBackground } from '@/shared/CoffeeBackground';
import { Heart, Coffee } from 'lucide-react';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { useHero } from '@/hooks/useMenu';

export const Hero = () => {
  const { data: hero, isLoading, error } = useHero();
  const [displayText1, setDisplayText1] = useState('');
  const [displayText2, setDisplayText2] = useState('');
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const [showSteamHeart, setShowSteamHeart] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const scrollToSection = useScrollToSection();

  const {
    firstLine = '',
    secondLine = '',
    subtitle = '',
    backgroundImage: BACKGROUND_IMAGE_URL = '',
  } = hero || {};

  useEffect(() => {
    if (!hero) return;
    setDisplayText1('');
    setDisplayText2('');
    setCurrentIndex1(0);
    setCurrentIndex2(0);
    setShowSecondLine(false);
    setShowElements(false);
    setShowSteamHeart(false);
  }, [firstLine, secondLine, !!hero]);

  useEffect(() => {
    if (!hero || currentIndex1 >= firstLine.length) {
      if (currentIndex1 === firstLine.length && firstLine.length > 0) {
        const timeout = setTimeout(() => setShowSecondLine(true), 300);
        return () => clearTimeout(timeout);
      }
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText1(prev => prev + firstLine[currentIndex1]);
      setCurrentIndex1(prev => prev + 1);
    }, 100);
    return () => clearTimeout(timeout);
  }, [currentIndex1, firstLine, !!hero]);

  useEffect(() => {
    if (!showSecondLine || !hero || currentIndex2 >= secondLine.length) {
      if (
        showSecondLine &&
        currentIndex2 === secondLine.length &&
        secondLine.length > 0
      ) {
        const timeout = setTimeout(() => {
          setShowElements(true);
          const heartTimeout = setTimeout(() => setShowSteamHeart(true), 500);
          return () => clearTimeout(heartTimeout);
        }, 800);
        return () => clearTimeout(timeout);
      }
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText2(prev => prev + secondLine[currentIndex2]);
      setCurrentIndex2(prev => prev + 1);
    }, 100);
    return () => clearTimeout(timeout);
  }, [currentIndex2, showSecondLine, secondLine, !!hero]);

  const handleMenuClick = useCallback(() => {
    scrollToSection('menu');
  }, [scrollToSection]);

  const handleContactClick = useCallback(() => {
    setIsContactModalOpen(true);
  }, []);

  if (error || (!isLoading && !hero))
    return (
      <div className="h-screen bg-cream/40 flex items-center justify-center">
        <div className="text-xl text-warm-brown/70 p-8 border border-warm-brown/20 rounded-lg text-center bg-white/50 backdrop-blur-sm">
          <p className="mb-2">☕️</p>
          <p>Контент тимчасово недоступний.</p>
          <p className="text-sm">
            Будь ласка, заповніть секцію Hero в адмін-панелі.
          </p>
        </div>
      </div>
    );

  return (
    <section
      id="home"
      className="relative bg-cream/40"
      style={{
        backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CoffeeBackground />
      <Container className="flex items-center justify-center relative">
        <div
          className="h-[500px] md:h-[600px] lg:h-[800px] w-full flex flex-col items-center justify-center relative"
          role="banner"
          aria-label="Головна секція сайту кав'ярні"
        >
          <AnimatedLogo show={showElements} showSteam={showSteamHeart} />

          <div className="relative z-10 text-center text-warm-white px-4 max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-shadow-lg">
              <div className="relative">
                <div>
                  {displayText1}
                  {currentIndex1 < firstLine.length && (
                    <span
                      className="animate-pulse text-warm-white"
                      aria-hidden="true"
                    >
                      |
                    </span>
                  )}
                </div>

                <div className="mt-2">
                  {displayText2}
                  {showSecondLine && currentIndex2 < secondLine.length && (
                    <span
                      className="animate-pulse text-warm-white"
                      aria-hidden="true"
                    >
                      |
                    </span>
                  )}
                </div>
              </div>
            </h1>

            <p
              className={`text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed text-gray-100 transition-all duration-1000 delay-500 ${
                showElements
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {subtitle}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center transition-all duration-1000 delay-1000 ${
                showElements
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={handleMenuClick}
                className="relative bg-warm-brown/50 backdrop-blur-sm text-warm-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-base md:text-lg transition-all duration-800 shadow-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-sage-green/50 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden group"
                aria-label="Переглянути меню кав'ярні"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sage-green to-warm-brown opacity-0 group-hover:opacity-100 transition-opacity duration-800 rounded-full" />
                <span className="relative z-10">Переглянути меню</span>
              </button>
              <button
                onClick={handleContactClick}
                className="relative bg-sage-green/50 backdrop-blur-sm text-warm-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-base md:text-lg transition-all duration-800 shadow-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-warm-brown/50 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden group"
                aria-label="Перейти до контактної інформації"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-warm-brown to-sage-green opacity-0 group-hover:opacity-100 transition-opacity duration-800 rounded-full" />
                <span className="relative z-10">Зв&apos;язатися з нами</span>
              </button>
            </div>

            {showElements && (
              <>
                <div className="absolute top-40 right-10 animate-float hidden md:block">
                  <Heart className="w-8 h-8 text-white/70" aria-hidden="true" />
                </div>
                <div
                  className="absolute bottom-35 left-10 animate-float hidden md:block"
                  style={{ animationDelay: '1s' }}
                >
                  <Coffee
                    className="w-8 h-8 text-white/70"
                    aria-hidden="true"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Container>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
};
