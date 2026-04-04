import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const JournalHint: React.FC = () => {
    return (
        <section className="py-24 bg-white border-y border-gray-100" data-purpose="journal-hint">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <span className="text-tanvoPrimary uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Recommended Reading</span>
                <h2 className="font-serif text-3xl md:text-5xl text-tanvoDark leading-tight mb-8">
                    The Real Stories <br /> <span className="italic">Behind Our Brand</span>
                </h2>
                <p className="text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
                    Dive deeper into the mathematical precision of the loom, the 700-year legacy of Odisha's weavers, and our vision for modern heritage.
                </p>
                <Link
                    to="/journal"
                    className="inline-flex items-center gap-3 px-10 py-4 bg-tanvoPrimary text-white uppercase text-xs tracking-widest hover:bg-tanvoAccent transition-all duration-500"
                >
                    Explore the Chronicles <ArrowRight size={14} />
                </Link>
            </div>
        </section>
    );
};

export default JournalHint;
