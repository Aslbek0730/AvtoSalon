import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car as CarIcon, CreditCard, UserCircle, Phone, MessageSquare, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const orderState = location.state;
  const { car } = orderState || {};
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    paymentType: 'full', // 'full' or 'installment'
    installmentMonths: orderState?.installmentMonths || 36,
    downPayment: orderState?.downPayment || 0,
    paymentMethod: 'payme', // 'payme', 'click', or 'uzum'
    comments: '',
  });
  
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    document.title = 'Place an Order - AutoLuxe';
    
    // Redirect if no car is selected
    if (!car) {
      navigate('/cars');
      toast.error('Please select a car first');
    }
    
    // Pre-fill form if user is logged in
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        phone: user.phone,
      }));
    }
  }, [car, navigate, isAuthenticated, user]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (formData.paymentType === 'installment') {
      if (formData.downPayment <= 0) {
        newErrors.downPayment = 'Down payment is required for installment';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // For demo, we'll just show the payment modal
    setShowPaymentModal(true);
  };
  
  const handlePayment = async () => {
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setShowPaymentModal(false);
    
    toast.success('Order placed successfully!');
    navigate('/profile');
  };
  
  if (!car) {
    return null; // Will redirect in useEffect
  }
  
  const carPrice = car.discountPrice || car.price;
  
  return (
    <div className="pt-20 pb-16">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Car Summary */}
          <div className="bg-blue-50 p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="w-full md:w-2/3 md:pl-6">
                <h1 className="text-2xl font-bold mb-2">{car.name}</h1>
                <div className="flex items-center mb-2">
                  <CarIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">{car.brand} | {car.year}</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">Price: </span>
                  <span className="ml-1 font-semibold">${carPrice.toLocaleString()}</span>
                  {car.discountPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">${car.price.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-control pl-10 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-control pl-10 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="+998 XX XXX XX XX"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
              
              {/* Payment Type */}
              <div>
                <label className="form-label">Payment Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`
                    relative flex items-center p-4 border rounded-lg cursor-pointer
                    ${formData.paymentType === 'full' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                  `}>
                    <input
                      type="radio"
                      name="paymentType"
                      value="full"
                      checked={formData.paymentType === 'full'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className={`
                      h-5 w-5 rounded-full border flex items-center justify-center mr-3
                      ${formData.paymentType === 'full' ? 'border-blue-600' : 'border-gray-400'}
                    `}>
                      {formData.paymentType === 'full' && (
                        <span className="h-3 w-3 rounded-full bg-blue-600"></span>
                      )}
                    </span>
                    <div>
                      <span className="font-medium">Full Payment</span>
                      <p className="text-sm text-gray-600">Pay the full amount upfront</p>
                    </div>
                  </label>
                  
                  <label className={`
                    relative flex items-center p-4 border rounded-lg cursor-pointer
                    ${formData.paymentType === 'installment' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                    ${!car.isInstallmentAvailable ? 'opacity-50 cursor-not-allowed' : ''}
                  `}>
                    <input
                      type="radio"
                      name="paymentType"
                      value="installment"
                      checked={formData.paymentType === 'installment'}
                      onChange={handleChange}
                      disabled={!car.isInstallmentAvailable}
                      className="sr-only"
                    />
                    <span className={`
                      h-5 w-5 rounded-full border flex items-center justify-center mr-3
                      ${formData.paymentType === 'installment' ? 'border-blue-600' : 'border-gray-400'}
                    `}>
                      {formData.paymentType === 'installment' && (
                        <span className="h-3 w-3 rounded-full bg-blue-600"></span>
                      )}
                    </span>
                    <div>
                      <span className="font-medium">Installment</span>
                      <p className="text-sm text-gray-600">Pay in monthly installments</p>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Installment Details */}
              {formData.paymentType === 'installment' && car.isInstallmentAvailable && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="installmentMonths" className="form-label">
                      Loan Term (Months)
                    </label>
                    <select
                      id="installmentMonths"
                      name="installmentMonths"
                      value={formData.installmentMonths}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value={12}>12 months</option>
                      <option value={24}>24 months</option>
                      <option value={36}>36 months</option>
                      <option value={48}>48 months</option>
                      <option value={60}>60 months</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="downPayment" className="form-label">
                      Down Payment
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="downPayment"
                        name="downPayment"
                        type="number"
                        value={formData.downPayment}
                        onChange={handleChange}
                        min={0}
                        max={carPrice}
                        className={`form-control pl-10 ${errors.downPayment ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      />
                    </div>
                    {errors.downPayment && (
                      <p className="mt-1 text-sm text-red-600">{errors.downPayment}</p>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Monthly Payment:</span>
                      <span className="font-bold text-blue-600">
                        ${orderState?.monthlyPayment?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-medium">
                        {car.installmentDetails?.interestRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-medium">
                        ${(orderState?.monthlyPayment * formData.installmentMonths - (carPrice - formData.downPayment)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Method */}
              <div>
                <label className="form-label">Payment Method</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['payme', 'click', 'uzum'].map((method) => (
                    <label
                      key={method}
                      className={`
                        relative flex items-center p-4 border rounded-lg cursor-pointer
                        ${formData.paymentMethod === method ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                      `}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className={`
                        h-5 w-5 rounded-full border flex items-center justify-center mr-3
                        ${formData.paymentMethod === method ? 'border-blue-600' : 'border-gray-400'}
                      `}>
                        {formData.paymentMethod === method && (
                          <span className="h-3 w-3 rounded-full bg-blue-600"></span>
                        )}
                      </span>
                      <div>
                        <span className="font-medium capitalize">{method}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Comments */}
              <div>
                <label htmlFor="comments" className="form-label">
                  Additional Comments
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows={4}
                    className="form-control pl-10"
                    placeholder="Any special requests or questions?"
                  />
                </div>
              </div>
              
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
            <p className="text-gray-600 mb-6">
              You will be redirected to {formData.paymentMethod.toUpperCase()} to complete your payment of{' '}
              <span className="font-bold">${carPrice.toLocaleString()}</span>
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="btn-outline flex-1"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="btn-primary flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Confirm Payment'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrderPage; 