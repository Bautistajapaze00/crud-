import {
  campoRequerido,
  validarNumeros,
  validarURL,
  validarGeneral,
} from "./validaciones.js";
import { Producto } from "./productoClass.js";

//traigo el elemento que necesito del html
let campoCodigo = document.querySelector("#codigo");
let campoProducto = document.querySelector("#producto");
let campoDescripcion = document.querySelector("#descripcion");
let campoCantidad = document.querySelector("#cantidad");
let campoURL = document.querySelector("#url");
let formularioProducto = document.querySelector("#formProducto");
// si hay algo en localstorage quiero guardarlo en el arreglo sino quiero que sea un arreglo vacio
let listaProductos =
  JSON.parse(localStorage.getItem("arregloProductosKey")) || [];
let productoExistente = false; // si productoExistente es false quiero crear, si es true entonces quiero modificar un producto existe.
let btnNuevo = document.querySelector('#btnNuevo');


//asociar un evento a un elemento del html
campoCodigo.addEventListener("blur", () => {
  campoRequerido(campoCodigo);
});
campoProducto.addEventListener("blur", () => {
  campoRequerido(campoProducto);
});
campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});
campoCantidad.addEventListener("blur", () => {
  validarNumeros(campoCantidad);
});
campoURL.addEventListener("blur", () => {
  validarURL(campoURL);
});
formularioProducto.addEventListener("submit", guardarProducto);
btnNuevo.addEventListener('click',limpiarFormulario);



// llamo a carga inicial
cargaInicial();


function guardarProducto(e) {
  // verificar que todos los datos sean validados
  e.preventDefault();
  if (
    validarGeneral(
      campoCodigo,
      campoProducto,
      campoDescripcion,
      campoCantidad,
      campoURL
    )
  ) {
    if(productoExistente == false){
      //crear un producto
      crearProducto();
    }else{
      //modificar un producto
      modificarProducto();
    }
  }
}

function crearProducto() {
  // crear un objeto producto
  //let numeroUnico = crearNumero();
  let productoNuevo = new Producto(
    campoCodigo.value,
    campoProducto.value,
    campoDescripcion.value,
    campoCantidad.value,
    campoURL.value
  );
  // guarda el objeto dentro del arreglo de producto
  listaProductos.push(productoNuevo);
  console.log(listaProductos);
  //limpiar el formulario
  limpiarFormulario();
  //guardar el arreglo de productos dentro de localstorage
  guardarLocalStorage();
  //mostrar un cartel al usuario
  Swal.fire(
    "Producto creado",
    "Su producto fue correctamente cargado",
    "success"
  );
  //cargar el producto en la tabla
  crearFila(productoNuevo);
}

function limpiarFormulario() {
  //limpiamos los value de un formulario
  formularioProducto.reset();
  // resetear las clases
  campoCodigo.className = "form-control";
  campoProducto.className = "form-control";
  // Tarea modificar todos los className del formulario
  //resetear la variable booleana
  productoExistente=false;
}

function guardarLocalStorage() {
  localStorage.setItem("arregloProductosKey", JSON.stringify(listaProductos));
}

function crearFila(producto) {
  let tablaProductos = document.querySelector("#tablaProductos");
  tablaProductos.innerHTML += `<tr>
    <td>${producto.codigo}</td>
    <td>${producto.producto}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.url}</td>
    <td>
      <button class="btn btn-warning" onclick='prepararEdicionProducto("${producto.codigo}")'>Editar</button>
      <button class="btn btn-danger" onclick='borrarProducto("${producto.codigo}")'>Borrar</button>
    </td>
  </tr>`;
}

function cargaInicial(){
    if(listaProductos.length > 0){
        //crear las filas
        listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)});
    }
}

window.prepararEdicionProducto = function (codigo){
    console.log('desde editar')
    console.log(codigo)
    // buscar el producto en el arreglo
    let productoBuscado = listaProductos.find((itemProducto)=>{return itemProducto.codigo == codigo}) 
    console.log(productoBuscado)
    //mostrar el producto en el formulario
    campoURL.value = productoBuscado.url;
    campoCodigo.value = productoBuscado.codigo;
    campoProducto.value = productoBuscado.producto;
    campoDescripcion.value = productoBuscado.descripcion;
    campoCantidad.value = productoBuscado.cantidad;
    //cambio mi variable productoExistente
    productoExistente=true;
}

function modificarProducto(){
  console.log('desde modificar producto')
  //encontrar la posicion del elemento que quiero modificar dentro del arreglo de productos
  let posicionObjetoBuscado = listaProductos.findIndex((itemProducto)=>{return itemProducto.codigo == campoCodigo.value});
  console.log(posicionObjetoBuscado)
  //modificar los valores dentro del arreglo
  listaProductos[posicionObjetoBuscado].producto = campoProducto.value;
  listaProductos[posicionObjetoBuscado].descripcion = campoDescripcion.value;
  listaProductos[posicionObjetoBuscado].url = campoURL.value;
  listaProductos[posicionObjetoBuscado].cantidad = campoCantidad.value;
  //actualizar el localstorage
  guardarLocalStorage();
  //actualizar la tabla
  borrarTabla();
  cargaInicial();
  //mostrar un cartel al usuario
  Swal.fire(
    "Producto modificado",
    "Su producto fue correctamente actualizado",
    "success"
  );
  //limpiar el formulario
  limpiarFormulario();
}

function borrarTabla(){
  let tbodyProductos = document.querySelector('#tablaProductos');
  tbodyProductos.innerHTML=''; 
}

window.borrarProducto = function (codigo){
  // console.log(codigo);
  //buscar posicion del elemento en el arreglo y borrarlo
  let arregloNuevo = listaProductos.filter((item)=>{return item.codigo != codigo});
  // console.log(arregloNuevo);
  //actualizar el arreglo original y el localstorage
  listaProductos = arregloNuevo;
  guardarLocalStorage();
  //actualizar la tabla
  borrarTabla();
  cargaInicial();
  //mostrar cartel al usuario
  Swal.fire(
    "Producto eliminado",
    "Su producto fue correctamente eliminado del sistema",
    "success"
  );
}