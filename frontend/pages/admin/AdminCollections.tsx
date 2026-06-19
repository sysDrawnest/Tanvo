import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, PlusCircle, CheckCircle2 } from 'lucide-react';
import API from '../../services/api';

interface Collection {
  _id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
  type: 'manual' | 'automatic';
  products: string[];
  rules: {
    weave: string;
    fabric: string;
    category: string;
    priceRange: {
      min: number;
      max: number;
    };
  };
  seo: {
    title: string;
    description: string;
  };
  isActive: boolean;
}

interface Product {
  _id: string;
  name: string;
  weave: string;
  fabric: string;
  category: string;
  price: number;
}

export const AdminCollections: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCollection, setEditingCollection] = useState<Partial<Collection> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchCollections();
    fetchProducts();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/collections?all=true');
      if (data.success) {
        setCollections(data.data);
      }
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      // Extract products from response data which is either data.products or data.data or data
      const resolvedProducts = data.products || data.data || (Array.isArray(data) ? data : []);
      setProductsList(resolvedProducts);
    } catch (error) {
      console.error('Error fetching products list:', error);
    }
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection({ ...collection });
    setIsNew(false);
  };

  const handleCreateNew = () => {
    setEditingCollection({
      name: '',
      slug: '',
      description: '',
      bannerImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
      type: 'manual',
      products: [],
      rules: {
        weave: '',
        fabric: '',
        category: '',
        priceRange: { min: 0, max: 1000000 }
      },
      seo: {
        title: '',
        description: ''
      },
      isActive: true
    });
    setIsNew(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this collection?')) return;
    try {
      const { data } = await API.delete(`/collections/${id}`);
      if (data.success) {
        alert('Collection deleted successfully!');
        fetchCollections();
      }
    } catch (error: any) {
      console.error('Error deleting collection:', error);
      alert(error.response?.data?.message || 'Failed to delete collection');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollection?.name || !editingCollection?.description || !editingCollection?.bannerImage) {
      alert('Please fill in all required fields (Name, Description, Banner Image URL)');
      return;
    }

    try {
      if (isNew) {
        const { data } = await API.post('/collections', editingCollection);
        if (data.success) {
          alert('Collection created successfully!');
          setEditingCollection(null);
          fetchCollections();
        }
      } else {
        const { data } = await API.put(`/collections/${editingCollection._id}`, editingCollection);
        if (data.success) {
          alert('Collection updated successfully!');
          setEditingCollection(null);
          fetchCollections();
        }
      }
    } catch (error: any) {
      console.error('Error saving collection:', error);
      alert(error.response?.data?.message || 'Failed to save collection');
    }
  };

  const toggleProductSelection = (productId: string) => {
    if (!editingCollection) return;
    const currentProducts = editingCollection.products || [];
    const updatedProducts = currentProducts.includes(productId)
      ? currentProducts.filter(id => id !== productId)
      : [...currentProducts, productId];

    setEditingCollection({
      ...editingCollection,
      products: updatedProducts
    });
  };

  if (loading && collections.length === 0) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-[#B43F3F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-medium text-[#173B45]">Collections Management</h1>
          <p className="text-sm text-[#173B45]/60">Manage manual curated links or rule-based automatic category sets.</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#B43F3F] text-[#F8EDED] hover:bg-[#FF8225] transition-colors rounded-xl font-medium text-sm shadow-sm"
        >
          <Plus size={16} /> Add Collection
        </button>
      </div>

      {editingCollection && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl border border-[#B43F3F]/10 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-[#B43F3F]/15 pb-4">
            <h2 className="text-lg font-display font-medium text-[#173B45]">
              {isNew ? 'Create New Collection' : `Edit: ${editingCollection.name}`}
            </h2>
            <button
              type="button"
              onClick={() => setEditingCollection(null)}
              className="text-[#173B45]/60 hover:text-[#B43F3F]"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#173B45] mb-1">Collection Name *</label>
                <input
                  type="text"
                  required
                  value={editingCollection.name || ''}
                  onChange={(e) => setEditingCollection({ ...editingCollection, name: e.target.value })}
                  placeholder="e.g. Sambalpuri Silk Heritage"
                  className="w-full px-4 py-2 border border-[#173B45]/20 rounded-xl bg-white text-[#173B45] focus:outline-none focus:border-[#B43F3F]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#173B45] mb-1">Slug (auto-generated if empty)</label>
                <input
                  type="text"
                  value={editingCollection.slug || ''}
                  onChange={(e) => setEditingCollection({ ...editingCollection, slug: e.target.value })}
                  placeholder="e.g. sambalpuri-silk-heritage"
                  className="w-full px-4 py-2 border border-[#173B45]/20 rounded-xl bg-white text-[#173B45] focus:outline-none focus:border-[#B43F3F]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#173B45] mb-1">Banner Image URL *</label>
                <input
                  type="text"
                  required
                  value={editingCollection.bannerImage || ''}
                  onChange={(e) => setEditingCollection({ ...editingCollection, bannerImage: e.target.value })}
                  className="w-full px-4 py-2 border border-[#173B45]/20 rounded-xl bg-white text-[#173B45] focus:outline-none focus:border-[#B43F3F]"
                />
                {editingCollection.bannerImage && (
                  <div className="mt-2 h-24 rounded-lg overflow-hidden border border-[#173B45]/10">
                    <img src={editingCollection.bannerImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#173B45] mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={editingCollection.description || ''}
                  onChange={(e) => setEditingCollection({ ...editingCollection, description: e.target.value })}
                  placeholder="Describe the story and feel of this collection..."
                  className="w-full px-4 py-2 border border-[#173B45]/20 rounded-xl bg-white text-[#173B45] focus:outline-none focus:border-[#B43F3F]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#173B45] mb-1">Collection Type</label>
                <select
                  value={editingCollection.type || 'manual'}
                  onChange={(e) => setEditingCollection({ ...editingCollection, type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-[#173B45]/20 rounded-xl bg-white text-[#173B45] focus:outline-none focus:border-[#B43F3F]"
                >
                  <option value="manual">Manual Selection</option>
                  <option value="automatic">Automatic Rule-Based</option>
                </select>
              </div>

              {editingCollection.type === 'automatic' ? (
                <div className="p-4 bg-[#F8EDED]/50 border border-[#B43F3F]/10 rounded-2xl space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B43F3F]">Automatic Rules</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#173B45]/70 mb-0.5">Weave</label>
                      <input
                        type="text"
                        value={editingCollection.rules?.weave || ''}
                        onChange={(e) => setEditingCollection({
                          ...editingCollection,
                          rules: { ...editingCollection.rules!, weave: e.target.value }
                        })}
                        placeholder="e.g. Sambalpuri"
                        className="w-full px-3 py-1.5 border border-[#173B45]/20 rounded-lg text-xs bg-white text-[#173B45]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#173B45]/70 mb-0.5">Fabric</label>
                      <input
                        type="text"
                        value={editingCollection.rules?.fabric || ''}
                        onChange={(e) => setEditingCollection({
                          ...editingCollection,
                          rules: { ...editingCollection.rules!, fabric: e.target.value }
                        })}
                        placeholder="e.g. Silk"
                        className="w-full px-3 py-1.5 border border-[#173B45]/20 rounded-lg text-xs bg-white text-[#173B45]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#173B45]/70 mb-0.5">Category</label>
                      <input
                        type="text"
                        value={editingCollection.rules?.category || ''}
                        onChange={(e) => setEditingCollection({
                          ...editingCollection,
                          rules: { ...editingCollection.rules!, category: e.target.value }
                        })}
                        placeholder="e.g. Sarees"
                        className="w-full px-3 py-1.5 border border-[#173B45]/20 rounded-lg text-xs bg-white text-[#173B45]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#173B45]/70 mb-0.5">Min Price (₹)</label>
                      <input
                        type="number"
                        value={editingCollection.rules?.priceRange?.min || 0}
                        onChange={(e) => setEditingCollection({
                          ...editingCollection,
                          rules: {
                            ...editingCollection.rules!,
                            priceRange: { ...editingCollection.rules!.priceRange, min: Number(e.target.value) }
                          }
                        })}
                        className="w-full px-3 py-1.5 border border-[#173B45]/20 rounded-lg text-xs bg-white text-[#173B45]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#173B45]/70 mb-0.5">Max Price (₹)</label>
                      <input
                        type="number"
                        value={editingCollection.rules?.priceRange?.max || 1000000}
                        onChange={(e) => setEditingCollection({
                          ...editingCollection,
                          rules: {
                            ...editingCollection.rules!,
                            priceRange: { ...editingCollection.rules!.priceRange, max: Number(e.target.value) }
                          }
                        })}
                        className="w-full px-3 py-1.5 border border-[#173B45]/20 rounded-lg text-xs bg-white text-[#173B45]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#173B45]">Select Products</label>
                  <div className="max-h-48 overflow-y-auto border border-[#173B45]/20 rounded-xl p-3 bg-[#F8EDED]/10 space-y-2">
                    {productsList.map((prod) => {
                      const isSelected = editingCollection.products?.includes(prod._id);
                      return (
                        <div
                          key={prod._id}
                          onClick={() => toggleProductSelection(prod._id)}
                          className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-colors text-xs border ${
                            isSelected
                              ? 'bg-[#B43F3F]/10 border-[#B43F3F]/30 text-[#B43F3F]'
                              : 'bg-white border-[#173B45]/10 text-[#173B45]'
                          }`}
                        >
                          <div>
                            <p className="font-medium">{prod.name}</p>
                            <p className="text-[10px] text-[#173B45]/60">
                              {prod.weave} • {prod.fabric} • ₹{prod.price.toLocaleString()}
                            </p>
                          </div>
                          {isSelected && <CheckCircle2 size={16} className="text-[#B43F3F]" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="p-4 bg-[#173B45]/5 border border-[#173B45]/10 rounded-2xl space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#173B45]">SEO Meta Tags</h3>
                <div>
                  <label className="block text-[11px] font-medium text-[#173B45]/70 mb-0.5">Meta Title</label>
                  <input
                    type="text"
                    value={editingCollection.seo?.title || ''}
                    onChange={(e) => setEditingCollection({
                      ...editingCollection,
                      seo: { ...editingCollection.seo!, title: e.target.value }
                    })}
                    placeholder="Collection Meta Title"
                    className="w-full px-3 py-1.5 border border-[#173B45]/20 rounded-lg text-xs bg-white text-[#173B45]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#173B45]/70 mb-0.5">Meta Description</label>
                  <textarea
                    rows={2}
                    value={editingCollection.seo?.description || ''}
                    onChange={(e) => setEditingCollection({
                      ...editingCollection,
                      seo: { ...editingCollection.seo!, description: e.target.value }
                    })}
                    placeholder="Search snippet description"
                    className="w-full px-3 py-1.5 border border-[#173B45]/20 rounded-lg text-xs bg-white text-[#173B45]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editingCollection.isActive}
                  onChange={(e) => setEditingCollection({ ...editingCollection, isActive: e.target.checked })}
                  className="rounded border-[#173B45]/20 text-[#B43F3F] focus:ring-[#B43F3F]"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-[#173B45]">
                  Active storefront listing
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#B43F3F]/15">
            <button
              type="button"
              onClick={() => setEditingCollection(null)}
              className="px-5 py-2.5 border border-[#173B45]/20 text-[#173B45] hover:bg-[#F8EDED] transition-colors rounded-xl font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#B43F3F] text-[#F8EDED] hover:bg-[#FF8225] transition-colors rounded-xl font-medium text-sm shadow-sm"
            >
              <Save size={16} /> Save Collection
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-3xl border border-[#B43F3F]/10 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8EDED]/50 border-b border-[#B43F3F]/10 text-xs font-semibold uppercase tracking-wider text-[#173B45]/70">
              <th className="p-4">Banner</th>
              <th className="p-4">Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B43F3F]/5 text-sm text-[#173B45]">
            {collections.map((coll) => (
              <tr key={coll._id} className="hover:bg-[#F8EDED]/20 transition-colors">
                <td className="p-4 w-24">
                  <img src={coll.bannerImage} alt={coll.name} className="w-20 h-10 object-cover rounded-lg border border-[#173B45]/10" />
                </td>
                <td className="p-4 font-medium">{coll.name}</td>
                <td className="p-4 font-mono text-xs">{coll.slug}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    coll.type === 'automatic'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {coll.type}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    coll.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {coll.isActive ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(coll)}
                    className="p-2 text-[#173B45] hover:text-[#B43F3F] hover:bg-[#B43F3F]/5 rounded-lg transition-colors inline-block"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(coll._id)}
                    className="p-2 text-[#B43F3F] hover:text-red-700 hover:bg-red-50/50 rounded-lg transition-colors inline-block"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {collections.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-8 text-[#173B45]/60">
                  No collections defined yet. Click "Add Collection" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminCollections;
