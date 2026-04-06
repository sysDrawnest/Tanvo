import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OdiaLayout from '../../components/OdiaLayout';
import { useStore } from '../../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const OdiaProductDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, addToCart } = useStore();
    const [product, setProduct] = useState<any>(null);
    const [mainImage, setMainImage] = useState('');
    const PHONE = '9100000000';

    useEffect(() => {
        const found = products.find(p => p._id === id);
        if (found) {
            setProduct(found);
            setMainImage(found.images && found.images[0] ? found.images[0].url : '');
        }
    }, [id, products]);

    if (!product) return (
        <OdiaLayout>
            <div className="pt-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p>ଶାଢ଼ୀ ଖୋଜା ଚାଲିଛି...</p>
            </div>
        </OdiaLayout>
    );

    const whatsappMsg = encodeURIComponent(`Namaste, I want to order: ${product.name} (Code: ${product._id}). Price: ₹${product.price}`);

    return (
        <OdiaLayout>
            <div className="pt-6 pb-12">
                {/* Images Section */}
                <div className="mb-8">
                    <div className="rounded-3xl overflow-hidden shadow-soft bg-white aspect-[4/5] mb-4">
                        <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
                            {product.images.map((imgObj: any, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(imgObj.url)}
                                    className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${mainImage === imgObj.url ? 'border-primary shadow-glow' : 'border-transparent opacity-70'
                                        }`}
                                >
                                    <img src={imgObj.url} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="bg-white rounded-3xl p-7 shadow-soft border border-[#f0e2d6] text-left mb-10">
                    <div className="mb-6">
                        <span className="bg-secondary/10 text-secondary-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block italic">
                            Handmade Heritage
                        </span>
                        <h2 className="font-noto text-3xl font-bold text-[#2d2a24] leading-tight mb-2">
                            {product.name}
                        </h2>
                        <div className="flex items-center gap-3">
                            <span className="text-primary text-3xl font-black">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-[#6b6259] line-through text-lg opacity-60">₹{product.originalPrice}</span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 mb-10 text-left">
                        <div>
                            <h3 className="font-bold text-sm uppercase tracking-widest text-[#6b6259] mb-2">ଶ୍ରେଣୀ</h3>
                            <p className="text-lg font-medium">{product.category && product.category.length > 0 ? product.category.join(' • ') : 'ହସ୍ତତନ୍ତ'}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm uppercase tracking-widest text-[#6b6259] mb-2">ବିବରଣୀ</h3>
                            <p className="text-[#4a4238] leading-relaxed italic">
                                {product.description || "ଓଡ଼ିଶାର ବୁଣାକାରଙ୍କ ଦ୍ୱାରା ପ୍ରସ୍ତୁତ ଅସଲି ହସ୍ତତନ୍ତ ଶାଢ଼ୀ। ଏହାର କଳା ଓ କାରିଗରୀ ଅନନ୍ୟ ଏବଂ ଓଡ଼ିଆ ପରମ୍ପରାର ପ୍ରତିକ।"}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={() => {
                                addToCart(product._id);
                                navigate('/odia/cart');
                            }}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all btn-tap hover:shadow-xl"
                        >
                            <span className="material-symbols-outlined">shopping_cart</span> ବ୍ୟାଗରେ ଯୋଡନ୍ତୁ
                        </button>

                        <a
                            href={`https://wa.me/${PHONE}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all btn-tap hover:shadow-xl no-underline"
                        >
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                            ହ୍ୱାଟ୍ସଆପ୍ ଅର୍ଡର
                        </a>
                    </div>
                </div>

                {/* Related Products Section */}
                <section className="mb-12">
                    <h3 className="font-noto text-2xl font-bold mb-6 text-left">ଆପଣଙ୍କୁ ଏହା ବି ପସନ୍ଦ ଆସିପାରେ</h3>
                    <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
                        {products
                            .filter(p => {
                                if (p._id === id) return false;
                                const pCats = Array.isArray(p.category) ? p.category : [];
                                const currentCats = Array.isArray(product.category) ? product.category : [];
                                return pCats.some(c => currentCats.includes(c));
                            })
                            .slice(0, 4)
                            .map((related) => (
                                <div
                                    key={related._id}
                                    onClick={() => navigate(`/odia/product/${related._id}`)}
                                    className="w-64 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-soft border border-[#f0e2d6] text-left cursor-pointer"
                                >
                                    <div className="aspect-[4/5] overflow-hidden">
                                        <img src={related.images?.[0]?.url || ''} alt={related.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-base truncate">{related.name}</h4>
                                        <p className="text-primary font-black mt-1">₹{related.price}</p>
                                    </div>
                                </div>
                            ))}
                        {/* Fallback if no specific related products found through categories */}
                        {products.filter(p => p._id !== id && Array.isArray(p.category) && Array.isArray(product.category) && p.category.some(c => product.category.includes(c))).length === 0 &&
                            products.filter(p => p._id !== id).slice(0, 4).map((related) => (
                                <div
                                    key={related._id}
                                    onClick={() => navigate(`/odia/product/${related._id}`)}
                                    className="w-64 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-soft border border-[#f0e2d6] text-left cursor-pointer"
                                >
                                    <div className="aspect-[4/5] overflow-hidden">
                                        <img src={related.images?.[0]?.url || ''} alt={related.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-base truncate">{related.name}</h4>
                                        <p className="text-primary font-black mt-1">₹{related.price}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>

                {/* Trust Badges */}
                <div className="mt-10 grid grid-cols-2 gap-4">
                    <div className="bg-[#f3ebe2] p-4 rounded-2xl flex flex-col items-center text-center">
                        <span className="material-symbols-outlined text-secondary text-3xl mb-2">verified</span>
                        <span className="text-xs font-bold text-on-surface">୧୦୦% ଅସଲି</span>
                    </div>
                    <div className="bg-[#f3ebe2] p-4 rounded-2xl flex flex-col items-center text-center">
                        <span className="material-symbols-outlined text-secondary text-3xl mb-2">local_shipping</span>
                        <span className="text-xs font-bold text-on-surface">ମାଗଣା ସିପିଂ</span>
                    </div>
                </div>
            </div>
        </OdiaLayout>
    );
};

export default OdiaProductDetail;
