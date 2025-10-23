import React from 'react';

const ReadAloudButton = ({ metrics, language }) => {
  const speak = () => {
    if (!metrics) return;

    const speech = new SpeechSynthesisUtterance();
    speech.lang = language === 'en' ? 'en-IN' : 'hi-IN';

    let text = '';
    
    if (language === 'en') {
      text = `
        MGNREGA Performance Data. 
        Households Registered: ${metrics.householdsRegistered?.toLocaleString() || 0}.
        Person Days Generated: ${metrics.personDaysGenerated?.toLocaleString() || 0}.
        Total Wages Paid: ${metrics.totalWagesPaid?.toLocaleString() || 0} Rupees.
        Works Completed: ${metrics.worksCompleted?.toLocaleString() || 0}.
        Average Wage per Day: ${metrics.averageWagePerPersonDay?.toLocaleString() || 0} Rupees.
      `;
    } else {
      text = `
        मनरेगा प्रदर्शन डेटा.
        पंजीकृत परिवार: ${metrics.householdsRegistered?.toLocaleString() || 0}.
        व्यक्ति दिवस उत्पन्न: ${metrics.personDaysGenerated?.toLocaleString() || 0}.
        कुल मजदूरी भुगतान: ${metrics.totalWagesPaid?.toLocaleString() || 0} रुपये.
        कार्य पूर्ण: ${metrics.worksCompleted?.toLocaleString() || 0}.
        प्रतिदिन औसत मजदूरी: ${metrics.averageWagePerPersonDay?.toLocaleString() || 0} रुपये.
      `;
    }

    speech.text = text;
    window.speechSynthesis.speak(speech);
  };

  return (
    <button
      onClick={speak}
      className="touch-target bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 hindi-font"
    >
      <span>🔊</span>
      <span>{language === 'en' ? 'Read Aloud' : 'जोर से पढ़ें'}</span>
    </button>
  );
};

export default ReadAloudButton;