function campoRequerido(input){
    // console.log('Desde la funcion campo requerido')
    if(input.value.trim().length > 0){
        // console.log('aqui esta todo bien');
        input.className = 'form-control is-valid';
        return true;
    }else{
        // console.log('aqui muestro un error');
        input.className = 'form-control is-invalid';
        return false;
    }
}

function validarNumeros(input){
    // vamos a crear una expresion regular
    let patron = /^[0-9]{1,3}$/;
    // el metodo test devuelve true, false
    // expresionregular.test(texto a validar)
    if(patron.test(input.value)){
        // cumple con la expresion regular
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}

function validarURL(input){
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if(patron.test(input.value)){
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}

function validarGeneral(e){
    // prevenir el actualizar del submit
    e.preventDefault();
    console.log('desde la funcion validar general')
    let alerta = document.querySelector('#msjAlerta');
    if(campoRequerido(campoCodigo) && 
    campoRequerido(campoProducto) &&
    campoRequerido(campoDescripcion) &&
    validarNumeros(campoCantidad) &&
    validarURL(campoURL)){
        console.log('los datos estan listos para ser enviados');
        alerta.className = 'alert alert-danger my-5 d-none';
    }else{
        console.log('los datos estan mal');
        alerta.className = 'alert alert-danger my-5';
    }
}


//traigo el elemento que necesito del html
let campoCodigo = document.querySelector('#codigo');
let campoProducto = document.querySelector('#producto');
let campoDescripcion = document.querySelector('#descripcion');
let campoCantidad =  document.querySelector('#cantidad');
let campoURL =  document.querySelector('#url');
let formularioProducto = document.querySelector('#formProducto');
//asociar un evento a un elemento del html
campoCodigo.addEventListener('blur', ()=>{campoRequerido(campoCodigo)});
campoProducto.addEventListener('blur', ()=>{campoRequerido(campoProducto)});
campoDescripcion.addEventListener('blur', ()=>{campoRequerido(campoDescripcion)});
campoCantidad.addEventListener('blur', ()=>{validarNumeros(campoCantidad)});
campoURL.addEventListener('blur', ()=>{validarURL(campoURL)})
formularioProducto.addEventListener('submit', validarGeneral);