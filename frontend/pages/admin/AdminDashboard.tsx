import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, ShoppingBag, Users, TrendingUp, DollarSign, 
  Clock, CheckCircle, XCircle, Eye, ArrowUp, ArrowDown,
  Calendar, Filter, Download
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
      setStats(data.stats);
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
      Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Processing: 'bg-blue-100 text-blue-800 border-blue-200',
      Shipped: 'bg-purple-100 text-purple-800 border-purple-200',
      Delivered: 'bg-green-100 text-green-800 border-green-200',
      Cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <p className="font-bold">Error loading dashboard</p>
          <p className="text-sm mt-2">{error}</p>
          <button 
            onClick={fetchDashboardStats}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Welcome back, <span className="text-[#C40C0C]">{user?.name?.split(' ')[0] || 'Admin'}</span>
          </h1>
          <p className="text-gray-500 mt-2">Here's what's happening with your store today.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-[#C40C0C] focus:ring-2 focus:ring-[#C40C0C]/20 text-sm"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          
          <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats?.totalRevenue || 0)}
          icon={<DollarSign className="w-6 h-6" />}
          color="bg-green-500"
          trend={+12.5}
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={<ShoppingBag className="w-6 h-6" />}
          color="bg-blue-500"
          trend={+8.2}
        />
        <StatCard
          title="Total Products"
          value={stats?.totalProducts || 0}
          icon={<Package className="w-6 h-6" />}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Customers"
          value={stats?.totalUsers || 0}
          icon={<Users className="w-6 h-6" />}
          color="bg-orange-500"
          trend={+15.3}
        />
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatusBadge
          label="Pending"
          count={stats?.pendingOrders || 0}
          color="bg-yellow-100 text-yellow-800"
          icon={<Clock size={16} />}
        />
        <StatusBadge
          label="Processing"
          count={stats?.processingOrders || 0}
          color="bg-blue-100 text-blue-800"
          icon={<Package size={16} />}
        />
        <StatusBadge
          label="Shipped"
          count={stats?.shippedOrders || 0}
          color="bg-purple-100 text-purple-800"
          icon={<TrendingUp size={16} />}
        />
        <StatusBadge
          label="Delivered"
          count={stats?.deliveredOrders || 0}
          color="bg-green-100 text-green-800"
          icon={<CheckCircle size={16} />}
        />
        <StatusBadge
          label="Cancelled"
          count={stats?.cancelledOrders || 0}
          color="bg-red-100 text-red-800"
          icon={<XCircle size={16} />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-[#C40C0C] hover:underline flex items-center gap-1">
              View All <span>→</span>
            </Link>
          </div>
          
          <div className="space-y-4">
            {stats?.recentOrders?.length ? (
              stats.recentOrders.map((order) => (
                <Link
                  key={order._id}
                  to={`/admin/orders/${order._id}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(order.orderStatus).split(' ')[0]}`} />
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-[#C40C0C]">
                        #{order.orderNumber || order._id.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-500">{order.user?.name || 'Guest'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(order.totalPrice)}</p>
                    <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No recent orders</p>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Customers</h2>
            <Link to="/admin/users" className="text-sm text-[#C40C0C] hover:underline flex items-center gap-1">
              View All <span>→</span>
            </Link>
          </div>
          
          <div className="space-y-4">
            {stats?.recentUsers?.length ? (
              stats.recentUsers.map((user) => (
                <div key={user._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C40C0C] to-[#FF6500] rounded-full flex items-center justify-center text-white font-bold">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No recent users</p>
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Low Stock Alert</h2>
            <Link to="/admin/products?filter=lowStock" className="text-sm text-[#C40C0C] hover:underline flex items-center gap-1">
              Manage Stock <span>→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats?.lowStockProducts?.length ? (
              stats.lowStockProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/products/edit/${product._id}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={product.images[0]?.url || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Stock: {product.stock} units</p>
                    <p className="text-xs font-bold text-[#C40C0C] mt-1">{formatCurrency(product.price)}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                      Low Stock
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500 py-8">
                <Package className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p>All products are well stocked</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Top Selling</h2>
          <div className="space-y-4">
            {stats?.topProducts?.length ? (
              stats.topProducts.map((item, index) => (
                <div key={item._id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                    {index + 1}
                  </div>
                  <img
                    src={item.product.images[0]?.url || '/placeholder.jpg'}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Sold: {item.totalSold} units</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#C40C0C]">{formatCurrency(item.revenue)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No sales data</p>
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
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <div className={`${color.replace('bg-', 'text-')}`}>{icon}</div>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${
          trend > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const StatusBadge: React.FC<{
  label: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}> = ({ label, count, color, icon }) => (
  <div className={`${color} p-4 rounded-lg flex items-center justify-between border`}>
    <div>
      <p className="text-xs font-medium mb-1">{label}</p>
      <p className="text-xl font-bold">{count}</p>
    </div>
    <div className="p-2 bg-white bg-opacity-30 rounded-full">
      {icon}
    </div>
  </div>
);

export default AdminDashboard;