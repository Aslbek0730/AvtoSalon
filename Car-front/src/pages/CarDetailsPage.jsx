import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCarById } from '../services/carService';
import { Calendar, Gauge, Truck, Droplet, Clock, Info, DollarSign } from 'lucide-react';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [selectedMonths, setSelectedMonths] = useState(36);
  const [downPayment, setDownPayment] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      try {
        setIsLoading(true);
        const data = await getCarById(id);
        
        if (data) {
          setCar(data);
          setMainImage(data.image);
          // Set default down payment to 20% of car price
          setDownPayment(Math.round((data.discountPrice || data.price) * 0.2));
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  // Dummy additional images for preview
  const dummyImages = [
    car?.image,
    'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ].filter(Boolean);

  const calculateMonthlyPayment = () => {
    if (!car || !car.installmentDetails) return 0;
    
    const { interestRate } = car.installmentDetails;
    const price = car.discountPrice || car.price;
    const loanAmount = price - downPayment;
    const monthlyInterest = interestRate / 100 / 12;
    
    // Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const monthlyPayment = 
      (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, selectedMonths)) / 
      (Math.pow(1 + monthlyInterest, selectedMonths) - 1);
    
    return Math.round(monthlyPayment);
  };

  const handleOrderClick = () => {
    navigate('/order', { 
      state: { 
        car,
        installmentMonths: car?.installmentDetails ? selectedMonths : 0,
        downPayment: car?.installmentDetails ? downPayment : 0,
        monthlyPayment: car?.installmentDetails ? calculateMonthlyPayment() : 0,
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="pt-20 pb-16 min-h-screen">
        <div className="container-custom">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Car Not Found</h2>
            <p className="mb-6">The car you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/cars')}
              className="btn-primary"
            >
              Back to Cars
            </button>
          </div>
        </div>
      </div>
    );
  }

  const carPrice = car.discountPrice || car.price;

  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className="text-gray-500 hover:text-blue-600">Home</a>
              </li>
              <li className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <a href="/cars" className="text-gray-500 hover:text-blue-600">Cars</a>
              </li>
              <li className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-700">{car.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
              <img 
                src={mainImage} 
                alt={car.name} 
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {dummyImages.map((image, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer border-2 
                    ${mainImage === image ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setMainImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${car.name} view ${index + 1}`} 
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Car Name and Price */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{car.name}</h1>
                  <p className="text-gray-600">{car.brand}</p>
                </div>
                <div className="text-right">
                  {car.discountPrice ? (
                    <>
                      <div className="text-2xl font-bold text-blue-600">${car.discountPrice.toLocaleString()}</div>
                      <div className="text-sm text-gray-500 line-through">${car.price.toLocaleString()}</div>
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-blue-600">${car.price.toLocaleString()}</div>
                  )}
                </div>
              </div>
              
              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Year</div>
                    <div className="font-medium">{car.year}</div>
                  </div>
                </div>
                
                {car.engine && (
                  <div className="flex items-center">
                    <Gauge className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <div className="text-sm text-gray-600">Engine</div>
                      <div className="font-medium">{car.engine}</div>
                    </div>
                  </div>
                )}
                
                {car.mileage !== undefined && (
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <div className="text-sm text-gray-600">Mileage</div>
                      <div className="font-medium">{car.mileage.toLocaleString()} km</div>
                    </div>
                  </div>
                )}
                
                {car.color && (
                  <div className="flex items-center">
                    <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <div className="text-sm text-gray-600">Color</div>
                      <div className="font-medium">{car.color}</div>
                    </div>
                  </div>
                )}
                
                {car.condition && (
                  <div className="flex items-center">
                    <Info className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <div className="text-sm text-gray-600">Condition</div>
                      <div className="font-medium">{car.condition}</div>
                    </div>
                  </div>
                )}
                
                {car.isInstallmentAvailable && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <div className="text-sm text-gray-600">Installment</div>
                      <div className="font-medium text-green-600">Available</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Description */}
              {car.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{car.description}</p>
                </div>
              )}
              
              {/* Installment Calculator */}
              {car.isInstallmentAvailable && car.installmentDetails && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Installment Calculator</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Down Payment
                      </label>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">$</span>
                        <input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          min={0}
                          max={carPrice}
                          className="form-control"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Term (Months)
                      </label>
                      <select
                        value={selectedMonths}
                        onChange={(e) => setSelectedMonths(Number(e.target.value))}
                        className="form-control"
                      >
                        <option value={12}>12 months</option>
                        <option value={24}>24 months</option>
                        <option value={36}>36 months</option>
                        <option value={48}>48 months</option>
                        <option value={60}>60 months</option>
                      </select>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Monthly Payment:</span>
                        <span className="font-bold text-blue-600">
                          ${calculateMonthlyPayment().toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Interest Rate:</span>
                        <span className="font-medium">
                          {car.installmentDetails.interestRate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest:</span>
                        <span className="font-medium">
                          ${(calculateMonthlyPayment() * selectedMonths - (carPrice - downPayment)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleOrderClick}
                  className="btn-primary flex-1"
                >
                  {car.isInstallmentAvailable ? 'Order with Installment' : 'Order Now'}
                </button>
                <button
                  onClick={() => navigate('/cars')}
                  className="btn-outline flex-1"
                >
                  Back to Cars
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;