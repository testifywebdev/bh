import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  MapPin, 
  Mail, 
  Phone 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#FF9933] font-rajdhani font-bold text-lg">भारत</span>
              </div>
              <span className="ml-3 text-white font-rajdhani font-bold text-xl">संस्कृतिक भारत</span>
            </div>
            <p className="text-white/80 mb-6">
              Celebrating the rich cultural heritage of West India through the Bharat Mahotsav initiative.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#FF9933] transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#FF9933] transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#FF9933] transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#FF9933] transition-colors duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-rajdhani font-bold text-lg mb-4 text-[#FF9933]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#home">
                  <a className="text-white/80 hover:text-white transition-colors duration-300">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/#cultural-showcase">
                  <a className="text-white/80 hover:text-white transition-colors duration-300">Cultural Showcase</a>
                </Link>
              </li>
              <li>
                <Link href="/#events">
                  <a className="text-white/80 hover:text-white transition-colors duration-300">Events</a>
                </Link>
              </li>
              <li>
                <Link href="/#gallery">
                  <a className="text-white/80 hover:text-white transition-colors duration-300">Gallery</a>
                </Link>
              </li>
              <li>
                <Link href="/#heritage">
                  <a className="text-white/80 hover:text-white transition-colors duration-300">Heritage</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-rajdhani font-bold text-lg mb-4 text-[#FF9933]">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-[#FF9933]" size={16} />
                <span className="text-white/80">
                  Bharat Mahotsav Cultural Center, Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex items-start">
                <Mail className="mt-1 mr-3 text-[#FF9933]" size={16} />
                <span className="text-white/80">info@sanskritikbharat.org</span>
              </li>
              <li className="flex items-start">
                <Phone className="mt-1 mr-3 text-[#FF9933]" size={16} />
                <span className="text-white/80">+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Supported By */}
          <div>
            <h3 className="font-rajdhani font-bold text-lg mb-4 text-[#FF9933]">Supported By</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Ministry of Culture, India
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Tourism Department of West India
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Cultural Heritage Foundation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  West Indian Arts Council
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Sanskritik Bharat. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors duration-300">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
