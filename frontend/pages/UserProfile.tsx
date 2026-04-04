import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Calendar, Package, Heart,
  LogOut, Settings, Edit2, Camera, Award, Star, MessageSquare,
  Briefcase, Shield, Bell, Moon, HelpCircle, ChevronRight, Gift,
  Plus, Trash2, Menu, X, ChevronDown, ChevronUp, Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import API from '../services/api';

interface Address {
  _id: string;
  type: 'home' | 'work' | 'other';
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface Order {
  _id: string;
  orderNumber: string;
  totalPrice: number;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  orderItems: Array<{
    product: {
      name: string;
      images: Array<{ url: string }>;
    };
    quantity: number;
  }>;
}

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  images: Array<{ url: string }>;
  ratings: number;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalOrders: 0,
    loyaltyPoints: 0,
    memberSince: ''
  });

  // Show address form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: 'home',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Odisha',
    pincode: '',
    phone: user?.phone || '',
    isDefault: false
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?redirect=profile');
    }
  }, [isAuthenticated, navigate]);

  // Fetch user data
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Close mobile menu on tab change
    setMobileMenuOpen(false);
  }, [activeTab]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Fetch addresses
      const addrRes = await API.get('/users/addresses');
      setAddresses(addrRes.data);

      // Fetch recent orders
      const ordersRes = await API.get('/orders/my-orders?limit=5');
      setOrders(ordersRes.data.orders);

      // Fetch wishlist
      const wishlistRes = await API.get('/users/wishlist');
      setWishlistItems(wishlistRes.data);

      // Fetch user stats
      const statsRes = await API.get('/users/activity');
      setStats({
        totalSpent: statsRes.data.stats?.totalSpent || 0,
        totalOrders: statsRes.data.stats?.totalOrders || 0,
        loyaltyPoints: Math.floor((statsRes.data.stats?.totalSpent || 0) / 100),
        memberSince: user?.createdAt ? new Date(user.createdAt).getFullYear().toString() : '2025'
      });

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    try {
      setLoading(true);
      const { data } = await API.post('/users/addresses', newAddress);
      setAddresses(data);
      setShowAddressForm(false);
      setNewAddress({
        type: 'home',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: 'Odisha',
        pincode: '',
        phone: user?.phone || '',
        isDefault: false
      });
    } catch (error) {
      console.error('Error adding address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAddress = async () => {
    if (!editingAddress) return;
    try {
      setLoading(true);
      const { data } = await API.put(`/users/addresses/${editingAddress._id}`, editingAddress);
      setAddresses(data);
      setEditingAddress(null);
    } catch (error) {
      console.error('Error updating address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      setLoading(true);
      const { data } = await API.delete(`/users/addresses/${addressId}`);
      setAddresses(data);
    } catch (error) {
      console.error('Error deleting address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      setLoading(true);
      const { data } = await API.put(`/users/addresses/${addressId}`, { isDefault: true });
      setAddresses(data);
    } catch (error) {
      console.error('Error setting default address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      setLoading(true);
      const { data } = await API.put('/users/profile/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfileImage(data.profileImage);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-[#FF8225]/10 text-[#FF8225]',
      Processing: 'bg-[#B43F3F]/10 text-[#B43F3F]',
      Shipped: 'bg-[#173B45]/10 text-[#173B45]',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-[#173B45]';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: `Orders (${stats.totalOrders})`, icon: Package },
    { id: 'wishlist', label: `Wishlist (${wishlistItems.length})`, icon: Heart },
    { id: 'addresses', label: `Addresses (${addresses.length})`, icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-[#F8EDED] pt-32 pb-24 flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-[#B43F3F] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#FF8225] rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8EDED] pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-medium text-[#173B45]">My Account</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-white rounded-xl shadow-sm border border-[#B43F3F]/10"
          >
            {mobileMenuOpen ? <X size={20} className="text-[#B43F3F]" /> : <Menu size={20} className="text-[#B43F3F]" />}
          </button>
        </div>

        {/* Profile Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl md:rounded-[2.5rem] shadow-xl border border-[#B43F3F]/10 overflow-hidden mb-6 md:mb-8"
        >
          <div className="h-28 md:h-48 bg-gradient-to-r from-[#B43F3F] via-[#FF8225] to-[#B43F3F] relative">
            {/* Profile Image and Name - Mobile Layout */}
            <div className="absolute -bottom-12 md:-bottom-16 left-4 md:left-12 flex items-end gap-4 md:gap-6">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-xl md:rounded-3xl bg-white p-1 shadow-2xl relative group">
                <div className="w-full h-full rounded-lg md:rounded-2xl bg-[#F8EDED] flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt={user?.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={28} className="md:size-48 text-[#B43F3F]/30" />
                  )}
                </div>
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg md:rounded-2xl flex items-center justify-center cursor-pointer">
                  <Camera size={16} className="md:size-20 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    disabled={loading}
                  />
                </label>
              </div>
              <div className="mb-2 md:mb-4">
                <h1 className="text-xl md:text-3xl font-display font-medium text-[#173B45]">{user?.name || 'User'}</h1>
                <p className="text-xs md:text-sm font-medium text-[#FF8225] uppercase tracking-wider flex items-center gap-1 md:gap-2">
                  <Award size={14} className="md:size-16" />
                  <span className="truncate max-w-[150px] md:max-w-none">
                    {stats.loyaltyPoints >= 5000 ? 'Platinum' : stats.loyaltyPoints >= 2000 ? 'Gold' : 'Silver'} Member
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons - Mobile Optimized */}
            <div className="absolute bottom-3 md:bottom-4 right-4 md:right-12 flex gap-2 md:gap-3">
              <button
                onClick={() => setActiveTab('settings')}
                className="px-3 md:px-5 py-1.5 md:py-2.5 bg-white/90 backdrop-blur-sm text-[#173B45] rounded-lg md:rounded-xl font-medium text-[10px] md:text-xs uppercase tracking-wider shadow-lg hover:bg-white transition-colors"
              >
                Edit
              </button>
              <button
                onClick={logout}
                className="px-3 md:px-5 py-1.5 md:py-2.5 bg-[#B43F3F] text-white rounded-lg md:rounded-xl font-medium text-[10px] md:text-xs uppercase tracking-wider shadow-lg hover:bg-[#FF8225] transition-colors flex items-center gap-1 md:gap-2"
              >
                <LogOut size={12} className="md:size-14" />
                <span className="hidden xs:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Stats Row - Mobile Optimized */}
          <div className="pt-16 md:pt-24 pb-6 md:pb-12 px-4 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-[#B43F3F]/10 mt-12 md:mt-16">
            <div className="text-left">
              <p className="text-[10px] md:text-xs font-medium text-[#FF8225] uppercase tracking-wider mb-0.5 md:mb-1">Spent</p>
              <p className="text-sm md:text-2xl font-medium text-[#173B45]">{formatPrice(stats.totalSpent)}</p>
            </div>
            <div className="text-left">
              <p className="text-[10px] md:text-xs font-medium text-[#FF8225] uppercase tracking-wider mb-0.5 md:mb-1">Since</p>
              <p className="text-sm md:text-2xl font-medium text-[#173B45]">{stats.memberSince}</p>
            </div>
            <div className="text-left">
              <p className="text-[10px] md:text-xs font-medium text-[#FF8225] uppercase tracking-wider mb-0.5 md:mb-1">Orders</p>
              <p className="text-sm md:text-2xl font-medium text-[#173B45]">{stats.totalOrders}</p>
            </div>
            <div className="text-left">
              <p className="text-[10px] md:text-xs font-medium text-[#FF8225] uppercase tracking-wider mb-0.5 md:mb-1">Points</p>
              <p className="text-sm md:text-2xl font-medium text-[#173B45]">{stats.loyaltyPoints}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12">
          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden col-span-1 overflow-hidden"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-[#B43F3F]/10 p-2 mb-4">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === tab.id
                          ? 'bg-[#B43F3F] text-white'
                          : 'text-[#173B45] hover:bg-[#F8EDED]'
                        }`}
                    >
                      <tab.icon size={16} />
                      <span className="flex-1 text-left">{tab.label}</span>
                      {activeTab === tab.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar Tabs - Desktop */}
          <aside className="hidden md:block md:col-span-1 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-medium text-sm ${activeTab === tab.id
                    ? 'bg-[#B43F3F] text-white shadow-xl translate-x-2'
                    : 'bg-white text-[#173B45] hover:bg-[#F8EDED] border border-[#B43F3F]/10'
                  }`}
              >
                <tab.icon size={18} />
                <span className="flex-1 text-left">{tab.label}</span>
                <ChevronRight size={16} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
              </button>
            ))}
          </aside>

          {/* Main Panel */}
          <main className="col-span-1 md:col-span-3 bg-white rounded-2xl md:rounded-[2.5rem] shadow-xl border border-[#B43F3F]/10 p-4 md:p-12">
            {activeTab === 'overview' && (
              <div className="space-y-6 md:space-y-12">
                <h2 className="text-2xl md:text-3xl font-display font-medium text-[#173B45]">Account Overview</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {/* Recent Order */}
                  <div className="p-4 md:p-6 bg-[#F8EDED] rounded-2xl md:rounded-3xl border border-[#B43F3F]/10">
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[#FF8225] shadow-sm">
                        <Package size={20} className="md:size-24" />
                      </div>
                      <Link to="/orders" className="text-xs font-medium text-[#FF8225] uppercase tracking-wider">
                        View All
                      </Link>
                    </div>
                    <h3 className="text-base md:text-lg font-medium mb-2">Recent Order</h3>
                    {orders.length > 0 ? (
                      <>
                        <p className="text-xs md:text-sm text-[#173B45]/70 mb-4">
                          Order #{orders[0]._id.slice(-8)} was {orders[0].orderStatus.toLowerCase()} on {formatDate(orders[0].createdAt)}
                        </p>
                        <button className="w-full py-2.5 md:py-3 bg-white text-[#173B45] rounded-xl font-medium text-xs uppercase tracking-wider border border-[#B43F3F]/20 hover:bg-[#F8EDED] transition-colors">
                          Track Shipment
                        </button>
                      </>
                    ) : (
                      <p className="text-xs md:text-sm text-[#173B45]/70 mb-4">No orders yet. Start shopping!</p>
                    )}
                  </div>

                  {/* Rewards Card */}
                  <div className="p-4 md:p-6 bg-gradient-to-br from-[#173B45] to-[#0f2a33] rounded-2xl md:rounded-3xl text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[#FF8225]/10 rounded-full blur-2xl -mr-12 -mt-12" />
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-[#FF8225]">
                        <Award size={20} className="md:size-24" />
                      </div>
                      <span className="text-[8px] md:text-[10px] font-medium uppercase tracking-wider px-2 py-1 bg-[#FF8225] text-[#173B45] rounded">
                        {stats.loyaltyPoints >= 5000 ? 'Platinum' : stats.loyaltyPoints >= 2000 ? 'Gold' : 'Silver'}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-medium mb-1">Tanvo Rewards</h3>
                    <p className="text-[10px] md:text-xs text-white/70 mb-4 md:mb-6">
                      {stats.loyaltyPoints >= 5000
                        ? 'You\'re at our highest tier!'
                        : `${5000 - stats.loyaltyPoints} pts to Platinum.`}
                    </p>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1">
                      <div
                        className="h-full bg-[#FF8225]"
                        style={{ width: `${Math.min((stats.loyaltyPoints / 5000) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-[8px] md:text-[10px] text-white/50">1 point per ₹100 spent</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-6 md:pt-8 border-t border-[#B43F3F]/10">
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-medium text-[#B43F3F]">{wishlistItems.length}</div>
                    <div className="text-[10px] md:text-xs text-[#173B45]/70">Wishlist</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-medium text-[#B43F3F]">{addresses.length}</div>
                    <div className="text-[10px] md:text-xs text-[#173B45]/70">Addresses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-medium text-[#B43F3F]">{orders.filter(o => o.orderStatus === 'Delivered').length}</div>
                    <div className="text-[10px] md:text-xs text-[#173B45]/70">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-medium text-[#B43F3F]">{orders.filter(o => o.orderStatus === 'Pending').length}</div>
                    <div className="text-[10px] md:text-xs text-[#173B45]/70">Pending</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-display font-medium text-[#173B45] mb-4 md:mb-8">Order History</h2>
                {orders.length > 0 ? (
                  orders.map(order => (
                    <div key={order._id} className="border border-[#B43F3F]/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-[#FF8225] transition-all">
                      <div
                        className="flex flex-col gap-3 md:gap-0 cursor-pointer md:cursor-default"
                        onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4">
                          <div>
                            <p className="text-xs md:text-sm text-[#173B45]/70 mb-1">Order #{order._id.slice(-8)}</p>
                            <p className="text-[10px] md:text-xs text-[#173B45]/50">Placed on {formatDate(order.createdAt)}</p>
                          </div>
                          <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-end">
                            <span className={`px-2 py-1 rounded-full text-[8px] md:text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                              {order.orderStatus}
                            </span>
                            <span className="font-medium text-[#B43F3F] text-sm md:text-base">{formatPrice(order.totalPrice)}</span>
                            <button className="md:hidden">
                              {expandedOrder === order._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          </div>
                        </div>

                        {/* Mobile Expandable Content */}
                        <AnimatePresence>
                          {(expandedOrder === order._id || window.innerWidth >= 768) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 overflow-hidden"
                            >
                              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                {order.orderItems?.slice(0, 3).map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-2 bg-[#F8EDED] p-2 rounded-lg flex-shrink-0">
                                    <img
                                      src={item.product?.images?.[0]?.url || ''}
                                      alt={item.product?.name}
                                      className="w-8 h-8 md:w-10 md:h-10 object-cover rounded"
                                    />
                                    <span className="text-[10px] md:text-xs font-medium">x{item.quantity}</span>
                                  </div>
                                ))}
                                {(order.orderItems?.length || 0) > 3 && (
                                  <span className="text-[10px] md:text-xs text-[#173B45]/50 flex-shrink-0">
                                    +{order.orderItems!.length - 3} more
                                  </span>
                                )}
                              </div>

                              <Link
                                to={`/orders/${order._id}`}
                                className="inline-block mt-3 text-xs font-medium text-[#FF8225] hover:underline"
                              >
                                View Details →
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 md:py-20">
                    <Package size={32} className="md:size-48 mx-auto text-[#B43F3F]/30 mb-4" />
                    <p className="text-[#173B45]/70 font-medium mb-4">No orders yet</p>
                    <Link to="/shop" className="btn-primary text-xs md:text-sm">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-display font-medium text-[#173B45] mb-4 md:mb-8">My Wishlist</h2>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    {wishlistItems.map(item => (
                      <Link
                        key={item._id}
                        to={`/product/${item._id}`}
                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border border-[#B43F3F]/10 rounded-xl hover:border-[#FF8225] transition-all group"
                      >
                        <img
                          src={item.images?.[0]?.url || ''}
                          alt={item.name}
                          className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm md:text-base group-hover:text-[#B43F3F] transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-sm md:text-base font-medium text-[#FF8225] mt-1">{formatPrice(item.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 md:py-20">
                    <Heart size={32} className="md:size-48 mx-auto text-[#B43F3F]/30 mb-4" />
                    <p className="text-[#173B45]/70 font-medium mb-4">Your wishlist is empty</p>
                    <Link to="/shop" className="btn-primary text-xs md:text-sm">
                      Explore Products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-display font-medium text-[#173B45]">Addresses</h2>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#B43F3F] text-white rounded-xl text-xs font-medium hover:bg-[#FF8225] transition-colors w-full md:w-auto justify-center"
                  >
                    <Plus size={16} /> Add New
                  </button>
                </div>

                <AnimatePresence>
                  {showAddressForm && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="border border-[#B43F3F]/10 rounded-xl md:rounded-2xl p-4 md:p-6 space-y-4"
                    >
                      <h3 className="font-medium text-base md:text-lg mb-4">Add New Address</h3>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                        <select
                          value={newAddress.type}
                          onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as any })}
                          className="p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                        >
                          <option value="home">Home</option>
                          <option value="work">Work</option>
                          <option value="other">Other</option>
                        </select>

                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          className="p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                        />

                        <input
                          type="text"
                          placeholder="Address Line 1"
                          value={newAddress.addressLine1}
                          onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                          className="md:col-span-2 p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                        />

                        <input
                          type="text"
                          placeholder="Address Line 2 (Optional)"
                          value={newAddress.addressLine2}
                          onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                          className="md:col-span-2 p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                        />

                        <input
                          type="text"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                        />

                        <select
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                        >
                          <option value="Odisha">Odisha</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Telangana">Telangana</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Other">Other</option>
                        </select>

                        <input
                          type="text"
                          placeholder="Pincode"
                          value={newAddress.pincode}
                          onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                          className="p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                          maxLength={6}
                        />

                        <label className="flex items-center gap-2 col-span-2">
                          <input
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                            className="rounded border-[#B43F3F]/20 text-[#FF8225] focus:ring-[#FF8225]"
                          />
                          <span className="text-xs md:text-sm">Set as default address</span>
                        </label>
                      </div>

                      <div className="flex flex-col md:flex-row gap-3 pt-4">
                        <button
                          onClick={handleAddAddress}
                          disabled={loading}
                          className="px-6 py-3 bg-[#B43F3F] text-white font-medium rounded-xl hover:bg-[#FF8225] transition-all disabled:opacity-50 text-sm"
                        >
                          {loading ? 'Saving...' : 'Save Address'}
                        </button>
                        <button
                          onClick={() => setShowAddressForm(false)}
                          className="px-6 py-3 border border-[#B43F3F]/10 text-[#173B45] font-medium rounded-xl hover:bg-[#F8EDED] transition-all text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-3 md:space-y-4">
                  {addresses.map(addr => (
                    <motion.div
                      key={addr._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 md:p-6 border border-[#B43F3F]/10 rounded-xl md:rounded-2xl hover:border-[#FF8225] transition-all group"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                        <div className="flex-1 w-full md:w-auto">
                          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                            <span className="text-xs md:text-sm font-medium text-[#173B45] uppercase tracking-wider bg-[#F8EDED] px-2 py-0.5 rounded">
                              {addr.type}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[8px] md:text-[10px] font-medium bg-[#FF8225] px-2 py-0.5 rounded text-white">
                                DEFAULT
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-[#173B45]/80 break-words">{addr.addressLine1}</p>
                          {addr.addressLine2 && <p className="text-xs md:text-sm text-[#173B45]/80 break-words">{addr.addressLine2}</p>}
                          <p className="text-xs md:text-sm text-[#173B45]/80">{addr.city}, {addr.state} - {addr.pincode}</p>
                          <p className="text-xs md:text-sm text-[#173B45]/60 mt-2">Phone: {addr.phone}</p>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-start ml-auto">
                          {!addr.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(addr._id)}
                              className="p-2 text-[#173B45]/40 hover:text-[#FF8225] transition-colors"
                              title="Set as default"
                            >
                              <Shield size={14} className="md:size-16" />
                            </button>
                          )}
                          <button
                            onClick={() => setEditingAddress(addr)}
                            className="p-2 text-[#173B45]/40 group-hover:text-[#B43F3F] transition-colors"
                          >
                            <Edit2 size={14} className="md:size-16" />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(addr._id)}
                            className="p-2 text-[#173B45]/40 group-hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={14} className="md:size-16" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {addresses.length === 0 && !showAddressForm && (
                    <div className="text-center py-8 md:py-12 bg-[#F8EDED] rounded-xl md:rounded-2xl">
                      <MapPin size={32} className="md:size-48 mx-auto text-[#B43F3F]/30 mb-4" />
                      <p className="text-[#173B45]/70">No addresses saved yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 md:space-y-8">
                <h2 className="text-2xl md:text-3xl font-display font-medium text-[#173B45] mb-4 md:mb-8">Account Settings</h2>

                <div className="space-y-4 md:space-y-6">
                  {/* Personal Information */}
                  <div className="border border-[#B43F3F]/10 rounded-xl md:rounded-2xl p-4 md:p-6">
                    <h3 className="font-medium text-base md:text-lg mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                      <div>
                        <label className="text-[10px] md:text-xs text-[#173B45]/60 block mb-1">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user?.name}
                          className="w-full p-2.5 md:p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] md:text-xs text-[#173B45]/60 block mb-1">Email Address</label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="w-full p-2.5 md:p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                          readOnly
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[10px] md:text-xs text-[#173B45]/60 block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue={user?.phone}
                          className="w-full p-2.5 md:p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                        />
                      </div>
                    </div>
                    <button className="mt-4 px-4 md:px-6 py-2.5 bg-[#B43F3F] text-white rounded-xl text-xs font-medium hover:bg-[#FF8225] transition-colors">
                      Update Information
                    </button>
                  </div>

                  {/* Preferences */}
                  <div className="border border-[#B43F3F]/10 rounded-xl md:rounded-2xl p-4 md:p-6">
                    <h3 className="font-medium text-base md:text-lg mb-4">Preferences</h3>
                    <div className="space-y-3 md:space-y-4">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-xs md:text-sm">Email Notifications</span>
                        <input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 rounded border-[#B43F3F]/20 text-[#FF8225] focus:ring-[#FF8225]" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-xs md:text-sm">SMS Updates for Orders</span>
                        <input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 rounded border-[#B43F3F]/20 text-[#FF8225] focus:ring-[#FF8225]" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-xs md:text-sm">Marketing Communications</span>
                        <input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 rounded border-[#B43F3F]/20 text-[#FF8225] focus:ring-[#FF8225]" />
                      </label>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="border border-[#B43F3F]/10 rounded-xl md:rounded-2xl p-4 md:p-6">
                    <h3 className="font-medium text-base md:text-lg mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full p-2.5 md:p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full p-2.5 md:p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full p-2.5 md:p-3 border border-[#B43F3F]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF8225]"
                      />
                    </div>
                    <button className="mt-4 px-4 md:px-6 py-2.5 bg-[#B43F3F] text-white rounded-xl text-xs font-medium hover:bg-[#FF8225] transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;