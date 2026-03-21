'use client';

import { useState, useMemo, useCallback } from 'react';
import { ICoffeeOrigin } from '@/shared/types';
import { Container } from '@/shared/Container';
import { coffeeOrigins as mockOrigins } from './ConstCoffeeOrigins';
import { CoffeeBackground } from '@/shared/CoffeeBackground';
import { useInView } from '@/hooks/useInView';
import { useCoffeeOrigins } from '@/hooks/useMenu';
import { Icon } from '@/shared/Icon';

export const CoffeeOrigins = () => {
  const { data: originsData, isLoading } = useCoffeeOrigins();
  const [selectedOrigin, setSelectedOrigin] = useState<number | null>(null);
  const [hoveredOrigin, setHoveredOrigin] = useState<number | null>(null);
  const { ref: headingRef, inView: headingVisible } = useInView({
    threshold: 0.1,
  });
  const { ref: mapRef, inView: mapVisible } = useInView({ threshold: 0.2 });

  const origins = useMemo<ICoffeeOrigin[]>(() => {
    return Array.isArray(originsData) && originsData.length > 0
      ? originsData
      : (mockOrigins as unknown as ICoffeeOrigin[]);
  }, [originsData]);

  const renderIcon = (icon: any, className?: string) => {
    if (!icon) return <Icon name="coffee" className={className} />;

    if (
      typeof icon === 'function' ||
      (typeof icon === 'object' && icon !== null && (icon as any).$$typeof)
    ) {
      const IconComp = icon;
      return <IconComp className={className} />;
    }

    return <Icon name={String(icon)} className={className} />;
  };

  const selectedOriginData = useMemo(() => {
    return selectedOrigin ? origins.find(o => o.id === selectedOrigin) : null;
  }, [selectedOrigin, origins]);

  const handleOriginSelect = useCallback(
    (originId: number) => {
      setSelectedOrigin(selectedOrigin === originId ? null : originId);
    },
    [selectedOrigin]
  );

  const handleMarkerHover = useCallback((originId: number) => {
    setHoveredOrigin(originId);
  }, []);

  const handleMarkerLeave = useCallback(() => {
    setHoveredOrigin(null);
  }, []);

  if (isLoading && !originsData) {
    return (
      <section
        id="coffee-origins"
        className="relative bg-white py-20 text-center"
      >
        <Container>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-sage-green border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl text-warm-brown">
              Завантаження карти походження...
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="coffee-origins"
      className="relative bg-white overflow-hidden font-sans"
      aria-label="Карта походження нашої кави"
    >
      <CoffeeBackground />
      <Container className="px-4 py-10 perspective-2000">
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-10 transition-all duration-1000 ease-spring ${
            headingVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-12 scale-90'
          }`}
        >
          <h3 className="text-4xl md:text-5xl font-bold text-warm-brown mb-6">
            Карта походження нашої кави
          </h3>
          <p className="text-xl text-dark-text max-w-2xl mx-auto opacity-80">
            Дізнайтеся більше про походження кавових зерен, які ми
            використовуємо у наших напоях
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div
            className="relative mb-16"
            ref={mapRef as React.RefObject<HTMLDivElement>}
          >
            <div
              className={`bg-gradient-to-b from-sage-green/10 to-warm-brown/10 rounded-2xl p-4 sm:p-8 shadow-xl transition-all duration-1000 ${
                mapVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="relative w-full h-64 sm:h-80 bg-cream/30 rounded-xl overflow-hidden shadow-inner">
                <svg
                  viewBox="0 0 100 60"
                  className="w-full h-full"
                  role="img"
                  aria-label="Карта світу з кавовими регіонами"
                >
                  <path
                    d="M10,20 Q20,15 30,25 Q40,30 35,40 Q25,45 15,35 Q5,30 10,20 Z"
                    fill="none"
                    stroke="var(--sage-green)"
                    strokeWidth="0.5"
                    className={
                      mapVisible ? 'animate-draw opacity-40' : 'opacity-0'
                    }
                  />
                  <path
                    d="M45,15 Q55,10 70,20 Q80,25 75,35 Q70,40 60,35 Q50,30 45,15 Z"
                    fill="none"
                    stroke="var(--sage-green)"
                    strokeWidth="0.5"
                    className={
                      mapVisible ? 'animate-draw opacity-40' : 'opacity-0'
                    }
                    style={{ animationDelay: '0.5s' }}
                  />
                  <path
                    d="M20,45 Q35,40 45,50 Q40,55 25,52 Q15,50 20,45 Z"
                    fill="none"
                    stroke="var(--sage-green)"
                    strokeWidth="0.5"
                    className={
                      mapVisible ? 'animate-draw opacity-40' : 'opacity-0'
                    }
                    style={{ animationDelay: '1s' }}
                  />
                </svg>

                {origins.map((origin: ICoffeeOrigin, index: number) => {
                  const isSelected = selectedOrigin === origin.id;
                  const isHovered = hoveredOrigin === origin.id;
                  return (
                    <button
                      key={origin.id}
                      className={`absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 transform-style-3d focus:outline-none focus:ring-2 focus:ring-warm-brown focus:ring-offset-2 ${
                        isHovered || isSelected
                          ? 'bg-warm-brown text-warm-white scale-125 shadow-2xl z-20'
                          : 'bg-warm-white text-warm-brown border-2 border-warm-brown hover:scale-110 z-10'
                      } ${mapVisible ? 'opacity-100 translate-y-0 animate-[bounce-subtle_2s_ease-in-out_infinite]' : 'opacity-0 -translate-y-8'}`}
                      style={{
                        left: `${origin.coordinates?.x || 0}%`,
                        top: `${origin.coordinates?.y || 0}%`,
                        transform: 'translate(-50%, -50%)',
                        animationDelay: `${index * 0.3}s`,
                        transitionDelay: mapVisible
                          ? `${index * 150}ms`
                          : '0ms',
                      }}
                      onMouseEnter={() => handleMarkerHover(origin.id)}
                      onMouseLeave={handleMarkerLeave}
                      onClick={() => handleOriginSelect(origin.id)}
                      aria-label={`Вибрати регіон ${origin.country}, ${origin.region}`}
                      aria-pressed={isSelected}
                      tabIndex={0}
                    >
                      <div
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 ${isHovered || isSelected ? 'rotate-[360deg] scale-110' : ''}`}
                      >
                        {renderIcon(origin.icon, 'w-full h-full')}
                      </div>
                      {(isHovered || isSelected) && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-warm-brown text-white text-[10px] sm:text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg animate-in fade-in zoom-in duration-300">
                          {origin.country}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 transform-style-3d">
            <div
              className={`lg:col-span-1 transition-all duration-1000 ease-[var(--ease-spring)] ${mapVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            >
              <h4 className="text-xl sm:text-2xl font-semibold text-sage-green mb-4 sm:mb-6">
                Наші постачальники
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {origins.map((origin: ICoffeeOrigin, index: number) => (
                  <button
                    key={origin.id}
                    className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-500 ease-[var(--ease-spring)] focus:outline-none focus:ring-2 focus:ring-warm-brown focus:ring-offset-2 ${
                      selectedOrigin === origin.id
                        ? 'bg-warm-brown text-warm-white shadow-lg scale-105'
                        : 'bg-warm-white hover:bg-cream/50 translate-x-0'
                    } ${mapVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{
                      transitionDelay: mapVisible ? `${index * 100}ms` : '0ms',
                    }}
                    onClick={() => handleOriginSelect(origin.id)}
                    aria-label={`Переглянути деталі про ${origin.country}, ${origin.region}`}
                    aria-pressed={selectedOrigin === origin.id}
                    tabIndex={0}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-4 h-4 sm:w-5 sm:h-5 mr-3 transition-transform duration-500 ${selectedOrigin === origin.id ? 'rotate-[360deg]' : ''}`}
                      >
                        {renderIcon(origin.icon, 'w-full h-full')}
                      </div>
                      <h5 className="font-semibold text-sm sm:text-base">
                        {origin.country}
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm opacity-90">
                      {origin.region}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedOrigin ? (
                <div
                  key={selectedOrigin}
                  className="bg-warm-white rounded-2xl p-6 sm:p-8 shadow-xl animate-in slide-in-from-right-12 fade-in duration-700 ease-[var(--ease-spring)] transform-style-3d"
                >
                  {selectedOriginData && (
                    <>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-warm-brown/10 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 text-warm-brown">
                            {renderIcon(
                              selectedOriginData.icon,
                              'w-full h-full'
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-2xl sm:text-3xl font-bold text-warm-brown mb-2">
                            {selectedOriginData.country}
                          </h4>
                          <p className="text-base sm:text-lg text-sage-green font-medium">
                            {selectedOriginData.region}
                          </p>
                        </div>
                      </div>

                      <p className="text-dark-text mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                        {selectedOriginData.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                        <div>
                          <h5 className="font-semibold text-base sm:text-lg text-warm-brown mb-4">
                            Характеристики смаку
                          </h5>
                          <ul className="space-y-2">
                            {selectedOriginData.characteristics?.map(
                              (char: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-center text-dark-text text-sm sm:text-base"
                                >
                                  <div className="w-2 h-2 bg-sage-green rounded-full mr-3 flex-shrink-0"></div>
                                  {char}
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-semibold text-base sm:text-lg text-warm-brown mb-4">
                            Деталі вирощування
                          </h5>
                          <div className="space-y-3 text-dark-text text-sm sm:text-base">
                            <div className="flex justify-between">
                              <span className="font-medium">Висота:</span>
                              <span>{selectedOriginData.altitude}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Збір врожаю:</span>
                              <span className="text-right">
                                {selectedOriginData.harvest}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Обробка:</span>
                              <span className="text-right">
                                {selectedOriginData.processing}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Сорти:</span>
                              <span className="text-right">
                                {selectedOriginData.varieties?.join(', ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-sage-green/10 rounded-xl">
                        <h5 className="font-semibold text-base sm:text-lg text-sage-green mb-4">
                          У наших напоях
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedOriginData.ourBlends?.map(
                            (blend: string, index: number) => (
                              <span
                                key={index}
                                className="bg-warm-brown text-warm-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium"
                              >
                                {blend}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="bg-warm-white rounded-2xl p-6 sm:p-8 shadow-lg text-center">
                  <Icon
                    name="coffee"
                    className="w-12 h-12 sm:w-16 sm:h-16 text-warm-brown/30 mx-auto mb-4 sm:mb-6"
                  />
                  <h4 className="text-xl sm:text-2xl font-semibold text-warm-brown mb-4">
                    Оберіть регіон на карті
                  </h4>
                  <p className="text-dark-text text-sm sm:text-base">
                    Клікніть на маркер або назву країни, щоб дізнатися більше
                    про походження наших зерен
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
