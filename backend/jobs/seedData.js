const mongoose = require('mongoose');
const Metric = require('../models/Metric');
const District = require('../models/District');
require('dotenv').config();

const connectDB = require('../config/db');

async function seedData() {
  try {
    await connectDB();
    console.log('Connected to database');

    // Clear existing data
    await Metric.deleteMany({});
    await District.deleteMany({});

    // Seed districts
    const districts = [
      { districtId: '1', name: 'Agra', nameHindi: 'आगरा' },
      { districtId: '2', name: 'Lucknow', nameHindi: 'लखनऊ' },
      { districtId: '3', name: 'Varanasi', nameHindi: 'वाराणसी' },
      { districtId: '4', name: 'Kanpur Nagar', nameHindi: 'कानपुर नगर' },
      { districtId: '5', name: 'Ghaziabad', nameHindi: 'गाजियाबाद' }
    ];

    await District.insertMany(districts);
    console.log('Districts seeded');

    // Seed sample metrics for each district
    for (const district of districts) {
      const baseValue = 1000 + (parseInt(district.districtId) * 100);
      
      // Create metrics for last 6 months
      for (let i = 0; i < 6; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        
        const variation = 0.8 + (Math.random() * 0.4);
        
        const metric = new Metric({
          districtId: district.districtId,
          date,
          householdsRegistered: Math.round(baseValue * 2 * variation),
          personDaysGenerated: Math.round(baseValue * 50 * variation),
          totalWagesPaid: Math.round(baseValue * 10000 * variation),
          worksCompleted: Math.round(baseValue / 10 * variation),
          averageWagePerPersonDay: 250 + (parseInt(district.districtId) % 50) + Math.round(Math.random() * 20 - 10),
          stateAverage: {
            householdsRegistered: 50000,
            personDaysGenerated: 2500000,
            totalWagesPaid: 500000000,
            worksCompleted: 2500,
            averageWagePerPersonDay: 275
          }
        });

        await metric.save();
      }
    }

    console.log('Sample data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();