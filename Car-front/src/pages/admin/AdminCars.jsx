import React from 'react';

const AdminCars = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Car Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Available Cars</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add New Car
          </button>
        </div>
        <div className="border rounded-lg">
          <div className="p-4 text-gray-500 text-center">
            Loading cars...
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCars; 