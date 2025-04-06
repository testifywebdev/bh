import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchDialog from "@/components/ui/search-dialog";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative">
      {/* Navigation Bar */}
      <nav className="bg-[#FF9933] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center cursor-pointer">
                    <span className="text-[#FF9933] font-rajdhani font-bold text-lg">भारत</span>
                  </div>
                </Link>
                <Link href="/">
                  <span className="ml-3 text-white font-rajdhani font-bold text-xl cursor-pointer">संस्कृतिक भारत</span>
                </Link>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#home">
                <a className="text-white hover:text-[#800080] font-medium transition duration-300">Home</a>
              </Link>
              <Link href="/#cultural-showcase">
                <a className="text-white hover:text-[#800080] font-medium transition duration-300">Cultural Showcase</a>
              </Link>
              <Link href="/#events">
                <a className="text-white hover:text-[#800080] font-medium transition duration-300">Events</a>
              </Link>
              <Link href="/#gallery">
                <a className="text-white hover:text-[#800080] font-medium transition duration-300">Gallery</a>
              </Link>
              <Link href="/#heritage">
                <a className="text-white hover:text-[#800080] font-medium transition duration-300">Heritage</a>
              </Link>
              <Button 
                onClick={toggleSearch} 
                className="bg-white text-[#FF9933] px-4 py-2 rounded-md font-medium hover:bg-[#800080] hover:text-white transition duration-300"
              >
                <Search className="mr-1 h-4 w-4" /> Search
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <Button 
                onClick={toggleMobileMenu}
                variant="ghost" 
                className="text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-[#FF9933] ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-white/20">
            <Link href="/#home">
              <a onClick={closeMobileMenu} className="block px-3 py-2 text-white font-medium hover:bg-white/10 rounded-md">Home</a>
            </Link>
            <Link href="/#cultural-showcase">
              <a onClick={closeMobileMenu} className="block px-3 py-2 text-white font-medium hover:bg-white/10 rounded-md">Cultural Showcase</a>
            </Link>
            <Link href="/#events">
              <a onClick={closeMobileMenu} className="block px-3 py-2 text-white font-medium hover:bg-white/10 rounded-md">Events</a>
            </Link>
            <Link href="/#gallery">
              <a onClick={closeMobileMenu} className="block px-3 py-2 text-white font-medium hover:bg-white/10 rounded-md">Gallery</a>
            </Link>
            <Link href="/#heritage">
              <a onClick={closeMobileMenu} className="block px-3 py-2 text-white font-medium hover:bg-white/10 rounded-md">Heritage</a>
            </Link>
            <div className="px-3 py-2">
              <Button 
                onClick={() => {
                  closeMobileMenu();
                  toggleSearch();
                }} 
                className="w-full bg-white text-[#FF9933] px-4 py-2 rounded-md font-medium hover:bg-[#800080] hover:text-white transition duration-300"
              >
                <Search className="mr-1 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
