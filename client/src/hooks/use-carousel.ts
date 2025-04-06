import { useState, useEffect, useCallback } from "react";

export function useCarousel(
  totalSlides: number,
  autoplayInterval: number = 5000,
  autoplay: boolean = true
) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  const pauseAutoplay = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeAutoplay = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isPaused || totalSlides <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, isPaused, nextSlide, totalSlides, autoplayInterval]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoplay,
    resumeAutoplay,
    totalSlides
  };
}
