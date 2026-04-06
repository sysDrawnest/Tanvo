import React from 'react';
import WeaveAnatomy from './sections/WeaveAnatomy';
import BrandStory from './sections/BrandStory';
import StoriesSection from './sections/StoriesSection';
import FabricShowcase from './sections/FabricShowcase';
import ZariDetail from './sections/ZariDetail';

const Journal: React.FC = () => {
    return (
        <div className="bg-tanvoBg min-h-screen pt-20">
            <header className="py-24 px-6 text-center bg-white border-b border-gray-100">
                <span className="text-tanvoPrimary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">The Weaver's Diary</span>
                <h1 className="font-serif text-5xl md:text-7xl text-tanvoDark leading-tight">Craft Chronicles</h1>
                <p className="mt-8 text-gray-500 max-w-2xl mx-auto italic">
                    Exploring the intersections of ancient heritage, mathematical precision, and modern design narratives.
                </p>
            </header>

            <main>
                <BrandStory />
                <FabricShowcase />
                <WeaveAnatomy />
                <ZariDetail />
                <StoriesSection />

                <section className="py-24 px-6 bg-white">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-serif text-3xl mb-8">More stories unfolding soon...</h2>
                        <div className="flex justify-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-tanvoPrimary"></div>
                            <div className="w-2 h-2 rounded-full bg-tanvoPrimary opacity-50"></div>
                            <div className="w-2 h-2 rounded-full bg-tanvoPrimary opacity-20"></div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Journal;
