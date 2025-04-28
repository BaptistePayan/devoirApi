require('dotenv').config({ path: './env/.env' }); // variables d'environnement

const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session); // Utiliser MongoDB comme store de session
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catwaysRouter = require('./routes/catways');  
const reservationsRouter = require('./routes/reservations');  
const loginFormRouter = require('./routes/loginFormRoute'); 

const mongodb = require('./db/mongo');

// connexion à MongoDB
mongodb.initClientDbConnection();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
//moteur ejs

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuration du store MongoDB pour les sessions
const store = new MongoDBStore({
    uri: process.env.URL_MONGO, // URL de connexion à MongoDB
    collection: 'sessions' // Collection pour stocker les sessions
});

store.on('error', function(error) {
    console.error("Erreur avec MongoDBStore :", error);
});


app.use(methodOverride('_method')); // '_method' correspond au nom du champ caché dans le formulaire

// Middleware 
app.use(session({
    secret: process.env.SECRET_KEY || 'clé_secrète', 
    resave: false,  
    saveUninitialized: false,  
    store: store, 
    cookie: {
        httpOnly: true,  
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 1000  //durée d'1 heure pour le cookie
    }
}));

// Middleware
app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catways', catwaysRouter);  
app.use('/reservations', reservationsRouter);  
app.use('/login', loginFormRouter);

//gestion des erreurs
app.use(function(req, res, next) {
    res.status(404).json({name: 'API', version: "1.0", status: 404, message: 'Not Found'});
});


module.exports = app;
