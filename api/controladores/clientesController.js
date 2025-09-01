var clientesModel = require("../modelos/clientesModel.js").clientesModel

var clientesController = {}


clientesController.Guardar = function(request, response){
    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre
    }
    if(post.codigo == undefined || post.codigo == null || post.codigo.trim() == ""){
        response.json({state:false, mensaje:"El campo codigo es Obligatorio" })
        return false
    }

        if(post.nombre == undefined || post.nombre == null || post.nombre.trim() == ""){
        response.json({state:false, mensaje:"El campo nombre es Obligatorio"})
        return false
    }

    clientesModel.ExisteCodigo(post, function(Existe){
        if(Existe.length == 0){
            clientesModel.Guardar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"El elemento fue Almacenado Correctamente"})
                }
                else{
                    response.json({state:false, mensaje:"Se presento error al Guardar"})
                }

            })

        }
        else{
            response.json({state:false, mensaje:"El codigo del producto ya existe Intente con Otro"})
        }
    })
}

clientesController.CargarTodas = function(request, response){
    clientesModel.CargarTodas(null, function(respuesta){
        response.json(respuesta)
    })
}

clientesController.CargarId = function(request, response){
    var post = {
        _id:request.params._id
    }

        if(post._id == undefined || post._id == null || post._id.trim() == ""){
        response.json({state:false, mensaje:"El campo _id es Obligatorio" })
        return false
    }

    clientesModel.CargarId(post, function(respuesta){
        response.json(respuesta)
    })


}

clientesController.Actualizar = function(request, response){
    var post = {
        _id:request.body._id,
        nombre:request.body.nombre
        
    }

            if(post.nombre == undefined || post.nombre == null || post.nombre.trim() == ""){
        response.json({state:false, mensaje:"El campo nombre es Obligatorio" })
        return false
    }

        if(post._id == undefined || post._id == null || post._id.trim() == ""){
        response.json({state:false, mensaje:"El campo _id es Obligatorio" })
        return false
    }

    clientesModel.ExisteId(post, function(Existe){
        if(Existe.length == 0){
            response.json({state:false, mensaje:"El Id Que Desea Actualizar no Existe"})
        }
        else{
            clientesModel.Actualizar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Se ha Actualizado el Elemento"})
                }
                else{
                response.json({state:false, mensaje:"Se presento un error al Actualizar el Elemento"})
                }
            })
        }
    })
                
}
  
clientesController.Eliminar = function(request, response){
     var post = {
        _id:request.body._id,
       
    }

        if(post._id == undefined || post._id == null || post._id.trim() == ""){
        response.json({state:false, mensaje:"El campo _id es Obligatorio" })
        return false
    }

    clientesModel.ExisteId(post, function(Existe){
        if(Existe.length == 0){
            response.json({state:false, mensaje:"El Id Que Desea Eliminar no Existe"})
        }
        else{
            clientesModel.Eliminar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Se ha Eliminado el Elemento"})
                }
                else{
                response.json({state:false, mensaje:"Se presento un error al Eliminar el Elemento"})
                }
            })
        }
    })

}



module.exports.clientesController = clientesController