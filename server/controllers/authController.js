const User = require('../models/User');
const Client = require('../models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail'); // פונקציה לשליחת מייל עם קוד

let activationCodes = {}; // { email: { code, expiresAt } }

function generateActivationCode(email) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // פג תוקף אחרי 10 דקות
  activationCodes[email] = { code, expiresAt };
  return code;
}

// ניקוי קודים שפג תוקפם כל דקה
setInterval(() => {
  const now = Date.now();
  for (const email in activationCodes) {
    if (activationCodes[email].expiresAt < now) {
      delete activationCodes[email];
    }
  }
}, 60 * 1000); // כל דקה

exports.register = async (req, res) => {
  console.log(`27`);
  const { userName, email, password, phone } = req.body;
  if (!userName || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  console.log(`29`);
  const duplicate = await User.findOne({ $or: [{ userName }, { email }] }).lean();
  if (duplicate) return res.status(409).json({ message: 'Username or email already exists' });
  console.log(`32`); // Debugging line

  const code = generateActivationCode(email);
  await sendMail(email, 'Activation Code', `Your code is: ${code} (valid for 10 minutes)`);
console.log(`Activation code for ${email}: ${code}`); // Debugging line
  res.status(200).json({ message: 'Activation code sent to email' });
};

exports.resendActivationCode = async (req, res) => {
  const { email } = req.body;
  const entry = activationCodes[email];
  if (entry && Date.now() < entry.expiresAt) {
    return res.status(400).json({ message: 'An activation code is still valid. Please wait.' });
  }

  const code = generateActivationCode(email);
  await sendMail(email, 'Resent Activation Code', `Your new code is: ${code} (valid for 10 minutes)`);
  res.status(200).json({ message: 'New activation code sent to email' });
};

exports.verifyRegister = async (req, res) => {
  const { userName, email, password, phone, code } = req.body;
  const entry = activationCodes[email];

  if (!entry || entry.code !== code) {
    return res.status(400).json({ message: 'Invalid activation code' });
  }

  if (Date.now() > entry.expiresAt) {
    delete activationCodes[email];
    return res.status(400).json({ message: 'Activation code expired' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const client = await Client.create({ clientType: 'free' });
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
    phone,
    role: 'client',
    roleRef: client._id,
    roleRefModel: 'Client',
    active: true
  });

  delete activationCodes[email];

  res.status(201).json({ message: `User ${user.userName} registered successfully` });
};


exports.login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) return res.status(400).json({ message: 'Missing fields' });
  const user = await User.findOne({ userName }).lean();
  if (!user || !user.active) return res.status(401).json({ message: 'No authorized user found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Unauthorized' });//Invalid password
  const { password: _, _id, ...rest } = user;// Remove password from user object
  const userForToken = { id: _id, ...rest }; 
  const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });// Token expires in 1 day 
  const cookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // יום אחד
  };
  // בעת login
  res
    .cookie('jwt', token, cookieOptions)
    .json({ message: 'Logged in successfully' });
};

// פונקציית logout
exports.logout = (req, res) => {
  res.clearCookie('jwt', cookieOptions);
  res.json({ message: 'Logged out' });
};

exports.forgotPassword = async (req, res) => {
  const { userName, email } = req.body;
  if (!userName || !email) return res.status(400).json({ message: 'Missing fields' });
  const user = await User.findOne({ userName, email }).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });

  const code = generateActivationCode(email);
  await sendMail(email, 'Password Reset Code', `Your code is: ${code} (valid for 10 minutes)`);
  res.json({ message: 'Verification code sent to email' });
};

exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const entry = activationCodes[email];

  if (!entry || entry.code !== code) {
    return res.status(400).json({ message: 'Invalid activation code' });
  }
  if (Date.now() > entry.expiresAt) {
    delete activationCodes[email];
    return res.status(400).json({ message: 'Activation code expired' });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  delete activationCodes[email];
  res.json({ message: 'Password updated successfully' });
};

exports.getMe = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: 'No token' });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};