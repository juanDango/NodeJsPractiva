const http = require("http");
const fs = require("fs");
const axios = require("axios");

const urlProveedores = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const urlClientes = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"

const getProveedores = (callback)=>{
    axios.get(urlProveedores)
    .then(function (response) {
        callback(response.data);
    })
};

const getClientes = (callback)=>{
    axios.get(urlClientes)
    .then(function (response) {
        callback(response.data);
    })
};

const getFileContent = (callback)=>{
    fs.readFile("index.html", (err, data)=>{
        if (err) throw err;
        callback(data.toString())
    })    
}
http.createServer((req, res) =>{
    url = req.url;
    if(url=="/api/proveedores"){
        getFileContent((data)=>{
            getProveedores(proveedores =>{
                table = "<table class=\"table table-striped\">\
                <tr>\
                <th>ID</th>\
                <th>Nombre</th>\
                <th>Contacto</th>\
                </tr>"
                for(let i = 0; i<proveedores.length; i++){
                    proveedor = proveedores[i];
                    //table += "<tr>\
                    //<td>" + proveedores[i] + "</td>"
                    table += "<tr>\
                    <td>" + proveedor.idproveedor + "</td>\
                    <td>" + proveedor.nombrecompania + "</td>\
                    <td>" + proveedor.nombrecontacto + "</td>\
                    </tr>"
                }
                table += "</table>"
                data = data.replace("{{TituloPagina}}", "Listado de Proveedores")
                data = data.replace("{{Tabla1}}", table)
                res.end(data);
                
            })
        })
    }else if(url=="/api/clientes"){
        getFileContent((data)=>{
            getClientes(clientes =>{
                table = "<table class=\"table table-striped\">\
                <tr>\
                <th>ID</th>\
                <th>Nombre</th>\
                <th>Contacto</th>\
                </tr>"
                for(let i = 0; i<clientes.length; i++){
                    cliente = clientes[i];
                    //table += "<tr>\
                    //<td>" + proveedores[i] + "</td>"
                    table += "<tr>\
                    <td>" + cliente.idCliente + "</td>\
                    <td>" + cliente.NombreCompania + "</td>\
                    <td>" + cliente.NombreContacto + "</td>\
                    </tr>"
                }
                table += "</table>"
                data = data.replace("{{TituloPagina}}", "Listado de clientes")
                data = data.replace("{{Tabla1}}", table)
                res.end(data);    
            })
        })
    }
}).listen(8081);