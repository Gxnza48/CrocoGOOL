import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 left-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-50"
        >
          <p className="text-white mb-4">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          </p>
          <button
            onClick={handleAccept}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;