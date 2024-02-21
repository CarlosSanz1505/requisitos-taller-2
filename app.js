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
 * Agrega un nuevo registro de datos (IMC, peso, altura, fecha) para un usuario específico.
 * @param {string} usuario - El identificador único del usuario.
 * @param {number} imc - El índice de masa corporal (IMC) del usuario.
 * @param {number} peso - El peso del usuario en kilogramos.
 * @param {number} altura - La altura del usuario en metros.
 * @param {string} fecha - La fecha y hora en que se registraron los datos (en formato ISO 8601).
 */
function agregarRegistro(usuario, imc, peso, altura, fecha) {
    // Obtener la estructura de datos actual desde localStorage
    let datosLocalStorage = JSON.parse(localStorage.getItem('datosRegistro')) || {};
    
    // Verificar si ya existe una entrada para el usuario
    if (!datosLocalStorage[usuario]) {
        // Si no existe, crear una nueva entrada para el usuario con un array vacío de registros
        datosLocalStorage[usuario] = [];
    }
    
    // Agregar el nuevo registro al array correspondiente
    datosLocalStorage[usuario].push({ "imc": imc, "peso": peso, "altura": altura, "fecha": fecha });
    
    // Guardar la estructura de datos actualizada en localStorage
    localStorage.setItem('datosRegistro', JSON.stringify(datosLocalStorage));
}

/**
 * Muestra los registros de datos (IMC, peso, altura, fecha) para un usuario específico.
 * @param {string} usuario - El identificador único del usuario cuyos registros se desean visualizar.
 */
function visualizarRegistros(usuario) {
    // Obtener la estructura de datos actual desde localStorage
    let datosLocalStorage = JSON.parse(localStorage.getItem('datosRegistro')) || {};

    // Verificar si hay registros para el usuario especificado
    if (datosLocalStorage[usuario]) {
        // Mostrar los registros para el usuario
        console.log(`Registros para el usuario ${usuario}:`);
        datosLocalStorage[usuario].forEach(registro => {
            console.log(`IMC: ${registro.imc}, Peso: ${registro.peso}, Altura: ${registro.altura}, Fecha: ${registro.fecha}`);
        });
    } else {
        console.log(`No se encontraron registros para el usuario ${usuario}.`);
    }
}

btnSave.addEventListener('click', function(){
    let IMC = document.querySelector("#result-number").innerHTML;
    const fechaActual = (new Date()).toLocaleString();
    if(IMC > 0.00){
        // Almacena el IMC, la altura y el peso en LocalStorage
        // esto con el fin de guardarlos si el usuario lo desea.
        localStorage.setItem('IMC', IMC);
        localStorage.setItem('height', height.value);
        localStorage.setItem('weight', weight.value);
        localStorage.setItem('IdUsuario',idField.value );
        localStorage.setItem('fechaActual', fechaActual);
        // Obtengo los valores almacenados en el localStorage
        const imcSaved = localStorage.getItem('IMC');
        const heightSaved = localStorage.getItem('height');
        const weightSaved = localStorage.getItem('weight');
        const idSaved = localStorage.getItem('IdUsuario');
        const DateSaved = localStorage.getItem('fechaActual');

        // Lo guardamos en el local storage como estructura de datos.
        agregarRegistro(idSaved, imcSaved,
                         weightSaved, heightSaved, DateSaved);
        
        visualizarRegistros(idSaved)
        alert('Los datos fueron guardados de manera adecuada')
    } else {
        alert('Primero calcula el IMC')
    }
});
