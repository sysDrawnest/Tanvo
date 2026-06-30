import React, { useState, useEffect } from 'react';
import {
  MessageCircle, Plus, Edit, X, Upload, Package, Truck, Search, CheckCircle
} from 'lucide-react';
import API from '../../services/api';

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
    productId?: any;
    name: string;
    image: string;
    price: number;
    costPrice: number;
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
  trackingInfo?: {
    courierName?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    shippingDate?: string;
  };
  source: string;
  status: string;
  statusHistory?: {
    status: string;
    changedAt: string;
    note: string;
  }[];
  createdAt: string;
  notes?: string;
  costs?: {
    shipping: number;
    packaging: number;
    other: number;
  };
  profit?: {
    totalCost: number;
    netProfit: number;
    margin: number;
  };
  customerId?: {
    _id: string;
    name: string;
    totalOrders: number;
    tags: string[];
  };
}

const AdminWhatsAppOrders: React.FC = () => {
  const [orders, setOrders] = useState<WhatsAppOrder[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Notification state
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Search product state
  const [productSearch, setProductSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Form states
  const initialFormState = {
    customerName: '', phone: '', email: '',
    address: '', city: '', state: '', pincode: '',
    products: [{ productId: undefined as string | undefined, name: '', price: 0, costPrice: 0, quantity: 1, image: '', isManual: true }],
    costs: { shipping: 0, packaging: 0, other: 0 },
    totalAmount: 0, advance: 0, paymentMethod: 'UPI', source: 'WhatsApp', status: 'New Inquiry',
    notes: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

  // Edit order state
  const [editingOrder, setEditingOrder] = useState<WhatsAppOrder | null>(null);
  const [editData, setEditData] = useState({
    paymentStatus: '',
    status: '',
    courierName: '',
    trackingNumber: '',
    trackingUrl: '',
    shippingDate: '',
    note: '' // For status history
  });

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

  // --- Create Order Handlers ---
  
  const handleProductChange = (index: number, field: string, value: any) => {
    const newProducts = [...formData.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    const total = newProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    setFormData({ ...formData, products: newProducts, totalAmount: total });
  };

  const addProductRow = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { productId: undefined, name: '', price: 0, costPrice: 0, quantity: 1, image: '', isManual: true }]
    });
  };

  const removeProductRow = (index: number) => {
    if (formData.products.length <= 1) return;
    const newProducts = formData.products.filter((_, i) => i !== index);
    const total = newProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    setFormData({ ...formData, products: newProducts, totalAmount: total });
  };

  const searchProducts = async (query: string) => {
    setProductSearch(query);
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }
    try {
      const { data } = await API.get(`/products?keyword=${query}&limit=5`);
      setSearchResults(data.products || []);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  const selectProduct = (product: any, index: number) => {
    const newProducts = [...formData.products];
    newProducts[index] = {
      productId: product._id,
      name: product.name,
      price: product.price,
      costPrice: product.costPrice || 0,
      quantity: 1,
      image: product.images?.[0]?.url || '',
      isManual: false
    };
    const total = newProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    setFormData({ ...formData, products: newProducts, totalAmount: total });
    setSearchResults([]);
    setProductSearch('');
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validation
    if (!formData.customerName) return setErrorMsg('Customer Name is required.');
    if (!formData.phone) return setErrorMsg('Phone Number is required.');
    if (formData.products.length === 0 || !formData.products[0].name) {
      return setErrorMsg('At least one product with a name is required.');
    }
    if (formData.totalAmount <= 0) return setErrorMsg('Total amount must be greater than 0.');

    try {
      const payload = {
        customer: {
          name: formData.customerName, phone: formData.phone,
          address: formData.address, city: formData.city,
          state: formData.state, pincode: formData.pincode
        },
        products: formData.products,
        costs: formData.costs,
        totalAmount: formData.totalAmount,
        payment: { method: formData.paymentMethod, advance: formData.advance },
        source: formData.source,
        status: formData.status,
        notes: formData.notes
      };

      const res = await API.post('/admin/whatsapp-orders', payload);
      const orderId = res.data.order._id;

      if (screenshotFile && orderId) {
        const formDataUpload = new FormData();
        formDataUpload.append('screenshot', screenshotFile);
        await API.post(`/admin/whatsapp-orders/${orderId}/screenshot`, formDataUpload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setSuccessMsg('WhatsApp Order created successfully!');
      setIsCreateModalOpen(false);
      setFormData(initialFormState);
      setScreenshotFile(null);
      fetchOrders();
      
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to create order.');
    }
  };

  // --- Edit Order Handlers ---

  const openEditModal = (order: WhatsAppOrder) => {
    setEditingOrder(order);
    setEditData({
      paymentStatus: order.payment.status,
      status: order.status,
      courierName: order.trackingInfo?.courierName || '',
      trackingNumber: order.trackingInfo?.trackingNumber || '',
      trackingUrl: order.trackingInfo?.trackingUrl || '',
      shippingDate: order.trackingInfo?.shippingDate ? new Date(order.trackingInfo.shippingDate).toISOString().split('T')[0] : '',
      note: ''
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!editingOrder) return;
    
    try {
      // 1. Update basic fields
      await API.put(`/admin/whatsapp-orders/${editingOrder._id}`, {
        payment: { status: editData.paymentStatus },
        trackingInfo: {
          courierName: editData.courierName,
          trackingNumber: editData.trackingNumber,
          trackingUrl: editData.trackingUrl,
          shippingDate: editData.shippingDate
        }
      });
      
      // 2. Update status separately to trigger history tracking
      if (editData.status !== editingOrder.status) {
        await API.put(`/admin/whatsapp-orders/${editingOrder._id}/status`, {
          status: editData.status,
          note: editData.note
        });
      }
      
      setSuccessMsg('Order updated successfully!');
      setIsEditModalOpen(false);
      setEditingOrder(null);
      fetchOrders();
      
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to update order.');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New Inquiry': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-indigo-100 text-indigo-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch(status) {
      case 'Paid': return 'text-green-600 bg-green-50 px-2 py-0.5 rounded';
      case 'Partially Paid': case 'Advance Paid': return 'text-orange-600 bg-orange-50 px-2 py-0.5 rounded';
      case 'Refunded': return 'text-gray-600 bg-gray-100 px-2 py-0.5 rounded';
      default: return 'text-red-600 bg-red-50 px-2 py-0.5 rounded'; // Pending
    }
  };

  if (loading) return <div className="p-8 text-center">Loading orders...</div>;

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200">
          {successMsg}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-medium text-[#173B45]">WhatsApp Orders</h1>
          <p className="text-sm text-[#173B45]/60">Manage direct chat and social media sales</p>
        </div>
        <button 
          onClick={() => { setErrorMsg(''); setIsCreateModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#B43F3F] text-white rounded-lg hover:bg-opacity-90"
        >
          <Plus size={18} /> New WA Order
        </button>
      </div>

      {/* Analytics Strip */}
      <div className="grid grid-cols-4 gap-4">
        {[{ label: 'WA Revenue', value: `₹${stats?.totalRevenue || 0}` },
          { label: 'WA Profit', value: `₹${stats?.totalProfit || 0}` },
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
                <th className="p-4 font-medium">Payment & Profit</th>
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
                    <p className="font-medium">
                      {order.customer.name}
                      {order.customerId && (
                        <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                          Returning
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-[#173B45]/60">{order.customer.phone}</p>
                    {order.customerId && order.customerId.tags?.length > 0 && (
                      <p className="text-[10px] mt-1 text-gray-500">Tags: {order.customerId.tags.join(', ')}</p>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-[#B43F3F]">₹{order.totalAmount}</p>
                    {order.profit !== undefined && (
                      <p className={`text-[11px] font-medium mt-0.5 ${order.profit.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        Profit: ₹{order.profit.netProfit} ({order.profit.margin}%)
                      </p>
                    )}
                    <p className="text-xs mt-1.5">
                      <span className={getPaymentStatusColor(order.payment.status)}>{order.payment.status}</span>
                    </p>
                    <p className="text-xs text-[#173B45]/60 mt-1">Adv: ₹{order.payment.advance} | Rem: ₹{order.payment.remaining}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    {order.trackingInfo?.trackingNumber && (
                      <p className="text-[10px] mt-2 text-[#173B45]/60 flex items-center gap-1">
                        <Truck size={10}/> {order.trackingInfo.courierName}: {order.trackingInfo.trackingNumber}
                      </p>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <a href={`https://wa.me/${order.customer.phone}?text=Hello ${order.customer.name}, your TANVO order ${order.orderNumber} is confirmed. We will update you with shipping details soon.`} target="_blank" rel="noreferrer" className="text-green-600 hover:text-green-700 p-2 bg-green-50 rounded" title="WhatsApp Chat">
                        <MessageCircle size={16}/>
                      </a>
                      <button onClick={() => window.open(`/admin/invoice/${order._id}`, '_blank')} className="text-blue-600 hover:text-blue-700 p-2 bg-blue-50 rounded" title="Print Invoice">
                        <Package size={16}/>
                      </button>
                      <button onClick={() => openEditModal(order)} className="text-[#173B45]/60 hover:text-[#B43F3F] p-2 bg-gray-100 rounded" title="Manage Order">
                        <Edit size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No WhatsApp orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- CREATE ORDER MODAL --- */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-medium">Create WhatsApp Order</h2>
              <button onClick={() => setIsCreateModalOpen(false)}><X className="text-gray-500 hover:text-red-500" /></button>
            </div>
            
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-8">
              {errorMsg && <div className="bg-red-50 text-red-600 p-3 rounded">{errorMsg}</div>}

              {/* 1. Customer Information */}
              <div>
                <h3 className="font-medium text-[#173B45] mb-4 border-b pb-2">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Customer Name *</label>
                    <input type="text" required className="w-full border p-2 rounded" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone Number *</label>
                    <input type="text" required className="w-full border p-2 rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Email (Optional)</label>
                    <input type="email" className="w-full border p-2 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* 2. Address */}
              <div>
                <h3 className="font-medium text-[#173B45] mb-4 border-b pb-2">Address Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm text-gray-600 mb-1">Full Address</label>
                    <input type="text" className="w-full border p-2 rounded" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">City</label>
                    <input type="text" className="w-full border p-2 rounded" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">State</label>
                    <input type="text" className="w-full border p-2 rounded" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Pincode</label>
                    <input type="text" className="w-full border p-2 rounded" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* 3. Products */}
              <div>
                <h3 className="font-medium text-[#173B45] mb-4 border-b pb-2">Products</h3>
                
                {/* Product Search */}
                <div className="mb-4 relative">
                  <label className="block text-sm text-gray-600 mb-1">Search Catalog (Optional)</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search saree to auto-fill..." 
                      className="w-full border p-2 pl-10 rounded bg-gray-50"
                      value={productSearch}
                      onChange={e => searchProducts(e.target.value)}
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="absolute z-20 w-full bg-white border shadow-lg rounded mt-1 max-h-48 overflow-y-auto">
                      {searchResults.map(p => (
                        <div key={p._id} onClick={() => selectProduct(p, formData.products.length - 1)} className="p-2 hover:bg-gray-100 cursor-pointer flex gap-3 items-center">
                          <img src={p.images?.[0]?.url || '/placeholder.jpg'} className="w-10 h-10 object-cover rounded" alt="" />
                          <div>
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-[#B43F3F]">₹{p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {formData.products.map((p, i) => (
                  <div key={i} className="flex gap-4 items-end mb-4 bg-gray-50 p-4 rounded border">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-1">Product Name *</label>
                      <input type="text" required className="w-full border p-2 rounded" value={p.name} onChange={e => handleProductChange(i, 'name', e.target.value)} />
                    </div>
                    <div className="w-24">
                      <label className="block text-sm text-gray-600 mb-1">Qty *</label>
                      <input type="number" min="1" required className="w-full border p-2 rounded" value={p.quantity} onChange={e => handleProductChange(i, 'quantity', Number(e.target.value))} />
                    </div>
                    <div className="w-32">
                      <label className="block text-sm text-gray-600 mb-1">Selling Price *</label>
                      <input type="number" min="0" required className="w-full border p-2 rounded" value={p.price} onChange={e => handleProductChange(i, 'price', Number(e.target.value))} />
                    </div>
                    <div className="w-32">
                      <label className="block text-sm text-gray-600 mb-1">Cost Price</label>
                      <input type="number" min="0" className="w-full border p-2 rounded" value={p.costPrice || 0} onChange={e => handleProductChange(i, 'costPrice', Number(e.target.value))} />
                    </div>
                    <button type="button" onClick={() => removeProductRow(i)} className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 mb-0.5"><X size={20}/></button>
                  </div>
                ))}
                <button type="button" onClick={addProductRow} className="text-sm text-[#B43F3F] flex items-center gap-1 font-medium bg-[#F8EDED] px-3 py-1.5 rounded"><Plus size={16}/> Add Another Product</button>
              </div>

              {/* 3.5 Costs */}
              <div>
                <h3 className="font-medium text-[#173B45] mb-4 border-b pb-2">Costs (For Profit Tracking)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Shipping Cost</label>
                    <input type="number" min="0" className="w-full border p-2 rounded" value={formData.costs.shipping} onChange={e => setFormData({...formData, costs: {...formData.costs, shipping: Number(e.target.value)}})} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Packaging Cost</label>
                    <input type="number" min="0" className="w-full border p-2 rounded" value={formData.costs.packaging} onChange={e => setFormData({...formData, costs: {...formData.costs, packaging: Number(e.target.value)}})} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Other Expenses</label>
                    <input type="number" min="0" className="w-full border p-2 rounded" value={formData.costs.other} onChange={e => setFormData({...formData, costs: {...formData.costs, other: Number(e.target.value)}})} />
                  </div>
                </div>
              </div>

              {/* 4. Payment */}
              <div>
                <h3 className="font-medium text-[#173B45] mb-4 border-b pb-2">Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Total Amount (Auto) *</label>
                    <input type="number" required className="w-full border p-2 rounded bg-gray-100 font-medium text-[#B43F3F]" value={formData.totalAmount} readOnly />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Advance Received *</label>
                    <input type="number" min="0" required className="w-full border p-2 rounded" value={formData.advance} onChange={e => setFormData({...formData, advance: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Remaining Balance</label>
                    <input type="number" className="w-full border p-2 rounded bg-gray-100" value={Math.max(0, formData.totalAmount - formData.advance)} readOnly />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Payment Method</label>
                    <select className="w-full border p-2 rounded" value={formData.paymentMethod} onChange={e => setFormData({...formData, paymentMethod: e.target.value})}>
                      <option value="UPI">UPI</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="COD">COD</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Payment Screenshot Proof</label>
                    <div className="flex items-center gap-2">
                      <input type="file" accept="image/*" onChange={e => setScreenshotFile(e.target.files?.[0] || null)} className="border p-1.5 rounded w-full text-sm" />
                      {screenshotFile && <span className="text-xs text-green-600 w-24">File selected</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Order Meta */}
              <div>
                <h3 className="font-medium text-[#173B45] mb-4 border-b pb-2">Order Meta</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Source Channel</label>
                    <select className="w-full border p-2 rounded" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})}>
                      <option value="WhatsApp">WhatsApp (Website click)</option>
                      <option value="Direct WhatsApp">Direct WhatsApp</option>
                      <option value="Instagram DM">Instagram DM</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Offline Store">Offline Store</option>
                      <option value="Exhibition">Exhibition</option>
                      <option value="Referral">Referral</option>
                      <option value="Returning Customer">Returning Customer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Initial Status</label>
                    <select className="w-full border p-2 rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="New Inquiry">New Inquiry</option>
                      <option value="Customer Confirmed">Customer Confirmed</option>
                      <option value="Advance Received">Advance Received</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Notes</label>
                    <textarea rows={2} className="w-full border p-2 rounded" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-6 py-2 border rounded text-gray-600 font-medium">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#B43F3F] text-white rounded font-medium shadow hover:bg-opacity-90 flex items-center gap-2">
                  <CheckCircle size={18}/> Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT / MANAGE ORDER MODAL --- */}
      {isEditModalOpen && editingOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-medium">Manage Order {editingOrder.orderNumber}</h2>
              <button onClick={() => setIsEditModalOpen(false)}><X className="text-gray-500 hover:text-red-500" /></button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              {errorMsg && <div className="bg-red-50 text-red-600 p-3 rounded">{errorMsg}</div>}
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-[#173B45] mb-3 border-b pb-1">Order Status</h3>
                  <label className="block text-sm text-gray-600 mb-1">Fulfillment Status</label>
                  <select className="w-full border p-2 rounded" value={editData.status} onChange={e => setEditData({...editData, status: e.target.value})}>
                    <option value="New Inquiry">New Inquiry</option>
                    <option value="Customer Confirmed">Customer Confirmed</option>
                    <option value="Advance Received">Advance Received</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  
                  {editData.status !== editingOrder.status && (
                    <div className="mt-2">
                      <label className="block text-[11px] text-gray-500 mb-1">Status Update Note (Optional)</label>
                      <input type="text" className="w-full border p-1.5 rounded text-sm bg-yellow-50" value={editData.note} onChange={e => setEditData({...editData, note: e.target.value})} placeholder="Why was the status changed?" />
                    </div>
                  )}

                  <label className="block text-sm text-gray-600 mb-1 mt-4">Payment Status</label>
                  <select className="w-full border p-2 rounded" value={editData.paymentStatus} onChange={e => setEditData({...editData, paymentStatus: e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="Advance Paid">Advance Paid</option>
                    <option value="Partially Paid">Partially Paid</option>
                    <option value="Paid">Paid</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-medium text-[#173B45] mb-3 border-b pb-1">Tracking Info</h3>
                  <label className="block text-sm text-gray-600 mb-1">Courier Name</label>
                  <input type="text" className="w-full border p-2 rounded mb-3" value={editData.courierName} onChange={e => setEditData({...editData, courierName: e.target.value})} placeholder="e.g. BlueDart" />
                  
                  <label className="block text-sm text-gray-600 mb-1">Tracking Number</label>
                  <input type="text" className="w-full border p-2 rounded mb-3" value={editData.trackingNumber} onChange={e => setEditData({...editData, trackingNumber: e.target.value})} />
                  
                  <label className="block text-sm text-gray-600 mb-1">Tracking URL</label>
                  <input type="url" className="w-full border p-2 rounded mb-3" value={editData.trackingUrl} onChange={e => setEditData({...editData, trackingUrl: e.target.value})} />
                  
                  <label className="block text-sm text-gray-600 mb-1">Shipping Date</label>
                  <input type="date" className="w-full border p-2 rounded" value={editData.shippingDate} onChange={e => setEditData({...editData, shippingDate: e.target.value})} />
                </div>
              </div>

              {/* Status History Timeline */}
              {editingOrder.statusHistory && editingOrder.statusHistory.length > 0 && (
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-[#173B45] mb-3">Status History</h3>
                  <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                    {editingOrder.statusHistory.map((history, idx) => (
                      <div key={idx} className="flex gap-3 text-sm">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-[#B43F3F] mt-1.5"></div>
                          {idx !== editingOrder.statusHistory!.length - 1 && <div className="w-px h-full bg-gray-200 my-1"></div>}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{history.status}</p>
                          <p className="text-[11px] text-gray-500">{new Date(history.changedAt).toLocaleString()}</p>
                          {history.note && <p className="text-xs text-gray-600 mt-0.5">{history.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 border rounded text-gray-600 font-medium">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#B43F3F] text-white rounded font-medium shadow hover:bg-opacity-90 flex items-center gap-2">
                  <CheckCircle size={18}/> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWhatsAppOrders;
