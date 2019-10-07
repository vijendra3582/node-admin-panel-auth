//Imports
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const { Validator } = require('node-input-validator');

//Set variable Nicknames
var some = new Validator;
some.niceNames({
    confirm_password: 'Confirm Password'
});

//Render Function
exports.renderLogin = (req, res, next) => {
    const errorMsg = req.flash('error');

    res.render('auth/login', {
        'title': 'Login to your account',
        'oldInput': req.oldInput,
        'error': errorMsg
    });
};

exports.renderForgotPassword = (req, res, next) => {
    const errorMsg = req.flash('error');
    res.render('auth/forgot-password', {
        'title': 'Forgot Password',
        'oldInput': req.oldInput,
        'error': errorMsg
    });
};

exports.renderResetPassword = (req, res, next) => {
    const errorMsg = req.flash('error');
    res.render('auth/reset-password', {
        'title': 'Reset Password',
        'oldInput': req.oldInput,
        'error': errorMsg
    });
};

exports.renderRegister = (req, res, next) => {
    const errorMsg = req.flash('error');
    res.render('auth/register', {
        'title': 'Create an account',
        'oldInput': req.oldInput,
        'error': errorMsg
    });
};

//Post Function
exports.postLogin = (req, res, next) => {
    const errorMsg = req.flash('error');
    //Validation
    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required'
    });

    v.check().then((matched) => {
        if (!matched) {
            req.flash('error', v.errors);
            res.redirect('/auth/login');
        }
    });

    //Prepare Variable
    const email = req.body.email;
    const password = req.body.password;
    //Check email
    User.findOne({ email: email }).then((isMatchedEmail) => {
        if (!isMatchedEmail) {
            req.flash('error', { email: { message: 'This email id is not registered with us.' } });
            res.redirect('/auth/login');
        }
        //Hash password
        bcrypt.compare(password, isMatchedEmail.password).then((isMatchedPassword) => {
            //Check if password matched
            if (isMatchedPassword) {
                req.session.isLoggedIn = true;
                req.session.user = isMatchedPassword;
                req.session.save(() => {
                    res.redirect('/admin');
                });
            } else {
                req.flash('error', { password: { message: 'This password is incorrect.' } });
                res.redirect('/auth/login');
            }
        }).catch((err) => {
            //Bcrypt catch
            res.redirect('/auth/login');
        });
    }).catch((err) => {
        //Unique email catch
        res.redirect('/auth/login');
    });
};

exports.postForgotPassword = (req, res, next) => {
    const errorMsg = req.flash('error');
    const v = new Validator(req.body, {
        email: 'required|email',
    });

    v.check().then((matched) => {
        if (!matched) {
            req.flash('error', v.errors);
            res.redirect('/auth/forgot-password');
        }
    });
};

exports.postResetPassword = (req, res, next) => {
    const errorMsg = req.flash('error');
    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required|minLength:8|same:confirm_password'
    });

    v.check().then((matched) => {
        if (!matched) {
            req.flash('error', v.errors);
            res.redirect('/auth/reset-password');
        }
    });
};

exports.postRegister = (req, res, next) => {
    const errorMsg = req.flash('error');

    //Validation
    const v = new Validator(req.body, {
        username: 'required|minLength:2|regex:[a-zA-Z0-9-_]',
        name: 'required|string|minLength:2',
        email: 'required|email',
        password: 'required|minLength:8|same:confirm_password'
    });

    v.check().then((matched) => {
        if (!matched) {
            req.flash('error', v.errors);
            res.redirect('/auth/register');
        }

        //Set variables
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const username = req.body.username;
        //Check username
        User.findOne({ username: username }).then((isMatchedUsername) => {
            if (isMatchedUsername) {
                req.flash('error', { username: { message: 'This username is already registered with us.' } });
                res.redirect('/auth/register');
            }
            //Check email
            User.findOne({ email: email }).then((isMatchedEmail) => {
                if (isMatchedEmail) {
                    req.flash('error', { email: { message: 'This email id is already registered with us.' } });
                    res.redirect('/auth/register');
                }
                //Hash password
                bcrypt.hash(password, 12).then((passwordHashed) => {
                    const user = new User({
                        name: name,
                        username: username,
                        password: passwordHashed,
                        email: email
                    });
                    //Save user
                    user.save().then(() => {
                        res.redirect('/auth/login');
                    }).catch((err) => {
                        //User save catch
                        res.redirect('/auth/register');
                    });
                }).catch((err) => {
                    //Bcrypt catch
                    res.redirect('/auth/register');
                });
            }).catch((err) => {
                //Unique email catch
                res.redirect('/auth/register');
            });
        }).catch((err) => {
            //Unique username catch
            res.redirect('/auth/register');
        });
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err=>{
        res.redirect('/auth/login');
    });
};