var carouselModel = require("../modelos/carouselModel.js").carouselModel;

var carouselController = {};

carouselController.CargarCarousel = function (request, response) {
  carouselModel.CargarCarousel({}, function (respuesta) {
    response.json(respuesta);
  });
};

carouselController.Guardar = function (request, response) {
  var post = {
    codigo: request.body.codigo,
    imagen: request.body.imagen,
    titulo: request.body.titulo,
    subtitulo: request.body.subtitulo,
    descripcion: request.body.descripcion,
    estado: request.body.estado,
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
    post.titulo == undefined ||
    post.titulo == null ||
    post.titulo.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo titulo es Obligatorio" });
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
    post.subtitulo == undefined ||
    post.subtitulo == null ||
    post.subtitulo == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo subtitulo es Obligatorio",
    });
    return false;
  }

  if (
    post.descripcion == undefined ||
    post.descripcion == null ||
    post.descripcion == ""
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

  carouselModel.ExisteCodigo(post, function (Existe) {
    if (Existe.length == 0) {
      carouselModel.Guardar(post, function (respuesta) {
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
        mensaje: "El codigo del carousel ya existe Intente con Otro",
      });
    }
  });
};

carouselController.CargarTodas = function (request, response) {
  carouselModel.CargarTodas(null, function (respuesta) {
    response.json(respuesta);
  });
};

carouselController.CargarId = function (request, response) {
    // console.log(request.params._id, request)
  var post = {
    _id: request.params._id,
  };

  if (post._id == undefined || post._id == null || post._id.trim() == "") {
    response.json({ state: false, mensaje: "El campo _id es Obligatorio" });
    return false;
  }

  carouselModel.CargarId(post, function (respuesta) {
    response.json(respuesta);
  });
};

carouselController.Actualizar = function (request, response) {
  var post = {
    _id: request.body._id,
    codigo: request.body.codigo,
    imagen: request.body.imagen,
    titulo: request.body.titulo,
    subtitulo: request.body.subtitulo,
    descripcion: request.body.descripcion,
    estado: request.body.estado,
  };

  if (
    post.titulo == undefined ||
    post.titulo == null ||
    post.titulo.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo titulo es Obligatorio" });
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
    post.subtitulo == undefined ||
    post.subtitulo == null ||
    post.subtitulo == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo subtitulo es Obligatorio",
    });
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

  carouselModel.ExisteId(post, function (Existe) {
    if (Existe.length == 0) {
      response.json({
        state: false,
        mensaje: "El Id Que Desea Actualizar no Existe",
      });
    } else {
      carouselModel.Actualizar(post, function (respuesta) {
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

carouselController.Eliminar = function (request, response) {
  var post = {
    _id: request.body._id,
  };

  if (post._id == undefined || post._id == null || post._id.trim() == "") {
    response.json({ state: false, mensaje: "El campo _id es Obligatorio" });
    return false;
  }

  carouselModel.ExisteId(post, function (Existe) {
    if (Existe.length == 0) {
      response.json({
        state: false,
        mensaje: "El Id Que Desea Eliminar no Existe",
      });
    } else {
      carouselModel.Eliminar(post, function (respuesta) {
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

module.exports.carouselController = carouselController;
