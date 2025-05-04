const User = require('../models/User');
const Client = require('../models/Client');

exports.purchaseSubscription = async (req, res) => {
  try {
    const { clientType, months } = req.body; // clientType: 'subscriber' or 'subscriber_plus'

    if (!['subscriber', 'subscriber_plus'].includes(clientType) || !months) {
      return res.status(400).json({ message: 'Invalid subscription data' });
    }

    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'client') {
      return res.status(400).json({ message: 'User is not a client' });
    }

    const client = await Client.findById(user.roleRef);
    const now = new Date();
    const additionalTime = months * 30 * 24 * 60 * 60 * 1000;
    const newEndDate = client.subscriptionEndDate && client.subscriptionEndDate > now
      ? new Date(client.subscriptionEndDate.getTime() + additionalTime)
      : new Date(now.getTime() + additionalTime);

    client.clientType = clientType;
    client.subscriptionEndDate = newEndDate;
    await client.save();
    res.json({ message: 'Subscription updated', clientType, subscriptionEndDate: newEndDate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Subscription update failed' });
  }
};
