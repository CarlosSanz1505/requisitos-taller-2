// Importar los modulos necesarios
import { validateHeight, validateWeight } from './validate-functions.js';
import { agregarRegistro } from './utils-functions.js';

// Event listener para el botón de calcular IMC
const btnsCalculate = document.querySelector('.calculate');

btnsCalculate.addEventListener('click', function(){
// Obtiene el valor de la altura y el peso
let heightInput = document.querySelector('#height').value;
let weightInput = document.querySelector('#weight').value;

// Validar la altura
let isValidHeight = validateHeight(heightInput);
if (!isValidHeight) {
    return; // Detiene la ejecución si la altura no es válida
}

// Validar el peso
let isValidWeight = validateWeight(weightInput);
if (!isValidWeight) {
    return; // Detiene la ejecución si el peso no es válido
}

// Convertir altura y peso a números
let height = parseFloat(heightInput);
let weight = parseFloat(weightInput);

let IMC = weight / (height * height);

IMC = IMC.toFixed(2);

// Agrego el IMC al html para su visualización
document.querySelector("#result-number").innerHTML = IMC;

// Variable para controlar el texto de salida
let status = '';

if (IMC < 18.5) {
    status = 'bajo peso';
} else if (IMC >= 18.5 && IMC < 25) {
    status = 'peso normal';
} else if (IMC >= 25 && IMC < 30) {
    status = 'sobrepeso';
} else {
    status = 'obesidad';
}
// Agrega el comentario al html para su visualización
document.querySelector('.comment').innerHTML = `Estás en <span id="comment">
${status} </span>`
});

// Selecciona el botón de guardar por su ID
const btnSave = document.querySelector('#save-button');
// Selecciona el campo de entrada de ID por su ID
const idField = document.querySelector('#id-person');

// Agrega un event listener al campo de entrada de ID para detectar cambios en su valor
idField.addEventListener('input', function(){

    // Verifica si el valor del campo de entrada de ID está entre 8 y 10 caracteres de longitud
    if(idField.value.length >= 8 && idField.value.length <= 10){
        // Si el valor del campo de entrada de ID es válido, habilita el botón de guardar
        btnSave.disabled = false;
    } else {
        // Si el valor del campo de entrada de ID no es válido, deshabilita el botón de guardar
        btnSave.disabled = true;
    }
});

/**
 * Maneja el evento de clic en el botón de guardar, almacenando el IMC, altura, peso y fecha actual en el LocalStorage.
 * @listens click
 */
btnSave.addEventListener('click', function(){
    // Obtiene el IMC del elemento HTML.
    let IMC = document.querySelector("#result-number").innerHTML;
    // Obtiene la fecha actual y la formatea como una cadena de texto.
    const fechaActual = (new Date()).toLocaleString();
    // Verifica si el IMC es válido (mayor que cero).
    if(IMC > 0.00){
        // Almacena el IMC, la altura, el peso y la fecha en el LocalStorage.
        localStorage.setItem('IMC', IMC);
        localStorage.setItem('height', height.value);
        localStorage.setItem('weight', weight.value);
        localStorage.setItem('IdUsuario', idField.value );
        localStorage.setItem('fechaActual', fechaActual);
        // Obtiene los valores almacenados en el LocalStorage.
        const imcSaved = localStorage.getItem('IMC');
        const heightSaved = localStorage.getItem('height');
        const weightSaved = localStorage.getItem('weight');
        const idSaved = localStorage.getItem('IdUsuario');
        const DateSaved = localStorage.getItem('fechaActual');
        // Agrega los registros de datos al LocalStorage como estructura de datos.
        agregarRegistro(idSaved, imcSaved, weightSaved, heightSaved, DateSaved);
        // Muestra una alerta indicando que los datos fueron guardados correctamente.
        alert('Los datos fueron guardados de manera adecuada');
    } else {
        // Muestra una alerta indicando que primero debe calcular el IMC.
        alert('Primero calcula el IMC');
    }
});

