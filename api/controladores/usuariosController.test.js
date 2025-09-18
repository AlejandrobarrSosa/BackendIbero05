const mongoose = require("mongoose")
global.config = require("../../config.js").config
const usuariosController = require("./usuariosController.js").usuariosController
global.sha256 = require("sha256")
const usuariosModel = require("../modelos/usuariosModel.js").usuariosModel  
global.nodemailer = require("nodemailer")





describe("POST: /usuarios/Guardar", () =>{
    let request
    let response

    beforeAll((done) =>  {

        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
        //   console.log("Conexion correcta a Mongo")
            done()
        }).catch((error) => {
            console.log('--------------->')
            console.log(error)
        })

       
    })

    beforeEach(() => {
            request = {body:{}}
            response = {
                json:jest.fn(),
                status:jest.fn().mockReturnThis()
            }
    })

        test("Al guardar, el campo nombre es oblidatorio", (done) => {
            request.body.nombre = ""
            request.body.email = ""
            request.body.password = ""
            request.body.rol = ""
            

            usuariosController.Guardar(request, response)

            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"el campo nombre es obligatorio"})
            done()

        })

        test("Al guardar, el campo email es oblidatorio", (done) => {
            request.body.nombre = "John"
            request.body.email = ""
            request.body.password = ""
            request.body.rol = ""

            usuariosController.Guardar(request, response)

            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"el campo email es obligatorio"})
            done()

        })

        test("Al guardar, el campo password es oblidatorio", (done) => {
            request.body.nombre = "John"
            request.body.email = "john@gmail.com"
            request.body.password = ""
            request.body.rol = ""

            usuariosController.Guardar(request, response)

            expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "el campo password es obligatorio" })
            done()

        })

        test("Al guardar, el campo rol es oblidatorio", (done) => {
            request.body.nombre = "John"
            request.body.email = "john@gmail.com"
            request.body.password = "123456"
            request.body.rol = ""

            usuariosController.Guardar(request, response)
            setTimeout(() =>{

            expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "el campo rol es obligatorio" })
            done()
            },200);
     
        })

        test("Al guardar, debe registrar el usuario", (done) => {
            request.body.nombre = "John"
            request.body.email = "john@gmail.com"
            request.body.password = "123456"
            request.body.rol = "Administrador"

            usuariosModel.Mymodel.deleteMany({email:"john@gmail.com"}).then((respuesta) => {

            usuariosController.Guardar(request, response)

            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: true, mensaje: "Item almacenado", data:[] })
            done()
            },70);

            })
          
        })

        test("Al guardar, reportar que el usuario ya existe", (done) => {
            request.body.nombre = "John"
            request.body.email = "john@gmail.com"
            request.body.password = "123456"
            request.body.rol = "Administrador"

           

            usuariosController.Guardar(request, response)

            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El Email ya Existe Intente con otro"})
            done()
            },70);
          
        })
      
         test("Borrado de Coleccion", (done) => {    
            
            usuariosModel.Mymodel.deleteMany({email:"john@gmail.com"}).then((respuesta) => {

            expect(true).toBe(true)
            done()
        
            })

        })

})


describe("GET: /usuarios/CargarTodas", () =>{
    let request
    let response

    beforeAll((done) =>  {

        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
        
            done()
        }).catch((error) => {
            console.log('--------------->')
            console.log(error)
        })

       
    })

    beforeEach(() => {
            request = {body:{}}
            response = {
                json:jest.fn(),
                status:jest.fn().mockReturnThis()
            }
    })


    test("Al guardar, debe registrar el usuario", (done) => {
        request.body.nombre = "john"
        request.body.email = "john@gmail.com"
        request.body.password = "123456"        
        request.body.rol = "Administrador"

        usuariosModel.Mymodel.deleteMany({email:"john@gmail.com"}).then((respuesta) => {
       
        usuariosController.Guardar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: true, mensaje: "Item almacenado", data:[] })
                done()
            }, 70)
        })

    })


    test("Debe existir al menos un usuario creado", (done) => {
        
        usuariosController.CargarTodas(request, response)
        setTimeout(() => {
       
            console.log(response.json.mock.calls[0].datos)
            expect(1).toBe(1)

            done()

        }, 500);

    })


    test("Borrado de Coleccion", (done) => {    
            
    usuariosModel.Mymodel.deleteMany({email:"john@gmail.com"}).then((respuesta) => {

            expect(true).toBe(true)
            done()
        
            })

        })

})


