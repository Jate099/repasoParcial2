
/*
=========================================================================================================

    Programación Web:   2019-2

    Realizado por:      Javier Trochez
                        Nathan Manuel

=========================================================================================================
*/

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

function archivoEscrito(texto, numeroPag) {
    var antiguo = '';
    var visita = 0;
    if (numeroPag == 0) {
        visita = contador.home;
    } else if (numeroPag == 1) {
        visita = contador.splash;
    } else if (numeroPag == 2) {
        visita = contador.campeon;
    }
    //leer archivo
    fs.readFile('visitas.txt', 'utf8', function (err, data) {
        if (err) throw err;
        console.log('Data:' + data);
        antiguo = data.toString();
        console.log('antiguo: ' + antiguo);

        //escritura del archivo
        fs.writeFileSync('visitas.txt', antiguo + '\n' + texto + visita + ' - Fecha/hora: ' + fecha + '', 'utf8');
    });

}

//entrada a pagina home
app.get('/', function (req, response) {
    contador.home++;
    var texto = 'Visita a Home Numero: '
    archivoEscrito(texto, 0);
    var contexto = {
        layout: false,
        splash: contador.splash,
        home: contador.home,
        campeon: contador.campeon
    };

    response.render('home', contexto);
});
//entrada a pagina Splash arts
app.get('/splash', function (req, response) {
    contador.splash++;
    var texto = 'Visita a Splash-Arts Numero: '
    archivoEscrito(texto, 1);
    var contexto = {
        layout: false,
        splash: contador.splash,
        home: contador.home,
        campeon: contador.campeon
    };

    response.render('splash', contexto);
});

//entrada a pagina Campeon
app.get('/campeon', function (req, response) {
    contador.campeon++;
    var texto = 'Visita a Campeon Numero: ';
    archivoEscrito(texto, 2);
    var contexto = {
        layout: false,
        splash: contador.splash,
        home: contador.home,
        campeon: contador.campeon
    };
    response.render('campeon', contexto);
});

//entrada a pagina Admin
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