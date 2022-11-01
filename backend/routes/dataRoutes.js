const { getData, updateData, deleteData } = require('../controllers/dataController');

const router = require('express').Router();

router.get('/data', getData);
router.put('/data/:id', updateData);
router.delete('/data/:id', deleteData);

module.exports = router;