"use client";

import { Container } from "@/shared/Container";
import { AtmosphereCard } from "./AtmosphereCard";
import { QuoteCard } from "./QuoteCard";
import { Statistics } from "./Statistics";
import { CoffeeBackground } from "@/shared/CoffeeBackground";
import { useInView } from "@/hooks/useInView";

export const Atmosphere = () => {
  const { ref, inView } = useInView({ threshold: 0.15, once: true });

  return (
    <section id="atmosphere" className="relative bg-cream/40 overflow-hidden">
      <CoffeeBackground />
      <Container className="py-10 perspective-1000">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid lg:grid-cols-2 gap-12 items-center transform-style-3d">
          <div
            className={`transform transition-all duration-1000 ease-[var(--ease-spring)] ${inView
              ? "translate-x-0 opacity-100 rotate-y-0 scale-100"
              : "-translate-x-12 opacity-0 -rotate-y-12 scale-95"
              }`}
          >
            <AtmosphereCard className="hover:scale-[1.03] shadow-2xl" />
          </div>

          <div
            className={`transform transition-all duration-1000 ease-[var(--ease-spring)] ${inView
              ? "translate-x-0 opacity-100 rotate-y-0 scale-100"
              : "translate-x-12 opacity-0 rotate-y-12 scale-95"
              }`}
            style={{ transitionDelay: inView ? "200ms" : "0ms" }}
          >
            <QuoteCard />
          </div>
        </div>

        <div
          className={`mt-16 transform transition-all duration-1000 ease-[var(--ease-spring)] ${inView ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-90"
            }`}
          style={{ transitionDelay: inView ? "500ms" : "0ms" }}
        >
          <Statistics isVisible={inView} />
        </div>
      </Container>
    </section>
  );
};

