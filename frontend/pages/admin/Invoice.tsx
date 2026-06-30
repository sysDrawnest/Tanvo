import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';

const Invoice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/admin/whatsapp-orders/${id}`);
        setOrder(data.order);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div className="p-8 text-center">Loading Invoice...</div>;

  return (
    <div className="bg-white text-black min-h-screen p-8 print:p-0 max-w-4xl mx-auto">
      {/* Hide this print button when printing */}
      <div className="mb-6 flex justify-end print:hidden">
        <button 
          onClick={() => window.print()}
          className="px-6 py-2 bg-[#173B45] text-white rounded-md font-medium"
        >
          Print Invoice
        </button>
      </div>

      <div className="border border-gray-200 p-10 print:border-none print:p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold text-[#173B45]">TANVO</h1>
            <p className="text-sm text-gray-500 mt-1">Premium Heritage Fashion</p>
            <p className="text-sm text-gray-500 mt-2">support@tanvo.com</p>
            <p className="text-sm text-gray-500">+91 9876543210</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">INVOICE</h2>
            <p className="text-sm"><span className="text-gray-500">Order No:</span> {order.orderNumber}</p>
            <p className="text-sm"><span className="text-gray-500">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-sm"><span className="text-gray-500">Status:</span> {order.payment.status}</p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-10 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold text-gray-800 mb-2 border-b pb-2">Billed To</h3>
          <p className="font-medium text-lg">{order.customer.name}</p>
          <p className="text-sm mt-1">{order.customer.phone}</p>
          <p className="text-sm mt-1">
            {order.customer.address}<br />
            {order.customer.city && order.customer.state ? `${order.customer.city}, ${order.customer.state}` : ''} {order.customer.pincode}
          </p>
        </div>

        {/* Products Table */}
        <table className="w-full mb-10 text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-800 text-gray-800">
              <th className="py-3 font-semibold w-12 text-center">#</th>
              <th className="py-3 font-semibold">Item Description</th>
              <th className="py-3 font-semibold text-right w-24">Price</th>
              <th className="py-3 font-semibold text-center w-20">Qty</th>
              <th className="py-3 font-semibold text-right w-32">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((p: any, idx: number) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-4 text-center">{idx + 1}</td>
                <td className="py-4">
                  <p className="font-medium">{p.name}</p>
                </td>
                <td className="py-4 text-right">₹{p.price}</td>
                <td className="py-4 text-center">{p.quantity}</td>
                <td className="py-4 text-right font-medium">₹{p.price * p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{order.totalAmount}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Advance Paid</span>
              <span>- ₹{order.payment.advance}</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-3 border-t-2 border-gray-800">
              <span>Balance Due</span>
              <span>₹{order.payment.remaining}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t text-center text-sm text-gray-500">
          <p>Thank you for choosing TANVO.</p>
          <p className="mt-1">For any queries regarding this invoice, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
