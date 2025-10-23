import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const MetricCard = ({ title, value, history, dataKey, language, tooltip, icon, isCurrency = false }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const formatValue = (val) => {
    if (!val) return '-';
    
    if (isCurrency) {
      return `₹${val.toLocaleString('en-IN')}`;
    }
    
    return val.toLocaleString('en-IN');
  };

  const sparklineData = history.map(item => ({
    value: item[dataKey] || 0,
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:border-blue-300 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl text-blue-600">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 hindi-font">{title}</h3>
            <div className="relative inline-block">
              <button
                onClick={() => setShowTooltip(!showTooltip)}
                className="text-gray-400 hover:text-gray-600 touch-target"
                aria-label="Information"
              >
                ℹ️
              </button>
              {showTooltip && (
                <div className="absolute z-10 w-64 p-3 mt-2 text-sm bg-gray-800 text-white rounded-lg shadow-lg hindi-font">
                  {tooltip}
                  <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-3xl font-bold text-gray-900 mb-4">
        {formatValue(value)}
      </div>

      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricCard;