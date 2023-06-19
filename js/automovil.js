
const urlApi = "http://localhost:8088/carss";
const urlApis = "http://localhost:8088/";
function verAutomovil(id) {
    validaToken();
    var settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi +"/"+id, settings)
        .then(response => response.json())
        .then(function (cars) {
            console.log(cars)
            var cadena='';
            var vehiculo=cars;
            if(vehiculo){
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Vehiculo</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Cars: ${vehiculo.car}</li>
                    <li class="list-group-item">Cars color: ${vehiculo.car_color}</li>
                    <li class="list-group-item">Cars model year: ${vehiculo.car_model_year}</li>
                    <li class="list-group-item">Cars vin: ${vehiculo.car_vin}</li>
                    <li class="list-group-item">Cars price: ${vehiculo.price}</li>
                    <li class="list-group-item">Cars availability: ${vehiculo.availability}</li>
                    <li class="list-group-item">Cars user: ${vehiculo.user.firstName}</li>
                </ul>`;

            }
            document.getElementById("contentModalm").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalautomovil'))
            myModal.toggle();
        })
}
async function user() {
    validaToken();
    var settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    const request = await fetch(urlApis + "user", settings)
        .then(response => response.json())
        .then(function (users) {
            usuarios=users.data
            console.log(usuarios[0])
            var select = document.getElementById("user");

            for(var i = 0; i < usuarios.length; i++) {
                var opcion = document.createElement("option");
                opcion.text = usuarios[i].id;
                select.add(opcion);

            }

        })
}
function listarAutomoviles(){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi,settings)
        .then(response => response.json())
        .then(function(cars){
            var automoviles = '';
            for(const automovil of cars){
                automoviles += `
                <tr>
                    <th scope="row">${automovil.id}</th>
                    <td>${automovil.car}</td>
                    <td>${automovil.car_model}</td>
                    <td>${automovil.car_color}</td>
                    <td>${automovil.car_model_year}</td>
                    <td>${automovil.car_vin}</td>
                    <td>${automovil.price}</td>
                    <td>${automovil.availability}</td>
                    <td>${automovil.user.id}</td>
                    <td>
                    <button type="button" class="btn btn-outline-danger" 
                    onclick="eliminaAutomovil('${automovil.id}')">
                        <i class="fa-solid fa-user-minus"></i>
                    </button>
                    <a href="#" onclick="verModificarAutomovil('${automovil.id}')" class="btn btn-outline-warning">
                        <i class="fa-solid fa-user-pen"></i>
                    </a>
                    <a href="#" onclick="verAutomovil('${automovil.id}')" class="btn btn-outline-info">
                        <i class="fa-solid fa-eye"></i>
                    </a>
                    </td>
                </tr>`;

            }
            document.getElementById("listarAutomoviles").innerHTML = automoviles;
        })
}

function eliminaAutomovil(id){

    validaToken();
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi+"/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listarAutomoviles();
        alertas("Se ha eliminado el automovil exitosamente!",2)
    })
}

function verModificarAutomovil(id){
    user();
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi+"/"+id,settings)
    .then(response => response.json())
    .then(function(response){
            var cadena='';
            var cars = response;
            console.log(cars)
            if(cars){
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Automovil</h1>
                </div>
   
                <form action="" method="post" id="modificar">
                
                    <input type="hidden" name="id" id="id" value="${cars.id}">
                    
                    <label for="car" class="form-label">Car</label>'
                    <input type="text" class="form-control" name="car" id="car" required value="${cars.car}"> <br>
                    
                    <label for="car_model"  class="form-label">Car model</label>
                    <input type="text" class="form-control" name="car_model" id="car_model" required value="${cars.car_model}"> <br>
                    
                    <label for="car_color"  class="form-label">Car Color</label>
                    <input type="text" class="form-control" name="car_color" id="car_color" required value="${cars.car_color}"> <br>
                   
                    <label for="car_model_year"  class="form-label">Car model year</label>
                    <input type="number" class="form-control" name="car_model_year" id="car_model_year" required value="${cars.car_model_year}"> <br>
                   
                    <label for="car_vin"  class="form-label">Car Vin</label>
                    <input type="text" class="form-control" name="car_vin" id="car_vin" required value="${cars.car_vin}"> <br>
                    
                    <label for="price"  class="form-label">Price</label>
                    <input type="text" class="form-control" name="price" id="price" required value="${cars.price}"> <br>
                    
                    <label for="avalability"  class="form-label">Avalability</label>
                    <select class="form-control" id="availability" name="availability" required>
                       
                        <option value="true">True</option>
                        <option value="false" >False</option>
                </select><br>
                
                    <label for="user" class="form-label">Register user</label>
                <select class="form-control" id="user" name="user" required>
                <script>user()</script>
                            <option >${cars.user.id}</option>
                         
                   
                </select><br>
                    
       
                    <button type="button" class="btn btn-outline-warning" 
                        onclick="modificarAutomovil('${cars.id}')">Modificar
                    </button>
                </form>`;
            }
            document.getElementById("contentModalm").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalautomovil'))
            myModal.toggle();
    })
}

