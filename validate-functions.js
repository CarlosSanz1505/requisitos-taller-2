/**
 * Valida la altura ingresada por el usuario.
 * @param {string} heightInput - El valor de altura ingresado por el usuario.
 * @returns {boolean} True si la altura es válida, de lo contrario False.
 */
export function validateHeight(heightInput) {
    // Verifica si el campo de altura está vacío
    if (heightInput.trim() === '') {
        alert('Por favor ingrese información en el campo de altura.');
        return false;
    }

    // Verifica si el campo de altura contiene un punto decimal
    if (!/\./.test(heightInput)) {
        alert('El campo de altura debe contener un punto decimal (.) para ser calculada.');
        return false;
    }

    let height = parseFloat(heightInput);

    // Verifica si el valor de altura es numérico
    if (isNaN(height)) {
        alert('Por favor ingresa una altura numérica válida.');
        return false;
    }

    // Verifica si la altura está dentro del rango permitido
    if (height <= 1.20 || height >= 2.60) {
        alert('Por favor ingresa una altura válida.');
        return false;
    }

    return true; // La altura es válida
}

/**
 * Valida el peso ingresado por el usuario.
 * @param {string} weightInput - El valor de peso ingresado por el usuario.
 * @returns {boolean} True si el peso es válido, de lo contrario False.
 */
export function validateWeight(weightInput) {
    // Verifica si el campo de peso está vacío
    if (weightInput.trim() === '') {
        alert('Por favor ingrese información en el campo de peso.');
        return false;
    }

    let weight = parseFloat(weightInput);

    // Verifica si el valor de peso es numérico
    if (isNaN(weight)) {
        alert('Por favor ingrese un peso numérico válido.');
        return false;
    }

    // Verifica que el peso sea mayor que cero
    if (weight <= 35 || weight >= 600) {
        alert('Por favor ingrese un peso válido en kilogramos.');
        return false;
    }

    return true; // El peso es válido
}