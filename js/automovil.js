//funciones propias de la app
const urlApi = "http://localhost:8088";//colocar la url con el puerto

async function login(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    var settings={
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    }
    const request = await fetch(urlApi+"/auth/login",settings);
    //console.log(await request.text());
    if(request.ok){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'logeado exitosamente',
            showConfirmButton: false,
            timer: 3500
          })
        const respuesta = await request.json();
        localStorage.token = respuesta.data.token;

        //localStorage.token = respuesta;
        localStorage.email = jsonData.email;      
        location.href= "dashboard.html";
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Datos incorrectos',
            showConfirmButton: false,
            timer: 3000
          });
    }
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
    fetch(urlApi+"/carss/1",settings)
    .then(response => response.json())
    .then(function(cars){
        
            var automoviles = '';
            for(const automovil of cars.data){
                console.log(automovil.id)
                automoviles += `
                <tr>
                    <th scope="row">${automovil.id}</th>
                    <td>${automovil.car}</td>
                    <td>${automovil.car_model}</td>
                    <td>${automovil.car_color}</td>
                    <td>${automovil.car_model_year}</td>
                    <td>${automovil.car_model_year}</td>
                    <td>${automovil.car_vin}</td>
                    <td>${automovil.price}</td>
                    <td>${automovil.availability}</td>
                    <td>
                    <button type="button" class="btn btn-outline-danger" 
                    onclick="eliminaUsuario('${usuario.id}')">
                        <i class="fa-solid fa-user-minus"></i>
                    </button>
                    <a href="#" onclick="verModificarUsuario('${usuario.id}')" class="btn btn-outline-warning">
                        <i class="fa-solid fa-user-pen"></i>
                    </a>
                    <a href="#" onclick="verUsuario('${usuario.id}')" class="btn btn-outline-info">
                        <i class="fa-solid fa-eye"></i>
                    </a>
                    </td>
                </tr>`;
                
            }
            document.getElementById("listarAutomoviles").innerHTML = automovil;
    })
}

function eliminaUsuario(id){
    validaToken();
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi+"/api/users/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listar();
        alertas("Se ha eliminado el usuario exitosamente!",2)
    })
}

function verModificarUsuario(id){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi+"/user/"+id,settings)
    .then(response => response.json())
    .then(function(response){
            var cadena='';
            var usuario = response.data;
            if(usuario){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Usuario</h1>
                </div>
              
                <form action="" method="post" id="modificar">
                    <input type="hidden" name="id" id="id" value="${usuario.id}">
                    <label for="firstName" class="form-label">First Name</label>
                    <input type="text" class="form-control" name="firstName" id="firstName" required value="${usuario.firstName}"> <br>
                    <label for="lastName"  class="form-label">Last Name</label>
                    <input type="text" class="form-control" name="lastName" id="lastName" required value="${usuario.lastName}"> <br>
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" name="email" id="email" required value="${usuario.email}"> <br>
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required> <br>
                    <button type="button" class="btn btn-outline-warning" 
                        onclick="modificarUsuario('${usuario.id}')">Modificar
                    </button>
                </form>`;
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

async function modificarUsuario(id){
    validaToken();
    var myForm = document.getElementById("modificar");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApi+"/user/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha modificado el usuario exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function verUsuario(id){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi+"/user/"+id,settings)
    .then(response => response.json())
    .then(function(response){
            var cadena='';
            var usuario=response.data;
            if(usuario){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Usuario</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Nombre: ${usuario.firstName}</li>
                    <li class="list-group-item">Apellido: ${usuario.lastName}</li>
                    <li class="list-group-item">Correo: ${usuario.email}</li>
                </ul>`;
              
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
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
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> User Register</h1>
            </div>
              
            <form action="" method="post" id="myform2">

                <input type="hidden" name="id" id="id">

                <label for="car" class="form-label">Car</label>
                <input type="text" class="form-control" name="Car" id="car" required> <br>

                <label for="car_model"  class="form-label">Car Model</label>
                <input type="text" class="form-control" name="Car Model" id="car_model" required> <br>

                <label for="car_color" class="form-label">Car color</label>
                <input type="car_color" class="form-control" name="car color" id="car_color" required> <br>

                <label for="car_model_year" class="form-label">car model year</label>
                <input type="number" class="form-control" id="car_model_year" name="car model year" required> <br>

                <label for="car_vin" class="form-label">car vin year</label>
                <input type="text" class="form-control" id="car_vin" name="car vin " required> <br>

                <label for="car_model_year" class="form-label">car model year</label>
                <input type="number" class="form-control" id="car_model_year" name="car model year" required> <br>

                <label for="price" class="form-label">price</label>
                <input type="number" class="form-control" id="price" name="price" required> <br>

                <label for="availability" class="form-label">availability</label>
                <input type="number" class="form-control" id="price" name="price" required> <br>

                <button type="button" class="btn btn-outline-info" onclick="registrarAutomovil()">Registrar</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
}

async function registrarAutomovil(){
    var myForm = document.getElementById("myform1");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApi+"/user", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha registrado el usuario exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
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
    location.href = "index.html";
}

function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}