import React from 'react';
import { Link } from 'react-router-dom';

const NewArrivalsBanner: React.FC = () => {
    return (
        <section className="relative w-full bg-tanvoBg">
            {/* Top Gradient Overlay */}
            <div className="absolute top-0 left-0 right-0 h-[120px] md:h-[140px] bg-gradient-to-b from-[#F8EDED] to-transparent pointer-events-none z-10" />

            <div className="container mx-auto px-4 relative z-20">
                {/* Floating Panel Card */}
                <div className="bg-[#FAF9F7] w-full max-w-7xl mx-auto rounded-[24px] md:rounded-[36px] shadow-[0_-15px_30px_-5px_rgba(0,0,0,0.15),_0_20px_40px_-15px_rgba(0,0,0,0.1)] -mt-16 md:-mt-28 relative z-20 overflow-hidden min-h-[550px]">
                    
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
                    <div className="relative h-full min-h-[550px] flex items-center py-16 sm:py-20 md:py-24 px-6 md:px-12">
                        <div className="w-full md:w-1/2">
                            
                            {/* Minimal badge */}
                            <div className="inline-block mb-6">
                                <span className="text-[11px] tracking-[4px] text-[#F9F5EE] font-light uppercase border border-[#F9F5EE]/30 px-4 py-2">
                                    Handloom Collection
                                </span>
                            </div>
                            
                            {/* Heading - big and bold with light color */}
                            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F9F5EE] tracking-tighter leading-[1.05] mb-4">
                                Men's 
                                <br />
                                Traditional
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
            </div>
        </section>
    );
};

export default NewArrivalsBanner;