import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import OdiaLayout from '../../components/OdiaLayout';
import { useStore } from '../../context/StoreContext';

const OdiaCart: React.FC = () => {
    const navigate = useNavigate();
    const {
        cart, removeFromCart, updateCartQuantity, loading,
        isAuthenticated, guestCart, removeGuestCartItem, updateGuestCartQuantity
    } = useStore();

    const items = isAuthenticated ? (cart?.items || []) : guestCart;
    const isEmpty = items.length === 0;

    const subtotal = isAuthenticated
        ? (cart?.items?.reduce((acc, item) => {
            const price = item.product?.price || item.price || 0;
            return acc + (price * item.quantity);
        }, 0) || 0)
        : guestCart.reduce((acc, item) => acc + ((item.price || 0) * item.quantity), 0);

    const shipping = subtotal > 5000 ? 0 : (subtotal > 0 ? 500 : 0);
    const total = subtotal + shipping;

    if (isEmpty) {
        return (
            <OdiaLayout>
                <div className="pt-20 pb-20 text-center">
                    <div className="w-24 h-24 bg-[#f3ebe2] rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-5xl text-[#6b6259]">shopping_basket</span>
                    </div>
                    <h2 className="font-noto text-3xl font-bold mb-4">ଆପଣଙ୍କ ବ୍ୟାଗ୍ ଖାଲି ଅଛି</h2>
                    <p className="text-[#6b6259] mb-10">ଆମର ନୂଆ ସଂଗ୍ରହ ଦେଖନ୍ତୁ ଏବଂ ଆପଣଙ୍କ ପସନ୍ଦର ଶାଢ଼ୀ ବାଛନ୍ତୁ।</p>
                    <button
                        onClick={() => navigate('/odia/shop')}
                        className="bg-primary text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg btn-tap"
                    >
                        ଶାଢ଼ୀ ଦେଖନ୍ତୁ
                    </button>
                </div>
            </OdiaLayout>
        );
    }

    return (
        <OdiaLayout>
            <div className="pt-6 pb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-noto text-3xl font-bold">ମୋର ବ୍ୟାଗ୍</h2>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                        {items.length} ଟି ଆଇଟମ୍
                    </span>
                </div>

                <div className="space-y-6 mb-10">
                    {items.map((item: any) => {
                        const id = item._id || item.productId;
                        const product = item.product || item;
                        const imageUrl = product.images?.[0]?.url || product.image || '';

                        return (
                            <div key={id} className="bg-white rounded-3xl p-4 shadow-soft border border-[#f0e2d6] flex gap-4">
                                <div className="w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-[#f5ede5]">
                                    <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1 text-left">
                                    <div>
                                        <h4 className="font-bold text-lg leading-tight mb-1">{product.name}</h4>
                                        <p className="text-primary font-bold text-xl">₹{product.price * item.quantity}</p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center bg-[#f3ebe2] rounded-xl px-2 py-1">
                                            <button
                                                onClick={() => isAuthenticated ? updateCartQuantity(id, item.quantity - 1) : updateGuestCartQuantity(id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-primary font-bold"
                                                disabled={item.quantity <= 1}
                                            >
                                                <span className="material-symbols-outlined text-sm font-bold">remove</span>
                                            </button>
                                            <span className="px-3 font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => isAuthenticated ? updateCartQuantity(id, item.quantity + 1) : updateGuestCartQuantity(id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-primary font-bold"
                                            >
                                                <span className="material-symbols-outlined text-sm font-bold">add</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => isAuthenticated ? removeFromCart(id) : removeGuestCartItem(id)}
                                            className="text-[#6b6259] hover:text-red-600 transition-colors"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary */}
                <div className="bg-white rounded-3xl p-6 shadow-soft border border-[#f0e2d6] mb-8 text-left">
                    <h3 className="font-bold text-xl mb-6">ହିସାବ</h3>
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-[#6b6259]">
                            <span>ମୋଟ ମୂଲ୍ୟ:</span>
                            <span className="font-bold">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-[#6b6259]">
                            <span>ଡେଲିଭରି ଚାର୍ଜ:</span>
                            <span className={shipping === 0 ? 'text-green-600 font-bold' : 'font-bold'}>
                                {shipping === 0 ? 'ମାଗଣା' : `₹${shipping}`}
                            </span>
                        </div>
                        <div className="h-[1px] bg-[#f0e2d6]"></div>
                        <div className="flex justify-between text-2xl font-black text-primary">
                            <span>ସମୁଦାୟ:</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/odia/checkout')}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-xl shadow-lg flex items-center justify-center gap-3 btn-tap"
                    >
                        <span className="material-symbols-outlined">shopping_cart_checkout</span> ଏବେ କିଣନ୍ତୁ
                    </button>
                </div>
            </div>
        </OdiaLayout>
    );
};

export default OdiaCart;
