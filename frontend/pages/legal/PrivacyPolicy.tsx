import React from 'react';
import LegalLayout from './LegalLayout';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    { id: 'information-we-collect', title: '1. Information We Collect' },
    { id: 'how-we-use', title: '2. How We Use Your Information' },
    { id: 'sharing', title: '3. Sharing Your Information' },
    { id: 'security', title: '4. Security' },
    { id: 'your-rights', title: '5. Your Rights' },
    { id: 'contact', title: '6. Contact Us' }
  ];

  return (
    <LegalLayout title="Privacy Policy" lastUpdated="May 2026" sections={sections}>
      <p>
        At TANVO, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
      </p>

      {/* TODO: Update with your company's specific legal text */}
      <h2 id="information-we-collect" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>1. Information We Collect</h2>
      <p>We may collect personal information that you voluntarily provide to us when registering at the Site, expressing an interest in obtaining information about us or our products, participating in activities on the Site, or otherwise contacting us. The personal information that we collect depends on the context of your interactions with us and the Site, the choices you make, and the products and features you use.</p>

      <h2 id="how-we-use" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>2. How We Use Your Information</h2>
      <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Create and manage your account.</li>
        <li>Process your transactions and send you related information, including purchase confirmations and invoices.</li>
        <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
        <li>Respond to your comments, questions, and requests and provide customer service.</li>
      </ul>

      <h2 id="sharing" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>3. Sharing Your Information</h2>
      <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows: By Law or to Protect Rights, Third-Party Service Providers, Marketing Communications, Interactions with Other Users, and Business Transfers.</p>

      <h2 id="security" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>4. Security</h2>
      <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

      <h2 id="your-rights" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>5. Your Rights</h2>
      <p>Depending on your location, you may have the right to access, correct, or delete the personal information that we hold about you. You may also have the right to restrict or object to certain processing of your personal information. To exercise these rights, please contact us using the details provided below.</p>

      <h2 id="contact" className="mt-8 mb-4 text-2xl" style={{ color: 'var(--ink)' }}>6. Contact Us</h2>
      <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
      <p className="font-bold">TANVO Heritage<br/>
      Email: support@tanvo.com<br/>
      Odisha, India</p>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
