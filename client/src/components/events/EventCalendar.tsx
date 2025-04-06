import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Clock, 
  MapPin, 
  Calendar as CalendarIcon,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Event } from "@/lib/types";

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

interface EventItemProps {
  event: Event;
}

function EventItem({ event }: EventItemProps) {
  // Determine color based on category
  const getColorByCategory = () => {
    switch (event.category) {
      case 'art':
        return '#FF9933';
      case 'dance':
        return '#138808';
      case 'music':
        return '#800080';
      case 'games':
        return '#FF9933';
      case 'photobooth':
        return '#138808';
      case 'guest':
        return '#800080';
      default:
        return '#FF9933';
    }
  };

  const color = getColorByCategory();

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="md:flex">
        <div 
          className="md:flex-shrink-0 w-full md:w-36 p-4 flex flex-col items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <span className="text-3xl font-rajdhani font-bold text-white">{event.day}</span>
          <span className="text-sm uppercase text-white">{event.month}</span>
        </div>
        <div className="p-6 md:flex-1">
          <div className="flex flex-wrap items-start justify-between">
            <div>
              <h3 className="font-rajdhani font-bold text-xl text-[#800080]">{event.title}</h3>
              <p className="text-[#333333] mt-1">{event.description}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <span 
                className="inline-block bg-[#800080]/10 text-[#800080] px-3 py-1 rounded-full text-sm font-medium"
                style={{ textTransform: 'capitalize' }}
              >
                {event.category}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <Clock className="text-[#FF9933] mr-2 h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-[#FF9933] mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <a href="#" className="text-[#FF9933] hover:text-[#138808] font-medium">
              More details <ArrowRight className="ml-1 inline-block h-4 w-4" />
            </a>
            <Button 
              className="px-4 py-2 text-sm font-medium text-white rounded-md transition-colors duration-300 hover:bg-[#800080]"
              style={{ backgroundColor: color }}
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventCalendar() {
  const [currentCategory, setCurrentCategory] = useState("art");

  const { 
    data: allEvents, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['/api/events'],
  });

  const categories = [
    { name: "Art Exhibition", category: "art", color: "#FF9933", borderColor: "#FF9933", hoverColor: "#FF9933" },
    { name: "Dance Performance", category: "dance", color: "#138808", borderColor: "#138808", hoverColor: "#138808" },
    { name: "Music Concert", category: "music", color: "#800080", borderColor: "#800080", hoverColor: "#800080" },
    { name: "Games & Activities", category: "games", color: "#FF9933", borderColor: "#FF9933", hoverColor: "#FF9933" },
    { name: "Photo Booth", category: "photobooth", color: "#138808", borderColor: "#138808", hoverColor: "#138808" },
    { name: "Chief Guest", category: "guest", color: "#800080", borderColor: "#800080", hoverColor: "#800080" }
  ];

  // Filter events by current category
  const filteredEvents = Array.isArray(allEvents) 
    ? allEvents.filter((event: Event) => event.category.toLowerCase() === currentCategory.toLowerCase()) 
    : [];

  if (isLoading) {
    return (
      <section id="events" className="py-12 bg-[#FFF5E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center" style={{ minHeight: '400px' }}>
          <Loader className="h-8 w-8 animate-spin text-[#FF9933]" />
        </div>
      </section>
    );
  }

  if (error || !allEvents) {
    return (
      <section id="events" className="py-12 bg-[#FFF5E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Error loading events</h2>
            <p className="text-gray-700">We couldn't load the event calendar. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-12 bg-[#FFF5E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Bharat Mahotsav Event Sequence"
          description="Experience a sequence of cultural events on April 12th, 2025 - showcasing the richness of West Indian heritage."
          titleColor="text-[#138808]"
          accentColor="bg-[#FF9933]"
        />

        {/* Event Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((categoryItem) => (
            <CategoryButton
              key={categoryItem.category}
              name={categoryItem.name}
              category={categoryItem.category}
              currentCategory={currentCategory}
              color={categoryItem.color}
              borderColor={categoryItem.borderColor}
              hoverColor={categoryItem.hoverColor}
              onClick={setCurrentCategory}
            />
          ))}
        </div>

        {/* Event Listings */}
        <div className="space-y-6">
          <AnimatePresence mode="sync">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event: Event) => (
                <EventItem key={event.id} event={event} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10"
              >
                <p className="text-lg text-gray-600">No events available for this category. Check back later!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center mt-10">
          <Button className="inline-block px-6 py-3 bg-[#138808] text-white rounded-md hover:bg-[#800080] transition-colors duration-300 font-medium">
            Register Now <CalendarIcon className="ml-1 inline-block h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
