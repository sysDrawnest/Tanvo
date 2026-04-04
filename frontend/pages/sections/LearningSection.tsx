import React from 'react';

const LearningSection: React.FC = () => {
    return (
        <section className="py-24 bg-white" data-purpose="video-reels">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-serif text-3xl mb-12 text-center uppercase tracking-widest">The Art of Drape</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-[9/16] bg-gray-100 relative group overflow-hidden cursor-pointer">
                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="/banarasi_detail.png" alt="Banarasi Craft" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                            <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold block mb-1">Traditional</span>
                            <span className="text-white font-serif text-lg">Banarasi Silk</span>
                        </div>
                    </div>
                    <div className="aspect-[9/16] bg-gray-100 relative group overflow-hidden cursor-pointer mt-8">
                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="/sambalpuri_ikat.png" alt="Sambalpuri Ikat" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                            <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold block mb-1">Mathematically Precise</span>
                            <span className="text-white font-serif text-lg">Sambalpuri Ikat</span>
                        </div>
                    </div>
                    <div className="aspect-[9/16] bg-gray-100 relative group overflow-hidden cursor-pointer">
                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="/designer_fancy.png" alt="Fancy Designer" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                            <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold block mb-1">Contemporary</span>
                            <span className="text-white font-serif text-lg">Designer Fancy</span>
                        </div>
                    </div>
                    <div className="aspect-[9/16] bg-gray-100 relative group overflow-hidden cursor-pointer mt-8">
                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="/tussar_silk.png" alt="Tussar Silk" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                            <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold block mb-1">Earthy Heritage</span>
                            <span className="text-white font-serif text-lg">Pure Tussar Silk</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LearningSection;
