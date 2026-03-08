// import React, { useState } from 'react';
// import { Package, ShoppingBag, Users, TrendingUp, Plus, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
// import { MOCK_PRODUCTS } from '../constants';
// import { useStore } from '../context/StoreContext';
// // Correctly importing Navigate component from react-router-dom
// import { Navigate } from "react-router-dom";

// const Admin: React.FC = () => {
//   const { isAdmin } = useStore();
//   const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

//   if (!isAdmin) return <Navigate to="/" />;

//   const stats = [
//     { label: 'Total Sales', value: '₹4,52,000', icon: <TrendingUp className="text-green-600" />, color: 'bg-green-50' },
//     { label: 'Orders', value: '124', icon: <ShoppingBag className="text-blue-600" />, color: 'bg-blue-50' },
//     { label: 'Products', value: '48', icon: <Package className="text-maroon" />, color: 'bg-red-50' },
//     { label: 'Customers', value: '1,200', icon: <Users className="text-indigo-600" />, color: 'bg-indigo-50' },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
//         <div>
//           <h1 className="text-3xl font-serif font-bold text-slate-900">Admin Dashboard</h1>
//           <p className="text-sm text-slate-500 font-medium mt-1">Manage your handloom legacy and operations.</p>
//         </div>
//         <button className="bg-maroon text-white px-6 py-3 font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg">
//           <Plus size={16} /> Add New Product
//         </button>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
//         {stats.map((stat, i) => (
//           <div key={i} className={`${stat.color} p-6 border border-white/50 shadow-sm rounded-xl`}>
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{stat.label}</span>
//               {stat.icon}
//             </div>
//             <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
//           </div>
//         ))}
//       </div>

//       {/* Tabs */}
//       <div className="bg-white border border-slate-100 shadow-sm">
//         <div className="flex border-b border-slate-100">
//           <button 
//             onClick={() => setActiveTab('products')}
//             className={`px-8 py-5 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'products' ? 'border-maroon text-maroon' : 'border-transparent text-slate-400'}`}
//           >
//             Inventory
//           </button>
//           <button 
//             onClick={() => setActiveTab('orders')}
//             className={`px-8 py-5 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'orders' ? 'border-maroon text-maroon' : 'border-transparent text-slate-400'}`}
//           >
//             Live Orders
//           </button>
//         </div>

//         <div className="p-6 overflow-x-auto">
//           {activeTab === 'products' ? (
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
//                   <th className="pb-4 font-bold">Product Details</th>
//                   <th className="pb-4 font-bold">Category</th>
//                   <th className="pb-4 font-bold">Price</th>
//                   <th className="pb-4 font-bold">Stock</th>
//                   <th className="pb-4 font-bold">Status</th>
//                   <th className="pb-4 font-bold text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50">
//                 {MOCK_PRODUCTS.map(product => (
//                   <tr key={product.id} className="group hover:bg-slate-50 transition-colors">
//                     <td className="py-4">
//                       <div className="flex items-center gap-3">
//                         <img src={product.images[0]} className="w-12 h-12 object-cover" alt="" />
//                         <div>
//                           <p className="font-bold text-slate-800 text-sm">{product.name}</p>
//                           <p className="text-xs text-slate-400 italic font-medium">{product.weave}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 text-sm text-slate-600">{product.category}</td>
//                     <td className="py-4 text-sm font-bold text-slate-800">₹{product.price.toLocaleString()}</td>
//                     <td className="py-4 text-sm text-slate-600">{product.stock} units</td>
//                     <td className="py-4">
//                       <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${product.stock > 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                         {product.stock > 5 ? 'Available' : 'Low Stock'}
//                       </span>
//                     </td>
//                     <td className="py-4 text-right">
//                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Edit size={16} /></button>
//                         <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div className="space-y-4">
//               {[
//                 { id: '#ORD-2451', user: 'Ananya Rao', date: 'Today, 10:24 AM', amount: '₹12,500', status: 'Processing' },
//                 { id: '#ORD-2450', user: 'Vikram Singh', date: 'Today, 09:15 AM', amount: '₹4,500', status: 'Shipped' },
//                 { id: '#ORD-2449', user: 'Deepa Meher', date: 'Yesterday, 11:30 PM', amount: '₹18,200', status: 'Delivered' }
//               ].map(order => (
//                 <div key={order.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-slate-50 hover:border-maroon/20 transition-all gap-4">
//                   <div className="flex items-center gap-4">
//                     <div className={`p-3 rounded-full ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
//                       {order.status === 'Delivered' ? <CheckCircle size={20} /> : <Clock size={20} />}
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-slate-800">{order.id}</h4>
//                       <p className="text-xs text-slate-500 font-medium">{order.user} • {order.date}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-10">
//                     <div className="text-right">
//                       <p className="text-sm font-bold text-slate-900">{order.amount}</p>
//                       <p className={`text-[10px] uppercase font-bold tracking-widest ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Shipped' ? 'text-blue-600' : 'text-orange-600'}`}>{order.status}</p>
//                     </div>
//                     <button className="text-xs font-bold uppercase tracking-widest text-maroon border-b border-maroon">View Details</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;
import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, Users, TrendingUp, Plus, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Navigate, Link } from "react-router-dom";
import API from '../services/api';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
}

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  totalPrice: number;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: string;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  weave: string;
  stock: number;
  images: Array<{ url: string }>;
}

