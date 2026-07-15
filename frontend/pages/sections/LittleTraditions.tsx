import React from 'react';
import { Link } from 'react-router-dom';

const LittleTraditions: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F9F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] text-[#C9A84C] font-semibold uppercase block mb-3">
            Introducing Kids Collection
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0D0B0A] font-light leading-tight">
            Little <em>Traditions</em>
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A84C] mx-auto my-6" />
          <p className="text-sm font-light text-[#595550] leading-relaxed">
            Handcrafted luxury traditional wear for the next generation. Timeless weaves tailored for the joy of childhood celebrations.
          </p>
        </div>

        {/* Campaign Grid - Two Columns (Girls vs Boys) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Girls Traditional Column */}
          <div className="group relative overflow-hidden bg-white shadow-sm flex flex-col h-[520px] sm:h-[600px] lg:h-[680px]">
            {/* Image Wrap */}
            <div className="relative w-full flex-grow overflow-hidden">
              <img
                src="/kids_campaign_girl.png"
                alt="Girls Traditional Heritage Lehenga Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/80 via-transparent to-transparent opacity-90 transition-opacity duration-300" />
            </div>

            {/* Campaign Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 z-10 flex flex-col justify-end text-white">
              <span className="text-[9px] tracking-[0.25em] text-[#E8C97A] font-light uppercase block mb-2">
                Heritage Silks
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-light mb-4">
                The Girls' <em>Lehenga & Frocks</em>
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-light max-w-sm leading-relaxed mb-6">
                Delicate floral motifs woven into handloom silks, bringing regal grace to young celebrations.
              </p>
              <div>
                <Link
                  to="/shop?category=Kids+Collection&gender=Girl"
                  className="inline-block border border-white/40 hover:border-[#C9A84C] text-white hover:text-[#C9A84C] px-6 py-3 text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-[#F9F5EE]/10"
                >
                  Explore Girls Collection
                </Link>
              </div>
            </div>
          </div>

          {/* Boys Traditional Column */}
          <div className="group relative overflow-hidden bg-white shadow-sm flex flex-col h-[520px] sm:h-[600px] lg:h-[680px]">
            {/* Image Wrap */}
            <div className="relative w-full flex-grow overflow-hidden">
              <img
                src="/kids_campaign_boy.png"
                alt="Boys Traditional Heritage Kurta Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/80 via-transparent to-transparent opacity-90 transition-opacity duration-300" />
            </div>

            {/* Campaign Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 z-10 flex flex-col justify-end text-white">
              <span className="text-[9px] tracking-[0.25em] text-[#E8C97A] font-light uppercase block mb-2">
                Classic Weaves
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-light mb-4">
                The Boys' <em>Kurta & Dhoti Sets</em>
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-light max-w-sm leading-relaxed mb-6">
                Refined styles crafted from breathable cottons and silks. Made for comfort, dignity, and play.
              </p>
              <div>
                <Link
                  to="/shop?category=Kids+Collection&gender=Boy"
                  className="inline-block border border-white/40 hover:border-[#C9A84C] text-white hover:text-[#C9A84C] px-6 py-3 text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-[#F9F5EE]/10"
                >
                  Explore Boys Collection
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Age Filters */}
        <div className="mt-16 pt-10 border-t border-[#0D0B0A]/10 text-center">
          <span className="text-[10px] tracking-[0.2em] text-[#595550] uppercase font-light block mb-6">
            Shop by Age Group
          </span>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: '0–2 Years', age: '0-2 Years' },
              { label: '3–5 Years', age: '3-5 Years' },
              { label: '6–8 Years', age: '6-8 Years' },
              { label: '9–12 Years', age: '9-12 Years' },
              { label: '13–15 Years', age: '13-15 Years' },
            ].map(item => (
              <Link
                key={item.label}
                to={`/shop?category=Kids+Collection&ageGroup=${encodeURIComponent(item.age)}`}
                className="px-6 py-2 border border-[#0D0B0A]/10 hover:border-[#C9A84C] text-xs font-medium text-[#595550] hover:text-[#C9A84C] transition-colors bg-white hover:bg-[#F9F5EE]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default LittleTraditions;
