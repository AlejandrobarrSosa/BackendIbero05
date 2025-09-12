const mongoose = require("mongoose")
const serviciosController = require("../controladores/serviciosController").serviciosController
const serviciosModel = require("../modelos/serviciosModel").serviciosModel
global.config = require("../../config.js").config



describe("POST: /servicios/Guardar", () => {
    let request
    let response

    beforeAll((done) => {
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then(() => {
            done()
        }).catch((error) => {
            console.log("Error conexión Mongo --->", error)
        })
    })

    beforeEach(() => {
        request = { body: {} }
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })


    test("Debe validar que el campo codigo es obligatorio", (done) => {
        request.body.codigo = ""
        request.body.nombre = "Servicio x"

        serviciosController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo codigo es Obligatorio" })
        done()
    })


    test("Debe validar que el campo nombre es obligatorio", (done) => {
        request.body.codigo = "123"
        request.body.nombre = ""

        serviciosController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo nombre es Obligatorio" })
        done()
    })


    test("Debe registrar el servicio si no existe", (done) => {
        request.body.codigo = "123"
        request.body.nombre = "Servicio x"

        // Limpieza
        serviciosModel.Mymodel.deleteMany({ codigo: "123" }).then(() => {
        serviciosController.Guardar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({ state: true,mensaje: "El elemento fue Almacenado Correctamente"})
                done()
            }, 200)
        })
    })


     test("Debe reportar si el código ya existe", (done) => {
        request.body.codigo = "123"
        request.body.nombre = "Servicio X"

      
        serviciosModel.Mymodel.create({ codigo: "123", nombre: "Servicio X" }).then(() => {
        serviciosController.Guardar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({ state: false,mensaje: "El codigo del producto ya existe Intente con Otro" })
                done()
            }, 200)
        })
    })


    test("Borrado de Colección de Servicios", (done) => {
        serviciosModel.Mymodel.deleteMany({}).then(() => {
            expect(true).toBe(true)
            done()
        })
    })
})


describe("GET: /servicios/CargarTodas", () => {        
    let request
    let response

    beforeAll((done) => {
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then(() => {
            done()
        }).catch((error) => {
            console.log("Error conexión Mongo --->", error)
        })
    })

    beforeEach(() => {
        request = { body: {} }
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })
        
 

  test("Debe devolver al menos un servicio cuando existen registros", (done) => {
    const servicio = new serviciosModel.Mymodel({
        codigo: "CT123",
        nombre: "Servicio de Prueba"
    })

    servicio.save().then(() => {
        serviciosController.CargarTodas(request, response)

        setTimeout(() => {
        expect(response.json).toHaveBeenCalledWith({ state: true,datos: {codigo: "CT123",nombre: "Servicio de Prueba"}})
            done()
        }, 100)
    })
})

})


describe("GET: /servicios/CargarId", () => {        
    let request
    let response

    beforeAll((done) => {
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then(() => {
            done()
        }).catch((error) => {
            console.log("Error conexión Mongo --->", error)
        })
    })

    beforeEach(() => {
        request = { body: {} }
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })
        

   test("Debe validar que el campo _id es obligatorio", (done) => {
        request.params._id = ""

        serviciosController.CargarId(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "El campo _id es Obligatorio"})
        done()
    })

    
    
    test("Debe cargar un servicio por su _id", (done) => {
    serviciosModel.Mymodel.create({ codigo: "200", nombre: "Servicio CargarId" }).then((nuevo) => {
    request.params._id = nuevo._id.toString()

    serviciosController.CargarId(request, response)

    setTimeout(() => {
    expect(response.json).toHaveBeenCalledWith({ state: true,datos: expect.objectContaining({_id: nuevo._id, codigo: "200",nombre: "Servicio CargarId"})})
            done()
        }, 100)
    })


    test("Borrado de Servicio de prueba", (done) => {
        serviciosModel.Mymodel.deleteMany({ codigo: "200" }).then(() => {
            expect(true).toBe(true)
            done()
            })
        })

    })

})


