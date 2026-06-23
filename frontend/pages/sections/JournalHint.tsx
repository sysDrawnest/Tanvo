import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const JournalHint: React.FC = () => {
    return (
        <section className="py-40 bg-[#F9F5EE]" data-purpose="journal-hint">
            <div className="max-w-7xl mx-auto px-6">
                <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-[#780000]">
                    FROM THE JOURNAL
                </span>

                <div className="grid lg:grid-cols-2 gap-20 mt-10 items-center">
                    <div>
                        <h2 className="font-serif text-5xl lg:text-7xl leading-[0.95] text-[#1C1612]">
                            The Stories
                            <br />
                            Behind
                            <br />
                            The Weave
                        </h2>

                        <p className="mt-10 text-gray-600 max-w-md leading-relaxed">
                            Explore the lives of master artisans, ancient weaving traditions, and the cultural heritage preserved through every handcrafted piece.
                        </p>

                        <Link
                            to="/journal"
                            className="inline-flex items-center gap-3 mt-10 uppercase tracking-[0.25em] text-xs font-semibold text-[#1C1612] hover:text-[#780000] transition-colors group"
                        >
                            Explore Journal
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="aspect-[4/5] overflow-hidden shadow-sm">
                        <img
                            src="/journal-weaver.jpg"
                            alt="Master Weaver"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JournalHint;