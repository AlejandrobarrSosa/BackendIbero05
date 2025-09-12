const mongoose = require("mongoose")
var Schema = mongoose.Schema

var usuariosModel = {}

var usuariosSchema = new Schema({
 
        nombre:String, 
        email:String,
        password:String,
        estado:String,
        codigoact:String,
        codigorec:String,
        rol:String,
        profile_picture:String
})

const Mymodel = mongoose.model("usuarios", usuariosSchema)




usuariosModel.ExisteCorreo =  function(post, callback){

    Mymodel.find({email:post.email},{}).then((respuesta) => {
        return callback(respuesta)
    })
}


usuariosModel.ExisteId =  function(post, callback){

    Mymodel.find({_id:post._id},{}).then((respuesta) => {
        return callback(respuesta)
    })
}

usuariosModel.Guardar =       function(post, callback){
    const instancia = new Mymodel

    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password = post.password
    instancia.rol = post.rol  // Cliente - Administrador
    instancia.estado = 'Activo'


    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        // console.log(error)
        return callback({state:false})
    })

}

usuariosModel.CargarTodas =   function(post, callback){
    Mymodel.find({},{__v:0,password:0}).then((respuesta) => {
        return callback({datos:respuesta})
    })
    
}

usuariosModel.CargarId = function (post, callback) {
    Mymodel.find({_id:post._id}, { __v: 0, password: 0 }).then((respuesta) => {
        // console.log(respuesta)
        return callback({datos:respuesta})
    })

}
       
usuariosModel.Actualizar =    function(post, callback){
    
    Mymodel.findOneAndUpdate({_id:post._id},
        {
            nombre:post.nombre,
            rol:post.rol,
            estado:post.estado

        }).then((respuesta) => {
           return callback({state:true}) 
        }).catch((error) => {
            // console.log(error)
            return callback({state:false})
        })
    
}

usuariosModel.Eliminar =      function(post, callback){
    
    Mymodel.findOneAndDelete({_id:post._id}).then((respuesta) => {
           return callback({state:true}) 
        }).catch((error) => {
            // console.log(error)
            return callback({state:false})
        })

}

usuariosModel.ActualizarPass =    function(post, callback){
    Mymodel.findOneAndUpdate({_id:post._id},
        {
            password:post.password,
            
        }).then((respuesta) => {
           return callback({state:true}) 
        }).catch((error) => {
            // console.log(error)
            return callback({state:false})
        })
    
}

usuariosModel.ActualizarMisDatos =    function(post, callback){
    Mymodel.findOneAndUpdate({_id:post._id},
        {
            nombre:post.nombre,
        }).then((respuesta) => {
           return callback({state:true}) 
        }).catch((error) => {
            // console.log(error)
            return callback({state:false})
        })
    
}

usuariosModel.Registrar =     function(post, callback){
    const instancia = new Mymodel

    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password = post.password
    instancia.rol = "Cliente"  // Cliente - Administrador
    instancia.estado = 'Activo'
    instancia.codigoact = post.codigo
    

    
    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        // console.log(error)
        return callback({state:false})
    })

}

usuariosModel.SolicitudRecuperarPass = function(post, callback){
    Mymodel.findOneAndUpdate({email:post.email}, {codigorec: post.codigo}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        // console.log(error)
        return callback({state:false})
    })
}

usuariosModel.RecuperarPass = function(post, callback){
    Mymodel.findOneAndUpdate({email:post.email, codigorec:post.codigorec}, {password:post.password, codigorec:""}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        // console.log(error)
        return callback({state:false})
    })
}

usuariosModel.Activar =       function(post, callback){
    Mymodel.findOneAndUpdate({email:post.email, codigoact:post.codigo},
        {estado:"Activo"
        }).then((respuesta) => {
            return callback(respuesta)
        })
}

usuariosModel.Login =         function(post, callback){
    Mymodel.find({email:post.email,password:post.password}).then((respuesta) => {
        return callback(respuesta)
    })
}



usuariosModel.Mymodel = Mymodel 
module.exports.usuariosModel = usuariosModel