describe("DELETE: /usuarios/Eliminar", () =>{
    let request
    let response

    beforeAll((done) =>  {

        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
        
            done()
        }).catch((error) => {
            console.log('--------------->')
            console.log(error)
        })

       
    })

    beforeEach(() => {
            request = {body:{}}
            response = {
                json:jest.fn(),
                status:jest.fn().mockReturnThis()
            }
    })


        test("Al eliminar, el campo _id es oblidatorio", (done) => {
        request.body._id = ""
           
        usuariosController.Eliminar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"el campo _id es obligatorio"})
        done()
        })


        test("Al eliminar, el campo _id debe ser de 24 caracteres", (done) => {
        request.body._id = "xx"
           
        usuariosController.Eliminar(request, response)

        expect(response.json).toHaveBeenCalledWith({state: false,mensaje:"El campo _id válido debe ser maximo de 24 caracteres hexadecimales",})
        done()

        })
      


     test("Al guardar, debe registrar el usuario", (done) => {
        request.body.nombre = "John"
        request.body.email = "john@gmail.com"
        request.body.password = "123456"
        request.body.rol = "Administrador"

        usuariosModel.Mymodel.deleteMany({email:"john@gmail.com"}).then((respuesta) => {

        usuariosController.Guardar(request, response)

        setTimeout(() => {
        expect(response.json).toHaveBeenCalledWith({ state: true, mensaje: "Item almacenado", data: [] })
        done()
        },70);

        })

    })



        test("Con un Id Invalido reportar que no existe", (done) => {
        request.body._id = "68c86c018fead59d3541942a"
           
        usuariosController.Eliminar(request, response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje: "la _id no existe en la BD",})
            done()
            },60); 
        })


        test("Debe Eliminar por medio del Id", (done) => {    
        usuariosModel.Mymodel.find({email:"john@gmail.com"}).then((respuesta) => {
        request.body._id = respuesta[0]._id.toString()
         
        usuariosController.Eliminar(request, response)
        setTimeout(() => {  
        
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Se Elimino el registro",})
        done()
                },60);
            })
        })



        test("Verificar que no existen datos y fue eliminado", (done) => {    
        usuariosModel.Mymodel.find({email:"john@gmail.com"}).then((respuesta) => {
        
        usuariosController.Eliminar(request, response)
        setTimeout(() => {  
            expect(respuesta.length).toBe(0)
                    done()
                },500);
            })
        })

})


describe("POST: /usuarios/Registrar", () =>{
    let request
    let response

    beforeAll((done) =>  {

        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
      
            done()
        }).catch((error) => {
            console.log('--------------->')
            console.log(error)
        })

       
    })

    beforeEach(() => {
            request = {body:{}}
            response = {
                json:jest.fn(),
                status:jest.fn().mockReturnThis()
            }
    })

        test("Al Registrar, el campo nombre es oblidatorio", (done) => {
            request.body.nombre = ""
            request.body.email = ""
            request.body.password = ""
            
            usuariosController.Registrar(request, response)

            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
            done()

        })


        test("Al Registrar, el campo email es oblidatorio", (done) => {
            request.body.nombre = "John"
            request.body.email = ""
            request.body.password = ""
            

            usuariosController.Registrar(request, response)

            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
            done()

        })

        
       test("Al Registrar, el campo password es oblidatorio", (done) => {
            request.body.nombre = "John"
            request.body.email = "jhon@gmail.com"
            request.body.password = ""
            //alejandrobarr.sosa@hotmail.com

            usuariosController.Registrar(request, response)

            expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo password es obligatorio" })
            done()

        })


        test("Al Registrar, debe registrar el usuario", (done) => {
            request.body.nombre = "John"
            request.body.email = "jhon@gmail.com"
            request.body.password = "123456"
            //alejandrobarr.sosa@hotmail.com
           
            usuariosModel.Mymodel.deleteMany({}).then((respuesta) => {

            usuariosController.Registrar(request, response)

            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: true, mensaje: "Usuario Registrado Correctamente. Verifique su bandeja", })
                done()
                    },2000);

            })

        })      
        

        test("Al Registrar, debe decir que el correos ya existe", (done) => {
            request.body.nombre = "John"
            request.body.email = "jhon@gmail.com"
            request.body.password = "123456"
            //alejandrobarr.sosa@hotmail.com
        
            usuariosController.Registrar(request, response)

            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: false,mensaje: "Correo Electronico en Uso Intente con Otro", })
                done()
                    },80);

            })

        
        test("Borrado de Coleccion", (done) => {    
            usuariosModel.Mymodel.deleteMany({}).then((respuesta) => {
                expect(true).toBe(true)
                done()
        
            })

        })


    })

    
