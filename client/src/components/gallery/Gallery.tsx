import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Image, Loader } from "lucide-react";
import { GalleryItem } from "@/lib/types";
import { useFilter } from "@/hooks/use-filter";

interface FilterButtonProps {
  name: string;
  filter: string;
  currentFilter: string;
  color: string;
  borderColor: string;
  hoverColor: string;
  onClick: (filter: string) => void;
}

function FilterButton({ 
  name, 
  filter, 
  currentFilter, 
  color, 
  borderColor, 
  hoverColor, 
  onClick 
}: FilterButtonProps) {
  const isActive = currentFilter === filter;
  
  return (
    <Button
      onClick={() => onClick(filter)}
      variant="outline"
      className={`
        px-5 py-2 rounded-full transition-colors duration-300 font-medium
        ${isActive ? `bg-${color} text-white` : `bg-white border-2 border-${borderColor} text-${color}`}
        hover:bg-${hoverColor} hover:text-white
      `}
      style={{
        backgroundColor: isActive ? color : 'white',
        borderColor: borderColor,
        color: isActive ? 'white' : color,
      }}
    >
      {name}
    </Button>
  );
}

interface GalleryImageProps {
  item: GalleryItem;
}

function GalleryImage({ item }: GalleryImageProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-lg shadow-md group"
    >
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div>
          <h3 className="text-white font-rajdhani font-bold">{item.title}</h3>
          <p className="text-white/80 text-sm">{item.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const { 
    data: galleryItems, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['/api/gallery-items'],
  });

  const filters = [
    { name: "All", filter: "all", color: "#FF9933", borderColor: "#FF9933", hoverColor: "#FF9933" },
    { name: "Festivals", filter: "festivals", color: "#138808", borderColor: "#138808", hoverColor: "#138808" },
    { name: "Performances", filter: "performances", color: "#800080", borderColor: "#800080", hoverColor: "#800080" },
    { name: "Artifacts", filter: "artifacts", color: "#FF9933", borderColor: "#FF9933", hoverColor: "#FF9933" },
    { name: "Heritage Sites", filter: "heritage", color: "#138808", borderColor: "#138808", hoverColor: "#138808" }
  ];

  const { 
    filteredItems, 
    currentFilter, 
    setFilter, 
    hasMoreItems, 
    loadMoreItems, 
    displayedItems 
  } = useFilter<GalleryItem>(
    galleryItems || [], 
    'category', 
    'all', 
    8
  );

  if (isLoading) {
    return (
      <section id="gallery" className="py-12 bg-[#FFF5E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center" style={{ minHeight: '400px' }}>
          <Loader className="h-8 w-8 animate-spin text-[#FF9933]" />
        </div>
      </section>
    );
  }

  if (error || !galleryItems) {
    return (
      <section id="gallery" className="py-12 bg-[#FFF5E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Error loading gallery</h2>
            <p className="text-gray-700">We couldn't load the gallery items. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-12 bg-[#FFF5E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Cultural Gallery"
          description="Explore a vibrant collection of photographs showcasing the cultural diversity of West India."
          titleColor="text-[#FF9933]"
          accentColor="bg-[#138808]"
        />

        {/* Gallery Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {filters.map((filterItem) => (
            <FilterButton
              key={filterItem.filter}
              name={filterItem.name}
              filter={filterItem.filter}
              currentFilter={currentFilter}
              color={filterItem.color}
              borderColor={filterItem.borderColor}
              hoverColor={filterItem.hoverColor}
              onClick={setFilter}
            />
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item) => (
              <GalleryImage key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {hasMoreItems && (
          <div className="text-center mt-10">
            <Button
              onClick={loadMoreItems}
              className="px-6 py-3 bg-[#800080] text-white rounded-md hover:bg-[#FF9933] transition-colors duration-300 font-medium"
            >
              View More <Image className="ml-1 inline-block h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
