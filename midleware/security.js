var security = {}


//midleware
security.SoloAdmin = function(request, response, next){
    
    console.log(request.originalurl)      // reportara informacion importante en consola
    console.log(request.session.rol)

    var rol = request.session.rol
    if(rol == undefined || rol == null || rol == ""){
        response.json({state:false, mensaje:"Debe Iniciar Sesion"})
        return false
    }
    else{
        if(rol == "Administrador"){
           next() 
        }
        else{
            response.json({state:false, mensaje:"Zona Privada. Usted no es Administrador"})
            return false
        }
    }


}



module.exports.security = security