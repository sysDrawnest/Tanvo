import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Calendar, Package, Heart,
  LogOut, Settings, Edit2, Camera, Award, Shield, Plus, Trash2, Menu, X, Check, ChevronRight
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
      Pending: 'text-[#C9A84C] bg-[#C9A84C]/5 border border-[#C9A84C]/25',
      Processing: 'text-[#B43F3F] bg-[#B43F3F]/5 border border-[#B43F3F]/25',
      Shipped: 'text-[#173B45] bg-[#173B45]/5 border border-[#173B45]/25',
      Delivered: 'text-green-800 bg-green-50 border border-green-200',
      Cancelled: 'text-red-800 bg-red-50 border border-red-200'
    };
    return colors[status] || 'text-[#173B45] bg-gray-50 border border-gray-200';
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

  const getDeliveredSarees = () => {
    const items: Array<{ name: string; images: Array<{ url: string }> }> = [];
    const seenNames = new Set<string>();

    orders
      .filter(order => order.orderStatus === 'Delivered')
      .forEach(order => {
        order.orderItems?.forEach(item => {
          if (item.product && !seenNames.has(item.product.name)) {
            seenNames.add(item.product.name);
            items.push({
              name: item.product.name,
              images: item.product.images
            });
          }
        });
      });
    return items;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: `My Orders (${stats.totalOrders})`, icon: Package },
    { id: 'sarees', label: 'My Saree Collection', icon: Award },
    { id: 'wishlist', label: `Saved Items (${wishlistItems.length})`, icon: Heart },
    { id: 'addresses', label: `Addresses (${addresses.length})`, icon: MapPin },
    { id: 'settings', label: 'Account Settings', icon: Settings }
  ];

  if (!isAuthenticated) {
    return null;
  }

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-[#F8EDED] pt-32 pb-24 flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-[#B43F3F] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#C9A84C] rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8EDED] pt-20 md:pt-32 pb-16 md:pb-24 text-[#173B45]">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Mobile Sub-Header */}
        <div className="md:hidden flex items-center justify-between mb-8">
          <h1 className="text-xl font-display font-light text-[#173B45]" style={{ fontFamily: "'Playfair Display', serif" }}>
            My Account
          </h1>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-[#173B45]/20 bg-white rounded-none text-xs font-semibold tracking-wider uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Menu size={14} /> Menu
          </button>
        </div>

        {/* Elegant Profile Header - Luxury Redesign */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-none border border-[#173B45]/10 overflow-hidden mb-12 p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F8EDED] border border-[#173B45]/10 flex items-center justify-center overflow-hidden relative group flex-shrink-0">
              {profileImage ? (
                <img src={profileImage} alt={user?.name} className="w-full h-full object-cover" />
              ) : (
                <User size={24} className="text-[#173B45]/30" />
              )}
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera size={14} className="text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  disabled={loading}
                />
              </label>
            </div>
            
            <div>
              <span className="text-[10px] tracking-[0.2em] font-semibold text-[#C9A84C] uppercase block mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                {stats.loyaltyPoints >= 5000 ? 'Platinum Member' : stats.loyaltyPoints >= 2000 ? 'Gold Member' : 'Silver Member'}
              </span>
              <h1 className="text-xl md:text-2xl font-light text-[#173B45] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Welcome Back, {user?.name || 'Priya'}
              </h1>
              <p className="text-xs text-[#173B45]/60 mt-1 italic" style={{ fontFamily: "'Raleway', sans-serif" }}>
                "Your saree journey continues. Thank you for being part of TANVO."
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center w-full md:w-auto">
            <button
              onClick={() => setActiveTab('settings')}
              className="w-full md:w-auto px-6 py-2.5 border border-[#173B45]/20 text-[#173B45] hover:border-[#173B45] transition-colors text-[10px] md:text-xs tracking-wider uppercase font-semibold text-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 items-start">
          
          {/* Sidebar Tabs - Desktop */}
          <aside className="hidden md:block md:col-span-1 space-y-1">
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#173B45]/40 uppercase mb-4 pl-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              My Account
            </div>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 transition-all font-medium text-sm border-l-2 ${activeTab === tab.id
                    ? 'border-[#B43F3F] text-[#B43F3F] font-semibold bg-white'
                    : 'border-transparent text-[#173B45]/70 hover:text-[#173B45] hover:border-[#173B45]/20'
                  }`}
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                <tab.icon size={16} className={activeTab === tab.id ? 'text-[#B43F3F]' : 'text-[#173B45]/40'} />
                <span className="flex-1 text-left">{tab.label}</span>
              </button>
            ))}
            <div className="pt-6 border-t border-[#173B45]/10 mt-6">
              <button
                onClick={logout}
                className="w-full flex items-center gap-4 px-4 py-3 text-[#173B45]/60 hover:text-red-700 transition-colors font-medium text-sm"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                <LogOut size={16} className="text-[#173B45]/40" />
                <span className="flex-1 text-left">Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Panel Content Area */}
          <main className="col-span-1 md:col-span-3 bg-white border border-[#173B45]/10 p-4 sm:p-6 md:p-10">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-10">
                <h2 className="text-xl md:text-2xl font-light text-[#173B45] border-b border-[#173B45]/10 pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Account Overview
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Order */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline border-b border-[#173B45]/10 pb-2">
                      <h3 className="text-sm font-semibold tracking-wider text-[#173B45]/60 uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Recent Order
                      </h3>
                      <button onClick={() => setActiveTab('orders')} className="text-[10px] tracking-wider text-[#B43F3F] font-semibold uppercase hover:underline">
                        View All
                      </button>
                    </div>

                    {orders.length > 0 ? (
                      <div className="border border-[#173B45]/10 p-4 bg-white flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <div className="w-16 h-20 bg-[#F8EDED] overflow-hidden flex-shrink-0 border border-[#173B45]/10">
                            <img
                              src={orders[0].orderItems?.[0]?.product?.images?.[0]?.url || 'https://picsum.photos/id/1011/300/400'}
                              alt={orders[0].orderItems?.[0]?.product?.name || 'Saree'}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[10px] text-[#173B45]/50 tracking-wider">ORDER #{orders[0]._id.slice(-8)}</p>
                            <h4 className="font-semibold text-sm text-[#173B45] mt-0.5 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                              {orders[0].orderItems?.[0]?.product?.name || 'Sambalpuri Saree'}
                            </h4>
                            <p className="text-[10px] text-[#173B45]/60 mt-0.5">Placed on {formatDate(orders[0].createdAt)}</p>
                            <span className="inline-block mt-2 text-[8px] font-bold tracking-wider text-[#C9A84C] uppercase bg-[#C9A84C]/5 px-2 py-0.5 border border-[#C9A84C]/20">
                              {orders[0].orderStatus}
                            </span>
                          </div>
                        </div>
                        <div className="flex sm:flex-col gap-2 items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                          <span className="text-sm font-light text-[#B43F3F]">{formatPrice(orders[0].totalPrice)}</span>
                          <Link
                            to={`/orders/${orders[0]._id}`}
                            className="px-4 py-1.5 border border-[#B43F3F] text-[#B43F3F] hover:bg-[#B43F3F] hover:text-white text-center text-[10px] tracking-wider uppercase font-semibold transition-all"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10 border border-dashed border-[#173B45]/20 bg-[#F8EDED]/20">
                        <p className="text-xs text-[#173B45]/50 italic mb-3">No orders placed yet.</p>
                        <Link to="/shop" className="inline-block border border-[#C9A84C] text-[#173B45] px-4 py-2 text-[10px] tracking-wider uppercase font-semibold hover:bg-[#C9A84C] hover:text-white transition-all">
                          Start Exploring
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Journey milestones */}
                  <div className="space-y-4">
                    <div className="border-b border-[#173B45]/10 pb-2">
                      <h3 className="text-sm font-semibold tracking-wider text-[#173B45]/60 uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Your TANVO Journey
                      </h3>
                    </div>

                    <div className="relative border-l border-[#173B45]/15 ml-3 pl-6 space-y-4 py-1">
                      <div className="relative">
                        <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-[#B43F3F] border border-white flex items-center justify-center">
                          <Check size={8} className="text-white" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-[#173B45]">First Purchase</h4>
                          <p className="text-[10px] text-[#173B45]/60">Your handloom story began here.</p>
                        </div>
                      </div>

                      <div className="relative">
                        <div className={`absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full border border-white flex items-center justify-center ${stats.totalOrders >= 3 ? 'bg-[#B43F3F]' : 'bg-gray-200'}`}>
                          {stats.totalOrders >= 3 && <Check size={8} className="text-white" />}
                        </div>
                        <div>
                          <h4 className={`text-xs font-semibold ${stats.totalOrders >= 3 ? 'text-[#173B45]' : 'text-[#173B45]/40'}`}>Handloom Collector</h4>
                          <p className="text-[10px] text-[#173B45]/60">Collected 3+ pieces of traditional weaving heritage.</p>
                        </div>
                      </div>

                      <div className="relative">
                        <div className={`absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full border border-white flex items-center justify-center ${stats.totalOrders >= 5 ? 'bg-[#B43F3F]' : 'bg-gray-200'}`}>
                          {stats.totalOrders >= 5 && <Check size={8} className="text-white" />}
                        </div>
                        <div>
                          <h4 className={`text-xs font-semibold ${stats.totalOrders >= 5 ? 'text-[#173B45]' : 'text-[#173B45]/40'}`}>Collector Edition Member</h4>
                          <p className="text-[10px] text-[#173B45]/60">Milestone reached at 5 collected sarees.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick typographics stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#173B45]/10">
                  <div>
                    <p className="text-[9px] tracking-widest text-[#173B45]/50 uppercase font-semibold">Total Collection Value</p>
                    <p className="text-lg font-light text-[#173B45] mt-1">{formatPrice(stats.totalSpent)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-widest text-[#173B45]/50 uppercase font-semibold">Member Since</p>
                    <p className="text-lg font-light text-[#173B45] mt-1">{stats.memberSince}</p>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-widest text-[#173B45]/50 uppercase font-semibold">Sarees Ordered</p>
                    <p className="text-lg font-light text-[#173B45] mt-1">{stats.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-widest text-[#173B45]/50 uppercase font-semibold">Loyalty Points</p>
                    <p className="text-lg font-light text-[#173B45] mt-1">{stats.loyaltyPoints}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-light text-[#173B45] border-b border-[#173B45]/10 pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  My Orders
                </h2>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order._id} className="border border-[#173B45]/10 p-4 sm:p-5 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex gap-4 items-center">
                          <div className="w-14 h-18 bg-[#F8EDED] overflow-hidden flex-shrink-0 border border-[#173B45]/10">
                            <img
                              src={order.orderItems?.[0]?.product?.images?.[0]?.url || 'https://picsum.photos/id/1011/300/400'}
                              alt={order.orderItems?.[0]?.product?.name || 'Saree'}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[10px] text-[#173B45]/50 tracking-wider">ORDER #{order._id.slice(-8)}</p>
                            <h4 className="font-semibold text-sm text-[#173B45] mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                              {order.orderItems?.[0]?.product?.name || 'Sambalpuri Ikat Saree'}
                            </h4>
                            <p className="text-[10px] text-[#173B45]/60 mt-0.5">Placed on {formatDate(order.createdAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
                          <span className={`px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                          <span className="font-semibold text-[#173B45] text-sm">{formatPrice(order.totalPrice)}</span>
                          <Link
                            to={`/orders/${order._id}`}
                            className="px-4 py-2 border border-[#173B45] text-[#173B45] hover:bg-[#173B45] hover:text-white text-[10px] tracking-wider uppercase font-semibold transition-all"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 border border-dashed border-[#173B45]/20 bg-[#F8EDED]/20">
                    <Package size={36} className="mx-auto text-[#B43F3F]/30 mb-3" />
                    <p className="text-xs text-[#173B45]/50 italic mb-4">You haven't placed any orders yet.</p>
                    <Link to="/shop" className="inline-block border border-[#C9A84C] text-[#173B45] px-6 py-2.5 text-xs tracking-wider uppercase font-semibold hover:bg-[#C9A84C] hover:text-white transition-all">
                      Explore Traditional Sarees
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* MY SAREE COLLECTION TAB */}
            {activeTab === 'sarees' && (
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-light text-[#173B45] border-b border-[#173B45]/10 pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  My Saree Collection
                </h2>
                {getDeliveredSarees().length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {getDeliveredSarees().map((saree, idx) => (
                      <div key={idx} className="group flex flex-col gap-3">
                        <div className="aspect-[3/4] bg-[#F8EDED] overflow-hidden border border-[#173B45]/10 relative">
                          <img
                            src={saree.images?.[0]?.url || 'https://picsum.photos/id/1011/300/400'}
                            alt={saree.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-2 left-2 bg-[#C9A84C] text-white text-[8px] px-2 py-0.5 tracking-wider uppercase font-semibold">
                            Collected
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-[#173B45] mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {saree.name}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 border border-dashed border-[#173B45]/20 bg-[#F8EDED]/20">
                    <Award size={36} className="mx-auto text-[#B43F3F]/30 mb-3" />
                    <p className="text-xs text-[#173B45]/50 italic mb-4">No collected sarees yet.</p>
                    <p className="text-[11px] text-[#173B45]/40 mb-6">
                      Sarees from your delivered orders will automatically showcase in your personal boutique closet.
                    </p>
                    <Link to="/shop" className="inline-block border border-[#C9A84C] text-[#173B45] px-6 py-2.5 text-xs tracking-wider uppercase font-semibold hover:bg-[#C9A84C] hover:text-white transition-all">
                      Start Your Journey
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* SAVED ITEMS (WISHLIST) TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-light text-[#173B45] border-b border-[#173B45]/10 pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Saved Items
                </h2>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {wishlistItems.map(item => (
                      <Link
                        key={item._id}
                        to={`/product/${item._id}`}
                        className="group flex flex-col gap-3"
                      >
                        <div className="aspect-[3/4] bg-[#F8EDED] overflow-hidden border border-[#173B45]/10 relative">
                          <img
                            src={item.images?.[0]?.url || 'https://picsum.photos/id/1011/300/400'}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-[#173B45] group-hover:text-[#B43F3F] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {item.name}
                          </h4>
                          <p className="text-xs font-semibold text-[#B43F3F] mt-0.5">{formatPrice(item.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 border border-dashed border-[#173B45]/20 bg-[#F8EDED]/20">
                    <Heart size={36} className="mx-auto text-[#B43F3F]/30 mb-3" />
                    <h3 className="text-base text-[#173B45] mb-2 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Your Saree Collection is waiting
                    </h3>
                    <p className="text-xs text-[#173B45]/50 italic mb-6">
                      Save pieces you love to build your personal closet.
                    </p>
                    <Link to="/shop" className="inline-block border border-[#C9A84C] text-[#173B45] px-6 py-2.5 text-xs tracking-wider uppercase font-semibold hover:bg-[#C9A84C] hover:text-white transition-all">
                      Explore Sarees
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-[#173B45]/10 pb-4">
                  <h2 className="text-xl md:text-2xl font-light text-[#173B45]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Delivery Addresses
                  </h2>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#B43F3F] text-[#B43F3F] hover:bg-[#B43F3F] hover:text-white text-xs font-semibold tracking-wider uppercase transition-all"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <Plus size={14} /> Add New
                  </button>
                </div>

                <AnimatePresence>
                  {showAddressForm && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border border-[#173B45]/10 p-5 space-y-4 bg-[#F8EDED]/25"
                    >
                      <h3 className="text-sm font-semibold tracking-wider text-[#173B45]/60 uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                        New Address Details
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <select
                          value={newAddress.type}
                          onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as any })}
                          className="p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
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
                          className="p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
                        />

                        <input
                          type="text"
                          placeholder="Address Line 1"
                          value={newAddress.addressLine1}
                          onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                          className="md:col-span-2 p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
                        />

                        <input
                          type="text"
                          placeholder="Address Line 2 (Optional)"
                          value={newAddress.addressLine2}
                          onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                          className="md:col-span-2 p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
                        />

                        <input
                          type="text"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
                        />

                        <select
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
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
                          className="p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
                          maxLength={6}
                        />

                        <label className="flex items-center gap-2 col-span-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                            className="rounded text-[#B43F3F] border-[#173B45]/15 focus:ring-[#B43F3F]"
                          />
                          <span className="text-xs text-[#173B45]/70">Set as default address</span>
                        </label>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={handleAddAddress}
                          disabled={loading}
                          className="px-6 py-2.5 bg-[#B43F3F] text-white hover:bg-[#780000] text-xs font-semibold tracking-wider uppercase transition-colors"
                        >
                          {loading ? 'Saving...' : 'Save Address'}
                        </button>
                        <button
                          onClick={() => setShowAddressForm(false)}
                          className="px-6 py-2.5 border border-[#173B45]/20 text-[#173B45] hover:bg-white text-xs font-semibold tracking-wider uppercase transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  {addresses.map(addr => (
                    <div
                      key={addr._id}
                      className="p-4 sm:p-5 border border-[#173B45]/10 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] tracking-wider bg-[#F8EDED] px-2.5 py-0.5 font-bold text-[#173B45] uppercase">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[8px] tracking-wider bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] px-2 py-0.5 font-bold uppercase">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#173B45]">{addr.addressLine1}</p>
                        {addr.addressLine2 && <p className="text-sm text-[#173B45]">{addr.addressLine2}</p>}
                        <p className="text-sm text-[#173B45]">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-xs text-[#173B45]/60 mt-2">Phone: {addr.phone}</p>
                      </div>

                      <div className="flex items-center gap-1 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-end">
                        {!addr.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(addr._id)}
                            className="p-2 text-[#173B45]/40 hover:text-[#C9A84C] transition-colors"
                            title="Set as default"
                          >
                            <Shield size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => setEditingAddress(addr)}
                          className="p-2 text-[#173B45]/40 hover:text-[#B43F3F] transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr._id)}
                          className="p-2 text-[#173B45]/40 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {addresses.length === 0 && !showAddressForm && (
                    <div className="text-center py-16 border border-dashed border-[#173B45]/20 bg-[#F8EDED]/20">
                      <MapPin size={36} className="mx-auto text-[#B43F3F]/30 mb-3" />
                      <p className="text-xs text-[#173B45]/50 italic">No addresses saved yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ACCOUNT SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-12">
                <h2 className="text-xl md:text-2xl font-light text-[#173B45] border-b border-[#173B45]/10 pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Account Settings
                </h2>

                <div className="space-y-10">
                  {/* Profile Information */}
                  <div className="space-y-4">
                    <h3 className="text-xs tracking-wider uppercase font-semibold text-[#173B45]/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Profile Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs text-[#173B45]/60 block mb-1">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user?.name}
                          className="w-full p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#173B45]/60 block mb-1">Email Address</label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="w-full p-3 border border-[#173B45]/15 bg-gray-50 text-[#173B45]/60 text-sm cursor-not-allowed"
                          readOnly
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs text-[#173B45]/60 block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue={user?.phone}
                          className="w-full p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
                        />
                      </div>
                    </div>
                    <button className="px-6 py-2.5 bg-[#B43F3F] text-white hover:bg-[#780000] text-xs tracking-wider uppercase transition-colors font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Update Profile
                    </button>
                  </div>

                  {/* Communication Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-xs tracking-wider uppercase font-semibold text-[#173B45]/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Communication Preferences
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-[#B43F3F] border-[#173B45]/15 focus:ring-[#B43F3F]" defaultChecked />
                        <span className="text-xs text-[#173B45]/80">Order updates (SMS & Email)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-[#B43F3F] border-[#173B45]/15 focus:ring-[#B43F3F]" defaultChecked />
                        <span className="text-xs text-[#173B45]/80">New collection updates</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-[#B43F3F] border-[#173B45]/15 focus:ring-[#B43F3F]" />
                        <span className="text-xs text-[#173B45]/80">Exclusive offers and promotions</span>
                      </label>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="space-y-4">
                    <h3 className="text-xs tracking-wider uppercase font-semibold text-[#173B45]/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Security
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="p-3 border border-[#173B45]/15 focus:outline-none focus:border-[#B43F3F] text-sm bg-transparent"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <button className="px-6 py-2.5 bg-[#B43F3F] text-white hover:bg-[#780000] text-xs tracking-wider uppercase transition-colors font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Change Password
                      </button>
                      <div className="text-[10px] text-[#173B45]/50 font-medium">
                        Last login activity: {formatDate(new Date().toString())}
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="border-t border-[#173B45]/10 pt-8 space-y-4">
                    <h3 className="text-xs tracking-wider uppercase font-semibold text-[#B43F3F]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Danger Zone
                    </h3>
                    <p className="text-xs text-[#173B45]/60 italic">
                      For account deletion requests, please contact customer support directly.
                    </p>
                    <button
                      onClick={logout}
                      className="px-6 py-2.5 border border-[#B43F3F] text-[#B43F3F] hover:bg-[#B43F3F] hover:text-white transition-all text-xs tracking-wider uppercase font-semibold"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Logout Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Elegant Mobile Bottom Sheet Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#0D0B0A] z-40 md:hidden animate-fade-in"
            />
            
            {/* Drawer Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-[#F8EDED] z-50 rounded-t-[1.5rem] border-t border-[#173B45]/15 max-h-[80vh] overflow-y-auto pb-8 md:hidden px-6 pt-4"
            >
              <div className="w-12 h-1 bg-[#173B45]/15 rounded-full mx-auto mb-6" />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-light text-[#173B45]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Account Menu
                </h3>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                  <X size={18} className="text-[#173B45]/70" />
                </button>
              </div>
              
              <div className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 py-4 border-b border-[#173B45]/5 text-left font-medium text-sm transition-all ${
                      activeTab === tab.id
                        ? 'text-[#B43F3F] font-semibold'
                        : 'text-[#173B45]/80'
                    }`}
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    <tab.icon size={16} className={activeTab === tab.id ? 'text-[#B43F3F]' : 'text-[#173B45]/40'} />
                    <span className="flex-1">{tab.label}</span>
                    {activeTab === tab.id && <Check size={14} className="text-[#B43F3F]" />}
                  </button>
                ))}
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-4 py-4 text-left font-medium text-sm text-[#173B45]/60 hover:text-red-700 transition-colors"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  <LogOut size={16} className="text-[#173B45]/40" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;