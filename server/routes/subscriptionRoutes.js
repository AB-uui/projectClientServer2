const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const { purchaseSubscription } = require('../controllers/subscriptionController');

router.use(verifyJWT);

/**
 * @swagger
 * /api/subscription/purchase:
 *   post:
 *     summary: Purchase or upgrade a subscription
 *     description: Allows a user to purchase or upgrade their subscription. Requires authentication.
 *     responses:
 *       200:
 *         description: Subscription purchased or upgraded successfully.
 */
/**
 * @route POST /api/subscription/purchase
 * @description Purchase or upgrade a subscription. Requires authentication.
 */
router.post('/purchase', purchaseSubscription); // לרכישת מנוי חדש / שדרוג

module.exports = router;
