import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ChevronLeft, Minus, Plus, ShoppingBag, ShieldCheck, AlertCircle, Heart, LogIn } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import API from '../services/api';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart, removeFromCart, updateCartQuantity, loading,
    isAuthenticated, guestCart, removeGuestCartItem, updateGuestCartQuantity
  } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [discount, setDiscount] = useState(0);

  // Determine which items to display
  const items = isAuthenticated ? (cart?.items || []) : guestCart;
  const isEmpty = items.length === 0;

  // Calculate cart totals
  const subtotal = isAuthenticated
    ? (cart?.items?.reduce((acc, item) => {
      const price = item.product?.price || item.price || 0;
      return acc + (price * item.quantity);
    }, 0) || 0)
    : guestCart.reduce((acc, item) => acc + ((item.price || 0) * item.quantity), 0);

  const shipping = subtotal > 5000 ? 0 : (subtotal > 0 ? 500 : 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax - discount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) { setCouponError('Please enter a coupon code'); return; }
    setApplyingCoupon(true);
    setCouponError(''); setCouponSuccess('');
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
    if (isEmpty) { alert('Your cart is empty'); return; }
    if (!isAuthenticated) {
      navigate('/auth?redirect=/checkout');
      return;
    }
    navigate('/checkout');
  };

  // Helpers for server cart
  const getProductId = (item: any) => item.product?._id || item.productId || item._id;
  const getProductName = (item: any) => item.product?.name || item.name || 'Product';
  const getProductImage = (item: any) => {
    if (item.product?.images?.[0]?.url) return item.product.images[0].url;
    if (item.product?.images?.[0]) return item.product.images[0];
    if (item.image) return item.image;
    return 'https://via.placeholder.com/300x400?text=No+Image';
  };
  const getProductPrice = (item: any) => item.product?.price || item.price || 0;
  const getProductFabric = (item: any) => item.product?.fabric || 'Handloom';
  const getProductWeave = (item: any) => item.product?.weave || 'Traditional';
  const getProductStock = (item: any) => item.product?.stock || 10;

  if (loading && isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 flex justify-center">
        <div className="w-12 h-12 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="mb-8 flex justify-center">
          <div className="p-8 bg-slate-100 rounded-full text-slate-400">
            <ShoppingBag size={64} strokeWidth={1} />
          </div>
        </div>
        <h1 className="text-3xl font-display font-bold text-[#0D0B0A] mb-4">Your basket is empty</h1>
        <p className="text-slate-500 mb-10 max-w-md mx-auto">
          Explore our collection of authentic Odisha handlooms and find something exquisite today.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-[#C9A84C] text-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-[#E8C97A] shadow-xl transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold">Shopping Cart</h1>
        <Link
          to="/shop"
          className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-[#C9A84C] flex items-center gap-2"
        >
          <ChevronLeft size={16} /> Continue Shopping
        </Link>
      </div>

      {/* Guest save banner */}
      {!isAuthenticated && (
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gradient-to-r from-[#B43F3F]/5 to-[#FF8225]/5 border border-[#B43F3F]/20 rounded-xl">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-[#B43F3F] shrink-0" />
            <p className="text-sm text-[#173B45] font-medium">
              Save your items permanently ❤️ — Login now and never lose your cart
            </p>
          </div>
          <Link
            to={`/auth?redirect=/cart`}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#B43F3F] text-[#F8EDED] text-sm font-medium rounded-lg hover:bg-[#FF8225] transition-all whitespace-nowrap shrink-0"
          >
            <LogIn size={16} />
            Login to Save
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          {/* ── Guest Items ── */}
          {!isAuthenticated && guestCart.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row gap-6 p-6 border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all rounded-xl"
            >
              <Link to={`/product/${item.productId}`} className="w-32 aspect-[4/5] bg-slate-100 overflow-hidden shrink-0 rounded-lg">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name || 'Product'}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="text-slate-300" size={32} />
                  </div>
                )}
              </Link>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0D0B0A] leading-tight mb-1">
                      <Link to={`/product/${item.productId}`} className="hover:text-[#C9A84C] transition-colors">
                        {item.name || 'Loading...'}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                      {item.category || 'Handloom'} • {item.weave || 'Traditional'}
                    </p>
                  </div>
                  <p className="font-bold text-lg text-[#C9A84C]">
                    {item.price ? `₹${((item.price) * item.quantity).toLocaleString()}` : '—'}
                  </p>
                </div>

                <div className="text-xs text-slate-500 space-y-1 mb-auto">
                  {item.fabric && <p>Fabric: {item.fabric}</p>}
                  {item.color && <p>Color: {item.color}</p>}
                  {item.size && <p>Size: {item.size}</p>}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center border border-slate-200 rounded-lg">
                    <button
                      onClick={() => updateGuestCartQuantity(item.productId, item.quantity - 1)}
                      className="p-2 hover:bg-slate-50 disabled:opacity-30 rounded-l-lg"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-bold min-w-[40px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateGuestCartQuantity(item.productId, item.quantity + 1)}
                      className="p-2 hover:bg-slate-50 disabled:opacity-30 rounded-r-lg"
                      disabled={item.stock !== undefined && item.quantity >= item.stock}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeGuestCartItem(item.productId)}
                    className="text-slate-400 hover:text-red-600 flex items-center gap-1 text-xs font-bold uppercase transition-colors"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* ── Auth Items ── */}
          {isAuthenticated && cart?.items?.map((item) => {
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
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image'; }}
                  />
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#0D0B0A] leading-tight mb-1">
                        <Link to={`/product/${productId}`} className="hover:text-[#C9A84C] transition-colors">
                          {productName}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                        {item.product?.category || 'Handloom'} • {productWeave}
                      </p>
                    </div>
                    <p className="font-bold text-lg text-[#C9A84C]">
                      ₹{(productPrice * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1 mb-auto">
                    <p>Fabric: {productFabric}</p>
                    <p>Weave: {productWeave}</p>
                    {item.color && <p>Color: {item.color}</p>}
                    {item.size && <p>Size: {item.size}</p>}
                    {productStock < 10 && (
                      <p className="text-orange-600 font-bold">Only {productStock} left in stock!</p>
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
                      <span className="px-4 text-sm font-bold min-w-[40px] text-center">{item.quantity}</span>
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
            <h2 className="text-xl font-display font-bold mb-6 pb-4 border-b border-slate-100">
              Order Summary
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                <span className="font-bold">₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-bold' : ''}>
                  {subtotal === 0 ? '—' : shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
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

              <div className="border-t border-slate-100 pt-4 flex justify-between text-xl font-bold text-[#0D0B0A]">
                <span>Total</span>
                <span className="text-[#C9A84C]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-white py-5 font-bold uppercase tracking-widest hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
            >
              {!isAuthenticated ? <><LogIn size={18} /> Login to Checkout</> : 'Proceed to Checkout'}
            </button>

            {!isAuthenticated && (
              <p className="text-xs text-slate-400 text-center mt-3">
                Your cart items will be saved when you log in
              </p>
            )}

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                <ShieldCheck size={18} className="text-green-600" /> Secure Checkout
              </div>
              <p className="text-xs text-slate-400 italic">
                Prices are inclusive of all taxes. Final amount will be calculated at checkout.
              </p>
            </div>
          </div>

          {/* Coupon — only for logged in users */}
          {isAuthenticated && (
            <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-[#0D0B0A] uppercase tracking-widest mb-3">Apply Coupon</h3>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-xl outline-none focus:border-[#C9A84C] transition-all"
                    disabled={applyingCoupon}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={applyingCoupon}
                    className="bg-[#0D0B0A] text-white px-6 py-3 text-xs font-bold uppercase rounded-xl hover:bg-[#C9A84C] transition-all disabled:opacity-50 min-w-[100px]"
                  >
                    {applyingCoupon ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div> : 'Apply'}
                  </button>
                </div>
                {couponError && (
                  <div className="flex items-center gap-2 text-red-600 text-xs">
                    <AlertCircle size={14} /><span>{couponError}</span>
                  </div>
                )}
                {couponSuccess && <div className="text-green-600 text-xs font-bold">{couponSuccess}</div>}
                <p className="text-[10px] text-slate-500">
                  Try code <span className="font-bold text-[#C9A84C]">SYS10</span> for 10% off your first order.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;