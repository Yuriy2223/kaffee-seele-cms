'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Container } from '@/shared/Container';
import { Send } from 'lucide-react';
import { useContactMutation } from '@/hooks/useContact';
import { useInView } from '@/hooks/useInView';
import React from 'react';
import { contactSchema } from '@/lib/schemas';

type FormData = yup.InferType<typeof contactSchema>;

export const ContactForm = () => {
  const { mutateAsync } = useContactMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync(data);
      toast.success('Ваше повідомлення успішно відправлено!');
      reset();
    } catch (error) {
      toast.error('Сталася помилка. Спробуйте пізніше.');
    }
  };

  const isSubmitting = isFormSubmitting;

  const { ref: formRef, inView: formInView } = useInView({ threshold: 0.1 });

  return (
    <section id="contact" className="py-20 bg-warm-white overflow-hidden">
      <Container>
        <div
          ref={formRef as React.RefObject<HTMLDivElement>}
          className={`max-w-3xl mx-auto bg-muted-green p-8 md:p-12 rounded-3xl shadow-xl border-2 border-sage-green/20 transition-all duration-1000 ease-spring ${
            formInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-10">
            <h3
              className={`text-3xl font-bold text-warm-brown mb-4 transition-all duration-700 delay-100 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Напишіть нам
            </h3>
            <p
              className={`text-dark-text transition-all duration-700 delay-200 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Маєте запитання або пропозиції? Будемо раді почути вас!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div
              className={`transition-all duration-700 delay-300 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <label className="block text-sm font-semibold text-warm-brown mb-2 uppercase tracking-wide">
                Ваше ім&apos;я
              </label>
              <input
                {...register('name')}
                className="w-full px-6 py-4 rounded-2xl bg-warm-white ring-1 ring-sage-green/10 border-0 focus:ring-2 focus:ring-sage-green outline-none transition-all duration-300"
                placeholder="Як вас звати?"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div
              className={`transition-all duration-700 delay-400 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <label className="block text-sm font-semibold text-warm-brown mb-2 uppercase tracking-wide">
                Електронна пошта
              </label>
              <input
                {...register('email')}
                className="w-full px-6 py-4 rounded-2xl bg-warm-white ring-1 ring-sage-green/10 border-0 focus:ring-2 focus:ring-sage-green outline-none transition-all duration-300"
                placeholder="example@mail.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div
              className={`transition-all duration-700 delay-500 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <label className="block text-sm font-semibold text-warm-brown mb-2 uppercase tracking-wide">
                Повідомлення
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-6 py-4 rounded-2xl bg-warm-white ring-1 ring-sage-green/10 border-0 focus:ring-2 focus:ring-sage-green outline-none transition-all duration-300 resize-none"
                placeholder="Напишіть ваше повідомлення тут..."
              />
              {errors.message && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div
              className={`transition-all duration-700 delay-600 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sage-green hover:bg-warm-brown text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {isSubmitting ? (
                  'Відправка...'
                ) : (
                  <>
                    Відправити повідомлення
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};
