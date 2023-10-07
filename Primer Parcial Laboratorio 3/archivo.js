class Vehiculo
{
    constructor(id, modelo,anoFab,velMax)
    {
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }



    toString() 
    {
        return `${this.modelo} ${this.anoFab}, velMax: ${this.velMax}`;
    }
    
}

class Aereo extends Vehiculo
{
    constructor(id, modelo,anoFab,velMax, altMax, autonomia)
    {
        super(id, modelo,anoFab,velMax);
        this.altMax = altMax;
        this.autonomia = autonomia;

    }
}

class Terrestre extends Vehiculo
{
    constructor(id, modelo,anoFab,velMax, cantPue, cantRue)
    {
        super(id, modelo,anoFab,velMax);
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }
}

const jsonString = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"DodgeViper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}]';

// Parsea la cadena JSON en un array de arrayVehiculos
const data = JSON.parse(jsonString);

// Función para crear arrayVehiculos de las clases correspondientes
function crearObjetoDeClase(datos) {
  if (datos.hasOwnProperty('altMax') && datos.hasOwnProperty('autonomia')) {
    return new Aereo(datos.id, datos.modelo, datos.anoFab, datos.velMax, 
                    datos.altMax, datos.autonomia);
  } else{
    return new Terrestre(datos.id, datos.modelo, datos.anoFab, datos.velMax, 
        datos.cantPue, datos.cantRue);
  } 
}


// Crear un array de arrayVehiculos a partir de los datos
const arrayVehiculos = data.map(crearObjetoDeClase);


//Referencia a etiquetas
const tablaCuerpo = document.getElementById('tablaCuerpo');
const tipoAFiltrarEnTabla = document.getElementById('tipo');
const botonCalcularPromedio = document.getElementById('btn_calcular_promedio');

// Imprime los arrayVehiculos creados
console.log(arrayVehiculos);


document.addEventListener('DOMContentLoaded',function () {
    insertarVehiculos(arrayVehiculos); 
    });
  
  
  function insertarVehiculos(vehiculos){
  // Recorre el array de Vehiculos y crea una fila para cada objeto
  vehiculos.forEach((objeto) => {
      const nuevaFila = document.createElement('tr');
      nuevaFila.id = `fila_con_id-${objeto.id}`; // Asigna un id a la fila
      console.log(nuevaFila.id);
      nuevaFila.innerHTML = `
          <td>${objeto.id}</td>
          <td>${objeto.modelo}</td>
          <td>${objeto.anoFab}</td>
          <td>${objeto.velMax}</td>
          <td>${objeto.altMax || ''}</td>
          <td>${objeto.autonomia || ''}</td>
          <td>${objeto.cantPue || ''}</td>
          <td>${objeto.cantRue || ''}</td>
          <td><span onclick="eliminarUsuario(${objeto.id})">Eliminar</span></td>
      `;
      tablaCuerpo.appendChild(nuevaFila);
  });
  
  }

//Evento que me permite cambiar la tabla en base al tipo de vehiculo seleccionado
tipoAFiltrarEnTabla.addEventListener('change', function(event)
{
  event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
  while (tablaCuerpo.rows.length > 0) {
    tablaCuerpo.deleteRow(0);
}

  if (tipoAFiltrarEnTabla.value === 'aereo') {
    filtrado = arrayVehiculos.filter(function(vehiculo) {
      console.log("Entré al filtrar aereo");
      return vehiculo.altMax > 0 && vehiculo.autonomia > 0;
    });
  }
  else if(tipoAFiltrarEnTabla.value === 'terrestre')
  {
    filtrado = arrayVehiculos.filter(function(vehiculo) {
      console.log("Entré al filtrar terrestre");
      return vehiculo.cantPue > -1 && vehiculo.cantRue > 0;
    });
  } 
  else {
    // Si no se especificó un tipo, usar todo el array
    filtrado = arrayVehiculos;
    console.log("entré al filtrar todos");
  }

  insertarVehiculos(filtrado);
});





