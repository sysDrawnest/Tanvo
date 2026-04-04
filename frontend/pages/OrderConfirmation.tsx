import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Calendar, MapPin, Mail, Truck, Clock, AlertCircle, Heart, ShoppingBag, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import API from '../services/api';
import { motion } from 'framer-motion';

interface Order {
  _id: string;
  orderNumber?: string;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  totalPrice: number;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  orderItems: Array<{
    product: {
      name: string;
      images: Array<{ url: string }>;
    };
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  user: {
    email: string;
    name: string;
  };
}

const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?redirect=orders');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (id) {
      fetchOrder();
    } else {
      fetchRecentOrder();
    }
  }, [id]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/orders/${id}`);
      setOrder(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching order:', err);
      setError(err.response?.data?.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentOrder = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/orders/my-orders?limit=1');
      if (data.orders && data.orders.length > 0) {
        setOrder(data.orders[0]);
      } else {
        setError('No orders found');
      }
    } catch (err: any) {
      console.error('Error fetching recent order:', err);
      setError(err.response?.data?.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
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

  const getOrderNumber = () => {
    if (!order) return '';
    return `#${order._id.slice(-8).toUpperCase()}`;
  };

  const getEstimatedDelivery = () => {
    if (order?.estimatedDelivery) {
      return formatDate(order.estimatedDelivery);
    }

    if (order?.createdAt) {
      const orderDate = new Date(order.createdAt);
      const estimated = new Date(orderDate);
      estimated.setDate(estimated.getDate() + 5);
      return formatDate(estimated.toISOString());
    }

    return 'Not available';
  };

  const getStatusIcon = () => {
    if (!order) return <CheckCircle className="w-12 h-12 text-[#B43F3F]" />;

    switch (order.orderStatus) {
      case 'Delivered':
        return <CheckCircle className="w-12 h-12 text-green-600" />;
      case 'Cancelled':
        return <AlertCircle className="w-12 h-12 text-red-600" />;
      case 'Shipped':
        return <Truck className="w-12 h-12 text-[#B43F3F]" />;
      case 'Processing':
        return <Package className="w-12 h-12 text-[#FF8225]" />;
      default:
        return <Clock className="w-12 h-12 text-[#173B45]" />;
    }
  };

  const getStatusMessage = () => {
    if (!order) return 'Thank You for Your Order!';

    switch (order.orderStatus) {
      case 'Delivered':
        return 'Your Order Has Been Delivered!';
      case 'Cancelled':
        return 'Order Cancelled';
      case 'Shipped':
        return 'Your Order Is On The Way!';
      case 'Processing':
        return 'Your Order Is Being Processed';
      default:
        return 'Thank You for Your Order!';
    }
  };

  const getStatusDescription = () => {
    if (!order) return 'Your heritage treasure has been successfully booked.';

    switch (order.orderStatus) {
      case 'Delivered':
        return 'We hope you love your handwoven masterpiece. Share your experience with a review!';
      case 'Cancelled':
        return 'Your order has been cancelled. Any refunds will be processed within 5-7 business days.';
      case 'Shipped':
        return 'Your order is on its way! Track it using the tracking number below.';
      case 'Processing':
        return 'Your order is being carefully prepared by our master weavers.';
      default:
        return 'Your heritage treasure has been successfully booked.';
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-[#FF8225]/10 text-[#FF8225]',
      Processing: 'bg-[#B43F3F]/10 text-[#B43F3F]',
      Shipped: 'bg-[#173B45]/10 text-[#173B45]',
      Delivered: 'bg-green-50 text-green-600',
      Cancelled: 'bg-red-50 text-red-600'
    };
    return colors[status] || 'bg-[#F8EDED] text-[#173B45]';
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
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

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#F8EDED] pt-32 pb-24">
        {/* Textile overlay */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            opacity: 0.5,
          }}
        />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-8 md:p-12 text-center border border-[#B43F3F]/10">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-medium mb-3 text-[#173B45]">
              Order Not Found
            </h1>
            <p className="text-sm text-[#173B45]/60 mb-8 max-w-md mx-auto">
              {error || "We couldn't find the order you're looking for."}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#B43F3F] text-[#F8EDED] rounded-lg font-medium text-sm hover:bg-[#FF8225] transition-colors"
            >
              Continue Shopping <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8 lg:p-12 border border-[#B43F3F]/10"
        >
          {/* Status Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-[#F8EDED] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6"
          >
            {getStatusIcon()}
          </motion.div>

          {/* Status Message */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-medium mb-2 text-center text-[#173B45]">
            {getStatusMessage()}
          </h1>

          <p className="text-sm md:text-base text-[#173B45]/70 mb-6 text-center max-w-lg mx-auto">
            {getStatusDescription()}
          </p>

          {/* Order Status Bar */}
          <div className="bg-[#F8EDED] rounded-xl p-4 md:p-6 mb-6 border border-[#B43F3F]/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${order.orderStatus === 'Pending' ? 'bg-[#FF8225] animate-pulse' :
                    order.orderStatus === 'Processing' ? 'bg-[#B43F3F] animate-pulse' :
                      order.orderStatus === 'Shipped' ? 'bg-[#173B45] animate-pulse' :
                        order.orderStatus === 'Delivered' ? 'bg-green-500' :
                          'bg-red-500'
                  }`} />
                <span className="text-sm font-medium text-[#173B45]">
                  Status: <span className="text-[#B43F3F]">{order.orderStatus}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${order.paymentStatus === 'Paid' ? 'bg-green-500' :
                    order.paymentStatus === 'Pending' ? 'bg-[#FF8225] animate-pulse' :
                      'bg-red-500'
                  }`} />
                <span className="text-sm font-medium text-[#173B45]">
                  Payment: <span className="text-[#B43F3F]">{order.paymentStatus}</span>
                </span>
              </div>
              {order.trackingNumber && (
                <a
                  href={`https://track.shiprocket.in/${order.trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#FF8225] font-medium hover:text-[#B43F3F] transition-colors flex items-center gap-1"
                >
                  Track Shipment <ChevronRight size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F8EDED] rounded-xl p-4 border border-[#B43F3F]/10">
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 text-[#B43F3F] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-medium text-[#173B45]/40 uppercase tracking-wider mb-1">Order Number</p>
                  <p className="font-medium text-sm text-[#173B45]">{getOrderNumber()}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F8EDED] rounded-xl p-4 border border-[#B43F3F]/10">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#FF8225] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-medium text-[#173B45]/40 uppercase tracking-wider mb-1">Est. Delivery</p>
                  <p className="font-medium text-sm text-[#173B45]">{getEstimatedDelivery()}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-[#F8EDED] rounded-xl p-4 border border-[#B43F3F]/10">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#173B45] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-medium text-[#173B45]/40 uppercase tracking-wider mb-1">Shipping Address</p>
                  <p className="text-sm text-[#173B45]">
                    {order.shippingAddress.addressLine1}
                    {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                  <p className="text-xs text-[#173B45]/60 mt-1">Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-[#F8EDED] rounded-xl p-4 border border-[#B43F3F]/10">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#B43F3F] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-medium text-[#173B45]/40 uppercase tracking-wider mb-1">Confirmation Sent To</p>
                  <p className="text-sm text-[#173B45]">{order.user?.email || 'Email not available'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-[#B43F3F]/10 pt-6 mb-6">
            <h3 className="text-base md:text-lg font-display font-medium mb-4 text-[#173B45]">Order Summary</h3>

            {/* Product List - Mobile */}
            <div className="block md:hidden space-y-3 mb-4">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-[#F8EDED] rounded-lg">
                  <div className="w-12 h-14 bg-white rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.product?.images[0]?.url || ''}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#173B45] line-clamp-2 mb-1">
                      {item.product?.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#173B45]/60">Qty: {item.quantity}</span>
                      <span className="text-sm font-medium text-[#B43F3F]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Product List - Desktop */}
            <div className="hidden md:block space-y-2 mb-4">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm py-2 border-b border-[#B43F3F]/5">
                  <span className="text-[#173B45]">
                    {item.product?.name} <span className="text-[#173B45]/60">x {item.quantity}</span>
                  </span>
                  <span className="font-medium text-[#B43F3F]">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 bg-[#F8EDED] rounded-xl p-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#173B45]">Subtotal</span>
                <span className="font-medium text-[#173B45]">{formatPrice(order.itemsPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#173B45]">Shipping</span>
                <span className="font-medium text-[#173B45]">
                  {order.shippingPrice === 0 ? 'Free' : formatPrice(order.shippingPrice)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#173B45]">Tax (GST)</span>
                <span className="font-medium text-[#173B45]">{formatPrice(order.taxPrice)}</span>
              </div>
              <div className="flex justify-between text-base font-medium pt-3 mt-2 border-t border-[#B43F3F]/10">
                <span className="text-[#173B45]">Total</span>
                <span className="text-[#B43F3F]">{formatPrice(order.totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={`/orders/${order._id}`}
              className="px-6 py-3 bg-[#B43F3F] text-[#F8EDED] rounded-lg font-medium text-sm hover:bg-[#FF8225] transition-colors text-center"
            >
              View Order Details
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 border-2 border-[#B43F3F] text-[#B43F3F] rounded-lg font-medium text-sm hover:bg-[#B43F3F] hover:text-[#F8EDED] transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Order Help */}
          <div className="mt-6 pt-6 border-t border-[#B43F3F]/10 text-center">
            <p className="text-xs text-[#173B45]/60">
              Have questions about your order?{' '}
              <Link to="/contact" className="text-[#FF8225] font-medium hover:text-[#B43F3F] transition-colors">
                Contact our support team
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Related Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-[#173B45]/60 flex items-center justify-center gap-2">
            <Heart size={12} className="text-[#B43F3F]" />
            Loved your purchase? Explore more handwoven treasures
            <Link to="/collections" className="text-[#FF8225] font-medium hover:text-[#B43F3F] transition-colors">
              Browse Collections
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;