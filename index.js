const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const rutas_natgas = require('./routes/natgas.routes');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.use('/natgas', rutas_natgas);

//Middleware
app.use((request, response, next) => {
    console.log('Test Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

app.use((request, response, next) => {
    console.log('Test2 middleware!');
    response.send('Next and previous worked!');
});

app.listen(3000);