///CALCULAR PROMEDIO DE VELOCIDAD MAXIMA DE LOS VEHICULOS
function calcularVelocidadPromedio(tipo) {
    let filtrado;
  
    // Si se especificó un tipo, filtrar por ese tipo
    if (tipo === 'aereo') {
      filtrado = arrayVehiculos.filter(function(vehiculo) {
        console.log("Entré al calcular promedio con tipo filtrado");
        return vehiculo.altMax > 0 && vehiculo.autonomia > 0;
      });
    }
    else if(tipo === 'terrestre')
    {
      filtrado = arrayVehiculos.filter(function(vehiculo) {
        console.log("Entré al calcular promedio con tipo filtrado");
        return vehiculo.cantPue > -1 && vehiculo.cantRue > 0;
      });
    } 
    else {
      // Si no se especificó un tipo, usar todo el array
      filtrado = arrayVehiculos;
      console.log("entré al calcular promedio con tipo todos");
    }
  
    // Obtener las velocidades
    let velocidades = filtrado.map(function(vehiculo) {
      return vehiculo.velMax;
    });
  
    // Calcular el promedio
    let promedio = velocidades.reduce(function(a, b) {
      return a + b;
    }, 0) / velocidades.length;
  
    console.log(promedio);
  
    return promedio;
  }
  
  
  botonCalcularPromedio.addEventListener('click', function(event) 
  {
    console.log("Estoy en el evento click de calcular");
    event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
    tipoSeleccionado = tipoAFiltrarEnTabla;
    console.log(tipoSeleccionado.value);
  
    //console.log(calcularvelMaxPromedio(tipoSeleccionado));
  
    // Mostrar los resultados en las etiquetas
    document.getElementById('texto_promedio').textContent = calcularVelocidadPromedio(tipoSeleccionado.value);
  });









//MOSTRAR/OCULTAR COLUMNAS


//Referencia a los checkboxes
const idCheckbox = document.getElementById('id_checkbox');
const modeloCheckbox = document.getElementById('modelo_checkbox');
const anoFabCheckbox = document.getElementById('anoFab_checkbox');
const velMaxCheckbox = document.getElementById('velMax_checkbox');
const altMaxCheckbox = document.getElementById('altMax_checkbox');
const autonomiaCheckbox = document.getElementById('autonomia_checkbox');
const cantPueCheckbox = document.getElementById('cantPue_checkbox');
const cantRueCheckbox = document.getElementById('cantRue_checkbox');

// Función para manejar el cambio de un checkbox
function cambioCheckbox(checkbox, columnIndex) {
  // Obtén el encabezado y las celdas de la columna correspondiente
  const header = document.querySelector(`#tablaDatos tr th:nth-child(${columnIndex})`);
  const cells = document.querySelectorAll(`#tablaDatos tr td:nth-child(${columnIndex})`);

  // Si el checkbox está marcado, muestra el encabezado y las celdas, de lo contrario, ocúltalos
  const display = checkbox.checked ? '' : 'none';
  header.style.display = display;
  cells.forEach(cell => {
      cell.style.display = display;
  });
}

// Agrega un evento de cambio a cada checkbox
idCheckbox.addEventListener('change', function () {
  cambioCheckbox(idCheckbox, 1);
});
modeloCheckbox.addEventListener('change', function () {
  cambioCheckbox(modeloCheckbox, 2);
});

anoFabCheckbox.addEventListener('change', function () { 
  cambioCheckbox(anoFabCheckbox, 3); 
});

velMaxCheckbox.addEventListener('change', function () { 
  cambioCheckbox(velMaxCheckbox, 4);
});

altMaxCheckbox.addEventListener('change', function () { 
  cambioCheckbox(altMaxCheckbox, 5);
});

autonomiaCheckbox.addEventListener('change', function () {
  cambioCheckbox(autonomiaCheckbox, 6); 
});

cantPueCheckbox.addEventListener('change', function () {
  cambioCheckbox(cantPueCheckbox, 7); 
});

cantRueCheckbox.addEventListener('change', function () { 
  cambioCheckbox(cantRueCheckbox, 8);
});

  
//ORDENAR TABLA EN BASE AL ENCABEZADO SELECCIOADO
//encabezados de la tabla
let headers = Array.from(document.querySelectorAll('#tablaDatos th'));

// Añade un evento de click a cada encabezado
headers.forEach((header, index) => {
    header.addEventListener('click', () => {
        ordenarTabla(index);
    });
});

