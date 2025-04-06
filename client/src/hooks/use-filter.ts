import { useState, useEffect, useMemo } from "react";

export function useFilter<T>(
  items: T[],
  filterKey: keyof T,
  initialFilter: string = "all",
  itemsPerPage: number = 6
) {
  const [currentFilter, setFilter] = useState(initialFilter);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [currentFilter]);

  // Filter items based on current filter
  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    
    if (currentFilter === "all") {
      return items;
    }
    
    return items.filter(item => 
      String(item[filterKey]).toLowerCase() === currentFilter.toLowerCase()
    );
  }, [items, currentFilter, filterKey]);

  // Calculate displayed items based on pagination
  const displayedItems = useMemo(() => {
    const endIndex = currentPage * itemsPerPage;
    return filteredItems.slice(0, endIndex);
  }, [filteredItems, currentPage, itemsPerPage]);

  // Check if there are more items to load
  const hasMoreItems = displayedItems.length < filteredItems.length;

  // Load more items
  const loadMoreItems = () => {
    setCurrentPage(prev => prev + 1);
  };

  return {
    filteredItems,
    currentFilter,
    setFilter,
    currentPage,
    setCurrentPage,
    hasMoreItems,
    loadMoreItems,
    displayedItems
  };
}
