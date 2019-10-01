const io = require('../socket');

exports.renderIndex = (req, res) => {
    res.render('admin/index',{
        'title':'Index'
    });
}

exports.renderAddUser = (req, res) => {
    res.render('admin/user/add-user',{
        'title':'New User',
        'breadcumbs': [{'name':'Home','url':'/admin','class':''},{'name':'User','url':'#','class':''},{'name':'Add','url':'#','class':'active'}],
    });
}

exports.renderManageUser = (req, res) => {
    res.render('admin/user/manage-user',{
        'title':'Manage User',
        'breadcumbs': [{'name':'Home','url':'/admin','class':''},{'name':'User','url':'#','class':''},{'name':'Manage','url':'#','class':'active'}]
    });
}