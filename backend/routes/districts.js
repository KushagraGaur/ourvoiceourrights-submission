const express = require('express');
const router = express.Router();
const District = require('../models/District');

// Static list of Uttar Pradesh districts
const upDistricts = [
  { id: '1', name: 'Agra', nameHindi: 'आगरा' },
  { id: '2', name: 'Aligarh', nameHindi: 'अलीगढ़' },
  { id: '3', name: 'Allahabad', nameHindi: 'इलाहाबाद' },
  { id: '4', name: 'Ambedkar Nagar', nameHindi: 'अम्बेडकर नगर' },
  { id: '5', name: 'Amethi', nameHindi: 'अमेठी' },
  { id: '6', name: 'Amroha', nameHindi: 'अमरोहा' },
  { id: '7', name: 'Auraiya', nameHindi: 'औरैया' },
  { id: '8', name: 'Azamgarh', nameHindi: 'आजमगढ़' },
  { id: '9', name: 'Baghpat', nameHindi: 'बागपत' },
  { id: '10', name: 'Bahraich', nameHindi: 'बहराइच' },
  { id: '11', name: 'Ballia', nameHindi: 'बलिया' },
  { id: '12', name: 'Balrampur', nameHindi: 'बलरामपुर' },
  { id: '13', name: 'Banda', nameHindi: 'बांदा' },
  { id: '14', name: 'Barabanki', nameHindi: 'बाराबंकी' },
  { id: '15', name: 'Bareilly', nameHindi: 'बरेली' },
  { id: '16', name: 'Basti', nameHindi: 'बस्ती' },
  { id: '17', name: 'Bhadohi', nameHindi: 'भदोही' },
  { id: '18', name: 'Bijnor', nameHindi: 'बिजनौर' },
  { id: '19', name: 'Budaun', nameHindi: 'बदायूं' },
  { id: '20', name: 'Bulandshahr', nameHindi: 'बुलंदशहर' },
  { id: '21', name: 'Chandauli', nameHindi: 'चंदौली' },
  { id: '22', name: 'Chitrakoot', nameHindi: 'चित्रकूट' },
  { id: '23', name: 'Deoria', nameHindi: 'देवरिया' },
  { id: '24', name: 'Etah', nameHindi: 'एटा' },
  { id: '25', name: 'Etawah', nameHindi: 'इटावा' },
  { id: '26', name: 'Faizabad', nameHindi: 'फैजाबाद' },
  { id: '27', name: 'Farrukhabad', nameHindi: 'फर्रुखाबाद' },
  { id: '28', name: 'Fatehpur', nameHindi: 'फतेहपुर' },
  { id: '29', name: 'Firozabad', nameHindi: 'फिरोजाबाद' },
  { id: '30', name: 'Gautam Buddha Nagar', nameHindi: 'गौतम बुद्ध नगर' },
  { id: '31', name: 'Ghaziabad', nameHindi: 'गाजियाबाद' },
  { id: '32', name: 'Ghazipur', nameHindi: 'गाजीपुर' },
  { id: '33', name: 'Gonda', nameHindi: 'गोंडा' },
  { id: '34', name: 'Gorakhpur', nameHindi: 'गोरखपुर' },
  { id: '35', name: 'Hamirpur', nameHindi: 'हमीरपुर' },
  { id: '36', name: 'Hapur', nameHindi: 'हापुड़' },
  { id: '37', name: 'Hardoi', nameHindi: 'हरदोई' },
  { id: '38', name: 'Hathras', nameHindi: 'हाथरस' },
  { id: '39', name: 'Jalaun', nameHindi: 'जालौन' },
  { id: '40', name: 'Jaunpur', nameHindi: 'जौनपुर' },
  { id: '41', name: 'Jhansi', nameHindi: 'झांसी' },
  { id: '42', name: 'Kannauj', nameHindi: 'कन्नौज' },
  { id: '43', name: 'Kanpur Dehat', nameHindi: 'कानपुर देहात' },
  { id: '44', name: 'Kanpur Nagar', nameHindi: 'कानपुर नगर' },
  { id: '45', name: 'Kasganj', nameHindi: 'कासगंज' },
  { id: '46', name: 'Kaushambi', nameHindi: 'कौशाम्बी' },
  { id: '47', name: 'Kheri', nameHindi: 'खीरी' },
  { id: '48', name: 'Kushinagar', nameHindi: 'कुशीनगर' },
  { id: '49', name: 'Lalitpur', nameHindi: 'ललितपुर' },
  { id: '50', name: 'Lucknow', nameHindi: 'लखनऊ' },
  { id: '51', name: 'Maharajganj', nameHindi: 'महाराजगंज' },
  { id: '52', name: 'Mahoba', nameHindi: 'महोबा' },
  { id: '53', name: 'Mainpuri', nameHindi: 'मैनपुरी' },
  { id: '54', name: 'Mathura', nameHindi: 'मथुरा' },
  { id: '55', name: 'Mau', nameHindi: 'मऊ' },
  { id: '56', name: 'Meerut', nameHindi: 'मेरठ' },
  { id: '57', name: 'Mirzapur', nameHindi: 'मिर्जापुर' },
  { id: '58', name: 'Moradabad', nameHindi: 'मुरादाबाद' },
  { id: '59', name: 'Muzaffarnagar', nameHindi: 'मुजफ्फरनगर' },
  { id: '60', name: 'Pilibhit', nameHindi: 'पीलीभीत' },
  { id: '61', name: 'Pratapgarh', nameHindi: 'प्रतापगढ़' },
  { id: '62', name: 'Raebareli', nameHindi: 'रायबरेली' },
  { id: '63', name: 'Rampur', nameHindi: 'रामपुर' },
  { id: '64', name: 'Saharanpur', nameHindi: 'सहारनपुर' },
  { id: '65', name: 'Sambhal', nameHindi: 'संभल' },
  { id: '66', name: 'Sant Kabir Nagar', nameHindi: 'संत कबीर नगर' },
  { id: '67', name: 'Shahjahanpur', nameHindi: 'शाहजहांपुर' },
  { id: '68', name: 'Shamli', nameHindi: 'शामली' },
  { id: '69', name: 'Shravasti', nameHindi: 'श्रावस्ती' },
  { id: '70', name: 'Siddharthnagar', nameHindi: 'सिद्धार्थनगर' },
  { id: '71', name: 'Sitapur', nameHindi: 'सीतापुर' },
  { id: '72', name: 'Sonbhadra', nameHindi: 'सोनभद्र' },
  { id: '73', name: 'Sultanpur', nameHindi: 'सुल्तानपुर' },
  { id: '74', name: 'Unnao', nameHindi: 'उन्नाव' },
  { id: '75', name: 'Varanasi', nameHindi: 'वाराणसी' }
];

// Get all districts
router.get('/', async (req, res) => {
  try {
    // Check if districts exist in DB, otherwise return static list
    const districtsInDB = await District.find();
    if (districtsInDB.length > 0) {
      return res.json(districtsInDB);
    }
    res.json(upDistricts);
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.json(upDistricts);
  }
});

module.exports = router;