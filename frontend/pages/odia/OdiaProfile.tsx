import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import OdiaLayout from '../../components/OdiaLayout';
import { useStore } from '../../context/StoreContext';
import API from '../../services/api';

const OdiaProfile: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useStore();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth?redirect=/odia/profile');
        } else {
            fetchOrders();
        }
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        try {
            const { data } = await API.get('/orders/my-orders?limit=10');
            setOrders(data.orders || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusOdia = (status: string) => {
        const map: Record<string, string> = {
            'Pending': 'ପେଣ୍ଡିଂ',
            'Processing': 'ପ୍ରସ୍ତୁତି ଚାଲିଛି',
            'Shipped': 'ବାହାରିଛି',
            'Delivered': 'ପହଞ୍ଚିଛି',
            'Cancelled': 'ବାତିଲ୍'
        };
        return map[status] || status;
    };

    return (
        <OdiaLayout>
            <div className="pt-6 pb-20">
                {/* Profile Header */}
                <div className="bg-[#f9f2ea] rounded-3xl p-8 shadow-soft border border-[#f0e2d6] mb-10 relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-4 text-primary">
                            <span className="material-symbols-outlined text-4xl">person</span>
                        </div>
                        <h2 className="font-noto text-3xl font-bold mb-1">{user?.name}</h2>
                        <p className="text-[#6b6259] mb-6">{user?.email}</p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/odia/shop')}
                                className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md btn-tap"
                            >
                                ନୂଆ ଶାଢ଼ୀ ଦେଖନ୍ତୁ
                            </button>
                            <button
                                onClick={logout}
                                className="bg-white text-primary border border-primary px-6 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-primary/5 transition-all"
                            >
                                ଲଗଆଉଟ୍
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="space-y-6 text-left">
                    <h3 className="font-noto text-2xl font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined">package_2</span> ମୋର ଅର୍ଡର ଗୁଡିକ
                    </h3>

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                            <p>ଅପେକ୍ଷା କରନ୍ତୁ...</p>
                        </div>
                    ) : orders.length > 0 ? (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order._id} className="bg-white rounded-2xl p-5 shadow-soft border border-[#f0e2d6] flex items-center gap-4">
                                    <div className="w-16 h-16 bg-[#f3ebe2] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-secondary">inventory_2</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="font-bold text-lg">ID: #{order._id.slice(-6)}</p>
                                            <span className={`text-[10px] uppercase font-black px-2 py-1 rounded bg-green-100 text-green-700`}>
                                                {getStatusOdia(order.orderStatus)}
                                            </span>
                                        </div>
                                        <p className="text-primary font-bold">₹{order.totalPrice}</p>
                                        <p className="text-[#6b6259] text-xs mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-[#f0e2d6]">chevron_right</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-10 shadow-soft border border-[#f0e2d6] text-center">
                            <span className="material-symbols-outlined text-5xl text-[#6b6259]/30 mb-4 text-[#f0e2d6]">shopping_bag</span>
                            <p className="text-[#6b6259]">ବର୍ତ୍ତମାନ ପର୍ଯ୍ୟନ୍ତ କୌଣସି ଅର୍ଡର ନାହିଁ।</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 p-6 bg-[#f3ebe2] rounded-2xl flex items-center justify-between shadow-soft">
                    <div className="text-left">
                        <h4 className="font-bold text-lg mb-1">କିଛି ସାହାଯ୍ୟ ଦରକାର କି?</h4>
                        <p className="text-sm text-[#6b6259]">ଆମ ସହ ସିଧାସଳଖ କଥା ହୁଅନ୍ତୁ</p>
                    </div>
                    <a href="tel:+91000000000" className="bg-secondary text-white p-3 rounded-full shadow-lg">
                        <span className="material-symbols-outlined">call</span>
                    </a>
                </div>
            </div>
        </OdiaLayout>
    );
};

export default OdiaProfile;
