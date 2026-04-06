import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OdiaLayout from '../../components/OdiaLayout';
import { useStore } from '../../context/StoreContext';
import API from '../../services/api';

const OdiaCheckout: React.FC = () => {
    const navigate = useNavigate();
    const { cart, user, isAuthenticated } = useStore();
    const [step, setStep] = useState(1);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<any | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const [newAddress, setNewAddress] = useState({
        type: 'home',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: 'Odisha',
        pincode: '',
        phone: user?.phone || '',
        isDefault: false
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth?redirect=/odia/checkout');
        } else {
            fetchAddresses();
        }
    }, [isAuthenticated]);

    const fetchAddresses = async () => {
        try {
            const { data } = await API.get('/users/addresses');
            setAddresses(data);
            if (data.length > 0) {
                const defaultAddr = data.find((a: any) => a.isDefault) || data[0];
                setSelectedAddress(defaultAddr);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) return;
        setPlacingOrder(true);
        try {
            const orderData = {
                shippingAddress: selectedAddress,
                paymentMethod,
                items: cart?.items || [],
                itemsPrice: cart?.totalPrice || 0,
                taxPrice: Math.round((cart?.totalPrice || 0) * 0.05),
                shippingPrice: (cart?.totalPrice || 0) > 5000 ? 0 : 500,
                totalPrice: (cart?.totalPrice || 0) + ((cart?.totalPrice || 0) > 5000 ? 0 : 500) + Math.round((cart?.totalPrice || 0) * 0.05)
            };
            const { data } = await API.post('/orders', orderData);
            navigate(`/odia/order-confirmation/${data._id}`);
        } catch (error) {
            alert('Order failed. Please try again.');
        } finally {
            setPlacingOrder(false);
        }
    };

    if (!cart?.items?.length && step === 1) {
        return (
            <OdiaLayout>
                <div className="pt-20 text-center">
                    <p>ଆପଣଙ୍କ ବ୍ୟାଗ୍ ଖାଲି ଅଛି।</p>
                    <button onClick={() => navigate('/odia/shop')} className="mt-4 bg-primary text-white px-6 py-2 rounded-xl">ଶାଢ଼ୀ ଦେଖନ୍ତୁ</button>
                </div>
            </OdiaLayout>
        );
    }

    return (
        <OdiaLayout>
            <div className="pt-6 pb-20">
                <h2 className="font-noto text-3xl font-bold mb-8 text-left">ଅର୍ଡର କରନ୍ତୁ</h2>

                {/* Progress */}
                <div className="flex items-center justify-center mb-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-[#f0e2d6]'}`}>୧</div>
                    <div className={`h-1 w-12 ${step >= 2 ? 'bg-primary' : 'bg-[#f0e2d6]'}`}></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-[#f0e2d6]'}`}>୨</div>
                    <div className={`h-1 w-12 ${step >= 3 ? 'bg-primary' : 'bg-[#f0e2d6]'}`}></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-[#f0e2d6]'}`}>୩</div>
                </div>

                {/* Step 1: Address */}
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 text-left">
                        <h3 className="text-xl font-bold mb-4">ଠିକଣା ବାଛନ୍ତୁ</h3>
                        {addresses.map((addr) => (
                            <div
                                key={addr._id}
                                onClick={() => setSelectedAddress(addr)}
                                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${selectedAddress?._id === addr._id ? 'border-primary bg-primary/5 shadow-md' : 'border-[#f0e2d6] bg-white'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-[#f3ebe2] text-[10px] uppercase font-black px-2 py-1 rounded tracking-widest">{addr.type}</span>
                                    {selectedAddress?._id === addr._id && <span className="material-symbols-outlined text-primary">check_circle</span>}
                                </div>
                                <p className="font-bold text-lg">{addr.addressLine1}</p>
                                <p className="text-[#6b6259]">{addr.city}, {addr.state} - {addr.pincode}</p>
                                <p className="text-[#6b6259] mt-2 font-mono">{addr.phone}</p>
                            </div>
                        ))}

                        <button
                            className="w-full py-4 border-2 border-dashed border-[#f0e2d6] rounded-2xl text-[#6b6259] font-bold hover:bg-[#f3ebe2] transition-all flex items-center justify-center gap-2"
                            onClick={() => alert('New address form can be added here or redirect back to profile')}
                        >
                            <span className="material-symbols-outlined">add</span> ନୂଆ ଠିକଣା
                        </button>

                        <button
                            disabled={!selectedAddress}
                            onClick={() => setStep(2)}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg mt-8 disabled:opacity-50 btn-tap"
                        >
                            ଆଗକୁ ଯାଆନ୍ତୁ
                        </button>
                    </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 text-left">
                        <h3 className="text-xl font-bold mb-4">ଟଙ୍କା ଦେବା ପ୍ରଣାଳୀ</h3>
                        <div
                            onClick={() => setPaymentMethod('cod')}
                            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 shadow-md' : 'border-[#f0e2d6] bg-white'}`}
                        >
                            <div>
                                <h4 className="font-bold text-lg">Cash on Delivery</h4>
                                <p className="text-[#6b6259]">ଶାଢ଼ୀ ପହଞ୍ଚିବା ପରେ ଟଙ୍କା ଦିଅନ୍ତୁ</p>
                            </div>
                            <span className={`material-symbols-outlined ${paymentMethod === 'cod' ? 'text-primary' : 'text-[#f0e2d6]'}`}>
                                {paymentMethod === 'cod' ? 'radio_button_checked' : 'radio_button_unchecked'}
                            </span>
                        </div>

                        <div
                            onClick={() => setPaymentMethod('whatsapp')}
                            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${paymentMethod === 'whatsapp' ? 'border-primary bg-primary/5 shadow-md' : 'border-[#f0e2d6] bg-white'}`}
                        >
                            <div>
                                <h4 className="font-bold text-lg">WhatsApp Order</h4>
                                <p className="text-[#6b6259]">ହ୍ୱାଟ୍ସଆପ୍ ମାଧ୍ୟମରେ କଥା ହେବେ</p>
                            </div>
                            <span className={`material-symbols-outlined ${paymentMethod === 'whatsapp' ? 'text-primary' : 'text-[#f0e2d6]'}`}>
                                {paymentMethod === 'whatsapp' ? 'radio_button_checked' : 'radio_button_unchecked'}
                            </span>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setStep(1)} className="flex-1 py-4 border-2 border-[#f0e2d6] rounded-2xl font-bold">ପଛକୁ ଯାଆନ୍ତୁ</button>
                            <button onClick={() => setStep(3)} className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg btn-tap">ଶେଷ ସୋପାନ</button>
                        </div>
                    </div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 text-left">
                        <h3 className="text-xl font-bold mb-4">ଅର୍ଡର କନଫର୍ମ କରନ୍ତୁ</h3>

                        <div className="bg-white rounded-2xl p-6 shadow-soft border border-[#f0e2d6] space-y-4">
                            <div className="flex justify-between font-bold">
                                <span>ତୁମର ଅର୍ଡର ମୋଟ:</span>
                                <span className="text-primary text-xl">₹{(cart?.totalPrice || 0) + ((cart?.totalPrice || 0) > 5000 ? 0 : 500) + Math.round((cart?.totalPrice || 0) * 0.05)}</span>
                            </div>
                            <div className="text-sm text-[#6b6259]">
                                <p className="font-bold">ଠିକଣା:</p>
                                <p>{selectedAddress?.addressLine1}, {selectedAddress?.city}</p>
                            </div>
                            <div className="text-sm text-[#6b6259]">
                                <p className="font-bold">ପେମେଣ୍ଟ:</p>
                                <p>{paymentMethod === 'cod' ? 'Cash on Delivery' : 'WhatsApp Order'}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setStep(2)} className="flex-1 py-4 border-2 border-[#f0e2d6] rounded-2xl font-bold">ପଛକୁ ଯାଆନ୍ତୁ</button>
                            <button
                                onClick={handlePlaceOrder}
                                disabled={placingOrder}
                                className="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 btn-tap disabled:opacity-50"
                            >
                                {placingOrder ? 'ଅପେକ୍ଷା କରନ୍ତୁ...' : <><span className="material-symbols-outlined">verified</span> ଅର୍ଡର ଦିଅନ୍ତୁ</>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </OdiaLayout>
    );
};

export default OdiaCheckout;
