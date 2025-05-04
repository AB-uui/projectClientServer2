const express = require('express');
const router = express.Router();
const { register, verifyRegister, resendActivationCode, login, forgotPassword, resetPassword, logout } = require('../controllers/authController');
// post /api/auth/register - רישום משתמש חדש
router.post('/register', register);
router.post('/verify-register', verifyRegister);
router.post('/resend-activation-code', resendActivationCode);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

module.exports = router;
