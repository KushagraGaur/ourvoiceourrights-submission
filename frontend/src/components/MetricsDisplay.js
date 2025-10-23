import React from 'react';
import MetricCard from './MetricCard';
import ComparisonBar from './ComparisonBar';

const MetricsDisplay = ({ metrics, history, language }) => {
  if (!metrics) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600 hindi-font">
          {language === 'en' ? 'No data available' : 'कोई डेटा उपलब्ध नहीं'}
        </p>
      </div>
    );
  }

  const metricConfig = [
    {
      key: 'householdsRegistered',
      title: language === 'en' ? 'Households Registered' : 'पंजीकृत परिवार',
      dataKey: 'householdsRegistered',
      tooltip: language === 'en' 
        ? 'Number of households registered under MGNREGA in this district'
        : 'इस जिले में मनरेगा के तहत पंजीकृत परिवारों की संख्या',
      icon: '🏠'
    },
    {
      key: 'personDaysGenerated',
      title: language === 'en' ? 'Person-Days Generated' : 'व्यक्ति-दिवस उत्पन्न',
      dataKey: 'personDaysGenerated',
      tooltip: language === 'en'
        ? 'Total employment days generated for workers'
        : 'श्रमिकों के लिए उत्पन्न कुल रोजगार दिवस',
      icon: '👥'
    },
    {
      key: 'totalWagesPaid',
      title: language === 'en' ? 'Total Wages Paid' : 'कुल मजदूरी भुगतान',
      dataKey: 'totalWagesPaid',
      tooltip: language === 'en'
        ? 'Total wages paid to workers in Indian Rupees'
        : 'श्रमिकों को भुगतान की गई कुल मजदूरी (रुपये में)',
      icon: '💰',
      isCurrency: true
    },
    {
      key: 'worksCompleted',
      title: language === 'en' ? 'Works Completed' : 'कार्य पूर्ण',
      dataKey: 'worksCompleted',
      tooltip: language === 'en'
        ? 'Number of development works completed'
        : 'पूर्ण किए गए विकास कार्यों की संख्या',
      icon: '✅'
    },
    {
      key: 'averageWagePerPersonDay',
      title: language === 'en' ? 'Average Wage per Day' : 'प्रतिदिन औसत मजदूरी',
      dataKey: 'averageWagePerPersonDay',
      tooltip: language === 'en'
        ? 'Average wage paid per person per day in Indian Rupees'
        : 'प्रति व्यक्ति प्रतिदिन भुगतान की गई औसत मजदूरी (रुपये में)',
      icon: '📊',
      isCurrency: true
    }
  ];

  return (
    <div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metricConfig.map((config) => (
          <MetricCard
            key={config.key}
            title={config.title}
            value={metrics[config.key]}
            history={history}
            dataKey={config.dataKey}
            language={language}
            tooltip={config.tooltip}
            icon={config.icon}
            isCurrency={config.isCurrency}
          />
        ))}
      </div>

      {/* Comparison Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 text-center hindi-font">
          {language === 'en' ? 'District vs State Average' : 'जिला बनाम राज्य औसत'}
        </h3>
        <div className="space-y-6">
          {metricConfig.map((config) => (
            <ComparisonBar
              key={config.key}
              title={config.title}
              districtValue={metrics[config.key]}
              stateValue={metrics.stateAverage ? metrics.stateAverage[config.key] : 0}
              language={language}
              isCurrency={config.isCurrency}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;