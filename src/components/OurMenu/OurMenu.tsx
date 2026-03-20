'use client';

import Image from 'next/image';
import { Container } from '@/shared/Container';
import { Icon } from '@/shared/Icon';
import { ICoffeeMenu, IDessertMenu, IBaristaRecommend } from '@/shared/types';
import { CoffeeBackground } from '@/shared/CoffeeBackground';
import { useInView } from '@/hooks/useInView';
import {
  useCoffeeMenu,
  useDessertsMenu,
  useBaristaRecommendation,
} from '@/hooks/useMenu';

export const OurMenu = () => {
  const { data: coffeeData, isLoading: isCoffeeLoading } = useCoffeeMenu();
  const { data: dessertsData, isLoading: isDessertsLoading } =
    useDessertsMenu();
  const { data: baristaDataResponse, isLoading: isBaristaLoading } =
    useBaristaRecommendation();

  const coffeeItems = Array.isArray(coffeeData) ? coffeeData : [];
  const dessertItems = Array.isArray(dessertsData) ? dessertsData : [];
  const dbBaristaRec = baristaDataResponse;

  const renderIcon = (iconName?: string) => {
    return (
      <Icon name={iconName || 'coffee'} className="text-warm-brown w-6 h-6" />
    );
  };

  const currentBaristaRec =
    dbBaristaRec &&
    typeof dbBaristaRec === 'object' &&
    'baristaName' in dbBaristaRec
      ? {
          baristaName: dbBaristaRec.baristaName,
          baristaTitle: dbBaristaRec.baristaTitle,
          baristaAvatar: dbBaristaRec.baristaAvatar,
          drinkName: dbBaristaRec.drinkName,
          drinkDescription: dbBaristaRec.drinkDescription,
          drinkPrice: dbBaristaRec.drinkPrice,
          specialOffer: dbBaristaRec.specialOffer,
        }
      : null;

  const { ref: headingRef, inView: headingVisible } = useInView();
  const { ref: coffeeRef, inView: coffeeInView } = useInView({
    threshold: 0.05,
  });
  const { ref: dessertsRef, inView: dessertsInView } = useInView({
    threshold: 0.05,
  });
  const { ref: baristaRef, inView: baristaInView } = useInView({
    threshold: 0.1,
  });

  const isAnyLoading = isCoffeeLoading || isDessertsLoading || isBaristaLoading;

  return (
    <section id="menu" className="relative bg-cream/20 pt-16 pb-20 font-sans">
      <CoffeeBackground />
      <Container className="px-4 py-10">
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-10"
        >
          <h3
            className={`text-4xl md:text-5xl font-bold text-warm-brown mb-6 transition-all duration-1000 ease-spring ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Наше меню
          </h3>
          <p
            className={`text-xl text-dark-text max-w-2xl mx-auto transition-all duration-1000 ease-spring delay-200 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Кожна чашка кави - це маленька подорож до смакового раю
          </p>
        </div>

        {coffeeItems.length > 0 && (
          <div className="mb-20">
            <h4 className="text-3xl font-semibold text-sage-green mb-12 text-center">
              Популярні кавові напої
            </h4>

            <div
              ref={coffeeRef as React.RefObject<HTMLDivElement>}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {coffeeItems.map((item: ICoffeeMenu, index: number) => (
                <div
                  key={item.id || `coffee-${index}`}
                  className={`group bg-warm-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-1000 ease-springtransform block ${
                    coffeeInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: coffeeInView ? `${index * 200}ms` : '0ms',
                  }}
                >
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-cream/20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h5 className="text-xl font-bold text-warm-brown mb-2">
                    {item.name}
                  </h5>
                  <p className="text-dark-text mb-4 line-clamp-2 text-sm md:text-base">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold text-sage-green">
                      ₴{item.price}
                    </span>
                    {renderIcon(item.icon)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {dessertItems.length > 0 && (
          <div className="mb-20">
            <h4 className="text-3xl font-semibold text-sage-green mb-12 text-center">
              Фірмові десерти
            </h4>

            <div
              ref={dessertsRef as React.RefObject<HTMLDivElement>}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {dessertItems.map((item: IDessertMenu, index: number) => (
                <div
                  key={item.id || `dessert-${index}`}
                  className={`group bg-warm-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-1000 ease-springtransform block ${
                    dessertsInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: dessertsInView
                      ? `${index * 200}ms`
                      : '0ms',
                  }}
                >
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-cream/20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h5 className="text-xl font-bold text-warm-brown mb-2">
                    {item.name}
                  </h5>
                  <p className="text-dark-text mb-4 line-clamp-2 text-sm md:text-base">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold text-sage-green">
                      ₴{item.price}
                    </span>

                    <Icon
                      name="cooking-pot"
                      className="text-warm-brown/30 w-5 h-5 line-clamp-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentBaristaRec && (
          <div className="mt-20">
            <h4 className="text-3xl font-semibold text-sage-green mb-8 text-center">
              Рекомендація бариста
            </h4>

            <div
              ref={baristaRef as React.RefObject<HTMLDivElement>}
              className={`max-w-3xl mx-auto mb-16 transition-all duration-1000 ease-spring ${
                baristaInView
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-95 rotate-1'
              }`}
            >
              <div className="bg-linear-to-r from-warm-brown to-sage-green rounded-3xl p-8 text-center shadow-xl border-4 border-warm-white/20">
                <div className="flex items-center justify-center mb-6">
                  <Image
                    src={currentBaristaRec.baristaAvatar}
                    alt={currentBaristaRec.baristaName}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full mr-4 border-4 border-warm-white shadow-lg object-cover"
                  />
                  <div className="text-left text-warm-white">
                    <h5 className="text-2xl font-bold mb-1">
                      Вибір {currentBaristaRec.baristaName}
                    </h5>
                    <p className="text-warm-white/80 font-medium">
                      {currentBaristaRec.baristaTitle}
                    </p>
                  </div>
                </div>
                <h6 className="text-3xl font-extrabold text-warm-white mb-4">
                  {currentBaristaRec.drinkName}
                </h6>
                <p className="text-warm-white/90 mb-6 leading-relaxed text-lg italic">
                  &ldquo;{currentBaristaRec.drinkDescription}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-6">
                  <span className="text-4xl font-black text-warm-white">
                    ₴{currentBaristaRec.drinkPrice}
                  </span>
                  {currentBaristaRec.specialOffer && (
                    <span className="bg-warm-white text-sage-green px-6 py-2 rounded-full text-sm font-bold shadow-md uppercase tracking-wider">
                      {currentBaristaRec.specialOffer}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {isAnyLoading && (
          <div className="flex justify-center items-center gap-3 py-10">
            <div className="w-8 h-8 border-4 border-sage-green border-t-transparent rounded-full animate-spin"></div>
            <span className="text-warm-brown font-medium">
              Оновлення меню...
            </span>
          </div>
        )}

        {!isAnyLoading &&
          coffeeItems.length === 0 &&
          dessertItems.length === 0 &&
          !currentBaristaRec && (
            <div className="text-center py-20 border-2 border-dashed border-sage-green/30 rounded-3xl bg-warm-white/50">
              <p className="text-xl text-warm-brown opacity-60 italic">
                Меню порожнє. Додайте товари в базу даних MongoDB.
              </p>
            </div>
          )}
      </Container>
    </section>
  );
};