function ordenarTabla(index) {
    // Obtén las filas de la tabla
    let rows = Array.from(document.querySelectorAll('#tablaDatos tbody tr'));

    // Ordena las filas
    let rowsOrdenadas
     = rows.sort((a, b) => {
        let valorA = a.children[index].textContent;
        let valorB = b.children[index].textContent;

        // Si las celdas contienen números, convierte los números para la comparación
        if (!isNaN(valorA)) {
            valorA = Number(valorA);
            valorB = Number(valorB);
        }

        if (valorA < valorB) {
            return -1;
        } else if (valorA > valorB) {
            return 1;
        } else {
            return 0;
        }
    });

    // Elimina las filas actuales de la tabla
    rows.forEach(row => {
        row.parentNode.removeChild(row);
    });

    // Añade las filas ordenadas a la tabla
    let tbody = document.querySelector('#tablaDatos tbody');
    rowsOrdenadas
    .forEach(row => {
        tbody.appendChild(row);
    });
}

// Obtener una referencia al segundo formulario
const formAgregar = document.getElementById('form_agregar');

// Obtener una referencia al botón "Agregar" del primer formulario
const botonAgregar = document.getElementById('btn_agregar');

// Agregar un evento click al botón "Agregar"
botonAgregar.addEventListener('click', function (event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
  formAgregar.style.display = 'block'; // Mostrar el segundo formulario
  document.getElementById('btn_aceptar').style.display = 'inline';
  document.getElementById('btn_cancelar').style.display = 'inline';
  document.getElementById('label_select_id_editar').style.display = 'none';
  document.getElementById('select_id_editar').style.display = 'none';
  document.getElementById('btn_aceptar_cambio').style.display = 'none';
 document.getElementById('btn_cancelar_cambio').style.display = 'none';
 document.getElementById('tipo_agregar').style.display = 'inline';
  document.getElementById('tipo_agregar_label_abm').style.display = 'inline';
});



/**
 * 
 * 
 * 
 * FORMULARIO ABM
 * 
 * 
 * 
 * 
 * 
 */

function agregarObjeto() {
    
    // Obtén los valores de los campos
    const tipo = document.getElementById('tipo_agregar').value;
    const modelo = document.getElementById('modelo').value;
    const anoFab = document.getElementById('anoFab').value;
    const velMax = parseInt(document.getElementById('velMax').value);
    
    erroresValidacion = "";
    
    
  
    // Crear el objeto según el tipo seleccionado
    let objeto = null;
  
    if (tipo === 'aereo') {
      const altMax = parseInt(document.getElementById('altMax_agregar').value);
      const autonomia = parseInt(document.getElementById('autonomia_agregar').value);
      // Validar los campos
      erroresValidacion = validarAereo(modelo, anoFab, velMax, altMax, autonomia);
      objeto = new Aereo(generarIdUnico(), modelo, anoFab, velMax, altMax, autonomia);
    } else if (tipo === 'terrestre') {
      const cantPue = parseInt(document.getElementById('cantPue_agregar').value);
      const cantRue = parseInt(document.getElementById('cantRue_agregar').value);
      erroresValidacion = validarTerrestre(modelo, anoFab, velMax, cantPue, cantRue);
      objeto = new Terrestre(generarIdUnico(), modelo, anoFab, velMax, cantPue, cantRue);
   
      }
      
      
      if (erroresValidacion.length > 0) {
        mostrarError(erroresValidacion.join(' '));
        return;
      }
      
      
      
      if (objeto !== null) {
        // Agregar el objeto a la tabla
        const nuevaFila = document.createElement('tr');
        nuevaFila.id = `fila_con_id-${objeto.id}`; // Asigna un id a la fila
        nuevaFila.innerHTML = `
        <td>${objeto.id}</td>
        <td>${objeto.modelo}</td>
        <td>${objeto.anoFab}</td>
        <td>${objeto.velMax}</td>
        <td>${objeto.altMax || ''}</td>
        <td>${objeto.autonomia || ''}</td>
        <td>${objeto.cantPue || ''}</td>
        <td>${objeto.cantRue || ''}</td>
        <td><span onclick="eliminarUsuario(${objeto.id})">Eliminar</span></td>
        `;
        tablaCuerpo.appendChild(nuevaFila);
        arrayVehiculos.push(objeto);
        alert(tipo + " agregado!!!!");
      }
  } 
  


  const botonAceptar = document.getElementById('btn_aceptar');

