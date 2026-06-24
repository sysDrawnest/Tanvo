import React from 'react';
import { Link } from 'react-router-dom';

const ModernMuse: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-12 md:py-20">
            <div className="bg-[#F9F5EE] w-full max-w-7xl mx-auto overflow-hidden flex flex-col md:flex-row items-center min-h-[450px] shadow-sm">

                {/* Left Image Column */}
                <div className="w-full md:w-1/2 h-full flex items-end justify-center pt-8 md:pt-12 px-6 bg-transparent">
                    <img
                        src="/IMG202606241417.jpeg"
                        alt="The Modern Muse"
                        className="w-full h-full object-cover max-h-[450px] transform hover:scale-105 transition-transform duration-700 rounded-sm"
                    />
                </div>

                {/* Right Content Column */}
                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col items-start justify-center">

                    <div className="flex items-baseline mb-6">
                        <span className="text-3xl md:text-5xl font-light text-[#1B2B3A] mr-1">#</span>
                        <h2 className="font-serif text-4xl md:text-7xl text-[#1B2B3A] tracking-tighter leading-none">
                            Modern Muse
                        </h2>
                    </div>

                    <p className="text-[#333333] text-sm md:text-base leading-relaxed mb-10 max-w-md font-sans">
                        Contemporary silhouettes, timeless Indian drapes. Sarees designed for modern celebrations—where heritage meets effortless elegance.
                    </p>

                    <Link
                        to="/shop?style=Modern,Designer"
                        className="bg-[#1C1612] text-[#F9F5EE] px-12 py-4 text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#333333] hover:shadow-xl shadow-md uppercase"
                    >
                        Explore Collection
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default ModernMuse;
