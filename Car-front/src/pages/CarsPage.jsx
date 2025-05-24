import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CarCard from '../components/cars/CarCard';
import FilterPanel from '../components/cars/FilterPanel';
import { getCars } from '../services/carService';
import { Search, ListFilter, Grid3X3 } from 'lucide-react';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const carsPerPage = 9;

  useEffect(() => {
    document.title = 'Car Catalog - AutoLuxe';
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const data = await getCars();
        setCars(data);
        setFilteredCars(data);
        
        // Extract unique brands
        const uniqueBrands = Array.from(new Set(data.map(car => car.brand || '')))
          .filter(brand => brand !== '');
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Dummy data for preview
  const dummyCars = [
    {
      id: '1',
      name: 'Mercedes-Benz S-Class',
      brand: 'Mercedes-Benz',
      price: 120000,
      image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2023,
      engine: '4.0L V8',
      isInstallmentAvailable: true,
    },
    {
      id: '2',
      name: 'BMW 7 Series',
      brand: 'BMW',
      price: 110000,
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2023,
      engine: '3.0L I6',
      isInstallmentAvailable: true,
    },
    {
      id: '3',
      name: 'Audi A8',
      brand: 'Audi',
      price: 115000,
      image: 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2022,
      engine: '3.0L V6',
      isInstallmentAvailable: true,
    },
    {
      id: '4',
      name: 'Tesla Model 3',
      brand: 'Tesla',
      price: 45000,
      discountPrice: 41999,
      image: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2023,
      engine: 'Electric',
      isInstallmentAvailable: true,
    },
    {
      id: '5',
      name: 'Toyota Camry',
      brand: 'Toyota',
      price: 35000,
      discountPrice: 32500,
      image: 'https://images.pexels.com/photos/2036544/pexels-photo-2036544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2022,
      engine: '2.5L I4',
      isInstallmentAvailable: true,
    },
    {
      id: '6',
      name: 'Honda Accord',
      brand: 'Honda',
      price: 33000,
      discountPrice: 30750,
      image: 'https://images.pexels.com/photos/1006087/pexels-photo-1006087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2022,
      engine: '1.5L I4',
      isInstallmentAvailable: true,
    },
    {
      id: '7',
      name: 'Nissan Altima',
      brand: 'Nissan',
      price: 29500,
      discountPrice: 27000,
      image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2022,
      engine: '2.0L I4',
      isInstallmentAvailable: false,
    },
    {
      id: '8',
      name: 'Lexus ES',
      brand: 'Lexus',
      price: 42000,
      image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2022,
      engine: '3.5L V6',
      isInstallmentAvailable: true,
    },
    {
      id: '9',
      name: 'Chevrolet Malibu',
      brand: 'Chevrolet',
      price: 28000,
      image: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2021,
      engine: '1.5L I4',
      isInstallmentAvailable: false,
    },
  ];

  const displayCars = cars.length > 0 ? filteredCars : dummyCars;
  const dummyBrands = ['Mercedes-Benz', 'BMW', 'Audi', 'Tesla', 'Toyota', 'Honda', 'Nissan', 'Lexus', 'Chevrolet'];
  const displayBrands = brands.length > 0 ? brands : dummyBrands;

  // Get current cars for pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = displayCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(displayCars.length / carsPerPage);

  const handleFilterChange = (filters) => {
    let filtered = cars.length > 0 ? cars : dummyCars;
    
    // Filter by price range
    filtered = filtered.filter(
      car => car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
    );
    
    // Filter by brands
    if (filters.brands.length > 0) {
      filtered = filtered.filter(car => filters.brands.includes(car.brand || ''));
    }
    
    // Filter by years
    if (filters.years.length > 0) {
      filtered = filtered.filter(car => filters.years.includes(car.year));
    }
    
    // Filter by installment
    if (filters.installmentOnly) {
      filtered = filtered.filter(car => car.isInstallmentAvailable);
    }
    
    // Apply search filter if exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        car => 
          car.name.toLowerCase().includes(query) || 
          car.brand?.toLowerCase().includes(query) ||
          car.engine?.toLowerCase().includes(query)
      );
    }
    
    setFilteredCars(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleFilterChange({
      priceRange: [0, 200000],
      brands: [],
      years: [],
      installmentOnly: false,
    });
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Car Catalog</h1>
          <p className="text-gray-600">
            Browse our selection of premium vehicles
          </p>
        </div>
        
        {/* Mobile Search and Filter */}
        <div className="mb-6 md:hidden">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cars..."
                className="form-control pl-10"
              />
            </div>
          </form>
          
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full btn-outline flex items-center justify-center gap-2"
          >
            <ListFilter className="h-5 w-5" />
            <span>Filter Options</span>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filter */}
          <div className={`md:w-1/4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <FilterPanel 
              onFilterChange={handleFilterChange}
              brands={displayBrands}
            />
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Desktop Search */}
            <div className="hidden md:block mb-6">
              <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cars..."
                    className="form-control pl-10"
                  />
                </div>
                <button type="submit" className="btn-primary ml-2">
                  Search
                </button>
              </form>
            </div>
            
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {currentCars.length} of {displayCars.length} cars
              </p>
            </div>
            
            {/* Cars Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn-outline px-3 py-1 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`px-3 py-1 rounded ${
                            currentPage === index + 1
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="btn-outline px-3 py-1 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage; 