import React, { useState, useEffect } from 'react';
import {
  MessageCircle, Plus, Search, Filter, X, Upload,
  CheckCircle, Clock, AlertCircle, Edit, Trash2, Link as LinkIcon
} from 'lucide-react';
import API from '../../services/api';
import { useStore } from '../../context/StoreContext';

interface WhatsAppOrder {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  products: {
    productId: any;
    name: string;
    image: string;
    price: number;
    quantity: number;
    isManual: boolean;
  }[];
  totalAmount: number;
  payment: {
    method: string;
    status: string;
    advance: number;
    remaining: number;
    screenshot?: { url: string; publicId: string };
  };
  source: string;
  status: string;
  createdAt: string;
}

const AdminWhatsAppOrders: React.FC = () => {
  const [orders, setOrders] = useState<WhatsAppOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);
  
  // Modal State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerName: '', phone: '', address: '', city: '', state: '', pincode: '',
    products: [{ productId: '', name: '', price: 0, quantity: 1, image: '', isManual: false }],
    totalAmount: 0, advance: 0, paymentMethod: 'UPI', source: 'WhatsApp', status: 'New Inquiry'
  });
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

  const fetchOrders = async () => {
    try {
      const [{ data: orderData }, { data: statsData }] = await Promise.all([
        API.get('/admin/whatsapp-orders'),
        API.get('/admin/whatsapp-orders/stats')
      ]);
      if (orderData.success) setOrders(orderData.orders);
      if (statsData.success) setStats(statsData.stats.overview);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleProductChange = (index: number, field: string, value: any) => {
    const newProducts = [...formData.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    
    // Auto-calc total
    const total = newProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    setFormData({ ...formData, products: newProducts, totalAmount: total });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { productId: '', name: '', price: 0, quantity: 1, image: '', isManual: true }]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        customer: {
          name: formData.customerName, phone: formData.phone,
          address: formData.address, city: formData.city,
          state: formData.state, pincode: formData.pincode
        },
        products: formData.products,
        totalAmount: formData.totalAmount,
        payment: { method: formData.paymentMethod, advance: formData.advance },
        source: formData.source,
        status: formData.status
      };

      let orderId = editingId;
      if (editingId) {
        await API.put(`/admin/whatsapp-orders/${editingId}`, payload);
      } else {
        const res = await API.post('/admin/whatsapp-orders', payload);
        orderId = res.data.order._id;
      }

      // Upload screenshot if provided
      if (screenshotFile && orderId) {
        const formData = new FormData();
        formData.append('screenshot', screenshotFile);
        await API.post(`/admin/whatsapp-orders/${orderId}/screenshot`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setIsModalOpen(false);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New Inquiry': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-medium text-[#173B45]">WhatsApp Orders</h1>
          <p className="text-sm text-[#173B45]/60">Manage direct chat and social media sales</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#B43F3F] text-white rounded-lg hover:bg-opacity-90"
        >
          <Plus size={18} /> New WA Order
        </button>
      </div>

      {/* Analytics Strip */}
      <div className="grid grid-cols-4 gap-4">
        {[{ label: 'WA Revenue', value: `₹${stats?.totalRevenue || 0}` },
          { label: 'Total WA Orders', value: stats?.totalOrders || 0 },
          { label: 'Avg Order Value', value: `₹${Math.round(stats?.avgOrderValue || 0)}` },
          { label: 'Pending Payments', value: `₹${stats?.totalPending || 0}` }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-[#B43F3F]/10">
            <p className="text-sm text-[#173B45]/60">{stat.label}</p>
            <p className="text-2xl font-semibold text-[#173B45] mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#B43F3F]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8EDED] text-[#173B45]">
              <tr>
                <th className="p-4 font-medium">Order Details</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-b border-[#B43F3F]/10 hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium text-[#173B45]">{order.orderNumber}</p>
                    <p className="text-xs text-[#173B45]/60">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <div className="mt-1 flex items-center gap-1 text-[10px] bg-gray-100 px-2 py-0.5 rounded w-max">
                      <MessageCircle size={10} /> {order.source}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-xs text-[#173B45]/60">{order.customer.phone}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-[#B43F3F]">₹{order.totalAmount}</p>
                    <p className="text-xs text-[#173B45]/60">Adv: ₹{order.payment.advance} | Rem: ₹{order.payment.remaining}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#173B45]/60 hover:text-[#B43F3F]" title="Edit"><Edit size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Simplified for brevity */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-medium mb-4">Create WhatsApp Order</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Customer Name" required className="border p-2 rounded" 
                       value={formData.customerName} onChange={e=>setFormData({...formData, customerName: e.target.value})} />
                <input placeholder="Phone Number" required className="border p-2 rounded" 
                       value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} />
              </div>
              {/* Products Section */}
              <div className="space-y-2">
                <h3 className="font-medium">Products</h3>
                {formData.products.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <input placeholder="Product Name" className="border p-2 rounded flex-1" value={p.name} onChange={e=>handleProductChange(i, 'name', e.target.value)} />
                    <input placeholder="Price" type="number" className="border p-2 rounded w-24" value={p.price} onChange={e=>handleProductChange(i, 'price', Number(e.target.value))} />
                  </div>
                ))}
                <button type="button" onClick={handleAddProduct} className="text-sm text-[#B43F3F]">+ Add Item</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Advance Paid" type="number" className="border p-2 rounded" 
                       value={formData.advance} onChange={e=>setFormData({...formData, advance: Number(e.target.value)})} />
                <input type="file" onChange={e => setScreenshotFile(e.target.files?.[0] || null)} className="border p-2 rounded" />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#B43F3F] text-white rounded">Save Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWhatsAppOrders;
