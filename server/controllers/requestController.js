const Request = require('../models/Request');
const getPagination = require('../utils/pagination');

// Create new request
exports.createRequest = async (req, res) => {
  try {
    const { name, phone, email, question } = req.body;

    if (!name?.trim() || !phone?.trim() || !email?.trim() || !question?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const request = await Request.create({ name, phone, email, question });

    if (!request) {
        return res.status(400).send("Failed to create request");
    }

    res.status(201).json({ message: "Request created", requestID: request._id });
  } catch (err) {
    console.error('Error creating request:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const maxLimit = 12;
    const { limit, skip, page, totalPages, totalCount } = getPagination(req, Request, maxLimit);
    const requests = await Request.find().sort({ updatedAt: -1 }).skip(skip).limit(limit).lean();
    if (!requests.length) {
      return res.status(404).json({ message: 'No requests found' });
    }
    res.status(200).json({requests, page, totalPages, count: requests.length, totalCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get untreated requests
exports.getUntreatedRequests = async (req, res) => {
  try {
    const filter = { treated: false }; // רק בקשות שלא טופלו
    const maxLimit = 12;
    const { limit, skip, page, totalPages, totalCount } = getPagination(req, Request, filter, maxLimit);
    const untreated = await Request.find({ filter: false }).skip(skip).limit(limit).sort({ updatedAt: -1 }).lean();
    if (!untreated.length) {
      return res.status(404).json({ message: 'No untreated requests found' });
    }
    res.status(200).json({untreated, page, totalPages, count: untreated.length, totalCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update 'treated' field
exports.updateTreated = async (req, res) => {
  try {
    const { id } = req.params;
    const { treated } = req.body;

    const updated = await Request.findByIdAndUpdate(
      id,
      { treated },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Updated successfully", updatedID: updated._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete request
exports.deleteRequest = async (req, res) => {
  try {
    const deleted = await Request.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Request not found" });
    res.status(200).json({ message: `Request ${deleted._id} deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Auto delete untreated older than 7 days
exports.deleteOldUntreated = async () => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const result = await Request.deleteMany({
      treated: false,
      updatedAt: { $lt: oneWeekAgo }
    });
    if (result.deletedCount > 0) {
      console.log(`Deleted ${result.deletedCount} old untreated requests`);
    }
  } catch (err) {
    console.error('Error deleting old untreated requests:', err);
  }
};
