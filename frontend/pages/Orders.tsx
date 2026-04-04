import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, ChevronRight, Clock, AlertCircle, Search, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

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
    switch (status) {
      case 'Delivered':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'Processing':
      case 'Shipped':
        return <Truck size={16} className="text-[#B43F3F]" />;
      case 'Pending':
        return <Clock size={16} className="text-[#FF8225]" />;
      case 'Cancelled':
        return <AlertCircle size={16} className="text-red-600" />;
      default:
        return <Package size={16} className="text-[#173B45]" />;
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
    { id: 'all', label: 'All Orders', count: totalOrders },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.orderStatus === 'Pending').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.orderStatus === 'Delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.orderStatus === 'Cancelled').length }
  ];

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  if (loading && orders.length === 0) {
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

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <p className="text-[#FF8225] font-medium uppercase tracking-[0.3em] text-xs">My Account</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[#173B45]">
              Order <span className="text-[#B43F3F]">History</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white rounded-xl border border-[#B43F3F]/10">
              <p className="text-sm text-[#173B45]">
                <span className="font-medium text-[#B43F3F]">{totalOrders}</span> total orders
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl font-medium text-xs uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${filter === tab.id
                ? 'bg-[#B43F3F] text-[#F8EDED] shadow-md'
                : 'bg-white text-[#173B45] hover:bg-[#F8EDED] border border-[#B43F3F]/10'
                }`}
            >
              {tab.label}
              {tab.count > 0 && filter === tab.id && (
                <span className="bg-[#F8EDED] text-[#B43F3F] text-xs px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4 md:space-y-6">
          {orders.length > 0 ? (
            orders.map((order, idx) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md border border-[#B43F3F]/10 hover:shadow-lg transition-all"
              >
                {/* Mobile View */}
                <div className="block md:hidden">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-16 h-20 bg-[#F8EDED] rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={order.orderItems[0]?.product?.images[0]?.url || 'https://via.placeholder.com/200'}
                        className="w-full h-full object-cover"
                        alt={order.orderItems[0]?.product?.name || 'Product'}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-sm text-[#173B45]">
                          {getOrderNumber(order)}
                        </h3>
                        <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      <p className="text-xs text-[#173B45]/60 mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                      <p className="text-sm font-medium text-[#B43F3F] mt-2">
                        {formatPrice(order.totalPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#B43F3F]/10">
                    <Link
                      to={`/orders/${order._id}`}
                      className="flex-1 py-2.5 bg-[#B43F3F] text-[#F8EDED] rounded-lg text-xs font-medium text-center hover:bg-[#FF8225] transition-colors"
                    >
                      View Details
                    </Link>
                    {order.orderStatus === 'Shipped' && order.trackingNumber && (
                      <a
                        href={`https://track.shiprocket.in/${order.trackingNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 bg-white border border-[#B43F3F]/20 text-[#173B45] rounded-lg text-xs font-medium text-center hover:border-[#FF8225] hover:text-[#FF8225] transition-all"
                      >
                        Track
                      </a>
                    )}
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-32 bg-[#F8EDED] rounded-xl overflow-hidden flex-shrink-0 border border-[#B43F3F]/10">
                    <img
                      src={order.orderItems[0]?.product?.images[0]?.url || 'https://via.placeholder.com/200'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={order.orderItems[0]?.product?.name || 'Product'}
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1">
                    {/* Order Header */}
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-display font-medium text-[#173B45] mb-1">
                          {getOrderNumber(order)}
                        </h3>
                        <p className="text-xs font-medium text-[#173B45]/60 uppercase tracking-wider">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                        {getStatusIcon(order.orderStatus)}
                        {order.orderStatus}
                      </div>
                    </div>

                    {/* Order Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-[10px] font-medium text-[#173B45]/40 uppercase tracking-wider mb-1">Items</p>
                        <p className="text-sm font-medium text-[#173B45]">{order.orderItems.length} Product(s)</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-[#173B45]/40 uppercase tracking-wider mb-1">Amount</p>
                        <p className="text-sm font-medium text-[#B43F3F]">{formatPrice(order.totalPrice)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-[#173B45]/40 uppercase tracking-wider mb-1">Payment</p>
                        <p className="text-sm font-medium text-[#173B45] capitalize">{order.paymentStatus}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-[#173B45]/40 uppercase tracking-wider mb-1">Shipping</p>
                        <p className="text-sm font-medium text-[#173B45]">
                          {order.shippingPrice === 0 ? 'Free' : formatPrice(order.shippingPrice)}
                        </p>
                      </div>
                    </div>

                    {/* Product Preview */}
                    <div className="flex items-center gap-2 mb-3">
                      {order.orderItems.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-[#F8EDED] p-1.5 rounded-lg">
                          <img
                            src={item.product?.images[0]?.url || ''}
                            alt={item.product?.name}
                            className="w-6 h-6 object-cover rounded"
                          />
                          <span className="text-xs font-medium text-[#173B45]">x{item.quantity}</span>
                        </div>
                      ))}
                      {order.orderItems.length > 3 && (
                        <span className="text-xs text-[#173B45]/60">+{order.orderItems.length - 3} more</span>
                      )}
                    </div>

                    {/* Delivery Address Preview */}
                    <p className="text-xs text-[#173B45]/60 mb-4">
                      <span className="font-medium">Deliver to:</span> {order.shippingAddress.addressLine1}, {order.shippingAddress.city}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link
                        to={`/orders/${order._id}`}
                        className="px-5 py-2 bg-[#B43F3F] text-[#F8EDED] rounded-lg text-xs font-medium hover:bg-[#FF8225] transition-colors"
                      >
                        View Details
                      </Link>
                      {order.orderStatus === 'Shipped' && order.trackingNumber && (
                        <a
                          href={`https://track.shiprocket.in/${order.trackingNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2 bg-white border border-[#B43F3F]/20 text-[#173B45] rounded-lg text-xs font-medium hover:border-[#FF8225] hover:text-[#FF8225] transition-all flex items-center gap-2"
                        >
                          <Truck size={14} /> Track Order
                        </a>
                      )}
                      {order.orderStatus === 'Delivered' && (
                        <button className="px-5 py-2 bg-white border border-[#B43F3F]/20 text-[#173B45] rounded-lg text-xs font-medium hover:border-[#FF8225] hover:text-[#FF8225] transition-all flex items-center gap-2">
                          <Package size={14} /> Write Review
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
              className="bg-white rounded-xl md:rounded-2xl p-8 md:p-16 text-center shadow-md border border-[#B43F3F]/10"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F8EDED] rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={32} className="md:size-40 text-[#B43F3F]/30" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium text-[#173B45] mb-2">No orders yet</h2>
              <p className="text-sm text-[#173B45]/60 mb-6 max-w-md mx-auto">
                {filter === 'all'
                  ? "You haven't placed any orders yet. Start exploring our handwoven collection!"
                  : `No ${filter} orders found. Try checking other categories or view all orders.`}
              </p>
              <Link
                to="/shop"
                className="inline-block px-6 py-3 bg-[#B43F3F] text-[#F8EDED] rounded-lg font-medium text-sm hover:bg-[#FF8225] transition-colors"
              >
                Browse Collection
              </Link>
            </motion.div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-white border border-[#B43F3F]/10 rounded-lg disabled:opacity-50 hover:border-[#FF8225] transition-all text-sm text-[#173B45]"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[...Array(Math.min(3, totalPages))].map((_, i) => {
                let pageNum = page <= 2 ? i + 1 : page + i - 1;
                if (pageNum > totalPages) return null;
                return (
                  <button
                    key={i}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${page === pageNum
                      ? 'bg-[#B43F3F] text-[#F8EDED]'
                      : 'bg-white border border-[#B43F3F]/10 text-[#173B45] hover:border-[#FF8225]'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-white border border-[#B43F3F]/10 rounded-lg disabled:opacity-50 hover:border-[#FF8225] transition-all text-sm text-[#173B45]"
            >
              Next
            </button>
          </div>
        )}

        {/* Need Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-16 bg-gradient-to-r from-[#173B45] to-[#0f2a33] rounded-xl md:rounded-2xl p-6 md:p-8 text-center"
        >
          <h3 className="text-lg md:text-xl font-display font-medium text-[#F8EDED] mb-2">Need help with an order?</h3>
          <p className="text-sm text-[#F8EDED]/70 mb-4 max-w-lg mx-auto">
            Our artisan support team is here to assist you with any questions about your orders.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF8225] text-[#F8EDED] rounded-lg font-medium text-sm hover:bg-[#B43F3F] transition-colors"
          >
            Contact Support <ChevronRight size={14} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;