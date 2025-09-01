const mongoose = require("mongoose");
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel;

var usuariosController = {};

//Para crear un CRUD Administrador
// ================= GUARDAR =================
usuariosController.Guardar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password,
    rol: request.body.rol,
  };

  // Validaciones
  if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response
      .status(200)
      .json({ state: false, mensaje: "el campo nombre es obligatorio" });
    return false;
  }

  if (post.email == undefined || post.email == null || post.email == "") {
    response
      .status(200)
      .json({ state: false, mensaje: "el campo email es obligatorio" });
    return false;
  }

  if (
    post.password == undefined ||
    post.password == null ||
    post.password == ""
  ) {
    response
      .status(200)
      .json({ state: false, mensaje: "el campo password es obligatorio" });
    return false;
  }

  if (post.rol == undefined || post.rol == null || post.rol == "") {
    response
      .status(200)
      .json({ state: false, mensaje: "el campo rol es obligatorio" });
    return false;
  }

  // Encriptar
  post.password = sha256(post.password + config.clavesecreta);

  // Validar si ya existe correo
  usuariosModel.ExisteCorreo(post, function (existe) {
    if (existe.length == 0) {
      //===========Guardamos===========//
      usuariosModel.Guardar(post, function (respuesta) {
        if (respuesta.state == true) {
          response.json({ state: true, mensaje: "Item almacenado", data: [] });
        } else {
          response.json({ state: false, mensaje: "Error al Guardar" });
        }
      });
    } else {
      response.json({
        state: false,
        mensaje: "El Email ya Existe Intente con otro",
      });
    }
  });
};
// ================= CARGAR TODAS =================
usuariosController.CargarTodas = function (request, response) {
  usuariosModel.CargarTodas({}, function (respuesta) {
    response.json({ state: true, datos: respuesta });
  });
};
// ================= CARGAR POR ID =================
usuariosController.CargarId = function (request, response) {
  var post = {
    _id: request.params._id, // recuerda que viene de la URL /usuarios/CargarId/:_id
  };

  // Validar si viene vacío
  if ([undefined, null, ""].indexOf(post._id) >= 0) {
    response.status(200).json({
      state: false,
      mensaje: "El campo _id es obligatorio",
    });
    return false;
  }

  // Validar que tenga formato correcto de ObjectId
  if (!mongoose.Types.ObjectId.isValid(post._id)) {
    response.status(200).json({
      state: false,
      mensaje:
        "El campo _id válido debe ser maximo de 24 caracteres hexadecimales",
    });
    return false;
  }

  // Si pasa las validaciones, se llama al modelo
  usuariosModel.CargarId(post, function (respuesta) {
    response.json(respuesta);
  });
};
// ================= ACTUALIZAR =================
usuariosController.Actualizar = function (request, response) {
  var post = {
    _id: request.body._id,
    nombre: request.body.nombre,
    estado: request.body.estado,
    rol: request.body.rol,
  };

  // Validaciones
  if ([undefined, null, ""].indexOf(post._id) >= 0) {
    response
      .status(200)
      .json({ state: false, mensaje: "el campo _id es obligatorio" });
    return false;
  }

  if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response
      .status(200)
      .json({ state: false, mensaje: "el campo nombre es obligatorio" });
    return false;
  }

  if (post.estado == undefined || post.estado == null || post.estado == "") {
    response.json({ state: false, mensaje: "el campo estado es obligatorio" });
    return false;
  }

  if (post.rol == undefined || post.rol == null || post.rol == "") {
    response.json({ state: false, mensaje: "el campo rol es obligatorio" });
    return false;
  }

  if (!mongoose.Types.ObjectId.isValid(post._id)) {
    response.status(200).json({
      state: false,
      mensaje:
        "El campo _id válido debe ser maximo de 24 caracteres hexadecimales",
    });
    return false;
  }

  usuariosModel.ExisteId(post, function (Existe) {
    if (Existe.length == 0) {
      response.json({ state: false, mensaje: "El _Id no existe en la BD" });
      return false;
    } else {
      usuariosModel.Actualizar(post, function (respuesta) {
        if (respuesta.state == true) {
          response.json({ state: true, mensaje: "Se actualizo el registro" });
          return false;
        }
      });
    }
  });

  //     usuariosModel.ExisteCorreo(post, function(Existe){
  // if(Existe.length == 0){
  //     response.json({state:false, mensaje:"El Email no existe en la BD"})
  //     return false
  // }
  // else{
  // usuariosModel.Actualizar(post, function(respuesta){
  // if (respuesta.state == true){
  //     response.json({state:true, mensaje:"Se actualizo el registro"})
  //     return false
  //     }
  // })

  // }

  // })
};
// ================= ELIMINAR =================
usuariosController.Eliminar = function (request, response) {
  var post = {
    _id: request.body._id,
  };

  console.log("ID recibido:", post._id, "longitud:", post._id?.length);

  if ([undefined, null, ""].indexOf(post._id) >= 0) {
    response
      .status(200)
      .json({ state: false, mensaje: "el campo _id es obligatorio" });
    return false;
  }

  if (!mongoose.Types.ObjectId.isValid(post._id)) {
    response.status(200).json({
      state: false,
      mensaje:
        "El campo _id válido debe ser maximo de 24 caracteres hexadecimales",
    });
    return false;
  }

  usuariosModel.ExisteId(post, function (Existe) {
    if (Existe.length == 0) {
      response.json({ state: false, mensaje: "la _id no existe en la BD" });
      return false;
    } else {
      usuariosModel.Eliminar(post, function (respuesta) {
        if (respuesta.state == true) {
          response.json({ state: true, mensaje: "Se Elimino el registro" });
          return false;
        }
      });
    }
  });

  //     usuariosModel.ExisteCorreo(post, function(Existe){

  // if(Existe.length == 0){
  // response.json({state:false, mensaje:"El Email no existe en la BD"})
  // return false
  // }
  // else{

  // usuariosModel.Eliminar(post, function(respuesta){
  // if (respuesta.state == true){
  // response.json({state:true, mensaje:"Se Elimino el registro"})
  // return false
  // }
  // })
  // }

  // })
};

