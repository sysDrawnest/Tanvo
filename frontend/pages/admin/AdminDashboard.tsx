import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, ShoppingBag, Users, TrendingUp, DollarSign,
  Clock, CheckCircle, XCircle, Eye, ArrowUp, ArrowDown,
  Calendar, Filter, Download, Plus, AlertCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import API from '../../services/api';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  recentOrders: Array<{
    _id: string;
    orderNumber: string;
    user: { name: string; email: string };
    totalPrice: number;
    orderStatus: string;
    awbNumber?: string;
    trackingStatus?: string;
    createdAt: string;
  }>;
  lowStockProducts: Array<{
    _id: string;
    name: string;
    stock: number;
    price: number;
    images: Array<{ url: string }>;
  }>;
  topProducts: Array<{
    _id: string;
    product: {
      _id: string;
      name: string;
      images: Array<{ url: string }>;
      price: number;
    };
    totalSold: number;
    revenue: number;
  }>;
  recentUsers: Array<{
    _id: string;
    name: string;
    email: string;
    createdAt: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const { user } = useStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('week');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, [dateRange]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await API.get('/admin/stats', {
        params: { range: dateRange }
      });
      if (data.success && data.stats) {
        setStats({
          ...data.stats.overview,
          recentOrders: data.stats.recentOrders,
          lowStockProducts: data.stats.lowStockProducts,
          topProducts: data.stats.topProducts,
          recentUsers: data.stats.recentUsers
        });
      }
    } catch (error: any) {
      console.error('Error fetching dashboard stats:', error);
      setError(error.response?.data?.message || 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-[#FF8225]/10 text-[#FF8225] border-[#FF8225]/20',
      Processing: 'bg-[#B43F3F]/10 text-[#B43F3F] border-[#B43F3F]/20',
      Shipped: 'bg-[#173B45]/10 text-[#173B45] border-[#173B45]/20',
      Delivered: 'bg-green-100 text-green-700 border-green-200',
      Cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-[#F8EDED] text-[#173B45] border-[#B43F3F]/10';
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8EDED]">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-[#B43F3F] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#FF8225] rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-red-500" />
          <p className="font-medium text-lg mb-2">Error loading dashboard</p>
          <p className="text-sm text-red-600/80 mb-4">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 bg-[#F8EDED] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-[#173B45]">
            Welcome back, <span className="text-[#B43F3F]">{user?.name?.split(' ')[0] || 'Admin'}</span>
          </h1>
          <p className="text-sm text-[#173B45]/60 mt-1">Here's what's happening with your store today.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/products/add"
            className="flex items-center gap-2 px-4 py-2 bg-[#B43F3F] text-[#F8EDED] rounded-lg hover:bg-[#FF8225] transition-colors shadow-md text-xs font-medium"
          >
            <Plus size={16} />
            Add Product
          </Link>

          {/* Date Range Selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-white border border-[#B43F3F]/10 rounded-lg focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 text-sm text-[#173B45]"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>

          <button className="p-2 bg-white border border-[#B43F3F]/10 rounded-lg hover:bg-[#F8EDED] transition-colors">
            <Download size={18} className="text-[#173B45]/60" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats?.totalRevenue || 0)}
          icon={<DollarSign className="w-5 h-5 md:w-6 md:h-6" />}
          color="bg-[#B43F3F]"
          trend={+12.5}
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={<ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />}
          color="bg-[#FF8225]"
          trend={+8.2}
        />
        <StatCard
          title="Total Products"
          value={stats?.totalProducts || 0}
          icon={<Package className="w-5 h-5 md:w-6 md:h-6" />}
          color="bg-[#173B45]"
        />
        <StatCard
          title="Total Customers"
          value={stats?.totalUsers || 0}
          icon={<Users className="w-5 h-5 md:w-6 md:h-6" />}
          color="bg-green-600"
          trend={+15.3}
        />
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
        <StatusBadge
          label="Pending"
          count={stats?.pendingOrders || 0}
          color="bg-[#FF8225]/10 text-[#FF8225]"
          icon={<Clock size={16} />}
        />
        <StatusBadge
          label="Processing"
          count={stats?.processingOrders || 0}
          color="bg-[#B43F3F]/10 text-[#B43F3F]"
          icon={<Package size={16} />}
        />
        <StatusBadge
          label="Shipped"
          count={stats?.shippedOrders || 0}
          color="bg-[#173B45]/10 text-[#173B45]"
          icon={<TrendingUp size={16} />}
        />
        <StatusBadge
          label="Delivered"
          count={stats?.deliveredOrders || 0}
          color="bg-green-100 text-green-700"
          icon={<CheckCircle size={16} />}
        />
        <StatusBadge
          label="Cancelled"
          count={stats?.cancelledOrders || 0}
          color="bg-red-100 text-red-700"
          icon={<XCircle size={16} />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#B43F3F]/10 p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base md:text-lg font-medium text-[#173B45]">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-[#FF8225] hover:text-[#B43F3F] transition-colors flex items-center gap-1">
              View All <span>→</span>
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.recentOrders?.length ? (
              stats.recentOrders.slice(0, 5).map((order) => (
                <Link
                  key={order._id}
                  to={`/admin/orders/${order._id}`}
                  className="flex items-center justify-between p-3 bg-[#F8EDED] rounded-lg hover:bg-[#F8EDED]/80 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(order.orderStatus).split(' ')[0]}`} />
                    <div>
                      <p className="text-sm font-medium text-[#173B45] group-hover:text-[#B43F3F] transition-colors">
                        #{order.orderNumber || order._id.slice(-8)}
                      </p>
                      <p className="text-xs text-[#173B45]/60">{order.user?.name || 'Guest'}</p>
                      {order.awbNumber && (
                        <p className="text-[10px] text-[#FF8225] mt-0.5 font-medium">AWB: {order.awbNumber}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#B43F3F]">{formatCurrency(order.totalPrice)}</p>
                    <p className="text-[10px] text-[#173B45]/50">{formatDate(order.createdAt)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-[#173B45]/50 py-6">No recent orders</p>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm border border-[#B43F3F]/10 p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base md:text-lg font-medium text-[#173B45]">Recent Customers</h2>
            <Link to="/admin/users" className="text-sm text-[#FF8225] hover:text-[#B43F3F] transition-colors flex items-center gap-1">
              View All <span>→</span>
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.recentUsers?.length ? (
              stats.recentUsers.slice(0, 5).map((user) => (
                <div key={user._id} className="flex items-center gap-3 p-3 bg-[#F8EDED] rounded-lg">
                  <div className="w-8 h-8 bg-[#B43F3F] rounded-full flex items-center justify-center text-[#F8EDED] font-medium text-sm">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#173B45] truncate">{user.name}</p>
                    <p className="text-xs text-[#173B45]/60 truncate">{user.email}</p>
                  </div>
                  <div className="text-[10px] text-[#173B45]/40 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-[#173B45]/50 py-6">No recent users</p>
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#B43F3F]/10 p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base md:text-lg font-medium text-[#173B45]">Low Stock Alert</h2>
            <Link to="/admin/products?filter=lowStock" className="text-sm text-[#FF8225] hover:text-[#B43F3F] transition-colors flex items-center gap-1">
              Manage Stock <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stats?.lowStockProducts?.length ? (
              stats.lowStockProducts.slice(0, 4).map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/products/edit/${product._id}`}
                  className="flex items-center gap-3 p-3 bg-[#F8EDED] rounded-lg hover:bg-[#F8EDED]/80 transition-colors"
                >
                  <img
                    src={product.images[0]?.url || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg border border-[#B43F3F]/10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#173B45] truncate">{product.name}</p>
                    <p className="text-xs text-[#173B45]/60 mt-1">Stock: {product.stock} units</p>
                    <p className="text-xs font-medium text-[#B43F3F] mt-0.5">{formatCurrency(product.price)}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full whitespace-nowrap">
                      Low Stock
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center text-[#173B45]/50 py-8">
                <Package className="w-10 h-10 mx-auto text-[#173B45]/20 mb-2" />
                <p className="text-sm">All products are well stocked</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-[#B43F3F]/10 p-4 md:p-6">
          <h2 className="text-base md:text-lg font-medium text-[#173B45] mb-4">Top Selling</h2>
          <div className="space-y-3">
            {stats?.topProducts?.length ? (
              stats.topProducts.slice(0, 5).map((item, index) => (
                <div key={item._id} className="flex items-center gap-3 p-2 hover:bg-[#F8EDED] rounded-lg transition-colors">
                  <div className="w-6 h-6 bg-[#F8EDED] rounded-full flex items-center justify-center text-xs font-medium text-[#B43F3F]">
                    {index + 1}
                  </div>
                  <img
                    src={item.product.images[0]?.url || '/placeholder.jpg'}
                    alt={item.product.name}
                    className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-lg border border-[#B43F3F]/10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-[#173B45] truncate">{item.product.name}</p>
                    <p className="text-[10px] text-[#173B45]/60">Sold: {item.totalSold} units</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs md:text-sm font-medium text-[#B43F3F]">{formatCurrency(item.revenue)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-[#173B45]/50 py-6">No sales data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  trend?: number;
}> = ({ title, value, icon, color, trend }) => (
  <div className="bg-white rounded-xl shadow-sm border border-[#B43F3F]/10 p-4 md:p-6 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2 md:p-3 rounded-lg ${color} bg-opacity-10`}>
        <div className={`${color.replace('bg-', 'text-')}`}>{icon}</div>
      </div>
      {trend && (
        <div className={`flex items-center gap-0.5 text-[10px] md:text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
          {trend > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <h3 className="text-xs text-[#173B45]/60 mb-1">{title}</h3>
    <p className="text-lg md:text-xl lg:text-2xl font-medium text-[#173B45]">{value}</p>
  </div>
);

const StatusBadge: React.FC<{
  label: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}> = ({ label, count, color, icon }) => (
  <div className={`${color} p-3 md:p-4 rounded-lg flex items-center justify-between border border-current/10`}>
    <div>
      <p className="text-[10px] md:text-xs font-medium mb-0.5 md:mb-1">{label}</p>
      <p className="text-sm md:text-base lg:text-lg font-medium">{count}</p>
    </div>
    <div className="p-1.5 md:p-2 bg-white bg-opacity-30 rounded-full">
      {icon}
    </div>
  </div>
);

export default AdminDashboard;