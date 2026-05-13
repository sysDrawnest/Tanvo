import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [preferences, setPreferences] = useState({
    essential: true, // always true
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    } else {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    
    // Here you would trigger/initialize your analytics if analytics === true
    if (prefs.analytics) {
      console.log('Analytics cookies accepted');
    }
  };

  const acceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  };

  const acceptEssential = () => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[#1a362d] text-[#fdfbf7] shadow-2xl border-t border-[#c9a84c]/30"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex-1">
              <h3 className="text-xl font-display mb-2 text-[#c9a84c]">We value your privacy</h3>
              <p className="text-sm opacity-90">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>

            {!showPreferences ? (
              <div className="flex flex-col sm:flex-row gap-3 min-w-max">
                <button 
                  onClick={() => setShowPreferences(true)}
                  className="px-6 py-2 text-sm border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#1a362d] transition-colors"
                >
                  Preferences
                </button>
                <button 
                  onClick={acceptEssential}
                  className="px-6 py-2 text-sm border border-[#c9a84c]/50 hover:bg-white/10 transition-colors"
                >
                  Reject All
                </button>
                <button 
                  onClick={acceptAll}
                  className="px-6 py-2 text-sm bg-[#c9a84c] text-[#1a362d] font-bold hover:bg-white transition-colors"
                >
                  Accept All
                </button>
              </div>
            ) : (
              <div className="flex-1 bg-[#254d40] p-4 rounded-lg mt-4 md:mt-0 w-full md:w-auto md:max-w-md">
                <h4 className="font-bold mb-3 border-b border-[#c9a84c]/30 pb-2">Cookie Preferences</h4>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold">Essential</div>
                      <div className="text-xs opacity-70">Required for the site to function properly.</div>
                    </div>
                    <input type="checkbox" checked disabled className="accent-[#c9a84c]" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold">Analytics</div>
                      <div className="text-xs opacity-70">Help us understand how you use the site.</div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                      className="accent-[#c9a84c] w-4 h-4 cursor-pointer" 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold">Marketing</div>
                      <div className="text-xs opacity-70">Used to deliver targeted advertising.</div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                      className="accent-[#c9a84c] w-4 h-4 cursor-pointer" 
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setShowPreferences(false)} className="px-4 py-1.5 text-xs border border-white/20">Back</button>
                  <button onClick={savePreferences} className="px-4 py-1.5 text-xs bg-[#c9a84c] text-[#1a362d] font-bold">Save</button>
                </div>
              </div>
            )}
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
