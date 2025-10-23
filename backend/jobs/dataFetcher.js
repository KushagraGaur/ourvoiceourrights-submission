const cron = require('node-cron');
const axios = require('axios');
const Metric = require('../models/Metric');

// Schedule job to run daily at 3 AM
cron.schedule('0 3 * * *', async () => {
  console.log('Starting data fetch from MGNREGA API...');
  try {
    await fetchMGNREGAData();
    console.log('Data fetch completed successfully');
  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
});

async function fetchMGNREGAData() {
  try {
    // This is a placeholder for the actual API call
    // The actual implementation would depend on the specific API endpoints
    const apiKey = process.env.DATA_GOV_API_KEY;
    
    // Example API call (adjust based on actual API documentation)
    const response = await axios.get(
      `https://api.data.gov.in/resource/mgnrega?api-key=${apiKey}&format=json&filters[state]=Uttar Pradesh&limit=100`
    );

    if (response.data && response.data.records) {
      await processAPIData(response.data.records);
    }
  } catch (error) {
    console.error('Failed to fetch from API, using fallback data:', error.message);
    // In case of API failure, we'll rely on the sample data generation
  }
}

async function processAPIData(records) {
  // Process and store the API data
  // This would need to be customized based on the actual API response structure
  for (const record of records) {
    const metricData = {
      districtId: record.district_code || record.district,
      date: new Date(),
      householdsRegistered: record.households_registered,
      personDaysGenerated: record.person_days,
      totalWagesPaid: record.wages_paid,
      worksCompleted: record.works_completed,
      averageWagePerPersonDay: record.average_wage
    };

    await Metric.findOneAndUpdate(
      { districtId: metricData.districtId, date: metricData.date },
      metricData,
      { upsert: true, new: true }
    );
  }
}

module.exports = { fetchMGNREGAData };