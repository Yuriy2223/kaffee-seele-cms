'use client';

import { Leaf, Heart, Users, Coffee } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/shared/Container';
import { TeamCarousel } from './TeamCarousel';
import { CoffeeBackground } from '@/shared/CoffeeBackground';
import { useInView } from '@/hooks/useInView';
import React from 'react';
import { useAbout } from '@/hooks/useMenu';

const storyCards = [
  {
    icon: Coffee,
    iconColor: 'text-warm-brown',
    bgColor: 'bg-warm-brown/10',
    titleColor: 'text-warm-brown',
    title: 'Походження еспресо',
    text: `Знаєте, що еспресо з'явився в Італії на початку 20 століття? Слово "espresso" означає "приготований на замовлення". Кожна наша чашка еспресо готується персонально для вас за традиційною італійською технологією.`,
  },
  {
    icon: Heart,
    iconColor: 'text-sage-green',
    bgColor: 'bg-sage-green/10',
    titleColor: 'text-sage-green',
    title: 'Мистецтво латте-арту',
    text: 'Латте-арт не просто прикраса — це спосіб передати емоції через каву. Наші баристи вивчають це мистецтво роками, щоб кожна ваша чашка капучино чи латте була не тільки смачною, а й красивою.',
  },
  {
    icon: Leaf,
    iconColor: 'text-warm-brown',
    bgColor: 'bg-warm-brown/10',
    titleColor: 'text-warm-brown',
    title: 'Етіопські корені',
    text: 'Кава була відкрита в Етіопії понад 1000 років тому пастухом Калді, який помітив, що його кози стають енергійнішими після поїдання певних ягід. Ми використовуємо етіопські зерна в наших авторських сумішах.',
  },
  {
    icon: Users,
    iconColor: 'text-sage-green',
    bgColor: 'bg-sage-green/10',
    titleColor: 'text-sage-green',
    title: "Кава об'єднує",
    text: "У різних культурах кава — це символ гостинності та спілкування. В Туреччині наречений повинен був навчитися готувати каву для батьків нареченої. Ми продовжуємо цю традицію створення зв'язків через каву.",
  },
];

export const About = () => {
  const { data: about, isLoading, error } = useAbout();
  const { ref: headingRef, inView: headingVisible } = useInView();
  const { ref: photosRef, inView: photosVisible } = useInView({
    threshold: 0.1,
  });
  const { ref: cardsRef, inView: cardsVisible } = useInView({
    threshold: 0.05,
  });
  const { ref: valuesRef, inView: valuesVisible } = useInView({
    threshold: 0.1,
  });

  if (isLoading)
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-sage-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error || !about) return null;

  const { title, subtitle, story, images } = about;

  return (
    <section id="about" className="relative bg-cream/10">
      <CoffeeBackground />
      <Container className="px-4 py-10">
        <div className="max-w-6xl mx-auto text-center">
          <div
            ref={headingRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-warm-brown mb-8">
              {title}
            </h3>
            <div className="mb-10">
              <h4 className="text-2xl font-semibold text-sage-green mb-6">
                {subtitle}
              </h4>
              <div className="space-y-6">
                {story.map((para: any, idx: number) => (
                  <p
                    key={idx}
                    className="text-lg text-dark-text leading-relaxed"
                  >
                    {para.text}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={photosRef as React.RefObject<HTMLDivElement>}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {images.map((photo: any, index: number) => (
              <div
                key={index}
                className={`group overflow-hidden rounded-2xl shadow-lg transition-all duration-1000 ease-out ${
                  photosVisible
                    ? 'opacity-100 scale-100 blur-0'
                    : 'opacity-0 scale-110 blur-md'
                }`}
                style={{
                  transitionDelay: photosVisible ? `${index * 250}ms` : '0ms',
                }}
              >
                <Image
                  src={photo.url}
                  alt={`Фото галереї ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          <div className="mb-10">
            <TeamCarousel />
          </div>

          <div className="mb-10">
            <h4 className="text-2xl font-semibold text-sage-green mb-8 text-center">
              Кавові історії
            </h4>
            <div
              ref={cardsRef as React.RefObject<HTMLDivElement>}
              className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto perspective-1000 transform-style-3d"
            >
              {storyCards.map((card, index) => {
                const Icon = card.icon;
                const fromLeft = index % 2 === 0;
                return (
                  <div
                    key={card.title}
                    className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-1000 ease-[var(--ease-spring)] backface-hidden ${
                      cardsVisible
                        ? 'opacity-100 translate-x-0 rotate-y-0'
                        : `opacity-0 ${fromLeft ? '-translate-x-12 -rotate-y-12' : 'translate-x-12 rotate-y-12'}`
                    }`}
                    style={{
                      transitionDelay: cardsVisible
                        ? `${index * 150}ms`
                        : '0ms',
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-12 h-12 ${card.bgColor} rounded-full flex items-center justify-center mr-4 transition-transform duration-500 group-hover:rotate-12`}
                      >
                        <Icon className={`w-6 h-6 ${card.iconColor}`} />
                      </div>
                      <h5
                        className={`font-semibold text-lg ${card.titleColor} group-hover:text-sage-green transition-colors duration-300`}
                      >
                        {card.title}
                      </h5>
                    </div>
                    <p className="text-dark-text text-sm leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            ref={valuesRef as React.RefObject<HTMLDivElement>}
            className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-700 ${
              valuesVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h4 className="text-2xl font-semibold text-sage-green mb-4">
              Наші цінності
            </h4>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                {
                  Icon: Leaf,
                  color: 'text-sage-green',
                  title: 'Екологічність',
                  text: 'Використовуємо органічні інгредієнти та підтримуємо сталий розвиток',
                  delay: 0,
                },
                {
                  Icon: Heart,
                  color: 'text-warm-brown',
                  title: 'Якість',
                  text: "Кожна чашка готується з любов'ю та увагою до деталей",
                  delay: 100,
                },
                {
                  Icon: Users,
                  color: 'text-sage-green',
                  title: 'Спільнота',
                  text: 'Створюємо простір для зустрічей та спілкування',
                  delay: 200,
                },
              ].map(({ Icon, color, title, text, delay }) => (
                <div
                  key={title}
                  className={`transition-all duration-700 ${
                    valuesVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  }`}
                  style={{
                    transitionDelay: valuesVisible ? `${delay}ms` : '0ms',
                  }}
                >
                  <Icon className={`w-8 h-8 ${color} mb-3`} />
                  <h5 className="font-semibold mb-2">{title}</h5>
                  <p className="text-sm text-dark-text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
