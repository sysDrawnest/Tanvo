import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import OdiaLayout from '../../components/OdiaLayout';

const PHONE = '918658000000'; // Replace with actual number
const WHATSAPP_MSG = encodeURIComponent('ନମସ୍କାର! ମୁଁ ଏକ ଶାଢ଼ି ଅର୍ଡ଼ର କରିବାକୁ ଚାହୁଁଛି।');

const categories = [
    { label: 'ସମ୍ବଲପୁରୀ', emoji: '🌸', filter: 'Sambalpuri' },
    { label: 'ଇକାଟ', emoji: '🎨', filter: 'Ikat' },
    { label: 'ରେଶମ', emoji: '✨', filter: 'Silk' },
    { label: 'ସୂତା', emoji: '🧵', filter: 'Cotton' },
];

const OdiaHome: React.FC = () => {
    const navigate = useNavigate();
    const { products, fetchProducts, loading } = useStore();
    const [featured, setFeatured] = useState<any[]>([]);

    useEffect(() => {
        fetchProducts({ limit: 6 });
    }, []);

    useEffect(() => {
        if (products.length > 0) setFeatured(products.slice(0, 6));
    }, [products]);

    return (
        <OdiaLayout>
            {/* Hero Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #1a120b 0%, #3d2b1f 100%)',
                padding: '40px 20px 32px',
                textAlign: 'center',
            }}>
                <p style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 13, color: '#C9A84C', letterSpacing: '0.1em', marginBottom: 8 }}>
                    ସ୍ୱାଗତ — TANVO ରେ
                </p>
                <h1 style={{
                    fontFamily: "'Noto Sans Odia', sans-serif",
                    fontSize: 'clamp(28px, 7vw, 42px)',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.3,
                    marginBottom: 16,
                }}>
                    ହସ୍ତତନ୍ତ ଶାଢ଼ି<br />
                    <span style={{ color: '#C9A84C' }}>ଗ୍ରାମୀଣ ଓଡ଼ିଶାରୁ</span>
                </h1>
                <p style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 28, lineHeight: 1.6 }}>
                    ସ™ ଶ୍ରେଷ୍ଠ ଓଡ଼ିଆ ଶିଳ୍ପୀଙ୍କ ହସ୍ତରେ ତିଆରି ଶାଢ଼ି
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => navigate('/odia/shop')}
                        style={{
                            background: '#C9A84C',
                            color: '#1a120b',
                            border: 'none',
                            borderRadius: 50,
                            padding: '14px 32px',
                            fontSize: 16,
                            fontFamily: "'Noto Sans Odia', sans-serif",
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
                        }}
                    >
                        🛍️ ଏବେ ଶାଢ଼ି ଦେଖ
                    </button>
                    <a
                        href={`https://wa.me/${PHONE}?text=${WHATSAPP_MSG}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: '#25D366',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 50,
                            padding: '14px 28px',
                            fontSize: 15,
                            fontFamily: "'Noto Sans Odia', sans-serif",
                            fontWeight: 700,
                            cursor: 'pointer',
                            textDecoration: 'none',
                            display: 'inline-block',
                        }}
                    >
                        💬 WhatsApp ଅର୍ଡ଼ର
                    </a>
                </div>
            </div>

            {/* Category Tiles */}
            <div style={{ padding: '24px 16px 8px' }}>
                <h2 style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 16, fontWeight: 700, color: '#1a120b', marginBottom: 14 }}>
                    ବର୍ଗ ଅନୁସାରେ ଦେଖ
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                    {categories.map((cat) => (
                        <button
                            key={cat.label}
                            onClick={() => navigate(`/odia/shop?category=${cat.filter}`)}
                            style={{
                                background: '#fff',
                                border: '1.5px solid #e5e0d8',
                                borderRadius: 12,
                                padding: '18px 12px',
                                fontSize: 15,
                                fontFamily: "'Noto Sans Odia', sans-serif",
                                fontWeight: 600,
                                color: '#1a120b',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            }}
                        >
                            <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Products */}
            <div style={{ padding: '24px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <h2 style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 16, fontWeight: 700, color: '#1a120b' }}>
                        ଲୋକପ୍ରିୟ ଶାଢ଼ି
                    </h2>
                    <button onClick={() => navigate('/odia/shop')} style={{ background: 'none', border: 'none', color: '#C9A84C', fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                        ସବୁ ଦେଖ →
                    </button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: "'Noto Sans Odia', sans-serif", color: '#888' }}>ଲୋଡ଼ ହେଉଛି...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                        {featured.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => navigate(`/odia/product/${product._id}`)}
                                style={{
                                    background: '#fff',
                                    borderRadius: 12,
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                                    cursor: 'pointer',
                                    border: '1px solid #f0ebe3',
                                }}
                            >
                                <img
                                    src={product.images?.[0]?.url || '/placeholder.jpg'}
                                    alt={product.name}
                                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }}
                                />
                                <div style={{ padding: '10px 12px 14px' }}>
                                    <p style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 13, fontWeight: 600, color: '#1a120b', marginBottom: 4, lineHeight: 1.3 }}>
                                        {product.name}
                                    </p>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700, color: '#C9A84C', marginBottom: 8 }}>
                                        ₹{product.price?.toLocaleString('en-IN')}
                                    </p>
                                    <button
                                        style={{
                                            width: '100%',
                                            background: '#1a120b',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: 8,
                                            padding: '9px 0',
                                            fontSize: 13,
                                            fontFamily: "'Noto Sans Odia', sans-serif",
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ଦେଖ
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Direct Call Banner */}
            <div style={{
                margin: '8px 16px 24px',
                background: 'linear-gradient(90deg, #1a120b, #3d2b1f)',
                borderRadius: 16,
                padding: '20px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                textAlign: 'center',
            }}>
                <p style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 15, color: '#fff', fontWeight: 600 }}>
                    ଫୋନ୍ ରେ ଅର୍ଡ଼ର ଦିଅ
                </p>
                <p style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
                    ସିଧା ଆମ ଦଳ ସହ କଥା ହୁଅ
                </p>
                <a
                    href={`tel:+${PHONE}`}
                    style={{
                        background: '#C9A84C',
                        color: '#1a120b',
                        borderRadius: 50,
                        padding: '13px 36px',
                        fontSize: 16,
                        fontFamily: "'Noto Sans Odia', sans-serif",
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-block',
                    }}
                >
                    📞 ଏବେ ଡ଼ାକ
                </a>
            </div>
        </OdiaLayout>
    );
};

export default OdiaHome;
