import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Calendar, Package, Heart, 
  LogOut, Settings, Edit2, Camera, Award, Star, MessageSquare, 
  Briefcase, Shield, Bell, Moon, HelpCircle, ChevronRight, Gift,
  Plus, Trash2
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
      Pending: 'bg-yellow-100 text-yellow-800',
      Processing: 'bg-blue-100 text-blue-800',
      Shipped: 'bg-purple-100 text-purple-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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
      <div className="min-h-screen bg-gray-50 pt-32 pb-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="container-custom">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-8"
        >
          <div className="h-48 bg-gradient-to-r from-[#C40C0C] via-[#FF6500] to-[#F6CE71] relative">
            <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6">
              <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-2xl relative group">
                <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt={user?.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-gray-300" />
                  )}
                </div>
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center cursor-pointer">
                  <Camera size={20} className="text-white" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    disabled={loading}
                  />
                </label>
              </div>
              <div className="mb-4 space-y-1">
                <h1 className="text-3xl font-serif font-bold text-gray-900">{user?.name || 'User'}</h1>
                <p className="text-sm font-bold text-[#FF6500] uppercase tracking-widest flex items-center gap-2">
                  <Award size={16} /> {stats.loyaltyPoints >= 5000 ? 'Platinum' : stats.loyaltyPoints >= 2000 ? 'Gold' : 'Silver'} Member
                </p>
              </div>
            </div>
            <div className="absolute bottom-4 right-8 md:right-12 flex gap-3">
              <button 
                onClick={() => setActiveTab('settings')}
                className="px-5 py-2.5 bg-white text-gray-900 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-gray-50 transition-colors"
              >
                Edit Profile
              </button>
              <button 
                onClick={logout} 
                className="px-5 py-2.5 bg-[#C40C0C] text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="pt-24 pb-12 px-8 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 mt-16">
            <div className="text-center md:text-left">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalSpent)}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Member Since</p>
              <p className="text-2xl font-bold text-gray-900">{stats.memberSince}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Reward Points</p>
              <p className="text-2xl font-bold text-gray-900">{stats.loyaltyPoints}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Tabs */}
          <aside className="lg:col-span-1 space-y-2">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${
                  activeTab === tab.id 
                    ? 'bg-[#C40C0C] text-white shadow-xl translate-x-2' 
                    : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-100'
                }`}
              >
                <tab.icon size={18} /> 
                <span className="flex-1 text-left">{tab.label}</span>
                <ChevronRight size={16} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
              </button>
            ))}
          </aside>

          {/* Main Panel */}
          <main className="lg:col-span-3 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
            {activeTab === 'overview' && (
              <div className="space-y-12">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Account Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Recent Order */}
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#FF6500] shadow-sm">
                        <Package size={24} />
                      </div>
                      <Link to="/orders" className="text-xs font-black text-[#C40C0C] uppercase tracking-widest">
                        View All
                      </Link>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Recent Order</h3>
                    {orders.length > 0 ? (
                      <>
                        <p className="text-sm text-gray-500 mb-4">
                          Order #{orders[0]._id.slice(-8)} was {orders[0].orderStatus.toLowerCase()} on {formatDate(orders[0].createdAt)}
                        </p>
                        <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-xs uppercase tracking-widest border border-gray-200 hover:bg-gray-100 transition-colors">
                          Track Shipment
                        </button>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500 mb-4">No orders yet. Start shopping!</p>
                    )}
                  </div>

                  {/* Rewards Card */}
                  <div className="p-6 bg-gradient-to-br from-[#111] to-[#333] rounded-3xl text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F6CE71]/10 rounded-full blur-2xl -mr-16 -mt-16" />
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#F6CE71]">
                        <Award size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-[#F6CE71] text-[#111] rounded">
                        {stats.loyaltyPoints >= 5000 ? 'Platinum' : stats.loyaltyPoints >= 2000 ? 'Gold' : 'Silver'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">Syssaree Rewards</h3>
                    <p className="text-xs text-gray-400 mb-6">
                      {stats.loyaltyPoints >= 5000 
                        ? 'You\'re at our highest tier! Enjoy exclusive benefits.'
                        : `${5000 - stats.loyaltyPoints} points away from Platinum.`}
                    </p>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-[#F6CE71]" 
                        style={{ width: `${Math.min((stats.loyaltyPoints / 5000) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400">Earn 1 point for every ₹100 spent</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{wishlistItems.length}</div>
                    <div className="text-xs text-gray-500">Items in Wishlist</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{addresses.length}</div>
                    <div className="text-xs text-gray-500">Saved Addresses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{orders.filter(o => o.orderStatus === 'Delivered').length}</div>
                    <div className="text-xs text-gray-500">Completed Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{orders.filter(o => o.orderStatus === 'Pending').length}</div>
                    <div className="text-xs text-gray-500">Pending Orders</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Order History</h2>
                {orders.length > 0 ? (
                  orders.map(order => (
                    <div key={order._id} className="border border-gray-200 rounded-2xl p-6 hover:border-[#FF6500] transition-all">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Order #{order._id.slice(-8)}</p>
                          <p className="text-xs text-gray-400">Placed on {formatDate(order.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                          <span className="font-bold text-[#C40C0C]">{formatPrice(order.totalPrice)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 overflow-x-auto pb-2">
                        {order.orderItems?.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                            <img 
                              src={item.product?.images?.[0]?.url || ''} 
                              alt={item.product?.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span className="text-xs font-medium">x{item.quantity}</span>
                          </div>
                        ))}
                        {(order.orderItems?.length || 0) > 3 && (
                          <span className="text-xs text-gray-500">+{order.orderItems!.length - 3} more</span>
                        )}
                      </div>
                      
                      <Link 
                        to={`/orders/${order._id}`}
                        className="inline-block mt-4 text-xs font-bold text-[#C40C0C] hover:underline"
                      >
                        View Details →
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium mb-4">No orders yet</p>
                    <Link to="/shop" className="btn-primary">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">My Wishlist</h2>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlistItems.map(item => (
                      <Link 
                        key={item._id}
                        to={`/product/${item._id}`}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-[#FF6500] transition-all group"
                      >
                        <img 
                          src={item.images?.[0]?.url || ''} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-sm group-hover:text-[#C40C0C] transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-sm font-bold text-[#C40C0C] mt-1">{formatPrice(item.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium mb-4">Your wishlist is empty</p>
                    <Link to="/shop" className="btn-primary">
                      Explore Products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-serif font-bold text-gray-900">Addresses</h2>
                  <button 
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#C40C0C] text-white rounded-xl text-xs font-bold hover:bg-[#FF6500] transition-colors"
                  >
                    <Plus size={16} /> Add New
                  </button>
                </div>

                {showAddressForm ? (
                  <div className="border border-gray-200 rounded-2xl p-6 space-y-4">
                    <h3 className="font-bold text-lg mb-4">Add New Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        value={newAddress.type}
                        onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as any })}
                        className="p-3 border border-gray-200 rounded-xl"
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
                        className="p-3 border border-gray-200 rounded-xl"
                      />
                      
                      <input
                        type="text"
                        placeholder="Address Line 1"
                        value={newAddress.addressLine1}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                        className="md:col-span-2 p-3 border border-gray-200 rounded-xl"
                      />
                      
                      <input
                        type="text"
                        placeholder="Address Line 2 (Optional)"
                        value={newAddress.addressLine2}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                        className="md:col-span-2 p-3 border border-gray-200 rounded-xl"
                      />
                      
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="p-3 border border-gray-200 rounded-xl"
                      />
                      
                      <select
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="p-3 border border-gray-200 rounded-xl"
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
                        className="p-3 border border-gray-200 rounded-xl"
                        maxLength={6}
                      />
                      
                      <label className="flex items-center gap-2 col-span-2">
                        <input
                          type="checkbox"
                          checked={newAddress.isDefault}
                          onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        />
                        <span className="text-sm">Set as default address</span>
                      </label>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleAddAddress}
                        disabled={loading}
                        className="px-6 py-3 bg-[#C40C0C] text-white font-bold rounded-xl hover:bg-[#FF6500] transition-all disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : 'Save Address'}
                      </button>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map(addr => (
                      <div key={addr._id} className="p-6 border border-gray-200 rounded-2xl flex justify-between items-start hover:border-[#FF6500] transition-all group">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-black text-gray-900 uppercase tracking-widest">{addr.type}</span>
                            {addr.isDefault && (
                              <span className="text-[10px] font-bold bg-[#F6CE71] px-2 py-0.5 rounded text-[#CC561E]">
                                DEFAULT
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{addr.addressLine1}</p>
                          {addr.addressLine2 && <p className="text-sm text-gray-600">{addr.addressLine2}</p>}
                          <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                          <p className="text-sm text-gray-500 mt-2">Phone: {addr.phone}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          {!addr.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(addr._id)}
                              className="p-2 text-gray-400 hover:text-[#C40C0C] transition-colors"
                              title="Set as default"
                            >
                              <Shield size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => setEditingAddress(addr)}
                            className="p-2 text-gray-400 group-hover:text-[#C40C0C] transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(addr._id)}
                            className="p-2 text-gray-400 group-hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {addresses.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">No addresses saved yet</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Account Settings</h2>
                
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Full Name</label>
                        <input 
                          type="text" 
                          defaultValue={user?.name}
                          className="w-full p-3 border border-gray-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Email Address</label>
                        <input 
                          type="email" 
                          defaultValue={user?.email}
                          className="w-full p-3 border border-gray-200 rounded-xl"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          defaultValue={user?.phone}
                          className="w-full p-3 border border-gray-200 rounded-xl"
                        />
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-2 bg-[#C40C0C] text-white rounded-xl text-xs font-bold hover:bg-[#FF6500] transition-colors">
                      Update Information
                    </button>
                  </div>

                  {/* Preferences */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="text-sm">Email Notifications</span>
                        <input type="checkbox" className="w-5 h-5" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm">SMS Updates for Orders</span>
                        <input type="checkbox" className="w-5 h-5" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm">Marketing Communications</span>
                        <input type="checkbox" className="w-5 h-5" />
                      </label>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="password" 
                        placeholder="Current Password"
                        className="p-3 border border-gray-200 rounded-xl"
                      />
                      <input 
                        type="password" 
                        placeholder="New Password"
                        className="p-3 border border-gray-200 rounded-xl"
                      />
                      <input 
                        type="password" 
                        placeholder="Confirm New Password"
                        className="p-3 border border-gray-200 rounded-xl md:col-span-2"
                      />
                    </div>
                    <button className="mt-4 px-6 py-2 bg-[#C40C0C] text-white rounded-xl text-xs font-bold hover:bg-[#FF6500] transition-colors">
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