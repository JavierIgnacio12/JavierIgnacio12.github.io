document.addEventListener("DOMContentLoaded", function () {
    // Reemplaza 'STEAMID64_DEL_USUARIO' con el SteamID64 del usuario
    const steamID = 'STEAMID64_DEL_USUARIO';

    // URL del servidor intermedio que proporciona la información de Steam
    const serverURL = `http://localhost:3000/steamapi?steamid=${steamID}`;

    // Realizar la solicitud al servidor intermedio
    fetch(serverURL)
        .then(response => response.json())
        .then(data => {
            // Actualizar la información en la página si existe
            if (data) {
                document.getElementById('steamAvatar').src = data.avatarfull || 'https://i.pinimg.com/564x/66/c0/be/66c0bede32a10a2f017d789b259af478.jpg';
                document.getElementById('steamID').textContent += data.steamid || 'SteamID no disponible';
            } else {
                console.error('No se recibió información válida del servidor intermedio.');
            }
        })
        .catch(error => console.error('Error al obtener información del servidor intermedio:', error));
});