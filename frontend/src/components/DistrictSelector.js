import React from 'react';

const DistrictSelector = ({ districts, selectedDistrict, onDistrictChange, language }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <label htmlFor="district-select" className="block text-lg font-semibold mb-3 hindi-font">
        {language === 'en' ? 'Select Your District' : 'अपना जिला चुनें'}
      </label>
      <select
        id="district-select"
        value={selectedDistrict || ''}
        onChange={(e) => onDistrictChange(e.target.value)}
        className="touch-target w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hindi-font"
      >
        <option value="">
          {language === 'en' ? '-- Select District --' : '-- जिला चुनें --'}
        </option>
        {districts.map((district) => (
          <option 
            key={district.id || district.districtId} 
            value={district.id || district.districtId}
          >
            {language === 'hi' ? district.nameHindi : district.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictSelector;