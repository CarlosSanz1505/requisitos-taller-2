/**
 * Módulo para agregar y visualizar registros de datos (IMC, peso, altura, fecha) para usuarios específicos.
 * @module RegistroDatos
 */

/**
 * Agrega un nuevo registro de datos (IMC, peso, altura, fecha) para un usuario específico.
 * @param {string} usuario - El identificador único del usuario.
 * @param {number} imc - El índice de masa corporal (IMC) del usuario.
 * @param {number} peso - El peso del usuario en kilogramos.
 * @param {number} altura - La altura del usuario en metros.
 * @param {string} fecha - La fecha y hora en que se registraron los datos (en formato ISO 8601).
 */
export function agregarRegistro(usuario, imc, peso, altura, fecha) {
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
export function visualizarRegistros(usuario) {
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