import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AuthForm from '../components/auth/AuthForm';
import { Car } from 'lucide-react';

const RegisterPage = () => {
  useEffect(() => {
    document.title = 'Register - AutoLuxe';
  }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundImage: 'url(https://images.pexels.com/photos/2834653/pexels-photo-2834653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <motion.div 
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-white p-3 rounded-full shadow-md mb-4">
            <Car className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white">Join AutoLuxe</h1>
          <p className="text-gray-200">Create an account to get started</p>
        </div>
        
        <AuthForm type="register" />
      </motion.div>
    </div>
  );
};

export default RegisterPage; 