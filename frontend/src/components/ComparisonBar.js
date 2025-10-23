import React from 'react';

const ComparisonBar = ({ title, districtValue, stateValue, language, isCurrency = false }) => {
  const formatValue = (val) => {
    if (!val) return '0';
    
    if (isCurrency) {
      return `₹${val.toLocaleString('en-IN')}`;
    }
    
    return val.toLocaleString('en-IN');
  };

  const maxValue = Math.max(districtValue || 0, stateValue || 0);
  const districtPercentage = maxValue > 0 ? ((districtValue || 0) / maxValue) * 100 : 0;
  const statePercentage = maxValue > 0 ? ((stateValue || 0) / maxValue) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 hindi-font">{title}</span>
        <div className="flex space-x-4 text-xs">
          <span className="text-blue-600 font-semibold">
            {language === 'en' ? 'District:' : 'जिला:'} {formatValue(districtValue)}
          </span>
          <span className="text-green-600 font-semibold">
            {language === 'en' ? 'State Avg:' : 'राज्य औसत:'} {formatValue(stateValue)}
          </span>
        </div>
      </div>
      
      <div className="flex space-x-2 h-6">
        <div 
          className="bg-blue-500 rounded-l-lg transition-all duration-500 ease-out"
          style={{ width: `${districtPercentage}%` }}
          title={`District: ${formatValue(districtValue)}`}
        ></div>
        <div 
          className="bg-green-500 rounded-r-lg transition-all duration-500 ease-out"
          style={{ width: `${statePercentage}%` }}
          title={`State Average: ${formatValue(stateValue)}`}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>{language === 'en' ? 'Your District' : 'आपका जिला'}</span>
        <span>{language === 'en' ? 'State Average' : 'राज्य औसत'}</span>
      </div>
    </div>
  );
};

export default ComparisonBar;