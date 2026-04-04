import React from 'react';

const CultureParallax: React.FC = () => {
    return (
        <section
            className="relative h-[60vh] flex items-center justify-center bg-fixed bg-center bg-no-repeat bg-cover"
            data-purpose="culture-parallax"
            style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPzjt3Eup5hDK-22z3FZEshRYlIHoiYR_fLEpUCuFc8k1HQ2wun6FD9Si7IqRsL3Z3ZVYM-kGAOVE8d1mRdLq2zcJBZmYrcIMMKWsVkle9gFnq2NGDKjl-pUPgH1HT-zzDFdOtaYQSa1Y3-qi6c4H7lGRfplOYhxD4QaQw6TAHnKJIF8olII3CRoNB4FcLwDLqm3DgTnwukt9ZpsTKxd7ZttbnLvMzt11bD2GWC72IW7JtNgOQFW8ojXtLL0RdhKlagTK-c8xmaQ')"
            }}
        >
            <div className="absolute inset-0 bg-tanvoDark/40"></div>
            <div className="relative z-10 text-center text-white">
                <h2 className="font-serif text-4xl md:text-6xl mb-4 italic">Soul of Odisha</h2>
                <p className="uppercase tracking-[0.5em] text-sm">Where tradition meets the divine</p>
            </div>
        </section>
    );
};

export default CultureParallax;
