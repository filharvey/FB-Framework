class Server
{
    constructor ()
    {
        Server.instance = this;

        this.baseUrl = "https://games.mp2x.io/";
    }

    login (callback)
    {
        var params = {
            id: PlayerInfo.instance.id,
            name: PlayerInfo.instance.name,
            url: PlayerInfo.instance.url
        };

        new ServerCall (this.baseUrl + "login", params, callback);
    }

    update (data, callback)
    {
        var params = {
            id: PlayerInfo.instance.id,
            data: data
        };

        new ServerCall (this.baseUrl + "update", params, callback);
    }

    bot (callback)
    {
        var params = {
            id: PlayerInfo.instance.id,
            cmd: 'bot'
        };

        new ServerCall (this.baseUrl + "game", params, callback);
    }

    friends (friends, callback)
    {
        var params = {
            id: PlayerInfo.instance.id,
            cmd: 'friends',
            friends: friends
        };

        new ServerCall (this.baseUrl + "game", params, callback);
    }
};