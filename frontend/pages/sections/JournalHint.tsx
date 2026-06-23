import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const JournalHint: React.FC = () => {
    return (
        <section 
            className="relative py-32 bg-[#F9F5EE] overflow-hidden"
            data-purpose="journal-hint"
        >
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* Editorial Image */}
                <div className="relative order-2 md:order-1">
                    <div className="aspect-[4/5] overflow-hidden">
                        <img
                            src="/journal-weaver.jpg"
                            alt="TANVO Heritage Journal"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                        />
                    </div>

                    <div className="absolute bottom-6 left-6 bg-[#F9F5EE] px-6 py-4">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[#780000]">
                            TANVO JOURNAL
                        </p>
                        <p className="font-serif italic text-lg">
                            Stories of Craft
                        </p>
                    </div>
                </div>


                {/* Content */}
                <div className="order-1 md:order-2">

                    <span className="text-[#780000] uppercase tracking-[0.35em] text-[10px] font-bold">
                        Heritage Archive
                    </span>


                    <h2 className="font-serif text-5xl md:text-7xl text-[#0D0B0A] leading-[1.1] mt-8 mb-8">
                        The Stories
                        <br/>
                        <span className="italic">
                            Behind Every Thread
                        </span>
                    </h2>


                    <p className="text-[#59413d] leading-relaxed max-w-md mb-10">
                        Discover the artisans, traditions, and forgotten techniques 
                        that transform every handwoven saree into a piece of living heritage.
                    </p>


                    <Link
                        to="/journal"
                        className="
                        inline-flex items-center gap-4
                        uppercase tracking-[0.25em]
                        text-xs font-bold
                        text-[#780000]
                        group
                        "
                    >
                        Explore The Journal

                        <ArrowUpRight
                            size={16}
                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        />

                    </Link>


                    <div className="mt-12 pt-8 border-t border-[#E2D9C8] flex gap-10">

                        <div>
                            <p className="font-serif text-2xl">
                                700+
                            </p>
                            <p className="text-[10px] uppercase tracking-widest">
                                Years Heritage
                            </p>
                        </div>


                        <div>
                            <p className="font-serif text-2xl">
                                Odisha
                            </p>
                            <p className="text-[10px] uppercase tracking-widest">
                                Origin
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default JournalHint;