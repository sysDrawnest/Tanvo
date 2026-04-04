import React from 'react';

const FounderSection: React.FC = () => {
    return (
        <section className="py-24 bg-tanvoBg" data-purpose="founder-spotlight">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                    <div className="relative p-8 border border-tanvoPrimary/20">
                        <img
                            alt="Founder Portrait"
                            className="w-full h-auto grayscale"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNs5BmKGa8YayQJgRf-bf1ZfWcSITp1gWtnIakG-QkHCk67nSU8muX0CKT8l8Mj3k6NgXKGtwtZuAkp-fspTDSdKm1_HtsFUWAEAUlmUpGBptNOLL18yrt3ZX8EjSf27zQDGPrkwBno-W16ifJCaMKHONkWI0NwNWhZC2RHMnICbaHlQ94iwkER7b7aOXJvWd-v3JQMSveL3oSUmQOnbPIQXt-k8kKjqWITykmffk-1Y585XOJhnz3JCfGw3QjH2KFB7l6qLCEwg"
                        />
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-tanvoPrimary/10 -z-10"></div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <p className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-6">
                        "Art is a dialogue between the past and the present. At TANVO, we don't just sell fabric; we preserve memories of the loom."
                    </p>
                    <p className="uppercase tracking-widest font-bold text-tanvoPrimary">— SYS, Founder</p>
                </div>
            </div>
        </section>
    );
};

export default FounderSection;
