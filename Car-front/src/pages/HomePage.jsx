import React, { useEffect } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import TrendingCars from '../components/home/TrendingCars';
import DiscountedCars from '../components/home/DiscountedCars';
import { motion } from 'framer-motion';
import { Gauge, Award, Clock, Shield } from 'lucide-react';

const HomePage = () => {
  useEffect(() => {
    document.title = 'AutoLuxe - Premium Car Dealership';
  }, []);

  const features = [
    {
      icon: <Gauge className="h-10 w-10 text-blue-500" />,
      title: 'Sifatli mashinalar',
      description: 'Hamma mashinalar bizning tayyorlash jarayoni orqali sifatli mashinalar bo\'ladi.',
    },
    {
      icon: <Award className="h-10 w-10 text-blue-500" />,
      title: 'Eng yaxshi narxlar',
      description: 'Biz tanlangan mashinalar uchun qiyinliklarni taklif etamiz.',
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-500" />,
      title: 'Moslashuvchan to\'lov',
      description: 'Turli to\'lov imkoniyatlari orasidan tanlang.',
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      title: 'Kafolat',
      description: 'Hamma mashinalar kafolat bilan chiqariladi.',
    },
  ];

  return (
    <div className="pt-16">
      <HeroBanner />
      <TrendingCars />
      
      {/* Why Choose Us */}
      <section className="section bg-blue-50">
        <div className="container-custom">
          <h2 className="section-title">Nimaga bizni tanlash kerak?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <DiscountedCars />
      
      {/* Testimonials */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Bizning mijozlar biz haqimizda nima deyishadi?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Anvar Narzullayev',
                image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                text: 'Bizning AutoLuxe tayyorlash jarayoni bizning mashinani sotib olishimiz mumkin edi.',
              },
              {
                name: 'Sherzod Qosimov',
                image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                text: 'Bizning mashinani sotib olishimiz mumkin edi.',
              },
              {
                name: 'Madina Tursunova',
                image: 'https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                text: 'Bizning AutoLuxe tayyorlash jarayoni bizning mashinani sotib olishimiz mumkin edi.',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Yangi mashina topishga tayyormisiz?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Bizning premium mashinalar to\'plamiga qarang va biz bilan AutoLuxe yoshlashni boshlang.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/cars" className="btn-secondary">
              Mashinalar
            </a>
            <a href="#contact" className="btn bg-white text-blue-700 hover:bg-gray-100">
              Biz bilan bog\'lanish
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 