import { debounce } from "@/utils/helpers";
import { useState, useCallback } from "react";
const DEFAULT_DEBOUNCE_INTERVAL = 300

export function useDebouncedSearch<T>(
  items: T[],
  filterFunction: (item: T, searchTerm: string) => boolean,
  delay: number = DEFAULT_DEBOUNCE_INTERVAL
) {
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  const handleSearch = useCallback(
    debounce((term: string) => {
      if (!term) {
        setFilteredItems(items);
      } else {
        setFilteredItems(items.filter((item) => filterFunction(item, term)));
      }
    }, delay),
    [items, filterFunction, delay]
  );

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    handleSearch(term); // Debounced filtering happens here
  };

  return {
    filteredItems,
    onSearchInputChange,
  };
}
