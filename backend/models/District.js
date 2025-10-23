const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  districtId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  nameHindi: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: 'Uttar Pradesh',
  },
});

module.exports = mongoose.model('District', districtSchema);