import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CulturalItem, Event, GalleryItem } from "@/lib/types";
import { useLocation } from "wouter";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResult {
  id: number;
  title: string;
  type: 'cultural' | 'event' | 'gallery';
  category: string;
  url: string;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const { data: culturalItems } = useQuery({
    queryKey: ['/api/cultural-items'],
    enabled: open,
  });

  const { data: events } = useQuery({
    queryKey: ['/api/events'],
    enabled: open,
  });

  const { data: galleryItems } = useQuery({
    queryKey: ['/api/gallery-items'],
    enabled: open,
  });

  // Process search results
  const getSearchResults = (): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search in cultural items
    if (culturalItems) {
      culturalItems.forEach((item: CulturalItem) => {
        if (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.state.toLowerCase().includes(query)
        ) {
          results.push({
            id: item.id,
            title: item.title,
            type: 'cultural',
            category: item.category,
            url: `/#cultural-showcase?category=${item.category}`
          });
        }
      });
    }

    // Search in events
    if (events) {
      events.forEach((event: Event) => {
        if (
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query)
        ) {
          results.push({
            id: event.id,
            title: event.title,
            type: 'event',
            category: event.category,
            url: `/#events?month=${event.month.toLowerCase()}`
          });
        }
      });
    }

    // Search in gallery items
    if (galleryItems) {
      galleryItems.forEach((item: GalleryItem) => {
        if (
          item.title.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        ) {
          results.push({
            id: item.id,
            title: item.title,
            type: 'gallery',
            category: item.category,
            url: `/#gallery?category=${item.category}`
          });
        }
      });
    }

    return results.slice(0, 10); // Limit to 10 results
  };

  const results = getSearchResults();

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    onOpenChange(false);
    setSearchQuery("");
  };

  const getCategoryColor = (type: string, category: string) => {
    switch (category) {
      case 'art':
        return 'bg-[#138808]/10 text-[#138808]';
      case 'music':
        return 'bg-[#800080]/10 text-[#800080]';
      case 'dance':
        return 'bg-[#FF9933]/10 text-[#FF9933]';
      case 'festivals':
        return 'bg-[#138808]/10 text-[#138808]';
      case 'heritage':
        return 'bg-[#800080]/10 text-[#800080]';
      case 'performances':
        return 'bg-[#FF9933]/10 text-[#FF9933]';
      case 'artifacts':
        return 'bg-[#138808]/10 text-[#138808]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'cultural':
        return 'Cultural Item';
      case 'event':
        return 'Event';
      case 'gallery':
        return 'Gallery';
      default:
        return type;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-[#FFF5E6]">
        <DialogHeader className="p-4 border-b border-gray-200">
          <DialogTitle className="text-lg font-rajdhani font-bold flex items-center">
            <Search className="mr-2 h-5 w-5 text-[#FF9933]" />
            Search Sanskritik Bharat
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-4">
          <div className="relative">
            <Input
              placeholder="Search for cultural items, events, or gallery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-2 border-2 border-[#FF9933] focus:border-[#800080] rounded-md"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto px-4 pb-4">
          {results.length > 0 ? (
            <div className="space-y-2">
              {results.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className="p-3 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{result.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(result.type, result.category)}`} style={{ textTransform: 'capitalize' }}>
                        {result.category}
                      </span>
                      <span className="text-xs text-gray-500">{getTypeLabel(result.type)}</span>
                    </div>
                  </div>
                  <div className="mt-1 flex justify-end">
                    <span className="text-[#FF9933] text-sm flex items-center">
                      View <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
              <p className="text-gray-400 text-sm mt-1">Try different keywords or browse the categories</p>
            </div>
          ) : (
            <div className="py-4 text-gray-500 text-center">
              <p>Type to search for cultural items, events, or gallery items</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