describe("POST: /usuarios/Activar", () =>{
    let request
    let response

    beforeAll((done) =>  {

        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
       
            done()
        }).catch((error) => {
            console.log('--------------->')
            console.log(error)
        })

       
    })

    beforeEach(() => {
            request = {body:{}}
            response = {
                json:jest.fn(),
                status:jest.fn().mockReturnThis()
            }
    })

        test("Al Activar, el campo email es oblidatorio", (done) => {
            request.body.email = ""
            request.body.codigo = ""
            
            usuariosController.Activar(request, response)
            expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo email es obligatorio"})
            done()

        })


        test("Al Activar, el campo password es oblidatorio", (done) => {
            request.body.email = "alejandrobarr.sosa@hotmail.com"
            request.body.codigo = ""

            usuariosController.Activar(request, response)
            expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo codigo es obligatorio" })
            done()

        })


        test("Al Registrar, debe registrar el usuario", (done) => {
            request.body.nombre = "John"
            request.body.email = "alejandrobarr.sosa@hotmail.com"
            request.body.password = "123456"

            usuariosModel.Mymodel.deleteMany({email:"alejandrobarr.sosa@hotmail.com"}).then((respuesta) => {
            usuariosController.Registrar(request, response)
          
            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: true, mensaje: "Usuario Registrado Correctamente. Verifique su bandeja", })
                done()
                    },2000);

            })
          
        })


        
        test("Al Activar, el codigo de activacion debe ser invalido", (done) => {
            request.body.email = "alejandrobarr.sosa@hotmail.com"
            request.body.codigo = "false"
         

            usuariosController.Activar(request, response)
            setTimeout(() => {

            expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "Codigo de Activacion Invalido"})
            done()
                },80);

        })


        test("Borrado de Coleccion", (done) => {    
        usuariosModel.Mymodel.deleteMany({email:"alejandrobarr.sosa@hotmail.com"}).then((respuesta) => {
        expect(true).toBe(true)
        done()
             })
        })

})


describe("POST: /usuarios/Login", () =>{
    let request
    let response

    beforeAll((done) =>  {

        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
      
            done()
        }).catch((error) => {
            console.log('--------------->')
            console.log(error)
        })

       
    })

    beforeEach(() => {
            request = {body:{}, session:{}}
            response = {
                json:jest.fn(),
                status:jest.fn().mockReturnThis()
            }
    })

        test("Al loguearse, el campo email es oblidatorio", (done) => {
            request.body.email = ""
            request.body.password = ""
            
            usuariosController.Activar(request, response)
            expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo email es obligatorio" })
            done()

        })


        test("Al loguearse, el campo password es oblidatorio", (done) => {
            request.body.email = "alejandrobarr.sosa@hotmail.com"
            request.body.password = ""
           
            usuariosController.Activar(request, response)
            expect(response.json).toHaveBeenCalledWith({ state: false,mensaje: "El campo codigo es obligatorio" })
            done()

        })


        test("Al loguearse, debe crear un usuario", (done) => {
            request.body.nombre = "John Castiblanco"
            request.body.email = "admin@gmail.com"
            request.body.password = "123456"
            request.body.rol = "Administrador"

           
            usuariosModel.Mymodel.deleteMany({email:"alejandrobarr.sosa@hotmail.com"}).then(() => {

            usuariosController.Guardar(request, response)

            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: true, mensaje: "Item almacenado", data:[] })
            done()
            },70);

            })

        })

    
        test("Al loguearse, debe iniciar sesion", (done) => {

            request.body.email = "admin@gmail.com"
            request.body.password = "123456"
            
            usuariosController.Login(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({ state:true, mensaje: "Bienvenido " + "John Castiblanco"})
                done()
                },70);

        })
        
})


describe("POST: /usuarios/MisDatos", () =>{
    let request
    let response

    beforeAll((done) =>  {

        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
      
            done()
        }).catch((error) => {
            console.log('--------------->')
            console.log(error)
        })

       
    })

    beforeEach(() => {
            request = {body:{}, session:{}}
            response = {
                json:jest.fn(),
                status:jest.fn().mockReturnThis()
            }
    })

        test("Al loguearse, debe iniciar sesion", (done) => {

        request.body.email = "admin@gmail.com"
        request.body.password = "123456"
            
        usuariosController.Login(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state:true, mensaje: "Bienvenido " + "John Castiblanco"})
                done()
                },70);

        })
        

        test("Al ver mis datos, el campo _id es oblidatorio", (done) => {
        request.session._id = ""
        
            
        usuariosController.MisDatos(request, response)
            expect(response.json).toHaveBeenCalledWith({ state: false,mensaje: "Debe Iniciar Sesion para cargar los datos", })
                done()

        })


        test("Al ver mis datos, el campo _id es oblidatorio", (done) => {

        usuariosModel.Mymodel.find({email:"admin@gmail.com"}).then((respuesta) => {
            request.session._id = respuesta[0]._id.toString()   
            
        usuariosController.MisDatos(request, response)
        setTimeout(() => {

            expect(response.json.mock.calls[0][0].datos[0].nombre).toBe("John Castiblanco")
                done()
            },200);
        })


    })

})











    








