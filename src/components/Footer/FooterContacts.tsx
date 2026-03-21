import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useContacts } from '@/hooks/useMenu';
import { useInView } from '@/hooks/useInView';
import React from 'react';

export const FooterContacts = () => {
  const { data: contacts, isLoading } = useContacts();
  const { ref, inView } = useInView({ threshold: 0.1 });

  if (isLoading || !contacts)
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`md:col-span-1 space-y-6 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="h-8 bg-warm-white/10 rounded animate-pulse mb-6"></div>
        <div className="space-y-4">
          <div className="h-24 bg-warm-white/5 rounded animate-pulse"></div>
          <div className="h-16 bg-warm-white/5 rounded animate-pulse"></div>
        </div>
      </div>
    );

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contacts.address + ', ' + contacts.city
  )}`;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="md:col-span-1 space-y-6"
    >
      <h4
        className={`text-lg sm:text-xl font-semibold text-warm-white border-b border-warm-white/30 pb-2 text-center transition-all duration-1000 ease-[var(--ease-spring)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        Контакти
      </h4>

      <div className="space-y-3">
        <div
          className={`bg-warm-white/8 rounded-lg p-3 sm:p-4 border border-warm-white/10 transition-all duration-1000 ease-[var(--ease-spring)] delay-100 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-sage-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="text-warm-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-warm-white font-semibold text-sm sm:text-base">
                {contacts.address}
              </p>
              <p className="text-warm-white/80 text-xs sm:text-sm">
                {contacts.city}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Переглянути адресу на карті: ${contacts.address}, ${contacts.city}`}
              className="w-full md:w-2xs bg-sage-green text-warm-white px-3 py-2 rounded-lg font-medium hover:bg-sage-green/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group text-sm"
            >
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Знайти нас</span>
            </a>
          </div>
        </div>

        <div
          className={`bg-warm-white/8 rounded-lg p-3 sm:p-4 border border-warm-white/10 hover:bg-warm-white/12 transition-colors duration-200 transition-all duration-1000 ease-[var(--ease-spring)] delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-warm-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="text-warm-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <a
                href={`tel:${contacts.phone?.replace(/[^\d+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-white font-semibold text-sm sm:text-base"
              >
                {contacts.phone}
              </a>
              <p className="text-warm-white/60 text-xs">
                Приймаємо дзвінки щодня
              </p>
            </div>
          </div>
        </div>

        <div
          className={`bg-warm-white/8 rounded-lg p-3 sm:p-4 border border-warm-white/10 hover:bg-warm-white/12 transition-colors duration-200 transition-all duration-1000 ease-[var(--ease-spring)] delay-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-warm-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="text-warm-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <a
                href={`mailto:${contacts.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-white font-semibold text-sm sm:text-base break-all"
              >
                {contacts.email}
              </a>
            </div>
          </div>
        </div>

        <div
          className={`bg-warm-white/8 rounded-lg p-3 sm:p-4 border border-warm-white/10 hover:bg-warm-white/12 transition-colors duration-200 transition-all duration-1000 ease-[var(--ease-spring)] delay-400 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-warm-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="text-warm-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-warm-white font-semibold text-sm sm:text-base">
                {contacts.workHoursWeek}
              </p>
              <p className="text-warm-white/60 text-xs">
                Працюємо без вихідних
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
