const { getData, updateData } = require('../controllers/dataController');

const router = require('express').Router();

router.get('/data', getData);
router.put('/data/:id', updateData);

module.exports = router;