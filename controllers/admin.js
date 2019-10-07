const User = require('./../models/user');
const bcrypt = require('bcryptjs');

exports.renderIndex = (req, res) => {
    res.render('admin/index', {
        'title': 'Index'
    });
}

exports.renderAddUser = (req, res) => {
    const errorMsg = req.flash('error');
    res.render('admin/user/add-user', {
        'title': 'New User',
        'error': errorMsg,
        'breadcumbs': [{ 'name': 'Home', 'url': '/admin', 'class': '' }, { 'name': 'User', 'url': '#', 'class': '' }, { 'name': 'Add', 'url': '#', 'class': 'active' }],
    });
}

exports.postAddUser = (req, res, next) => {
    
    if(password != cpassword){
        req.flash('error', 'Password and confirm password should be same.');
        res.redirect('admin/add-user');  
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    bcrypt.hash(password, 12).then((hashPassword) => {
        const user = new User({
            name: name,
            password: hashPassword,
            username: username,
            email: email
        });
        user.save().then(() => {
            res.redirect('admin/add-user');
        }).catch(() => {
            req.flash('error', 'Error while registering this user to our database.');
            res.redirect('admin/add-user');
        });
    });

}

exports.renderManageUser = (req, res) => {
    res.render('admin/user/manage-user', {
        'title': 'Manage User',
        'breadcumbs': [{ 'name': 'Home', 'url': '/admin', 'class': '' }, { 'name': 'User', 'url': '#', 'class': '' }, { 'name': 'Manage', 'url': '#', 'class': 'active' }]
    });
}