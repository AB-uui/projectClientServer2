const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/', requestController.createRequest);
router.get('/', requestController.getAllRequests);
router.get('/untreated', requestController.getUntreatedRequests);
router.put('/:id', requestController.updateTreated);
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
