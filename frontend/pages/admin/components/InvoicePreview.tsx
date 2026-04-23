import React, { forwardRef } from 'react';
import Barcode from 'react-barcode';
import type { BillData } from './BillingForm';

interface InvoiceProps {
    data: BillData;
    invoiceNumber: string;
    invoiceDate: string;
}

function numberToWords(num: number): string {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
        'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (num === 0) return 'Zero';
    const n = Math.floor(num);

    const toWords = (n: number): string => {
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
        if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + toWords(n % 100) : '');
        if (n < 100000) return toWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + toWords(n % 1000) : '');
        if (n < 10000000) return toWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + toWords(n % 100000) : '');
        return toWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + toWords(n % 10000000) : '');
    };

    return toWords(n) + ' Rupees Only';
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoiceProps>(
    ({ data, invoiceNumber, invoiceDate }, ref) => {
        // ── maths ──────────────────────────────────────────────
        const itemsSubtotal = data.items.reduce((sum, item) => {
            return sum + item.qty * item.unitPrice * (1 - item.discountPct / 100);
        }, 0);

        const afterGlobalDiscount = itemsSubtotal * (1 - data.globalDiscountPct / 100);
        const globalDiscountAmt = itemsSubtotal - afterGlobalDiscount;
        const gstAmt = afterGlobalDiscount * (data.gstRatePct / 100);
        const cgst = gstAmt / 2;
        const sgst = gstAmt / 2;
        const grandTotal = afterGlobalDiscount + gstAmt;

        const fmt = (n: number) =>
            new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

        return (
            <div
                id="invoice-print-area"
                ref={ref}
                className="bg-white text-[#173B45] font-sans text-[12px] leading-snug"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                {/* ── Header ─────────────────────────────────────── */}
                <div className="flex justify-between items-start border-b-2 border-[#B43F3F] pb-4 mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#B43F3F] tracking-tight">
                            Tan<span className="text-[#173B45]">vo</span>
                        </h1>
                        <p className="text-[11px] text-[#173B45]/70 mt-0.5 leading-relaxed">
                            Handcrafted Indian Textiles &amp; Artware<br />
                            Shop No. 12, Weavers' Market, Jaipur – 302001<br />
                            GSTIN: 08AABCU9603R1ZX &nbsp;|&nbsp; PAN: AABCU9603R<br />
                            Ph: +91 98765 43210 &nbsp;|&nbsp; tanvo.in
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-[#B43F3F] font-semibold">Tax Invoice</p>
                        <p className="text-base font-bold text-[#173B45] mt-0.5">{invoiceNumber}</p>
                        <p className="text-[11px] text-[#173B45]/60 mt-0.5">Date: {invoiceDate}</p>
                        <p className="text-[11px] text-[#173B45]/60">Payment: {data.paymentMode}</p>
                    </div>
                </div>

                {/* ── Customer ───────────────────────────────────── */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-[#F8EDED] rounded-lg border border-[#B43F3F]/10">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B43F3F] mb-1">Bill To</p>
                        <p className="font-semibold text-[#173B45]">{data.customer.name || 'Walk-in Customer'}</p>
                        {data.customer.phone && <p className="text-[#173B45]/70">{data.customer.phone}</p>}
                        {data.customer.address && <p className="text-[#173B45]/70">{data.customer.address}</p>}
                        {data.customer.gstin && <p className="text-[#173B45]/70 text-[10px] mt-0.5">GSTIN: {data.customer.gstin}</p>}
                    </div>
                </div>

                {/* ── Items Table ────────────────────────────────── */}
                <table className="w-full mb-4 text-[11px]">
                    <thead>
                        <tr className="bg-[#173B45] text-[#F8EDED]">
                            <th className="py-2 px-2 text-left font-semibold w-6">#</th>
                            <th className="py-2 px-2 text-left font-semibold">Description</th>
                            <th className="py-2 px-2 text-center font-semibold w-16">HSN</th>
                            <th className="py-2 px-2 text-center font-semibold w-10">Qty</th>
                            <th className="py-2 px-2 text-right font-semibold w-20">Rate (₹)</th>
                            <th className="py-2 px-2 text-right font-semibold w-14">Disc%</th>
                            <th className="py-2 px-2 text-right font-semibold w-20">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, idx) => {
                            const lineTotal = item.qty * item.unitPrice * (1 - item.discountPct / 100);
                            return (
                                <tr
                                    key={item.id}
                                    className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8EDED]/50'}
                                >
                                    <td className="py-1.5 px-2 text-[#173B45]/50">{idx + 1}</td>
                                    <td className="py-1.5 px-2 font-medium text-[#173B45]">{item.name || '—'}</td>
                                    <td className="py-1.5 px-2 text-center text-[#173B45]/60">{item.hsn || '—'}</td>
                                    <td className="py-1.5 px-2 text-center">{item.qty}</td>
                                    <td className="py-1.5 px-2 text-right">{fmt(item.unitPrice)}</td>
                                    <td className="py-1.5 px-2 text-center text-[#173B45]/60">{item.discountPct || 0}%</td>
                                    <td className="py-1.5 px-2 text-right font-medium">{fmt(lineTotal)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* ── Totals ─────────────────────────────────────── */}
                <div className="flex justify-end mb-4">
                    <div className="w-64 space-y-1.5">
                        <Row label="Sub Total" value={fmt(itemsSubtotal)} />
                        {data.globalDiscountPct > 0 && (
                            <Row label={`Discount (${data.globalDiscountPct}%)`} value={`- ${fmt(globalDiscountAmt)}`} accent />
                        )}
                        {data.gstRatePct > 0 && (
                            <>
                                <Row label={`CGST (${data.gstRatePct / 2}%)`} value={fmt(cgst)} />
                                <Row label={`SGST (${data.gstRatePct / 2}%)`} value={fmt(sgst)} />
                            </>
                        )}
                        <div className="flex justify-between items-center pt-2 border-t-2 border-[#B43F3F] font-bold text-[13px]">
                            <span className="text-[#173B45]">Grand Total</span>
                            <span className="text-[#B43F3F]">₹ {fmt(grandTotal)}</span>
                        </div>
                    </div>
                </div>

                {/* ── Amount in words ────────────────────────────── */}
                <div className="p-2.5 bg-[#F8EDED] border border-[#B43F3F]/10 rounded-lg mb-4 text-[11px]">
                    <span className="font-semibold text-[#B43F3F]">Amount in Words: </span>
                    <span className="text-[#173B45]/80 italic">{numberToWords(Math.round(grandTotal))}</span>
                </div>

                {/* ── Barcode + Footer ──────────────────────────── */}
                <div className="flex justify-between items-end border-t border-[#B43F3F]/20 pt-4 mt-2">
                    <div className="text-[10px] text-[#173B45]/50 space-y-0.5 max-w-[55%]">
                        <p className="font-medium text-[#173B45]/70">Terms & Conditions</p>
                        <p>• Goods once sold will not be taken back or exchanged.</p>
                        <p>• Subject to Jaipur jurisdiction only.</p>
                        <p>• This is a computer generated invoice.</p>
                        <p className="mt-2 font-medium text-[#B43F3F]">Thank you for shopping at Tanvo!</p>
                    </div>
                    <div className="text-center">
                        <Barcode
                            value={invoiceNumber}
                            width={1.2}
                            height={40}
                            fontSize={9}
                            displayValue
                            background="#ffffff"
                            lineColor="#173B45"
                        />
                        <p className="text-[10px] text-[#173B45]/50 mt-1">Authorised Signatory</p>
                    </div>
                </div>
            </div>
        );
    }
);

InvoicePreview.displayName = 'InvoicePreview';

const Row: React.FC<{ label: string; value: string; accent?: boolean }> = ({ label, value, accent }) => (
    <div className={`flex justify-between text-[11px] ${accent ? 'text-green-700' : 'text-[#173B45]/70'}`}>
        <span>{label}</span>
        <span className="font-medium">{value}</span>
    </div>
);

export default InvoicePreview;

// OR OR OR OR For thermal printer of narrow size
// import React, { forwardRef } from 'react';
// import Barcode from 'react-barcode';
// import type { BillData } from './BillingForm';

// interface InvoiceProps {
//     data: BillData;
//     invoiceNumber: string;
//     invoiceDate: string;
// }

// function numberToWords(num: number): string {
//     const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
//         'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
//         'Eighteen', 'Nineteen'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

//     if (num === 0) return 'Zero';
//     const n = Math.floor(num);

//     const toWords = (n: number): string => {
//         if (n < 20) return ones[n];
//         if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
//         if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + toWords(n % 100) : '');
//         if (n < 100000) return toWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + toWords(n % 1000) : '');
//         if (n < 10000000) return toWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + toWords(n % 100000) : '');
//         return toWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + toWords(n % 10000000) : '');
//     };

//     return toWords(n) + ' Rupees Only';
// }

// const InvoicePreview = forwardRef<HTMLDivElement, InvoiceProps>(
//     ({ data, invoiceNumber, invoiceDate }, ref) => {
//         // ── maths ──────────────────────────────────────────────
//         const itemsSubtotal = data.items.reduce((sum, item) => {
//             return sum + item.qty * item.unitPrice * (1 - item.discountPct / 100);
//         }, 0);

//         const afterGlobalDiscount = itemsSubtotal * (1 - data.globalDiscountPct / 100);
//         const globalDiscountAmt = itemsSubtotal - afterGlobalDiscount;
//         const gstAmt = afterGlobalDiscount * (data.gstRatePct / 100);
//         const cgst = gstAmt / 2;
//         const sgst = gstAmt / 2;
//         const grandTotal = afterGlobalDiscount + gstAmt;

//         const fmt = (n: number) =>
//             new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

//         // Thermal printer styles
//         const thermalStyles = `
//             @media print {
//                 @page {
//                     size: 80mm auto;
//                     margin: 0mm;
//                 }
//                 body * {
//                     visibility: hidden;
//                 }
//                 .invoice-print-area, .invoice-print-area * {
//                     visibility: visible;
//                 }
//                 .invoice-print-area {
//                     position: absolute;
//                     top: 0;
//                     left: 0;
//                     width: 80mm;
//                     margin: 0;
//                     padding: 2mm;
//                 }
//                 .no-print {
//                     display: none;
//                 }
//             }
//         `;

//         return (
//             <>
//                 <style>{thermalStyles}</style>
//                 <div
//                     id="invoice-print-area"
//                     ref={ref}
//                     className="invoice-print-area"
//                     style={{
//                         width: '80mm',
//                         margin: '0 auto',
//                         padding: '2mm',
//                         backgroundColor: '#ffffff',
//                         color: '#173B45',
//                         fontFamily: "'Courier New', 'Inter', monospace",
//                         fontSize: '9px',
//                         lineHeight: '1.3'
//                     }}
//                 >
//                     {/* ── Header ─────────────────────────────────────── */}
//                     <div className="text-center border-b-2 border-[#B43F3F] pb-2 mb-3">
//                         <h1 className="text-base font-bold text-[#B43F3F] tracking-tight m-0">
//                             Tan<span className="text-[#173B45]">vo</span>
//                         </h1>
//                         <p className="text-[8px] text-[#173B45]/70 mt-1 leading-tight">
//                             Handcrafted Indian Textiles & Artware
//                         </p>
//                         <p className="text-[7px] text-[#173B45]/60 leading-tight">
//                             Shop No. 12, Weavers' Market, Jaipur – 302001
//                         </p>
//                         <p className="text-[7px] text-[#173B45]/60">
//                             GSTIN: 08AABCU9603R1ZX | Ph: +91 98765 43210
//                         </p>
//                     </div>

//                     {/* ── Invoice Meta ────────────────────────────────── */}
//                     <div className="border-b border-dashed border-[#B43F3F]/30 pb-2 mb-2">
//                         <div className="flex justify-between">
//                             <span className="text-[8px] font-semibold">Tax Invoice</span>
//                             <span className="text-[8px] font-bold">{invoiceNumber}</span>
//                         </div>
//                         <div className="flex justify-between mt-1">
//                             <span className="text-[7px] text-[#173B45]/60">Date:</span>
//                             <span className="text-[7px]">{invoiceDate}</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="text-[7px] text-[#173B45]/60">Payment:</span>
//                             <span className="text-[7px]">{data.paymentMode}</span>
//                         </div>
//                     </div>

//                     {/* ── Customer ───────────────────────────────────── */}
//                     <div className="border-b border-dashed border-[#B43F3F]/30 pb-2 mb-2">
//                         <p className="text-[7px] font-semibold uppercase text-[#B43F3F]">Customer Details</p>
//                         <p className="text-[8px] font-medium mt-1">{data.customer.name || 'Walk-in Customer'}</p>
//                         {data.customer.phone && <p className="text-[7px] text-[#173B45]/70">📞 {data.customer.phone}</p>}
//                         {data.customer.address && <p className="text-[7px] text-[#173B45]/70">{data.customer.address}</p>}
//                         {data.customer.gstin && <p className="text-[7px] text-[#173B45]/70">GST: {data.customer.gstin}</p>}
//                     </div>

//                     {/* ── Items Table ────────────────────────────────── */}
//                     <table className="w-full mb-2 text-[8px]" style={{ borderCollapse: 'collapse' }}>
//                         <thead>
//                             <tr className="bg-[#173B45] text-[#F8EDED]">
//                                 <th className="py-1 px-1 text-left w-5">#</th>
//                                 <th className="py-1 px-1 text-left">Item</th>
//                                 <th className="py-1 px-1 text-center w-6">Qty</th>
//                                 <th className="py-1 px-1 text-right w-12">Rate</th>
//                                 <th className="py-1 px-1 text-right w-12">Amt</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.items.map((item, idx) => {
//                                 const lineTotal = item.qty * item.unitPrice * (1 - item.discountPct / 100);
//                                 const nameShort = item.name?.length > 20 ? item.name.substring(0, 18) + '..' : item.name;
//                                 return (
//                                     <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8EDED]/30'}>
//                                         <td className="py-1 px-1 text-[#173B45]/60">{idx + 1}</td>
//                                         <td className="py-1 px-1">
//                                             <div>{nameShort || '—'}</div>
//                                             {item.discountPct > 0 && (
//                                                 <span className="text-[6px] text-green-600">Disc: {item.discountPct}%</span>
//                                             )}
//                                         </td>
//                                         <td className="py-1 px-1 text-center">{item.qty}</td>
//                                         <td className="py-1 px-1 text-right">{fmt(item.unitPrice)}</td>
//                                         <td className="py-1 px-1 text-right font-medium">{fmt(lineTotal)}</td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>

//                     {/* ── Totals ─────────────────────────────────────── */}
//                     <div className="border-t border-dashed border-[#B43F3F]/30 pt-2 mb-2">
//                         <div className="flex justify-between text-[8px]">
//                             <span>Sub Total</span>
//                             <span>₹{fmt(itemsSubtotal)}</span>
//                         </div>
//                         {data.globalDiscountPct > 0 && (
//                             <div className="flex justify-between text-[8px] text-green-700">
//                                 <span>Discount ({data.globalDiscountPct}%)</span>
//                                 <span>- ₹{fmt(globalDiscountAmt)}</span>
//                             </div>
//                         )}
//                         {data.gstRatePct > 0 && (
//                             <>
//                                 <div className="flex justify-between text-[7px] text-[#173B45]/70">
//                                     <span>CGST ({data.gstRatePct / 2}%)</span>
//                                     <span>₹{fmt(cgst)}</span>
//                                 </div>
//                                 <div className="flex justify-between text-[7px] text-[#173B45]/70">
//                                     <span>SGST ({data.gstRatePct / 2}%)</span>
//                                     <span>₹{fmt(sgst)}</span>
//                                 </div>
//                             </>
//                         )}
//                         <div className="flex justify-between border-t border-double border-[#B43F3F] pt-1 mt-1">
//                             <span className="font-bold text-[9px]">TOTAL</span>
//                             <span className="font-bold text-[9px] text-[#B43F3F]">₹{fmt(grandTotal)}</span>
//                         </div>
//                     </div>

//                     {/* ── Amount in words ────────────────────────────── */}
//                     <div className="border-t border-dashed border-[#B43F3F]/30 pt-2 mb-2">
//                         <p className="text-[7px]">
//                             <span className="font-semibold">In Words: </span>
//                             {numberToWords(Math.round(grandTotal))}
//                         </p>
//                     </div>

//                     {/* ── Barcode ────────────────────────────────────── */}
//                     <div className="text-center border-t border-dashed border-[#B43F3F]/30 pt-2 mt-1">
//                         <Barcode
//                             value={invoiceNumber}
//                             width={1}
//                             height={25}
//                             fontSize={7}
//                             displayValue
//                             background="#ffffff"
//                             lineColor="#173B45"
//                             margin={0}
//                         />
//                     </div>

//                     {/* ── Footer ────────────────────────────────────── */}
//                     <div className="border-t border-dashed border-[#B43F3F]/30 pt-2 mt-2 text-center">
//                         <p className="text-[6px] text-[#173B45]/50">Terms: No exchange/return on sold items</p>
//                         <p className="text-[6px] text-[#173B45]/50">Subject to Jaipur jurisdiction</p>
//                         <p className="text-[6px] font-medium text-[#B43F3F] mt-1">Thank you for shopping at Tanvo!</p>
//                         <p className="text-[5px] text-[#173B45]/40 mt-1">This is a computer generated invoice</p>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// );

// InvoicePreview.displayName = 'InvoicePreview';

// // Helper component for rows (optional - can be inline)
// const Row: React.FC<{ label: string; value: string; accent?: boolean }> = ({ label, value, accent }) => (
//     <div className={`flex justify-between text-[8px] ${accent ? 'text-green-700' : 'text-[#173B45]/70'}`}>
//         <span>{label}</span>
//         <span className="font-medium">{value}</span>
//     </div>
// );

// export default InvoicePreview;