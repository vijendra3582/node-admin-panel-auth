//Import Libraries
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Mongoose = require('mongoose');
const MongoDbStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

//Import Models
const User = require('./models/role');

//Import Routes
const adminRoutes  = require('./routes/admin');
const userRoutes  = require('./routes/user');
const authRoutes  = require('./routes/auth');

const app = express();

//Create Store For Session
const store = new MongoDBStore({
    uri: 'mongodb+srv://exam:exam@exam-ens1o.mongodb.net/admin?retryWrites=true&w=majority',
    collection: 'sessions'
});

//Parse Form Packet of data
app.use(bodyParser.urlencoded({ extended: true }));

//Parse json packet data
app.use(bodyParser.json());

//Set public folder
app.use(express.static('public'));

//Config Session
app.use(session({
    secret: 'abcdef',
    resave: false,
    saveUninitialized: false,
    store: store
}));

//Set flash
app.use(flash());

//Set template engine
app.set('view engine', 'ejs');

//Set views folder
app.set('views', 'views');

//Set Session
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id).then((user) => {
        req.user = user;
        next();
    })
});

//Check If User Authenticated
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.notifications = [];
    next();
})

//Route Middleware
app.use('/admin',adminRoutes);

//Connect with mongoDB
Mongoose.connect('mongodb+srv://exam:exam@exam-ens1o.mongodb.net/admin?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true }).then(() => {
    console.log('Database connected');
    const server = app.listen(3001, () => {
        console.log('Database connected');
    });

    const io = require('./socket').init(server);
    io.on('connection', (socket)=>{
        console.log('Socket connected');
    })

}).catch(() => {

});
