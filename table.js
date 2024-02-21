import { obtenerRegistros } from './utils-functions.js';

document.querySelector('#id-person-table').addEventListener('keypress', function(event) {
    // Verificar si la tecla presionada es Enter (código 13)
    if (event.key === 'Enter') {
        // Obtener el valor del input
        let userId = this.value.trim();

        // Verificar si el ID ingresado es válido
        if (userId.length >= 8 && userId.length <= 10) {
            // Obtener los registros del usuario del LocalStorage
            let registros = obtenerRegistros(userId);

            // Construir la tabla dinámicamente
            let tableBody = document.querySelector('.table__body tbody');
            tableBody.innerHTML = ''; // Limpiar el contenido existente de la tabla

            registros.forEach(function(registro) {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${registro.imc}</td>
                    <td>${registro.peso}</td>
                    <td>${registro.altura}</td>
                    <td>${registro.fecha}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            // Mostrar un mensaje de error si el ID ingresado no es válido
            alert('Por favor ingrese un ID válido (8-10 caracteres).');
        }
    }
});
