var urlApi = "http://localhost:8088";
var  urlApis = "http://localhost:8088/";
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
    fetch(urlApi +"/carss/"+id, settings)
        .then(response => response.json())
        .then(function (cars) {
            console.log(cars)
            var cadena='';
            var vehiculo=cars;
            if(vehiculo){
                cadena = `
                <div id="contentModalm">
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
                </ul>
                </div>`;

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
    const request = await fetch(urlApi + "/user/", settings)
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
    fetch(urlApi+"/carss/",settings)
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

function eliminaAutomovil(id) {
    validaToken();
  
    // Muestra la confirmación con SweetAlert
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el automovil de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var settings = {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
          },
        };
  
        fetch(urlApi + "/carss/" + id, settings)
          .then(response => response.json())
          .then(function (data) {
            listarAutomoviles();
            alertas("Se ha eliminado el automovil exitosamente!", 2);
          });
      }
    });
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
    fetch(urlApi+"/carss/"+id,settings)
    .then(response => response.json())
    .then(function(response){
            var cadena='';
            var cars = response;
            console.log(cars)
            if(cars){
                cadena = `
                <div id="contentModalm">
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-car"></i>Modificar Automovil</h1>
                </div>
   
                <form action="" method="post" id="modificar1">
                
                    <input type="hidden" name="id" id="id" value="${cars.id}">
                    
                    <label for="car" class="form-label">Car</label>
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
                </form>
                </div>`;
            }
            document.getElementById("contentModalm").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalautomovil'))
            myModal.toggle();
    })
}

async function modificarAutomovil(id){
    validaToken();
    var myForm = document.getElementById("modificar1");
    var formData = new FormData(myForm);

    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        if (k == "user") {
            jsonData[k] = { id: v };
        } else {
            jsonData[k] = v;
        }

    }
    const request = await fetch(urlApi+"/carss/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)  
    });
    console.log(jsonData)
    if (request.ok) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha actualizado con exito el automovil',
          showConfirmButton: false,
          timer: 1500
        })
        const respuesta = await request.json();
        setTimeout(function () {
          listarAutomoviles();
          document.getElementById("contentModalm").innerHTML = '';
      var myModalEl = document.getElementById("modalUsuario");
      var modal = bootstrap.Modal.getInstance(myModalEl); // Returns a Bootstrap modal instance
      modal.hide();
      }, 2000);
      }else{
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            text: 'no se actualizo el automovil',
            showConfirmButton: false,
            timer: 3000
          });
    }
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
                <input type="text" class="form-control" id="car_vin" name="car_vin" required> <br>

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

  async function registrarAutomovil() {
    
    var myForm = document.getElementById("myform2");
    var formData = new FormData(myForm);

    var jsonData = {};
    for (var [k, v] of formData) {
        if (k == "user") {
            jsonData[k] = { id: v };
        } else {
            jsonData[k] = v;
        }
    }
    
    console.log(jsonData);

    const request = await fetch(urlApi + "/carss/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });

    listarAutomoviles();

    document.getElementById("contentModalm").innerHTML = '';
    var myModalEl = document.getElementById('modalautomovil');
    var modal = new bootstrap.Modal(myModalEl); // Crea una nueva instancia del modal
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
    document.getElementById("datos").innerHTML= alerta;
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