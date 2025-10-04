const {
  carouselController,
} = require("./api/controladores/carouselController.js");

var usuariosController =
  require("./api/controladores/usuariosController.js").usuariosController;
var security = require("./midleware/security.js").security;

module.exports = function (app) {
  //=====(solo admin)=====//
  // guardar usuario
  app.post(
    "/api/usuarios/Guardar",
    security.SoloAdmin,
    function (request, response) {
      usuariosController.Guardar(request, response);
    }
  );

  // cargar todas
  app.get(
    "/api/usuarios/CargarTodas",
    security.SoloAdmin,
    function (request, response) {
      usuariosController.CargarTodas(request, response);
    }
  );

  // cargar por id
  app.get(
    "/api/usuarios/CargarId/:_id",
    security.SoloAdmin,
    function (request, response) {
      usuariosController.CargarId(request, response);
    }
  );

  // actualizar usuario
  app.put(
    "/api/usuarios/Actualizar",
    security.SoloAdmin,
    function (request, response) {
      usuariosController.Actualizar(request, response);
    }
  );

  // eliminar usuario
  app.delete(
    "/api/usuarios/Eliminar",
    security.SoloAdmin,
    function (request, response) {
      usuariosController.Eliminar(request, response);
    }
  );
  //=====(solo admin)=====//

  // registro
  app.post("/api/usuarios/Registrar", function (request, response) {
    usuariosController.Registrar(request, response);
  });
  // login
  app.post("/api/usuarios/Login", function (request, response) {
    usuariosController.Login(request, response);
  });
  //activar con GET y parámetros
  app.get("/api/usuarios/Activar/:email/:codigo", function (request, response) {
    usuariosController.Activar(request, response);
  });
  // solicitud recuperar pass
  app.post(
    "/api/usuarios/SolicitudRecuperarPass",
    function (request, response) {
      usuariosController.SolicitudRecuperarPass(request, response);
    }
  );
  // recuperar pass
  app.post("/api/usuarios/RecuperarPass", function (request, response) {
    usuariosController.RecuperarPass(request, response);
  });
  // estado de sesión
  app.post("/api/usuarios/estado", function (request, response) {
    response.json(request.session);
  });
  // cerrar sesión
  app.post("/api/usuarios/logout", function (request, response) {
    request.session.destroy();
    response.json({ state: true, mensaje: "Sesion Cerrada" });
  });

  app.post("/api/usuarios/ActualizarPass", function (request, response) {
    usuariosController.ActualizarPass(request, response);
  });

  app.post("/api/usuarios/MisDatos", function (request, response) {
    usuariosController.MisDatos(request, response);
  });

  app.post("/api/usuarios/ActualizarMisDatos", function (request, response) {
    usuariosController.ActualizarMisDatos(request, response);
  });

  //========activar cuenta============//
  app.post("/api/usuarios/Activar", function (request, response) {
    usuariosController.Activar(request, response);
  });

  var productosController =
    require("./api/controladores/productosController.js").productosController;

  app.post(
    "/api/productos/Guardar",
    security.SoloAdmin,
    function (request, response) {
      productosController.Guardar(request, response);
    }
  );

  app.get(
    "/api/productos/CargarTodas",
    security.SoloAdmin,
    function (request, response) {
      productosController.CargarTodas(request, response);
    }
  );

  app.get("/api/productos/CargarId/:_id", function (request, response) {
    productosController.CargarId(request, response);
  });

  app.put(
    "/api/productos/Actualizar",
    security.SoloAdmin,
    function (request, response) {
      productosController.Actualizar(request, response);
    }
  );

  app.delete(
    "/api/productos/Eliminar",
    security.SoloAdmin,
    function (request, response) {
      productosController.Eliminar(request, response);
    }
  );

  //==========Solo para que cliente visualice los productos=======//
  app.get("/api/productos/CargarTodasCliente", function (request, response) {
    productosController.CargarTodas(request, response);
  });

  //==========servicios============//
  var serviciosController =
    require("./api/controladores/serviciosController.js").serviciosController;

  app.post("/api/servicios/Guardar", function (request, response) {
    serviciosController.Guardar(request, response);
  });

  // app.get("/api/servicios/CargarTodas",  function (request, response) {
  //     serviciosController.CargarTodas(request, response)
  // })

  exports.CargarTodas = function (req, res) {
    Producto.find({}, (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Error al cargar productos", detalles: err });
      } else {
        res.json(result); // <-- aquí Angular interpreta correctamente
      }
    });
  };

  app.get("/api/servicios/CargarId/:_id", function (request, response) {
    serviciosController.CargarId(request, response);
  });

  app.put("/api/servicios/Actualizar", function (request, response) {
    serviciosController.Actualizar(request, response);
  });

  app.delete("/api/servicios/Eliminar", function (request, response) {
    serviciosController.Eliminar(request, response);
  });

  //===========clientes============//
  var clientesController =
    require("./api/controladores/clientesController.js").clientesController;

  app.post("/api/clientes/Guardar", function (request, response) {
    clientesController.Guardar(request, response);
  });

  // app.get("/api/clientes/CargarTodas",  function (request, response) {
  //     clientesController.CargarTodas(request, response)
  // })

  exports.CargarTodas = function (req, res) {
    Producto.find({}, (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Error al cargar productos", detalles: err });
      } else {
        res.json(result); // <-- aquí Angular interpreta correctamente
      }
    });
  };

  app.get("/api/clientes/CargarId/:_id", function (request, response) {
    clientesController.CargarId(request, response);
  });

  app.put("/api/clientes/Actualizar", function (request, response) {
    clientesController.Actualizar(request, response);
  });

  app.delete("/api/clientes/Eliminar", function (request, response) {
    clientesController.Eliminar(request, response);
  });

  //=========Carousel============//
  app.get("/api/carousel/CargarCarousel", function (request, response) {
    carouselController.CargarCarousel(request, response);
  });
  app.post("/api/carousel/Guardar", function (request, response) {
    carouselController.Guardar(request, response);
  });
  // app.get("/api/carousel/CargarTodas", function (request, response) {
  //     carouselController.CargarTodas(request, response)
  // })

  exports.CargarTodas = function (req, res) {
    Producto.find({}, (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Error al cargar productos", detalles: err });
      } else {
        res.json(result); // <-- aquí Angular interpreta correctamente
      }
    });
  };

  app.get("/api/carousel/CargarId/:_id", function (request, response) {
    carouselController.CargarId(request, response);
  });
  app.put("/api/carousel/Actualizar", function (request, response) {
    carouselController.Actualizar(request, response);
  });
  app.delete("/api/carousel/Eliminar", function (request, response) {
    carouselController.Eliminar(request, response);
  });
};
