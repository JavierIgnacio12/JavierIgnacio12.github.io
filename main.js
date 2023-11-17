document.addEventListener("DOMContentLoaded", function () {
    // Reemplaza 'TU_API_KEY' con tu clave de API de Steam
    const apiKey = 'FA51A46803CA9086726A81362DBDF323';
    
    // Reemplaza 'STEAMID64_DEL_USUARIO' con el SteamID64 del usuario
    const steamID = 'STEAMID64_DEL_USUARIO';

    // URL de la API de Steam para obtener información del usuario
    const steamAPIURL = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamID}`;

    // Realizar la solicitud a la API de Steam
    fetch(steamAPIURL)
        .then(response => response.json())
        .then(data => {
            // Actualizar la información en la página
            const user = data.response.players[0];
            document.getElementById('steamAvatar').src = user.avatarfull;
            document.getElementById('steamID').textContent += user.steamid;
        })
        .catch(error => console.error('Error al obtener información de Steam:', error));
            // Configurar el sistema de red para recibir información del servidor
    net.Receive('SendSteamInfo', function(len) {
        const steamAvatar = net.ReadString();
        const steamID = net.ReadString();

        // Actualizar la información en la página
        document.getElementById('steamAvatar').src = steamAvatar;
        document.getElementById('steamID').textContent += steamID;
    });
});