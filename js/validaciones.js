

export function valida(input) {
    const tipoDeInput= input.dataset.tipo//esto es un database que está en el HTML (data-tipo="nacimento")

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput, input);
    }
    
}

const tipoDeErrores= [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError= {

    nombre:{
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email:{
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Este campo debe tener entre 6 caracteres y 12 como máximo, al menos una letra minúscula, una letra mayúscula y un número. Además no puede contener caracteres especiales",
    },
    nacimiento:{
    valueMissing: "El campo nacimiento no puede estar vacío",
    customError: "Debes tener al menos 18 años",
    },
    numero:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"El formato requerido es (XXXXXXXXXX) 10 números"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"La dirección debe contener entre 10 y 40 caracteres "
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"La ciudad debe contener entre 4 y 40 caracteres "
    },
    provincia:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"La provincia debe contener entre 4 y 40 caracteres "
    },
     
}

const validadores= {//esto es un objeto
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje= "";
    tipoDeErrores.forEach(error =>{
        if (input.validity[error]) {
            mensaje= mensajesDeError[tipoDeInput][error];
        }
    })

    return  mensaje;
}
function validarNacimiento(input) {

    const fechaCliente= new Date(input.value);
    let mensaje= "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje= "Debes tener al menos 18 años";
    }
    input.setCustomValidity(mensaje);
    
}

function mayorDeEdad(fechaCliente) {

    const fechaActual= new Date();
    const diferenciaFechas= new Date(
        fechaCliente.getUTCFullYear() + 18, 
        fechaCliente.getUTCMonth(), 
        fechaCliente.getUTCDate()
        );
   

    return diferenciaFechas <= fechaActual;
}