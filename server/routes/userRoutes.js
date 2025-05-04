const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const verifyRole = require('../middleware/verifyRole');
const {
  getProfile,
  updateProfile,
  requestProvider,
  getAllUsers,
  toggleUserActive,
  getAllProviderRequests,
  updateProviderStatus
} = require('../controllers/userController');

router.use(verifyJWT);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/provider-request', requestProvider);

// מנהל בלבד:
router.get('/all', verifyRole('admin'), getAllUsers);
router.patch('/:userId/toggle-active', verifyRole('admin'), toggleUserActive);
router.get('/provider-requests', verifyRole('admin'), getAllProviderRequests);
router.patch('/provider-request/:id/status', verifyRole('admin'), updateProviderStatus);

module.exports = router;
