import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturedHighlight() {
  return (
    <section className="py-12 bg-[#800080] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-rajdhani font-bold text-3xl mb-4">Bharat Mahotsav 2023</h2>
            <div className="w-20 h-1 bg-[#FF9933] mb-6"></div>
            <p className="text-lg mb-6">
              Join us for a grand celebration of West Indian culture and heritage during Bharat Mahotsav 2023. 
              Experience the splendor of traditional performances, art exhibitions, and culinary delights.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-white/10 px-4 py-3 rounded-lg">
                <Calendar className="mr-2 inline-block text-[#FF9933] h-4 w-4" />
                <span>October 15-30, 2023</span>
              </div>
              <div className="bg-white/10 px-4 py-3 rounded-lg">
                <MapPin className="mr-2 inline-block text-[#FF9933] h-4 w-4" />
                <span>Multiple venues across West India</span>
              </div>
            </div>
            <Button className="px-6 py-3 bg-[#FF9933] text-white rounded-md hover:bg-white hover:text-[#FF9933] transition-colors duration-300 font-medium">
              Register Now <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-[400px] rounded-lg overflow-hidden ornate-border border-0">
              <img 
                src="https://images.unsplash.com/photo-1594815980867-7a5453f597fc?auto=format&fit=crop&w=1200&q=80" 
                alt="Bharat Mahotsav Event" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
