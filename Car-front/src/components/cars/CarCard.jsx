import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Fuel } from 'lucide-react';

const CarCard = ({ car }) => {
  return (
    <div className="card hover:-translate-y-1 duration-300">
      <div className="relative hover-zoom">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-48 object-cover"
        />
        {car.discountPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg truncate">{car.name}</h3>
          <span className="text-gray-600 text-sm">{car.year}</span>
        </div>
        
        <div className="mb-3">
          <div className="flex items-baseline">
            {car.discountPrice ? (
              <>
                <span className="text-xl font-bold text-blue-600">${car.discountPrice.toLocaleString()}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${car.price.toLocaleString()}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-blue-600">${car.price.toLocaleString()}</span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-blue-600" />
            <span>{car.year}</span>
          </div>
          
          {car.engine && (
            <div className="flex items-center">
              <Fuel className="h-4 w-4 mr-1 text-blue-600" />
              <span>{car.engine}</span>
            </div>
          )}
          
          {car.isInstallmentAvailable && (
            <div className="flex items-center col-span-2">
              <Clock className="h-4 w-4 mr-1 text-blue-600" />
              <span>Installment Available</span>
            </div>
          )}
        </div>
        
        <Link 
          to={`/cars/${car.id}`} 
          className="btn-outline text-sm py-2 w-full flex justify-center"
        >
          More Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard; 