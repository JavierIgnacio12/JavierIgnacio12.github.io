local function getPlayerSteamInfo(ply)
    -- Reemplaza 'TU_API_KEY' con tu clave de API de Steam
    local apiKey = 'FA51A46803CA9086726A81362DBDF323'

    -- Obtén el SteamID64 del jugador
    local steamID64 = ply:SteamID64()

    -- Construye la URL de la API de Steam
    local steamAPIURL = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' .. apiKey .. '&steamids=' .. steamID64

    -- Realiza la solicitud a la API de Steam
    http.Fetch(steamAPIURL, function(body)
        -- Decodifica la respuesta JSON
        local data = util.JSONToTable(body)
        if data and data.response and data.response.players then
            local playerInfo = data.response.players[1]

            -- Envía la información al cliente a través de una red
            net.Start('SendSteamInfo')
            net.WriteString(playerInfo.avatarfull)
            net.WriteString(playerInfo.steamid)
            net.Send(ply)
        end
    end, function(error)
        print('Error al obtener información de Steam: ' .. error)
    end)
end

-- Hook para el evento cuando un jugador se une al servidor
hook.Add('PlayerInitialSpawn', 'GetPlayerSteamInfo', function(ply)
    getPlayerSteamInfo(ply)
end)