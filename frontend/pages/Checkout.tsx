import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Truck, Lock, CreditCard, MapPin, Phone, Mail, AlertCircle, CheckCircle, ShoppingBag, ChevronRight, Package, Gift } from 'lucide-react';
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
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr._id}
                      className={`block p-3 md:p-4 border rounded-lg cursor-pointer transition-all ${selectedAddress?._id === addr._id
                        ? 'border-[#FF8225] bg-[#FF8225]/5'
                        : 'border-[#B43F3F]/10 hover:border-[#FF8225]/30'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress?._id === addr._id}
                          onChange={() => setSelectedAddress(addr)}
                          className="mt-1 accent-[#FF8225]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-[#173B45] capitalize">{addr.type}</span>
                            {addr.isDefault && (
                              <span className="text-[10px] bg-[#FF8225] text-[#F8EDED] px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#173B45]/70">{addr.addressLine1}</p>
                          {addr.addressLine2 && <p className="text-xs text-[#173B45]/70">{addr.addressLine2}</p>}
                          <p className="text-xs text-[#173B45]/70">{addr.city}, {addr.state} - {addr.pincode}</p>
                          <p className="text-xs text-[#173B45]/50 mt-1">Phone: {addr.phone}</p>
                        </div>
                      </div>
                    </label>
                  ))}

                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="text-[#FF8225] text-sm font-medium hover:text-[#B43F3F] transition-colors flex items-center gap-1"
                  >
                    <span>+ Add New Address</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={newAddress.type}
                      onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as any })}
                      className="p-3 border border-[#B43F3F]/10 rounded-lg focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 outline-none text-sm"
                    >
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Phone Number *"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className={`p-3 border rounded-lg focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 outline-none text-sm ${errors.phone ? 'border-red-500' : 'border-[#B43F3F]/10'
                        }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs col-span-2">{errors.phone}</p>}

                    <input
                      type="text"
                      placeholder="Address Line 1 *"
                      value={newAddress.addressLine1}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                      className={`md:col-span-2 p-3 border rounded-lg focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 outline-none text-sm ${errors.addressLine1 ? 'border-red-500' : 'border-[#B43F3F]/10'
                        }`}
                    />
                    {errors.addressLine1 && <p className="text-red-500 text-xs col-span-2">{errors.addressLine1}</p>}

                    <input
                      type="text"
                      placeholder="Address Line 2 (Optional)"
                      value={newAddress.addressLine2}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                      className="md:col-span-2 p-3 border border-[#B43F3F]/10 rounded-lg focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 outline-none text-sm"
                    />

                    <input
                      type="text"
                      placeholder="City *"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className={`p-3 border rounded-lg focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 outline-none text-sm ${errors.city ? 'border-red-500' : 'border-[#B43F3F]/10'
                        }`}
                    />
                    {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}

                    <select
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="p-3 border border-[#B43F3F]/10 rounded-lg focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 outline-none text-sm"
                    >
                      <option value="Odisha">Odisha</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Other">Other</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Pincode *"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className={`p-3 border rounded-lg focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 outline-none text-sm ${errors.pincode ? 'border-red-500' : 'border-[#B43F3F]/10'
                        }`}
                      maxLength={6}
                    />
                    {errors.pincode && <p className="text-red-500 text-xs">{errors.pincode}</p>}

                    <label className="flex items-center gap-2 col-span-2">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        className="accent-[#FF8225]"
                      />
                      <span className="text-xs text-[#173B45]/70">Set as default address</span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleAddAddress}
                      disabled={loading}
                      className="px-5 py-2.5 bg-[#B43F3F] text-[#F8EDED] font-medium rounded-lg hover:bg-[#FF8225] transition-all disabled:opacity-50 text-sm"
                    >
                      {loading ? 'Saving...' : 'Save Address'}
                    </button>
                    {addresses.length > 0 && (
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="px-5 py-2.5 border border-[#B43F3F]/10 text-[#173B45] font-medium rounded-lg hover:bg-[#F8EDED] transition-all text-sm"
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