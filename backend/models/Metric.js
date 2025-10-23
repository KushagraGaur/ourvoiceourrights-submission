const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  districtId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  householdsRegistered: Number,
  personDaysGenerated: Number,
  totalWagesPaid: Number,
  worksCompleted: Number,
  averageWagePerPersonDay: Number,
  stateAverage: {
    householdsRegistered: Number,
    personDaysGenerated: Number,
    totalWagesPaid: Number,
    worksCompleted: Number,
    averageWagePerPersonDay: Number,
  }
}, {
  timestamps: true
});

metricSchema.index({ districtId: 1, date: -1 });

module.exports = mongoose.model('Metric', metricSchema);