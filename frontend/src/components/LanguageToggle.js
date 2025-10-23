import React from 'react';

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <div className="flex rounded-lg border-2 border-white overflow-hidden touch-target">
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 font-semibold transition-colors duration-200 ${
          language === 'en' 
            ? 'bg-white text-blue-600' 
            : 'bg-transparent text-white hover:bg-white hover:bg-opacity-20'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={`px-4 py-2 font-semibold hindi-font transition-colors duration-200 ${
          language === 'hi' 
            ? 'bg-white text-blue-600' 
            : 'bg-transparent text-white hover:bg-white hover:bg-opacity-20'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
};

export default LanguageToggle;