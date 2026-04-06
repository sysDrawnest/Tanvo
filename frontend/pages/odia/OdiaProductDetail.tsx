import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import OdiaLayout from '../../components/OdiaLayout';

const PHONE = '918658000000';

const OdiaProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { fetchProductById, addToCart } = useStore();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetchProductById(id).then((p) => {
                setProduct(p);
                setLoading(false);
            });
        }
    }, [id]);

    const handleAddToCart = async () => {
        if (!product) return;
        await addToCart(product._id, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const whatsappMsg = encodeURIComponent(
        `ନମସ୍କାର! ମୁଁ ${product?.name || 'ଏହି ଶାଢ଼ି'} ଅର୍ଡ଼ର କରିବାକୁ ଚାହୁଁଛି। ଦୟାକରି ବିବରଣ ଦିଅନ୍ତୁ।`
    );

    if (loading) {
        return (
            <OdiaLayout>
                <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 18, color: '#888' }}>
                    ଶାଢ଼ି ଲୋଡ଼ ହେଉଛି...
                </div>
            </OdiaLayout>
        );
    }

    if (!product) {
        return (
            <OdiaLayout>
                <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 16, color: '#888' }}>
                    ଶାଢ଼ି ମିଳିଲା ନାହିଁ।
                    <button onClick={() => navigate('/odia/shop')} style={{ display: 'block', margin: '16px auto', background: '#1a120b', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 14, cursor: 'pointer' }}>
                        ← ଫେରନ୍ତୁ
                    </button>
                </div>
            </OdiaLayout>
        );
    }

    const images = product.images || [];

    return (
        <OdiaLayout>
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    background: 'none', border: 'none', padding: '12px 16px',
                    fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 14,
                    color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                }}
            >
                ← ଫେରନ୍ତୁ
            </button>

            {/* Product Image */}
            <div style={{ position: 'relative', background: '#f7f3ee' }}>
                <img
                    src={images[activeImage]?.url || '/placeholder.jpg'}
                    alt={product.name}
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
                />
                {images.length > 1 && (
                    <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
                        {images.map((_: any, i: number) => (
                            <button key={i} onClick={() => setActiveImage(i)} style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', background: i === activeImage ? '#C9A84C' : 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 0 }} />
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div style={{ padding: '20px 16px' }}>
                <h1 style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 20, fontWeight: 700, color: '#1a120b', marginBottom: 6, lineHeight: 1.3 }}>
                    {product.name}
                </h1>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 26, fontWeight: 700, color: '#C9A84C' }}>
                        ₹{product.price?.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#aaa', textDecoration: 'line-through' }}>
                            ₹{product.originalPrice?.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>

                {product.fabric && (
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                        <span style={{ background: '#f0ebe3', borderRadius: 6, padding: '5px 12px', fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 12, color: '#6b5e4e' }}>
                            🧵 {product.fabric}
                        </span>
                        {product.weave && (
                            <span style={{ background: '#f0ebe3', borderRadius: 6, padding: '5px 12px', fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 12, color: '#6b5e4e' }}>
                                ✨ {product.weave}
                            </span>
                        )}
                    </div>
                )}

                {product.description && (
                    <p style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 14, color: '#6b5e4e', lineHeight: 1.7, marginBottom: 20 }}>
                        {product.description?.length > 150 ? product.description.slice(0, 150) + '...' : product.description}
                    </p>
                )}

                {/* CTA Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button
                        onClick={handleAddToCart}
                        style={{
                            width: '100%',
                            background: added ? '#4CAF50' : '#1a120b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 12,
                            padding: '16px 0',
                            fontSize: 17,
                            fontFamily: "'Noto Sans Odia', sans-serif",
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'background 0.3s ease',
                        }}
                    >
                        {added ? '✓ ଯୋଡ଼ା ହୋଇଗଲା!' : '🛒 ଗାଡ଼ିରେ ପକାନ୍ତୁ'}
                    </button>
                    <a
                        href={`https://wa.me/${PHONE}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'block',
                            width: '100%',
                            background: '#25D366',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 12,
                            padding: '16px 0',
                            fontSize: 17,
                            fontFamily: "'Noto Sans Odia', sans-serif",
                            fontWeight: 700,
                            textDecoration: 'none',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                        }}
                    >
                        💬 WhatsApp ଅର୍ଡ଼ର
                    </a>
                    <a
                        href={`tel:+${PHONE}`}
                        style={{
                            display: 'block',
                            width: '100%',
                            background: '#fff',
                            color: '#1a120b',
                            border: '2px solid #e0dbd2',
                            borderRadius: 12,
                            padding: '15px 0',
                            fontSize: 17,
                            fontFamily: "'Noto Sans Odia', sans-serif",
                            fontWeight: 700,
                            textDecoration: 'none',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                        }}
                    >
                        📞 ଫୋନ୍ ରେ ଅର୍ଡ଼ର
                    </a>
                </div>

                {/* Trust Badges */}
                <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center' }}>
                    {[{ icon: '🚚', label: 'ଦ୍ରୁତ ଡ଼େଲିଭରି' }, { icon: '↩️', label: 'ସହଜ ଫେରତ' }, { icon: '✅', label: 'ଅସଲ ଶାଢ଼ି' }].map(b => (
                        <div key={b.label} style={{ background: '#f7f3ee', borderRadius: 10, padding: '12px 4px' }}>
                            <div style={{ fontSize: 20, marginBottom: 4 }}>{b.icon}</div>
                            <p style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 10, color: '#6b5e4e', lineHeight: 1.3 }}>{b.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </OdiaLayout>
    );
};

export default OdiaProductDetail;