describe("PUT: /servicios/Actualizar", () => {        
    let request
    let response

    beforeAll((done) => {
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then(() => {
            done()
        }).catch((error) => {
            console.log("Error conexión Mongo --->", error)
        })
    })

    beforeEach(() => {
        request = { body: {} }
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })



  test("Debe reportar si el campo nombre es obligatorio", (done) => {
        request.body._id = "123"
        request.body.nombre = "" 

        serviciosController.Actualizar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: false,mensaje: "El campo nombre es Obligatorio"})
            done()
        }, 70)
    })


    test("Debe reportar si el campo _id es obligatorio", (done) => {
        request.body._id = "" 
        request.body.nombre = "Servicio X"

        serviciosController.Actualizar(request, response)

        setTimeout(() => { expect(response.json).toHaveBeenCalledWith({ state: false,mensaje: "El campo _id es Obligatorio" })
            done()
        }, 70)
    })

    test("Debe reportar si el Id que desea actualizar no existe", (done) => {
        request.body._id = new mongoose.Types.ObjectId().toString() 
        request.body.nombre = "Servicio X"

        serviciosController.Actualizar(request, response)

            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El Id Que Desea Actualizar no Existe"})
            done()
        }, 100)
    })

    test("Debe actualizar correctamente el servicio", (done) => {
      
        const servicio = new serviciosModel.Mymodel({
            codigo: "ALE123",
            nombre: "Servicio z"
        })

        servicio.save().then((doc) => {
            request.body._id = doc._id.toString()
            request.body.nombre = "Servicio Actualizado"

            serviciosController.Actualizar(request, response)

            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: true,mensaje: "Se ha Actualizado el Elemento" })

               
                serviciosModel.Mymodel.deleteMany({ codigo: "ALE123" }).then(() => done())
            }, 100)
        })
    })


    test("Debe, reportar error si ocurre un fallo al actualizar", (done) => {
      
    const servicio = new serviciosModel.Mymodel({
            codigo: "ERROR1",
            nombre: "Servicio Error"
        })

        servicio.save().then((doc) => {
        request.body._id = doc._id.toString()
        request.body.nombre = "Servicio Error Forzado"

            
            serviciosModel.Mymodel.deleteMany({ _id: doc._id }).then(() => {
            serviciosController.Actualizar(request, response)

            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "Se presento un error al Actualizar el Elemento" })
                    done()
                }, 100)
            })
        })
    })
    
})


describe("DELETE: /servicios/Eliminar", () => {        
    let request
    let response

    beforeAll((done) => {
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then(() => {
            done()
        }).catch((error) => {
            console.log("Error conexión Mongo --->", error)
        })
    })

    beforeEach(() => {
        request = { body: {} }
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })


    test("Debe, reportar si el campo _id es obligatorio", (done) => {
        request.body._id = "" 

        serviciosController.Eliminar(request, response)

        setTimeout(() => {
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo _id es Obligatorio" })
            done()
        }, 70)
    })

    test("Debe, reportar el Id que desea eliminar no existe", (done) => {
        request.body._id = new mongoose.Types.ObjectId().toString() 

        serviciosController.Eliminar(request, response)

        setTimeout(() => {
        expect(response.json).toHaveBeenCalledWith({ state: false,mensaje: "El Id Que Desea Eliminar no Existe" })
            done()
        }, 100)
    })

    test("Debe, eliminar correctamente un servicio", (done) => {
        
        const servicio = new serviciosModel.Mymodel({
            codigo: "DEL123",
            nombre: "Servicio a Eliminar"
        })

        servicio.save().then((doc) => {
            request.body._id = doc._id.toString()

            serviciosController.Eliminar(request, response)

            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: true, mensaje: "Se ha Eliminado el Elemento"})
            done()
            }, 100)
        })
    })

    test("Debe, reportar error si falla al eliminar", (done) => {
        
        const servicio = new serviciosModel.Mymodel({
            codigo: "DEL123",
            nombre: "Servicio Error"
        })

        servicio.save().then((doc) => {
            request.body._id = doc._id.toString()

           
            serviciosModel.Mymodel.deleteMany({ _id: doc._id }).then(() => {
                serviciosController.Eliminar(request, response)

                setTimeout(() => {
                    expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "Se presento un error al Eliminar el Elemento"})
                    done()
                }, 100)
            })
        })
    })


})














