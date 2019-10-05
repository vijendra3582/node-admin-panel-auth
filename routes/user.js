const express = require('express');
const homeController = require('./../controllers/home');


const router = express.Router();

router.get('/', homeController.renderIndex);

router.get('*',homeController.render404);

module.exports = router;