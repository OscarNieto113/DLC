const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//const bootstrap = require('bootstrap');
//const bootstrap_icons = require('bootstrap-icons');
const rutas_dlc = require('./routes/dlc.routes');
const rutas_users = require('./routes/user.routes');
const csrf = require('csurf');
const csrfProtection = crsf();


const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'lakdsjalkdjalaksdjald',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

//ruta url
app.use('/dlc', rutas_dlc);
app.use('/users', rutas_users);

//Middleware


app.listen(3000);
