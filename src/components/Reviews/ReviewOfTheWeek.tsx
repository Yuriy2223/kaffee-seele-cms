'use client';

import Image from 'next/image';
import { Quote } from 'lucide-react';
import { StarRating } from './StarRating';
import { useReviewStats } from '@/hooks/useReviewStats';
import { useMemo } from 'react';

export const ReviewOfTheWeek = () => {
  const { reviews } = useReviewStats();

  const reviewOfTheWeek = useMemo(() => {
    if (!reviews || reviews.length === 0) return null;

    const selected = reviews.find(r => r.isReviewOfTheWeek);
    if (selected) return selected;

    return reviews.find(r => r.rating === 5) || reviews[0];
  }, [reviews]);

  if (!reviewOfTheWeek) return null;

  const formattedDate = new Date(reviewOfTheWeek.date).toLocaleDateString(
    'uk-UA',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
  );

  return (
    <div className="mb-16">
      <div className="max-w-4xl mx-auto">
        <h4 className="text-2xl font-semibold text-sage-green mb-8 text-center">
          Відгук тижня
        </h4>
        <div className="bg-linear-to-r from-warm-brown to-sage-green rounded-2xl p-8 text-center shadow-xl relative overflow-hidden animate-glow hover:scale-[1.02] transition-transform duration-500">
          <div className="absolute top-4 right-4 text-warm-white/20">
            <Quote className="w-12 h-12 rotate-12" />
          </div>
          <div className="absolute -bottom-8 -left-8 text-warm-white/10">
            <Quote className="w-32 h-32 -rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
              {reviewOfTheWeek.avatar ? (
                <Image
                  src={reviewOfTheWeek.avatar}
                  alt={reviewOfTheWeek.name}
                  width={64}
                  height={64}
                  className="w-20 h-20 rounded-full sm:mr-6 mb-4 sm:mb-0 border-4 border-warm-white/30 object-cover shadow-2xl transition-transform duration-500 hover:rotate-6 hover:scale-110"
                />
              ) : (
                <div className="w-20 h-20 rounded-full sm:mr-6 mb-4 sm:mb-0 border-4 border-warm-white/30 bg-warm-white/10 flex items-center justify-center shadow-2xl transition-transform duration-500 hover:rotate-6 hover:scale-110">
                  <span className="text-warm-white font-bold text-3xl">
                    {reviewOfTheWeek.name[0]}
                  </span>
                </div>
              )}
              <div className="text-center sm:text-left">
                <h5 className="text-2xl font-bold text-warm-white mb-1">
                  {reviewOfTheWeek.name}
                </h5>
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="flex sm:mr-3 mb-2 sm:mb-0">
                    <StarRating rating={reviewOfTheWeek.rating} />
                  </div>
                  <span className="text-warm-white/60 text-sm font-medium bg-warm-white/10 px-3 py-0.5 rounded-full">
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>
            <blockquote className="text-xl md:text-2xl text-warm-white font-medium mb-8 leading-relaxed italic relative px-8">
              <span className="absolute top-0 left-0 text-4xl opacity-20">
                &ldquo;
              </span>
              {reviewOfTheWeek.text}
              <span className="absolute bottom-0 right-0 text-4xl opacity-20">
                &rdquo;
              </span>
            </blockquote>
            <div className="inline-flex items-center bg-warm-white/20 text-warm-white px-6 py-2 rounded-full text-sm font-bold tracking-wide uppercase border border-warm-white/30 backdrop-blur-md">
              <span className="mr-2">🏆</span> Відгук тижня
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
