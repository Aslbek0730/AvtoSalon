import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { getTrendingCars } from '../../services/carService';

const TrendingCars = () => {
  const [cars, setCars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTrendingCars = async () => {
      try {
        const data = await getTrendingCars();
        setCars(data);
      } catch (error) {
        console.error('Error fetching trending cars:', error);
      }
    };

    fetchTrendingCars();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === cars.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? cars.length - 1 : prevIndex - 1
    );
  };

  // Dummy data for preview
  const dummyCars = [
    {
      id: '1',
      name: 'Mercedes-Benz S-Class',
      price: 120000,
      image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2023,
      isInstallmentAvailable: true,
    },
    {
      id: '2',
      name: 'BMW 7 Series',
      price: 110000,
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2023,
      isInstallmentAvailable: true,
    },
    {
      id: '3',
      name: 'Audi A8',
      price: 115000,
      image: 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2022,
      isInstallmentAvailable: true,
    },
  ];

  const displayCars = cars.length > 0 ? cars : dummyCars;

  return (
    <section id="trending" className="section bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Trending Cars</h2>
          <div className="flex space-x-2">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displayCars.map((car) => (
              <div 
                key={car.id} 
                className="w-full flex-shrink-0 px-4"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <motion.div 
                    className="w-full md:w-1/2 hover-zoom rounded-xl overflow-hidden"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  </motion.div>

                  <motion.div 
                    className="w-full md:w-1/2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-3xl font-bold mb-4">{car.name}</h3>
                    <div className="flex items-center mb-4">
                      <span className="text-xl font-bold text-blue-600">${car.price.toLocaleString()}</span>
                      {car.isInstallmentAvailable && (
                        <div className="ml-4 flex items-center text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Installment Available</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 mb-6">
                      Experience unparalleled luxury and performance with the {car.year} {car.name}. 
                      This trending model combines cutting-edge technology with elegant design.
                    </p>
                    <Link 
                      to={`/cars/${car.id}`} 
                      className="btn-primary"
                    >
                      View Details
                    </Link>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          {displayCars.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 mx-1 rounded-full ${
                currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCars; 