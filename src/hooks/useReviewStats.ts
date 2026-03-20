'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

export interface Review {
  _id?: string;
  id?: number | string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
  isReviewOfTheWeek?: boolean;
}

export interface ReviewFormData {
  name: string;
  rating: number;
  text: string;
  photo?: string;
}

interface ReviewStats {
  averageRating: string;
  totalReviews: number;
  reviews: Review[];
  loading: boolean;
  addReview: (review: Review) => void;
  refetch: () => void;
}

let cachedReviews: Review[] | null = null;
let fetchPromise: Promise<Review[]> | null = null;
const listeners = new Set<(reviews: Review[]) => void>();

const fetchReviews = async (): Promise<Review[]> => {
  if (cachedReviews) return cachedReviews;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch('/api/reviews')
    .then(res => res.json())
    .then(data => {
      const reviews = Array.isArray(data) ? data : [];
      cachedReviews = reviews;
      fetchPromise = null;
      return reviews;
    })
    .catch(() => {
      fetchPromise = null;
      return [];
    });

  return fetchPromise;
};

const refetchReviews = async () => {
  cachedReviews = null;
  fetchPromise = null;
  const reviews = await fetchReviews();
  listeners.forEach(fn => fn(reviews));
};

export const useReviewStats = (): ReviewStats => {
  const [reviews, setReviews] = useState<Review[]>(cachedReviews || []);
  const [loading, setLoading] = useState(!cachedReviews);

  useEffect(() => {
    listeners.add(setReviews);
    fetchReviews().then(data => {
      setReviews(data);
      setLoading(false);
    });
    return () => {
      listeners.delete(setReviews);
    };
  }, []);

  const addReview = useCallback((review: Review) => {
    cachedReviews = cachedReviews ? [review, ...cachedReviews] : [review];
    listeners.forEach(fn => fn(cachedReviews!));
  }, []);

  const stats = useMemo(() => {
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating =
      reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : '0.0';
    return { averageRating, totalReviews: reviews.length };
  }, [reviews]);

  return {
    ...stats,
    reviews,
    loading,
    addReview,
    refetch: refetchReviews,
  };
};
