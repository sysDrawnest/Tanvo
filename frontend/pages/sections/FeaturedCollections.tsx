import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCollections: React.FC = () => {
    return (
        <section className="py-24 bg-white" data-purpose="collections-grid" id="collections">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Bestsellers */}
                    <Link to="/shop?isBestSeller=true" className="group cursor-pointer">
                        <div className="overflow-hidden aspect-[3/4] mb-6">
                            <img
                                alt="Bestsellers"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKcisMF1hrZgDoPXL19YbcwCKpCKqHxouq3O1gLYiLowGkK7fULOy_MCFsqyrq9TLe8BNz32DZgOXo8-uqvVyIh0z7XBgqWu8zVRBeFv3AT2MLvL2hU3q26EbjdKN_P2pAZ98imJJqobvhwtNWTOt_FQHlLS4trapWpb-q1QEd9JI7Lpd7nPA1VeFJpJIZwaXG7Yhq2cwvrtDCtC3xtXvK_mUpvEQ0EKKnsXfFRgjUYrrGhEu2hPBxN_fZH2EesNUdTf_MbwWFXg"
                            />
                        </div>
                        <h4 className="font-serif text-3xl mb-2">The Classics</h4>
                        <p className="uppercase tracking-widest text-xs text-tanvoPrimary">Bestsellers</p>
                    </Link>

                    {/* New Arrivals */}
                    <Link to="/shop" className="group cursor-pointer md:mt-24">
                        <div className="overflow-hidden aspect-[3/4] mb-6">
                            <img
                                alt="New Arrivals"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrwz_Iuf3z83DgBDfvuR6FwngF-hbTtN2cMZ5rqKgzGswdSkjVRMftxPNXnOnRlS1w5SwfE9plRk3jDq41yqFjC-LzhieQsfxuOA3eVOxuQzI-dG137cT6vgPU0wZjB5a5FB2p7q9J6qVIsvGD52KXgoMDK_rgi3Ykslj1IeWo2SwveUiFd2Q6GBhHUd3SNNYmh_I0OjvAk7C2xCjh_U69JewLBNeqoY_Ih6Rv56od0TmM3RbHfjSMT8ctsy5vqnRy5ECq_iYITw"
                            />
                        </div>
                        <h4 className="font-serif text-3xl mb-2">Auro of Autumn</h4>
                        <p className="uppercase tracking-widest text-xs text-tanvoPrimary">New Arrivals</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;
