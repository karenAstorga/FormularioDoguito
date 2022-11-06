import { valida } from "./validaciones.js";

const inputs= document.querySelectorAll("input");

inputs.forEach(input =>{//inputs va a ser un array, ya que son muchos y los vamos a iterar con forEach
    input.addEventListener("blur", (input)=>{//blur significa que cuando salga de foco del input en este caso, se hace la comprobación.
        valida(input.target);
    })
})