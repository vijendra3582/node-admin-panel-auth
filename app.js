//Import Libraries
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const Mongoose = require('mongoose');
const MongoDbStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const isAuth = require('./middlewares/is-auth');
const oldInput = require('old-input');
const varConfig = require('./config/db');

//Get port
const portNode     = process.env.PORT || 3001;

//Import Models
const User = require('./models/user');

//Import Routes
const adminRoutes  = require('./routes/admin');
const userRoutes  = require('./routes/user');
const authRoutes  = require('./routes/auth');

const app = express();

//Create Store For Session
const store = new MongoDbStore({
    uri: varConfig.storeURI,
    collection: 'sessions'
});

//Parse Form Packet of data
app.use(bodyParser.urlencoded({ extended: true }));

//Parse json packet data
app.use(bodyParser.json());

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Config Session
app.use(session({
    secret: varConfig.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: store
}));

//Old Input
app.use(oldInput);

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
});

//Route Middleware
app.use('/auth',authRoutes);
app.use('/admin',isAuth,adminRoutes);
app.use(userRoutes);

//Connect with mongoDB
Mongoose.connect(varConfig.mongooseURI,{ useNewUrlParser: true , useUnifiedTopology: true }).then(() => {
    console.log('Database connected');
    const server = app.listen(portNode, () => {
        console.log('Database connected');
    });

    const io = require('./socket').init(server);
    io.on('connection', (socket)=>{
        console.log('Socket connected');
    })

}).catch(() => {

});
