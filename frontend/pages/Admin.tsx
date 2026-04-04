import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Star,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Home
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Navigate, Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

const Admin: React.FC = () => {
  const { isAdmin, logout, user } = useStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect if not admin
  if (!isAdmin) return <Navigate to="/" />;

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { label: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { label: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { label: 'Customers', icon: <Users size={20} />, path: '/admin/users' },
    { label: 'Reviews', icon: <Star size={20} />, path: '/admin/reviews' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F8EDED]">
      {/* Textile overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-[#B43F3F]/10 sticky top-0 h-screen overflow-y-auto">
        <div className="p-8 pb-4">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="text-2xl font-display font-medium text-[#173B45]">
              Tan<span className="text-[#B43F3F]">vo</span>
            </span>
            <span className="text-[10px] bg-[#FF8225]/10 text-[#FF8225] font-medium px-2 py-0.5 rounded border border-[#FF8225]/20 uppercase">Admin</span>
          </Link>

          <div className="flex items-center gap-3 p-4 bg-[#F8EDED] rounded-xl mb-6 border border-[#B43F3F]/10">
            <div className="w-10 h-10 bg-[#B43F3F] text-[#F8EDED] rounded-full flex items-center justify-center font-medium">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-[#173B45] truncate">{user?.name || 'Admin User'}</p>
              <p className="text-[10px] text-[#173B45]/50 uppercase tracking-wider">{user?.role || 'Administrator'}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive(item.path)
                  ? 'bg-[#B43F3F] text-[#F8EDED] shadow-md shadow-[#B43F3F]/20'
                  : 'text-[#173B45]/70 hover:bg-[#F8EDED] hover:text-[#B43F3F]'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive(item.path) ? 'text-[#F8EDED]' : 'text-[#173B45]/50'}>{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {isActive(item.path) && <ChevronRight size={14} className="text-[#F8EDED]" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-[#173B45]/70 hover:text-[#B43F3F] hover:bg-[#F8EDED] rounded-xl transition-all border border-transparent hover:border-[#B43F3F]/20"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>

        {/* Back to Site Link */}
        <div className="p-4 pt-2">
          <Link
            to="/"
            className="flex items-center gap-3 w-full px-4 py-3 text-[#173B45]/50 hover:text-[#FF8225] rounded-xl transition-all border border-[#B43F3F]/10 hover:border-[#FF8225]/30 text-sm"
          >
            <Home size={16} />
            <span>Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-[#B43F3F]/10 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-[#F8EDED] rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={20} className="text-[#173B45]" /> : <Menu size={20} className="text-[#173B45]" />}
          </button>
          <Link to="/" className="text-xl font-display font-medium text-[#173B45]">
            Tan<span className="text-[#B43F3F]">vo</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-[#FF8225]/10 text-[#FF8225] font-medium px-2 py-1 rounded border border-[#FF8225]/20">
            Admin
          </span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#173B45]/60 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-4/5 max-w-xs bg-white z-40 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="text-xl font-display font-medium text-[#173B45]">
                    Tan<span className="text-[#B43F3F]">vo</span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-[#F8EDED] rounded-lg transition-colors"
                  >
                    <X size={18} className="text-[#173B45]" />
                  </button>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#F8EDED] rounded-xl mb-6 border border-[#B43F3F]/10">
                  <div className="w-10 h-10 bg-[#B43F3F] text-[#F8EDED] rounded-full flex items-center justify-center font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-[#173B45] truncate">{user?.name || 'Admin User'}</p>
                    <p className="text-[10px] text-[#173B45]/50 uppercase tracking-wider">{user?.role || 'Administrator'}</p>
                  </div>
                </div>

                <nav className="space-y-1 mb-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(item.path)
                          ? 'bg-[#B43F3F] text-[#F8EDED]'
                          : 'text-[#173B45]/70 hover:bg-[#F8EDED] hover:text-[#B43F3F]'
                        }`}
                    >
                      {item.icon}
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  ))}
                </nav>

                <div className="pt-4 border-t border-[#B43F3F]/10 space-y-2">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[#173B45]/50 hover:text-[#FF8225] rounded-xl transition-all text-sm"
                  >
                    <Home size={16} />
                    <span>Back to Site</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-[#173B45]/70 hover:text-[#B43F3F] hover:bg-[#F8EDED] rounded-xl transition-all text-sm"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#B43F3F]/10 px-2 py-2 z-20 flex justify-around">
        {menuItems.slice(0, 4).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all ${isActive(item.path)
                ? 'text-[#B43F3F]'
                : 'text-[#173B45]/50 hover:text-[#FF8225]'
              }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 lg:pb-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Admin;