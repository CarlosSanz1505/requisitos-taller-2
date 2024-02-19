// Importar los modulos necesarios
import { validateHeight, validateWeight } from './validate-functions.js';

// Event listener para el botón de calcular IMC
const btn = document.querySelector('.calculate');

btn.addEventListener('click', function(){
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

    document.querySelector("#result-number").innerHTML = IMC;


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

    document.querySelector('.comment').innerHTML = `Estás en <span id="comment">
    ${status} </span>`
});