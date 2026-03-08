import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Calendar, MapPin, Mail, Truck, Clock, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import API from '../services/api';

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
      // If no ID provided, try to get the most recent order
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
    
    // Calculate estimated delivery (3-5 business days from order date)
    if (order?.createdAt) {
      const orderDate = new Date(order.createdAt);
      const estimated = new Date(orderDate);
      estimated.setDate(estimated.getDate() + 5); // Add 5 days
      return formatDate(estimated.toISOString());
    }
    
    return 'Not available';
  };

  const getStatusIcon = () => {
    if (!order) return <CheckCircle className="w-12 h-12 text-green-600" />;
    
    switch(order.orderStatus) {
      case 'Delivered':
        return <CheckCircle className="w-12 h-12 text-green-600" />;
      case 'Cancelled':
        return <AlertCircle className="w-12 h-12 text-red-600" />;
      case 'Shipped':
        return <Truck className="w-12 h-12 text-blue-600" />;
      case 'Processing':
        return <Package className="w-12 h-12 text-orange-600" />;
      default:
        return <Clock className="w-12 h-12 text-yellow-600" />;
    }
  };

  const getStatusMessage = () => {
    if (!order) return 'Thank You for Your Order!';
    
    switch(order.orderStatus) {
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
    
    switch(order.orderStatus) {
      case 'Delivered':
        return 'We hope you love your heritage treasure. Share your experience with a review!';
      case 'Cancelled':
        return 'Your order has been cancelled. Any refunds will be processed within 5-7 business days.';
      case 'Shipped':
        return 'Your order is on its way! Track it using the tracking number below.';
      case 'Processing':
        return 'Your order is being carefully prepared by our artisans.';
      default:
        return 'Your heritage treasure has been successfully booked.';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-24">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900">
              Order Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {error || "We couldn't find the order you're looking for."}
            </p>
            <Link 
              to="/shop" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-24">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          {/* Status Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            {getStatusIcon()}
          </div>
          
          {/* Status Message */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] bg-clip-text text-transparent">
            {getStatusMessage()}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            {getStatusDescription()}
          </p>

          {/* Order Status Bar */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  order.orderStatus === 'Pending' ? 'bg-yellow-500 animate-pulse' :
                  order.orderStatus === 'Processing' ? 'bg-blue-500 animate-pulse' :
                  order.orderStatus === 'Shipped' ? 'bg-purple-500 animate-pulse' :
                  order.orderStatus === 'Delivered' ? 'bg-green-500' :
                  'bg-red-500'
                }`} />
                <span className="font-bold text-gray-900">Status: {order.orderStatus}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  order.paymentStatus === 'Paid' ? 'bg-green-500' :
                  order.paymentStatus === 'Pending' ? 'bg-yellow-500 animate-pulse' :
                  'bg-red-500'
                }`} />
                <span className="font-bold text-gray-900">Payment: {order.paymentStatus}</span>
              </div>
              {order.trackingNumber && (
                <a 
                  href={`https://track.shiprocket.in/${order.trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C40C0C] font-bold text-sm hover:underline"
                >
                  Track Shipment →
                </a>
              )}
            </div>
          </div>
          
          {/* Order Details Grid */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-[#C40C0C] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Order Number</p>
                  <p className="font-bold text-lg text-gray-900">{getOrderNumber()}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#C40C0C] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Estimated Delivery</p>
                  <p className="font-bold text-lg text-gray-900">{getEstimatedDelivery()}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 md:col-span-2">
                <MapPin className="w-5 h-5 text-[#C40C0C] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Shipping Address</p>
                  <p className="font-medium text-gray-900">
                    {order.shippingAddress.addressLine1}
                    {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 md:col-span-2">
                <Mail className="w-5 h-5 text-[#C40C0C] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Confirmation Sent To</p>
                  <p className="font-medium text-gray-900">{order.user?.email || 'Email not available'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="text-lg font-serif font-bold mb-4 text-left">Order Summary</h3>
            <div className="space-y-3 text-left">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product?.name} x {item.quantity}
                  </span>
                  <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-gray-900">{formatPrice(order.itemsPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold text-gray-900">
                    {order.shippingPrice === 0 ? 'Free' : formatPrice(order.shippingPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (GST)</span>
                  <span className="font-bold text-gray-900">{formatPrice(order.taxPrice)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#C40C0C]">{formatPrice(order.totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to={`/orders/${order._id}`}
              className="px-8 py-4 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              View Order Details
            </Link>
            <Link 
              to="/shop" 
              className="px-8 py-4 border-2 border-[#C40C0C] text-[#C40C0C] font-bold rounded-full hover:bg-[#C40C0C]/5 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Order Help */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Have questions about your order? <Link to="/contact" className="text-[#C40C0C] font-bold hover:underline">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;