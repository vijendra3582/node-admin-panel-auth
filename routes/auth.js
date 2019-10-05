const express = require('express');
const router = express.Router();

const authController = require('./../controllers/auth');

//Get Routes
router.get('/login', authController.renderLogin);
router.get('/forgot-password', authController.renderForgotPassword);
router.get('/reset-password', authController.renderResetPassword);
router.get('/register', authController.renderRegister);

//Post Routes
router.post('/login', authController.postLogin);
router.post('/forgot-password', authController.postForgotPassword);
router.post('/reset-password', authController.postResetPassword);
router.post('/register', authController.postRegister);

module.exports = router;