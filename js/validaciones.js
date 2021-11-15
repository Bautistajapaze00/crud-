export function campoRequerido(input){
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

export function validarNumeros(input){
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

export function validarURL(input){
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if(patron.test(input.value)){
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}

export function validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad, campoURL){
    // prevenir el actualizar del submit
    let alerta = document.querySelector('#msjAlerta');
    if(campoRequerido(campoCodigo) && 
    campoRequerido(campoProducto) &&
    campoRequerido(campoDescripcion) &&
    validarNumeros(campoCantidad) &&
    validarURL(campoURL)){
        console.log('los datos estan listos para ser enviados');
        alerta.className = 'alert alert-danger my-5 d-none';
        return true;
    }else{
        console.log('los datos estan mal');
        alerta.className = 'alert alert-danger my-5';
        return false;
    }
}