//obligatorias de usuario
usuariosController.Registrar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password,
  };

  if (
    post.nombre == undefined ||
    post.nombre == null ||
    post.nombre.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }
  if (
    post.email == undefined ||
    post.email == null ||
    post.email.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo email es obligatorio" });
    return false;
  }
  if (
    post.password == undefined ||
    post.password == null ||
    post.password.trim() == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo password es obligatorio",
    });
    return false;
  }

  post.password = sha256(post.password + config.clavesecreta);

  var azar = "G-" + Math.floor(Math.random() * (9999 - 1000) + 1000);
  post.codigo = azar;

  usuariosModel.ExisteCorreo(post, function (Existe) {
    if (Existe.length == 0) {
      usuariosModel.Registrar(post, function (respuesta) {
        if (respuesta.state == true) {
          //enviar correo electronico con la configuarcion del  //Transportador

          //Transportador
          const transporter = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: false,
            requireTLS: true,
            auth: {
              user: config.email.user,
              pass: config.email.pass,
            },
          });

          var mailOptions = {
            from: config.email.user,
            to: post.email,
            subject: "Verifica tu cuenta con el codigo: " + azar,
            html: `
                            <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px; text-align: center;">

                                        <div style="background-color: #4850c4; padding: 30px; border-radius: 10px; max-width: 400px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                        <h2 style="color: #333333; margin-bottom: 20px;">Bienvenido a <span style="color: #4CAF50;">${config.name}</span></h2>
                                        <p style="font-size: 16px; margin-bottom: 20px;">Tu Código de Activación es:</p>

                                        <input type="text" value="${azar}" readonly 
                                        style="padding: 10px; font-size: 18px; text-align: center; border: 1px solid #cccccc; border-radius: 5px; margin-bottom: 20px; width: 100%;">

                                        <a target="_blank" href="${config.dominio}/activar/${post.email}/${azar}" 
                                        style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px; text-decoration: none;">
                                        Activar Cuenta
                                        </a>
                                        </div>

                            </div>`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              response.json({ state: false, mensaje: "Error enviando correo" });
            } else {
              console.log(info);
              response.json({
                state: true,
                mensaje:
                  "Usuario Registrado Correctamente. Verifique su bandeja",
              });
            }
          });
        } else {
          response.json({
            state: false,
            mensaje: "Se presenta error al Guardar",
          });
        }
      });
    } else {
      response.json({
        state: false,
        mensaje: "Correo Electronico en Uso Intente con Otro",
      });
    }
  });
};

usuariosController.Login = function (request, response) {
  var post = {
    email: request.body.email,
    password: request.body.password,
  };

  if (
    post.email == undefined ||
    post.email == null ||
    post.email.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo email es obligatorio" });
    return false;
  }
  if (
    post.password == undefined ||
    post.password == null ||
    post.password.trim() == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo password es obligatorio",
    });
    return false;
  }

  post.password = sha256(post.password + config.clavesecreta); //cifrado falla

  usuariosModel.Login(post, function (respuesta) {
    if (respuesta.length == 0) {
      response.json({ state: false, mensaje: "Credenciales Invalidas" });
    } else {
      if (respuesta[0].estado == "Inhabilitado") {
        response.json({
          state: false,
          mensaje: "Su Cuenta ha sido Desactivada",
        });
        return false;
      }

      if (respuesta[0].estado == "Inactivo") {
        response.json({
          state: false,
          mensaje: "Active su cuenta. Verique su Correo Electronico",
        });
        return false;
      }

      if (respuesta[0].estado == "Activo") {
        request.session.nombre = respuesta[0].nombre;
        request.session.email = respuesta[0].email;
        request.session.rol = respuesta[0].rol;
        request.session._id = respuesta[0]._id;
        request.session.profile_picture = respuesta[0].profile_picture;
        response.json({
          state: true,
          mensaje: "Bienvenido " + respuesta[0].nombre,
        });
      } else {
        response.json({ state: false, mensaje: "Su Cuenta no esta Definida" });
      }
    }
  });
};

