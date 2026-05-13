import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
  sections: { id: string; title: string }[];
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, lastUpdated, children, sections }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-12 pb-24" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12 border-b pb-8" style={{ borderColor: 'var(--border-light)' }}>
            <h1 className="text-4xl md:text-5xl font-display mb-4" style={{ color: 'var(--ink)' }}>{title}</h1>
            <p className="text-sm uppercase tracking-widest" style={{ color: 'var(--warm)' }}>Last Updated: {lastUpdated}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Navigation */}
            <div className="md:w-1/4 hidden md:block">
              <div className="sticky top-32">
                <h3 className="text-lg font-display mb-4" style={{ color: 'var(--ink)' }}>Contents</h3>
                <nav className="space-y-2 text-sm">
                  {sections.map(section => (
                    <a 
                      key={section.id} 
                      href={`#${section.id}`}
                      className="block py-1 opacity-70 hover:opacity-100 hover:text-[#c9a84c] transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 prose prose-lg prose-headings:font-display prose-headings:font-normal max-w-none prose-a:text-[#c9a84c] prose-a:no-underline hover:prose-a:underline">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalLayout;
