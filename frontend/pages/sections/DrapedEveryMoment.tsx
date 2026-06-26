import React from 'react';
import { useNavigate } from 'react-router-dom';

const DrapedEveryMoment: React.FC = () => {
    const navigate = useNavigate();

    const occasions = [
        {
            image: '/The Art of Occasion Wedding .jpeg',
            label: 'BRIDAL COLLECTION',
            title: 'Wedding Elegance',
            description: 'Timeless silks for your most cherished celebration.',
            stagger: false,
            query: 'wedding',
        },
        {
            image: '/The Art of Occasion Ring Ceremony .jpeg',
            label: 'CELEBRATION',
            title: 'Golden Beginnings',
            description: 'Graceful weaves for moments worth remembering.',
            stagger: true,
            query: 'celebration',
        },
        {
            image: '/The Art of Occasion Efferlatly garce .jpeg',
            label: 'DAILY HERITAGE',
            title: 'Effortless Grace',
            description: 'Comfort meets traditional craftsmanship.',
            stagger: false,
            query: 'daily',
        },
        {
            image: '/The Art of Occasion Daily Use .jpeg',
            label: 'THOUGHTFUL GIFTS',
            title: 'A Gift Of Tradition',
            description: "Share a piece of India's weaving legacy.",
            stagger: true,
            query: 'gifting',
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
                            onClick={() => navigate(`/shop?occasion=${item.query}`)}
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