usuariosController.Activar = function (request, response) {
  var post = {
    email: request.body.email,
    codigo: request.body.codigo,
  };

  if (
    post.email == undefined ||
    post.email == null ||
    post.email.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo email es obligatorio" });
    return false;
  }

  if (
    post.codigo == undefined ||
    post.codigo == null ||
    post.codigo.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo codigo es obligatorio" });
    return false;
  }

  usuariosModel.Activar(post, function (respuesta) {
    if (respuesta == null) {
      response.json({ state: false, mensaje: "Codigo de Activacion Invalido" });
    } else {
      response.json({ state: true, mensaje: "Cuenta Activada Correctamente" });
    }
  });
};

usuariosController.SolicitudRecuperarPass = function (request, response) {
  var post = {
    email: request.body.email,
  };

  if (
    post.email == undefined ||
    post.email == null ||
    post.email.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo email es obligatorio" });
    return false;
  }

  post.codigo = "R-" + Math.floor(Math.random() * (9999 - 1000) + 1000);

  usuariosModel.SolicitudRecuperarPass(post, function (respuesta) {
    const transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });

    var mailOptions = {
      from: config.email.user,
      to: post.email,
      subject: "Codigo de Recuperacion para Contraseña: " + post.codigo,
      html: `
                            <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px; text-align: center;">

                                        <div style="background-color: #4850c4; padding: 30px; border-radius: 10px; max-width: 400px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                        <h2 style="color: #333333; margin-bottom: 20px;">Bienvenido a <span style="color: #4CAF50;">${config.name}</span></h2>
                                        <p style="font-size: 16px; margin-bottom: 20px;">Tu Código de Recuperacion es:</p>

                                        <input type="text" value="${post.codigo}" readonly 
                                        style="padding: 10px; font-size: 18px; text-align: center; border: 1px solid #e41a1aff; border-radius: 5px; margin-bottom: 20px; width: 100%;">

                                        </div>

                            </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        response.json({ state: false, mensaje: "Error enviando correo" });
      } else {
        console.log(info);
        response.json({
          state: true,
          mensaje:
            "Hemos enviado el Codigo de Recuperacion de Contraseña. Verifique su bandeja",
        });
      }
    });
  });
};

usuariosController.RecuperarPass = function (request, response) {
  var post = {
    email: request.body.email,
    codigorec: request.body.codigorec,
    password: request.body.password,
  };

  if (
    post.email == undefined ||
    post.email == null ||
    post.email.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo email es obligatorio" });
    return false;
  }

  if (
    post.codigorec == undefined ||
    post.codigorec == null ||
    post.codigorec.trim() == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo codigorec es obligatorio",
    });
    return false;
  }

  if (
    post.password == undefined ||
    post.password == null ||
    post.password.trim() == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo password es obligatorio",
    });
    return false;
  }

  post.password = sha256(post.password + config.clavesecreta);

  usuariosModel.RecuperarPass(post, function (respuesta) {
    if ((respuesta = null)) {
      response.json({
        state: false,
        mensaje: "El Codigo de Recuperacion o el Email es Invalido",
      });
      return false;
    } else {
      response.json({ state: true, mensaje: "Se ha cambiado el password" });
      return false;
    }
  });
};

usuariosController.ActualizarPass = function (request, response) {
  var post = {
    password: request.body.password,
    _id: request.session._id,
  };
  if (
    post.password == undefined ||
    post.password == null ||
    post.password == ""
  ) {
    response.json({
      state: false,
      mensaje: "El Campo Password es Obligatorio",
    });
    return false;
  }
  if (post._id == undefined || post._id == null || post._id == "") {
    response.json({
      state: false,
      mensaje: "Inice Sesion para cambiar el Password",
    });
    return false;
  }
  post.password = sha256(post.password + config.clavesecreta);

  usuariosModel.ActualizarPass(post, function (respuesta) {
    request.session.destroy();
    response.json({ state: true, mensaje: "Su Password se ha Actualizado" });
  });
};

usuariosController.ActualizarMisDatos = function (request, response) {
  var post = {
    _id: request.session._id,
    nombre: request.body.nombre,
  };

  if (post._id == undefined || post._id == null || post._id == "") {
    response.json({
      state: false,
      mensaje: "Inice Sesion para Actuaizar sus Datos",
    });
    return false;
  }

  if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response.json({ state: false, mensaje: "El campo nombre es Obligatorio" });
    return false;
  }

  usuariosModel.ActualizarMisDatos(post, function (respuesta) {
    if (respuesta.state == true) {
      response.json({ state: true, mensaje: "Se han Actualizado sus Datos" });
    } else {
      response.json({ state: false, mensaje: "Error al actualizar sus Datos" });
    }
  });
};

usuariosController.MisDatos = function (request, response) {
  var post = {
    _id: request.session._id,
  };

  if (post._id == undefined || post._id == null || post._id == "") {
    response.json({
      state: false,
      mensaje: "Debe Iniciar Sesion para cargar los datos",
    });
    return false;
  }

  usuariosModel.CargarId(post, function (respuesta) {
    response.json(respuesta);
  });
};

module.exports.usuariosController = usuariosController;
