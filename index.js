var express = require('express');
var renderEngine = require('express-handlebars');
var app = express();

const fs = require('fs');

app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.engine('handlebars', renderEngine());

var contador = {
    home: 0,
    tienda: 0,
    checkout: 0,
};

var contexto = {
    layout: false,
};

function archivoEscrito() {
    console.log('el archivo se creo');

    //esribir el archivo
    //fs.writeFile('message.txt', 'visitas_home: ' + contador.home, 'utf8', archivoEscrito);
    fs.writeFileSync('visitas.txt', 'visitas_home: ' + contador.home + '\nvisitas_tienda: ' + contador.tienda + '\nvisitas_checkout: ' + contador.checkout + '', 'utf8');

    //leer archivo
    fs.readFile('visitas.txt', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
    });
}

app.get('/', function (req, response) {
    contador.home++;
    archivoEscrito();

    response.render('home', contexto);
});

app.get('/tienda', function (req, response) {
    contador.tienda++;
    archivoEscrito();

    response.render('tienda', contexto);
});

app.get('/checkout', function (req, response) {
    contador.checkout++;
    archivoEscrito();

    response.render('checkout', contexto);
});

app.listen(3000, function () {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});