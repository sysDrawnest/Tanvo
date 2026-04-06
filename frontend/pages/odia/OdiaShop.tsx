import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import OdiaLayout from '../../components/OdiaLayout';

const PHONE = '918658000000';
const WHATSAPP_MSG = encodeURIComponent('ନମସ୍କାର! ମୁଁ ଏକ ଶାଢ଼ି ଅର୍ଡ଼ର କରିବାକୁ ଚାହୁଁଛି।');

const categoryLabels: Record<string, string> = {
    Sambalpuri: 'ସମ୍ବଲପୁରୀ',
    Ikat: 'ଇକାଟ',
    Silk: 'ରେଶମ',
    Cotton: 'ସୂତା',
};

const OdiaShop: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category') || '';
    const { products, fetchProducts, loading } = useStore();
    const [activeFilter, setActiveFilter] = useState(categoryFilter);

    useEffect(() => {
        fetchProducts(activeFilter ? { category: activeFilter, limit: 24 } : { limit: 24 });
    }, [activeFilter]);

    return (
        <OdiaLayout>
            {/* Page Title */}
            <div style={{ padding: '20px 16px 8px', background: '#fff', marginBottom: 12 }}>
                <h1 style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 22, fontWeight: 700, color: '#1a120b', marginBottom: 4 }}>
                    ସବୁ ଶାଢ଼ି
                </h1>
                <p style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 13, color: '#888' }}>
                    ହସ୍ତତନ୍ତ ଶ୍ରେଷ୍ଠ ସଂଗ୍ରହ
                </p>
            </div>

            {/* Category Filters */}
            <div style={{ padding: '0 12px 12px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
                <button
                    onClick={() => setActiveFilter('')}
                    style={{
                        flexShrink: 0,
                        padding: '8px 18px',
                        borderRadius: 50,
                        border: '1.5px solid',
                        borderColor: !activeFilter ? '#C9A84C' : '#ddd',
                        background: !activeFilter ? '#fff5e6' : '#fff',
                        color: !activeFilter ? '#C9A84C' : '#666',
                        fontFamily: "'Noto Sans Odia', sans-serif",
                        fontSize: 13,
                        fontWeight: !activeFilter ? 700 : 400,
                        cursor: 'pointer',
                    }}
                >
                    ସବୁ
                </button>
                {Object.entries(categoryLabels).map(([eng, odia]) => (
                    <button
                        key={eng}
                        onClick={() => setActiveFilter(eng)}
                        style={{
                            flexShrink: 0,
                            padding: '8px 18px',
                            borderRadius: 50,
                            border: '1.5px solid',
                            borderColor: activeFilter === eng ? '#C9A84C' : '#ddd',
                            background: activeFilter === eng ? '#fff5e6' : '#fff',
                            color: activeFilter === eng ? '#C9A84C' : '#666',
                            fontFamily: "'Noto Sans Odia', sans-serif",
                            fontSize: 13,
                            fontWeight: activeFilter === eng ? 700 : 400,
                            cursor: 'pointer',
                        }}
                    >
                        {odia}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div style={{ padding: '0 12px 24px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 16, color: '#888' }}>
                        ଲୋଡ଼ ହେଉଛି...
                    </div>
                ) : products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: "'Noto Sans Odia', sans-serif", color: '#888' }}>
                        ଏହି ବିଭାଗରେ ଶାଢ଼ି ମିଳିଲା ନାହିଁ
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                        {products.map((product: any) => (
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
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={product.images?.[0]?.url || '/placeholder.jpg'}
                                        alt={product.name}
                                        style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
                                    />
                                    {product.isBestSeller && (
                                        <span style={{
                                            position: 'absolute', top: 8, left: 8,
                                            background: '#C9A84C', color: '#1a120b',
                                            fontSize: 9, fontFamily: "'Noto Sans Odia', sans-serif",
                                            fontWeight: 700, padding: '3px 7px', borderRadius: 4,
                                        }}>
                                            ସ™ ଲୋକପ୍ରିୟ
                                        </span>
                                    )}
                                </div>
                                <div style={{ padding: '10px 11px 13px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ fontFamily: "'Noto Sans Odia', sans-serif", fontSize: 12, fontWeight: 600, color: '#1a120b', marginBottom: 4, lineHeight: 1.4, flex: 1 }}>
                                        {product.name}
                                    </p>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700, color: '#C9A84C', marginBottom: 8 }}>
                                        ₹{product.price?.toLocaleString('en-IN')}
                                    </p>
                                    <button style={{
                                        width: '100%', background: '#1a120b', color: '#fff',
                                        border: 'none', borderRadius: 8, padding: '10px 0',
                                        fontSize: 13, fontFamily: "'Noto Sans Odia', sans-serif",
                                        fontWeight: 700, cursor: 'pointer',
                                    }}>
                                        ଏବେ କିଣନ୍ତୁ
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer WhatsApp CTA */}
            <div style={{ padding: '0 16px 20px', textAlign: 'center' }}>
                <a
                    href={`https://wa.me/${PHONE}?text=${WHATSAPP_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'block',
                        background: '#25D366',
                        color: '#fff',
                        borderRadius: 12,
                        padding: '15px 0',
                        fontSize: 16,
                        fontFamily: "'Noto Sans Odia', sans-serif",
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    💬 WhatsApp ରେ ଅର୍ଡ଼ର ଦିଅ
                </a>
            </div>
        </OdiaLayout>
    );
};

export default OdiaShop;
