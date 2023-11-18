document.addEventListener("DOMContentLoaded", function () {
    // Reemplaza 'TU_API_KEY' con tu clave de API de Steam
    const apiKey = 'FA51A46803CA9086726A81362DBDF323';
    
    // Obtén el SteamID64 del usuario del servidor mediante la red
    net.Receive('SendSteamInfo', function(len) {
        const steamAvatar = net.ReadString();
        const steamID = net.ReadString();

        console.log('Steam Avatar:', steamAvatar);
        console.log('Steam ID:', steamID);

        // Actualizar la información en la página
        document.getElementById('steamAvatar').src = steamAvatar;
        document.getElementById('steamID').textContent += steamID;
    });

    // Reemplaza '34.176.188.153' con la dirección IP o el nombre de dominio correcto
    const steamAPIURL = `https://34.176.188.153:3000/steamapi`;

    // Realizar la solicitud a la API de Steam
    fetch(steamAPIURL, { mode: 'cors' })
        .then(response => response.json())
        .then(data => {
            // Actualizar la información en la página
            const user = data.response.players[0];
            document.getElementById('steamAvatar').src = user ? user.avatarfull : 'https://i.pinimg.com/564x/66/c0/be/66c0bede32a10a2f017d789b259af478.jpg';
            document.getElementById('steamID').textContent += user ? user.steamid : 'STEAMID_NO_DISPONIBLE';
        })
        .catch(error => {
            console.error('Error al obtener información de Steam:', error);
            // Puedes manejar el error aquí, por ejemplo, mostrando una imagen predeterminada o un mensaje de error
            document.getElementById('steamAvatar').src = 'https://i.pinimg.com/564x/66/c0/be/66c0bede32a10a2f017d789b259af478.jpg';
            document.getElementById('steamID').textContent += 'STEAMID_NO_DISPONIBLE';
        });
});
