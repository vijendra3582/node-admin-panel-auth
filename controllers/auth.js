//Imports
const User = require('./../models/user');
const bcrypt = require('bcryptjs');

//Render Function
exports.renderLogin = (req, res, next) => {
    // const errorMsg = req.flash('error');
    const errorMsg = '';
    res.render('auth/login', {
        'title': 'Login to your account',
        'error': errorMsg
    });
};

exports.renderForgotPassword = (req, res, next) => {
    // const errorMsg = req.flash('error');
    const errorMsg = '';
    res.render('auth/forgot-password', {
        'title': 'Forgot Password',
        'error': errorMsg
    });
};

exports.renderResetPassword = (req, res, next) => {
    // const errorMsg = req.flash('error');
    const errorMsg = '';
    res.render('auth/reset-password', {
        'title': 'Reset Password',
        'error': errorMsg
    });
};

exports.renderRegister = (req, res, next) => {
    // const errorMsg = req.flash('error');
    const errorMsg = '';
    res.render('auth/register', {
        'title': 'Create an account',
        'error': errorMsg
    });
};

//Post Function
exports.postLogin = (req, res, next) => {
    // const errorMsg = req.flash('error');
};

exports.postForgotPassword = (req, res, next) => {
    // const errorMsg = req.flash('error');
};

exports.postResetPassword = (req, res, next) => {
    // const errorMsg = req.flash('error');    
};

exports.postRegister = (req, res, next) => {
    // const errorMsg = req.flash('error');    
};