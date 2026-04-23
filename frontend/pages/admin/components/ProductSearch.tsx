import React, { useState, useRef, useEffect } from 'react';
import { Search, Package, Plus } from 'lucide-react';

export interface BillProduct {
    id: string;
    name: string;
    sku?: string;
    price: number;
    hsn?: string;
}

interface ProductSearchProps {
    onSelect: (product: BillProduct) => void;
    savedProducts?: BillProduct[];
}

// Built-in sample products from Tanvo catalogue — admin can add custom rows too
const DEFAULT_PRODUCTS: BillProduct[] = [
    { id: 'p1', name: 'Handwoven Cotton Kurta', sku: 'TAN-KUR-001', price: 1299, hsn: '6211' },
    { id: 'p2', name: 'Block Print Dupatta', sku: 'TAN-DUP-002', price: 799, hsn: '6214' },
    { id: 'p3', name: 'Embroidered Palazzo', sku: 'TAN-PAL-003', price: 999, hsn: '6211' },
    { id: 'p4', name: 'Ajrak Print Saree', sku: 'TAN-SAR-004', price: 2499, hsn: '5208' },
    { id: 'p5', name: 'Indigo Dyed Shirt', sku: 'TAN-SHT-005', price: 1599, hsn: '6211' },
    { id: 'p6', name: 'Hand Embroidered Bag', sku: 'TAN-BAG-006', price: 649, hsn: '4202' },
    { id: 'p7', name: 'Kantha Stitch Jacket', sku: 'TAN-JAC-007', price: 3299, hsn: '6201' },
    { id: 'p8', name: 'Natural Dye Linen Fabric', sku: 'TAN-FAB-008', price: 449, hsn: '5309' },
];

const ProductSearch: React.FC<ProductSearchProps> = ({ onSelect, savedProducts = [] }) => {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [customName, setCustomName] = useState('');
    const [customPrice, setCustomPrice] = useState('');
    const [showCustom, setShowCustom] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const allProducts = [...DEFAULT_PRODUCTS, ...savedProducts];

    const filtered = query.length > 0
        ? allProducts.filter(
            p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.sku?.toLowerCase().includes(query.toLowerCase())
        )
        : allProducts;

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
                setShowCustom(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleSelect = (product: BillProduct) => {
        onSelect(product);
        setQuery('');
        setOpen(false);
    };

    const handleAddCustom = () => {
        if (!customName.trim() || !customPrice) return;
        onSelect({
            id: `custom-${Date.now()}`,
            name: customName.trim(),
            price: parseFloat(customPrice),
            hsn: '',
        });
        setCustomName('');
        setCustomPrice('');
        setShowCustom(false);
    };

    return (
        <div ref={wrapperRef} className="relative">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B43F3F]/50" />
                    <input
                        type="text"
                        value={query}
                        onChange={e => { setQuery(e.target.value); setOpen(true); }}
                        onFocus={() => setOpen(true)}
                        placeholder="Search product by name or SKU…"
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#B43F3F]/15 rounded-xl text-sm text-[#173B45] placeholder-[#173B45]/40 focus:outline-none focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/15 transition-all"
                    />
                </div>
                <button
                    onClick={() => setShowCustom(v => !v)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#173B45] text-[#F8EDED] rounded-xl text-xs font-medium hover:bg-[#B43F3F] transition-colors"
                    title="Add custom item"
                >
                    <Plus size={14} /> Custom
                </button>
            </div>

            {/* Dropdown */}
            {open && filtered.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#B43F3F]/15 rounded-xl shadow-lg z-50 max-h-56 overflow-y-auto">
                    {filtered.map(p => (
                        <button
                            key={p.id}
                            onClick={() => handleSelect(p)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F8EDED] transition-colors text-left"
                        >
                            <Package size={14} className="text-[#B43F3F]/50 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#173B45] truncate">{p.name}</p>
                                {p.sku && <p className="text-[10px] text-[#173B45]/50">{p.sku}</p>}
                            </div>
                            <span className="text-sm font-medium text-[#B43F3F] shrink-0">
                                ₹{p.price.toLocaleString('en-IN')}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Custom item form */}
            {showCustom && (
                <div className="mt-2 p-3 bg-[#F8EDED] border border-[#B43F3F]/15 rounded-xl flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={customName}
                        onChange={e => setCustomName(e.target.value)}
                        placeholder="Item name"
                        className="flex-1 px-3 py-2 bg-white border border-[#B43F3F]/15 rounded-lg text-sm text-[#173B45] focus:outline-none focus:border-[#FF8225]"
                    />
                    <input
                        type="number"
                        value={customPrice}
                        onChange={e => setCustomPrice(e.target.value)}
                        placeholder="Price (₹)"
                        className="w-32 px-3 py-2 bg-white border border-[#B43F3F]/15 rounded-lg text-sm text-[#173B45] focus:outline-none focus:border-[#FF8225]"
                    />
                    <button
                        onClick={handleAddCustom}
                        className="px-4 py-2 bg-[#B43F3F] text-white rounded-lg text-sm font-medium hover:bg-[#FF8225] transition-colors"
                    >
                        Add
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductSearch;
