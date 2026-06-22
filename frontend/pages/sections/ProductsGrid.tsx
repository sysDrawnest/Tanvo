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
    layout?: 'classic' | 'asymmetric';
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
    layout = 'classic',
}) => {
    const isAsymmetric = layout === 'asymmetric';

    return (
        <section style={{ padding: '80px max(48px, 6vw)', background }}>
            {/* Default Header for classic layout, or for asymmetric layout on mobile/tablet */}
            {!isAsymmetric ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
                    <div>
                        <p className="section-label" style={{ marginBottom: 16 }}>{label}</p>
                        <h2 className="font-display" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.05 }}>
                            {title}{titleEm && <> <em>{titleEm}</em></>}
                        </h2>
                    </div>
                    <Link
                        to={viewAllLink}
                        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--ink)', paddingBottom: 4 }}
                    >
                        {viewAllText}
                    </Link>
                </div>
            ) : (
                /* For mobile/tablet asymmetric, show header but hide on large screens */
                <div className="lg:hidden" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
                    <div>
                        <p className="section-label" style={{ marginBottom: 16 }}>{label}</p>
                        <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.05 }}>
                            {title}{titleEm && <> <em>{titleEm}</em></>}
                        </h2>
                    </div>
                    <Link
                        to={viewAllLink}
                        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--ink)', paddingBottom: 4 }}
                    >
                        {viewAllText}
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {isAsymmetric && (
                    <div className="hidden lg:flex lg:col-span-1 flex-col justify-between py-2" style={{ minHeight: '380px' }}>
                        <div>
                            <p className="section-label" style={{ marginBottom: 16 }}>{label}</p>
                            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 3vw, 42px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.1 }}>
                                {title}{titleEm && <><br /><em>{titleEm}</em></>}
                            </h2>
                            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6, marginTop: 24, maxWidth: '240px' }}>
                                The masterpieces our community loves most. Woven thread-by-thread with mathematical precision, patience, and generations of heritage.
                            </p>
                        </div>
                        <Link
                            to={viewAllLink}
                            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--ink)', paddingBottom: 4, alignSelf: 'flex-start', marginTop: 24 }}
                        >
                            {viewAllText}
                        </Link>
                    </div>
                )}

                {(isAsymmetric ? products.slice(0, 3) : products).map(product => (
                    <ProductCard key={product._id || product.id} product={product} />
                ))}
                {products.length === 0 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0', color: 'rgba(13,11,10,0.35)', fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: '0.15em' }}>
                        {emptyMessage}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductsGrid;
