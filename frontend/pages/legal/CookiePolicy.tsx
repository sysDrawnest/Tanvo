import React from 'react';
import LegalLayout from './LegalLayout';

const CookiePolicy: React.FC = () => {
  const sections = [
    { id: 'what-are-cookies', title: '1. What Are Cookies' },
    { id: 'how-we-use-cookies', title: '2. How We Use Cookies' },
    { id: 'types-of-cookies', title: '3. Types of Cookies We Use' },
    { id: 'managing-cookies', title: '4. Managing Cookies' },
    { id: 'contact', title: '5. Contact Us' }
  ];

  return (
    <LegalLayout title="Cookie Policy" lastUpdated="May 2026" sections={sections}>
      {/* TODO: Update with your company's specific legal text */}
      <h2 id="what-are-cookies" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>1. What Are Cookies</h2>
      <p>Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>

      <h2 id="how-we-use-cookies" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>2. How We Use Cookies</h2>
      <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>

      <h2 id="types-of-cookies" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>3. Types of Cookies We Use</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Essential Cookies:</strong> These cookies are essential to provide you with services available through our website and to enable you to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts.</li>
        <li><strong>Analytics Cookies:</strong> These cookies are used to track information about traffic to the website and how users use the website. The information gathered via these cookies may directly or indirectly identify you as an individual visitor.</li>
        <li><strong>Marketing Cookies:</strong> These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaign.</li>
      </ul>

      <h2 id="managing-cookies" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>4. Managing Cookies</h2>
      <p>You can manage your cookie preferences at any time through our <button onClick={() => {
        // Trigger cookie consent banner here if needed
        localStorage.removeItem('cookieConsent');
        window.location.reload();
      }} className="text-[#c9a84c] underline cursor-pointer">Cookie Preferences</button> panel. Alternatively, you can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>

      <h2 id="contact" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>5. Contact Us</h2>
      <p>If you have any questions about our use of cookies or other technologies, please email us at support@tanvo.com.</p>
    </LegalLayout>
  );
};

export default CookiePolicy;
