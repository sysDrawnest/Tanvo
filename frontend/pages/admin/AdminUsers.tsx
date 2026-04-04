import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Search, Filter, ChevronLeft, ChevronRight, 
  Edit, Trash2, Eye, Mail, Phone, Calendar, Shield,
  UserCog, UserX, UserCheck, Download
} from 'lucide-react';
import API from '../../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin?: string;
  addresses?: Array<{
    _id: string;
    type: string;
    city: string;
    state: string;
    isDefault: boolean;
  }>;
  ordersCount?: number;
  totalSpent?: number;
  isActive?: boolean;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params: any = {
        page,
        limit: 10
      };
      if (searchTerm) params.search = searchTerm;
      if (roleFilter) params.role = roleFilter;
      if (statusFilter) params.status = statusFilter;

      const { data } = await API.get('/admin/users', { params });
      setUsers(data.users);
      setTotalPages(data.pages);
      setTotalUsers(data.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleExport = async () => {
    try {
      const { data } = await API.get('/admin/users/export', {
        params: {
          role: roleFilter,
          status: statusFilter
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `users-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting users:', error);
      alert('Failed to export users');
    }
  };

  const handleUpdateRole = async (userId: string, newRole: 'user' | 'admin') => {
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    try {
      setUpdateLoading(true);
      await API.put(`/admin/users/${userId}`, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    const action = currentStatus ? 'deactivate' : 'activate';
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return;
    }

    try {
      setUpdateLoading(true);
      await API.put(`/admin/users/${userId}`, { isActive: !currentStatus });
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
      alert('Failed to update user status');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      setUpdateLoading(true);
      await API.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    } finally {
      setUpdateLoading(false);
    }
  };

  const viewUserDetails = async (user: User) => {
    try {
      const { data } = await API.get(`/admin/users/${user._id}`);
      setSelectedUser(data.user);
      setShowUserModal(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
      alert('Failed to fetch user details');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'admin' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-gray-100 text-[#0D0B0A]';
  };

  const getStatusBadge = (user: User) => {
    // This would come from your actual user data
    const isActive = user.isActive !== false;
    return isActive
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#0D0B0A]">Users</h1>
          <p className="text-gray-500 mt-1">Total {totalUsers} registered users</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Filter size={20} />
            Filters
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Search
          </button>
        </form>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
            >
              <option value="">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button
              onClick={() => {
                setRoleFilter('');
                setStatusFilter('');
                setSearchTerm('');
                setPage(1);
                fetchUsers();
              }}
              className="px-4 py-2 text-[#C9A84C] hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#C9A84C] to-[#E8C97A] rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-[#0D0B0A]">{user.name}</p>
                        <p className="text-xs text-gray-500 mt-1">ID: {user._id.slice(-8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} className="text-gray-400" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} className="text-gray-400" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role === 'admin' ? 'Administrator' : 'Customer'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(user)}`}>
                      {user.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} className="text-gray-400" />
                      {formatDate(user.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewUserDetails(user)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      
                      {user.role === 'admin' ? (
                        <button
                          onClick={() => handleUpdateRole(user._id, 'user')}
                          className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                          title="Remove Admin"
                        >
                          <UserX size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateRole(user._id, 'admin')}
                          className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                          title="Make Admin"
                        >
                          <UserCog size={18} />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleToggleStatus(user._id, user.isActive !== false)}
                        className={`p-2 text-gray-400 hover:text-green-600 transition-colors`}
                        title={user.isActive !== false ? 'Deactivate' : 'Activate'}
                      >
                        <UserCheck size={18} />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-500">
              Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, totalUsers)} of {totalUsers} users
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:border-[#C9A84C]"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="px-4 py-2 bg-[#C9A84C] text-white rounded-lg">
                {page}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:border-[#C9A84C]"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {users.length === 0 && (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#0D0B0A] mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-display font-bold">User Details</h2>
                <p className="text-sm text-gray-500 mt-1">Detailed information about {selectedUser.name}</p>
              </div>
              <button
                onClick={() => setShowUserModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A84C] to-[#E8C97A] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  {selectedUser.phone && <p className="text-gray-500">{selectedUser.phone}</p>}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold">{selectedUser.ordersCount || 0}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                  <p className="text-2xl font-bold">{formatCurrency(selectedUser.totalSpent || 0)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Member Since</p>
                  <p className="text-lg font-bold">{formatDate(selectedUser.createdAt)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Last Login</p>
                  <p className="text-lg font-bold">{selectedUser.lastLogin ? formatDate(selectedUser.lastLogin) : 'Never'}</p>
                </div>
              </div>

              {/* Addresses */}
              {selectedUser.addresses && selectedUser.addresses.length > 0 && (
                <div>
                  <h4 className="font-bold text-lg mb-4">Saved Addresses</h4>
                  <div className="space-y-3">
                    {selectedUser.addresses.map((addr, idx) => (
                      <div key={addr._id || idx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold uppercase">{addr.type}</span>
                          {addr.isDefault && (
                            <span className="text-xs bg-[#C9A84C] text-[#E8C97A] px-2 py-0.5 rounded-full">Default</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{addr.city}, {addr.state}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    setEditingUser(selectedUser);
                  }}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Edit User
                </button>
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    window.open(`mailto:${selectedUser.email}`);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay for Actions */}
      {updateLoading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;