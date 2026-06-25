import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

interface ProductsGridProps {
    products: any[];
    label: string;
    title: string;
    titleEm?: string;
    viewAllLink: string;
    viewAllText?: string;
    background?: string;
    emptyMessage?: string;
    inverse?: boolean;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
    products,
    label,
    title,
    titleEm,
    viewAllLink,
    viewAllText = 'View All',
    background = 'var(--cream)',
    emptyMessage = 'NEW PIECES ARRIVING SOON',
    inverse = false,
}) => {
    const textColor = inverse ? 'var(--ivory)' : 'var(--ink)';
    
    return (
        <section style={{ padding: '100px max(48px, 6vw)', background }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
                <div>
                    <p className="section-label" style={{ marginBottom: 16, color: inverse ? 'var(--gold)' : undefined }}>{label}</p>
                    <h2 className="font-display" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 300, color: textColor, lineHeight: 1.05 }}>
                        {title}{titleEm && <> <em style={{ color: inverse ? 'var(--gold)' : undefined }}>{titleEm}</em></>}
                    </h2>
                </div>
                <Link
                    to={viewAllLink}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: textColor, textDecoration: 'none', borderBottom: `1px solid ${textColor}`, paddingBottom: 4 }}
                >
                    {viewAllText}
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {products.length > 0 ? (
                    products.map(product => <ProductCard key={product._id} product={product} inverse={inverse} />)
                ) : (
                    <>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} style={{ width: '100%', aspectRatio: '3/4', background: inverse ? 'rgba(255,255,255,0.05)' : 'rgba(13,11,10,0.05)', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
};

export default ProductsGrid;
