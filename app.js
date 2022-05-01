const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const memoryStore = require('memorystore')(session);
const multer = require('multer');
const rutas_dlc = require('./routes/dlc.routes');
const rutas_reporte_mensual = require('./routes/reporte_mensual.routes');
const rutas_users = require('./routes/user.routes');
const uploadImage = require('./helpers/helpers');
const csrf = require('csurf');
const csrfProtection = csrf();
const flash = require('connect-flash');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Prueba


//app.use(multer({ storage: multer.memoryStorage() }).single('imagen_noticia'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(session({
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
    store: new memoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: 'lakdsjalkdjalaksdjald',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió
}));

app.use(csrfProtection);

app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});


app.use(flash());

app.use('/dlc', rutas_dlc);
app.use('/reporte_mensual', rutas_reporte_mensual);
app.use('/users', rutas_users);

//Middleware
//app.listen(3000);

//PORT gcloud
//module.exports = app;
app.listen(8080);

//const PORT = process.env.PORT || 8080;
//app.listen(PORT, _ =>{
//  console.log('OwO ${PORT}');
//});