async function modificarAutomovil(id){
    validaToken();
    var myForm = document.getElementById("modificar");
    var formData = new FormData(myForm);

    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        if (k == "user") {
            jsonData[k] = { id: v };
        } else {
            jsonData[k] = v;
        }

    }
    const request = await fetch(urlApi+"/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    console.log(jsonData)
    listarAutomoviles();
    //alertas("Se ha modificado el vehiculo exitosamente!",1)
    document.getElementById("contentModalm").innerHTML = '';
    var myModalEl = document.getElementById('modalautomovil')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}



function alertas(mensaje,tipo){
    var color ="";
    if(tipo == 1){//success verde
        color="success"
    }
    else{//danger rojo
        color = "danger"
    }
    var alerta =`<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                    <strong><i class="fa-solid fa-triangle-exclamation"></i></strong>
                        ${mensaje}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
    document.getElementById("datos").innerHTML = alerta;
}



function registerForm1(){
    user();
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Register Vehiculos</h1>
            </div>
              
            <form action="" method="post" id="myform2">
            
                <label for="id" class="form-label">Id</label><br>
                <input type="text"  class="form-control" name="id" id="id" required><br>

                <label for="car" class="form-label">Car</label>
                <input type="text" class="form-control" name="car" id="car" required> <br>

                <label for="car_model"  class="form-label">Car Model</label>
                <input type="text" class="form-control" name="car_model" id="car_model" required> <br>

                <label for="car_color" class="form-label">Car color</label>
                <input type="text" class="form-control" name="car_color" id="car_color" required> <br>

                <label for="car_model_year" class="form-label">car model year</label>
                <input type="number" class="form-control" id="car_model_year" name="car_model_year" required> <br>

                <label for="car_vin" class="form-label">car vin year</label>
                <input type="text" class="form-control" id="car_vin" name="car_vin " required> <br>

                <label for="price" class="form-label">price</label>
                <input type="text" class="form-control" id="price" name="price" required> <br>

                <label for="availability" class="form-label">availability</label>
                <select class="form-control" id="availability" name="availability" required>
                       
                        <option value="true">True</option>
                        <option value="false" selected>False</option>
                </select>

                
                <label for="user" class="form-label">Register user</label>
                <select class="form-control" id="user" name="user" required>
                   
                </select>

                <button type="button" class="btn btn-outline-info" onclick="registrarAutomovil()">Registrar</button>
            </form>`;
            document.getElementById("contentModalm").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalautomovil'))
            myModal.toggle();
}

async function registrarAutomovil(){
    validaToken()
    var myForm = document.getElementById("myform2");
    var formData = new FormData(myForm);

    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        if (k == "user") {
            jsonData[k] = { id: v };
        } else {
            jsonData[k] = v;
        }
    }
    jsonData=jsonData
    console.log(jsonData)
    const request = await fetch(urlApi, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)

    });
    listarAutomoviles();
    //alertas("Se ha registrado el vehiculo exitosamente!",1)
    document.getElementById("contentModalm").innerHTML = '';
    var myModalEl = document.getElementById('modalautomovil')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function modalConfirmacion(texto,funcion){
    document.getElementById("contenidoConfirmacion").innerHTML = texto;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar");
    confirmar.onclick = funcion;
}

function salir(){
    localStorage.clear();
    location.href = "login.html";
}

function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}