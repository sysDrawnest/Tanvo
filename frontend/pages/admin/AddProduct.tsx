import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Save, ArrowLeft } from 'lucide-react';
import API from '../../services/api';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    originalPrice: '',
    category: 'Women',
    subCategory: 'Sarees',
    weave: 'Sambalpuri',
    fabric: 'Silk',
    stock: '',
    colors: '',
    sizes: '',
    length: '6.3 meters',
    blousePiece: true,
    careInstructions: 'Dry clean only. Store in muslin cloth.',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    tags: '',
    weaverName: '',
    weaverGeneration: '',
    weaverLocation: '',
    weaverStory: ''
  });

  const categories = ['Women', 'Men', 'Accessories', 'Home Decor'];
  const subCategories = {
    Women: ['Sarees', 'Kurtis', 'Blouses', 'Lehengas'],
    Men: ['Kurta', 'Dhoti', 'Sherwani', 'Pajama'],
    Accessories: ['Jewelry', 'Bags', 'Footwear', 'Stoles'],
    'Home Decor': ['Bedspreads', 'Cushions', 'Curtains', 'Table Linen']
  };
  const weaves = ['Sambalpuri', 'Bomkai', 'Ikat', 'Khandua', 'Pasapali', 'Sonepuri'];
  const fabrics = ['Silk', 'Cotton', 'Tussar', 'Matka', 'Linen', 'Muslin'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== files.length) {
      alert('Some files were skipped. Please upload only images under 5MB.');
    }

    setImages(prev => [...prev, ...validFiles]);

    // Create preview URLs
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (images.length === 0) {
      alert('Please upload at least one product image');
      return;
    }

    if (!formData.name || !formData.price || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formDataToSend.append(key, value.toString());
        }
      });

      // Append images
      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const { data } = await API.post('/admin/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        alert('Product added successfully!');
        navigate('/admin/products');
      }
    } catch (error: any) {
      console.error('Error adding product:', error);
      alert(error.response?.data?.message || 'Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-display font-bold text-[#0D0B0A]">Add New Product</h1>
          <p className="text-gray-500 mt-1">Fill in the details to add a new product to your inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                placeholder="e.g., Royal Maroon Sambalpuri Silk Saree"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub Category <span className="text-red-500">*</span>
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
              >
                {subCategories[formData.category as keyof typeof subCategories]?.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weave Type <span className="text-red-500">*</span>
              </label>
              <select
                name="weave"
                value={formData.weave}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
              >
                {weaves.map(weave => (
                  <option key={weave} value={weave}>{weave}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fabric <span className="text-red-500">*</span>
              </label>
              <select
                name="fabric"
                value={formData.fabric}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
              >
                {fabrics.map(fabric => (
                  <option key={fabric} value={fabric}>{fabric}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              maxLength={200}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
              placeholder="Brief description (max 200 characters)"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
              placeholder="Detailed product description..."
            />
          </div>
        </div>

        {/* Pricing and Stock */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Pricing & Stock</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
                placeholder="e.g., 12500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₹) <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
                placeholder="e.g., 15000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
                placeholder="e.g., 10"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Product Images</h2>
          
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="images"
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Upload size={20} />
              Upload Images
            </label>
            <p className="text-sm text-gray-500 mt-2">
              You can upload multiple images. First image will be primary. Max 5MB per image.
            </p>
          </div>

          {imagePreviews.length > 0 && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  {index === 0 && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-[#C9A84C] text-white text-xs rounded-full">
                      Primary
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Product Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colors (comma separated)
              </label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                placeholder="Red, Blue, Green"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sizes (comma separated)
              </label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                placeholder="S, M, L, XL"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length
              </label>
              <input
                type="text"
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
                placeholder="e.g., 6.3 meters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="wedding, festival, traditional"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="blousePiece"
                checked={formData.blousePiece}
                onChange={handleChange}
                className="w-4 h-4 text-[#C9A84C] rounded focus:ring-[#C9A84C]"
              />
              <span className="text-sm text-gray-700">Blouse piece included</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-[#C9A84C] rounded focus:ring-[#C9A84C]"
              />
              <span className="text-sm text-gray-700">Feature on homepage</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isBestSeller"
                checked={formData.isBestSeller}
                onChange={handleChange}
                className="w-4 h-4 text-[#C9A84C] rounded focus:ring-[#C9A84C]"
              />
              <span className="text-sm text-gray-700">Mark as Best Seller</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isNewArrival"
                checked={formData.isNewArrival}
                onChange={handleChange}
                className="w-4 h-4 text-[#C9A84C] rounded focus:ring-[#C9A84C]"
              />
              <span className="text-sm text-gray-700">Mark as New Arrival</span>
            </label>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Care Instructions
            </label>
            <textarea
              name="careInstructions"
              value={formData.careInstructions}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
            />
          </div>
        </div>

        {/* Weaver Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Weaver Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weaver Name
              </label>
              <input
                type="text"
                name="weaverName"
                value={formData.weaverName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
                placeholder="e.g., Meher Weavers Cooperative"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generation
              </label>
              <input
                type="text"
                name="weaverGeneration"
                value={formData.weaverGeneration}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
                placeholder="e.g., 4th Generation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="weaverLocation"
                value={formData.weaverLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
                placeholder="e.g., Bargarh, Odisha"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weaver Story
            </label>
            <textarea
              name="weaverStory"
              value={formData.weaverStory}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C9A84C]"
              placeholder="Tell the story of the weaver family..."
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;