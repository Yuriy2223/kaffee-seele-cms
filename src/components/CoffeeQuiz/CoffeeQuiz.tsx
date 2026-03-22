'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ICoffeeQuiz } from '@/shared/types';
import { coffeeRecommendations, quizQuestions } from './ConstCoffeeQuiz';
import { Container } from '@/shared/Container';
import { CoffeeBackground } from '@/shared/CoffeeBackground';
import { useCoffeeQuiz } from '@/hooks/useMenu';
import { Icon } from '@/shared/Icon';
import { useInView } from '@/hooks/useInView';
import React from 'react';

export type QuizQuestion = ICoffeeQuiz;

export interface CoffeeRecommendation {
  name: string;
  description: string;
  flavor: string;
  strength: string;
  price: string;
  image: string;
  characteristics: string[];
  perfectFor: string[];
}

export const CoffeeQuiz = () => {
  const { data: quizData, isLoading: isQuizLoading } = useCoffeeQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
  });
  const { ref: quizRef, inView: quizInView } = useInView({ threshold: 0.05 });

  const questions = useMemo(() => {
    return Array.isArray(quizData) && quizData.length > 0
      ? quizData
      : quizQuestions;
  }, [quizData]);

  const renderIcon = (icon: any, className?: string) => {
    const defaultClassName =
      className || 'w-6 h-6 text-sage-green group-hover:text-white';
    if (!icon) return <Icon name="coffee" className={defaultClassName} />;

    if (
      typeof icon === 'function' ||
      (typeof icon === 'object' && icon !== null && (icon as any).$$typeof)
    ) {
      const IconComp = icon;
      return <IconComp className={defaultClassName} />;
    }

    return <Icon name={String(icon)} className={defaultClassName} />;
  };

  const recommendation = useMemo(() => {
    if (!showResult || Object.keys(answers).length === 0) return null;

    const weights: Record<string, number> = {};

    questions.forEach(question => {
      const selectedOption = question.options.find(
        (opt: any) => opt.id === answers[question.id]
      );
      if (selectedOption) {
        Object.entries(selectedOption.weight).forEach(([key, value]) => {
          weights[key] = (weights[key] || 0) + (value as number);
        });
      }
    });

    let bestMatch = coffeeRecommendations[0];
    let bestScore = -1;

    coffeeRecommendations.forEach(coffee => {
      let score = 0;

      if (weights.light && coffee.strength === 'Легка-середня') score += 3;
      if (weights.balanced && coffee.strength === 'Середня') score += 3;
      if (weights.strong && coffee.strength === 'Висока') score += 3;
      if (weights.fruity && coffee.flavor.toLowerCase().includes('фруктов'))
        score += 3;
      if (weights.nutty && coffee.flavor.toLowerCase().includes('горіхов'))
        score += 3;
      if (weights.sweet && coffee.flavor.toLowerCase().includes('карамельн'))
        score += 2;
      if (weights.premium && coffee.name.includes('Блю Маунтін')) score += 4;
      if (
        (weights.specialty && coffee.price.includes('180')) ||
        coffee.price.includes('195')
      )
        score += 2;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = coffee;
      }
    });

    return bestMatch;
  }, [answers, showResult, questions]);

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));

    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setIsAnimating(false);
  };

  if (isQuizLoading) {
    return (
      <section
        id="coffee-quiz"
        className="relative bg-cream/20 py-20 text-center font-sans"
      >
        <Container>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-sage-green border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl text-warm-brown">Завантаження тесту...</p>
          </div>
        </Container>
      </section>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <section
      id="coffee-quiz"
      className="relative bg-linear-to-r from-sage-green/10 to-warm-brown/10 font-sans"
    >
      <CoffeeBackground />
      <Container className="px-4 py-10">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
        >
          <h3
            className={`text-4xl md:text-5xl font-bold text-warm-brown mb-6 transition-all duration-1000 ease-spring ${
              headerInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Знайдіть свою ідеальну каву
          </h3>
          <p
            className={`text-xl text-dark-text max-w-2xl mx-auto transition-all duration-1000 ease-spring delay-200 ${
              headerInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Пройдіть наш персональний тест і отримайте рекомендацію кави, яка
            ідеально підходить саме вам
          </p>
        </div>

        {showResult && recommendation ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 animate-slideUp">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-linear-to-br from-sage-green to-warm-brown rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="coffee" className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-warm-brown mb-4">
                Ваша ідеальна кава!
              </h3>
              <p className="text-dark-text">
                На основі ваших відповідей, ми підібрали для вас найкращий
                варіант
              </p>
            </div>

            <div className="bg-linear-to-r from-sage-green/10 to-warm-brown/10 rounded-2xl p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-32 h-32 shrink-0">
                  <Image
                    src={recommendation.image}
                    alt={recommendation.name}
                    fill
                    className="rounded-full object-cover shadow-lg"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-warm-brown mb-2">
                    {recommendation.name}
                  </h4>
                  <p className="text-dark-text mb-4 leading-relaxed">
                    {recommendation.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-bold text-sage-green block mb-1">
                        Смак:
                      </span>
                      <p className="text-dark-text font-medium">
                        {recommendation.flavor}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-sage-green block mb-1">
                        Міцність:
                      </span>
                      <p className="text-dark-text font-medium">
                        {recommendation.strength}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h5 className="font-bold text-lg text-warm-brown mb-4">
                Характеристики:
              </h5>
              <div className="flex flex-wrap gap-2 mb-6">
                {recommendation.characteristics.map(
                  (char: string, index: number) => (
                    <span
                      key={index}
                      className="bg-cream/50 text-dark-text px-4 py-1.5 rounded-full text-sm font-medium border border-cream"
                    >
                      {char}
                    </span>
                  )
                )}
              </div>

              <h5 className="font-bold text-lg text-sage-green mb-4">
                Ідеально для:
              </h5>
              <div className="flex flex-wrap gap-2">
                {recommendation.perfectFor.map((use: string, index: number) => (
                  <span
                    key={index}
                    className="bg-sage-green/10 text-sage-green px-4 py-1.5 rounded-full text-sm font-bold"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={restartQuiz}
                className="inline-flex items-center space-x-2 bg-sage-green text-warm-white px-8 py-4 rounded-full hover:bg-sage-green/90 transition-all font-bold shadow-lg hover:shadow-xl active:scale-95"
                aria-label="Пройти тест знову"
              >
                <Icon name="rotate-ccw" className="w-5 h-5" />
                <span>Пройти тест знову</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            ref={quizRef as React.RefObject<HTMLDivElement>}
            className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
          >
            <div className="mb-8 relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-warm-brown/70 tracking-wider">
                  Питання {currentQuestion + 1} з {questions.length}
                </span>
                <span className="text-sm text-sage-green font-black">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}
                  %
                </span>
              </div>
              <div className="w-full bg-cream/30 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-sage-green to-warm-brown h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div
              className={`transition-all duration-700 ease-spring relative z-10 ${
                isAnimating
                  ? 'opacity-0 transform translate-x-12'
                  : 'opacity-100 transform translate-x-0'
              }`}
            >
              <div
                className={`text-center mb-10 transition-all duration-1000 ${quizInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="w-20 h-20 bg-warm-brown/5 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                  <Icon name="coffee" className="w-10 h-10 text-warm-brown" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-warm-brown mb-4 leading-tight">
                  {currentQ?.question}
                </h3>
              </div>

              <div className="space-y-4">
                {currentQ?.options.map((option: any, index: number) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(currentQ.id, option.id)}
                    className={`w-full p-5 bg-warm-white border-2 border-transparent hover:border-sage-green/30 rounded-2xl transition-all duration-700 hover:shadow-xl hover:scale-[1.02] group text-left relative overflow-hidden ${quizInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{
                      transitionDelay: quizInView
                        ? `${index * 100 + 300}ms`
                        : '0ms',
                    }}
                    aria-label={`Вибрати відповідь: ${option.text}`}
                  >
                    <div className="flex items-center space-x-5 relative z-10">
                      <div className="w-14 h-14 bg-sage-green/5 group-hover:bg-sage-green group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-500 transform group-hover:rotate-6">
                        {renderIcon(option.icon)}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg text-dark-text group-hover:text-warm-brown transition-colors">
                          {option.text}
                        </p>
                      </div>
                      <Icon
                        name="arrow-right"
                        className="w-6 h-6 text-sage-green opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
