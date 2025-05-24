import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Car, ShoppingCart, DollarSign, TrendingUp, ChevronRight } from 'lucide-react';

const AdminDashboard = () => {
  useEffect(() => {
    document.title = 'Admin Dashboard - AutoLuxe';
  }, []);

  // Dummy data for demo
  const stats = [
    {
      title: 'Total Users',
      value: '1,245',
      change: '+12.5%',
      positive: true,
      icon: <Users className="h-7 w-7 text-blue-500" />,
    },
    {
      title: 'Total Cars',
      value: '85',
      change: '+5.8%',
      positive: true,
      icon: <Car className="h-7 w-7 text-green-500" />,
    },
    {
      title: "Today's Orders",
      value: '24',
      change: '-2.7%',
      positive: false,
      icon: <ShoppingCart className="h-7 w-7 text-orange-500" />,
    },
    {
      title: 'Total Revenue',
      value: '$1.2M',
      change: '+18.2%',
      positive: true,
      icon: <DollarSign className="h-7 w-7 text-purple-500" />,
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'John Smith',
      car: 'Mercedes-Benz S-Class',
      amount: '$120,000',
      status: 'completed',
      date: '2023-07-25',
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Johnson',
      car: 'BMW 7 Series',
      amount: '$110,000',
      status: 'processing',
      date: '2023-07-24',
    },
    {
      id: 'ORD-003',
      customer: 'Michael Chen',
      car: 'Tesla Model 3',
      amount: '$41,999',
      status: 'pending',
      date: '2023-07-24',
    },
    {
      id: 'ORD-004',
      customer: 'Emily Davis',
      car: 'Audi A8',
      amount: '$115,000',
      status: 'completed',
      date: '2023-07-23',
    },
    {
      id: 'ORD-005',
      customer: 'Robert Wilson',
      car: 'Toyota Camry',
      amount: '$32,500',
      status: 'processing',
      date: '2023-07-23',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className={`
                  text-sm mt-2 flex items-center
                  ${stat.positive ? 'text-green-600' : 'text-red-600'}
                `}>
                  <span className={`
                    mr-1
                    ${stat.positive ? 'text-green-600' : 'text-red-600'}
                  `}>
                    {stat.positive ? '↑' : '↓'}
                  </span>
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <select className="form-control text-sm py-2">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">Revenue chart would be displayed here</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-sm p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Sales by Category</h3>
            <select className="form-control text-sm py-2">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-gray-600">Sales chart would be displayed here</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        className="bg-white rounded-xl shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.car}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2 py-1 text-xs rounded-full
                      ${order.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard; 