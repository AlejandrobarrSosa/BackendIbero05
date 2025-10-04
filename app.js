var express = require("express")
const app = express()
var bodyParser = require("body-parser")
const mongoose = require("mongoose")
global.config = require("./config.js").config
global.sha256 = require("sha256")
global.nodemailer = require("nodemailer")
const cors = require("cors")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const path = require('path');
var dirname = path.dirname(__filename);
// global.multer = require("multer")
// global.PDFDocument = require("pdfkit")
// global.fs = require("fs")
// global.json2xls = require("json2xls")
global.path = require("path")
global.appRoot = path.resolve(__dirname)



app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (config.listablanca.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Opcional: responder a preflight directamente
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});


require("./rutas.js")(app);

mongoose.connect("mongodb://" + config.bdUser + ":" + config.bdPass + "@" + config.bdIp + ":" + config.bdPort + "/" + config.bd + "?authSource=admin&directConnection=true").then((respuesta) => {
    console.log("Conexion correcta a Mongo")
}).catch((error) => {
    console.log(error)
})


app.use(cors({
    origin: function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
        if(config.listablanca.indexOf(origin) === -1){
            return callback("Error de Cors No hay permisos",false)
        }
        else{
           return callback(null, true) 
        }
    }
}))



// -------------------- MIDDLEWARES -------------------- //

// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS manual
app.use((req, res, next) => {
  const origin = req.headers.origin

  if (config.listablanca.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
    res.setHeader("Access-Control-Allow-Credentials", "true")
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  if (req.method === "OPTIONS") {
    return res.sendStatus(204)
  }

  next()
})

var conexion = "mongodb://" + config.bdIp + ":" + config.bdPort +  "/" + config.bd

if(config.produccion == true){
  conexion = "mongodb://" + config.bdUser + ":" + config.bdPass + '@' + config.bdIp + ":" + config.bdPort +  "/" + config.bd
}



  //conexión, iniciar la sesión
  app.use(session({
    secret: config.clavesecreta,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      // client: mongoose.connection.getClient(),
      mongoUrl: conexion + "Sesiones?authSource=admin&directConnection=true",
      dbName: config.bd + "Sesiones?authSource=admin&directConnection=true",
      collectionName: "Sessions",
      ttl: config.expiracion,
      // mongoOptions: {
      // authSource: config.bd 
      // }
    }),
    cookie: {
      maxAge: config.expiracion, httpOnly: true
    },
    name: "Cookieapp",
    rolling: true
  }))


app.use('/', express.static(path.join(__dirname, 'dist/frontend/browser')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(dirname, 'dist/frontend/browser/index.html'));
});


  // -------------------- PARA LEVANTAR EL SERVIDOR -------------------- //
  app.listen(config.puerto, function () {
    console.log("Servidor Funcionando por el puerto " + config.puerto)
  })

