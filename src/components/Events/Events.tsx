'use client';

import { useEffect, useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { Container } from '@/shared/Container';
import { EventsModal } from './EventsModal';
import { categoryIcons, categoryNames, upcomingEvents } from './ConstEvents';
import { CoffeeBackground } from '@/shared/CoffeeBackground';
import { useInView } from '@/hooks/useInView';
import React from 'react';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  category: string;
  maxParticipants: number;
  currentParticipants: number;
}

export const Events = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [formattedDates, setFormattedDates] = useState<Record<string, string>>(
    {}
  );
  const { ref: headingRef, inView: headingVisible } = useInView();
  const { ref: cardsRef, inView: cardsVisible } = useInView({
    threshold: 0.05,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);

          const newFormatted: Record<string, string> = {};
          data.forEach((event: any) => {
            const date = new Date(event.date);
            newFormatted[event._id || event.id] = date.toLocaleDateString(
              'uk-UA',
              {
                day: 'numeric',
                month: 'long',
                weekday: 'long',
              }
            );
          });
          setFormattedDates(newFormatted);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleRegisterClick = (event: Event): void => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="events" className="relative bg-sage-green/10">
        <CoffeeBackground />
        <Container className="px-4 py-10">
          <div
            ref={headingRef as React.RefObject<HTMLDivElement>}
            className={`text-center mb-16 transition-all duration-700 ${
              headingVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-warm-brown mb-6">
              Акції та події
            </h3>
            <p className="text-xl text-dark-text max-w-2xl mx-auto">
              Приєднуйтесь до наших особливих заходів та відкривайте нові грані
              кавової культури
            </p>
          </div>

          <div
            ref={cardsRef as React.RefObject<HTMLDivElement>}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto perspective-1000 transform-style-3d"
          >
            {(events.length > 0 ? events : upcomingEvents).map(
              (event: any, index) => {
                const IconComponent =
                  categoryIcons[event.category as keyof typeof categoryIcons];
                const progressPercentage =
                  (event.currentParticipants / event.maxParticipants) * 100;

                return (
                  <div
                    key={event.id}
                    className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:animate-glow transition-all duration-1000 ease-spring backface-hidden ${
                      cardsVisible
                        ? 'opacity-100 translate-y-0 rotate-x-0'
                        : 'opacity-0 translate-y-12 -rotate-x-90'
                    }`}
                    style={{
                      transitionDelay: cardsVisible
                        ? `${index * 250}ms`
                        : '0ms',
                    }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-warm-brown/10 rounded-full flex items-center justify-center mr-4 transition-all duration-500 group-hover:rotate-360 group-hover:bg-sage-green/20">
                          <IconComponent className="w-6 h-6 text-warm-brown transition-colors duration-500 group-hover:text-sage-green" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-warm-brown mb-1 group-hover:text-sage-green transition-colors duration-300">
                            {event.title}
                          </h4>
                          <span className="text-sm bg-sage-green/20 text-sage-green px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-warm-brown group-hover:text-white">
                            {
                              categoryNames[
                                event.category as keyof typeof categoryNames
                              ]
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-dark-text mb-6 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-dark-text">
                        <Calendar className="w-4 h-4 mr-3 text-warm-brown transition-transform duration-300 group-hover:scale-110" />
                        <span className="font-medium">
                          {formattedDates[event._id || event.id] ?? ''}
                        </span>
                      </div>

                      <div className="flex items-center text-dark-text">
                        <Clock className="w-4 h-4 mr-3 text-warm-brown transition-transform duration-300 group-hover:rotate-12" />
                        <span>
                          {event.time} • {event.duration}
                        </span>
                      </div>

                      <div className="flex items-center text-dark-text">
                        <Users className="w-4 h-4 mr-3 text-warm-brown transition-transform duration-300 group-hover:scale-110" />
                        <span>
                          Учасників: {event.currentParticipants}/
                          {event.maxParticipants}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-dark-text">
                          Заповнення місць:
                        </span>
                        <span className="text-sm font-medium text-warm-brown">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                      <div className="w-full bg-cream rounded-full h-2">
                        <div
                          className="bg-sage-green h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: cardsVisible
                              ? `${progressPercentage}%`
                              : '0%',
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-sage-green">
                          {event.price}
                        </span>
                      </div>

                      <button
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                          event.currentParticipants >= event.maxParticipants
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-warm-brown text-warm-white hover:bg-warm-brown/90 shadow-lg hover:shadow-xl'
                        }`}
                        disabled={
                          event.currentParticipants >= event.maxParticipants
                        }
                        onClick={() => handleRegisterClick(event)}
                      >
                        {event.currentParticipants >= event.maxParticipants
                          ? 'Місць немає'
                          : 'Зареєструватись'}
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </Container>
      </section>

      <EventsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </>
  );
};