// Agregar un objeto en tabla click al botón "Aceptar"
botonAceptar.addEventListener('click', function (event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
  agregarObjeto();
});






function validarCampos(modelo, anoFab, velMax) {
  const errores = [];

  if (modelo.trim() === '') {
    errores.push('El modelo es obligatorio. ');
  }

  if (isNaN(anoFab) ||anoFab < 1885 || anoFab > 2023 ) {
    errores.push('El año de fabricacion es obligatorio y debe ser mayor a 1885 y menor a 2023. ');
  }

  if (isNaN(velMax) || velMax <= 0) {
    errores.push('La velocidad maxima debe ser mayor a 0. ');
  }


  return errores;
}

function validarAereo(modelo, anoFab, velMax, altMax, autonomia)
{

 const errores = validarCampos(modelo, anoFab, velMax);

  if (isNaN(altMax) || altMax <= 0) {
    errores.push('La altura maxima debe ser un número mayor a 0. ');
  }

  if (isNaN(autonomia) || autonomia <= 0) {
    errores.push('La autonomia deben ser un número mayor a 0. ');
  }

  return errores;
}

function validarTerrestre(modelo, anoFab, velMax, cantPue, cantRue)
{

   const errores = validarCampos(modelo, anoFab, velMax);

  if (isNaN(cantPue) || cantPue <= -1) {
    errores.push('La cantidad de puertas deben ser un número mayor a -1. ');
  }

  if (isNaN(cantRue) || cantRue <= 0) {
    errores.push('La cantidad de puertas deben ser un número mayor a 0. ');
  }




  return errores;
}

// Función para generar un ID único
function generarIdUnico() {
    return Math.floor(Math.random() * 1000);
  }


// Función para ocultar el mensaje de error
function ocultarError() {
    const mensajeError = document.getElementById('mensaje_error');
    mensajeError.textContent = ''; // Limpiar el contenido del mensaje
    mensajeError.style.display = 'none'; // Ocultar el mensaje de error
  }

  // Función para mostrar el mensaje de error
function mostrarError(mensaje) 
{
  const mensajeError = document.getElementById('mensaje_error');
  mensajeError.textContent = mensaje;
  mensajeError.style.display = 'block'; // Mostrar el mensaje de error
}

  ///EVENTO PARA OCULTAR SEGUNDO FORMULARIO
const botonCancelar = document.getElementById('btn_cancelar');
// Agregar un evento click al botón "Cancelar"
botonCancelar.addEventListener('click', function (event) {
  ocultarError(); 
  event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
  formAgregar.style.display = 'none'; // Oculta el segundo formulario
});



//FORMULARIO ABM CAMBIO DE TIPO DE VEHICULO A AGREGAR

//referencia al selector de tipo en el segundo formulario
const tipoAgregarSelect = document.getElementById('tipo_agregar');

//referencia a los campos en el segundo formulario
const modeloInput = document.getElementById('modelo');
const anoFabInput = document.getElementById('anoFab');
const velMaxInput = document.getElementById('velMax');

const altMaxInput = document.getElementById('altMax_agregar');
const autonomiaInput = document.getElementById('autonomia_agregar');
const cantPueInput = document.getElementById('cantPue_agregar');
const cantRueInput = document.getElementById('cantRue_agregar');

// Obtén una referencia a los labels de los campos en el segundo formulario
const altMaxLabel = document.getElementById('altMax_agregar_label');
const autonomiaLabel = document.getElementById('autonomia_agregar_label');
const cantPueLabel = document.getElementById('cantPue_agregar_label');
const cantRueLabel = document.getElementById('cantRue_agregar_label');

// Agrega un evento change al selector de tipo
tipoAgregarSelect.addEventListener('change', function () {
    const tipoSeleccionado = tipoAgregarSelect.value;


    modeloInput.value = "";
    anoFabInput.value = "";
    velMaxInput.value = "";

    // Ocultar todos los campos y labels por defecto
    altMaxLabel.style.display = 'none';
    altMaxInput.style.display = 'none';
    autonomiaLabel.style.display = 'none';
    autonomiaInput.style.display = 'none';
    cantPueLabel.style.display = 'none';
    cantPueInput.style.display = 'none';
    cantRueLabel.style.display = 'none';
    cantRueInput.style.display = 'none';

    // Mostrar campos y labels según el tipo seleccionado
    if (tipoSeleccionado === 'aereo') {
        altMaxLabel.style.display = 'inline';
        altMaxInput.style.display = 'inline';
        autonomiaLabel.style.display = 'inline';
        autonomiaInput.style.display = 'inline';
    } else if (tipoSeleccionado === 'terrestre') {
        cantPueLabel.style.display = 'inline';
        cantPueInput.style.display = 'inline';
        cantRueLabel.style.display = 'inline';
        cantRueInput.style.display = 'inline';
    }
});












