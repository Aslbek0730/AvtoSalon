import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  ShoppingCart, 
  CreditCard, 
  Users, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard />, label: 'Dashboard' },
    { path: '/admin/cars', icon: <Car />, label: 'Cars' },
    { path: '/admin/orders', icon: <ShoppingCart />, label: 'Orders' },
    { path: '/admin/payments', icon: <CreditCard />, label: 'Payments' },
    { path: '/admin/users', icon: <Users />, label: 'Users' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 z-20 m-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white shadow-md focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-20 
          w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="px-6 py-6 flex items-center border-b border-gray-200">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-xl font-bold">
              Auto<span className="text-gold">Luxe</span> Admin
            </span>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                  ${isActive(item.path) 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'}
                `}
                onClick={() => setIsOpen(false)}
              >
                <span className={`${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                <span className="ml-3 font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="px-4 py-6 border-t border-gray-200">
            <button
              onClick={logout}
              className="flex w-full items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <LogOut className="text-gray-500" />
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar; 