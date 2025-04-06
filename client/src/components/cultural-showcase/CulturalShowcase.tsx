import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useFilter } from "@/hooks/use-filter";
import { CulturalItem } from "@/lib/types";

interface CategoryButtonProps {
  name: string;
  category: string;
  currentCategory: string;
  color: string;
  borderColor: string;
  hoverColor: string;
  onClick: (category: string) => void;
}

function CategoryButton({ 
  name, 
  category, 
  currentCategory, 
  color, 
  borderColor, 
  hoverColor, 
  onClick 
}: CategoryButtonProps) {
  const isActive = currentCategory === category;
  
  return (
    <Button
      onClick={() => onClick(category)}
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

interface ShowcaseItemProps {
  item: CulturalItem;
}

function ShowcaseItem({ item }: ShowcaseItemProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
        />
        <div 
          className="absolute top-0 right-0 bg-[#800080] text-white px-3 py-1 m-2 rounded-full text-sm font-medium"
          style={{ textTransform: 'capitalize' }}
        >
          {item.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-rajdhani font-bold text-xl mb-2 text-[#800080]">{item.title}</h3>
        <p className="text-[#333333] mb-4">{item.description}</p>
        <a href="#" className="inline-block text-[#FF9933] hover:text-[#138808] font-medium">
          Learn more <ArrowRight className="ml-1 inline-block h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default function CulturalShowcase() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const categoryParam = searchParams.get("category");
  
  const { 
    data: culturalItems, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['/api/cultural-items'],
  });

  const categories = [
    { name: "All", category: "all", color: "#FF9933", borderColor: "#FF9933", hoverColor: "#FF9933" },
    { name: "Art", category: "art", color: "#138808", borderColor: "#138808", hoverColor: "#138808" },
    { name: "Music", category: "music", color: "#800080", borderColor: "#800080", hoverColor: "#800080" },
    { name: "Dance", category: "dance", color: "#FF9933", borderColor: "#FF9933", hoverColor: "#FF9933" },
    { name: "Festivals", category: "festivals", color: "#138808", borderColor: "#138808", hoverColor: "#138808" }
  ];

  const { 
    filteredItems, 
    currentFilter, 
    setFilter, 
    hasMoreItems, 
    loadMoreItems, 
    displayedItems 
  } = useFilter<CulturalItem>(
    culturalItems || [], 
    'category', 
    categoryParam || 'all', 
    6
  );

  // Update filter if URL parameter changes
  useEffect(() => {
    if (categoryParam && categories.some(c => c.category === categoryParam)) {
      setFilter(categoryParam);
    }
  }, [categoryParam, setFilter]);

  // Update URL when filter changes
  const handleCategoryChange = (category: string) => {
    setFilter(category);
    
    // Update URL without navigating
    if (category === 'all') {
      setLocation("/#cultural-showcase", { replace: true });
    } else {
      setLocation(`/#cultural-showcase?category=${category}`, { replace: true });
    }
  };

  if (isLoading) {
    return (
      <section id="cultural-showcase" className="py-12 bg-[#FFF5E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center" style={{ minHeight: '400px' }}>
          <Loader className="h-8 w-8 animate-spin text-[#FF9933]" />
        </div>
      </section>
    );
  }

  if (error || !culturalItems) {
    return (
      <section id="cultural-showcase" className="py-12 bg-[#FFF5E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Error loading cultural showcase</h2>
            <p className="text-gray-700">We couldn't load the cultural items. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cultural-showcase" className="py-12 bg-[#FFF5E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Cultural Showcase"
          description="Immerse yourself in the diverse cultural elements that make West India unique."
          titleColor="text-[#800080]"
          accentColor="bg-[#FF9933]"
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <CategoryButton
              key={cat.category}
              name={cat.name}
              category={cat.category}
              currentCategory={currentFilter}
              color={cat.color}
              borderColor={cat.borderColor}
              hoverColor={cat.hoverColor}
              onClick={handleCategoryChange}
            />
          ))}
        </div>

        {/* Showcase Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item) => (
              <ShowcaseItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {hasMoreItems && (
          <div className="text-center mt-10">
            <Button
              onClick={loadMoreItems}
              className="px-6 py-3 bg-[#FF9933] text-white rounded-md hover:bg-[#800080] transition-colors duration-300 font-medium"
            >
              Load More <span className="ml-1">↓</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
