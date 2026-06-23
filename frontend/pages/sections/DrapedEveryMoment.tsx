import React from 'react';

const DrapedEveryMoment: React.FC = () => {
    const occasions = [
        {
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
            label: 'BRIDAL COLLECTION',
            title: 'Wedding Elegance',
            description: 'Timeless silks for your most cherished celebration.',
            stagger: false,
        },
        {
            image: 'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?w=800',
            label: 'CELEBRATION',
            title: 'Golden Beginnings',
            description: 'Graceful weaves for moments worth remembering.',
            stagger: true,
        },
        {
            image: 'https://images.unsplash.com/photo-1605697040720-18df82424b9a?w=800',
            label: 'DAILY HERITAGE',
            title: 'Effortless Grace',
            description: 'Comfort meets traditional craftsmanship.',
            stagger: false,
        },
        {
            image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800',
            label: 'THOUGHTFUL GIFTS',
            title: 'A Gift Of Tradition',
            description: "Share a piece of India's weaving legacy.",
            stagger: true,
        }
    ];

    return (
        <section className="py-24 bg-white" data-purpose="draped-moments">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase text-center font-bold mb-4">Draped For Every Moment</p>
                <h2 className="font-serif text-3xl md:text-4xl mb-16 text-center uppercase tracking-widest text-[#1C1612]">
                    The Art of Occasion
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {occasions.map((item, idx) => (
                        <div
                            key={idx}
                            className={`aspect-[9/16] bg-gray-50 relative group overflow-hidden cursor-pointer ${
                                item.stagger ? 'md:mt-8' : ''
                            }`}
                        >
                            <img
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-[1.05]"
                                src={item.image}
                                alt={item.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                                <span className="text-[#C9A84C] text-[9px] uppercase tracking-[0.2em] font-bold block mb-2">
                                    {item.label}
                                </span>
                                <h3 className="text-white font-serif text-xl mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-xs font-sans leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DrapedEveryMoment;
