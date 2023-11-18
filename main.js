document.addEventListener("DOMContentLoaded", function () {
    // Reemplaza 'STEAMID64_DEL_USUARIO' con el SteamID64 del usuario
    const steamID = 'STEAMID64_DEL_USUARIO';

    // URL del servidor intermedio con el SteamID64
    const servidorIntermedioURL = `http://localhost:3000/steamapi?steamid=${steamID}`;

    // Realizar la solicitud al servidor intermedio
    fetch(servidorIntermedioURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud al servidor intermedio no fue exitosa: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Actualizar la información en la página
            document.getElementById('steamAvatar').src = data.avatar;
            document.getElementById('steamID').textContent += data.steamid;
        })
        .catch(error => console.error('Error al obtener información de Steam desde el servidor intermedio:', error));
});