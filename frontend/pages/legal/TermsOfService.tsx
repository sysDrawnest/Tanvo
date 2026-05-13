import React from 'react';
import LegalLayout from './LegalLayout';

const TermsOfService: React.FC = () => {
  const sections = [
    { id: 'agreement', title: '1. Agreement to Terms' },
    { id: 'intellectual-property', title: '2. Intellectual Property Rights' },
    { id: 'user-representations', title: '3. User Representations' },
    { id: 'products', title: '4. Products and Pricing' },
    { id: 'returns', title: '5. Return Policy' },
    { id: 'contact', title: '6. Contact Us' }
  ];

  return (
    <LegalLayout title="Terms of Service" lastUpdated="May 2026" sections={sections}>
      {/* TODO: Update with your company's specific legal text */}
      <h2 id="agreement" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>1. Agreement to Terms</h2>
      <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and TANVO Heritage ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.</p>

      <h2 id="intellectual-property" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>2. Intellectual Property Rights</h2>
      <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.</p>

      <h2 id="user-representations" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>3. User Representations</h2>
      <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.</p>

      <h2 id="products" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>4. Products and Pricing</h2>
      <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products. All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.</p>

      <h2 id="returns" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>5. Return Policy</h2>
      <p>Please review our Return Policy posted on the Site prior to making any purchases.</p>

      <h2 id="contact" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>6. Contact Us</h2>
      <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
      <p className="font-bold">TANVO Heritage<br/>
      Email: support@tanvo.com<br/>
      Odisha, India</p>
    </LegalLayout>
  );
};

export default TermsOfService;
