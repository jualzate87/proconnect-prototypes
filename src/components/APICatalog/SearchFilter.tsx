import React from 'react';
import { Input } from '../Shared/Input';
import './SearchFilter.css';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="search-filter">
      <div className="search-filter-search">
        <Input
          type="text"
          placeholder="Search APIs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="search-filter-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-filter ${
              selectedCategory === category ? 'category-filter-active' : ''
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
