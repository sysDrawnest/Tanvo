import React from 'react';

const BrandStory: React.FC = () => {
    return (
        <section className="py-24 bg-tanvoBg overflow-hidden" data-purpose="brand-story">
            <div className="grid grid-cols-12 gap-12 max-w-7xl mx-auto px-6">
                <div className="col-span-12 md:col-span-6 flex flex-col justify-center order-2 md:order-1">
                    <h3 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">Every thread carries a story...</h3>
                    <p className="text-lg leading-relaxed text-gray-700 mb-8 italic">
                        "In the villages of Western Odisha, the loom is not a machine; it is a heartbeat. For generations, TANVO has collaborated with these master artisans to bring you silhouettes that marry heritage with a contemporary edge."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-20 bg-tanvoDark"></div>
                        <span className="uppercase tracking-widest text-xs">Our Heritage</span>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                    <img
                        alt="Artisan at Loom"
                        className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMXt9Io2S7X4SGZH2DbYMp9o9WhY9owGrCx3i_Iwunmx3Cel5Dm1uEXWD-NigHqb2DNXmdxU87ulXEFtPmwxNKAMPV5uRzaiXi9Q_ZX5k6ldL0zCJ-XtF6AO3SQyCfJoHfZxhr7yUW9pOP7e262tfAHvCMRu84KGy8lO9Kr__Vk6wXoR6TvGXIpY6iH-ZMr-kVE7tTdIuURofBOJ6amFYrSsTtgNTs_IEnsGkNm6ixACk_rMfKB15K7ni4JV7vQxrsAclaAe-jVQ"
                    />
                </div>
            </div>
        </section>
    );
};

export default BrandStory;
