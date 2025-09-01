const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var carouselModel = {};

var carouselSchema = new Schema({
  codigo: String,
  imagen: String,
  titulo: String,
  subtitulo: String,
  descripcion: String,
  estado: String,
});

const Mymodel = mongoose.model("carousels", carouselSchema);

carouselModel.CargarCarousel = function (post, callback) {
  console.log(post, Mymodel);
  Mymodel.find({estado : "Activo"}, {}).then((respuesta) => {
    return callback(respuesta);
  });
};

carouselModel.ExisteCodigo = function (post, callback) {
  Mymodel.find({ codigo: post.codigo }, {})
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      console.log(error);
    });
};

carouselModel.ExisteId = function (post, callback) {
  Mymodel.find({ _id: post._id }, {})
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      console.log(error);
    });
};

carouselModel.Guardar = function (post, callback) {
  const instancia = new Mymodel();
  instancia.codigo = post.codigo;
  instancia.imagen = post.imagen;
  instancia.titulo = post.titulo;
  instancia.subtitulo = post.subtitulo;
  instancia.descripcion = post.descripcion;
  instancia.estado = post.estado;

  instancia
    .save()
    .then((respuesta) => {
      return callback({ state: true });
    })
    .catch((error) => {
      console.log(error);
      return callback({ state: false });
    });
};

carouselModel.CargarTodas = function (post, callback) {
  Mymodel.find({}, {}).then((respuesta) => {
    return callback(respuesta);
  });
};

carouselModel.CargarId = function (post, callback) {
  Mymodel.find({ _id: post._id }, {}).then((respuesta) => {
    return callback(respuesta);
  });
};

carouselModel.Actualizar = function (post, callback) {
  Mymodel.findOneAndUpdate(
    { _id: post._id },
    {
      codigo: post.codigo,
      imagen: post.imagen,
      titulo: post.titulo,
      subtitulo: post.subtitulo,
      descripcion: post.descripcion,
      estado: post.estado,
    }
  )
    .then((respuesta) => {
      return callback({ state: true });
    })
    .catch((error) => {
      console.log(error);
      return callback({ state: false });
    });
};

carouselModel.Eliminar = function (post, callback) {
  Mymodel.findOneAndDelete({ _id: post._id })
    .then((respuesta) => {
      return callback({ state: true });
    })
    .catch((error) => {
      console.log(error);
      return callback({ state: false });
    });
};


module.exports.carouselModel = carouselModel;
