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
    //crear un producto
    crearProducto();
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
      <button class="btn btn-warning" onclick='prepararEdicionProducto()'>Editar</button>
      <button class="btn btn-danger">Borrar</button>
    </td>
  </tr>`;
}

function cargaInicial(){
    if(listaProductos.length > 0){
        //crear las filas
        listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)});
    }
}

window.prepararEdicionProducto = function (){
    console.log('desde editar')
}