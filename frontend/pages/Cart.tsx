import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ChevronLeft, Minus, Plus, ShoppingBag, ShieldCheck, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import API from '../services/api';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, loading } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [discount, setDiscount] = useState(0);

  // Calculate cart totals
  const subtotal = cart?.items?.reduce((acc, item) => {
    // Handle both populated product and direct price
    const price = item.product?.price || item.price || 0;
    return acc + (price * item.quantity);
  }, 0) || 0;
  
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + shipping + tax - discount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setApplyingCoupon(true);
    setCouponError('');
    setCouponSuccess('');

    try {
      const { data } = await API.post('/cart/apply-coupon', { couponCode });
      setDiscount(data.discountAmount);
      setCouponSuccess(`Coupon applied! You saved ₹${data.discountAmount.toLocaleString()}`);
    } catch (error: any) {
      setCouponError(error.response?.data?.message || 'Invalid coupon code');
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId: string) => {
    if (window.confirm('Remove this item from your cart?')) {
      await removeFromCart(itemId);
    }
  };

  const handleCheckout = () => {
    if (!cart?.items?.length) {
      alert('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  const getProductId = (item: any) => {
    // Handle both populated product object and direct productId
    return item.product?._id || item.productId || item._id;
  };

  const getProductName = (item: any) => {
    return item.product?.name || item.name || 'Product';
  };

  const getProductImage = (item: any) => {
    // Handle different possible image structures
    if (item.product?.images?.[0]?.url) {
      return item.product.images[0].url;
    }
    if (item.product?.images?.[0]) {
      return item.product.images[0];
    }
    if (item.image) {
      return item.image;
    }
    return 'https://via.placeholder.com/300x400?text=No+Image';
  };

  const getProductPrice = (item: any) => {
    return item.product?.price || item.price || 0;
  };

  const getProductFabric = (item: any) => {
    return item.product?.fabric || 'Handloom';
  };

  const getProductWeave = (item: any) => {
    return item.product?.weave || 'Traditional';
  };

  const getProductStock = (item: any) => {
    return item.product?.stock || 10;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 flex justify-center">
        <div className="w-12 h-12 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="mb-8 flex justify-center">
          <div className="p-8 bg-slate-100 rounded-full text-slate-400">
            <ShoppingBag size={64} strokeWidth={1} />
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">Your basket is empty</h1>
        <p className="text-slate-500 mb-10 max-w-md mx-auto">
          Explore our collection of authentic Odisha handlooms and find something exquisite today.
        </p>
        <Link 
          to="/shop" 
          className="inline-block bg-[#C40C0C] text-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-[#FF6500] shadow-xl transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-serif font-bold">Shopping Cart</h1>
        <Link 
          to="/shop" 
          className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-[#C40C0C] flex items-center gap-2"
        >
          <ChevronLeft size={16} /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.items.map((item) => {
            const productId = getProductId(item);
            const productName = getProductName(item);
            const productImage = getProductImage(item);
            const productPrice = getProductPrice(item);
            const productFabric = getProductFabric(item);
            const productWeave = getProductWeave(item);
            const productStock = getProductStock(item);
            
            return (
              <div 
                key={item._id} 
                className="flex flex-col sm:flex-row gap-6 p-6 border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all rounded-xl"
              >
                <Link to={`/product/${productId}`} className="w-32 aspect-[4/5] bg-slate-100 overflow-hidden shrink-0 rounded-lg">
                  <img 
                    src={productImage} 
                    alt={productName} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image';
                    }}
                  />
                </Link>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight mb-1">
                        <Link to={`/product/${productId}`} className="hover:text-[#C40C0C] transition-colors">
                          {productName}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                        {item.product?.category || 'Handloom'} • {productWeave}
                      </p>
                    </div>
                    <p className="font-bold text-lg text-[#C40C0C]">
                      ₹{(productPrice * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="text-xs text-slate-500 space-y-1 mb-auto">
                    <p>Fabric: {productFabric}</p>
                    <p>Weave: {productWeave}</p>
                    {item.color && <p>Color: {item.color}</p>}
                    {item.size && <p>Size: {item.size}</p>}
                    {productStock < 10 && (
                      <p className="text-orange-600 font-bold">
                        Only {productStock} left in stock!
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-slate-200 rounded-lg">
                      <button 
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="p-2 hover:bg-slate-50 disabled:opacity-30 rounded-l-lg"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 text-sm font-bold min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="p-2 hover:bg-slate-50 disabled:opacity-30 rounded-r-lg"
                        disabled={item.quantity >= productStock}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-slate-400 hover:text-red-600 flex items-center gap-1 text-xs font-bold uppercase transition-colors"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 p-8 shadow-sm rounded-xl sticky top-28">
            <h2 className="text-xl font-serif font-bold mb-6 pb-4 border-b border-slate-100">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart.totalItems || cart.items.length} items)</span>
                <span className="font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-bold' : ''}>
                  {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                </span>
              </div>
              
              <div className="flex justify-between text-slate-600">
                <span>Tax (GST 5%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              
              <div className="border-t border-slate-100 pt-4 flex justify-between text-xl font-bold text-slate-900">
                <span>Total</span>
                <span className="text-[#C40C0C]">₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white py-5 font-bold uppercase tracking-widest hover:shadow-xl transition-all rounded-xl"
            >
              Proceed to Checkout
            </button>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                <ShieldCheck size={18} className="text-green-600" /> Secure Checkout
              </div>
              <p className="text-xs text-slate-400 italic">
                Prices are inclusive of all taxes. Final amount will be calculated at checkout.
              </p>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="bg-[#F6CE71]/10 border border-[#F6CE71]/20 p-6 rounded-xl">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-3">
              Apply Coupon
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter code" 
                  className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-xl outline-none focus:border-[#C40C0C] transition-all"
                  disabled={applyingCoupon}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={applyingCoupon}
                  className="bg-slate-900 text-white px-6 py-3 text-xs font-bold uppercase rounded-xl hover:bg-[#C40C0C] transition-all disabled:opacity-50 min-w-[100px]"
                >
                  {applyingCoupon ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : (
                    'Apply'
                  )}
                </button>
              </div>
              
              {couponError && (
                <div className="flex items-center gap-2 text-red-600 text-xs">
                  <AlertCircle size={14} />
                  <span>{couponError}</span>
                </div>
              )}
              
              {couponSuccess && (
                <div className="text-green-600 text-xs font-bold">
                  {couponSuccess}
                </div>
              )}
              
              <p className="text-[10px] text-slate-500">
                Try code <span className="font-bold text-[#C40C0C]">SYS10</span> for 10% off your first order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;