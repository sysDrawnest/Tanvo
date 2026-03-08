import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, Eye, Search, Filter, 
  ChevronLeft, ChevronRight, MoreVertical 
} from 'lucide-react';
import API from '../../services/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subCategory: string;
  weave: string;
  fabric: string;
  images: Array<{ url: string; isPrimary: boolean }>;
  stock: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  ratings: number;
  numReviews: number;
  createdAt: string;
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterWeave, setFilterWeave] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [page, filterCategory, filterWeave]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params: any = {
        page,
        limit: 10
      };
      if (searchTerm) params.search = searchTerm;
      if (filterCategory) params.category = filterCategory;
      if (filterWeave) params.weave = filterWeave;

      const { data } = await API.get('/admin/products', { params });
      setProducts(data.products);
      setTotalPages(data.pages);
      setTotalProducts(data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await API.delete(`/admin/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Total {totalProducts} products in inventory</p>
        </div>
        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 px-4 py-2 bg-[#C40C0C] text-white rounded-lg hover:bg-[#FF6500] transition-colors"
        >
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products by name, weave, fabric..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#C40C0C] focus:ring-2 focus:ring-[#C40C0C]/20"
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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:border-[#C40C0C]"
            >
              <option value="">All Categories</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Accessories">Accessories</option>
            </select>
            <select
              value={filterWeave}
              onChange={(e) => setFilterWeave(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:border-[#C40C0C]"
            >
              <option value="">All Weaves</option>
              <option value="Sambalpuri">Sambalpuri</option>
              <option value="Bomkai">Bomkai</option>
              <option value="Ikat">Ikat</option>
              <option value="Khandua">Khandua</option>
            </select>
            <button
              onClick={() => {
                setFilterCategory('');
                setFilterWeave('');
                setSearchTerm('');
                setPage(1);
                fetchProducts();
              }}
              className="px-4 py-2 text-[#C40C0C] hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]?.url || '/placeholder.jpg'}
                            alt={product.name}
                            className="w-12 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{product.weave} • {product.fabric}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{formatCurrency(product.price)}</p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-500 line-through">
                            {formatCurrency(product.originalPrice)}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' :
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {product.isFeatured && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Featured</span>
                          )}
                          {product.isBestSeller && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Best Seller</span>
                          )}
                          {product.isNewArrival && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">New</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(product.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/product/${product._id}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="View"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
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
                  Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, totalProducts)} of {totalProducts} products
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:border-[#C40C0C]"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="px-4 py-2 bg-[#C40C0C] text-white rounded-lg">
                    {page}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:border-[#C40C0C]"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;