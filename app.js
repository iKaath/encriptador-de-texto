const d = document;
const textArea = d.querySelector (".form__input");
const imagenMuneco = d.querySelector (".result__img");
const loader = d.querySelector (".loader");
const resultadoTitulo = d.querySelector (".result__title");
const resultadoTexto = d.querySelector (".result__text");
const botonEncriptar = d.querySelector (".form__btn");
const botonDesencriptar = d.querySelectorAll (".form__btn");
const botonCopiar = d.querySelector (".result__btn");


const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];

//funcion para encriptar el mensaje
function encriptarMensaje (mensaje)  {
    let mensajeEncriptado = "";
    for(let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        for(let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1];
            break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

//funcion que desencripta el mensaje
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
         let regex = new RegExp(llaves[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}
//ocultar elementos 
textArea.addEventListener("input", (e) => {
    imagenMuneco.style.display = "none";
    loader.classList.remove("hidden");
    resultadoTitulo.textContent = "Capturando texto.";
    resultadoTexto.textContent = "";
});

//funcion para boton encriptar
botonEncriptar.addEventListener("click",(e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "El resultado es:";
    });

botonDesencriptar[1].addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeDesencriptado;
    resultadoTitulo.textContent = "El resultado es:";
    botonCopiar.classList.remove("hidden");
});

botonCopiar.addEventListener("click", () => {
    let textoCopiado = resultadoTexto.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=> {
        imagenMuneco.style.display = "block";
        loader.classList.add("hidden");
        resultadoTitulo.textContent  = "El texto fue copiado.";
        botonCopiar.classList.add("hidden");
        resultadoTexto.textContent = "";

    })
});