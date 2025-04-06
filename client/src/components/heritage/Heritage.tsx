import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Loader } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { HeritageInfo } from "@/lib/types";

interface StateItemProps {
  state: HeritageInfo;
  index: number;
}

function StateItem({ state, index }: StateItemProps) {
  const icons = [
    { bg: "bg-[#FF9933]/10", text: "text-[#FF9933]" },
    { bg: "bg-[#138808]/10", text: "text-[#138808]" },
    { bg: "bg-[#800080]/10", text: "text-[#800080]" },
    { bg: "bg-[#FF9933]/10", text: "text-[#FF9933]" }
  ];
  
  const icon = icons[index % icons.length];
  
  return (
    <li className="flex items-center">
      <span className={`${icon.bg} ${icon.text} rounded-full p-1 mr-3`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </span>
      <span className="font-medium">{state.title} - {state.description}</span>
    </li>
  );
}

interface TraditionCardProps {
  tradition: HeritageInfo;
  index: number;
}

function TraditionCard({ tradition, index }: TraditionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={tradition.imageUrl} 
          alt={tradition.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="font-rajdhani font-bold text-xl text-[#800080]">{tradition.title}</h3>
        <p className="text-[#333333] mt-2">{tradition.description}</p>
        <a href="#" className="inline-block mt-4 text-[#FF9933] hover:text-[#138808] font-medium">
          {tradition.category === 'cuisine' && 'Explore the flavors'}
          {tradition.category === 'attire' && 'Discover the styles'}
          {tradition.category === 'festivals' && 'Join the festivities'}
          <ArrowRight className="ml-1 inline-block h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Heritage() {
  const { data: heritageInfo, isLoading, error } = useQuery({
    queryKey: ['/api/heritage-info'],
  });

  const states = heritageInfo?.filter((info: HeritageInfo) => info.category === 'states') || [];
  const traditions = heritageInfo?.filter((info: HeritageInfo) => info.category !== 'states') || [];

  if (isLoading) {
    return (
      <section id="heritage" className="py-12 bg-[#FFF5E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center" style={{ minHeight: '400px' }}>
          <Loader className="h-8 w-8 animate-spin text-[#FF9933]" />
        </div>
      </section>
    );
  }

  if (error || !heritageInfo) {
    return (
      <section id="heritage" className="py-12 bg-[#FFF5E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Error loading heritage information</h2>
            <p className="text-gray-700">We couldn't load the heritage information. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="heritage" className="py-12 bg-[#FFF5E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="West Indian Heritage"
          description="Discover the rich cultural heritage and traditions of West India's diverse states."
          titleColor="text-[#800080]"
          accentColor="bg-[#138808]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-rajdhani font-bold text-2xl text-[#FF9933] mb-4">States of West India</h3>
              <ul className="space-y-3">
                {states.map((state, index) => (
                  <StateItem key={state.id} state={state} index={index} />
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-96 rounded-lg overflow-hidden ornate-border border-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1604508236855-038aecaee9fc?auto=format&fit=crop&w=800&q=80" 
              alt="Cultural Heritage Map" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Cultural Traditions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {traditions.map((tradition, index) => (
            <TraditionCard key={tradition.id} tradition={tradition} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
