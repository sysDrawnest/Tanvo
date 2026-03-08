import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Truck, Lock, CreditCard, MapPin, Phone, Mail, AlertCircle, CheckCircle, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import API from '../services/api';

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
    
    // Check if it's an object with url property or a string
    if (typeof firstImage === 'object' && firstImage !== null && 'url' in firstImage) {
      return firstImage.url;
    }
    
    // If it's a string, return it directly
    if (typeof firstImage === 'string') {
      return firstImage;
    }
    
    return '/placeholder.jpg';
  };

  const fetchAddresses = async () => {
    try {
      const { data } = await API.get('/users/addresses');
      setAddresses(data);
      
      // Set default address
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
    // Validate address
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
      
      // Redirect to order confirmation
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-24">
        <div className="container-custom text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some beautiful handlooms to your cart before checkout.</p>
            <Link to="/shop" className="inline-block bg-[#C40C0C] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#FF6500] transition-all">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-24">
      <div className="container-custom">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? 'bg-[#C40C0C] text-white' : 'bg-gray-200 text-gray-500'
            }`}>1</div>
            <div className={`w-24 h-1 ${step >= 2 ? 'bg-[#C40C0C]' : 'bg-gray-200'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? 'bg-[#C40C0C] text-white' : 'bg-gray-200 text-gray-500'
            }`}>2</div>
            <div className={`w-24 h-1 ${step >= 3 ? 'bg-[#C40C0C]' : 'bg-gray-200'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 3 ? 'bg-[#C40C0C] text-white' : 'bg-gray-200 text-gray-500'
            }`}>3</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#C40C0C]" />
                Shipping Address
              </h2>

              {addresses.length > 0 && !showAddressForm ? (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <label
                      key={addr._id}
                      className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedAddress?._id === addr._id
                          ? 'border-[#C40C0C] bg-[#C40C0C]/5'
                          : 'border-gray-200 hover:border-[#FF6500]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress?._id === addr._id}
                          onChange={() => setSelectedAddress(addr)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold capitalize">{addr.type}</span>
                            {addr.isDefault && (
                              <span className="text-xs bg-[#F6CE71] text-[#CC561E] px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm">{addr.addressLine1}</p>
                          {addr.addressLine2 && <p className="text-sm">{addr.addressLine2}</p>}
                          <p className="text-sm">{addr.city}, {addr.state} - {addr.pincode}</p>
                          <p className="text-sm text-gray-500 mt-1">Phone: {addr.phone}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                  
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="text-[#C40C0C] text-sm font-bold hover:underline"
                  >
                    + Add New Address
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={newAddress.type}
                      onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as any })}
                      className="p-3 border border-gray-200 rounded-xl focus:border-[#FF6500]"
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
                      className={`p-3 border rounded-xl focus:border-[#FF6500] ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs col-span-2">{errors.phone}</p>}
                    
                    <input
                      type="text"
                      placeholder="Address Line 1 *"
                      value={newAddress.addressLine1}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                      className={`md:col-span-2 p-3 border rounded-xl focus:border-[#FF6500] ${
                        errors.addressLine1 ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.addressLine1 && <p className="text-red-500 text-xs col-span-2">{errors.addressLine1}</p>}
                    
                    <input
                      type="text"
                      placeholder="Address Line 2 (Optional)"
                      value={newAddress.addressLine2}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                      className="md:col-span-2 p-3 border border-gray-200 rounded-xl focus:border-[#FF6500]"
                    />
                    
                    <input
                      type="text"
                      placeholder="City *"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className={`p-3 border rounded-xl focus:border-[#FF6500] ${
                        errors.city ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                    
                    <select
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="p-3 border border-gray-200 rounded-xl focus:border-[#FF6500]"
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
                      className={`p-3 border rounded-xl focus:border-[#FF6500] ${
                        errors.pincode ? 'border-red-500' : 'border-gray-200'
                      }`}
                      maxLength={6}
                    />
                    {errors.pincode && <p className="text-red-500 text-xs">{errors.pincode}</p>}
                    
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
                    {addresses.length > 0 && (
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-[#C40C0C]" />
                Payment Method
              </h2>
              
              <div className="space-y-4">
                {[
                  { id: 'cod', label: 'Cash on Delivery', description: 'Pay when you receive your order' },
                  { id: 'card', label: 'Credit/Debit Card', description: 'Visa, MasterCard, RuPay, Amex' },
                  { id: 'upi', label: 'UPI', description: 'Google Pay, PhonePe, Paytm' },
                  { id: 'netbanking', label: 'Net Banking', description: 'All major banks' }
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-[#C40C0C] bg-[#C40C0C]/5'
                        : 'border-gray-200 hover:border-[#FF6500]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="w-4 h-4 text-[#C40C0C]"
                    />
                    <div>
                      <span className="font-bold block">{method.label}</span>
                      <span className="text-xs text-gray-500">{method.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Additional Options */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-serif font-bold mb-6">Additional Options</h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="w-4 h-4 text-[#C40C0C]"
                  />
                  <span className="font-medium">This is a gift</span>
                </label>
                
                {isGift && (
                  <textarea
                    placeholder="Enter gift message..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:border-[#FF6500] h-24"
                    maxLength={200}
                  />
                )}
                
                <textarea
                  placeholder="Order notes (optional)"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-[#FF6500] h-24"
                />
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 sticky top-28">
              <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({typedCart?.totalItems || 0} items)</span>
                  <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-bold' : ''}>
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST 5%)</span>
                  <span className="font-bold">₹{tax.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-bold">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-[#C40C0C]">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Order Items Preview */}
              <div className="mb-6 max-h-60 overflow-y-auto">
                {typedCart?.items?.map((item) => (
                  <div key={item._id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                    <img
                      src={getProductImageUrl(item)}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-xs font-bold line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                      {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                    </div>
                    <span className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder || !selectedAddress}
                className="w-full py-4 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {placingOrder ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Placing Order...
                  </div>
                ) : (
                  'Place Order'
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Lock className="w-4 h-4" />
                <span>Secure SSL Encrypted</span>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>100% Authentic Handloom Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                  <Truck className="w-4 h-4 text-[#FF6500]" />
                  <span>Free shipping on orders above ₹5000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;