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
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F9F5EE] via-[#F9F5EE]/60 to-transparent md:via-[#F9F5EE]/30"></div>
                </div>

                {/* Content overlay - left aligned */}
                <div className="relative h-full min-h-[550px] flex items-center">
                    <div className="w-full md:w-1/2 px-8 md:px-16 py-12">
                        
                        {/* Minimal badge */}
                        <div className="inline-block mb-6">
                            <span className="text-[11px] tracking-[4px] text-[#1B2B3A] font-light uppercase border border-[#1B2B3A]/20 px-4 py-2">
                                Handloom Collection
                            </span>
                        </div>
                        
                        {/* Heading - big and bold */}
                        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#1B2B3A] tracking-tighter leading-[1.05] mb-4">
                            New
                            <br />
                            Arrivals
                        </h2>
                        
                        {/* Minimal description */}
                        <p className="text-[#1B2B3A] text-sm md:text-base font-light max-w-sm mb-8 opacity-70 leading-relaxed">
                            Discover the latest masterpieces from our looms.
                        </p>

                        {/* Clean CTA */}
                        <Link
                            to="/shop?sort=-createdAt"
                            className="inline-block bg-[#1C1612] text-[#F9F5EE] px-10 py-4 text-sm font-medium tracking-wider transition-all duration-300 hover:bg-[#333333] hover:shadow-lg shadow-md uppercase"
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