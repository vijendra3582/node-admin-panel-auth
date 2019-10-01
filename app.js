//Import Libraries
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Mongoose = require('mongoose');
const MongoDbStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');


//Import Routes
const adminRoutes  = require('./routes/admin');
const userRoutes  = require('./routes/user');
const authRoutes  = require('./routes/auth');

const app = express();

//Parse Form Packet of data
app.use(bodyParser.urlencoded({ extended: true }));

//Parse json packet data
app.use(bodyParser.json());

//Set public folder
app.use(express.static('public'));

//Set flash
app.use(flash());

//Set template engine
app.set('view engine', 'ejs');

//Set views folder
app.set('views', 'views');







app.use(userRoutes);



Mongoose.connect('mongodb+srv://rattu:lenskart@cluster0-xlej3.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true }).then(() => {
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
