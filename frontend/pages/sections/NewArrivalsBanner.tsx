import React from 'react';
import { Link } from 'react-router-dom';

const NewArrivalsBanner: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-12 md:py-20">
            <div className="bg-[#D1D1D4] w-full max-w-7xl mx-auto overflow-hidden flex flex-col md:flex-row items-center min-h-[450px] shadow-sm">

                {/* Left Image Column */}
                <div className="w-full md:w-1/2 h-full flex items-end justify-center pt-8 md:pt-12 px-6 bg-[#C4C4C7]">
                    <img
                        src="/new_arrivals.png"
                        alt="New Arrivals Artisans"
                        className="w-full h-auto object-contain max-h-[450px] transform hover:scale-105 transition-transform duration-700"
                    />
                </div>

                {/* Right Content Column */}
                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col items-start justify-center">

                    <div className="flex items-baseline mb-6">
                        <span className="text-3xl md:text-5xl font-light text-[#1B2B3A] mr-1">#</span>
                        <h2 className="font-serif text-4xl md:text-7xl text-[#1B2B3A] tracking-tighter leading-none">
                            NewArrivals
                        </h2>
                    </div>

                    <p className="text-[#333333] text-sm md:text-base leading-relaxed mb-10 max-w-md font-sans">
                        Experience the latest masterpieces from our looms. Discover fresh patterns,
                        vibrant natural dyes, and the unparalleled touch of authentic Odisha heritage,
                        handpicked for the contemporary soul.
                    </p>

                    <Link
                        to="/shop?sort=-createdAt"
                        className="bg-[#FF4D55] text-white px-12 py-4 text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#E63E46] hover:shadow-xl shadow-md uppercase"
                    >
                        Shop Now
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default NewArrivalsBanner;
