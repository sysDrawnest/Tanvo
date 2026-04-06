import React from 'react';
import { useNavigate } from 'react-router-dom';
import OdiaLayout from '../../components/OdiaLayout';
import { useStore } from '../../context/StoreContext';

const OdiaHome: React.FC = () => {
    const navigate = useNavigate();
    const { products } = useStore();
    const PHONE = '9100000000';

    // Featured products (take 3 newest/best)
    const featuredProducts = products.slice(0, 3);

    const categories = [
        {
            name: 'ସମ୍ବଲପୁରୀ',
            desc: 'ଇକତ୍ କଳା',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl_hDrB1k7RSf-1w5Kls6w52rzl-Ttcc6HP9z4DVLkY1-3u0YLiHEW5NhyzD8-9K2FpdeRlYtXXt6wER9qKYzHLqSquNsghvqgC9jFivd9B7_x5Y0gB79H7_NdJ06BFLWJVZow9T1wBz5O55K3jqj-kb3sZ5c9nCJcWnLmKvHm3L9Lk0M'
        },
        {
            name: 'ବୋମକାଇ',
            desc: 'ମାଛ ପଲ୍ଲବ',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArVlm5X-EShb-16UuSFq9HRuvRb6PoH2v-t0wnUnyLL5vBzp-XanyxVeDufUGmKenT98-_P0c-E4flE31EqIrvm1MzMye-BvlyTizMNqmuF9fzBcVylkbCxACKo_5l6QNDF5sGJrnypd65qFo6NQn-dprzWXqOhPV1AGgkgygoFCquxuZB1b6yTqwh5FPxX_Z4E8WRO6LcDZNyHabMt7GNcdpx7WZJvwSSzmqoH1-3mq3GgN_RuPZuH9tyDG4XXvDOsOsHeN_VYg'
        },
        {
            name: 'ଖଣ୍ଡୁଆ',
            desc: 'ମନ୍ଦିର ଡିଜାଇନ୍',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsq2woqlLJxE3-7kykX9HBF7MRnXQYFtjB-ESvP6kBlc6TqePqoFwuQTs92lvXBU5FMF-6M5SUDn3-egM6743SecziZE5SyroSdTGA5PUPY7ZhFaJK_JSkaOM54QAal3q3ofSHT07iNjrf31zR-yh-ftGb1lIJzbUsIf86u-na2vKR2W2g3bSklX6kLlVv_OgJ8HmOkjqT19gOK_2Qv2IgglarJ7Sk7DyEArAGjz6fTZN6RdZ9j0t6W3hDISui_ismITQ8xLJjEA'
        },
        {
            name: 'ପସପାଳି',
            desc: 'ପାଟ ଶାଢ଼ୀ',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClyuKAtmO2gqO0Hn0UD2P7F6J3g9MyF9bOUJmV6dxY_kmqVltimLbQ6u2_ssRr-mCQz0Mmg8P9-h3vqQjWpNnJukE-a8OK0U57L9uOT5XgT5HgSzvNfbUoV6-iEhYpc5AlSgbyphqt0Z03KJPLHXkBLd6tqLMy-MEaRckHXlWr-Yk2hZAdTpA2ElyC2X5oPQ'
        }
    ];

    return (
        <OdiaLayout>
            {/* Hero Section */}
            <section className="mt-5 mb-10">
                <div className="relative rounded-3xl overflow-hidden shadow-soft bg-white">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 p-7 md:p-10 z-10 relative">
                            <span className="bg-[#fed488]/70 text-[#5d4201] px-3 py-1 rounded-full text-xs font-bold tracking-wide inline-block mb-4 backdrop-blur-sm">୧୦୦% ଅସଲି ହସ୍ତତନ୍ତ</span>
                            <h2 className="font-noto text-4xl md:text-5xl text-[#2d2a24] font-bold leading-tight mb-5">ଓଡ଼ିଆ <br />ହସ୍ତତନ୍ତ ଶାଢ଼ୀ</h2>
                            <p className="text-[#6b6259] text-base md:text-lg mb-6 leading-relaxed">ପ୍ରତିଟି ତନ୍ତୁରେ ଓଡ଼ିଆ ପରମ୍ପରାର ଗାଥା</p>
                            <button
                                onClick={() => navigate('/odia/shop')}
                                className="bg-gradient-to-r from-[#9f2e30] to-[#b6452c] text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-md flex items-center gap-2 hover:shadow-xl transition-all btn-tap"
                            >
                                <span className="material-symbols-outlined">shopping_bag</span>
                                ଶାଢ଼ୀ କିଣନ୍ତୁ
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 h-[340px] md:h-[460px] relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 rounded-3xl md:rounded-none"></div>
                            <img
                                alt="Handloom Sambalpuri saree"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq48xbgXJIm0eiFRctm3UNoBWt7BSyYW21yZ0sbZWBkZHVYcipM9e3WbqTs1agqdMeye-cByaxHGIShs-8ISLWmWIZHs2pNrmqM7BI3K41OzV7TKjPu605ZUhbhc0caBbxtOyrlG9AEcu51pV5ROfU1JQqRRV5bkMy4UE3Ve_e-nc-lvKLrMy71Za1xS_lGpoghP5EQ6I5pzSzXXid49TWYZoEfycGV8Miv897iLWw_45Zizm00ySQ6SWSjRcwCcmNOx2uO35hGg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Action Buttons */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
                <button
                    onClick={() => navigate('/odia/shop')}
                    className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-soft border border-[#f0e2d6] transition-all hover:shadow-card-hover btn-tap group"
                >
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary transition-all">
                        <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white">storefront</span>
                    </div>
                    <span className="text-xl font-bold">ଶାଢ଼ୀ କିଣନ୍ତୁ</span>
                    <span className="text-sm text-[#6b6259] mt-1">ସମସ୍ତ ଶାଢ଼ୀ</span>
                </button>
                <a
                    href={`tel:+${PHONE}`}
                    className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-soft border border-[#f0e2d6] transition-all hover:shadow-card-hover btn-tap group no-underline text-[#2d2a24]"
                >
                    <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-secondary transition-all">
                        <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-white">call</span>
                    </div>
                    <span className="text-xl font-bold">କଲ୍ କରନ୍ତୁ</span>
                    <span className="text-sm text-[#6b6259] mt-1">ସିଧାସଳଖ କଥା ହୁଅନ୍ତୁ</span>
                </a>
                <a
                    href={`https://wa.me/${PHONE}`}
                    className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-soft border border-[#f0e2d6] transition-all hover:shadow-card-hover btn-tap group no-underline text-[#2d2a24]"
                >
                    <div className="w-14 h-14 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#25D366] transition-all">
                        <span className="material-symbols-outlined text-3xl text-[#25D366] group-hover:text-white" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                    </div>
                    <span className="text-xl font-bold">ହ୍ୱାଟ୍ସଆପ୍ ଅର୍ଡର</span>
                    <span className="text-sm text-[#6b6259] mt-1">ଫଟୋ ପଠାନ୍ତୁ</span>
                </a>
            </section>

            {/* Story Section */}
            <section className="mb-16">
                <div className="bg-[#f9f2ea] rounded-3xl overflow-hidden shadow-soft border border-[#f0e2d6]">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-8 md:p-10 order-2 md:order-1">
                            <h3 className="font-noto text-3xl font-bold text-[#2d2a24] mb-3">ଆମ କାହାଣୀ</h3>
                            <div className="w-12 h-1 bg-secondary rounded-full mb-5"></div>
                            <p className="text-[#4a4238] leading-relaxed text-lg mb-5">ଓଡ଼ିଶାର ଗ୍ରାମାଞ୍ଚଳର ବୁଣାକାରମାନେ ପିଢ଼ି ପରେ ପିଢ଼ି ହାତରେ ବୁଣନ୍ତି ଏହି ଅମୂଲ୍ୟ ଶାଢ଼ୀ। ତନ୍ତୁର ପ୍ରତିଟି ଗଣ୍ଠିରେ ଲୁଚିଛି ପରମ୍ପରା, ମମତା ଓ ଓଡ଼ିଆ ଅଭିମାନ।</p>
                            <p className="text-[#6b6259]">ଆମେ ସିଧାସଳଖ ବୁଣାକାରଙ୍କଠାରୁ ଆଣି ଆପଣଙ୍କ ପାଖରେ ପହଞ୍ଚାଉ, ଯାହା ଫଳରେ ହସ୍ତତନ୍ତ ବଞ୍ଚିଥାଏ ଓ କାରିଗରମାନେ ଉତ୍ସାହିତ ହୁଅନ୍ତି।</p>
                        </div>
                        <div className="md:w-1/2 h-72 md:h-auto bg-[#e6d8cd] order-1 md:order-2 relative overflow-hidden">
                            <div className="absolute inset-0 bg-ikat-pattern opacity-20 mix-blend-multiply"></div>
                            <img
                                className="w-full h-full object-cover"
                                alt="Weaver at loom"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXo2G2qFCUq8UDSnRrC9Zx83S-CI3XhEZ6VbVh4HQBwMVR10pA8tN0pz4pKrrOZp0zVwiO7rPKxLCbUjDhwQaHnkA2Wr4g9jEslzQkJdQpLVb-cpp9yIhNpR_jdX0VpFm12f9FZ8cms1drPmZPpgRHAK5KPb-6xZbbkKxWKhvE6zEhVt5c9U1lj8jL_swlKtRjHL7W7v5bZGngVGBtLc2AaxYyH8C7oICkKtUVn9zXvBkUqM-BnHqZEq1aQpJtWjVhU6xFO-3Xg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Section */}
            <section className="mb-16">
                <div className="flex justify-between items-end mb-6">
                    <h3 className="font-noto text-3xl font-bold tracking-tight">ତନ୍ତୁର ବିଭିନ୍ନ ରୂପ</h3>
                    <span
                        className="text-primary font-semibold text-sm cursor-pointer"
                        onClick={() => navigate('/odia/shop')}
                    >
                        ସବୁ ଦେଖନ୍ତୁ →
                    </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => navigate(`/odia/shop?category=${cat.name}`)}
                            className="group bg-white rounded-2xl overflow-hidden shadow-soft border border-[#f0e2d6] transition-all hover:shadow-card-hover category-card text-left"
                        >
                            <div className="aspect-square overflow-hidden bg-[#f5ede5] relative">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={cat.name} src={cat.img} />
                                {cat.name === 'ସମ୍ବଲପୁରୀ' && (
                                    <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-[11px] font-bold text-secondary">ଇକତ୍</div>
                                )}
                            </div>
                            <div className="p-3 text-center">
                                <h4 className="font-bold text-lg">{cat.name}</h4>
                                <p className="text-[#a1611f] text-sm">{cat.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Featured Banner */}
            <section className="mb-16">
                <div className="relative rounded-3xl overflow-hidden shadow-soft group">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-10"></div>
                    <img
                        className="w-full h-64 md:h-80 object-cover"
                        alt="Handloom closeup texture"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbQ3Dpx43NYcN5mQ6S_U_yc6C76s8yNnDVY1nJkOv5EidqX-PWCy7ApfQ2afuE8x7G5E79S91y3LBvCwA0SJN9HT0T_j1BUW7ifP1Rj4DzT45T7JwLlGz22DUb_eUFl_mJzxUz7zUZONnO7Xyk3eR8Z0VJ1g"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col items-start justify-center p-8 md:p-12 text-left">
                        <span className="text-white/80 text-sm font-semibold tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">ସୀମିତ ସଂଗ୍ରହ</span>
                        <h3 className="font-noto text-4xl md:text-5xl font-bold text-white drop-shadow-md leading-tight mb-3">ହାତରେ ବୁଣା ଶାଢ଼ୀ</h3>
                        <p className="text-white/90 text-base max-w-md mb-5">ପ୍ରତିଟି ତନ୍ତୁ ଅନନ୍ୟ, ଠିକ୍ ତାଙ୍କ ପରି ଯିଏ ପିନ୍ଧିବେ</p>
                        <button
                            onClick={() => navigate('/odia/shop')}
                            className="bg-white text-primary font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 hover:bg-primary hover:text-white transition-all btn-tap"
                        >
                            ଏବେ କିଣନ୍ତୁ <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="mb-16">
                <div className="flex justify-between items-end mb-6">
                    <h3 className="font-noto text-3xl font-bold">ନୂଆ ଶାଢ଼ୀ ସଂଗ୍ରହ</h3>
                    <span
                        className="text-primary font-bold cursor-pointer"
                        onClick={() => navigate('/odia/shop')}
                    >
                        ସବୁ ଦେଖନ୍ତୁ →
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-soft border border-[#f0e2d6] transition-all hover:shadow-card-hover cursor-pointer"
                                onClick={() => navigate(`/odia/product/${product._id}`)}
                            >
                                <div className="aspect-[4/5] overflow-hidden relative">
                                    <img className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src={product.image[0]} alt={product.name} />
                                    {product.isNew && (
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-bold text-secondary">ନୂଆ</div>
                                    )}
                                </div>
                                <div className="p-5 text-left">
                                    <h4 className="text-xl font-bold mb-1">{product.name} (Odia)</h4>
                                    <p className="text-primary text-2xl font-black mb-4">₹{product.price}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Add to bag logic if needed, or navigate
                                            navigate(`/odia/product/${product._id}`);
                                        }}
                                        className="w-full bg-[#f0e3d4] text-on-surface hover:bg-primary hover:text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 btn-tap"
                                    >
                                        <span className="material-symbols-outlined">add_shopping_cart</span> ବ୍ୟାଗରେ ଯୋଡନ୍ତୁ
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Placeholder product if none found
                        <div className="group bg-white rounded-2xl overflow-hidden shadow-soft border border-[#f0e2d6] transition-all hover:shadow-card-hover cursor-pointer">
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDYgtP225Hq52kCLY8nUZnvCkCToMrO5E2l4LGOXNkjVzSl1mGnUuCNFGFnQVjUmW7HLGrtmCshnYtIjJH8yTmwHLSfXUBsOrTWvXI9HdoPOCRgNsKGSksRMmOxAE2NXZcVBRSLUrNp3C5Fl9gact5lX9NWPipSg4QUAAOhzTtr_bh-oQhdp75Nca87dOORLd3_o1pTCFyVQhZKvU4lQv86VcYa-ns3bpvVP4u0qotRxtdYuJaJrj8Tyk2hXPd-aMzNG6V8fop2w" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-bold text-secondary">ନୂଆ</div>
                            </div>
                            <div className="p-5 text-left">
                                <h4 className="text-xl font-bold mb-1">ସମ୍ବଲପୁରୀ ଶାଢ଼ୀ</h4>
                                <p className="text-primary text-2xl font-black mb-4">₹୪,୫୦୦</p>
                                <button className="w-full bg-[#f0e3d4] text-on-surface hover:bg-primary hover:text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 btn-tap"><span class="material-symbols-outlined">add_shopping_cart</span> ବ୍ୟାଗରେ ଯୋଡନ୍ତୁ</button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="mb-16">
                <div className="text-center mb-8">
                    <h3 className="font-noto text-3xl font-bold">ଗ୍ରାହକଙ୍କ ମତାମତ</h3>
                    <div className="w-16 h-1 bg-secondary mx-auto mt-2 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-soft border border-[#f0e2d6] flex gap-4 items-start text-left">
                        <div className="w-12 h-12 rounded-full bg-[#f0e3d4] flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">ସ୍ମୃ</div>
                        <div>
                            <p className="italic text-[#4a4238]">“ସମ୍ବଲପୁରୀ ଶାଢ଼ୀଟି ଅସଲି ଓ ବହୁତ ସୁନ୍ଦର। ଡେଲିଭରି ସମୟରେ ପହଞ୍ଚିଲା। ମୁଁ ଗର୍ବରେ ପିନ୍ଧେ।”</p>
                            <div className="flex mt-2 items-center">
                                <span className="text-secondary text-sm">★★★★★</span>
                                <span className="ml-2 text-xs text-[#6b6259]">- ସ୍ମୃତି ରଥ</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-soft border border-[#f0e2d6] flex gap-4 items-start text-left">
                        <div className="w-12 h-12 rounded-full bg-[#f0e3d4] flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">ଦେବ</div>
                        <div>
                            <p className="italic text-[#4a4238]">“ବୋମକାଇ ଶାଢ଼ୀର କାରିଗରୀ ଅଦ୍ଭୁତ। ପ୍ରକୃତ ଓଡ଼ିଆ ହସ୍ତତନ୍ତର ସ୍ୱାଦ ମିଳିଲା।”</p>
                            <div className="flex mt-2 items-center">
                                <span className="text-secondary text-sm">★★★★★</span>
                                <span className="ml-2 text-xs text-[#6b6259]">- ଦେବାଶିଷ ପଣ୍ଡା</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="bg-[#f3ebe2] p-7 rounded-3xl flex flex-col md:flex-row items-center justify-around gap-6 text-center md:text-left shadow-soft mb-10">
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 text-secondary font-bold text-xl mb-1">
                        <span className="material-symbols-outlined text-4xl">verified</span>
                        <span>୧୦୦% ଅସଲି ହସ୍ତତନ୍ତ</span>
                    </div>
                    <p className="text-[#6b6259] max-w-xs px-2 md:px-0">ଓଡ଼ିଶାର ବୁଣାକାରଙ୍କ ଦ୍ଵାରା ପ୍ରସ୍ତୁତ</p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 text-secondary font-bold text-xl mb-1">
                        <span className="material-symbols-outlined text-4xl">local_shipping</span>
                        <span>ମାଗଣା ଡେଲିଭରି</span>
                    </div>
                    <p className="text-[#6b6259] max-w-xs px-2 md:px-0">ସମଗ୍ର ଓଡ଼ିଶା ଓ ଭାରତରେ</p>
                </div>
            </section>
        </OdiaLayout>
    );
};

export default OdiaHome;
