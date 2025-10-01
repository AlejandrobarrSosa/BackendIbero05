var config = {
    email:{}
}

config.name = "DieCastCars"
config.dominio = "http://localhost:4200"

config.bd = "BackendIbero05"
config.bdtest = "Cohorte05FinalTest"
config.bdUser = "adminBit"
config.bdPass = "prueba123"
config.bdIp = "134.199.238.248"
config.bdPort = "27017"

config.produccion = true  // true = servidor de produccion, false = servidor de desarrollo

config.puerto = 3000
config.clavesecreta = "jldsajxucmpqwocmm8034043m80c093,0498xm34m0m1m840x4cnc94x84lkjklsdajoi"
config.expiracion = 60000*5


config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "alejandrobarr.sosa@gmail.com"
config.email.pass = "grdbsadfeiullfav"

config.listablanca = [
    "http://localhost:4200",
    "http://localhost:3000",
    "http://192.168.20.26:3000",
    "http://localhost:9876"
    
    
]

module.exports.config = config

