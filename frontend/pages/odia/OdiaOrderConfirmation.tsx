import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OdiaLayout from '../../components/OdiaLayout';

const OdiaOrderConfirmation: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <OdiaLayout>
            <div className="pt-16 pb-24 text-center px-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow">
                    <span className="material-symbols-outlined text-6xl text-green-600 animate-in zoom-in duration-500">check_circle</span>
                </div>

                <h2 className="font-noto text-4xl font-bold mb-4">ଧନ୍ୟବାଦ!</h2>
                <p className="text-xl font-medium text-[#2d2a24] mb-2">ଆପଣଙ୍କ ଅର୍ଡର ସଫଳ ହେଲା।</p>
                <div className="bg-[#f9f2ea] p-3 inline-block rounded-lg mb-8">
                    <p className="text-[#6b6259] text-sm">ଅର୍ଡର ନମ୍ବର: <span className="font-mono font-bold text-[#173B45]">#{id?.slice(-8).toUpperCase()}</span></p>
                </div>

                <div className="max-w-xs mx-auto space-y-6 mb-12 text-left">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary">local_shipping</span>
                        <p className="text-[#6b6259] text-sm">ଆମର ପ୍ରତିନିଧି ଖୁବ୍ ଶୀଘ୍ର ଆପଣଙ୍କ ସହ ଯୋଗାଯୋଗ କରିବେ।</p>
                    </div>
                </div>

                <div className="grid gap-4 max-w-sm mx-auto">
                    <button
                        onClick={() => navigate('/odia/profile')}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg btn-tap"
                    >
                        ମୋର ଅର୍ଡର ଦେଖନ୍ତୁ
                    </button>
                    <button
                        onClick={() => navigate('/odia/shop')}
                        className="w-full border-2 border-primary text-primary py-4 rounded-2xl font-bold text-lg"
                    >
                        ଆଉ କିଛି କିଣନ୍ତୁ
                    </button>
                </div>

                <div className="mt-16 pt-8 border-t border-[#f0e2d6]">
                    <p className="text-[#6b6259] font-bold mb-4">ହ୍ୱାଟ୍ସଆପ୍ ରେ ଅର୍ଡର ର ଅପଡେଟ୍ ପାଇଁ:</p>
                    <a
                        href="https://wa.me/91000000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all"
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span> ହ୍ୱାଟ୍ସଆପ୍ କରନ୍ତୁ
                    </a>
                </div>
            </div>
        </OdiaLayout>
    );
};

export default OdiaOrderConfirmation;
