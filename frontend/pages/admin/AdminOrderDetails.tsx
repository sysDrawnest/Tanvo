import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle,
  User, MapPin, Phone, Mail, Calendar, DollarSign,
  CreditCard, Printer, Download, Send, Edit, Save,
  AlertCircle, ShoppingBag, FileText, MessageSquare
} from 'lucide-react';
import API from '../../services/api';

interface OrderItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: Array<{ url: string }>;
    weave?: string;
    fabric?: string;
  };
  name: string;
  quantity: number;
  price: number;
  image: string;
  color?: string;
  size?: string;
}

interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone?: string;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  orderItems: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  discountPrice?: number;
  couponCode?: string;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  deliveredAt?: string;
  cancelledAt?: string;
  trackingNumber?: string;
  shiprocketOrderId?: string;
  awbNumber?: string;
  trackingStatus?: string;
  trackingHistory?: any[];
  estimatedDelivery?: string;

  notes?: string;
  isGift?: boolean;
  giftMessage?: string;
  createdAt: string;
  updatedAt?: string;
}

const AdminOrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/admin/orders/${id}`);
      setOrder(data.order);
      setTrackingNumber(data.order.trackingNumber || '');
      setEstimatedDelivery(data.order.estimatedDelivery ?
        new Date(data.order.estimatedDelivery).toISOString().split('T')[0] : '');
      setAdminNotes(data.order.notes || '');
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (status: string) => {
    try {
      setUpdating(true);
      await API.put(`/admin/orders/${id}/status`, {
        orderStatus: status,
        trackingNumber,
        estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : undefined
      });
      await fetchOrder();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const updatePaymentStatus = async (status: string) => {
    try {
      setUpdating(true);
      await API.put(`/admin/orders/${id}/payment`, { paymentStatus: status });
      await fetchOrder();
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Failed to update payment status');
    } finally {
      setUpdating(false);
    }
  };

  const updateTrackingInfo = async () => {
    try {
      setUpdating(true);
      await API.put(`/admin/orders/${id}/tracking`, {
        trackingNumber,
        estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : undefined
      });
      await fetchOrder();
      alert('Tracking information updated successfully');
    } catch (error) {
      console.error('Error updating tracking info:', error);
      alert('Failed to update tracking information');
    } finally {
      setUpdating(false);
    }
  };

  const updateNotes = async () => {
    try {
      setUpdating(true);
      await API.put(`/admin/orders/${id}/notes`, { notes: adminNotes });
      await fetchOrder();
      setShowNotes(false);
    } catch (error) {
      console.error('Error updating notes:', error);
      alert('Failed to update notes');
    } finally {
      setUpdating(false);
    }
  };

  const sendEmailNotification = async () => {
    try {
      setUpdating(true);
      await API.post(`/admin/orders/${id}/notify`, {
        subject: emailSubject,
        message: emailMessage
      });
      setShowEmailModal(false);
      alert('Email notification sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email notification');
    } finally {
      setUpdating(false);
    }
  };

  const printOrder = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !order) return;

    const styles = `
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .order-info { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f5f5f5; }
        .total { text-align: right; font-weight: bold; }
        .address { margin-bottom: 20px; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
      </style>
    `;

    const content = `
      <html>
        <head><title>Order #${order._id.slice(-8)}</title>${styles}</head>
        <body>
          <div class="header">
            <h1>Order Invoice</h1>
            <p>Order #${order._id}</p>
          </div>
          
          <div class="order-info">
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Customer:</strong> ${order.user.name}</p>
            <p><strong>Email:</strong> ${order.user.email}</p>
            <p><strong>Phone:</strong> ${order.user.phone || 'N/A'}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Order Status:</strong> ${order.orderStatus}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
          </div>
          
          <h3>Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.orderItems.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.price.toLocaleString()}</td>
                  <td>₹${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="total">
            <p>Subtotal: ₹${order.itemsPrice.toLocaleString()}</p>
            <p>Shipping: ₹${order.shippingPrice.toLocaleString()}</p>
            <p>Tax: ₹${order.taxPrice.toLocaleString()}</p>
            ${order.discountPrice ? `<p>Discount: -₹${order.discountPrice.toLocaleString()}</p>` : ''}
            <h3>Total: ₹${order.totalPrice.toLocaleString()}</h3>
          </div>
          
          <div class="address">
            <h3>Shipping Address</h3>
            <p>${order.shippingAddress.addressLine1}</p>
            ${order.shippingAddress.addressLine2 ? `<p>${order.shippingAddress.addressLine2}</p>` : ''}
            <p>${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
            <p>${order.shippingAddress.country}</p>
          </div>
          
          <div class="footer">
            <p>Generated on ${new Date().toLocaleString()}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  const downloadInvoice = () => {
    if (!order) return;

    const invoiceData = {
      orderId: order._id,
      date: order.createdAt,
      customer: order.user,
      items: order.orderItems,
      totals: {
        subtotal: order.itemsPrice,
        shipping: order.shippingPrice,
        tax: order.taxPrice,
        discount: order.discountPrice,
        total: order.totalPrice
      },
      address: order.shippingAddress
    };

    const blob = new Blob([JSON.stringify(invoiceData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-${order._id.slice(-8)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Shipped': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'Processing': return <Package className="w-5 h-5 text-purple-600" />;
      case 'Pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Cancelled': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Package className="w-5 h-5 text-gray-600" />;
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
    return colors[status] || 'bg-gray-100 text-[#0D0B0A]';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Paid: 'bg-green-100 text-green-800',
      Failed: 'bg-red-100 text-red-800',
      Refunded: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-[#0D0B0A]';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#0D0B0A] mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-6">The order you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/admin/orders')}
          className="px-6 py-2 bg-[#C9A84C] text-white rounded-lg hover:bg-[#E8C97A] transition-colors"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/orders')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold text-[#0D0B0A]">
              Order #{order._id.slice(-8)}
            </h1>
            <p className="text-gray-500 mt-1">Placed on {formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowEmailModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Send size={18} />
            Notify Customer
          </button>
          <button
            onClick={printOrder}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer size={18} />
            Print
          </button>
          <button
            onClick={downloadInvoice}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Status</p>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon(order.orderStatus)}
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>
            </div>
          </div>

          <select
            value={order.orderStatus}
            onChange={(e) => updateOrderStatus(e.target.value)}
            disabled={updating}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <span className={`mt-1 px-3 py-1 text-sm rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                {order.paymentStatus}
              </span>
            </div>
          </div>

          <select
            value={order.paymentStatus}
            onChange={(e) => updatePaymentStatus(e.target.value)}
            disabled={updating}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Truck className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tracking Info</p>
              {order.awbNumber || order.trackingNumber ? (
                <p className="text-sm font-medium mt-1">#{order.awbNumber || order.trackingNumber}</p>
              ) : (
                <p className="text-xs text-gray-400 mt-1 italic">Not yet assigned</p>
              )}
              {order.trackingStatus && (
                <p className="text-xs font-bold text-blue-600 mt-1 uppercase tracking-wider">{order.trackingStatus}</p>
              )}

            </div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Tracking Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
            />
            <input
              type="date"
              placeholder="Estimated Delivery"
              value={estimatedDelivery}
              onChange={(e) => setEstimatedDelivery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
            />
            <button
              onClick={updateTrackingInfo}
              disabled={updating}
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Update Tracking
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold mb-6">Order Items</h2>

            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image || item.product?.images[0]?.url || '/placeholder.jpg'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product?._id}`}
                      className="font-bold text-[#0D0B0A] hover:text-[#C9A84C] transition-colors"
                    >
                      {item.name}
                    </Link>

                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p className="font-medium">{item.quantity}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Unit Price</p>
                        <p className="font-medium">{formatCurrency(item.price)}</p>
                      </div>
                      {item.color && (
                        <div>
                          <p className="text-gray-500">Color</p>
                          <p className="font-medium">{item.color}</p>
                        </div>
                      )}
                      {item.size && (
                        <div>
                          <p className="text-gray-500">Size</p>
                          <p className="font-medium">{item.size}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-gray-500">Total</p>
                        <p className="font-bold text-[#C9A84C]">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Shipping Address</h2>
              <button
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(
                  `${order.shippingAddress.addressLine1} ${order.shippingAddress.city} ${order.shippingAddress.pincode}`
                )}`)}
                className="text-sm text-[#C9A84C] hover:underline"
              >
                View on Maps
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && (
                      <p className="text-gray-600">{order.shippingAddress.addressLine2}</p>
                    )}
                    <p className="text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                    </p>
                    <p className="text-gray-600">{order.shippingAddress.country}</p>
                  </div>
                </div>

                {order.shippingAddress.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a href={`tel:${order.shippingAddress.phone}`} className="text-[#C9A84C] hover:underline">
                      {order.shippingAddress.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{order.user.name}</p>
                    <a href={`mailto:${order.user.email}`} className="text-[#C9A84C] hover:underline text-sm">
                      {order.user.email}
                    </a>
                  </div>
                </div>

                {order.isGift && order.giftMessage && (
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <p className="text-sm font-medium text-pink-800 mb-1">🎁 Gift Message</p>
                    <p className="text-sm text-pink-600">"{order.giftMessage}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(order.itemsPrice)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {order.shippingPrice === 0 ? 'Free' : formatCurrency(order.shippingPrice)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (GST)</span>
                <span className="font-medium">{formatCurrency(order.taxPrice)}</span>
              </div>

              {order.discountPrice && order.discountPrice > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(order.discountPrice)}</span>
                </div>
              )}

              {order.couponCode && (
                <div className="bg-green-50 p-2 rounded-lg text-sm text-green-700">
                  Coupon applied: <span className="font-bold">{order.couponCode}</span>
                </div>
              )}

              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl text-[#C9A84C]">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium capitalize">{order.paymentMethod}</span>
                </div>

                {order.paymentResult && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-medium text-xs">{order.paymentResult.id}</span>
                  </div>
                )}

                {order.deliveredAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Delivered On</span>
                    <span className="font-medium">{formatDate(order.deliveredAt)}</span>
                  </div>
                )}

                {order.cancelledAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Cancelled On</span>
                    <span className="font-medium">{formatDate(order.cancelledAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Admin Notes</h3>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit size={16} />
              </button>
            </div>

            {showNotes ? (
              <div className="space-y-3">
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  placeholder="Add private notes about this order..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={updateNotes}
                    disabled={updating}
                    className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    Save Notes
                  </button>
                  <button
                    onClick={() => {
                      setAdminNotes(order.notes || '');
                      setShowNotes(false);
                    }}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">
                {order.notes || 'No notes added yet.'}
              </p>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold mb-4">Order Timeline</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShoppingBag className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Order Placed</p>
                  <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
              </div>

              {order.orderStatus !== 'Pending' && (
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${order.orderStatus === 'Processing' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                    <Package className={`w-3 h-3 ${order.orderStatus === 'Processing' ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                  </div>
                  <div>
                    <p className="font-medium">Processing</p>
                    {order.updatedAt && order.orderStatus === 'Processing' && (
                      <p className="text-sm text-gray-500">{formatDate(order.updatedAt)}</p>
                    )}
                  </div>
                </div>
              )}

              {order.orderStatus === 'Shipped' && (
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Truck className="w-3 h-3 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Shipped</p>
                    {order.trackingNumber && (
                      <p className="text-sm text-gray-500">Tracking: {order.trackingNumber}</p>
                    )}
                    {order.updatedAt && (
                      <p className="text-sm text-gray-500">{formatDate(order.updatedAt)}</p>
                    )}
                  </div>
                </div>
              )}

              {order.orderStatus === 'Delivered' && (
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Delivered</p>
                    {order.deliveredAt && (
                      <p className="text-sm text-gray-500">{formatDate(order.deliveredAt)}</p>
                    )}
                  </div>
                </div>
              )}

              {order.orderStatus === 'Cancelled' && (
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XCircle className="w-3 h-3 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Cancelled</p>
                    {order.cancelledAt && (
                      <p className="text-sm text-gray-500">{formatDate(order.cancelledAt)}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Email Notification Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">Send Email Notification</h2>
                <p className="text-sm text-gray-500 mt-1">Notify customer about order update</p>
              </div>
              <button
                onClick={() => setShowEmailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="e.g., Your order has been shipped"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  placeholder="Write your message here..."
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  This email will be sent to <strong>{order.user.email}</strong>
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={sendEmailNotification}
                disabled={updating || !emailSubject || !emailMessage}
                className="flex-1 px-4 py-2 bg-[#C9A84C] text-white rounded-lg hover:bg-[#E8C97A] transition-colors disabled:opacity-50"
              >
                Send Email
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay for Updates */}
      {updating && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div>
            <span>Updating...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetails;

// AdminOrders.tsx (List View)                 AdminOrderDetails.tsx (Detail View)
//       │                                              │
//       │                                              │
//       │  Click "View" on an order                    │
//       └─────────────────>  ──────────────────────────┘
//                          Shows detailed information
//                          for that specific order
