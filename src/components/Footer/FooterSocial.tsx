import { Instagram, Facebook, Send } from 'lucide-react';
import { useContacts } from '@/hooks/useMenu';
import { useInView } from '@/hooks/useInView';
import React from 'react';

export const FooterSocial = () => {
  const { data: contacts } = useContacts();
  const { ref, inView } = useInView({ threshold: 0.1 });

  if (!contacts)
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`space-y-6 transition-all duration-1000 delay-200 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="h-8 bg-warm-white/10 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="h-12 bg-warm-white/5 rounded animate-pulse"></div>
          <div className="h-12 bg-warm-white/5 rounded animate-pulse"></div>
          <div className="h-12 bg-warm-white/5 rounded animate-pulse"></div>
        </div>
      </div>
    );

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="space-y-6">
      <h4
        className={`text-lg sm:text-xl font-semibold text-warm-white border-b border-warm-white/30 pb-2 text-center transition-all duration-1000 ease-[var(--ease-spring)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        Слідкуйте за нами
      </h4>

      <div className="space-y-4">
        <p
          className={`text-warm-white/80 text-sm sm:text-base leading-relaxed transition-all duration-1000 ease-[var(--ease-spring)] delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Першими дізнавайтеся про новинки, акції та події у нашій кав&apos;ярні
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a
            href={contacts.instagram}
            className={`bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg p-3 text-white hover:shadow-lg hover:scale-105 transition-all duration-700 ease-[var(--ease-spring)] delay-200 group flex items-center justify-center space-x-2 ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Перейти на нашу сторінку в Instagram"
          >
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
            <span className="font-medium text-sm">Instagram</span>
          </a>

          <a
            href={contacts.facebook}
            className={`bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 text-white hover:shadow-lg hover:scale-105 transition-all duration-700 ease-[var(--ease-spring)] delay-300 group flex items-center justify-center space-x-2 ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Перейти на нашу сторінку в Facebook"
          >
            <Facebook className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
            <span className="font-medium text-sm">Facebook</span>
          </a>

          <a
            href={contacts.telegram}
            className={`bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg p-3 text-white hover:shadow-lg hover:scale-105 transition-all duration-700 ease-[var(--ease-spring)] delay-400 group flex items-center justify-center space-x-2 ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написати нам в Telegram"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
            <span className="font-medium text-sm">Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
};
