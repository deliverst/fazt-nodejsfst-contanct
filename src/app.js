const express = require('express')
const morgan = require('morgan')
const path = require('path');
const exphbs = require('express-handlebars')

const app = express()


// CONFIGURACIÓN VISTAS
// con este establecemos la carpeta de donde van a estar las vistas qye regresaremos al cliente
app.set('views', path.join(__dirname, 'views'))

// Que modelo de plantilla vamos a estar utulizando en este caso .hsb y llamando a la funcion exphbs y una propiedad engine
app.engine('.hbs', exphbs.create({
//Interface comun como footer y header y defalut layaout es main
    defaultLayout: 'main',
    extensions: 'hbs',
}).engine)

app.set('view engine', '.hbs')



// El path para unir direcciones
app.use(morgan('dev'))
//Estas lineas lo que hacen es que cuando se envia un dato POST un request boddy, y va a poder entenderlo y con un peticion HTTP
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(require('./routers/index'))

//Hacer una carpeta en una carpeta hacerla publica, y el navegador podra solicitar cualqueir archivo
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app