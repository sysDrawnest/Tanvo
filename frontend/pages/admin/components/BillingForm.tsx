import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

export interface BillItem {
    id: string;
    name: string;
    hsn: string;
    qty: number;
    unitPrice: number;
    discountPct: number;
}

export interface CustomerInfo {
    name: string;
    phone: string;
    address: string;
    gstin: string;
}

export interface BillData {
    customer: CustomerInfo;
    items: BillItem[];
    globalDiscountPct: number;
    gstRatePct: number; // 0 | 5 | 12 | 18 | 28
    paymentMode: string;
}

interface BillingFormProps {
    data: BillData;
    onChange: (data: BillData) => void;
}

const GST_RATES = [0, 5, 12, 18, 28];

const BillingForm: React.FC<BillingFormProps> = ({ data, onChange }) => {
    const set = (partial: Partial<BillData>) => onChange({ ...data, ...partial });
    const setCustomer = (partial: Partial<CustomerInfo>) =>
        set({ customer: { ...data.customer, ...partial } });

    const updateItem = (id: string, partial: Partial<BillItem>) =>
        set({ items: data.items.map(i => (i.id === id ? { ...i, ...partial } : i)) });

    const removeItem = (id: string) =>
        set({ items: data.items.filter(i => i.id !== id) });

    const addBlankRow = () =>
        set({
            items: [
                ...data.items,
                { id: `row-${Date.now()}`, name: '', hsn: '', qty: 1, unitPrice: 0, discountPct: 0 },
            ],
        });

    return (
        <div className="space-y-5">
            {/* Customer Details */}
            <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#B43F3F] mb-3">
                    Customer Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field
                        label="Customer Name"
                        value={data.customer.name}
                        onChange={v => setCustomer({ name: v })}
                        placeholder="Walk-in Customer"
                    />
                    <Field
                        label="Phone"
                        value={data.customer.phone}
                        onChange={v => setCustomer({ phone: v })}
                        placeholder="+91 98765 43210"
                    />
                    <Field
                        label="Address"
                        value={data.customer.address}
                        onChange={v => setCustomer({ address: v })}
                        placeholder="City, State"
                        className="sm:col-span-2"
                    />
                    <Field
                        label="Customer GSTIN (optional)"
                        value={data.customer.gstin}
                        onChange={v => setCustomer({ gstin: v })}
                        placeholder="22AAAAA0000A1Z5"
                    />
                    <div>
                        <label className="block text-[10px] font-medium uppercase tracking-wider text-[#173B45]/60 mb-1">
                            Payment Mode
                        </label>
                        <select
                            value={data.paymentMode}
                            onChange={e => set({ paymentMode: e.target.value })}
                            className="w-full px-3 py-2.5 bg-white border border-[#B43F3F]/15 rounded-xl text-sm text-[#173B45] focus:outline-none focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/15 transition-all"
                        >
                            {['Cash', 'UPI', 'Card', 'Net Banking', 'Cheque'].map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#B43F3F] mb-3">
                    Bill Items
                </h3>
                <div className="overflow-x-auto rounded-xl border border-[#B43F3F]/10">
                    <table className="w-full min-w-[600px] text-sm">
                        <thead className="bg-[#173B45] text-[#F8EDED]">
                            <tr>
                                <th className="text-left py-2.5 px-3 text-xs font-medium w-6">#</th>
                                <th className="text-left py-2.5 px-3 text-xs font-medium">Item</th>
                                <th className="text-left py-2.5 px-3 text-xs font-medium w-20">HSN</th>
                                <th className="text-center py-2.5 px-3 text-xs font-medium w-20">Qty</th>
                                <th className="text-right py-2.5 px-3 text-xs font-medium w-24">Price (₹)</th>
                                <th className="text-right py-2.5 px-3 text-xs font-medium w-20">Disc %</th>
                                <th className="text-right py-2.5 px-3 text-xs font-medium w-24">Total</th>
                                <th className="w-10" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#B43F3F]/5">
                            {data.items.map((item, idx) => {
                                const lineTotal = item.qty * item.unitPrice * (1 - item.discountPct / 100);
                                return (
                                    <tr key={item.id} className="bg-white hover:bg-[#F8EDED]/50 transition-colors">
                                        <td className="py-2 px-3 text-[#173B45]/40 text-xs">{idx + 1}</td>
                                        <td className="py-2 px-3">
                                            <input
                                                value={item.name}
                                                onChange={e => updateItem(item.id, { name: e.target.value })}
                                                className="w-full bg-transparent text-[#173B45] placeholder-[#173B45]/30 focus:outline-none text-sm"
                                                placeholder="Item name"
                                            />
                                        </td>
                                        <td className="py-2 px-3">
                                            <input
                                                value={item.hsn}
                                                onChange={e => updateItem(item.id, { hsn: e.target.value })}
                                                className="w-full bg-transparent text-[#173B45]/70 focus:outline-none text-xs"
                                                placeholder="HSN"
                                            />
                                        </td>
                                        <td className="py-2 px-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => updateItem(item.id, { qty: Math.max(1, item.qty - 1) })}
                                                    className="p-0.5 rounded hover:bg-[#B43F3F]/10 text-[#B43F3F] transition-colors"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={item.qty}
                                                    onChange={e => updateItem(item.id, { qty: Math.max(1, parseInt(e.target.value) || 1) })}
                                                    className="w-10 text-center bg-transparent text-[#173B45] focus:outline-none text-sm font-medium"
                                                />
                                                <button
                                                    onClick={() => updateItem(item.id, { qty: item.qty + 1 })}
                                                    className="p-0.5 rounded hover:bg-[#B43F3F]/10 text-[#B43F3F] transition-colors"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-2 px-3">
                                            <input
                                                type="number"
                                                min={0}
                                                value={item.unitPrice || ''}
                                                onChange={e => updateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                                                className="w-full text-right bg-transparent text-[#173B45] focus:outline-none text-sm"
                                                placeholder="0"
                                            />
                                        </td>
                                        <td className="py-2 px-3">
                                            <input
                                                type="number"
                                                min={0}
                                                max={100}
                                                value={item.discountPct || ''}
                                                onChange={e => updateItem(item.id, { discountPct: parseFloat(e.target.value) || 0 })}
                                                className="w-full text-right bg-transparent text-[#173B45]/70 focus:outline-none text-sm"
                                                placeholder="0"
                                            />
                                        </td>
                                        <td className="py-2 px-3 text-right font-medium text-[#B43F3F] text-sm whitespace-nowrap">
                                            ₹{lineTotal.toFixed(2)}
                                        </td>
                                        <td className="py-2 px-3 text-center">
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-1 rounded hover:bg-red-50 text-red-400 transition-colors"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {data.items.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-[#173B45]/40 text-sm">
                                        Search a product above or add a custom row
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <button
                    onClick={addBlankRow}
                    className="mt-2 flex items-center gap-1.5 text-xs text-[#FF8225] hover:text-[#B43F3F] font-medium transition-colors"
                >
                    <Plus size={13} /> Add blank row
                </button>
            </div>

            {/* Totals Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F8EDED] rounded-xl border border-[#B43F3F]/10">
                <div>
                    <label className="block text-[10px] font-medium uppercase tracking-wider text-[#173B45]/60 mb-1">
                        Additional Discount (%)
                    </label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={data.globalDiscountPct || ''}
                        onChange={e => set({ globalDiscountPct: parseFloat(e.target.value) || 0 })}
                        placeholder="0"
                        className="w-full px-3 py-2.5 bg-white border border-[#B43F3F]/15 rounded-xl text-sm text-[#173B45] focus:outline-none focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/15 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-medium uppercase tracking-wider text-[#173B45]/60 mb-1">
                        GST Rate
                    </label>
                    <div className="flex gap-2">
                        {GST_RATES.map(rate => (
                            <button
                                key={rate}
                                onClick={() => set({ gstRatePct: rate })}
                                className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${data.gstRatePct === rate
                                        ? 'bg-[#B43F3F] text-white border-[#B43F3F]'
                                        : 'bg-white text-[#173B45]/70 border-[#B43F3F]/15 hover:border-[#FF8225]'
                                    }`}
                            >
                                {rate}%
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Field: React.FC<{
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    className?: string;
}> = ({ label, value, onChange, placeholder, className = '' }) => (
    <div className={className}>
        <label className="block text-[10px] font-medium uppercase tracking-wider text-[#173B45]/60 mb-1">
            {label}
        </label>
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2.5 bg-white border border-[#B43F3F]/15 rounded-xl text-sm text-[#173B45] placeholder-[#173B45]/30 focus:outline-none focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/15 transition-all"
        />
    </div>
);

export default BillingForm;
