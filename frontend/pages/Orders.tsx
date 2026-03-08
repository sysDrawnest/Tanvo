import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import API from '../services/api';

interface OrderItem {
  product: {
    _id: string;
    name: string;
    images: Array<{ url: string; isPrimary: boolean }>;
  };
  quantity: number;
  price: number;
}

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
  deliveredAt?: string;
  trackingNumber?: string;
  orderItems: OrderItem[];
  shippingAddress: {
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
  };
}

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [filter, setFilter] = useState<'all' | 'pending' | 'delivered' | 'cancelled'>('all');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?redirect=orders');
    }
  }, [isAuthenticated, navigate]);

  // Fetch orders
  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, page, filter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params: any = {
        page,
        limit: 5
      };

      if (filter !== 'all') {
        params.status = filter;
      }

      const { data } = await API.get('/orders/my-orders', { params });
      setOrders(data.orders);
      setTotalPages(data.pages);
      setTotalOrders(data.total);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Delivered':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'Processing':
      case 'Shipped':
        return <Truck size={16} className="text-blue-600" />;
      case 'Pending':
        return <Clock size={16} className="text-orange-600" />;
      case 'Cancelled':
        return <AlertCircle size={16} className="text-red-600" />;
      default:
        return <Package size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-orange-50 text-orange-600',
      Processing: 'bg-blue-50 text-blue-600',
      Shipped: 'bg-purple-50 text-purple-600',
      Delivered: 'bg-green-50 text-green-600',
      Cancelled: 'bg-red-50 text-red-600'
    };
    return colors[status] || 'bg-gray-50 text-gray-600';
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

  const getOrderNumber = (order: Order) => {
    return `#${order._id.slice(-8).toUpperCase()}`;
  };

  const filterTabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-40 pb-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-24">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <p className="text-[#C40C0C] font-black uppercase tracking-[0.3em] text-xs">My Account</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold">
              Order <br /><span className="text-[#F6CE71]">History</span>
            </h1>
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
            Total Orders: {totalOrders}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-[#C40C0C] text-white shadow-lg'
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-8">
          {orders.length > 0 ? (
            orders.map((order, idx) => (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 group hover:border-[#FF6500]/20 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-10">
                  {/* Product Image */}
                  <div className="w-32 h-40 bg-gray-100 rounded-3xl overflow-hidden shrink-0">
                    <img 
                      src={order.orderItems[0]?.product?.images[0]?.url || 'https://via.placeholder.com/200'} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={order.orderItems[0]?.product?.name || 'Product'}
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Order Header */}
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">
                            {getOrderNumber(order)}
                          </h3>
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        
                        {/* Status Badge */}
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm ${getStatusColor(order.orderStatus)}`}>
                          {getStatusIcon(order.orderStatus)}
                          {order.orderStatus}
                        </div>
                      </div>

                      {/* Order Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Items</p>
                          <p className="text-lg font-bold text-gray-900">{order.orderItems.length} Product(s)</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Amount</p>
                          <p className="text-lg font-bold text-gray-900">{formatPrice(order.totalPrice)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment</p>
                          <p className="text-lg font-bold text-gray-900 capitalize">{order.paymentStatus}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Shipping</p>
                          <p className="text-lg font-bold text-gray-900">
                            {order.shippingPrice === 0 ? 'Free' : formatPrice(order.shippingPrice)}
                          </p>
                        </div>
                      </div>

                      {/* Product Preview */}
                      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                        {order.orderItems.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                            <img 
                              src={item.product?.images[0]?.url || ''} 
                              alt={item.product?.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                            <span className="text-xs font-medium">x{item.quantity}</span>
                          </div>
                        ))}
                        {order.orderItems.length > 3 && (
                          <span className="text-xs text-gray-500">+{order.orderItems.length - 3} more</span>
                        )}
                      </div>

                      {/* Delivery Address Preview */}
                      <div className="text-xs text-gray-500 mb-4">
                        <span className="font-bold">Deliver to:</span> {order.shippingAddress.addressLine1}, {order.shippingAddress.city}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to={`/orders/${order._id}`}
                        className="px-8 py-3 bg-black text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#C40C0C] transition-colors shadow-lg text-center"
                      >
                        View Details
                      </Link>
                      {order.orderStatus === 'Shipped' && order.trackingNumber && (
                        <a
                          href={`https://track.shiprocket.in/${order.trackingNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-3 bg-white text-gray-900 border-2 border-gray-100 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-[#FF6500] hover:text-[#FF6500] transition-all flex items-center justify-center gap-2"
                        >
                          <Truck size={14} /> Track Order
                        </a>
                      )}
                      {order.orderStatus === 'Delivered' && (
                        <button className="px-8 py-3 bg-white text-gray-900 border-2 border-gray-100 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-[#FF6500] hover:text-[#FF6500] transition-all flex items-center justify-center gap-2">
                          <Package size={14} /> Write a Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-16 text-center shadow-xl"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package size={48} className="text-gray-300" />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">No orders yet</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {filter === 'all' 
                  ? "You haven't placed any orders yet. Start exploring our collection!"
                  : `No ${filter} orders found. Try checking other categories or view all orders.`}
              </p>
              <Link
                to="/shop"
                className="inline-block px-8 py-4 bg-[#C40C0C] text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#FF6500] transition-colors shadow-lg"
              >
                Browse Collections
              </Link>
            </motion.div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-6 py-3 bg-white border border-gray-200 rounded-xl disabled:opacity-50 hover:border-[#C40C0C] transition-all font-bold text-sm"
            >
              Previous
            </button>
            <span className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-6 py-3 bg-white border border-gray-200 rounded-xl disabled:opacity-50 hover:border-[#C40C0C] transition-all font-bold text-sm"
            >
              Next
            </button>
          </div>
        )}

        {/* Need Help Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-[2.5rem] p-10 text-white text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">Need help with an order?</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Our customer support team is here to assist you with any questions about your orders.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C40C0C] text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#FF6500] transition-colors"
          >
            Contact Support <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;