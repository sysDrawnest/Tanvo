import React from 'react';
import CraftChroniclesCinema from './sections/CraftChroniclesCinema';
import StoriesSection from './sections/StoriesSection';

const Journal: React.FC = () => {
    return (
        <div className="bg-[#fbf9f4] min-h-screen pt-20">
            <main>
                {/* Modern Cinematic Storytelling Section */}
                <CraftChroniclesCinema />

                {/* Additional Stories & Deep Dives */}
                <StoriesSection />

                {/* Closing Section */}
                <section className="py-32 px-6 bg-[#fbf9f4]">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="h-[1px] w-24 bg-[#775a19]/20 mx-auto mb-12"></div>
                        <h2 className="font-serif text-3xl md:text-5xl mb-8 text-[#1b1c19] italic">More stories unfolding soon...</h2>
                        <div className="flex justify-center gap-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#775a19]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#775a19] opacity-50"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#775a19] opacity-20"></div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Journal;

