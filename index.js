var express = require('express');
var renderEngine = require('express-handlebars');
var app = express();

const fs = require('fs');

app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.engine('handlebars', renderEngine());

var fecha = new Date();

var contador = {
    home: 0,
    splash: 0,
    campeon: 0,
};




function archivoEscrito() {

    fs.writeFileSync('visitas.txt', 'Visitas del home: ' + contador.home+'\nVisitas de Historia del Campeon: ' + contador.campeon+'\nVisitas de los Splash art: ' + contador.splash+',' + ' Fecha/hora: ' + fecha +'', 'utf8');

    //leer archivo
    fs.readFile('visitas.txt', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
    });
}

app.get('/', function (req, response) {
    contador.home++;
    archivoEscrito();
    var contexto = {
        layout: false,
        splash: contador.splash,
        home: contador.home,
        campeon: contador.campeon
    };
    
    response.render('home', contexto);
});

app.get('/splash', function (req, response) {
    contador.splash++;
    archivoEscrito();
    var contexto = {
        layout: false,
        splash: contador.splash,
        home: contador.home,
        campeon: contador.campeon
    };
    
    response.render('splash', contexto);
});

app.get('/campeon', function (req, response) {
    contador.campeon++;
    archivoEscrito();
    var contexto = {
        layout: false,
        splash: contador.splash,
        home: contador.home,
        campeon: contador.campeon
    };
    
    response.render('campeon', contexto);
});

app.get('/admin', function (req, response) {
    var contexto = {
        layout: false,
        splash: contador.splash,
        home: contador.home,
        campeon: contador.campeon
    };
    
    response.render('admin', contexto);
});

app.listen(3000, function () {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});