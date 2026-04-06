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
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'desc' | 'specs'>('desc');
    const PHONE = '918249000000';

    useEffect(() => {
        const found = products.find(p => p._id === id);
        if (found) {
            setProduct(found);
            setMainImage(found.images && found.images[0] ? found.images[0].url : '');
        }
        window.scrollTo(0, 0);
    }, [id, products]);

    if (!product) return (
        <OdiaLayout>
            <div className="pt-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p>ଶାଢ଼ୀ ଖୋଜା ଚାଲିଛି...</p>
            </div>
        </OdiaLayout>
    );

    const whatsappMsg = encodeURIComponent(`Namaste Tanvo, I want to order: ${product.nameOdia || product.name} (ID: ${product._id}). Price: ₹${product.price}`);

    const handleBuyNow = () => {
        addToCart(product._id, quantity);
        navigate('/odia/checkout');
    };

    return (
        <OdiaLayout>
            <div className="pt-4 pb-20">
                {/* Product Card */}
                <div className="bg-white rounded-3xl shadow-soft overflow-hidden mb-8 border border-[#f0e2d6]">
                    {/* Main Image */}
                    <div className="p-4">
                        <div
                            className="rounded-2xl overflow-hidden shadow-md bg-[#f5ede5] aspect-[4/5] relative cursor-zoom-in"
                            onClick={() => window.open(mainImage, '_blank')}
                        >
                            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Thumbnails */}
                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-4">
                            {product.images.map((imgObj: any, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(imgObj.url)}
                                    className={`w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${mainImage === imgObj.url ? 'border-primary shadow-glow scale-95' : 'border-transparent opacity-70'}`}
                                >
                                    <img src={imgObj.url} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Details Panel */}
                    <div className="p-6 pt-0 text-left">
                        <div className="mb-4">
                            <span className="bg-secondary/20 text-secondary text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3">
                                {product.isNewArrival ? 'New Arrival' : 'Premium Collection'}
                            </span>
                            <h1 className="font-noto text-2xl md:text-3xl font-bold leading-tight mb-1 text-[#2d2a24]">
                                {product.nameOdia || product.name}
                            </h1>
                            <p className="text-[#6b6259] text-sm italic">{product.name}</p>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-black text-primary">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-[#6b6259] line-through text-lg opacity-60">₹{product.originalPrice}</span>
                            )}
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </span>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-6 mb-8">
                            <span className="font-bold text-[#2d2a24]">ସଂଖ୍ୟା:</span>
                            <div className="flex items-center bg-[#f3ebe2] rounded-2xl p-1 shadow-inner">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 flex items-center justify-center text-primary font-bold text-2xl btn-tap"
                                >
                                    remove
                                </button>
                                <span className="px-6 text-xl font-black text-on-surface">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                    className="w-12 h-12 flex items-center justify-center text-primary font-bold text-2xl btn-tap"
                                >
                                    add
                                </button>
                            </div>
                        </div>

                        {/* Primary Actions */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button
                                onClick={() => addToCart(product._id, quantity)}
                                className="bg-[#f3ebe2] text-primary py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all btn-tap border border-primary/10 shadow-sm"
                            >
                                <span className="material-symbols-outlined">shopping_basket</span> ବ୍ୟାଗରେ ଯୋଡନ୍ତୁ
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all btn-tap hover:bg-primaryDark"
                            >
                                ଏବେ କିଣନ୍ତୁ
                            </button>
                        </div>

                        {/* Contact Actions */}
                        <div className="flex justify-between items-center py-4 border-y border-[#f0e2d6] mb-8">
                            <button onClick={() => window.location.href = `tel:+${PHONE}`} className="flex flex-col items-center gap-1 group">
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-all">call</span>
                                <span className="text-xs font-bold">କଲ୍</span>
                            </button>
                            <a href={`https://wa.me/${PHONE}?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 group no-underline text-inherit">
                                <span className="material-symbols-outlined text-[#25D366] bg-[#25D366]/10 p-3 rounded-full group-hover:bg-[#25D366] group-hover:text-white transition-all" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                                <span className="text-xs font-bold">ୱ୍ହାଟ୍ସଆପ୍</span>
                            </a>
                            <button className="flex flex-col items-center gap-1 group">
                                <span className="material-symbols-outlined text-secondary bg-secondary/10 p-3 rounded-full group-hover:bg-secondary group-hover:text-white transition-all">local_shipping</span>
                                <span className="text-xs font-bold">ପିନ୍ ଚେକ୍</span>
                            </button>
                        </div>

                        {/* Weaver Story Card */}
                        <div className="bg-[#f9f2ea] p-5 rounded-2xl border border-secondary/10 mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="material-symbols-outlined text-primary">handshake</span>
                                <span className="font-bold text-sm uppercase tracking-wider">Handloom Certified</span>
                            </div>
                            <p className="text-sm text-[#4a4238] leading-relaxed italic mb-3">
                                ୭ମ ପିଢ଼ିର ମାଷ୍ଟର ବୁଣାକାରଙ୍କ ଦ୍ୱାରା ବରପାଲି, ଓଡ଼ିଶାରେ ପ୍ରସ୍ତୁତ। ପରମ୍ପରାକୁ ଜୀଇଁ ରଖିଛନ୍ତି ଏହି ବଂଶର ବୁଣାକାର।
                            </p>
                            <button className="text-primary font-bold text-sm flex items-center gap-1">ବୁଣାକାରଙ୍କ ବିଷୟରେ ଜାଣନ୍ତୁ →</button>
                        </div>

                        {/* Tabs */}
                        <div className="mb-6">
                            <div className="flex gap-6 border-b border-[#f0e2d6] mb-4">
                                <button
                                    onClick={() => setActiveTab('desc')}
                                    className={`pb-2 font-bold transition-all relative ${activeTab === 'desc' ? 'text-primary' : 'text-[#6b6259]'}`}
                                >
                                    ବର୍ଣ୍ଣନା
                                    {activeTab === 'desc' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                                </button>
                                <button
                                    onClick={() => setActiveTab('specs')}
                                    className={`pb-2 font-bold transition-all relative ${activeTab === 'specs' ? 'text-primary' : 'text-[#6b6259]'}`}
                                >
                                    ସ୍ପେସିଫିକେସନ୍
                                    {activeTab === 'specs' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                                </button>
                            </div>

                            <div className="text-sm leading-relaxed text-[#4a4238]">
                                {activeTab === 'desc' ? (
                                    <p>{product.description || "ଓଡ଼ିଶାର ବୁଣାକାରଙ୍କ ଦ୍ୱାରା ପ୍ରସ୍ତୁତ ଅସଲି ହସ୍ତତନ୍ତ ଶାଢ଼ୀ। ଏହି ଶାଢ଼ୀରେ ଇକତ୍ କଳାର ସୂକ୍ଷ୍ମ କାରୁକାର୍ଯ୍ୟ କରାଯାଇଛି।"}</p>
                                ) : (
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>ବୁଣାଶୈଳୀ: ପାରମ୍ପରିକ ଇକତ୍ / ବୁଣାକାରଙ୍କ ହାତ କାମ</li>
                                        <li>ସାମଗ୍ରୀ: ଶୁଦ୍ଧ ସୂତି ବା ସିଲ୍କ</li>
                                        <li>ଲମ୍ବ: ୬.୩ ମିଟର (ବ୍ଲାଉଜ୍ ପିସ୍ ସହ)</li>
                                        <li>ଉତ୍ପତ୍ତି: ଓଡ଼ିଶା, ଭାରତ</li>
                                        <li>ଧୁଆଧୋଇ: କେବଳ ଡ୍ରାଏ କ୍ଲିନ୍</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="text-left">
                    <h3 className="font-noto text-2xl font-bold mb-6 italic">ଆପଣ ଏହା ମଧ୍ୟ ପସନ୍ଦ କରିପାରନ୍ତି</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {products.filter(p => p._id !== id).slice(0, 2).map(rec => (
                            <div
                                key={rec._id}
                                onClick={() => navigate(`/odia/product/${rec._id}`)}
                                className="bg-white p-3 rounded-2xl shadow-soft border border-[#f0e2d6] btn-tap"
                            >
                                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-2 bg-[#f5ede5]">
                                    <img src={rec.images?.[0]?.url} alt="" className="w-full h-full object-cover" />
                                </div>
                                <p className="font-bold text-sm line-clamp-1">{rec.nameOdia || rec.name}</p>
                                <p className="text-primary font-black">₹{rec.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </OdiaLayout>
    );
};

export default OdiaProductDetail;
