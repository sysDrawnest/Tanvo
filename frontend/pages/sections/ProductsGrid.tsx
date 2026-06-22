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
}) => {
    return (
        <section style={{ padding: '100px max(48px, 6vw)', background }}>
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {products.map(product => <ProductCard key={product._id} product={product} />)}
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
