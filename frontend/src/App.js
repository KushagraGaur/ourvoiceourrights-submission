
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DistrictSelector from './components/DistrictSelector';
import MetricsDisplay from './components/MetricsDisplay';
import LanguageToggle from './components/LanguageToggle';
import ReadAloudButton from './components/ReadAloudButton';

const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001';

function App() {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDistricts();
    autoDetectDistrict();
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      fetchDistrictData(selectedDistrict);
    }
  }, [selectedDistrict]);

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/districts`);
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const autoDetectDistrict = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // In a real app, we would reverse geocode to get district
          // For now, we'll set a default district (Lucknow)
          setSelectedDistrict('2'); // Lucknow
        },
        (error) => {
          console.log('Geolocation not available or denied');
          setSelectedDistrict('2'); // Default to Lucknow
        }
      );
    } else {
      setSelectedDistrict('2'); // Default to Lucknow
    }
  };

  const fetchDistrictData = async (districtId) => {
    setLoading(true);
    try {
      const [metricsResponse, historyResponse] = await Promise.all([
        axios.get(`${API_BASE}/api/district/${districtId}/latest`),
        axios.get(`${API_BASE}/api/district/${districtId}/history`)
      ]);
      
      setMetrics(metricsResponse.data);
      setHistory(historyResponse.data);
    } catch (error) {
      console.error('Error fetching district data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedDistrictName = () => {
    const district = districts.find(d => d.id === selectedDistrict || d.districtId === selectedDistrict);
    return district ? (language === 'hi' ? district.nameHindi : district.name) : '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="high-contrast-bg high-contrast-text py-4 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left hindi-font">
              {language === 'en' ? 'Our Voice, Our Rights' : 'हमारी आवाज, हमारे अधिकार'}
            </h1>
            <div className="flex items-center space-x-4">
              <LanguageToggle language={language} setLanguage={setLanguage} />
              <ReadAloudButton metrics={metrics} language={language} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <DistrictSelector
          districts={districts}
          selectedDistrict={selectedDistrict}
          onDistrictChange={setSelectedDistrict}
          language={language}
        />

        {selectedDistrict && (
          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center hindi-font">
              {language === 'en' 
                ? `MGNREGA Performance - ${getSelectedDistrictName()}`
                : `मनरेगा प्रदर्शन - ${getSelectedDistrictName()}`
              }
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-lg">
                  {language === 'en' ? 'Loading data...' : 'डेटा लोड हो रहा है...'}
                </p>
              </div>
            ) : (
              <MetricsDisplay
                metrics={metrics}
                history={history}
                language={language}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="high-contrast-bg high-contrast-text py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm hindi-font">
            {language === 'en' 
              ? `Data Source: data.gov.in | Last updated: ${metrics ? new Date(metrics.date).toLocaleDateString() : 'N/A'}`
              : `डेटा स्रोत: data.gov.in | अंतिम अद्यतन: ${metrics ? new Date(metrics.date).toLocaleDateString() : 'N/A'}`
            }
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;