import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { getDiscountedCars } from '../../services/carService';

const DiscountedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchDiscountedCars = async () => {
      try {
        const data = await getDiscountedCars();
        setCars(data);
      } catch (error) {
        console.error('Error fetching discounted cars:', error);
      }
    };

    fetchDiscountedCars();
  }, []);

  // Dummy data for preview
  const dummyCars = [
    {
      id: '4',
      name: 'Tesla Model 3',
      price: 45000,
      discountPrice: 41999,
      image: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2023,
      isInstallmentAvailable: true,
    },
    {
      id: '5',
      name: 'Toyota Camry',
      price: 35000,
      discountPrice: 32500,
      image: 'https://images.pexels.com/photos/2036544/pexels-photo-2036544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2022,
      isInstallmentAvailable: true,
    },
    {
      id: '6',
      name: 'Honda Accord',
      price: 33000,
      discountPrice: 30750,
      image: 'https://images.pexels.com/photos/1006087/pexels-photo-1006087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2022,
      isInstallmentAvailable: true,
    },
    {
      id: '7',
      name: 'Nissan Altima',
      price: 29500,
      discountPrice: 27000,
      image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2022,
      isInstallmentAvailable: false,
    },
  ];

  const displayCars = cars.length > 0 ? cars : dummyCars;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Maxsus takliflar</h2>
          <Link 
            to="/cars" 
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <span className="mr-1">Barcha mashinalar</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {displayCars.map((car) => (
            <motion.div key={car.id} variants={item}>
              <div className="card hover:-translate-y-1 duration-300">
                <div className="hover-zoom">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{car.name}</h3>
                    <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {Math.round(((car.price - (car.discountPrice || car.price)) / car.price) * 100)}% OFF
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-blue-600">${(car.discountPrice || car.price).toLocaleString()}</span>
                      {car.discountPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">${car.price.toLocaleString()}</span>
                      )}
                    </div>
                    
                    {car.isInstallmentAvailable && (
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Bo'lib to'lash mumkin</span>
                      </div>
                    )}
                  </div>
                  
                  <Link 
                    to={`/cars/${car.id}`} 
                    className="btn-outline text-sm py-2 w-full flex justify-center"
                  >
                    Tafsilotlar
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DiscountedCars; 