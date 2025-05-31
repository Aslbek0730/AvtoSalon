import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, CreditCard, Search, ChevronRight } from 'lucide-react';

const AdminPayments = () => {
  useEffect(() => {
    document.title = 'Admin Payments - AutoLuxe';
  }, []);

  // Dummy data for demo
  const recentPayments = [
    {
      id: 'PAY-001',
      customer: 'John Smith',
      car: 'Mercedes-Benz S-Class',
      amount: 120000,
      type: 'To\'liq to\'lov',
      method: 'Payme',
      status: 'completed',
      date: '2023-07-25',
    },
    {
      id: 'PAY-002',
      customer: 'Sarah Johnson',
      car: 'BMW 7 Series',
      amount: 20000,
      type: 'Down Payment',
      method: 'Click',
      status: 'processing',
      date: '2023-07-24',
    },
    {
      id: 'PAY-003',
      customer: 'Michael Chen',
      car: 'Tesla Model 3',
      amount: 1500,
      type: 'Installment',
      method: 'Uzum',
      status: 'pending',
      date: '2023-07-24',
    },
    {
      id: 'PAY-004',
      customer: 'Emily Davis',
      car: 'Audi A8',
      amount: 1500,
      type: 'Installment',
      method: 'Payme',
      status: 'completed',
      date: '2023-07-23',
    },
    {
      id: 'PAY-005',
      customer: 'Robert Wilson',
      car: 'Toyota Camry',
      amount: 32500,
      type: 'Full Payment',
      method: 'Click',
      status: 'completed',
      date: '2023-07-23',
    },
  ];

  const paymentStats = [
    {
      title: 'Total Revenue',
      value: '$1.2M',
      change: '+18.2%',
      positive: true,
      icon: <DollarSign className="h-7 w-7 text-green-500" />,
    },
    {
      title: "Today's Payments",
      value: '24',
      change: '+5.8%',
      positive: true,
      icon: <Calendar className="h-7 w-7 text-blue-500" />,
    },
    {
      title: 'Pending Payments',
      value: '12',
      change: '-2.7%',
      positive: false,
      icon: <CreditCard className="h-7 w-7 text-orange-500" />,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-gray-600">Manage and track all payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paymentStats.map((stat, index) => (
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

      {/* Payments Table */}
      <motion.div
        className="bg-white rounded-xl shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-semibold">Recent Payments</h2>
            
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search payments..."
                className="form-control pl-10"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPayments.map((payment) => (
                <tr 
                  key={payment.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {payment.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {payment.car}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {payment.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {payment.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    ${payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2 py-1 text-xs rounded-full
                      ${payment.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : payment.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'}
                    `}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing 1-5 of 25 payments
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded bg-blue-50 text-blue-600 border border-blue-100">
                1
              </button>
              <button className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPayments; 