const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const { purchaseSubscription } = require('../controllers/subscriptionController');

router.use(verifyJWT);

router.post('/purchase', purchaseSubscription); // לרכישת מנוי חדש / שדרוג

module.exports = router;
