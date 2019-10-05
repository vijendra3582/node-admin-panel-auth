const io = require('../socket');

exports.renderIndex = (req, res) => {
    res.send('Hi user');
}

exports.render404 = (req, res) => {
    res.render('pages/404', {
        'title': '404 Not Found'
    });
}