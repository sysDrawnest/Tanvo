import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OdiaLayout from '../../components/OdiaLayout';
import { useStore } from '../../context/StoreContext';

const OdiaShop: React.FC = () => {
    const navigate = useNavigate();
    const { products } = useStore();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = ['ସମ୍ବଲପୁରୀ', 'ବୋମକାଇ', 'ଖଣ୍ଡୁଆ', 'ପସପାଳି', 'କୋଟପାଡ଼', 'ସିଲ୍କ'];

    const filteredProducts = selectedCategory
        ? products.filter(p => p.category.includes(selectedCategory))
        : products;

    return (
        <OdiaLayout>
            <div className="pt-6 pb-10">
                <h2 className="font-noto text-3xl font-bold mb-6 text-left">ସମସ୍ତ ସଂଗ୍ରହ</h2>

                {/* Categories Filter (horizontal scroll) */}
                <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-6 py-2.5 rounded-full whitespace-nowrap font-bold transition-all btn-tap ${selectedCategory === null
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-white text-[#2d2a24] border border-[#f0e2d6] shadow-soft'
                            }`}
                    >
                        ସବୁ ଦେଖନ୍ତୁ
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-full whitespace-nowrap font-bold transition-all btn-tap ${selectedCategory === cat
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-white text-[#2d2a24] border border-[#f0e2d6] shadow-soft'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => navigate(`/odia/product/${product._id}`)}
                            className="group bg-white rounded-2xl overflow-hidden shadow-soft border border-[#f0e2d6] transition-all hover:shadow-card-hover cursor-pointer"
                        >
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    src={product.images && product.images[0] ? product.images[0].url : ''}
                                    alt={product.name}
                                />
                                {product.isNewArrival && (
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-bold text-secondary">
                                        ନୂଆ
                                    </div>
                                )}
                            </div>
                            <div className="p-5 text-left">
                                <h4 className="text-xl font-bold mb-1">{product.name}</h4>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-primary text-2xl font-black">₹{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-[#6b6259] line-through text-sm">₹{product.originalPrice}</span>
                                    )}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/odia/product/${product._id}`);
                                    }}
                                    className="w-full bg-[#f0e3d4] text-on-surface hover:bg-primary hover:text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 btn-tap"
                                >
                                    <span className="material-symbols-outlined">add_shopping_cart</span> ବ୍ୟାଗରେ ଯୋଡନ୍ତୁ
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-soft border border-[#f0e2d6]">
                        <span className="material-symbols-outlined text-6xl text-[#6b6259]/30 mb-4">search_off</span>
                        <p className="text-[#6b6259] font-medium text-lg">ଏହି ଶ୍ରେଣୀରେ କୌଣସି ଶାଢ଼ୀ ମିଳିଲା ନାହିଁ।</p>
                    </div>
                )}
            </div>
        </OdiaLayout>
    );
};

export default OdiaShop;
