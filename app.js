const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//const bootstrap = require('bootstrap');
//const bootstrap_icons = require('bootstrap-icons');
const rutas_dlc = require('./routes/dlc.routes');
const rutas_reporte_mensual = require('./routes/reporte_mensual.routes');
const rutas_users = require('./routes/user.routes');
const csrf = require('csurf');
const csrfProtection = csrf();

const flash = require('connect-flash');


const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
// NO BORRES UPLOADS PINCHE OSCAR XD
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'lakdsjalkdjalaksdjald',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use(csrfProtection);

app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});

//rutas url
app.use(flash());

app.use('/dlc', rutas_dlc);
app.use('/reporte_mensual', rutas_reporte_mensual);
app.use('/users', rutas_users);

//Middleware

app.listen(3000);
