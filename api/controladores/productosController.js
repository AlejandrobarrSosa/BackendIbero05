var productosModel = require("../modelos/productosModel.js").productosModel;

var productosController = {};

productosController.Guardar = function (request, response) {
  var post = {
    codigo: request.body.codigo,
    nombre: request.body.nombre,
    imagen: request.body.imagen,
    cantidad: request.body.cantidad,
    precio: request.body.precio,
    descripcion: request.body.descripcion,
    estado: request.body.estado,
    datos_tecnicos: request.body.datos_tecnicos,
  };

  if (
    post.codigo == undefined ||
    post.codigo == null ||
    post.codigo.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo codigo es Obligatorio" });
    return false;
  }

  if (
    post.nombre == undefined ||
    post.nombre == null ||
    post.nombre.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es Obligatorio" });
    return false;
  }

  if (
    post.imagen == undefined ||
    post.imagen == null ||
    post.imagen.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo imagen es Obligatorio" });
    return false;
  }

  if (
    post.cantidad == undefined ||
    post.cantidad == null ||
    post.cantidad == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo cantidad es Obligatorio",
    });
    return false;
  }

  if (post.precio == undefined || post.precio == null || post.precio == "") {
    response.json({ state: false, mensaje: "El campo precio es Obligatorio" });
    return false;
  }

  if (
    post.descripcion == undefined ||
    post.descripcion == null ||
    post.descripcion.trim() == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo descripcion es Obligatorio",
    });
    return false;
  }

  if (
    post.datos_tecnicos == undefined ||
    post.datos_tecnicos == null ||
    post.datos_tecnicos.trim() == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo datos tecnicos es Obligatorio",
    });
    return false;
  }

  if (
    post.estado == undefined ||
    post.estado == null ||
    post.estado.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo estado es Obligatorio" });
    return false;
  }

  productosModel.ExisteCodigo(post, function (Existe) {
    if (Existe.length == 0) {
      productosModel.Guardar(post, function (respuesta) {
        if (respuesta.state == true) {
          response.json({
            state: true,
            mensaje: "El elemento fue Almacenado Correctamente",
          });
        } else {
          response.json({
            state: false,
            mensaje: "Se presento error al Guardar",
          });
        }
      });
    } else {
      response.json({
        state: false,
        mensaje: "El codigo del producto ya existe Intente con Otro",
      });
    }
  });
};

productosController.CargarTodas = function (request, response) {
  productosModel.CargarTodas(null, function (respuesta) {
    response.json(respuesta);
  });
};

productosController.CargarId = function (request, response) {
  var post = {
    _id: request.params._id,
  };

  if (post._id == undefined || post._id == null || post._id.trim() == "") {
    response.json({ state: false, mensaje: "El campo _id es Obligatorio" });
    return false;
  }

  productosModel.CargarId(post, function (respuesta) {
    response.json(respuesta);
  });
};

productosController.Actualizar = function (request, response) {
  var post = {
    _id: request.body._id,
    nombre: request.body.nombre,
    imagen: request.body.imagen,
    cantidad: request.body.cantidad,
    precio: request.body.precio,
    descripcion: request.body.descripcion,
    estado: request.body.estado,
    datos_tecnicos: request.body.datos_tecnicos,
  };

  if (
    post.nombre == undefined ||
    post.nombre == null ||
    post.nombre.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es Obligatorio" });
    return false;
  }

  if (
    post.datos_tecnicos == undefined ||
    post.datos_tecnicos == null ||
    post.datos_tecnicos.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo datos tecnicos es Obligatorio" });
    return false;
  }

  if (post._id == undefined || post._id == null || post._id.trim() == "") {
    response.json({ state: false, mensaje: "El campo _id es Obligatorio" });
    return false;
  }

  if (
    post.imagen == undefined ||
    post.imagen == null ||
    post.imagen.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo imagen es Obligatorio" });
    return false;
  }

  if (
    post.cantidad == undefined ||
    post.cantidad == null ||
    post.cantidad == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo cantidad es Obligatorio",
    });
    return false;
  }

  if (post.precio == undefined || post.precio == null || post.precio == "") {
    response.json({ state: false, mensaje: "El campo precio es Obligatorio" });
    return false;
  }

  if (
    post.descripcion == undefined ||
    post.descripcion == null ||
    post.descripcion.trim() == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo descripcion es Obligatorio",
    });
    return false;
  }

  if (
    post.estado == undefined ||
    post.estado == null ||
    post.estado.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo estado es Obligatorio" });
    return false;
  }

  productosModel.ExisteId(post, function (Existe) {
    if (Existe.length == 0) {
      response.json({
        state: false,
        mensaje: "El Id Que Desea Actualizar no Existe",
      });
    } else {
      productosModel.Actualizar(post, function (respuesta) {
        if (respuesta.state == true) {
          response.json({
            state: true,
            mensaje: "Se ha Actualizado el Elemento",
          });
        } else {
          response.json({
            state: false,
            mensaje: "Se presento un error al Actualizar el Elemento",
          });
        }
      });
    }
  });
};

productosController.Eliminar = function (request, response) {
  var post = {
    _id: request.body._id,
  };

  if (post._id == undefined || post._id == null || post._id.trim() == "") {
    response.json({ state: false, mensaje: "El campo _id es Obligatorio" });
    return false;
  }

  productosModel.ExisteId(post, function (Existe) {
    if (Existe.length == 0) {
      response.json({
        state: false,
        mensaje: "El Id Que Desea Eliminar no Existe",
      });
    } else {
      productosModel.Eliminar(post, function (respuesta) {
        if (respuesta.state == true) {
          response.json({
            state: true,
            mensaje: "Se ha Eliminado el Elemento",
          });
        } else {
          response.json({
            state: false,
            mensaje: "Se presento un error al Eliminar el Elemento",
          });
        }
      });
    }
  });
};

//==========Solo para que cliente visualice los productos=======//
productosController.CargarTodasCliente = function (request, response) {
  productosModel.CargarTodasCliente(null, function (respuesta) {
    response.json(respuesta);
  });
};

module.exports.productosController = productosController;