const Admin: React.FC = () => {
  const { isAdmin } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Redirect if not admin
  if (!isAdmin) return <Navigate to="/" />;

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await API.get('/admin/stats');
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/admin/products?limit=10');
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/admin/orders?limit=5');
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await API.delete(`/admin/products/${productId}`);
      // Refresh products list
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
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
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-orange-100 text-orange-600',
      Processing: 'bg-blue-100 text-blue-600',
      Shipped: 'bg-purple-100 text-purple-600',
      Delivered: 'bg-green-100 text-green-600',
      Cancelled: 'bg-red-100 text-red-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Delivered':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'Cancelled':
        return <Clock size={20} className="text-red-600" />;
      default:
        return <Clock size={20} className="text-orange-600" />;
    }
  };

  const statsCards = [
    { 
      label: 'Total Revenue', 
      value: formatCurrency(stats.totalRevenue), 
      icon: <TrendingUp className="text-green-600" />, 
      color: 'bg-green-50' 
    },
    { 
      label: 'Total Orders', 
      value: stats.totalOrders.toString(), 
      icon: <ShoppingBag className="text-blue-600" />, 
      color: 'bg-blue-50' 
    },
    { 
      label: 'Total Products', 
      value: stats.totalProducts.toString(), 
      icon: <Package className="text-[#C40C0C]" />, 
      color: 'bg-red-50' 
    },
    { 
      label: 'Total Customers', 
      value: stats.totalUsers.toString(), 
      icon: <Users className="text-indigo-600" />, 
      color: 'bg-indigo-50' 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage your handloom legacy and operations.</p>
        </div>
        <Link 
          to="/admin/products/add"
          className="bg-[#C40C0C] text-white px-6 py-3 font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg hover:bg-[#FF6500] transition-colors"
        >
          <Plus size={16} /> Add New Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {statsCards.map((stat, i) => (
          <div key={i} className={`${stat.color} p-6 border border-white/50 shadow-sm rounded-xl`}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
          <p className="text-xs font-medium text-slate-600">Pending Orders</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-green-600">{stats.deliveredOrders}</p>
          <p className="text-xs font-medium text-slate-600">Delivered</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-red-600">{stats.cancelledOrders}</p>
          <p className="text-xs font-medium text-slate-600">Cancelled</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-slate-100 shadow-sm">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-8 py-5 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${
              activeTab === 'products' ? 'border-[#C40C0C] text-[#C40C0C]' : 'border-transparent text-slate-400'
            }`}
          >
            Inventory ({stats.totalProducts})
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-8 py-5 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${
              activeTab === 'orders' ? 'border-[#C40C0C] text-[#C40C0C]' : 'border-transparent text-slate-400'
            }`}
          >
            Live Orders ({stats.totalOrders})
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {activeTab === 'products' ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
                      <th className="pb-4 font-bold">Product Details</th>
                      <th className="pb-4 font-bold">Category</th>
                      <th className="pb-4 font-bold">Price</th>
                      <th className="pb-4 font-bold">Stock</th>
                      <th className="pb-4 font-bold">Status</th>
                      <th className="pb-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {products.map(product => (
                      <tr key={product._id} className="group hover:bg-slate-50 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.images[0]?.url || 'https://via.placeholder.com/48'} 
                              className="w-12 h-12 object-cover rounded" 
                              alt={product.name}
                            />
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{product.name}</p>
                              <p className="text-xs text-slate-400 italic font-medium">{product.weave}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-slate-600">{product.category}</td>
                        <td className="py-4 text-sm font-bold text-slate-800">₹{product.price.toLocaleString()}</td>
                        <td className="py-4 text-sm text-slate-600">{product.stock} units</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                            product.stock > 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {product.stock > 5 ? 'Available' : 'Low Stock'}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link 
                              to={`/admin/products/edit/${product._id}`}
                              className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                              <Edit size={16} />
                            </Link>
                            <button 
                              onClick={() => handleDeleteProduct(product._id)}
                              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order._id} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-slate-50 hover:border-[#C40C0C]/20 transition-all gap-4">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className={`p-3 rounded-full ${getStatusColor(order.orderStatus)}`}>
                          {getStatusIcon(order.orderStatus)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800">#{order._id.slice(-8)}</h4>
                          <p className="text-xs text-slate-500 font-medium">
                            {order.user?.name || 'Guest'} • {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">{formatCurrency(order.totalPrice)}</p>
                          <p className={`text-[10px] uppercase font-bold tracking-widest ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </p>
                        </div>
                        <Link 
                          to={`/admin/orders/${order._id}`}
                          className="text-xs font-bold uppercase tracking-widest text-[#C40C0C] border-b border-[#C40C0C] whitespace-nowrap"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                  
                  {orders.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                      No orders found
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* View All Links */}
      <div className="flex justify-end gap-4 mt-4">
        <Link 
          to="/admin/products" 
          className="text-sm font-medium text-[#C40C0C] hover:underline"
        >
          View All Products →
        </Link>
        <Link 
          to="/admin/orders" 
          className="text-sm font-medium text-[#C40C0C] hover:underline"
        >
          View All Orders →
        </Link>
      </div>
    </div>
  );
};

export default Admin;