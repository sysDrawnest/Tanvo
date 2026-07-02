import React from 'react';
import { Link } from 'react-router-dom';

const HandwovenHeritage: React.FC = () => {
    return (
        <section className="bg-white py-16 md:py-24 overflow-hidden selection:bg-[#780000] selection:text-white">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
                
                {/* Title */}
                <h2 className="font-headline font-normal text-5xl md:text-7xl lg:text-[7rem] tracking-tight text-[#0D0B0A] uppercase mb-8 md:mb-12 w-full" style={{ lineHeight: '1.1' }}>
                    <span className="block">EVERY THREAD</span>
                    <span className="block text-[#780000] italic font-serif">CARRIES A STORY</span>
                </h2>

                {/* Hero Image */}
                <div className="w-full max-w-7xl relative group mb-10 md:mb-16">
                    <div className="aspect-[16/9] md:aspect-[2.75/1] overflow-hidden bg-[#F9F5EE]">
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdg7Ev_2hzinZ3ELEiaInm85FF5cZlgC3vjDdz0dNR_5uT4IiQNlFThWx02_8d06i2loTg_isOhanjJ-XgBXwD-7k3DYSXsQ0sK299Dac6LbvjJmC1kxyaGNcHjfKqM2ha6jBHoYHFtoC01UMM9aZuUX9eFXnAZmP-cpSPrKM2hmNjOcawJFf_SRb7nmoR1VqIFZtR3wRMta_51owM7im8pFVUJIkDcyqlH5ayYK0PtWIo3z1HxUK-4v3km41dOKv787phEhTaww" 
                            alt="Master Weaver"
                            className="w-full h-full object-cover object-center transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* Quote / Subtext */}
                <div className="max-w-4xl mx-auto px-4">
                    <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#0D0B0A] leading-[1.3]">
                        "Handwoven over 15 days by artisans whose families have woven for seven generations."
                    </p>
                </div>

                {/* Divider */}
                <div className="w-32 h-[1px] bg-[#0D0B0A] mx-auto my-10 md:my-16"></div>

                {/* Stats */}
                <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 mb-12 md:mb-16">
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-label text-sm md:text-base uppercase tracking-[0.25em] text-[#0D0B0A] font-bold">15 Days</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-label text-sm md:text-base uppercase tracking-[0.25em] text-[#0D0B0A] font-bold">7 Generations</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-label text-sm md:text-base uppercase tracking-[0.25em] text-[#0D0B0A] font-bold">100% Hand</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-label text-sm md:text-base uppercase tracking-[0.25em] text-[#0D0B0A] font-bold">GI Certified</span>
                    </div>
                </div>

                {/* CTA */}
                <Link to="/about" className="group flex items-center justify-center gap-4 text-[#0D0B0A] hover:text-[#780000] transition-colors duration-300">
                    <span className="font-label text-sm md:text-base uppercase tracking-[0.2em] font-bold">Discover the Craft</span>
                    <span className="material-symbols-outlined transform transition-transform duration-300 group-hover:translate-x-2">arrow_right_alt</span>
                </Link>

            </div>
        </section>
    );
};

export default HandwovenHeritage;