/// FORM ABM EDITAR


// Obtener una referencia al botón "Editar" del primer formulario
const botonEditar = document.getElementById('btn_editar');

const idEditarSelect = document.getElementById("select_id_editar");

// Agregar un evento click al botón "Editar"
botonEditar.addEventListener('click', function (event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
  formAgregar.style.display = 'block'; // Mostrar el segundo formulario
  document.getElementById('tipo_agregar').style.display = 'none';
  document.getElementById('tipo_agregar_label_abm').style.display = 'none';

  document.getElementById('btn_aceptar').style.display = 'none';
 document.getElementById('btn_cancelar').style.display = 'none';



  document.getElementById('label_select_id_editar').style.display = 'inline';
  document.getElementById('select_id_editar').style.display = 'inline';
  document.getElementById('btn_aceptar_cambio').style.display = 'inline';
 document.getElementById('btn_cancelar_cambio').style.display = 'inline';

  arrayVehiculos.forEach(function(vehiculo) {
    var option = document.createElement("option");
    option.value = vehiculo.id;
    option.textContent = vehiculo.id;
    idEditarSelect.appendChild(option);
  });

});





// Agrega un evento para detectar el cambio en el select
idEditarSelect.addEventListener("change", function() {
  let idSeleccionado = parseInt(idEditarSelect.value);

  const altMaxInput = document.getElementById('altMax_agregar');
const autonomiaInput = document.getElementById('autonomia_agregar');
const cantPueInput = document.getElementById('cantPue_agregar');
const cantRueInput = document.getElementById('cantRue_agregar');

// Obtén una referencia a los labels de los campos en el segundo formulario
const altMaxLabel = document.getElementById('altMax_agregar_label');
const autonomiaLabel = document.getElementById('autonomia_agregar_label');
const cantPueLabel = document.getElementById('cantPue_agregar_label');
const cantRueLabel = document.getElementById('cantRue_agregar_label');


  console.log("Id seleccionado: " + idSeleccionado);
  let vehiculoSeleccionado = arrayVehiculos.find(function(vehiculo) {
    return vehiculo.id === idSeleccionado;
  });

  if (vehiculoSeleccionado) 
  {
    // Rellena los campos con los datos de la vehiculo seleccionada
    console.log("Setteando valores...");
    document.getElementById("modelo").value = vehiculoSeleccionado.modelo;
    document.getElementById("anoFab").value = vehiculoSeleccionado.anoFab;
    document.getElementById("velMax").value = vehiculoSeleccionado.velMax;
    if(vehiculoSeleccionado instanceof Aereo)
    {
      document.getElementById("tipo_agregar").value = "aereo";
      
      altMaxInput.value = vehiculoSeleccionado.altMax;
      autonomiaInput.value = vehiculoSeleccionado.autonomia;

      altMaxInput.style.display = "inline";
      autonomiaInput.style.display = "inline";
      cantPueInput.style.display = "none";
      cantRueInput.style.display = "none";

      altMaxLabel.style.display = "inline";
      autonomiaLabel.style.display = "inline";
      cantPueLabel.style.display = "none";
      cantRueLabel.style.display = "none";

    }
    else
    {
        document.getElementById("tipo_agregar").value = "terrestre";
      
        cantPueInput.value = vehiculoSeleccionado.cantPue;
        cantRueInput.value = vehiculoSeleccionado.cantRue;
  
        altMaxInput.style.display = "none";
        autonomiaInput.style.display = "none";
        cantPueInput.style.display = "inline";
        cantRueInput.style.display = "inline";
  
        altMaxLabel.style.display = "none";
        autonomiaLabel.style.display = "none";
        cantPueLabel.style.display = "inline";
        cantRueLabel.style.display = "inline";

    }
  }
});


