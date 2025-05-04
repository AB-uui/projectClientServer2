const User = require('../models/User');
const Provider = require('../models/Provider');
const Client = require('../models/Client');
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).populate('roleRef').lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { email, phone, currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (currentPassword && newPassword) {
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect current password' });
    user.password = await bcrypt.hash(newPassword, 10);
  }

  if (email) user.email = email;
  if (phone) user.phone = phone;

  await user.save();
  res.json({ message: 'Profile updated' });
};

exports.requestProvider = async (req, res) => {
  try {
    const {
      name, logoUrl, toolUrl, openSourceUrl, serviceType,
      freeToolLink, networkLocationDetails,
      paymentDetails, paypalAccount,
      discountPercentage, description, category, notes, signature
    } = req.body;

    const provider = await Provider.create({
      name, logoUrl, toolUrl, openSourceUrl, serviceType,
      freeToolLink, networkLocationDetails,
      paymentDetails, paypalAccount,
      discountPercentage, description, category, notes, signature,
      approvalStatus: 'pending'
    });

    const user = await User.findById(req.user.id);
    user.role = 'provider';
    user.roleRef = provider._id;
    user.roleRefModel = 'Provider';
    await user.save();

    res.status(201).json({ message: 'Provider request submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting provider request' });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find().populate('roleRef').lean();
  res.json(users);
};

exports.toggleUserActive = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.active = !user.active;
  await user.save();
  res.json({ message: `User ${user.active ? 'activated' : 'deactivated'}` });
};

exports.getAllProviderRequests = async (req, res) => {
  const providers = await Provider.find({ approvalStatus: 'pending' });
  res.json(providers);
};

exports.updateProviderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'
  const provider = await Provider.findById(id);
  if (!provider) return res.status(404).json({ message: 'Provider request not found' });
  provider.approvalStatus = status;
  await provider.save();
  res.json({ message: `Provider ${status}` });
};
