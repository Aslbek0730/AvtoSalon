import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, CreditCard, Calendar, User, Settings, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    document.title = 'My Profile - AutoLuxe';

    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Dummy data for demo
  const dummyOrders = [
    {
      id: '1',
      car: {
        id: '3',
        name: 'Audi A8',
        image: 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      status: 'pending',
      totalAmount: 115000,
      amountPaid: 20000,
      nextPaymentDate: '2023-10-15',
      nextPaymentAmount: 1500,
      orderDate: '2023-05-10',
    },
    {
      id: '2',
      car: {
        id: '5',
        name: 'Toyota Camry',
        image: 'https://images.pexels.com/photos/2036544/pexels-photo-2036544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      status: 'paid',
      totalAmount: 32500,
      amountPaid: 32500,
      orderDate: '2023-03-22',
    },
  ];

  const dummyPayments = [
    {
      id: '1',
      date: '2023-05-10',
      amount: 20000,
      method: 'Payme',
      orderId: '1',
      carName: 'Audi A8',
      type: 'Down Payment',
    },
    {
      id: '2',
      date: '2023-06-15',
      amount: 1500,
      method: 'Click',
      orderId: '1',
      carName: 'Audi A8',
      type: 'Installment',
    },
    {
      id: '3',
      date: '2023-07-15',
      amount: 1500,
      method: 'Payme',
      orderId: '1',
      carName: 'Audi A8',
      type: 'Installment',
    },
    {
      id: '4',
      date: '2023-03-22',
      amount: 32500,
      method: 'Uzum',
      orderId: '2',
      carName: 'Toyota Camry',
      type: 'To\'liq to\'lov',
    },
  ];

  const installmentSchedule = [
    {
      date: '2023-08-15',
      amount: 1500,
      status: 'upcoming',
      orderId: '1',
      carName: 'Audi A8',
    },
    {
      date: '2023-09-15',
      amount: 1500,
      status: 'upcoming',
      orderId: '1',
      carName: 'Audi A8',
    },
    {
      date: '2023-10-15',
      amount: 1500,
      status: 'upcoming',
      orderId: '1',
      carName: 'Audi A8',
    },
    // More future payments...
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">My Orders</h2>
            {dummyOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-600">You haven't placed any orders yet.</p>
                <button 
                  onClick={() => navigate('/cars')}
                  className="mt-4 btn-primary text-sm"
                >
                  Browse Cars
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {dummyOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row items-start">
                        <div className="w-full md:w-1/4 mb-4 md:mb-0">
                          <img 
                            src={order.car.image} 
                            alt={order.car.name} 
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-full md:w-3/4 md:pl-6">
                          <div className="flex flex-wrap justify-between items-start mb-3">
                            <h3 className="text-lg font-semibold">{order.car.name}</h3>
                            <div className={`
                              px-3 py-1 rounded-full text-sm font-medium
                              ${order.status === 'paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'}
                            `}>
                              {order.status === 'paid' ? 'Fully Paid' : 'Pending'}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Order Date:</p>
                              <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Total Amount:</p>
                              <p className="font-medium">${order.totalAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Amount Paid:</p>
                              <p className="font-medium">${order.amountPaid.toLocaleString()}</p>
                            </div>
                            {order.status === 'pending' && (
                              <div>
                                <p className="text-sm text-gray-600">Next Payment:</p>
                                <p className="font-medium">
                                  ${order.nextPaymentAmount.toLocaleString()} on{' '}
                                  {new Date(order.nextPaymentDate).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          {order.status === 'pending' && (
                            <div className="relative pt-1">
                              <div className="flex mb-2 items-center justify-between">
                                <div>
                                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                    Payment Progress
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-semibold inline-block text-blue-600">
                                    {Math.round((order.amountPaid / order.totalAmount) * 100)}%
                                  </span>
                                </div>
                              </div>
                              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                <div 
                                  style={{ width: `${(order.amountPaid / order.totalAmount) * 100}%` }} 
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                ></div>
                              </div>
                            </div>
                          )}
                          
                          <button className="btn-outline text-sm py-2">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'payments':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Payment History</h2>
            {dummyPayments.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-600">No payment history available.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Car
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dummyPayments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payment.carName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payment.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payment.method}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${payment.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'schedule':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Payment Schedule</h2>
            {installmentSchedule.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-600">No upcoming payments scheduled.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Car
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {installmentSchedule.map((payment, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payment.carName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${payment.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Upcoming
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        value={user?.phone || ''}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Security</h3>
                  <div className="space-y-4">
                    <button className="btn-outline w-full">
                      Change Password
                    </button>
                    <button className="btn-outline w-full">
                      Enable Two-Factor Authentication
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4 text-red-600">Danger Zone</h3>
                  <button 
                    onClick={logout}
                    className="btn-danger w-full"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`
                    w-full flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${activeTab === 'orders'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  My Orders
                </button>
                
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`
                    w-full flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${activeTab === 'payments'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  Payment History
                </button>
                
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`
                    w-full flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${activeTab === 'schedule'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  Payment Schedule
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`
                    w-full flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${activeTab === 'settings'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 