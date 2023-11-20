// custom-script.js

// Steam API Key (reemplaza con tu clave de API)
const apiKey = 'FA51A46803CA9086726A81362DBDF323';

// Función para obtener la información del usuario de Steam y actualizar la lista
function updateSteamUsersList() {
    $('.name-list li').each(function() {
        const steamId = $(this).data('steam-id');
        const apiUrl = `https://34.176.188.153:3000/api/steam-user/${steamId}`;

        // Realiza la solicitud
        $.getJSON(apiUrl, data => {
            const player = data.response.players[0];

            // Actualiza el elemento de la lista con el avatar y el nombre de usuario
            const listItem = `
            <div class="user-info">
                <img src="${player.avatarfull}" alt="${player.personaname} Avatar">
                <p>${player.personaname}</p>
            </div>
            `;
            $(this).html(listItem);
        });
    });
}

// Llama a la función para actualizar la lista al cargar la página
$(document).ready(() => {
    updateSteamUsersList();
});

// Tu código para inicializar el visualizador de audio
AUDIO.VISUALIZER.getInstance({
    // Configuración del visualizador (ajusta según sea necesario)
    autoplay: true,
    loop: true,
    audio: 'myAudio',
    canvas: 'myCanvas',
    // ... otras opciones
});