function editarObjeto() {
  // Obtén el ID de la vehiculo que deseas editar
  const idEditar = parseInt(document.getElementById('select_id_editar').value);
  erroresValidacion = "";


  // Busca la posición del objeto correspondiente en el array de vehiculos
  const objetoExistenteIndex = arrayVehiculos.findIndex(function(vehiculo) {
    return vehiculo.id === idEditar;
  });

  if (objetoExistenteIndex !== -1) {
    // Obtén el objeto existente
    const objetoExistente = arrayVehiculos[objetoExistenteIndex];

    // Obtén los valores de los campos del formulario de edición
    const tipo = document.getElementById('tipo_agregar').value;
    const modelo = document.getElementById('modelo').value;
    const anoFab = document.getElementById('anoFab').value;
    const velMax = parseInt(document.getElementById('velMax').value);

    // Crea un nuevo objeto según el nuevo tipo
    let nuevoObjeto = null;
    if (tipo === 'aereo') {
      const altMax = parseFloat(document.getElementById('altMax_agregar').value);
      const autonomia = document.getElementById('autonomia_agregar').value;
      erroresValidacion = validarAereo(modelo, anoFab, velMax, altMax, autonomia);
      nuevoObjeto = new Aereo(objetoExistente.id, modelo, anoFab, velMax, altMax, autonomia);
    } else if (tipo === 'terrestre') {
      const cantPue = parseFloat(document.getElementById('cantPue_agregar').value);
      const cantRue = parseFloat(document.getElementById('cantRue_agregar').value);
      erroresValidacion = validarTerrestre(modelo, anoFab, velMax, cantPue, cantRue);
      nuevoObjeto = new Terrestre(objetoExistente.id, modelo, anoFab, velMax, cantPue, cantRue);
    }


    if (erroresValidacion.length > 0) {
        mostrarError(erroresValidacion.join(' '));
        return;
      }


    // Reemplaza el objeto existente en la misma posición
    if (nuevoObjeto) {
      arrayVehiculos[objetoExistenteIndex] = nuevoObjeto;

      // Actualiza la fila correspondiente en la tabla
      const filaExistente = document.getElementById(`fila_con_id-${idEditar}`);
      if (filaExistente) {
        filaExistente.innerHTML = `
          <td>${nuevoObjeto.id}</td>
          <td>${nuevoObjeto.modelo}</td>
          <td>${nuevoObjeto.anoFab}</td>
          <td>${nuevoObjeto.velMax}</td>
          <td>${nuevoObjeto.altMax || ''}</td>
          <td>${nuevoObjeto.autonomia || ''}</td>
          <td>${nuevoObjeto.cantPue || ''}</td>
          <td>${nuevoObjeto.cantRue || ''}</td>
          <td><span onclick="eliminarUsuario(${nuevoObjeto.id})">Eliminar</span></td>
        `;

        alert(tipo + " editado!!!!");
      }
    }
  }
}




const botonAceptarCambio = document.getElementById('btn_aceptar_cambio');
// Agregar un objeto en tabla click al botón "Aceptar"
botonAceptarCambio.addEventListener('click', function (event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
  editarObjeto();
  
});


const botonCancelarCambio = document.getElementById('btn_cancelar_cambio');
botonCancelarCambio.addEventListener('click', function(event){
  event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
  ocultarError(); 
  formAgregar.style.display = 'none'; // Oculta el segundo formulario


});




function eliminarUsuario(idVehiculo) {
    console.log("Id de vehiculo a eliminar: " + idVehiculo); 
  
    const resultado = confirm("Está seguro/a de eliminar el id " + idVehiculo + "?");
  
    if (!resultado) {
      console.log("Cancelado");
      return;
    } else {
      console.log("Vehiculo eliminada");
    }
  
    const indiceVehiculo = arrayVehiculos.findIndex(persona => persona.id === idVehiculo);
  
    console.log("Indice de persona a eliminar: " + indiceVehiculo);
  
    if(indiceVehiculo != -1) 
    {
        arrayVehiculos.splice(indiceVehiculo, 1) // el 1 remueve sólo uno
  
        // Elimina la fila correspondiente de la tabla
        const fila = document.getElementById(`fila_con_id-${idVehiculo}`);
        fila.parentNode.removeChild(fila);
    }
  
    console.log(arrayVehiculos);
  }