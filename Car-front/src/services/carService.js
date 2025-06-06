import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all cars with optional filtering
export const getCars = async (filters) => {
  try {
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.priceRange) {
        params.append('min_price', filters.priceRange[0]);
        params.append('max_price', filters.priceRange[1]);
      }
      
      if (filters.brands && filters.brands.length > 0) {
        params.append('brand', filters.brands[0]); // Backend currently supports single brand filter
      }
      
      if (filters.years && filters.years.length > 0) {
        params.append('min_year', Math.min(...filters.years));
        params.append('max_year', Math.max(...filters.years));
      }
      
      if (filters.installmentOnly) {
        params.append('installment', 'true');
      }
    }
    
    const response = await axios.get(`${API_URL}/cars?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

// Get a single car by ID
export const getCarById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching car:', error);
    throw error;
  }
};

// Get all brands
export const getBrands = async () => {
  try {
    const response = await axios.get(`${API_URL}/cars/brands`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

// Add car (for admin)
export const addCar = async (carData) => {
  try {
    const formData = new FormData();
    
    // Append all car data to formData
    Object.keys(carData).forEach(key => {
      if (key === 'image' && carData[key]) {
        formData.append('image', carData[key]);
      } else {
        formData.append(key, carData[key]);
      }
    });
    
    const response = await axios.post(`${API_URL}/cars`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error adding car:', error);
    throw error;
  }
};

// Update car (for admin)
export const updateCar = async (id, carData) => {
  try {
    const formData = new FormData();
    
    // Append all car data to formData
    Object.keys(carData).forEach(key => {
      if (key === 'image' && carData[key]) {
        formData.append('image', carData[key]);
      } else {
        formData.append(key, carData[key]);
      }
    });
    
    const response = await axios.put(`${API_URL}/cars/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

// Delete car (for admin)
export const deleteCar = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/cars/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
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