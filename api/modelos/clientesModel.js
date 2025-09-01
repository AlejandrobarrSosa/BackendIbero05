const mongoose = require("mongoose")
var Schema = mongoose.Schema

var clientesModel = {}

var clientesSchema = new Schema({
 
        codigo:String, 
        nombre:String

})

const Mymodel = mongoose.model("clientes", clientesSchema)



clientesModel.ExisteCodigo = function(post, callback){
    Mymodel.find({codigo:post.codigo},{}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    })
}

clientesModel.ExisteId = function(post, callback){
    Mymodel.find({_id:post._id},{}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    })
}

clientesModel.Guardar = function(post, callback){
    
    const instancia = new Mymodel
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre
    instancia.save().then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
    
}

clientesModel.CargarTodas = function(post, callback){
    Mymodel.find({},{}).then((respuesta) => {
        return callback(respuesta)
    })    
}

clientesModel.CargarId = function(post, callback){
   Mymodel.find({_id:post._id},{}).then((respuesta) => {
        return callback(respuesta)
    })  

}

clientesModel.Actualizar = function(post, callback){
    Mymodel.findOneAndUpdate({_id:post._id},{nombre:post.nombre}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

clientesModel.Eliminar = function(post, callback){
        Mymodel.findOneAndDelete({_id:post._id}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}



module.exports.clientesModel = clientesModel