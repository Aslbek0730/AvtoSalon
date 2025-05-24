import React, { useState, useEffect } from 'react';
import { Sliders, Check } from 'lucide-react';

const FilterPanel = ({ onFilterChange, brands }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 200000],
    brands: [],
    years: [],
    installmentOnly: false,
  });
  
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = value;
    
    // Ensure min <= max
    if (index === 0 && value > newPriceRange[1]) {
      newPriceRange[1] = value;
    } else if (index === 1 && value < newPriceRange[0]) {
      newPriceRange[0] = value;
    }
    
    setFilters({ ...filters, priceRange: newPriceRange });
  };

  const handleBrandChange = (brand, checked) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter(b => b !== brand);
    
    setFilters({ ...filters, brands: newBrands });
  };

  const handleYearChange = (year, checked) => {
    const newYears = checked
      ? [...filters.years, year]
      : filters.years.filter(y => y !== year);
    
    setFilters({ ...filters, years: newYears });
  };

  const handleInstallmentChange = (checked) => {
    setFilters({ ...filters, installmentOnly: checked });
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 200000],
      brands: [],
      years: [],
      installmentOnly: false,
    });
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Mobile Filter Button */}
      <div className="md:hidden p-4 border-b border-gray-100">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-gray-700 font-medium"
        >
          <div className="flex items-center">
            <Sliders className="h-5 w-5 mr-2" />
            <span>Filters</span>
          </div>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {Object.values(filters).flat().filter(Boolean).length} applied
          </span>
        </button>
      </div>
      
      <div className={`p-6 space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div>
          <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm text-gray-600">Min Price</label>
                <span className="text-sm text-blue-600 font-medium">${filters.priceRange[0].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm text-gray-600">Max Price</label>
                <span className="text-sm text-blue-600 font-medium">${filters.priceRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-semibold mb-4">Brand</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={(e) => handleBrandChange(brand, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-semibold mb-4">Year</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {years.map((year) => (
              <label key={year} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.years.includes(year)}
                  onChange={(e) => handleYearChange(year, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{year}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.installmentOnly}
              onChange={(e) => handleInstallmentChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Installment Only</span>
          </label>
        </div>
        
        <div className="border-t border-gray-100 pt-6">
          <button
            onClick={resetFilters}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 