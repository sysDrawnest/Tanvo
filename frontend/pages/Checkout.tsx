import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Truck, Lock, CreditCard, MapPin, Phone, Mail, AlertCircle, CheckCircle, ShoppingBag, ChevronRight, Package, Gift, Home, Building2, Plus, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import API from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

interface Address {
  _id?: string;
  type: 'home' | 'work' | 'other';
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone?: string;
  isDefault: boolean;
}

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[] | Array<{ url: string; isPrimary?: boolean }>;
    stock: number;
  };
  quantity: number;
  price: number;
  color?: string;
  size?: string;
}

interface Cart {
  _id: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  couponCode?: string;
  discountAmount?: number;
}

interface OrderData {
  shippingAddress: Address;
  paymentMethod: string;
  items: CartItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  discountPrice?: number;
  couponCode?: string;
  notes?: string;
  isGift?: boolean;
  giftMessage?: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, user, isAuthenticated } = useStore();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      navigate('/auth?redirect=checkout');
    }
  }, [isAuthenticated, navigate]);

  // Fetch user addresses
  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses();
    }
  }, [isAuthenticated]);

  // Calculate totals
  const typedCart = cart as Cart | null;
  const subtotal = typedCart?.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.05);
  const discount = typedCart?.discountAmount || 0;
  const total = subtotal + shipping + tax - discount;

  // Helper function to get product image URL
  const getProductImageUrl = (item: CartItem): string => {
    if (!item.product?.images || item.product.images.length === 0) {
      return '/placeholder.jpg';
    }

    const firstImage = item.product.images[0];

    if (typeof firstImage === 'object' && firstImage !== null && 'url' in firstImage) {
      return firstImage.url;
    }

    if (typeof firstImage === 'string') {
      return firstImage;
    }

    return '/placeholder.jpg';
  };

  const fetchAddresses = async () => {
    try {
      const { data } = await API.get('/users/addresses');
      setAddresses(data);

      const defaultAddr = data.find((addr: Address) => addr.isDefault);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddAddress = async () => {
    const newErrors: Record<string, string> = {};

    if (!newAddress.addressLine1) newErrors.addressLine1 = 'Address is required';
    if (!newAddress.city) newErrors.city = 'City is required';
    if (!newAddress.pincode) newErrors.pincode = 'Pincode is required';
    else if (!/^[1-9][0-9]{5}$/.test(newAddress.pincode)) {
      newErrors.pincode = 'Invalid pincode';
    }
    if (!newAddress.phone) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(newAddress.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post('/users/addresses', newAddress);
      setAddresses(data);
      setSelectedAddress(data.find((addr: Address) => addr.isDefault) || data[data.length - 1]);
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
      setErrors({});
    } catch (error) {
      console.error('Error adding address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a shipping address');
      return;
    }

    setPlacingOrder(true);

    const orderData: OrderData = {
      shippingAddress: selectedAddress,
      paymentMethod,
      items: typedCart?.items || [],
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shipping,
      totalPrice: total,
      discountPrice: discount,
      couponCode: typedCart?.couponCode,
      notes: orderNotes,
      isGift,
      giftMessage: isGift ? giftMessage : undefined
    };

    try {
      const { data } = await API.post('/orders', orderData);
      navigate(`/order-confirmation/${data._id}`);
    } catch (error: any) {
      console.error('Error placing order:', error);
      alert(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!typedCart?.items?.length) {
    return (
      <div className="min-h-screen bg-[#F8EDED] pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Textile overlay */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            opacity: 0.5,
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl md:rounded-2xl shadow-lg p-8 md:p-12 max-w-md mx-auto border border-[#B43F3F]/10"
          >
            <div className="w-20 h-20 bg-[#F8EDED] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-[#173B45]/30" />
            </div>
            <h2 className="text-xl md:text-2xl font-display font-medium text-[#173B45] mb-2">Your cart is empty</h2>
            <p className="text-sm text-[#173B45]/60 mb-6">Add some beautiful handlooms to your cart before checkout.</p>
            <Link to="/shop" className="inline-block bg-[#B43F3F] text-[#F8EDED] px-6 py-3 rounded-lg font-medium hover:bg-[#FF8225] transition-all">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8EDED] pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Textile overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-medium text-[#173B45]">Checkout</h1>
          <p className="text-sm text-[#173B45]/60">Complete your purchase</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="flex items-center">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-medium text-sm ${step >= num
                    ? 'bg-[#B43F3F] text-[#F8EDED]'
                    : 'bg-white border border-[#B43F3F]/20 text-[#173B45]/40'
                    }`}>
                    {step > num ? <CheckCircle size={16} /> : num}
                  </div>
                  <span className={`text-[10px] md:text-xs mt-1 ${step >= num ? 'text-[#173B45]' : 'text-[#173B45]/40'
                    }`}>
                    {num === 1 ? 'Address' : num === 2 ? 'Payment' : 'Confirm'}
                  </span>
                </div>
                {num < 3 && (
                  <div className={`w-12 md:w-16 h-[2px] mx-1 ${step > num ? 'bg-[#B43F3F]' : 'bg-[#B43F3F]/20'
                    }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Step 1: Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-[#B43F3F]/10"
            >
              <h2 className="text-lg md:text-xl font-display font-medium text-[#173B45] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#B43F3F]" />
                Shipping Address
              </h2>

              {addresses.length > 0 && !showAddressForm ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <label
                        key={addr._id}
                        className={`relative block p-4 md:p-5 border-2 rounded-xl cursor-pointer transition-all ${selectedAddress?._id === addr._id
                          ? 'border-[#B43F3F] bg-[#B43F3F]/5 ring-1 ring-[#B43F3F]/30'
                          : 'border-[#B43F3F]/5 hover:border-[#B43F3F]/20 bg-white shadow-sm'
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedAddress?._id === addr._id
                            ? 'border-[#B43F3F] bg-[#B43F3F]'
                            : 'border-[#B43F3F]/20'
                            }`}>
                            {selectedAddress?._id === addr._id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-white" />
                            )}
                          </div>
                          <input
                            type="radio"
                            className="absolute opacity-0"
                            checked={selectedAddress?._id === addr._id}
                            onChange={() => setSelectedAddress(addr)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F8EDED] rounded-lg border border-[#B43F3F]/10">
                                {addr.type === 'home' && <Home size={12} className="text-[#B43F3F]" />}
                                {addr.type === 'work' && <Building2 size={12} className="text-[#B43F3F]" />}
                                {addr.type === 'other' && <MapPin size={12} className="text-[#B43F3F]" />}
                                <span className="text-[10px] font-bold text-[#173B45] uppercase tracking-wider">{addr.type}</span>
                              </div>
                              {addr.isDefault && (
                                <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-md border border-green-100 italic">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="space-y-0.5 mb-3">
                              <p className="text-sm font-medium text-[#173B45] line-clamp-1">{addr.addressLine1}</p>
                              {addr.addressLine2 && <p className="text-xs text-[#173B45]/60 line-clamp-1">{addr.addressLine2}</p>}
                              <p className="text-xs text-[#173B45]/60">{addr.city}, {addr.state} - {addr.pincode}</p>
                            </div>
                            <div className="flex items-center gap-1.5 py-1.5 px-3 bg-[#F8EDED]/40 rounded-lg border border-[#B43F3F]/5 w-fit">
                              <Phone size={12} className="text-[#B43F3F]/60" />
                              <span className="text-xs font-medium text-[#173B45]/80 font-mono">{addr.phone}</span>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}

                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="group relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#B43F3F]/20 rounded-xl hover:border-[#B43F3F]/40 hover:bg-[#B43F3F]/5 transition-all h-full min-h-[160px]"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#F8EDED] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus className="w-5 h-5 text-[#B43F3F]" />
                      </div>
                      <span className="text-sm font-medium text-[#173B45]">Add New Address</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 py-2">
                  <div className="border-b border-[#B43F3F]/10 pb-4 mb-2 flex items-center justify-between">
                    <p className="text-xs font-bold text-[#173B45]/40 uppercase tracking-widest">New Address Details</p>
                    {addresses.length > 0 && (
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="text-xs flex items-center gap-1.5 text-[#B43F3F] font-bold hover:underline"
                      >
                        <ArrowLeft size={14} /> Back to addresses
                      </button>
                    )}
                  </div>

                  {/* Section 1: Address Categorization */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-[#B43F3F]/10 rounded-lg text-[#B43F3F]">
                        <Package size={16} />
                      </div>
                      <h3 className="text-sm font-bold text-[#173B45] uppercase tracking-wide">1. Tag this address</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {(['home', 'work', 'other'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setNewAddress({ ...newAddress, type: t })}
                          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${newAddress.type === t
                            ? 'border-[#B43F3F] bg-[#B43F3F]/5 ring-1 ring-[#B43F3F]/30 shadow-md'
                            : 'border-gray-100 bg-white hover:border-[#B43F3F]/20'
                            }`}
                        >
                          <div className={`p-2 rounded-lg ${newAddress.type === t ? 'bg-[#B43F3F] text-white' : 'bg-gray-50 text-gray-400'}`}>
                            {t === 'home' && <Home size={18} />}
                            {t === 'work' && <Building2 size={18} />}
                            {t === 'other' && <MapPin size={18} />}
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${newAddress.type === t ? 'text-[#173B45]' : 'text-gray-400'}`}>
                            {t}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section 2: Contact Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-[#B43F3F]/10 rounded-lg text-[#B43F3F]">
                        <Phone size={16} />
                      </div>
                      <h3 className="text-sm font-bold text-[#173B45] uppercase tracking-wide">2. Contact Details</h3>
                    </div>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#B43F3F] transition-colors">
                        <Phone size={16} />
                      </div>
                      <input
                        type="text"
                        placeholder="Mobile Number *"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className={`w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border-2 rounded-xl focus:border-[#B43F3F] focus:ring-4 focus:ring-[#B43F3F]/5 outline-none transition-all text-sm font-medium ${errors.phone ? 'border-red-500' : 'border-gray-100'}`}
                      />
                      {errors.phone && <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">{errors.phone}</motion.p>}
                    </div>
                  </div>

                  {/* Section 3: Delivery Address */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-[#B43F3F]/10 rounded-lg text-[#B43F3F]">
                        <MapPin size={16} />
                      </div>
                      <h3 className="text-sm font-bold text-[#173B45] uppercase tracking-wide">3. Delivery Information</h3>
                    </div>

                    <div className="space-y-4">
                      {/* Line 1 */}
                      <div>
                        <input
                          type="text"
                          placeholder="House No., Building Name, Street * "
                          value={newAddress.addressLine1}
                          onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                          className={`w-full px-4 py-3.5 bg-gray-50/50 border-2 rounded-xl focus:border-[#B43F3F] outline-none transition-all text-sm font-medium ${errors.addressLine1 ? 'border-red-500' : 'border-gray-100'}`}
                        />
                        {errors.addressLine1 && <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">{errors.addressLine1}</motion.p>}
                      </div>

                      {/* Line 2 */}
                      <input
                        type="text"
                        placeholder="Area, Colony, Landmark (Optional)"
                        value={newAddress.addressLine2}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                        className="w-full px-4 py-3.5 bg-gray-50/50 border-2 border-gray-100 rounded-xl focus:border-[#B43F3F] outline-none transition-all text-sm font-medium"
                      />

                      {/* Grid for City, State, Pin */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            placeholder="City *"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            className={`w-full px-4 py-3.5 bg-gray-50/50 border-2 rounded-xl focus:border-[#B43F3F] outline-none transition-all text-sm font-medium ${errors.city ? 'border-red-500' : 'border-gray-100'}`}
                          />
                          {errors.city && <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">{errors.city}</motion.p>}
                        </div>

                        <select
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="w-full px-4 py-3.5 bg-gray-50/50 border-2 border-gray-100 rounded-xl focus:border-[#B43F3F] outline-none transition-all text-sm font-bold text-[#173B45]"
                        >
                          <option value="Odisha">Odisha</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Telangana">Telangana</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Kerala">Kerala</option>
                        </select>

                        <div>
                          <input
                            type="text"
                            placeholder="Pincode *"
                            value={newAddress.pincode}
                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                            className={`w-full px-4 py-3.5 bg-gray-50/50 border-2 rounded-xl focus:border-[#B43F3F] outline-none transition-all text-sm font-mono tracking-widest font-bold ${errors.pincode ? 'border-red-500' : 'border-gray-100'}`}
                            maxLength={6}
                          />
                          {errors.pincode && <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">{errors.pincode}</motion.p>}
                        </div>

                        <label className="flex items-center gap-3 p-3.5 bg-white border-2 border-gray-100 rounded-xl cursor-pointer hover:border-[#B43F3F]/10 transition-colors self-start">
                          <input
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                            className="w-5 h-5 rounded-md border-gray-300 text-[#B43F3F] focus:ring-[#B43F3F]"
                          />
                          <span className="text-xs font-bold text-[#173B45]/60 uppercase tracking-wider">Set as default</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleAddAddress}
                      disabled={loading}
                      className="flex-1 py-4 bg-[#173B45] text-white font-bold rounded-xl hover:bg-[#B43F3F] transition-all shadow-lg shadow-[#173B45]/10 active:scale-[0.98] disabled:opacity-50 text-sm uppercase tracking-widest"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : 'Securely Save Address'}
                    </button>

                    {addresses.length > 0 && (
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="px-6 py-4 border-2 border-gray-100 text-[#173B45]/60 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm uppercase tracking-widest"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Step 2: Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-[#B43F3F]/10"
            >
              <h2 className="text-lg md:text-xl font-display font-medium text-[#173B45] mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#B43F3F]" />
                Payment Method
              </h2>

              <div className="space-y-3">
                {[
                  { id: 'cod', label: 'Cash on Delivery', description: 'Pay when you receive your order' },
                  { id: 'card', label: 'Credit/Debit Card', description: 'Visa, MasterCard, RuPay, Amex' },
                  { id: 'upi', label: 'UPI', description: 'Google Pay, PhonePe, Paytm' },
                  { id: 'netbanking', label: 'Net Banking', description: 'All major banks' }
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === method.id
                      ? 'border-[#FF8225] bg-[#FF8225]/5'
                      : 'border-[#B43F3F]/10 hover:border-[#FF8225]/30'
                      }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="accent-[#FF8225]"
                    />
                    <div>
                      <span className="text-sm font-medium text-[#173B45] block">{method.label}</span>
                      <span className="text-xs text-[#173B45]/60">{method.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Step 3: Additional Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-[#B43F3F]/10"
            >
              <h2 className="text-lg md:text-xl font-display font-medium text-[#173B45] mb-4">Additional Options</h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="accent-[#FF8225]"
                  />
                  <span className="text-sm text-[#173B45]">This is a gift</span>
                </label>

                <AnimatePresence>
                  {isGift && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <textarea
                        placeholder="Enter gift message..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        className="w-full p-3 border border-[#B43F3F]/10 rounded-lg focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 outline-none text-sm h-20"
                        maxLength={200}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <textarea
                  placeholder="Order notes (optional)"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full p-3 border border-[#B43F3F]/10 rounded-lg focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 outline-none text-sm h-20"
                />
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-[#B43F3F]/10 sticky top-24">
              <h2 className="text-lg md:text-xl font-display font-medium text-[#173B45] mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#173B45]/70">Subtotal ({typedCart?.totalItems || 0} items)</span>
                  <span className="font-medium text-[#173B45]">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#173B45]/70">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-[#173B45]'}>
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#173B45]/70">Tax (GST 5%)</span>
                  <span className="font-medium text-[#173B45]">₹{tax.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="border-t border-[#B43F3F]/10 pt-3 mt-3">
                  <div className="flex justify-between text-base">
                    <span className="font-medium text-[#173B45]">Total</span>
                    <span className="font-medium text-[#B43F3F]">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="mb-4 max-h-48 overflow-y-auto space-y-2">
                {typedCart?.items?.map((item) => (
                  <div key={item._id} className="flex items-center gap-2 py-2 border-b border-[#B43F3F]/10">
                    <img
                      src={getProductImageUrl(item)}
                      alt={item.product.name}
                      className="w-10 h-12 object-cover rounded border border-[#B43F3F]/10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#173B45] truncate">{item.product.name}</p>
                      <p className="text-[10px] text-[#173B45]/60">Qty: {item.quantity}</p>
                      {item.color && <p className="text-[10px] text-[#173B45]/60">{item.color}</p>}
                    </div>
                    <span className="text-xs font-medium text-[#B43F3F]">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder || !selectedAddress}
                className="w-full py-3 bg-[#B43F3F] text-[#F8EDED] font-medium rounded-lg hover:bg-[#FF8225] transition-all duration-300 mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {placingOrder ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#F8EDED] border-t-transparent rounded-full animate-spin"></div>
                    Placing Order...
                  </div>
                ) : (
                  'Place Order'
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#173B45]/60">
                <Lock className="w-3 h-3" />
                <span>Secure SSL Encrypted</span>
              </div>

              <div className="mt-4 pt-4 border-t border-[#B43F3F]/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#173B45]/70">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>100% Authentic Handloom</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#173B45]/70">
                  <Truck className="w-4 h-4 text-[#FF8225]" />
                  <span>Free shipping above ₹5,000</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;