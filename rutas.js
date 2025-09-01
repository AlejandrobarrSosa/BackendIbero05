const { carouselController } = require("./api/controladores/carouselController.js")

var usuariosController = require("./api/controladores/usuariosController.js").usuariosController
var security = require("./midleware/security.js").security


//=====(solo admin)=====//
// guardar usuario
app.post("/usuarios/Guardar",security.SoloAdmin, function (request, response) {
    usuariosController.Guardar(request, response)
})

// cargar todas 
app.get("/usuarios/CargarTodas",security.SoloAdmin,  function (request, response) {
    usuariosController.CargarTodas(request, response)
    
})

// cargar por id
app.get("/usuarios/CargarId/:_id",security.SoloAdmin, function (request, response) {
    usuariosController.CargarId(request, response)
})

// actualizar usuario
app.put("/usuarios/Actualizar",security.SoloAdmin, function (request, response) {
    usuariosController.Actualizar(request, response)
})

// eliminar usuario
app.delete("/usuarios/Eliminar",security.SoloAdmin, function (request, response) {
    usuariosController.Eliminar(request, response)
})
//=====(solo admin)=====//






// registro
app.post("/usuarios/Registrar", function (request, response) {
    usuariosController.Registrar(request, response)
})
// login
app.post("/usuarios/Login", function (request, response) {
    usuariosController.Login(request, response)
})
//activar con GET y parámetros 
app.get("/usuarios/Activar/:email/:codigo", function (request, response) {
    usuariosController.Activar(request, response)
})
// solicitud recuperar pass
app.post("/usuarios/SolicitudRecuperarPass", function (request, response) {
    usuariosController.SolicitudRecuperarPass(request, response)
})
// recuperar pass
app.post("/usuarios/RecuperarPass", function (request, response) {
    usuariosController.RecuperarPass(request, response)
})
// estado de sesión
app.post("/usuarios/estado", function (request, response) {
    response.json(request.session)
})
// cerrar sesión
app.post("/usuarios/logout", function (request, response) {
    request.session.destroy()
    response.json({ state: true, mensaje: "Sesion Cerrada" })
})

app.post("/usuarios/ActualizarPass", function (request, response) {
    usuariosController.ActualizarPass(request, response)
})

app.post("/usuarios/MisDatos", function (request, response) {
    usuariosController.MisDatos(request, response)
})

app.post("/usuarios/ActualizarMisDatos", function (request, response) {
    usuariosController.ActualizarMisDatos(request, response)
})


//========activar cuenta============//
app.post("/usuarios/Activar", function (request, response) {
    usuariosController.Activar(request, response)
})





var productosController = require("./api/controladores/productosController.js").productosController

app.post("/productos/Guardar",security.SoloAdmin, function (request, response) {
    productosController.Guardar(request, response)
})

app.get("/productos/CargarTodas", security.SoloAdmin, function (request, response) {
    productosController.CargarTodas(request, response)    
})

app.get("/productos/CargarId/:_id", function (request, response) {
    productosController.CargarId(request, response)
})

app.put("/productos/Actualizar",security.SoloAdmin, function (request, response) {
    productosController.Actualizar(request, response)
})

app.delete("/productos/Eliminar",security.SoloAdmin, function (request, response) {
    productosController.Eliminar(request, response)
})

//==========Solo para que cliente visualice los productos=======//
app.get("/productos/CargarTodasCliente",  function (request, response) {
    productosController.CargarTodas(request, response)    
})




var serviciosController = require("./api/controladores/serviciosController.js").serviciosController

app.post("/servicios/Guardar", function (request, response) {
    serviciosController.Guardar(request, response)
})

app.get("/servicios/CargarTodas",  function (request, response) {
    serviciosController.CargarTodas(request, response)    
})

app.get("/servicios/CargarId/:_id", function (request, response) {
    serviciosController.CargarId(request, response)
})

app.put("/servicios/Actualizar", function (request, response) {
    serviciosController.Actualizar(request, response)
})

app.delete("/servicios/Eliminar", function (request, response) {
    serviciosController.Eliminar(request, response)
})





var clientesController = require("./api/controladores/clientesController.js").clientesController

app.post("/clientes/Guardar", function (request, response) {
    clientesController.Guardar(request, response)
})

app.get("/clientes/CargarTodas",  function (request, response) {
    clientesController.CargarTodas(request, response)    
})

app.get("/clientes/CargarId/:_id", function (request, response) {
    clientesController.CargarId(request, response)
})

app.put("/clientes/Actualizar", function (request, response) {
    clientesController.Actualizar(request, response)
})

app.delete("/clientes/Eliminar", function (request, response) {
    clientesController.Eliminar(request, response)
})


//=========Carousel============//
app.get("/carousel/CargarCarousel", function (request, response) {
    carouselController.CargarCarousel(request, response)
})
app.post("/carousel/Guardar", function (request, response) {
    carouselController.Guardar(request, response)
})
app.get("/carousel/CargarTodas", function (request, response) {
    carouselController.CargarTodas(request, response)
})
app.get("/carousel/CargarId/:_id", function (request, response) {
    carouselController.CargarId(request, response)
})
app.put("/carousel/Actualizar", function (request, response) {
    carouselController.Actualizar(request, response)
})
app.delete("/carousel/Eliminar", function (request, response) {
    carouselController.Eliminar(request, response)
})