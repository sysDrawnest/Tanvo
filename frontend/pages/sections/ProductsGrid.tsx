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
    loading?: boolean;
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
    loading = false,
}) => {
    const textColor = inverse ? 'var(--ivory)' : 'var(--ink)';
    
    return (
        <section className="px-4 py-16 md:px-[6vw] md:py-24" style={{ background }}>
            <div className="mb-8 md:mb-16 flex justify-between items-end flex-wrap gap-6">
                <div>
                    <p className="section-label" style={{ marginBottom: 12, color: inverse ? 'var(--gold)' : undefined }}>{label}</p>
                    <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4.5vw, 60px)', fontWeight: 300, color: textColor, lineHeight: 1.05 }}>
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
                {loading ? (
                    <>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-full aspect-[3/4] max-[640px]:aspect-[2/3] animate-pulse" style={{ background: inverse ? 'rgba(255,255,255,0.05)' : 'rgba(13,11,10,0.05)' }} />
                        ))}
                    </>
                ) : products.length > 0 ? (
                    products.map(product => <ProductCard key={product._id} product={product} inverse={inverse} />)
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0', color: 'rgba(13,11,10,0.35)', fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: '0.15em' }}>
                        {emptyMessage}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductsGrid;
