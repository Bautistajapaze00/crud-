let listaProductos =
  JSON.parse(localStorage.getItem("arregloProductosKey")) || [];

listaProductos.forEach((item) => {
  crearColumnas(item);
});

function crearColumnas(producto) {
  let grilla = document.querySelector("#grilla");
  grilla.innerHTML += ` <div class="col-12 col-md-4 col-lg-3 mb-3">
    <div class="card" >
        <img src="${producto.url}" class="card-img-top" alt="${producto.producto}">
        <div class="card-body">
          <h5 class="card-title">${producto.producto}</h5>
          <p class="card-text">${producto.descripcion}</a>
        </div>
      </div>
</div>`;
}
