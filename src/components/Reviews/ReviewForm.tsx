import { useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Send } from 'lucide-react';
import { StarRating } from './StarRating';
import { PhotoUpload } from './PhotoUpload';
import { ReviewFormData } from './Reviews';
import { schemaReviewForm } from '@/lib/schemas';

interface ReviewFormProps {
  onSubmit: (formData: ReviewFormData) => Promise<void>;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [photoUrl, setPhotoUrl] = useState<string>('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: yupResolver(schemaReviewForm),
    defaultValues: {
      name: '',
      rating: 0,
      text: '',
      photo: undefined,
    },
    mode: 'onChange',
  });

  const onFormSubmit = async (data: ReviewFormData) => {
    const formDataWithPhoto: ReviewFormData = {
      ...data,
      photo: photoUrl || undefined,
    };
    await onSubmit(formDataWithPhoto);
    reset();
    setPhotoUrl('');
  };

  const handlePhotoUpload = (url: string) => {
    setPhotoUrl(url);
  };

  return (
    <div className="bg-warm-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
      <h4 className="text-2xl font-semibold text-center mb-6 text-sage-green">
        Залишити відгук
      </h4>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
        <PhotoUpload
          onPhotoUpload={handlePhotoUpload}
          currentPhoto={photoUrl}
          disabled={isSubmitting}
        />

        <div>
          <label
            htmlFor="reviewName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Ваше ім&apos;я *
          </label>
          <input
            id="reviewName"
            {...register('name')}
            placeholder="Як до вас звертатися?"
            className="flex h-12 w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all duration-300 shadow-sm hover:border-warm-brown/30"
          />
          <p className="text-red-500 text-xs mt-1 h-4 px-1">
            {errors.name?.message || ''}
          </p>
        </div>

        <div>
          <label
            htmlFor="reviewText"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Ваш відгук *
          </label>
          <textarea
            id="reviewText"
            {...register('text')}
            placeholder="Розкажіть про свої враження..."
            rows={4}
            className="flex min-h-25 w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all duration-300 shadow-sm hover:border-warm-brown/30"
          />
          <p className="text-red-500 text-xs mt-1 h-4 px-1">
            {errors.text?.message || ''}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Оцінка *
          </label>
          <div className="flex items-center justify-center p-4 bg-cream/20 rounded-xl border border-dashed border-warm-brown/20 transition-all hover:bg-cream/40">
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <StarRating
                  size="w-8 h-8"
                  spacing="gap-x-6"
                  rating={field.value}
                  onRatingChange={field.onChange}
                />
              )}
            />
          </div>
          <p className="text-red-500 text-xs mt-1 h-4 text-center">
            {errors.rating?.message || ''}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full relative overflow-hidden group flex items-center justify-center gap-3 rounded-xl px-6 py-4 bg-warm-brown text-warm-white font-bold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-sage-green translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          {isSubmitting ? (
            <span className="relative z-10 flex items-center gap-3">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Надсилаємо...
            </span>
          ) : (
            <>
              <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              <span className="relative z-10">Надіслати відгук</span>
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Ваш відгук буде опублікований після модерації
      </p>
    </div>
  );
};
