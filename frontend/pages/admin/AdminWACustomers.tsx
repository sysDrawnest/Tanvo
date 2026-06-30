import React, { useState, useEffect } from 'react';
import { Search, Eye, Filter, Mail, Phone, Calendar, IndianRupee } from 'lucide-react';
import API from '../../services/api';

const AdminWACustomers: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [topCustomers, setTopCustomers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('totalSpent');

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
    fetchStats();
  }, [search, sort]);

  const fetchCustomers = async () => {
    try {
      const { data } = await API.get(`/admin/whatsapp-orders/customers?search=${search}&sort=${sort}`);
      if (data.success) {
        setCustomers(data.customers);
        setTopCustomers(data.topCustomers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await API.get(`/admin/whatsapp-orders/customers/stats`);
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const viewCustomer = async (id: string) => {
    try {
      const { data } = await API.get(`/admin/whatsapp-orders/customers/${id}`);
      if (data.success) {
        setSelectedCustomer(data.customer);
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'VIP': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Regular': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'New': return 'bg-green-100 text-green-800 border-green-200';
      case 'Wholesale': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-medium text-[#173B45]">WhatsApp CRM</h1>
          <p className="text-sm text-[#173B45]/60">Manage direct sales customers and history</p>
        </div>
      </div>

      {/* Analytics Strip */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#B43F3F]/10">
          <p className="text-sm text-[#173B45]/60">Total CRM Profiles</p>
          <p className="text-2xl font-semibold text-[#173B45] mt-1">{stats?.total || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#B43F3F]/10">
          <p className="text-sm text-[#173B45]/60">New Profiles (This Month)</p>
          <p className="text-2xl font-semibold text-[#173B45] mt-1">{stats?.newThisMonth || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#B43F3F]/10">
          <p className="text-sm text-[#173B45]/60">Top Spender</p>
          <p className="text-xl font-semibold text-[#173B45] mt-1 truncate">
            {stats?.topSpenders?.[0]?.name || 'N/A'}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-xl border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, phone or city..." 
            className="w-full border p-2 pl-10 rounded-lg bg-gray-50 focus:bg-white transition-colors"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select 
            className="border p-2 rounded-lg bg-gray-50"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="totalSpent">Sort: Highest Spend</option>
            <option value="totalOrders">Sort: Most Orders</option>
            <option value="recent">Sort: Recently Active</option>
            <option value="name">Sort: A-Z</option>
          </select>
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white rounded-xl border border-[#B43F3F]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8EDED] text-[#173B45]">
              <tr>
                <th className="p-4 font-medium">Customer Details</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Engagement</th>
                <th className="p-4 font-medium">Total Spent</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No customers found.</td></tr>
              ) : (
                customers.map(c => (
                  <tr key={c._id} className="border-b border-[#B43F3F]/10 hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-medium text-[#173B45]">{c.name}</p>
                      <p className="text-xs text-[#173B45]/60">{c.phone}</p>
                      <div className="flex gap-1 mt-1.5">
                        {c.tags.map((t: string) => (
                          <span key={t} className={`text-[10px] px-1.5 py-0.5 rounded border ${getTagColor(t)}`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      {c.city ? `${c.city}${c.state ? `, ${c.state}` : ''}` : '-'}
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-800">{c.totalOrders} Orders</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last: {c.lastPurchaseDate ? new Date(c.lastPurchaseDate).toLocaleDateString() : '-'}
                      </p>
                    </td>
                    <td className="p-4 font-medium text-[#B43F3F]">
                      ₹{c.totalSpent.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => viewCustomer(c._id)} 
                        className="text-[#173B45]/60 hover:text-[#B43F3F] p-2 bg-gray-100 rounded" 
                        title="View Profile"
                      >
                        <Eye size={16}/>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-[#F8EDED]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-bold text-[#173B45] shadow-sm">
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-medium text-[#173B45]">{selectedCustomer.name}</h2>
                  <div className="flex gap-1 mt-1">
                    {selectedCustomer.tags.map((t: string) => (
                      <span key={t} className={`text-[10px] px-1.5 py-0.5 rounded border ${getTagColor(t)}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-white p-2 rounded-full hover:bg-gray-100 text-gray-500">
                &times;
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact Details</h3>
                  <div className="space-y-2">
                    <p className="text-sm flex items-center gap-2"><Phone size={14} className="text-gray-400"/> {selectedCustomer.phone}</p>
                    {selectedCustomer.email && <p className="text-sm flex items-center gap-2"><Mail size={14} className="text-gray-400"/> {selectedCustomer.email}</p>}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Location</h3>
                  <p className="text-sm text-gray-700">
                    {selectedCustomer.address}<br/>
                    {selectedCustomer.city}, {selectedCustomer.state} {selectedCustomer.pincode}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Lifetime Value</h3>
                  <div className="space-y-1">
                    <p className="text-sm flex items-center justify-between">
                      <span className="text-gray-500">Total Spent:</span> 
                      <span className="font-semibold text-green-600">₹{selectedCustomer.totalSpent.toLocaleString()}</span>
                    </p>
                    <p className="text-sm flex items-center justify-between">
                      <span className="text-gray-500">Total Orders:</span> 
                      <span className="font-semibold">{selectedCustomer.totalOrders}</span>
                    </p>
                    <p className="text-sm flex items-center justify-between">
                      <span className="text-gray-500">Avg Value:</span> 
                      <span className="font-semibold">₹{Math.round(selectedCustomer.totalSpent / Math.max(1, selectedCustomer.totalOrders)).toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Calendar size={16}/> Order History
                </h3>
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="p-3 font-medium">Date & ID</th>
                        <th className="p-3 font-medium">Status</th>
                        <th className="p-3 font-medium text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCustomer.orders.map((o: any) => (
                        <tr key={o._id} className="border-t border-gray-100">
                          <td className="p-3">
                            <p className="font-medium text-[#173B45]">{o.orderNumber}</p>
                            <p className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</p>
                          </td>
                          <td className="p-3">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium">{o.status}</span>
                            <span className="text-xs ml-2 text-gray-500">{o.payment.status}</span>
                          </td>
                          <td className="p-3 text-right font-medium text-[#B43F3F]">
                            ₹{o.totalAmount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      {selectedCustomer.orders.length === 0 && (
                        <tr><td colSpan={3} className="p-4 text-center text-gray-500">No orders found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWACustomers;
