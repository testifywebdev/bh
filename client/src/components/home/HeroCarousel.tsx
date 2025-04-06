import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCarousel } from "@/hooks/use-carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CarouselItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroCarousel() {
  const { 
    data: carouselItems, 
    isLoading,
    error
  } = useQuery({
    queryKey: ['/api/carousel-items'],
  });

  const { 
    currentSlide, 
    nextSlide, 
    prevSlide, 
    goToSlide, 
    totalSlides 
  } = useCarousel(carouselItems?.length || 0, 5000, true);

  if (isLoading) {
    return (
      <div id="home" className="relative w-full h-[80vh] bg-gray-200">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (error || !carouselItems) {
    return (
      <div id="home" className="relative w-full h-[80vh] flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error loading carousel</h2>
          <p className="text-gray-700">We couldn't load the featured content. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="home" className="relative w-full h-[80vh] overflow-hidden">
      {/* Carousel Items */}
      <AnimatePresence mode="wait">
        {carouselItems.map((item: CarouselItem, index: number) => (
          <motion.div
            key={item.id}
            className={cn(
              "absolute inset-0",
              index === currentSlide ? "z-10" : "z-0"
            )}
            initial={{ opacity: 0 }}
            animate={index === currentSlide ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <motion.h1 
                className="font-rajdhani font-bold text-3xl md:text-5xl mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {item.title}
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl max-w-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {item.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="bg-black/20 hover:bg-black/40 text-white rounded-full"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="bg-black/20 hover:bg-black/40 text-white rounded-full"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

      {/* Carousel Navigation Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2 z-20">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors duration-300",
              index === currentSlide ? "bg-white" : "bg-white/60 hover:bg-white"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
