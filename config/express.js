/**
 * Vytvořil Jaroslav Klimčík dne 26.3.2015.
 */
var config = require('./config'), // nastaveni pro ruzna prostredi
    http = require('http'),
    socketio = require('socket.io'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    passport = require('passport');

module.exports = function (db) {
    var app = express();
    var server = http.createServer(app);
    var io = socketio.listen(server); //socket.io server

    // nastaveni pro ruzna prostredi
    if (process.env.NODE_ENV === 'development') {
        //app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    // nastaveni mongoDB pro vyuzivani socket.io sessions
    var mongoStore = new MongoStore({
        db: db.connection.db
    });

    // nastaveni sessions
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));

    // nastaveni template enginu
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // connect-flash middleware
    app.use(flash());

    // passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // nastaveni cest
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/articles.server.routes.js')(app);
    require('../app/routes/messages.server.routes.js')(app);
    require('../app/routes/profil.server.routes.js')(app);
    require('../app/routes/sport.server.routes')(app);
    require('../app/routes/region.server.routes')(app);
    require('../app/routes/advert.server.routes')(app);
    require('../app/routes/friends.server.routes')(app);

    // obsluha statickych souboru
    app.use(express.static('./public'));

    require('./socketio')(server, io, mongoStore);

    return server;
};