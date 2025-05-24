// Dummy data for demo purposes
const DUMMY_CARS = [
  {
    id: '1',
    name: 'Mercedes-Benz S-Class',
    brand: 'Mercedes-Benz',
    price: 120000,
    image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2023,
    engine: '4.0L V8',
    isInstallmentAvailable: true,
    color: 'Black',
    condition: 'New',
    mileage: 0,
    description: 'Experience unparalleled luxury with the all-new Mercedes-Benz S-Class. This flagship sedan combines cutting-edge technology with elegant design for the ultimate driving experience.',
    installmentDetails: {
      minMonths: 12,
      maxMonths: 60,
      interestRate: 5.9,
    },
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
    color: 'White',
    condition: 'New',
    mileage: 0,
    description: 'The BMW 7 Series redefines what it means to be a luxury sedan. With its bold design, luxurious interior, and advanced technology, it is the ultimate expression of BMW excellence.',
    installmentDetails: {
      minMonths: 12,
      maxMonths: 60,
      interestRate: 5.5,
    },
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
    color: 'Silver',
    condition: 'New',
    mileage: 0,
    description: 'The Audi A8 is a luxury sedan that combines elegant design with cutting-edge technology. Experience unparalleled comfort and performance in this flagship Audi model.',
    installmentDetails: {
      minMonths: 12,
      maxMonths: 60,
      interestRate: 5.7,
    },
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
    color: 'Red',
    condition: 'New',
    mileage: 0,
    description: 'The Tesla Model 3 is an all-electric sedan that combines performance, safety, and technology. With its sleek design and zero emissions, it is the perfect car for the eco-conscious driver.',
    installmentDetails: {
      minMonths: 12,
      maxMonths: 60,
      interestRate: 4.9,
    },
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
    color: 'Blue',
    condition: 'New',
    mileage: 0,
    description: 'The Toyota Camry combines reliability with style and comfort. This mid-size sedan offers excellent fuel efficiency, a spacious interior, and advanced safety features.',
    installmentDetails: {
      minMonths: 12,
      maxMonths: 60,
      interestRate: 4.5,
    },
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
    color: 'Gray',
    condition: 'New',
    mileage: 0,
    description: 'The Honda Accord is a mid-size sedan that offers a perfect balance of performance, comfort, and efficiency. With its sleek design and advanced features, it is a standout in its class.',
    installmentDetails: {
      minMonths: 12,
      maxMonths: 60,
      interestRate: 4.7,
    },
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
    color: 'Black',
    condition: 'New',
    mileage: 0,
    description: 'The Nissan Altima offers a premium driving experience at an affordable price. With its comfortable interior, fuel-efficient engine, and advanced safety features, it is perfect for everyday driving.',
    installmentDetails: null,
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
    color: 'White',
    condition: 'New',
    mileage: 0,
    description: 'The Lexus ES is a luxury sedan that offers a perfect blend of comfort, performance, and style. With its premium materials and advanced technology, it delivers a first-class driving experience.',
    installmentDetails: {
      minMonths: 12,
      maxMonths: 60,
      interestRate: 5.2,
    },
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
    color: 'Silver',
    condition: 'New',
    mileage: 0,
    description: 'The Chevrolet Malibu is a mid-size sedan that combines style, efficiency, and technology. With its comfortable ride and modern features, it is an excellent choice for daily commuting.',
    installmentDetails: null,
  },
];

// Get all cars with optional filtering
export const getCars = async (filters) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  let cars = [...DUMMY_CARS];
  
  if (filters) {
    // Apply filters
    if (filters.priceRange) {
      cars = cars.filter(
        car => car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
      );
    }
    
    if (filters.brands && filters.brands.length > 0) {
      cars = cars.filter(car => filters.brands.includes(car.brand || ''));
    }
    
    if (filters.years && filters.years.length > 0) {
      cars = cars.filter(car => filters.years.includes(car.year));
    }
    
    if (filters.installmentOnly) {
      cars = cars.filter(car => car.isInstallmentAvailable);
    }
  }
  
  return cars;
};

// Get a single car by ID
export const getCarById = async (id) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const car = DUMMY_CARS.find(car => car.id === id);
  return car || null;
};

// Get trending cars
export const getTrendingCars = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo, return the first 3 cars as trending
  return DUMMY_CARS.slice(0, 3);
};

// Get discounted cars
export const getDiscountedCars = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return cars with discountPrice
  return DUMMY_CARS.filter(car => car.discountPrice);
};

// Add car (for admin)
export const addCar = async (car) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newCar = {
    ...car,
    id: `${DUMMY_CARS.length + 1}`,
  };
  
  DUMMY_CARS.push(newCar);
  return newCar;
};

// Update car (for admin)
export const updateCar = async (id, car) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const index = DUMMY_CARS.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  const updatedCar = {
    ...DUMMY_CARS[index],
    ...car,
  };
  
  DUMMY_CARS[index] = updatedCar;
  return updatedCar;
};

// Delete car (for admin)
export const deleteCar = async (id) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const index = DUMMY_CARS.findIndex(car => car.id === id);
  if (index === -1) return false;
  
  DUMMY_CARS.splice(index, 1);
  return true;
}; 