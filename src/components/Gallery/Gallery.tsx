"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Container } from "@/shared/Container";
import { CoffeeBackground } from "@/shared/CoffeeBackground";
import { useInView } from "@/hooks/useInView";
import { useGallery } from "@/hooks/useMenu";
import { IGalleryItem } from "@/shared/types";

export const Gallery = () => {
  const { data: dynamicImages, isLoading, error } = useGallery();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { ref: headingRef, inView: headingVisible } = useInView({ threshold: 0.1 });
  const { ref: filterRef, inView: filterVisible } = useInView({ threshold: 0.1 });
  const { ref: gridRef, inView: gridVisible } = useInView({ threshold: 0.05 });

  const categories = [
    { id: "all", name: "Все" },
    { id: "interior", name: "Інтер'єр" },
    { id: "process", name: "Приготування" },
    { id: "exterior", name: "Екстер'єр" },
    { id: "visitors", name: "Відвідувачі" },
    { id: "events", name: "Події" },
  ];

  const galleryImages: IGalleryItem[] = dynamicImages || [];

  const filteredImages =
    activeFilter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  const openModal = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  }, []);

  const nextImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  }, [selectedImage, filteredImages.length]);

  const prevImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1
      );
    }
  }, [selectedImage, filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedImage !== null) {
        closeModal();
      }
      if (event.key === "ArrowRight" && selectedImage !== null) {
        nextImage();
      }
      if (event.key === "ArrowLeft" && selectedImage !== null) {
        prevImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, filteredImages.length, closeModal, nextImage, prevImage]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (isLoading) return (
    <div className="py-20 flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-sage-green border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error || galleryImages.length === 0) return null;

  return (
    <section id="gallery" className="relative bg-cream/40 overflow-hidden">
      <CoffeeBackground />
      <Container className="px-4 py-10">
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-1000 ease-[var(--ease-spring)] ${headingVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"
            }`}
        >
          <h3 className="text-4xl md:text-5xl font-bold text-warm-brown mb-6">
            Наша галерея
          </h3>
          <p className="text-xl text-dark-text max-w-2xl mx-auto">
            Зазирніть у світ затишку та смачної кави
          </p>
        </div>

        <div
          ref={filterRef as React.RefObject<HTMLDivElement>}
          className="flex flex-wrap justify-center gap-4 mb-12"
          role="tablist"
          aria-label="Фільтри галереї"
        >
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              role="tab"
              aria-selected={activeFilter === category.id}
              aria-controls="gallery-grid"
              className={`px-6 py-3 rounded-full font-medium transition-all duration-500 ease-[var(--ease-spring)] ${activeFilter === category.id
                  ? "bg-warm-brown text-warm-white shadow-lg scale-105"
                  : "bg-white text-dark-text hover:bg-warm-brown/10 hover:scale-105"
                } ${filterVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: filterVisible ? `${index * 100}ms` : "0ms" }}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div
          id="gallery-grid"
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto perspective-1000 transform-style-3d"
          role="grid"
          aria-label="Галерея зображень кав'ярні"
        >
          {filteredImages.map((image, index) => (
            <div
              key={image.id || index}
              role="gridcell"
              className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-1000 ease-[var(--ease-spring)] backface-hidden ${gridVisible ? "opacity-100 translate-y-0 rotate-y-0" : "opacity-0 translate-y-12 rotate-y-12"
                }`}
              style={{ transitionDelay: gridVisible ? `${(index % 8) * 100}ms` : "0ms" }}
              onClick={() => openModal(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(index);
                }
              }}
              tabIndex={0}
              aria-label={`Відкрити зображення: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-warm-brown/0 group-hover:bg-warm-brown/40 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-bold text-white text-lg">
                  Переглянути
                </div>
                <div className="w-8 h-1 bg-sage-green mt-2 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
              </div>
            </div>
          ))}
        </div>

        {selectedImage !== null && filteredImages[selectedImage] && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              <h2 id="modal-title" className="sr-only">
                {filteredImages[selectedImage].alt}
              </h2>
              <p id="modal-description" className="sr-only">
                Зображення {selectedImage + 1} з {filteredImages.length}.
                Використовуйте стрілки для навігації або ESC для закриття.
              </p>

              <button
                onClick={closeModal}
                aria-label="Закрити галерею"
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={prevImage}
                aria-label="Попереднє зображення"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                aria-label="Наступне зображення"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                <span aria-live="polite">
                  {selectedImage + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
