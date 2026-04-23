import React, { useState, useRef, useCallback } from 'react';
import { Printer, RotateCcw, Receipt, ChevronRight } from 'lucide-react';
import BarcodeScanner from './components/BarcodeScanner';
import ProductSearch, { BillProduct } from './components/ProductSearch';
import BillingForm, { BillData } from './components/BillingForm';
import InvoicePreview from './components/InvoicePreview';

// ── helpers ─────────────────────────────────────────────────────────────────
const generateInvoiceNumber = () => {
    const now = new Date();
    const ymd = now.toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `INV-${ymd}-${rand}`;
};

const todayDisplay = () =>
    new Date().toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
    });

const INITIAL_BILL: BillData = {
    customer: { name: '', phone: '', address: '', gstin: '' },
    items: [],
    globalDiscountPct: 0,
    gstRatePct: 5,
    paymentMode: 'Cash',
};

// ── component ────────────────────────────────────────────────────────────────
const Billing: React.FC = () => {
    const [bill, setBill] = useState<BillData>(INITIAL_BILL);
    const [invoiceNo, setInvoiceNo] = useState(generateInvoiceNumber);
    const [invoiceDate] = useState(todayDisplay);
    const [printing, setPrinting] = useState(false);

    /* Derived totals */
    const itemsSubtotal = bill.items.reduce(
        (s, i) => s + i.qty * i.unitPrice * (1 - i.discountPct / 100), 0
    );
    const afterDiscount = itemsSubtotal * (1 - bill.globalDiscountPct / 100);
    const gstAmt = afterDiscount * (bill.gstRatePct / 100);
    const grandTotal = afterDiscount + gstAmt;
    const fmt = (n: number) =>
        new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(n);

    /* Add product from search or scanner */
    const addProduct = useCallback((prod: BillProduct) => {
        setBill(prev => {
            const existing = prev.items.find(i => i.id === prod.id);
            if (existing) {
                return {
                    ...prev,
                    items: prev.items.map(i =>
                        i.id === prod.id ? { ...i, qty: i.qty + 1 } : i
                    ),
                };
            }
            return {
                ...prev,
                items: [
                    ...prev.items,
                    {
                        id: prod.id,
                        name: prod.name,
                        hsn: prod.hsn || '',
                        qty: 1,
                        unitPrice: prod.price,
                        discountPct: 0,
                    },
                ],
            };
        });
    }, []);

    const handleScan = useCallback((code: string) => {
        // In a real deployment, look up the scanned barcode from your product catalogue.
        // For now we add it as a manual row.
        addProduct({
            id: `scan-${code}`,
            name: `Scanned: ${code}`,
            price: 0,
            hsn: '',
            sku: code,
        });
    }, [addProduct]);

    const handleNewBill = () => {
        setBill(INITIAL_BILL);
        setInvoiceNo(generateInvoiceNumber());
    };

    const handlePrint = () => {
        setPrinting(true);
        setTimeout(() => {
            window.print();
            setPrinting(false);
        }, 100);
    };

    return (
        <>
            {/* Print-only styles injected globally via a <style> tag */}
            <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #invoice-print-area,
          #invoice-print-area * { visibility: visible !important; }
          #invoice-print-area {
            position: fixed !important;
            left: 0; top: 0;
            width: 100vw;
            padding: 24px 32px;
            background: white;
            z-index: 99999;
          }
        }
      `}</style>

            <div className="min-h-screen bg-[#F8EDED] px-4 py-6 md:px-6 lg:px-8">
                {/* ── Page header ─────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-[#173B45]/50 mb-1">
                            <span>Admin</span>
                            <ChevronRight size={12} />
                            <span className="text-[#B43F3F] font-medium">Billing</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-display font-medium text-[#173B45]">
                            Billing &amp; <span className="text-[#B43F3F]">Invoice</span>
                        </h1>
                        <p className="text-xs text-[#173B45]/50 mt-0.5">
                            Invoice&nbsp;
                            <span className="font-medium text-[#B43F3F]">{invoiceNo}</span>
                            &nbsp;·&nbsp;{invoiceDate}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleNewBill}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#B43F3F]/20 text-[#173B45]/70 hover:border-[#B43F3F] hover:text-[#B43F3F] transition-all text-sm font-medium"
                        >
                            <RotateCcw size={15} /> New Bill
                        </button>
                        <button
                            onClick={handlePrint}
                            disabled={bill.items.length === 0}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#B43F3F] text-white rounded-xl hover:bg-[#FF8225] transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#B43F3F]/20"
                        >
                            <Printer size={15} /> {printing ? 'Preparing…' : 'Print Invoice'}
                        </button>
                    </div>
                </div>

                {/* ── Two-column layout ───────────────────────────── */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

                    {/* LEFT: Entry panel */}
                    <div className="xl:col-span-3 space-y-5">
                        {/* Scanner strip */}
                        <div className="bg-white rounded-2xl shadow-sm border border-[#B43F3F]/10 p-4 space-y-3">
                            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#B43F3F] flex items-center gap-2">
                                <Receipt size={14} /> Add Products
                            </h2>
                            <BarcodeScanner onScan={handleScan} />
                            <ProductSearch onSelect={addProduct} />
                        </div>

                        {/* Billing form */}
                        <div className="bg-white rounded-2xl shadow-sm border border-[#B43F3F]/10 p-4 md:p-6">
                            <BillingForm data={bill} onChange={setBill} />
                        </div>
                    </div>

                    {/* RIGHT: Live invoice preview */}
                    <div className="xl:col-span-2">
                        <div className="sticky top-6">
                            {/* Summary banner */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {[
                                    { label: 'Items', value: bill.items.reduce((s, i) => s + i.qty, 0) },
                                    { label: 'GST', value: `₹${fmt(gstAmt)}` },
                                    { label: 'Total', value: `₹${fmt(grandTotal)}` },
                                ].map(s => (
                                    <div
                                        key={s.label}
                                        className="bg-white rounded-xl border border-[#B43F3F]/10 p-3 text-center shadow-sm"
                                    >
                                        <p className="text-[10px] uppercase tracking-widest text-[#173B45]/50 font-medium">{s.label}</p>
                                        <p className="text-base font-bold text-[#B43F3F] mt-0.5">{s.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Invoice card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-[#B43F3F]/10 p-4 md:p-6 overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-[#173B45]/60">
                                        Invoice Preview
                                    </p>
                                    <span className="text-[10px] bg-[#FF8225]/10 text-[#FF8225] border border-[#FF8225]/20 font-medium px-2 py-0.5 rounded-full uppercase">
                                        Live
                                    </span>
                                </div>
                                {bill.items.length === 0 ? (
                                    <div className="py-16 flex flex-col items-center justify-center text-[#173B45]/30">
                                        <Receipt size={36} className="mb-3 opacity-40" />
                                        <p className="text-sm font-medium">Add products to preview the invoice</p>
                                    </div>
                                ) : (
                                    <div className="overflow-auto max-h-[70vh] pr-1">
                                        <InvoicePreview
                                            data={bill}
                                            invoiceNumber={invoiceNo}
                                            invoiceDate={invoiceDate}
                                        />
                                    </div>
                                )}
                            </div>

                            {bill.items.length > 0 && (
                                <button
                                    onClick={handlePrint}
                                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-[#173B45] text-[#F8EDED] rounded-xl hover:bg-[#B43F3F] transition-colors font-medium text-sm"
                                >
                                    <Printer size={16} /> Print / Save as PDF
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Billing;
