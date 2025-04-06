import { Link } from "wouter";
import { 
  Palette, 
  Music, 
  Calendar, 
  Landmark,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface QuickLinkProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  delay: number;
}

function QuickLink({ icon, title, description, href, delay }: QuickLinkProps) {
  return (
    <motion.div 
      className="bg-[#FFF5E6] p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 text-center ornate-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-[#FF9933]/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-rajdhani font-semibold text-xl mb-2 text-[#800080]">{title}</h3>
      <p className="text-sm text-[#333333]">{description}</p>
      <Link href={href}>
        <a className="inline-block mt-4 text-[#FF9933] hover:text-[#138808] font-medium">
          Explore <ArrowRight className="ml-1 inline-block h-4 w-4" />
        </a>
      </Link>
    </motion.div>
  );
}

export default function QuickLinks() {
  const quickLinksData = [
    {
      icon: <Palette className="h-6 w-6 text-[#FF9933]" />,
      title: "Traditional Arts",
      description: "Discover the diverse artistic traditions and crafts of West India",
      href: "/#cultural-showcase?category=art",
      delay: 0.1
    },
    {
      icon: <Music className="h-6 w-6 text-[#FF9933]" />,
      title: "Music & Dance",
      description: "Experience the rhythms and movements that define West Indian culture",
      href: "/#cultural-showcase?category=music",
      delay: 0.2
    },
    {
      icon: <Calendar className="h-6 w-6 text-[#FF9933]" />,
      title: "Festivals",
      description: "Celebrate the vibrant festivals that bring West Indian culture to life",
      href: "/#cultural-showcase?category=festivals",
      delay: 0.3
    },
    {
      icon: <Landmark className="h-6 w-6 text-[#FF9933]" />,
      title: "Heritage Sites",
      description: "Visit the historic landmarks and sacred spaces of West India",
      href: "/#heritage",
      delay: 0.4
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title="Welcome to Sanskritik Bharat"
            description="Explore the rich cultural tapestry of West India through our comprehensive showcase of art, music, dance, and festivals."
            titleColor="text-[#FF9933]"
            accentColor="bg-[#138808]"
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {quickLinksData.map((link, index) => (
            <QuickLink key={index} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}
