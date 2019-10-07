const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/admin');

router.get('/', adminController.renderIndex);
router.get('/add-user', adminController.renderAddUser);
router.get('/manage-user', adminController.renderManageUser);

module.exports = router;