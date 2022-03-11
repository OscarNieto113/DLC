const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rutas_natgas = require('./routes/natgas.routes');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/natgas', rutas_natgas);

//Middleware
app.use((request, response, next) => {
    console.log('Refresh');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

app.listen(3000);
