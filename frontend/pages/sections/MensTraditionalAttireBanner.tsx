import React from 'react';
import { Link } from 'react-router-dom';

const NewArrivalsBanner: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-12 md:py-20">
            <div className="bg-[#F9F5EE] w-full max-w-7xl mx-auto overflow-hidden relative min-h-[550px] shadow-sm">
                
                {/* Full background image */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="/Mens Collection Banner.png"
                        alt="New Arrivals Artisans"
                        className="w-full h-full object-cover object-[80%_top]"
                    />
                    {/* Minimal dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1B2B3A]/80 via-[#1B2B3A]/50 to-transparent"></div>
                </div>

                {/* Content overlay - left aligned with light text */}
                <div className="relative h-full min-h-[550px] flex items-center">
                    <div className="w-full md:w-1/2 px-8 md:px-16 py-12">
                        
                        {/* Minimal badge */}
                        <div className="inline-block mb-6">
                            <span className="text-[11px] tracking-[4px] text-[#F9F5EE] font-light uppercase border border-[#F9F5EE]/30 px-4 py-2">
                                Handloom Collection
                            </span>
                        </div>
                        
                        {/* Heading - big and bold with light color */}
                        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F9F5EE] tracking-tighter leading-[1.05] mb-4">
                            New
                            <br />
                            Arrivals
                        </h2>
                        
                        {/* Minimal description with light color */}
                        <p className="text-[#F9F5EE] text-sm md:text-base font-light max-w-sm mb-8 opacity-80 leading-relaxed">
                            Discover the latest masterpieces from our looms.
                        </p>

                        {/* Clean CTA with light styling */}
                        <Link
                            to="/shop?sort=-createdAt"
                            className="inline-block bg-[#F9F5EE] text-[#1B2B3A] px-10 py-4 text-sm font-medium tracking-wider transition-all duration-300 hover:bg-white hover:shadow-lg shadow-md uppercase"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewArrivalsBanner;