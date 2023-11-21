// Steam API Key (reemplaza con tu clave de API)
const apiKey = 'FA51A46803CA9086726A81362DBDF323';

// Arreglo con las ID de los elementos audio
const audioElements = ['myAudio', 'myAudio1', 'myAudio2'];
const currentAudioIndex = Math.floor(Math.random() * audioElements.length);

if (audioElements) {
    audioElements.volume = 0.1; // Establece el volumen deseado (rango de 0 a 1)
}

// Función para obtener la información del usuario de Steam y actualizar la lista
function updateSteamUsersList() {
    $('.name-list li').each(function () {
        const steamId = $(this).data('steam-id');
        const apiUrl = `http://34.176.188.153:3000/api/steam-user/${steamId}`;

        // Realiza la solicitud
        $.getJSON(apiUrl, (data) => {
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

// Función para cargar una nueva canción al hacer clic en el canvas
function loadRandomSong() {
    const newIndex = (currentAudioIndex + 1) % audioElements.length; // Cambiar al siguiente audio
    AUDIO.VISUALIZER.getInstance({ audio: audioElements[newIndex] }); // Cargar nueva canción
}

// Llama a la función para actualizar la lista al cargar la página
//$(document).ready(() => {
    document.addEventListener('DOMContentLoaded', function () {    
    updateSteamUsersList();

// Llama a la función para inicializar el visualizador de audio
    //AUDIO.VISUALIZER.getInstance({
    const visualizer = AUDIO.VISUALIZER.getInstance({
        // Configuración del visualizador (ajusta según sea necesario)
        autoplay: true,
        loop: false,
        audio: audioElements[currentAudioIndex], // Selecciona el audio actual
        canvas: 'myCanvas',
    // ... otras opciones
    });
    visualizer.audio.volume = 0.1;
    visualizer.setVolume(0.1);
});
// Evento de clic en el canvas para cambiar de canción
$('#myCanvas').on('click', loadRandomSong);
