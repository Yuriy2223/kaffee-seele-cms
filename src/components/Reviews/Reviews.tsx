'use client';

import React, { useCallback } from 'react';
import { StarRating } from './StarRating';
import { ReviewOfTheWeek } from './ReviewOfTheWeek';
import { ExistingReviews } from './ExistingReviews';
import { ReviewForm } from './ReviewForm';
import { toast } from 'react-toastify';
import { Container } from '@/shared/Container';
import { CoffeeBackground } from '@/shared/CoffeeBackground';
import { useInView } from '@/hooks/useInView';
import { useReviewStats } from '@/hooks/useReviewStats';
import type { ReviewFormData } from '@/hooks/useReviewStats';

export type { Review, ReviewFormData } from '@/hooks/useReviewStats';

export const Reviews: React.FC = () => {
  const { reviews, averageRating, totalReviews, addReview } = useReviewStats();

  const { ref: headingRef, inView: headingVisible } = useInView();
  const { ref: bodyRef, inView: bodyVisible } = useInView({ threshold: 0.05 });

  const checkForDuplicate = useCallback(
    (reviewData: ReviewFormData): boolean => {
      return reviews.some(
        review =>
          review.name.toLowerCase() === reviewData.name.trim().toLowerCase() &&
          review.text.toLowerCase() === reviewData.text.trim().toLowerCase()
      );
    },
    [reviews]
  );

  const handleAddReview = useCallback(
    async (reviewData: ReviewFormData) => {
      try {
        if (checkForDuplicate(reviewData)) {
          toast.error('Схожий відгук вже існує. Спробуйте написати щось інше.');
          return;
        }

        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: reviewData.name.trim(),
            rating: reviewData.rating,
            text: reviewData.text.trim(),
            avatar: reviewData.photo,
          }),
        });

        if (!response.ok) throw new Error('Failed to add review');

        const savedReview = await response.json();
        addReview(savedReview);

        toast.success(
          'Дякуємо за відгук! Ваш відгук допоможе нам стати ще кращими'
        );
      } catch {
        toast.error('Сталася помилка при додаванні відгуку. Спробуйте ще раз.');
      }
    },
    [checkForDuplicate, addReview]
  );

  const reviewOfTheWeekId = React.useMemo(() => {
    if (!reviews || reviews.length === 0) return null;
    const selected = reviews.find(r => r.isReviewOfTheWeek);
    if (selected) return selected._id || selected.id;
    const fallback = reviews.find(r => r.rating === 5) || reviews[0];
    return fallback ? fallback._id || fallback.id : null;
  }, [reviews]);

  const displayedReviews = React.useMemo(() => {
    return reviews
      .filter(r => (r._id || r.id) !== reviewOfTheWeekId)
      .slice(0, 6);
  }, [reviews, reviewOfTheWeekId]);

  const { ref: extraRef, inView: extraVisible } = useInView({ threshold: 0.1 });

  return (
    <section id="reviews" className="relative bg-cream/20 overflow-hidden">
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
            Відгуки наших гостей
          </h3>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center">
              <StarRating rating={Math.round(parseFloat(averageRating))} />
              <span className="ml-2 text-2xl font-bold text-warm-brown transition-transform hover:scale-110 duration-300">
                {averageRating}
              </span>
              <span className="ml-2 text-dark-text opacity-70">
                ({totalReviews} відгуків)
              </span>
            </div>
          </div>
          <p className="text-xl text-dark-text max-w-2xl mx-auto italic opacity-80">
            Нам важлива ваша думка про нас
          </p>
        </div>

        <div
          ref={bodyRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-1000 ease-spring ${
            bodyVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20 rotate-x-6'
          }`}
        >
          <ReviewOfTheWeek />
        </div>

        <div
          ref={extraRef as React.RefObject<HTMLDivElement>}
          className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto transform-style-3d"
        >
          <div
            className={`lg:col-span-2 transition-all duration-1000 ease-spring ${extraVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <ExistingReviews reviews={displayedReviews} />
          </div>
          <div
            className={`transition-all duration-1000 ease-spring delay-200 ${extraVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            <ReviewForm onSubmit={handleAddReview} />
          </div>
        </div>
      </Container>
    </section>
  );
};
