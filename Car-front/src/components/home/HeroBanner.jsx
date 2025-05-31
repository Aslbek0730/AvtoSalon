import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1600)', 
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Content */}
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
           Biz bilan yangi mashina tanlashni boshlang!
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bizning premium avtomobillar tanlovi bilan hashamat va unumdorlikni his eting. Moslashuvchan to'lov imkoniyatlari bilan orzuingizdagi mashinani toping.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              to="/cars" 
              className="btn-primary"
            >
              Mashinalar haqida
            </Link>
            <a 
              href="#trending" 
              className="btn-outline bg-transparent text-white border-white hover:bg-white/10"
            >
              Trending mashinalar
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div 
          className="w-8 h-12 border-2 border-white rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div 
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroBanner; 