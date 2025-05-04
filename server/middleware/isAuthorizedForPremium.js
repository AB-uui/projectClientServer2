const User = require('../models/User');
const Client = require('../models/Client');

const isAuthorizedForPremium = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('roleRef');
    if (!user || user.role !== 'client') {
      return res.status(403).json({ message: 'Premium access required' });
    }

    const client = user.roleRef;
    if (!client || client.clientType === 'free') {
      return res.status(403).json({ message: 'Upgrade required' });
    }

    const now = new Date();
    if (client.subscriptionEndDate && new Date(client.subscriptionEndDate) < now) {
      return res.status(403).json({ message: 'Subscription expired' });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error checking subscription' });
  }
};

module.exports = isAuthorizedForPremium;