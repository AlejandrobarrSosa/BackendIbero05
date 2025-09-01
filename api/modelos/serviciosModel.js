const mongoose = require("mongoose")
var Schema = mongoose.Schema

var serviciosModel = {}

var serviciosSchema = new Schema({
 
        codigo:String, 
        nombre:String

})

const Mymodel = mongoose.model("servicios", serviciosSchema)



serviciosModel.ExisteCodigo = function(post, callback){
    Mymodel.find({codigo:post.codigo},{}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    })
}

serviciosModel.ExisteId = function(post, callback){
    Mymodel.find({_id:post._id},{}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    })
}

serviciosModel.Guardar = function(post, callback){
    
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

serviciosModel.CargarTodas = function(post, callback){
    Mymodel.find({},{}).then((respuesta) => {
        return callback(respuesta)
    })    
}

serviciosModel.CargarId = function(post, callback){
   Mymodel.find({_id:post._id},{}).then((respuesta) => {
        return callback(respuesta)
    })  

}

serviciosModel.Actualizar = function(post, callback){
    Mymodel.findOneAndUpdate({_id:post._id},{nombre:post.nombre}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

serviciosModel.Eliminar = function(post, callback){
        Mymodel.findOneAndDelete({_id:post._id}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}



module.exports.serviciosModel = serviciosModel