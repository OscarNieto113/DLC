const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//const bootstrap = require('bootstrap');
//const bootstrap_icons = require('bootstrap-icons');
const rutas_dlc = require('./routes/dlc.routes');
const rutas_users = require('./routes/user.routes');
const csrf = require('csurf');
const csrfProtection = csrf();

const { auth } = require('express-openid-connect');
require('dotenv').config();

//auth0 config
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER
  };


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

/* csrf protection through token
 app.use(csrfProtection);
 app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});
*/

//ruta url
app.use('/dlc', rutas_dlc);
app.use('/users', rutas_users);

//Middleware

//auth0
app.use(auth(config));
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });


app.listen(3000);
