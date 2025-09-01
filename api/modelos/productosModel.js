const mongoose = require("mongoose")
var Schema = mongoose.Schema

var productosModel = {}

var productosSchema = new Schema({
 
        codigo:String, 
        nombre:String,
        imagen:String,
        cantidad:Number,
        precio:Number,
        descripcion:String,
        estado:String,
        datos_tecnicos:String,
        

})

const Mymodel = mongoose.model("productos", productosSchema)



productosModel.ExisteCodigo = function(post, callback){
    Mymodel.find({codigo:post.codigo},{}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    })
}

productosModel.ExisteId = function(post, callback){
    Mymodel.find({_id:post._id},{}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    })
}

productosModel.Guardar = function(post, callback){
    
    const instancia = new Mymodel
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre
    instancia.imagen = post.imagen
    instancia.cantidad = parseInt(post.cantidad)
    instancia.precio = parseInt(post.precio)
    instancia.descripcion = post.descripcion
    instancia.estado = post.estado
    instancia.datos_tecnicos = post.datos_tecnicos
    
    instancia.save().then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
    
}

productosModel.CargarTodas = function(post, callback){
    Mymodel.find({},{}).then((respuesta) => {
        return callback(respuesta)
    })    
}

productosModel.CargarId = function(post, callback){
   Mymodel.find({_id:post._id},{}).then((respuesta) => {
        return callback(respuesta)
    })  

}

productosModel.Actualizar = function(post, callback){
    Mymodel.findOneAndUpdate({_id:post._id},
        {
            nombre:post.nombre,
            imagen:post.imagen,
            cantidad:parseInt(post.cantidad),
            precio:parseInt(post.precio),
            descripcion:post.descripcion,
            estado:post.estado,
            datos_tecnicos:post.datos_tecnicos
        
        }

    ).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

productosModel.Eliminar = function(post, callback){
        Mymodel.findOneAndDelete({_id:post._id}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}


//==========Solo para que cliente visualice los productos=======//
productosModel.CargarTodasCliente = function(post, callback){
    Mymodel.find({estado:'Activo'},{}).then((respuesta) => {
        return callback(respuesta)
    })    
}

module.exports.productosModel = productosModel